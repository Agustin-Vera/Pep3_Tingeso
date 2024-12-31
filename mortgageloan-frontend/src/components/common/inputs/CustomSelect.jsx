import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const CustomSelect = ({ label, value, onChange, options }) => {
  return (
    <FormControl
      fullWidth
      variant="filled"
      sx={{
        m: 1,
        width: "100%",
        bgcolor: "#fff",
        p: 1.5,
        borderRadius: 2,
      }}
    >
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={onChange}>
        <MenuItem value="">
          <em>Selecciona una opción</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
