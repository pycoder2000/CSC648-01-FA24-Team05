"use client";

import useLoginModal from "@/app/hooks/useLoginModal";
import apiService from "@/app/services/apiService";
import DatePicker from "@/app/components/forms/Calendar";
import { differenceInDays, eachDayOfInterval, format } from "date-fns";
import { useEffect, useState } from "react";
import { Range } from "react-date-range";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

export type Item = {
  id: string;
  location: string;
  condition: string;
  category: string;
  price_per_day: number;
};

interface RentalSidebarProps {
  userId: string | null;
  item: Item;
}

const RentalSidebar: React.FC<RentalSidebarProps> = ({ item, userId }) => {
  const loginModal = useLoginModal();

  const [fee, setFee] = useState<number>(0);
  const [days, setDays] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [minDate, setMinDate] = useState<Date>(new Date());
  const [reservedDates, setReservedDates] = useState<Date[]>([]);

  const processRental = async () => {
    console.log("processRental", userId);

    if (userId) {
      if (dateRange.startDate && dateRange.endDate) {
        const formData = new FormData();
        formData.append("location", item.location);
        formData.append("condition", item.condition);
        formData.append("category", item.category);
        formData.append(
          "start_date",
          format(dateRange.startDate, "yyyy-MM-dd")
        );
        formData.append("end_date", format(dateRange.endDate, "yyyy-MM-dd"));
        formData.append("number_of_days", days.toString());
        formData.append("total_price", totalPrice.toString());

        const response = await apiService.post(
          `/api/items/${item.id}/rent/`,
          formData
        );

        if (response.success) {
          console.log("Rental successful");
        } else {
          console.log("Something went wrong...");
        }
      }
    } else {
      loginModal.open();
    }
  };

  const _setDateRange = (selection: any) => {
    const newStartDate = new Date(selection.startDate);
    const newEndDate = new Date(selection.endDate);

    if (newEndDate <= newStartDate) {
      newEndDate.setDate(newStartDate.getDate() + 1);
    }

    setDateRange({
      ...dateRange,
      startDate: newStartDate,
      endDate: newEndDate,
    });
  };

  const getRentals = async () => {
    const rentals = await apiService.get(`/api/items/${item.id}/rentals/`);

    let dates: Date[] = [];

    rentals.forEach((rental: any) => {
      const range = eachDayOfInterval({
        start: new Date(rental.start_date),
        end: new Date(rental.end_date),
      });

      dates = [...dates, ...range];
    });

    setReservedDates(dates);
  };

  useEffect(() => {
    getRentals();

    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && item.price_per_day) {
        const _fee = ((dayCount * item.price_per_day) / 100) * 5;

        setFee(_fee);
        setTotalPrice(dayCount * item.price_per_day + _fee);
        setDays(dayCount);
      } else {
        const _fee = (item.price_per_day / 100) * 5;

        setFee(_fee);
        setTotalPrice(item.price_per_day + _fee);
        setDays(1);
      }
    }
  }, [dateRange]);

  return (
    <aside className="mt-6 p-6 col-span-2 rounded-xl border border-gray-300 shadow-xl">
      <h2 className="mb-5 text-2xl">${item.price_per_day} per day</h2>

      <DatePicker
        value={dateRange}
        reservedDates={reservedDates}
        onChange={(value) => _setDateRange(value.selection)}
      />

      <div
        onClick={processRental}
        className="w-full mb-6 py-6 text-center text-white bg-secondchance hover:bg-secondchance-dark rounded-xl"
      >
        Rent
      </div>

      <div className="mb-4 flex justify-between align-center">
        <p>
          ${item.price_per_day} * {days} days
        </p>

        <p>${item.price_per_day * days}</p>
      </div>

      <div className="mb-4 flex justify-between align-center">
        <p>Platform fee</p>

        <p>${fee}</p>
      </div>

      <hr />

      <div className="mt-4 flex justify-between align-center font-bold">
        <p>Total</p>

        <p>${totalPrice}</p>
      </div>
    </aside>
  );
};

export default RentalSidebar;
