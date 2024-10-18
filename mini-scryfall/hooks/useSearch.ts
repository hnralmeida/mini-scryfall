import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.scryfall.com",
  timeout: 1000,
  headers: {
    Accept: "*/*",
    "User-Agent": "mini-scryfall",
  },
});

export const useSearch = async (searchQuery: string) => {
  try {
    const response = await instance.get(`/cards/search?q=${searchQuery}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const useAutoComplete = async (searchQuery: string) => {
  try {
    const response = await instance.get(`/cards/autocomplete?q=${searchQuery}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const useNamed = async (searchQuery: string): Promise<String[]> => {
  try {
    const response = await instance.get(`/cards/named?exact=${searchQuery}`);
    return [response.data];
  } catch (error) {
    console.error(error);
  }
  return [];
};
