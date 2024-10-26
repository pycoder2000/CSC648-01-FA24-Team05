"use client";

import CustomButton from "@/app/components/buttons/CustomButton";
import DatePicker from "@/app/components/forms/Calendar";
import SelectCountry, {
  SelectCountryValue,
} from "@/app/components/forms/SelectCountry";
import Modal from "@/app/components/modals/Modal";
import useSearchModal, { SearchQuery } from "@/app/hooks/useSearchModal";
import { useState } from "react";
import { Range } from "react-date-range";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const SearchModal = () => {
  const searchModal = useSearchModal();
  const [country, setCountry] = useState<SelectCountryValue | undefined>(
    undefined
  );
  const [condition, setCondition] = useState<string>("");
  const [priceMin, setPriceMin] = useState<string>("");
  const [priceMax, setPriceMax] = useState<string>("");
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const closeAndSearch = () => {
    const newSearchQuery: SearchQuery = {
      location: country?.label,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      condition: condition,
      priceMin: parseInt(priceMin) || undefined,
      priceMax: parseInt(priceMax) || undefined,
    };

    searchModal.setQuery(newSearchQuery);
    searchModal.close();
  };

  const _setDateRange = (selection: Range) => {
    setDateRange(selection);
  };

  const renderContent = () => {
    switch (searchModal.step) {
      case "location":
        return (
          <>
            <h2 className="mb-6 text-2xl">Where do you want to rent from?</h2>
            <SelectCountry
              value={country}
              onChange={(value) => setCountry(value as SelectCountryValue)}
            />
            <div className="mt-6 flex flex-row gap-4">
              <CustomButton
                label="Pick-up Date ->"
                onClick={() => searchModal.open("checkin")}
              />
            </div>
          </>
        );

      case "checkin":
        return (
          <>
            <h2 className="mb-6 text-2xl">When do you want to pick up?</h2>
            <DatePicker
              value={dateRange}
              onChange={(value) => _setDateRange(value.selection)}
            />
            <div className="mt-6 flex flex-row gap-4">
              <CustomButton
                label="<- Location"
                onClick={() => searchModal.open("location")}
              />
              <CustomButton
                label="Return Date ->"
                onClick={() => searchModal.open("checkout")}
              />
            </div>
          </>
        );

      case "checkout":
        return (
          <>
            <h2 className="mb-6 text-2xl">When do you want to return?</h2>
            <DatePicker
              value={dateRange}
              onChange={(value) => _setDateRange(value.selection)}
            />
            <div className="mt-6 flex flex-row gap-4">
              <CustomButton
                label="<- Pick-up Date"
                onClick={() => searchModal.open("checkin")}
              />
              <CustomButton
                label="Condition ->"
                onClick={() => searchModal.open("condition")}
              />
            </div>
          </>
        );

      case "condition":
        return (
          <>
            <h2 className="mb-6 text-2xl">Condition</h2>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full h-14 px-4 border border-gray-300 rounded-xl"
            >
              <option value="">Select condition</option>
              <option value="new">New</option>
              <option value="like new">Like New</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
            <div className="mt-6 flex flex-row gap-4">
              <CustomButton
                label="<- Return Date"
                onClick={() => searchModal.open("checkout")}
              />
              <CustomButton
                label="Price Range ->"
                onClick={() => searchModal.open("price")}
              />
            </div>
          </>
        );

      case "price":
        return (
          <>
            <h2 className="mb-6 text-2xl">Price Range</h2>
            <div className="space-y-4">
              <input
                type="number"
                min="0"
                value={priceMin}
                placeholder="Min price"
                onChange={(e) => setPriceMin(e.target.value)}
                className="w-full h-14 px-4 border border-gray-300 rounded-xl"
              />
              <input
                type="number"
                min="0"
                value={priceMax}
                placeholder="Max price"
                onChange={(e) => setPriceMax(e.target.value)}
                className="w-full h-14 px-4 border border-gray-300 rounded-xl"
              />
            </div>
            <div className="mt-6 flex flex-row gap-4">
              <CustomButton
                label="<- Condition"
                onClick={() => searchModal.open("condition")}
              />
              <CustomButton label="Search" onClick={closeAndSearch} />
            </div>
          </>
        );

      default:
        return (
          <div className="p-4">
            <p>Step not recognized. Please go back and try again.</p>
          </div>
        );
    }
  };

  return (
    <Modal
      label="Search"
      content={renderContent()}
      close={searchModal.close}
      isOpen={searchModal.isOpen}
    />
  );
};

export default SearchModal;
