"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, KanbanSquare, BarChart3, X } from "lucide-react";
import { cn } from "@/utils/cn";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Drag and Drop", href: "/dashboard/kanban", icon: KanbanSquare },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
];

export function Sidebar({ isOpen, setIsOpen }) {
  const pathname = usePathname();

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 md:hidden backdrop-blur-sm" 
          onClick={() => setIsOpen(false)}
        />
      )}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-30 flex h-full w-64 flex-col border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950 transition-transform duration-300 md:relative md:translate-x-0 md:flex shadow-xl md:shadow-none",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 px-6 dark:border-gray-800">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-gray-900 dark:text-gray-50">
            <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              STM
            </div>
            SmartTask
          </div>
          <button 
            className="md:hidden p-2 -mr-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-md dark:hover:bg-gray-800"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-50"
              )}
            >
              <Icon
                className={cn(
                  "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                  isActive
                    ? "text-indigo-700 dark:text-indigo-400"
                    : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-400"
                )}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="rounded-lg bg-gradient-to-tr from-indigo-500 flex flex-col items-start to-purple-500 p-4 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="font-semibold text-sm">Pro Plan</h4>
            <p className="text-xs opacity-90 mt-1">Unlock all features</p>
            <button className="mt-3 text-xs bg-white text-indigo-600 px-3 py-1.5 rounded-md font-medium hover:bg-indigo-50 transition">
              Upgrade
            </button>
          </div>
          <div className="absolute right-[-20%] top-[-20%] w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
        </div>
      </div>
      </div>
    </>
  );
}
