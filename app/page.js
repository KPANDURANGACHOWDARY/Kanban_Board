"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function Home() {
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-900 border-t-transparent dark:border-gray-100 dark:border-t-transparent"></div>
    </div>
  );
}
