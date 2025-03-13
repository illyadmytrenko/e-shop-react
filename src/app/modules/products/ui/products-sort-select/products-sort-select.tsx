import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Dispatch, SetStateAction } from "react";

interface ProductsSortSelectProps {
  sortType: "priceAsc" | "priceDesc" | "new" | "bestSellers";
  setSortType: Dispatch<
    SetStateAction<"priceAsc" | "priceDesc" | "new" | "bestSellers">
  >;
}

export function ProductsSortSelect({
  sortType,
  setSortType,
}: ProductsSortSelectProps) {
  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as
      | "priceAsc"
      | "priceDesc"
      | "new"
      | "bestSellers";
    setSortType(value);
  };

  return (
    <div className="mb-5">
      <FormControl
        sx={{
          m: 1,
          minWidth: 80,
          display: "flex",
          justifySelf: "start",
          "@media (min-width: 640px)": {
            justifySelf: "end",
          },
        }}
      >
        <InputLabel id="sortSelectLabel">Sorted by:</InputLabel>
        <Select
          labelId="sortSelectLabel"
          value={sortType}
          onChange={handleChange}
          autoWidth
          label="Sorted by:"
        >
          <MenuItem value="priceAsc">Price: ascending</MenuItem>
          <MenuItem value="priceDesc">Price: descending</MenuItem>
          <MenuItem value="new">New arrivals</MenuItem>
          <MenuItem value="bestSellers">Best Sellers</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
