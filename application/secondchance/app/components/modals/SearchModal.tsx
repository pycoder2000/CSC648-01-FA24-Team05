"use client";

import CustomButton from "@/app/components/buttons/CustomButton";
import DatePicker from "@/app/components/forms/Calendar";
import SelectCountry, {
  SelectCountryValue,
} from "@/app/components/forms/SelectCountry";
import useSearchModal, { SearchQuery } from "@/app/hooks/useSearchModal";
import { useState } from "react";
import { Range } from "react-date-range";
import Modal from "@/app/components/modals/Modal";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const SearchModal = () => {
  let content = <></>;
  const searchModal = useSearchModal();
  const [country, setCountry] = useState<SelectCountryValue>();
  const [condition, setCondition] = useState<string>("");
  const [priceMin, setPriceMin] = useState<string>("");
  const [priceMax, setPriceMax] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const closeAndSearch = () => {
    const newSearchQuery: SearchQuery = {
      location: country?.label,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      condition: condition,
      priceMin: parseInt(priceMin) || undefined,
      priceMax: parseInt(priceMax) || undefined,
      category: category,
    };

    searchModal.setQuery(newSearchQuery);
    searchModal.close();
  };

  const _setDateRange = (selection: Range) => {
    if (searchModal.step === "checkin") {
      searchModal.open("checkout");
    } else if (searchModal.step === "checkout") {
      searchModal.open("details");
    }

    setDateRange(selection);
  };

  const contentLocation = (
    <>
      <h2 className="mb-6 text-2xl">Where do you want to rent from?</h2>

      <SelectCountry
        value={country}
        onChange={(value) => setCountry(value as SelectCountryValue)}
      />

      <div className="mt-6 flex flex-row gap-4">
        <CustomButton
          label="Pick-up date ->"
          onClick={() => searchModal.open("checkin")}
        />
      </div>
    </>
  );

  const contentCheckin = (
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
          label="Return date ->"
          onClick={() => searchModal.open("checkout")}
        />
      </div>
    </>
  );

  const contentCheckout = (
    <>
      <h2 className="mb-6 text-2xl">When do you want to return?</h2>

      <DatePicker
        value={dateRange}
        onChange={(value) => _setDateRange(value.selection)}
      />

      <div className="mt-6 flex flex-row gap-4">
        <CustomButton
          label="<- Pick-up date"
          onClick={() => searchModal.open("checkin")}
        />

        <CustomButton
          label="Details ->"
          onClick={() => searchModal.open("details")}
        />
      </div>
    </>
  );

  const contentDetails = (
    <>
      <h2 className="mb-6 text-2xl">Details</h2>

      <div className="space-y-4">
        <div className="space-y-4">
          <label>Condition:</label>
          <input
            type="text"
            value={condition}
            placeholder="Enter condition..."
            onChange={(e) => setCondition(e.target.value)}
            className="w-full h-14 px-4 border border-gray-300 rounded-xl"
          />
        </div>

        <div className="space-y-4">
          <label>Price Range:</label>
          <div className="flex gap-4">
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
        </div>

        <div className="space-y-4">
          <label>Category:</label>
          <input
            type="text"
            value={category}
            placeholder="Enter category..."
            onChange={(e) => setCategory(e.target.value)}
            className="w-full h-14 px-4 border border-gray-300 rounded-xl"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-row gap-4">
        <CustomButton
          label="<- Return date"
          onClick={() => searchModal.open("checkout")}
        />

        <CustomButton label="Search" onClick={closeAndSearch} />
      </div>
    </>
  );

  if (searchModal.step == "location") {
    content = contentLocation;
  } else if (searchModal.step == "checkin") {
    content = contentCheckin;
  } else if (searchModal.step == "checkout") {
    content = contentCheckout;
  } else if (searchModal.step == "details") {
    content = contentDetails;
  }

  return (
    <Modal
      label="Search"
      content={content}
      close={searchModal.close}
      isOpen={searchModal.isOpen}
    />
  );
};

export default SearchModal;
