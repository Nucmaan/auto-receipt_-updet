"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    // Add a small delay to ensure auth state is loaded
    const timer = setTimeout(() => {
      if (user) {
        router.replace('/dashboard');
      } else {
        router.replace('/login');
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [user, router]);

  // Show loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#ff4e00]"></div>
    </div>
  );
}

