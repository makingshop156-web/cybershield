"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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

function NavLink({
  item,
  isActive,
  onClick,
}: {
  item: (typeof NAV_ITEMS)[number];
  isActive: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={cn(
        "relative text-xs px-3 py-1.5 rounded-md transition-colors duration-200",
        isActive
          ? "text-cyber-accent"
          : "text-cyber-muted hover:text-cyber-text"
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
}

export function TopBar({ streak, badges, completed, total }: TopBarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isAdmin =
    ENABLE_AUTH &&
    user &&
    (user.role === "ADMIN" || user.role === "OWNER");

  return (
    <header className="sticky top-0 z-50 glass-strong border-b border-glass-border">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          href="/roadmap"
          className="flex items-center gap-2 group"
          onClick={() => setMobileOpen(false)}
        >
          <motion.span
            className="text-lg font-bold gradient-text"
            whileHover={{ scale: 1.02 }}
          >
            CyberShield
          </motion.span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              isActive={pathname.startsWith(item.href)}
            />
          ))}
          {isAdmin && (
            <Link
              href="/admin-dashboard"
              className={cn(
                "relative text-xs px-3 py-1.5 rounded-md transition-colors",
                pathname.startsWith("/admin-dashboard")
                  ? "text-yellow-400"
                  : "text-yellow-400/60 hover:text-yellow-400"
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
            <span className="hidden sm:inline tabular-nums">
              {completed}/{total}
            </span>

            {ENABLE_AUTH && (
              <>
                {user ? (
                  <button
                    onClick={logout}
                    className="text-red-400/60 hover:text-red-400 transition-colors"
                  >
                    Đăng xuất
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="text-cyber-accent hover:underline"
                  >
                    Đăng nhập
                  </Link>
                )}
              </>
            )}
          </div>
        </nav>

        <div className="flex md:hidden items-center gap-2">
          <motion.span
            key={streak}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            className="text-xs tabular-nums"
          >
            🔥 {streak}
          </motion.span>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative w-8 h-8 flex items-center justify-center rounded-lg glass hover:bg-white/10 transition-colors"
            aria-label="Menu"
          >
            <div className="w-5 flex flex-col gap-[3px]">
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                className="block h-px w-full bg-cyber-text"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block h-px w-full bg-cyber-text"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                className="block h-px w-full bg-cyber-text"
              />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden border-t border-glass-border"
          >
            <div className="px-4 py-3 space-y-1">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.href}
                  item={item}
                  isActive={pathname.startsWith(item.href)}
                  onClick={() => setMobileOpen(false)}
                />
              ))}
              {isAdmin && (
                <Link
                  href="/admin-dashboard"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block text-xs px-3 py-2 rounded-md transition-colors",
                    pathname.startsWith("/admin-dashboard")
                      ? "text-yellow-400"
                      : "text-yellow-400/60 hover:text-yellow-400"
                  )}
                >
                  Admin
                </Link>
              )}

              <div className="pt-3 mt-3 border-t border-glass-border flex items-center gap-4 text-xs text-cyber-muted">
                <span>🏆 {badges}</span>
                <span className="tabular-nums">
                  {completed}/{total}
                </span>
                {ENABLE_AUTH && (
                  <>
                    {user ? (
                      <button
                        onClick={() => {
                          logout();
                          setMobileOpen(false);
                        }}
                        className="text-red-400/60 hover:text-red-400 transition-colors ml-auto"
                      >
                        Đăng xuất
                      </button>
                    ) : (
                      <Link
                        href="/login"
                        onClick={() => setMobileOpen(false)}
                        className="text-cyber-accent hover:underline ml-auto"
                      >
                        Đăng nhập
                      </Link>
                    )}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
