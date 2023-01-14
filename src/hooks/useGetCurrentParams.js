import { useSearchParams } from "react-router-dom";

export const useGetCurrentParams = () => {
  // The searchParams object contains the current search params
  const [searchParams] = useSearchParams();

  // Create a Map to store the search params
  const searchParamsMap = new Map();

  // Iterate over the search params and add them to the Map
  for (const [key, value] of Array.from(searchParams.entries())) {
    if (searchParamsMap.has(key)) {
      // If the key already exists in the Map, convert the value to an array
      // if it's not already an array, and push the new value to the array
      const currentValue = searchParamsMap.get(key);
      if (!Array.isArray(currentValue)) {
        searchParamsMap.set(key, [currentValue]);
      }
      searchParamsMap.get(key).push(value);
    } else {
      // If the key doesn't exist in the Map, add it with the value
      searchParamsMap.set(key, [value]);
    }
  }

  // Convert the Map to an object
  const searchParamsObject = {};
  for (const [key, value] of searchParamsMap.entries()) {
    searchParamsObject[key] = value;
  }

  return searchParamsObject;
};
