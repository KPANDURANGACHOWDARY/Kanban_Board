import { forwardRef } from "react";
import { cn } from "@/utils/cn";

export const Select = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div className="relative">
      <select
        className={cn(
          "flex h-9 w-full appearance-none rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:focus-visible:ring-gray-300",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
      <div className="pointer-events-none absolute right-3 top-2.5 text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </div>
    </div>
  );
});
Select.displayName = "Select";
