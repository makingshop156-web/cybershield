-- =============================================================
-- CyberShield 1v1 Arena — Database Setup
-- Dán toàn bộ file này vào Supabase SQL Editor và chạy 1 lần
-- =============================================================

-- 1. User Elo Ranking
CREATE TABLE IF NOT EXISTS public.user_elo (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  elo INT NOT NULL DEFAULT 1000,
  games_played INT NOT NULL DEFAULT 0,
  wins INT NOT NULL DEFAULT 0,
  losses INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Match Lobby (sảnh chờ)
CREATE TABLE IF NOT EXISTS public.lobby (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'waiting' CHECK (status IN ('waiting','matched','in_game','completed')),
  opponent_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  matched_at TIMESTAMPTZ
);

-- 3. Match History
CREATE TABLE IF NOT EXISTS public.match_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player1_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  player2_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  winner_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  player1_elo_before INT NOT NULL DEFAULT 1000,
  player2_elo_before INT NOT NULL DEFAULT 1000,
  player1_elo_after INT,
  player2_elo_after INT,
  status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress','completed','cancelled')),
  flag_found_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ended_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Indexes
CREATE INDEX IF NOT EXISTS idx_lobby_status ON public.lobby(status);
CREATE INDEX IF NOT EXISTS idx_lobby_user_id ON public.lobby(user_id);
CREATE INDEX IF NOT EXISTS idx_match_history_player1 ON public.match_history(player1_id);
CREATE INDEX IF NOT EXISTS idx_match_history_player2 ON public.match_history(player2_id);
CREATE INDEX IF NOT EXISTS idx_match_history_status ON public.match_history(status);
CREATE INDEX IF NOT EXISTS idx_user_elo_rank ON public.user_elo(elo DESC);

-- 5. Row Level Security
ALTER TABLE public.lobby ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.match_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_elo ENABLE ROW LEVEL SECURITY;

-- Lobby policies
DROP POLICY IF EXISTS "lobby_select_own" ON public.lobby;
CREATE POLICY "lobby_select_own" ON public.lobby
  FOR SELECT USING (auth.uid() = user_id OR auth.uid() = opponent_id);

DROP POLICY IF EXISTS "lobby_insert_own" ON public.lobby;
CREATE POLICY "lobby_insert_own" ON public.lobby
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "lobby_update_own" ON public.lobby;
CREATE POLICY "lobby_update_own" ON public.lobby
  FOR UPDATE USING (auth.uid() = user_id OR auth.uid() = opponent_id);

-- Match history policies
DROP POLICY IF EXISTS "match_history_select_participant" ON public.match_history;
CREATE POLICY "match_history_select_participant" ON public.match_history
  FOR SELECT USING (auth.uid() = player1_id OR auth.uid() = player2_id);

DROP POLICY IF EXISTS "match_history_insert_participant" ON public.match_history;
CREATE POLICY "match_history_insert_participant" ON public.match_history
  FOR INSERT WITH CHECK (auth.uid() = player1_id);

DROP POLICY IF EXISTS "match_history_update_participant" ON public.match_history;
CREATE POLICY "match_history_update_participant" ON public.match_history
  FOR UPDATE USING (auth.uid() = player1_id OR auth.uid() = player2_id);

-- Elo policies
DROP POLICY IF EXISTS "user_elo_select_all" ON public.user_elo;
CREATE POLICY "user_elo_select_all" ON public.user_elo
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "user_elo_insert_own" ON public.user_elo;
CREATE POLICY "user_elo_insert_own" ON public.user_elo
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "user_elo_update_own" ON public.user_elo;
CREATE POLICY "user_elo_update_own" ON public.user_elo
  FOR UPDATE USING (auth.uid() = user_id);

-- 6. Auto-create user_elo row on signup
CREATE OR REPLACE FUNCTION public.handle_new_user_elo()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_elo (user_id) VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created_elo ON auth.users;
CREATE TRIGGER on_auth_user_created_elo
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_elo();

-- 7. Auto-update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_user_elo_updated_at ON public.user_elo;
CREATE TRIGGER update_user_elo_updated_at
  BEFORE UPDATE ON public.user_elo
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================================
-- KÍCH HOẠT REALTIME CHO TẤT CẢ BẢNG (bắt buộc)
-- =============================================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.lobby;
ALTER PUBLICATION supabase_realtime ADD TABLE public.match_history;
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_elo;
