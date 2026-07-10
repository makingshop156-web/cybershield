"use client";
import { AnimatePresence } from "framer-motion";
import { useArenaBattle } from "@/lib/hooks/useArenaBattle";
import type { MatchData } from "@/lib/arena/arena-service";
import { VsScreen } from "./VsScreen";
import { CountdownScreen } from "./CountdownScreen";
import { BattleScreen } from "./BattleScreen";
import { ResultScreen } from "./ResultScreen";

interface ArenaBattleProps {
  match: MatchData;
  userId: string;
  onLeave: () => void;
}

export default function ArenaBattle({ match, userId, onLeave }: ArenaBattleProps) {
  const {
    phase, countdown, flagInput, setFlagInput,
    result, enemyProgress, myProgress, message,
    submitFlag, eloDiff,
  } = useArenaBattle(match, userId);

  return (
    <div className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden px-2">
      <AnimatePresence mode="wait">
        {phase === "vs" && (
          <VsScreen
            key="vs"
            player1Elo={match.player1EloBefore}
            player2Elo={match.player2EloBefore}
          />
        )}
        {phase === "countdown" && (
          <CountdownScreen key="countdown" count={countdown} />
        )}
        {phase === "battle" && (
          <BattleScreen
            key="battle"
            player1Elo={match.player1EloBefore}
            player2Elo={match.player2EloBefore}
            myProgress={myProgress}
            enemyProgress={enemyProgress}
            flagInput={flagInput}
            message={message}
            onFlagChange={setFlagInput}
            onSubmitFlag={submitFlag}
          />
        )}
        {phase === "ended" && result && (
          <ResultScreen
            key="result"
            result={result}
            eloDiff={eloDiff}
            onLeave={onLeave}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
