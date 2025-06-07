"use client";

import type React from 'react';
import { cn } from "@/lib/utils"

interface DateBadgeProps {
  date: string;
  className?: string;
}

const DateBadge: React.FC<DateBadgeProps> = ({ date, className = "" }) => {
  return (
    <div className={cn("relative inline-block", className)}>
      <div className="relative inline-flex items-center bg-[#EA3AB8] text-white font-semibold text-xs px-4 py-1 ">
        {date}
        {/* Arrow shape on left side */}
        <div className="absolute left-0  top-0 h-full w-2 flex items-center justify-center">
          <div className="w-0 h-0 border-y-[12px] border-y-transparent border-l-[12px] border-l-[#48347E] "></div>
        </div>
      </div>
    </div>
  );
};

export default DateBadge;
