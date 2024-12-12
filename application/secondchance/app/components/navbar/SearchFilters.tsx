'use client';

import useSearchModal from '@/app/hooks/useSearchModal';
import { useState } from 'react';

const SearchFilters = () => {
  const searchModal = useSearchModal();
  const [highlightStyle, setHighlightStyle] = useState<{
    width: string;
    left: string;
    opacity: string;
  }>({
    width: '0px',
    left: '0px',
    opacity: '0',
  });

  const moveHighlight = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget as HTMLDivElement;
    const { offsetWidth, offsetLeft } = target;

    setHighlightStyle({
      width: `${offsetWidth}px`,
      left: `${offsetLeft}px`,
      opacity: '1', // Make the highlight visible on hover
    });
  };

  const resetHighlight = () => {
    setHighlightStyle({
      width: '0px',
      left: '0px',
      opacity: '0', // Hide the highlight when not hovering
    });
  };

  return (
    <div className="relative flex h-[64px] flex-row items-center justify-between rounded-full border lg:h-[64px]">
      {/* Animated Highlight */}
      <div
        id="highlight"
        className="pointer-events-none absolute top-0 h-[64px] rounded-full bg-gray-100 transition-all duration-300 ease-in-out"
        style={{
          width: highlightStyle.width,
          left: highlightStyle.left,
          opacity: highlightStyle.opacity,
        }}
      ></div>

      {/* Search Options */}
      <div className="relative hidden lg:block">
        <div
          className="relative flex flex-row items-center justify-between"
          onMouseLeave={resetHighlight} // Reset highlight on leaving the container
        >
          <div
            className="relative z-10 flex h-[64px] cursor-pointer flex-col justify-center px-8 lg:h-[64px]"
            onMouseEnter={moveHighlight}
            onClick={() => searchModal.open('location')}
          >
            <p className="text-xs font-semibold">Where</p>
            <p className="text-sm">Wanted location</p>
          </div>

          <div
            className="relative z-10 flex h-[64px] cursor-pointer flex-col justify-center px-8 lg:h-[64px]"
            onMouseEnter={moveHighlight}
            onClick={() => searchModal.open('checkin')}
          >
            <p className="text-xs font-semibold">Pick-up Date</p>
            <p className="text-sm">Add dates</p>
          </div>

          <div
            className="relative z-10 flex h-[64px] cursor-pointer flex-col justify-center px-8 lg:h-[64px]"
            onMouseEnter={moveHighlight}
            onClick={() => searchModal.open('checkout')}
          >
            <p className="text-xs font-semibold">Return Date</p>
            <p className="text-sm">Add dates</p>
          </div>

          <div
            className="relative z-10 flex h-[64px] cursor-pointer flex-col justify-center px-8 lg:h-[64px]"
            onMouseEnter={moveHighlight}
            onClick={() => searchModal.open('condition')}
          >
            <p className="text-xs font-semibold">Condition</p>
            <p className="text-sm">Select condition</p>
          </div>

          <div
            className="relative z-10 flex h-[64px] cursor-pointer flex-col justify-center px-8 lg:h-[64px]"
            onMouseEnter={moveHighlight}
            onClick={() => searchModal.open('price')}
          >
            <p className="text-xs font-semibold">Price Range</p>
            <p className="text-sm">Select range</p>
          </div>
        </div>
      </div>

      {/* Search Button */}
      <div className="px-2">
        <div className="cursor-pointer rounded-full bg-secondchance p-2 text-white transition hover:bg-secondchance-dark lg:p-4">
          <svg
            viewBox="0 0 32 32"
            style={{
              display: 'block',
              fill: 'none',
              height: '16px',
              width: '16px',
              stroke: 'currentColor',
              strokeWidth: 4,
              overflow: 'visible',
            }}
            aria-hidden="true"
            role="presentation"
            focusable="false"
          >
            <path fill="none" d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
