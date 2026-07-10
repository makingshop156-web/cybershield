"use client";
import { useMemo } from "react";
import { useParams } from "next/navigation";
import { ENABLE_PUBLIC_PORTFOLIO } from "@/lib/portfolio/config";
import { portfolioService } from "@/lib/portfolio/portfolio-service";
import PortfolioHeader from "@/components/features/portfolio/PortfolioHeader";
import PortfolioStats from "@/components/features/portfolio/PortfolioStats";
import PortfolioHeatmap from "@/components/features/portfolio/PortfolioHeatmap";
import PortfolioTrophyRoom from "@/components/features/portfolio/PortfolioTrophyRoom";

export default function PublicPortfolioPage() {
  const { username } = useParams<{ username: string }>();
  const data = useMemo(() => {
    if (!ENABLE_PUBLIC_PORTFOLIO || typeof window === "undefined") return null;
    return portfolioService.getPortfolio(username);
  }, [username]);

  if (!ENABLE_PUBLIC_PORTFOLIO) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-cyber-muted text-sm">Portfolio chưa được bật</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="text-5xl">🔍</div>
          <h1 className="text-xl font-semibold text-white">Không tìm thấy</h1>
          <p className="text-sm text-cyber-muted">Portfolio này không tồn tại hoặc đang ở chế độ riêng tư</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 pb-20 pt-8">
        <PortfolioHeader
          displayName={data.displayName}
          avatarInitial={data.avatarInitial}
          topBadge={data.topBadge}
          username={data.username}
        />
        <PortfolioStats
          elo={data.elo}
          ctfPoints={data.ctfPoints}
          labsCompleted={data.labsCompleted}
        />
        <PortfolioHeatmap data={data.heatmap} />
        <PortfolioTrophyRoom certificates={data.certificates} />
      </div>
    </div>
  );
}
