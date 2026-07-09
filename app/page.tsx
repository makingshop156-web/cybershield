"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/roadmap");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyber-bg">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-cyber-accent border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-cyber-muted">Đang chuyển hướng...</p>
      </div>
    </div>
  );
}
