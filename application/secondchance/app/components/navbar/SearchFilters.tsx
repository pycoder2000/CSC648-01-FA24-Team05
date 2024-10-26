"use client";

import useSearchModal from "@/app/hooks/useSearchModal";

const SearchFilters = () => {
  const searchModal = useSearchModal();

  return (
    <div className="h-[48px] lg:h-[64px] flex flex-row items-center justify-between border rounded-full">
      <div className="hidden lg:block">
        <div className="flex flex-row items-center justify-between">
          <div
            className="cursor-pointer h-[48px] lg:h-[64px] px-8 flex flex-col justify-center rounded-full hover:bg-gray-100"
            onClick={() => searchModal.open("location")}
          >
            <p className="text-xs font-semibold">Where</p>
            <p className="text-sm">Wanted location</p>
          </div>

          <div
            className="cursor-pointer h-[48px] lg:h-[64px] px-8 flex flex-col justify-center rounded-full hover:bg-gray-100"
            onClick={() => searchModal.open("checkin")}
          >
            <p className="text-xs font-semibold">Pick-up Date</p>
            <p className="text-sm">Add dates</p>
          </div>

          <div
            className="cursor-pointer h-[48px] lg:h-[64px] px-8 flex flex-col justify-center rounded-full hover:bg-gray-100"
            onClick={() => searchModal.open("checkout")}
          >
            <p className="text-xs font-semibold">Return Date</p>
            <p className="text-sm">Add dates</p>
          </div>

          <div
            className="cursor-pointer h-[48px] lg:h-[64px] px-8 flex flex-col justify-center rounded-full hover:bg-gray-100"
            onClick={() => searchModal.open("condition")}
          >
            <p className="text-xs font-semibold">Condition</p>
            <p className="text-sm">Select condition</p>
          </div>

          <div
            className="cursor-pointer h-[48px] lg:h-[64px] px-8 flex flex-col justify-center rounded-full hover:bg-gray-100"
            onClick={() => searchModal.open("price")}
          >
            <p className="text-xs font-semibold">Price Range</p>
            <p className="text-sm">Select range</p>
          </div>
        </div>
      </div>

      <div className="px-2">
        <div className="cursor-pointer p-2 lg:p-4 bg-secondchance hover:bg-secondchance-dark transition rounded-full text-white">
          <svg
            viewBox="0 0 32 32"
            style={{
              display: "block",
              fill: "none",
              height: "16px",
              width: "16px",
              stroke: "currentColor",
              strokeWidth: 4,
              overflow: "visible",
            }}
            aria-hidden="true"
            role="presentation"
            focusable="false"
          >
            <path
              fill="none"
              d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
