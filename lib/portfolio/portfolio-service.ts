import { PORTFOLIO_VISIBILITY_KEY, SOCIAL_LINKS_KEY, generateHeatmapData, type PortfolioData, type SocialLinks, defaultSocialLinks } from "./config";

function getSocialLinks(): SocialLinks {
  try {
    const raw = localStorage.getItem(SOCIAL_LINKS_KEY);
    if (raw) return { ...defaultSocialLinks, ...JSON.parse(raw) };
  } catch { /* ignore */ }
  return defaultSocialLinks;
}

export function saveSocialLinks(links: SocialLinks) {
  try { localStorage.setItem(SOCIAL_LINKS_KEY, JSON.stringify(links)); }
  catch { /* ignore */ }
}

export function loadSocialLinks(): SocialLinks {
  return getSocialLinks();
}

export const portfolioService = {
  isPublic(): boolean {
    try { return localStorage.getItem(PORTFOLIO_VISIBILITY_KEY) === "true"; }
    catch { return false; }
  },

  setPublic(val: boolean) {
    try { localStorage.setItem(PORTFOLIO_VISIBILITY_KEY, val ? "true" : "false"); }
    catch { /* ignore */ }
  },

  getPortfolio(username: string): PortfolioData | null {
    try {
      const raw = localStorage.getItem("cybershield_progress_v2");
      const sessionRaw = localStorage.getItem("cybershield-session");

      let displayName = username;
      let avatarInitial = username[0]?.toUpperCase() ?? "?";
      let topBadge = "Tân binh";

      if (sessionRaw) {
        try {
          const session = JSON.parse(sessionRaw);
          displayName = session.user?.displayName || username;
          avatarInitial = displayName[0]?.toUpperCase() ?? "?";
          if (session.user?.role === "OWNER") topBadge = "God Mode";
          else if (session.user?.role === "ADMIN") topBadge = "Admin";
        } catch { /* ignore */ }
      }

      let completedCount = 0;
      let elo = 1000;
      if (raw) {
        try {
          const progress = JSON.parse(raw);
          completedCount = progress.completedLessons?.length ?? 0;
          if (completedCount >= 10) topBadge = "Chiến binh";
          if (completedCount >= 20) topBadge = "Hacker";
          if (completedCount >= 30) topBadge = "Elite";
        } catch { /* ignore */ }
      }

      const eloRaw = localStorage.getItem("cybershield-elo");
      if (eloRaw) { try { elo = JSON.parse(eloRaw); } catch { /* ignore */ } }

      return {
        username,
        displayName,
        avatarInitial,
        topBadge,
        elo,
        ctfPoints: completedCount * 15 + Math.floor(Math.random() * 100),
        labsCompleted: completedCount,
        heatmap: generateHeatmapData(),
        certificates: [],
        socialLinks: getSocialLinks(),
      };
    } catch {
      return null;
    }
  },
};
