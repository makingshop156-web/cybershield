"use client";
import { motion } from "framer-motion";
import { useToast } from "@/lib/hooks/useToast";
import type { SocialLinks } from "@/lib/portfolio/config";

interface Props {
  displayName: string;
  avatarInitial: string;
  topBadge: string;
  username: string;
  socialLinks?: SocialLinks;
}

export default function PortfolioHeader({ displayName, avatarInitial, topBadge, username, socialLinks }: Props) {
  const toast = useToast();
  const fbUrl = socialLinks?.facebookUrl?.trim();
  const ttUrl = socialLinks?.tiktokUrl?.trim();
  const hasSocial = fbUrl || ttUrl;

  const copyLink = () => {
    const url = `${window.location.origin}/p/${username}`;
    navigator.clipboard.writeText(url).then(() => toast.success("Đã copy link!"));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row items-center gap-5 mb-8"
    >
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyber-accent/40 to-purple-500/40 flex items-center justify-center text-3xl font-bold text-white border-2 border-cyber-accent/30 shrink-0">
        {avatarInitial}
      </div>

      <div className="text-center sm:text-left flex-1 min-w-0">
        <h1 className="text-2xl font-bold text-white">{displayName}</h1>
        <p className="text-sm text-cyber-muted">@{username}</p>
        <span className="inline-block mt-1 text-[10px] uppercase px-2 py-0.5 rounded bg-cyber-accent/10 text-cyber-accent border border-cyber-accent/20">
          {topBadge}
        </span>
        {hasSocial && (
          <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
            {fbUrl && (
              <a href={fbUrl} target="_blank" rel="noopener noreferrer" title="Facebook">
                <img
                  src="/facebook.PNG"
                  alt="Facebook"
                  className="w-9 h-9 rounded-full object-cover border border-white/10 hover:scale-110 transition-transform duration-300"
                />
              </a>
            )}
            {ttUrl && (
              <a href={ttUrl} target="_blank" rel="noopener noreferrer" title="TikTok">
                <img
                  src="/tiktok.PNG"
                  alt="TikTok"
                  className="w-9 h-9 rounded-full object-cover border border-white/10 hover:scale-110 transition-transform duration-300"
                />
              </a>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-2 shrink-0">
        <button
          onClick={copyLink}
          className="px-4 py-2 bg-cyber-accent/20 hover:bg-cyber-accent/30 text-cyber-accent rounded-lg border border-cyber-accent/30 transition-all text-sm"
        >
          Copy Link
        </button>
      </div>
    </motion.div>
  );
}
