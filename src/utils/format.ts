const trillion = 1e12;
const billion = 1e9;
const million = 1e6;
const thousand = 1000;

export const formatCurrency = (value: number): string => {
  if (value === null || value === undefined) return "N/A";

  if (value >= trillion) {
    return `$${(value / trillion).toFixed(2)}T`;
  } else if (value >= billion) {
    return `$${(value / billion).toFixed(2)}B`;
  } else if (value >= million) {
    return `$${(value / million).toFixed(2)}M`;
  } else if (value >= thousand) {
    return `$${(value / thousand).toFixed(2)}K`;
  } else if (value >= 1) {
    return `$${value.toFixed(2)}`;
  } else {
    return `$${value.toFixed(6)}`;
  }
};

export const formatPercentage = (value: number): string => {
  if (value === null || value === undefined) return "N/A";
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
};

export const formatNumber = (value: number): string => {
  if (value === null || value === undefined) return "N/A";

  if (value >= trillion) {
    return `${(value / trillion).toFixed(2)}T`;
  } else if (value >= billion) {
    return `${(value / billion).toFixed(2)}B`;
  } else if (value >= million) {
    return `${(value / million).toFixed(2)}M`;
  } else if (value >= thousand) {
    return `${(value / thousand).toFixed(2)}K`;
  } else {
    return value.toLocaleString();
  }
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString();
};
