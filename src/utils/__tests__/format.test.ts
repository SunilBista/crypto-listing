import { formatCurrency, formatNumber, formatPercentage } from "../format";

describe("formatCurrency", () => {
  it("returns N/A for null or undefined", () => {
    expect(formatCurrency(null as any)).toBe("N/A");
    expect(formatCurrency(undefined as any)).toBe("N/A");
  });

  it("formats trillions", () => {
    expect(formatCurrency(3_000_000_000_000)).toBe("$3.00T");
  });

  it("formats billions", () => {
    expect(formatCurrency(1_500_000_000)).toBe("$1.50B");
  });

  it("formats millions", () => {
    expect(formatCurrency(2_300_000)).toBe("$2.30M");
  });

  it("formats thousands", () => {
    expect(formatCurrency(45_000)).toBe("$45.00K");
  });
});

describe("formatPercentage", () => {
  it("returns N/A for null or undefined", () => {
    expect(formatPercentage(null as any)).toBe("N/A");
    expect(formatPercentage(undefined as any)).toBe("N/A");
  });

  it("formats positive percentages with + sign", () => {
    expect(formatPercentage(12.3456)).toBe("+12.35%");
  });

  it("formats negative percentages", () => {
    expect(formatPercentage(-4.5678)).toBe("-4.57%");
  });

  it("formats zero correctly", () => {
    expect(formatPercentage(0)).toBe("+0.00%");
  });
});

describe("formatNumber", () => {
  it("returns N/A for null or undefined", () => {
    expect(formatNumber(null as any)).toBe("N/A");
    expect(formatNumber(undefined as any)).toBe("N/A");
  });

  it("formats trillions", () => {
    expect(formatNumber(2_100_000_000_000)).toBe("2.10T");
  });

  it("formats billions", () => {
    expect(formatNumber(7_800_000_000)).toBe("7.80B");
  });

  it("formats millions", () => {
    expect(formatNumber(5_600_000)).toBe("5.60M");
  });

  it("formats thousands", () => {
    expect(formatNumber(89_000)).toBe("89.00K");
  });
});
