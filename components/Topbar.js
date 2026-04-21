"use client";

import { Bell, Moon, Sun, Search, User, LogOut, Menu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/redux/slices/uiSlice";
import { setSearchQuery } from "@/redux/slices/filterSlice";
import { logout } from "@/redux/slices/userSlice";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/utils/cn";

export function Topbar({ onMenuClick }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useSelector((state) => state.ui.theme);
  const user = useSelector((state) => state.user.user);
  const searchQuery = useSelector((state) => state.filter.searchQuery);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm dark:border-gray-800 dark:bg-gray-950 sm:px-6 lg:px-8">
      <div className="flex flex-1 items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden shrink-0 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="relative w-full max-w-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-gray-400" aria-hidden="true" />
          </div>
          <Input
            type="search"
            placeholder="Search tasks..."
            className="pl-10 w-full rounded-full bg-gray-50 border-transparent focus:border-indigo-500 focus:bg-white dark:bg-gray-900 dark:focus:bg-gray-950"
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
        </Button>

        <div className="relative">
          <button
            className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold dark:bg-indigo-900 dark:text-indigo-300">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-900 dark:ring-gray-800 z-50 transition-all duration-200 ease-out">
              <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{user?.name || "User"}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
              </div>
              <button
                href="#"
                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                <User className="mr-3 h-4 w-4" aria-hidden="true" />
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-800 font-medium"
              >
                <LogOut className="mr-3 h-4 w-4" aria-hidden="true" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
