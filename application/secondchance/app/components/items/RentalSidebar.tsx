'use client';

import DatePicker from '@/app/components/forms/Calendar';
import useLoginModal from '@/app/hooks/useLoginModal';
import useSuccessModal from '@/app/hooks/useSuccessModal';
import apiService from '@/app/services/apiService';
import { differenceInDays, eachDayOfInterval, format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Range } from 'react-date-range';

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
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
  const successModal = useSuccessModal();
  const router = useRouter();

  const [fee, setFee] = useState<number>(0);
  const [days, setDays] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [minDate, setMinDate] = useState<Date>(new Date());
  const [reservedDates, setReservedDates] = useState<Date[]>([]);
  const [sustainabilityScore, setSustainabilityScore] = useState<number>(0);

  const processRental = async () => {
    if (userId) {
      if (dateRange.startDate && dateRange.endDate) {
        const formData = new FormData();
        // removed fields not present in Rental Model
        // formData.append('location', item.location); 
        // formData.append('condition', item.condition);
        // formData.append('category', item.category);
        formData.append('start_date', format(dateRange.startDate, 'yyyy-MM-dd'));
        formData.append('end_date', format(dateRange.endDate, 'yyyy-MM-dd'));
        formData.append('number_of_days', days.toString());
        formData.append('total_price', totalPrice.toString());

        const response = await apiService.post(`/api/items/${item.id}/rent/`, formData);

        if (response.success) {
          successModal.open();
        } else {
          console.log('Something went wrong...');
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

  const fetchSustainabilityScore = async () => {
    if (userId) {
      try {
        const userData = await apiService.get(`/api/auth/users/${userId}/`);
        setSustainabilityScore(userData.sustainability_score || 0);
      } catch (error) {
        console.error('Error fetching sustainability score:', error);
      }
    }
  };

  // bug fix: made the second useEffect wait for the sustainabilityScore to change
  // instead of executing before it
  useEffect(() => {
    getRentals();
    fetchSustainabilityScore();
  }, [userId]);

  useEffect(() => {

    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && item.price_per_day) {
        const _fee = ((dayCount * item.price_per_day) / 100) * 5;

        const discountModifier = 0.03;
        let sustainabilityDiscount = sustainabilityScore * discountModifier;

        console.log("SUSTAINABILITY DISCOUNT:", sustainabilityDiscount);

        setFee(_fee);
        setTotalPrice((dayCount * item.price_per_day + _fee) - sustainabilityDiscount);
        setDays(dayCount);
      } else {
        const _fee = (item.price_per_day / 100) * 5;

        setFee(_fee);
        setTotalPrice(item.price_per_day + _fee);
        setDays(1);
      }
    }
  }, [dateRange, sustainabilityScore], ); 

  return (
    <aside className="col-span-2 mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-xl">
      <h2 className="mb-2 text-2xl font-semibold text-gray-800">Booking Summary</h2>
      <p className="mb-5 text-lg text-gray-600">${item.price_per_day} / day</p>

      <div className="mb-5">
        <h3 className="mb-3 text-lg font-medium text-gray-700">Select Dates</h3>
        <DatePicker
          value={dateRange}
          reservedDates={reservedDates}
          onChange={(value) => _setDateRange(value.selection)}
        />
      </div>

      <div
        onClick={processRental}
        className="mb-6 w-full cursor-pointer rounded-lg bg-secondchance py-3 text-center text-white transition hover:bg-secondchance-dark"
      >
        Book Now
      </div>

      <div className="mb-4 flex items-center justify-between text-gray-700">
        <p className="text-md">
          ${item.price_per_day} x {days} {days === 1 ? 'day' : 'days'}
        </p>
        <p className="text-md">${item.price_per_day * days}</p>
      </div>

      <div className="mb-4 flex items-center justify-between text-gray-700">
        <p className="text-md">Service Fee</p>
        <p className="text-md">${fee.toFixed(2)}</p>
      </div>

      <div className="mb-4 flex items-center justify-between text-gray-700">
        <p className="text-md">Sustainability Score Discount</p>
        <p className="text-md">${(sustainabilityScore * 0.03).toFixed(2)}</p>
      </div>

      <hr className="my-4" />

      <div className="mt-4 flex items-center justify-between text-lg font-bold text-gray-900">
        <p>Total Amount</p>
        <p>${totalPrice.toFixed(2)}</p>
      </div>
    </aside>
  );
};

export default RentalSidebar;
