"use client";
import { motion } from "framer-motion";
import { useToast } from "@/lib/hooks/useToast";

interface Props {
  displayName: string;
  avatarInitial: string;
  topBadge: string;
  username: string;
}

export default function PortfolioHeader({ displayName, avatarInitial, topBadge, username }: Props) {
  const toast = useToast();

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
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyber-accent/40 to-purple-500/40 flex items-center justify-center text-3xl font-bold text-white border-2 border-cyber-accent/30">
        {avatarInitial}
      </div>

      <div className="text-center sm:text-left flex-1">
        <h1 className="text-2xl font-bold text-white">{displayName}</h1>
        <p className="text-sm text-cyber-muted">@{username}</p>
        <span className="inline-block mt-1 text-[10px] uppercase px-2 py-0.5 rounded bg-cyber-accent/10 text-cyber-accent border border-cyber-accent/20">
          {topBadge}
        </span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={copyLink}
          className="px-4 py-2 bg-cyber-accent/20 hover:bg-cyber-accent/30 text-cyber-accent rounded-lg border border-cyber-accent/30 transition-all text-sm"
        >
          📋 Copy Link
        </button>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg border border-blue-500/30 transition-all text-sm"
        >
          LinkedIn
        </a>
      </div>
    </motion.div>
  );
}
