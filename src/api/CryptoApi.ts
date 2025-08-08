import type { CryptoCurrencyType, CryptoTableType } from "../types/crypto";

const BASE_URL = import.meta.env.VITE_COIN_GECKO_BASE_URL;

export const cryptoApi = {
  async getCryptocurrencies(
    page: number = 1,
    perPage: number = 10,
    sortParam: string = "market_cap_desc"
  ): Promise<CryptoTableType[]> {
    try {
      const response = await fetch(
        `${BASE_URL}/coins/markets?vs_currency=aud&order=${sortParam}&per_page=${perPage}&page=${page}`
      );

      if (!response.ok) {
        throw new Error(`Error occured ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
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
      return data[0];
    } catch (error) {
      throw error;
    }
  },

  async searchCryptocurrencies(query: string): Promise<any> {
    try {
      const response = await fetch(`${BASE_URL}/search?query=${query}`);

      if (!response.ok) {
        throw new Error(`Error occured ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },
};
