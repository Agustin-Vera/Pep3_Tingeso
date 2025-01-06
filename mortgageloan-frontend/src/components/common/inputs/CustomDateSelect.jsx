import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";

const CustomDateSelect = ({ handleDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDate = (date) => {
    setSelectedDate(date);
    if (date) {
      const formattedBirthDate = date.format("YYYY-MM-DD");
      console.log("Fecha formateada: ", formattedBirthDate);
      handleDateChange(formattedBirthDate);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        sx={{
          backgroundColor: "white",
          p: 1.5,
          borderRadius: 2,
        }}
        label="Seleccionar Fecha"
        value={selectedDate}
        onChange={handleDate}
      />
    </LocalizationProvider>
  );
};
export default CustomDateSelect;
