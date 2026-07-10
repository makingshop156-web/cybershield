"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { ENABLE_AUTH } from "@/lib/auth/config";
import RegisterForm from "@/components/features/auth/RegisterForm";

export default function RegisterPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!ENABLE_AUTH || loading) return;
    if (user) router.replace("/");
  }, [user, loading, router]);

  if (!ENABLE_AUTH) { router.replace("/"); return null; }
  if (loading || user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <RegisterForm />
    </div>
  );
}
