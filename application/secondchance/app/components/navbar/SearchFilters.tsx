'use client';

import useSearchModal from '@/app/hooks/useSearchModal';

const SearchFilters = () => {
  const searchModal = useSearchModal();

  return (
    <div className="flex h-[48px] flex-row items-center justify-between rounded-full border lg:h-[64px]">
      <div className="hidden lg:block">
        <div className="flex flex-row items-center justify-between">
          <div
            className="flex h-[48px] cursor-pointer flex-col justify-center rounded-full px-8 hover:bg-gray-100 lg:h-[64px]"
            onClick={() => searchModal.open('location')}
          >
            <p className="text-xs font-semibold">Where</p>
            <p className="text-sm">Wanted location</p>
          </div>

          <div
            className="flex h-[48px] cursor-pointer flex-col justify-center rounded-full px-8 hover:bg-gray-100 lg:h-[64px]"
            onClick={() => searchModal.open('checkin')}
          >
            <p className="text-xs font-semibold">Pick-up Date</p>
            <p className="text-sm">Add dates</p>
          </div>

          <div
            className="flex h-[48px] cursor-pointer flex-col justify-center rounded-full px-8 hover:bg-gray-100 lg:h-[64px]"
            onClick={() => searchModal.open('checkout')}
          >
            <p className="text-xs font-semibold">Return Date</p>
            <p className="text-sm">Add dates</p>
          </div>

          <div
            className="flex h-[48px] cursor-pointer flex-col justify-center rounded-full px-8 hover:bg-gray-100 lg:h-[64px]"
            onClick={() => searchModal.open('condition')}
          >
            <p className="text-xs font-semibold">Condition</p>
            <p className="text-sm">Select condition</p>
          </div>

          <div
            className="flex h-[48px] cursor-pointer flex-col justify-center rounded-full px-8 hover:bg-gray-100 lg:h-[64px]"
            onClick={() => searchModal.open('price')}
          >
            <p className="text-xs font-semibold">Price Range</p>
            <p className="text-sm">Select range</p>
          </div>
        </div>
      </div>

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
