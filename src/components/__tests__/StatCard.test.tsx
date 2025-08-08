import { render, screen } from "@testing-library/react";
import StatCard from "../StatCard";
import type { CryptoCurrencyType } from "../../types/crypto";
import "@testing-library/jest-dom";

jest.mock("../../utils/format", () => ({
  formatNumber: (num: number) => num.toLocaleString(),
  formatPercentage: (num: number) => `${num.toFixed(2)}%`,
}));

const mockData: CryptoCurrencyType = {
  id: "bitcoin",
  symbol: "btc",
  name: "Bitcoin",
  image: "https://example.com/bitcoin.png",
  current_price: 50000,
  market_cap: 1000000000,
  market_cap_rank: 1,
  fully_diluted_valuation: 1200000000,
  total_volume: 80000000,
  high_24h: 51000,
  low_24h: 48000,
  price_change_24h: 1000,
  price_change_percentage_24h: 2.5,
  market_cap_change_percentage_24h: -1.2,
  total_supply: 21000000,
  circulating_supply: 19000000,
  ath: 0,
  market_cap_change_24h: 0,
  ath_change_percentage: 0,
  ath_date: "",
  atl: 0,
  atl_change_percentage: 0,
  atl_date: "",
  last_updated: "",
};

describe("StatCard", () => {
  it("renders all stat labels and values", () => {
    render(<StatCard cryptoData={mockData} />);

    expect(screen.getByText("Market Cap")).toBeInTheDocument();
    expect(screen.getByText("Volume (24h)")).toBeInTheDocument();
    expect(screen.getByText("Fully Diluted Valuation")).toBeInTheDocument();
    expect(screen.getByText("Vol/Mkt Cap (24h)")).toBeInTheDocument();
    expect(screen.getByText("Total Supply")).toBeInTheDocument();
    expect(screen.getByText("Circulating Supply")).toBeInTheDocument();

    expect(screen.getByText("$1,000,000,000")).toBeInTheDocument();
    expect(screen.getByText("$80,000,000")).toBeInTheDocument();
    expect(screen.getByText("$1,200,000,000")).toBeInTheDocument();
    expect(screen.getByText("8.00%")).toBeInTheDocument();
    expect(screen.getByText("21,000,000 BTC")).toBeInTheDocument();
    expect(screen.getByText("19,000,000 BTC")).toBeInTheDocument();
  });

  it("renders price change percentage chip with correct value", () => {
    render(<StatCard cryptoData={mockData} />);
    expect(screen.getByText("2.50%")).toBeInTheDocument();
  });

  it("renders market cap percentage chip with correct value", () => {
    render(<StatCard cryptoData={mockData} />);

    const chip = screen.getByText("-1.20%");
    expect(chip).toBeInTheDocument();
  });
});
