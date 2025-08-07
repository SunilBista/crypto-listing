import type { CryptoCurrencyType, CryptoTableType } from "../types/crypto";

const BASE_URL = import.meta.env.VITE_COIN_GECKO_BASE_URL;

export const cryptoApi = {
  async getCryptocurrencies(
    page: number = 1,
    perPage: number = 10,
    sortBy: string = "market_cap_desc"
  ): Promise<CryptoTableType[]> {
    try {
      const response = await fetch(
        `${BASE_URL}/coins/markets?vs_currency=aud&order=${sortBy}&per_page=${perPage}&page=${page}`
      );

      if (!response.ok) {
        throw new Error(`Error occured ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },

  async getCryptocurrencyDetail(id: string): Promise<CryptoCurrencyType> {
    try {
      const response = await fetch(
        `${BASE_URL}/coins/markets?vs_currency=aud&ids=${id}`
      );

      if (!response.ok) {
        throw new Error(`Error occured ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
};
