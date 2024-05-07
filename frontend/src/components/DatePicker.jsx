import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MyDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
    console.log(date);
  };

  const isFutureDate = date => {
    const today = new Date();
    return date > today;
  };

  const isPastDate = date => {
    const today = new Date();
    return date <= today;
  };

  return (
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        maxDate={new Date()} // Set maxDate to today to disable future dates
        filterDate={isPastDate} // Use isPastDate to disable future dates
      />
  );
};

export default MyDatePicker;
