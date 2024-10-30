'use client';

import { DateRange, Range, RangeKeyDict } from 'react-date-range';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface DatePickerProps {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  reservedDates?: Date[];
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, reservedDates }) => {
  return (
    <DateRange
      className="mb-4 w-full rounded-xl border border-gray-400"
      rangeColors={['#262626']}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={reservedDates}
    />
  );
};

export default DatePicker;
