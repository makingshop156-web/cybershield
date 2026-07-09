import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

let clientInstance: SupabaseClient | null = null;

function createMockClient(): SupabaseClient {
  return {
    auth: {
      getUser: async () => ({ data: { user: null }, error: null }),
      signInWithPassword: async () => ({ data: null, error: new Error("Supabase not configured") }),
      signUp: async () => ({ data: null, error: new Error("Supabase not configured") }),
      signOut: async () => {},
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: null, error: null }),
          order: () => ({ limit: () => Promise.resolve({ data: [], error: null }) }),
        }),
        order: () => ({ limit: () => Promise.resolve({ data: [], error: null }) }),
        limit: () => Promise.resolve({ data: [], error: null }),
      }),
      insert: () => ({ select: () => ({ single: async () => ({ data: null, error: null }) }) }),
      upsert: () => ({ select: () => ({ single: async () => ({ data: null, error: null }) }) }),
    }),
  } as unknown as SupabaseClient;
}

export function getSupabaseClient(): SupabaseClient {
  if (clientInstance) return clientInstance;

  if (!supabaseUrl || !supabaseAnonKey) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[Supabase] Missing env vars. Create .env.local with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY"
      );
    }
    clientInstance = createMockClient();
    return clientInstance;
  }

  clientInstance = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: true },
    db: { schema: "public" },
  });

  return clientInstance;
}
