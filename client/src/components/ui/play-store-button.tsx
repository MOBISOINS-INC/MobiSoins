'use client';

import { cn } from '@/lib/utils';

interface PlayStoreButtonProps {
  className?: string;
}

export const PlayStoreButton = ({ className }: PlayStoreButtonProps) => {
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
      {/* Play Store logo */}
      <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.599609 0.540039L12.3996 12.0001L0.599609 23.4601C0.229609 23.1601 0 22.7001 0 22.1701V1.82004C0 1.29004 0.229609 0.840039 0.599609 0.540039Z" fill="#32BBFF"/>
        <path d="M16.3994 8.08008L12.3994 12.0001L16.3994 15.9201L21.1994 13.2601C22.4594 12.5601 22.4594 11.4401 21.1994 10.7401L16.3994 8.08008Z" fill="#FFD700"/>
        <path d="M0.599609 23.4601C0.989609 23.7801 1.51961 23.8601 2.09961 23.5601L14.1996 16.9401L12.3996 12.0001L0.599609 23.4601Z" fill="#FF3B30"/>
        <path d="M14.1996 7.05957L2.09961 0.43957C1.51961 0.13957 0.989609 0.21957 0.599609 0.53957L12.3996 11.9996L14.1996 7.05957Z" fill="#00E676"/>
      </svg>
      <div className="flex flex-col leading-tight">
        <span className="text-[9px] font-medium tracking-wider text-white/70 uppercase">Coming soon</span>
        <span className="text-[15px] font-semibold tracking-tight text-white">Google Play</span>
      </div>
    </div>
  );
};
