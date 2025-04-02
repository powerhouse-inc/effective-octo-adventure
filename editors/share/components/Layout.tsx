import React from 'react';
import ContentCard from './content-card.js';

interface LayoutProps {
  children: React.ReactNode;
}

interface LayoutHeaderProps {
  children: React.ReactNode;
}

interface LayoutContentProps {
  children: React.ReactNode;
}

interface LayoutMainProps {
  children: React.ReactNode;
  tagText?: string
  variant?: "gray" | "green"
}

// Slot components
export function LayoutHeader({ children }: LayoutHeaderProps) {
  return (
    <header>
      <div className="flex justify-between w-full">
        {children}
      </div>
    </header>
  );
}

export function LayoutContent({ children }: LayoutContentProps) {
  return (
    <div>
      <div className="flex items-center justify-between flex-wrap">
        {children}
      </div>
    </div>
  );
}

export function LayoutMain({ children, tagText, variant }: LayoutMainProps) {
  return (
    <ContentCard tagText={tagText} variant={variant} className='mt-4'>
      {children}
    </ContentCard>
  );
}

// Main Layout component
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen h-full bg-white flex flex-col rounded-2xl p-6 gap-4">
      {children}
    </div>
  );
} 