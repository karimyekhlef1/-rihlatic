import React from 'react';
import { Card } from '@/components/ui/card';

interface TimelineItemProps {
  children: React.ReactNode;
}

export function TimelineItem({ children }: TimelineItemProps) {
  return (
    <div className="relative pl-8 pb-8">
      <div className="absolute left-0 top-2 h-full w-[2px] bg-gray-200">
        <div className="absolute top-0 left-[-4px] h-3 w-3 rounded-full border-2 border-primary bg-white" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

interface TimelineProps {
  children: React.ReactNode;
}

export function Timeline({ children }: TimelineProps) {
  return (
    <div className="relative">
      {children}
    </div>
  );
}
