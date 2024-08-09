import React from 'react';
import { Box, TextField } from '@mui/material';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface DateTimePickerProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ selectedDate, onDateChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '10px auto',
          maxWidth: '470px',
          gap: 1,
          marginTop: '0px'
        }}
      >
        <DatePicker
          label="Select Date"
          value={selectedDate}
          onChange={(newDate) => onDateChange(newDate)}
          renderInput={(params) => (
            <TextField {...params} fullWidth />
          )}
        />
        <TimePicker
          label="Select Time"
          value={selectedDate}
          onChange={(newTime) => onDateChange(newTime)}
          renderInput={(params) => (
            <TextField {...params} fullWidth />
          )}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default DateTimePicker;
