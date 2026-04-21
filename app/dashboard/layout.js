"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const [isMounted, setIsMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isMounted || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-900 border-t-transparent dark:border-gray-100 dark:border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden dark:bg-gray-900 relative">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex flex-1 flex-col overflow-hidden w-full">
        <Topbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
