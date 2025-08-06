import { FieldValues, useController, UseControllerProps } from "react-hook-form";
import { LocationIQSuggestion } from "../../../lib/types";
import React, { useEffect, useMemo } from "react";
import { Box, debounce, List, ListItemButton, TextField } from "@mui/material";
import axios from "axios";

type Props<T extends FieldValues> = {
  label: string;
} & UseControllerProps<T>;

export default function LocationInput<T extends FieldValues>(props: Props<T>) {
  const { field, fieldState } = useController({ ...props });
  const [loading, setLoading] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState<LocationIQSuggestion[]>([]);
  const [inputValue, setInputValue] = React.useState(field.value || "");

  useEffect(() => {
    if (field.value && typeof field.value === "object") {
      setInputValue(field.value.venue);
    } else {
      setInputValue(field.value || "");
    }
  }, [field.value]);

  const locationIQUrl =
    "https://api.locationiq.com/v1/autocomplete?key=pk.b0df3bb9344aff25756934cb2b38f038&limit=5&dedupe=1&";

  const fetchSuggestions = useMemo(
    () =>
      debounce(async (query: string) => {
        if (!query || query.length < 3) {
          setSuggestions([]);
          return;
        }
        setLoading(true);
        try {
          const response = await axios.get<LocationIQSuggestion[]>(`${locationIQUrl}q=${query}`);
          setSuggestions(response.data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }, 500),
    []
  );

  const handleChange = async (value: string) => {
    field.onChange(value);
    await fetchSuggestions(value);
  };

  const handleSelect = (location: LocationIQSuggestion) => {
    const city = location.address?.city || location.address?.state || location.address?.village;
    const venue = location.display_name;
    const latitude = location.lat;
    const longitude = location.lon;

    console.log(venue);

    setInputValue(venue);
    field.onChange({
      city,
      venue,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    });
    setSuggestions([]);
  };

  return (
    <Box>
      <TextField
        {...props}
        value={inputValue}
        onChange={(e) => handleChange(e.target.value)}
        fullWidth
        variant="outlined"
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
      />

      {loading && <div>Loading...</div>}
      {suggestions.length > 0 && (
        <List sx={{ border: 1 }}>
          {suggestions.map((suggestion) => (
            <ListItemButton
              divider
              key={suggestion.place_id}
              onClick={() => {
                handleSelect(suggestion);
              }}
            >
              {suggestion.display_name}
            </ListItemButton>
          ))}
        </List>
      )}
    </Box>
  );
}
