"use client";

import type React from 'react';

interface SectionHeaderProps {
  title: string;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, className = "" }) => {
  return (
    <div className={`relative flex justify-center items-center my-8 ${className}`}>
      <h2 className="text-2xl md:text-3xl font-semibold text-white uppercase tracking-widest cyberpunk-text-glow px-4 bg-transparent z-10">
        {title}
      </h2>
      <div className="absolute left-0 right-0 top-1/2 h-px bg-white/20 cyberpunk-border"></div>
    </div>
  );
};

export default SectionHeader;
