"use client";

import type React from 'react';

interface DateBadgeProps {
  date: string;
  className?: string;
}

const DateBadge: React.FC<DateBadgeProps> = ({ date, className = "" }) => {
  return (
    <span 
      className={`inline-block bg-primary/20 text-primary text-xs font-semibold px-3 py-1 rounded-full ${className}`}
    >
      {date}
    </span>
  );
};

export default DateBadge;
