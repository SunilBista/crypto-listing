import { render, screen } from "@testing-library/react";
import MainCard from "../MainCard";
import { type CryptoCurrencyType } from "../../types/crypto";
import "@testing-library/jest-dom";

const mockDataPositive: CryptoCurrencyType = {
  id: "bitcoin",
  symbol: "btc",
  name: "Bitcoin",
  image: "https://example.com/btc.png",
  market_cap_rank: 1,
  current_price: 50000,
  price_change_percentage_24h: 3.25,
  market_cap: 1000000000,
  market_cap_change_percentage_24h: 2.5,
  total_volume: 10000000,
  fully_diluted_valuation: 1200000000,
  total_supply: 21000000,
  circulating_supply: 19000000,
  ath: 0,
  high_24h: 0,
  low_24h: 0,
  price_change_24h: 0,
  market_cap_change_24h: 0,
  ath_change_percentage: 0,
  ath_date: "",
  atl: 0,
  atl_change_percentage: 0,
  atl_date: "",
  last_updated: "",
};

const mockDataNegative: CryptoCurrencyType = {
  ...mockDataPositive,
  price_change_percentage_24h: -2.1,
};

describe("MainCard component", () => {
  it("renders name, symbol, rank, and formatted current price", () => {
    render(<MainCard cryptoData={mockDataPositive} />);

    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
    expect(screen.getByText("BTC #1")).toBeInTheDocument();
    expect(screen.getByText("$50.00K")).toBeInTheDocument();
  });

  it("displays positive price change with TrendingUp icon and success color", () => {
    render(<MainCard cryptoData={mockDataPositive} />);

    const chip = screen.getByText("+3.25%");
    expect(chip).toBeInTheDocument();
    expect(chip.closest("div")).toHaveClass("MuiChip-colorSuccess");
    expect(screen.getByTestId("TrendingUpIcon")).toBeInTheDocument();
  });

  it("displays negative price change with TrendingDown icon and error color", () => {
    render(<MainCard cryptoData={mockDataNegative} />);

    const chip = screen.getByText("-2.10%");
    expect(chip).toBeInTheDocument();
    expect(chip.closest("div")).toHaveClass("MuiChip-colorError");
    expect(screen.getByTestId("TrendingDownIcon")).toBeInTheDocument();
  });
});
