'use client';

import useSearchModal, { SearchQuery } from "@/app/hooks/useSearchModal";
import { useState } from "react";
import { Range } from "react-date-range";
import DatePicker from "../forms/Calendar";
import CustomButton from "../forms/CustomButton";
import SelectCountry, { SelectCountryValue } from "../forms/SelectCountry";
import Modal from "./Modal";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

const SearchModal = () => {
    let content = (<></>);
    const searchModal = useSearchModal();
    const [condition, setCondition] = useState<string>('');
    const [country, setCountry] = useState<SelectCountryValue>();
    const [priceMin, setPriceMin] = useState<string>('');
    const [priceMax, setPriceMax] = useState<string>('');
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);

    const closeAndSearch = () => {
        const newSearchQuery: SearchQuery = {
            country: country?.label,
            checkIn: dateRange.startDate,
            checkOut: dateRange.endDate,
            category: condition,
            priceMin: priceMin ? parseInt(priceMin) : undefined,
            priceMax: priceMax ? parseInt(priceMax) : undefined,
            condition: condition
        }

        searchModal.setQuery(newSearchQuery);
        searchModal.close();
    }

    const _setDateRange = (selection: Range) => {
        if (searchModal.step === 'checkin') {
            searchModal.open('checkout');
        } else if (searchModal.step === 'checkout') {
            searchModal.open('details');
        }

        setDateRange(selection);
    }

    const contentLocation = (
        <>
            <h2 className="mb-6 text-2xl">Where are you looking for items?</h2>

            <SelectCountry
                value={country}
                onChange={(value) => setCountry(value as SelectCountryValue)}
            />

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label="Select pickup date ->"
                    onClick={() => searchModal.open('checkin')}
                />
            </div>
        </>
    )

    const contentCheckin = (
        <>
            <h2 className="mb-6 text-2xl">When do you need the item?</h2>

            <DatePicker
                value={dateRange}
                onChange={(value) => _setDateRange(value.selection)}
            />

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label="<- Location"
                    onClick={() => searchModal.open('location')}
                />

                <CustomButton
                    label="Return date ->"
                    onClick={() => searchModal.open('checkout')}
                />
            </div>
        </>
    )

    const contentCheckout = (
        <>
            <h2 className="mb-6 text-2xl">When will you return the item?</h2>

            <DatePicker
                value={dateRange}
                onChange={(value) => _setDateRange(value.selection)}
            />

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label="<- Pickup date"
                    onClick={() => searchModal.open('checkin')}
                />

                <CustomButton
                    label="Details ->"
                    onClick={() => searchModal.open('details')}
                />
            </div>
        </>
    )

    const contentDetails = (
        <>
            <h2 className="mb-6 text-2xl">Item Details</h2>

            <div className="space-y-4">
                <div className="space-y-4">
                    <label>Item condition:</label>
                    <input
                        type="text"
                        value={condition}
                        placeholder="Condition of the item (e.g., New, Like New, Used)"
                        onChange={(e) => setCondition(e.target.value)}
                        className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                    />
                </div>

                <div className="space-y-4">
                    <label>Minimum Price:</label>
                    <input
                        type="number"
                        value={priceMin}
                        placeholder="Minimum price"
                        onChange={(e) => setPriceMin(e.target.value)}
                        className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                    />
                </div>

                <div className="space-y-4">
                    <label>Maximum Price:</label>
                    <input
                        type="number"
                        value={priceMax}
                        placeholder="Maximum price"
                        onChange={(e) => setPriceMax(e.target.value)}
                        className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                    />
                </div>
            </div>

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label="<- Return date"
                    onClick={() => searchModal.open('checkout')}
                />

                <CustomButton
                    label="Search"
                    onClick={closeAndSearch}
                />
            </div>
        </>
    )

    if (searchModal.step === 'location') {
        content = content;
    } else if (searchModal.step === 'checkin') {
        content = contentCheckin;
    } else if (searchModal.step === 'checkout') {
        content = contentCheckout;
    } else if (searchModal.step === 'details') {
        content = contentDetails;
    }

    return (
        <Modal
            label="Search"
            content={content}
            close={searchModal.close}
            isOpen={searchModal.isOpen}
        />
    )
}

export default SearchModal;
