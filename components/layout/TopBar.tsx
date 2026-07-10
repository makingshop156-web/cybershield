"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/hooks/useAuth";
import { ENABLE_AUTH } from "@/lib/auth/config";

interface TopBarProps {
  streak: number;
  badges: number;
  completed: number;
  total: number;
}

const NAV_ITEMS = [
  { href: "/roadmap", label: "Lộ trình" },
  { href: "/advanced-roadmap", label: "Nâng cao" },
  { href: "/exam", label: "Thi" },
  { href: "/arena", label: "Đấu trường" },
  { href: "/lab", label: "Lab" },
  { href: "/docs", label: "Docs" },
  { href: "/profile", label: "Hồ sơ" },
] as const;

export function TopBar({ streak, badges, completed, total }: TopBarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 glass-strong border-b border-glass-border">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/roadmap" className="flex items-center gap-2 group">
          <motion.span className="text-lg font-bold gradient-text" whileHover={{ scale: 1.02 }}>
            CyberShield
          </motion.span>
        </Link>

        <nav className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-xs px-3 py-1.5 rounded-md transition-colors duration-200",
                  isActive ? "text-cyber-accent" : "text-cyber-muted hover:text-cyber-text"
                )}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 bg-cyber-accent/10 rounded-md -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}

          {ENABLE_AUTH && user && (user.role === "ADMIN" || user.role === "OWNER") && (
            <Link
              href="/admin-dashboard"
              className={cn(
                "relative text-xs px-3 py-1.5 rounded-md transition-colors",
                pathname.startsWith("/admin-dashboard")
                  ? "text-yellow-400" : "text-yellow-400/60 hover:text-yellow-400"
              )}
            >
              Admin
              {pathname.startsWith("/admin-dashboard") && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 bg-yellow-400/10 rounded-md -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          )}

          <div className="ml-4 flex items-center gap-3 text-xs text-cyber-muted border-l border-glass-border pl-4">
            <motion.span
              key={streak}
              initial={{ scale: 1.3 }}
              animate={{ scale: 1 }}
              className="tabular-nums"
            >
              🔥 {streak}
            </motion.span>
            <span>🏆 {badges}</span>
            <span className="hidden sm:inline tabular-nums">{completed}/{total}</span>

            {ENABLE_AUTH && (
              <>
                {user ? (
                  <button onClick={logout} className="text-red-400/60 hover:text-red-400 transition-colors">
                    Đăng xuất
                  </button>
                ) : (
                  <Link href="/login" className="text-cyber-accent hover:underline">
                    Đăng nhập
                  </Link>
                )}
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
