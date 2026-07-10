"use client";
import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { ENABLE_AUTH } from "@/lib/auth/config";
import { useToast } from "@/lib/hooks/useToast";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (!ENABLE_AUTH || loading) return;
    if (!user) {
      toast.error("Vui lòng đăng nhập để tiếp tục");
      router.replace("/login");
    }
  }, [user, loading, router, toast]);

  if (!ENABLE_AUTH) return <>{children}</>;
  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyber-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  if (!user) return null;
  return <>{children}</>;
}

export function AdminRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (!ENABLE_AUTH || loading) return;
    if (!user || (user.role !== "ADMIN" && user.role !== "OWNER")) {
      toast.error("Bạn không có quyền truy cập trang này");
      router.replace("/");
    }
  }, [user, loading, router, toast]);

  if (!ENABLE_AUTH) return <>{children}</>;
  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyber-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  if (!user || (user.role !== "ADMIN" && user.role !== "OWNER")) return null;
  return <>{children}</>;
}
