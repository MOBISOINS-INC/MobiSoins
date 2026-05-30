'use client';

import { cn } from '@/lib/utils';

interface AppStoreButtonProps {
  className?: string;
}

export const AppStoreButton = ({ className }: AppStoreButtonProps) => {
  return (
    <div
      role="button"
      aria-disabled="true"
      className={cn(
        'inline-flex items-center gap-3 px-5 py-3 rounded-xl select-none cursor-default',
        'bg-[#1a1a24] border border-white/10 text-white',
        className
      )}
    >
      {/* Apple logo */}
      <svg width="20" height="24" viewBox="0 0 814 1000" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-42.3-150.3-108.3C27.1 766.2 0 633.6 0 506.6c0-204.9 133.4-313.1 264.4-313.1 69.4 0 127.1 45.5 170.4 45.5 41.3 0 106.1-49.2 185.8-49.2zm-181.7-111c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
      </svg>
      <div className="flex flex-col leading-tight">
        <span className="text-[9px] font-medium tracking-wider text-white/70 uppercase">Coming soon</span>
        <span className="text-[15px] font-semibold tracking-tight text-white">App Store</span>
      </div>
    </div>
  );
};
