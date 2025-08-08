import { TrendingUp, TrendingDown } from "@mui/icons-material";
import { Grid, Card, CardContent, Box, Typography, Chip } from "@mui/material";
import { formatNumber, formatPercentage } from "../utils/format";
import { type CryptoCurrencyType } from "../types/crypto";

type StatItem = {
  label: string;
  value: string;
  change?: string;
  itemColor?: "success" | "error";
};

const StatCard: React.FC<{ cryptoData: CryptoCurrencyType }> = ({
  cryptoData,
}) => {
  const stats: StatItem[] = [
    {
      label: "Market Cap",
      value: `$${formatNumber(cryptoData.market_cap)}`,
      change: formatPercentage(cryptoData.market_cap_change_percentage_24h),
      itemColor:
        cryptoData.market_cap_change_percentage_24h >= 0 ? "success" : "error",
    },
    {
      label: "Volume (24h)",
      value: `$${formatNumber(cryptoData.total_volume)}`,
      change: formatPercentage(cryptoData.price_change_percentage_24h),
      itemColor:
        cryptoData.price_change_percentage_24h >= 0 ? "success" : "error",
    },
    {
      label: "Fully Diluted Valuation",
      value: `$${formatNumber(cryptoData.fully_diluted_valuation)}`,
    },
    {
      label: "Vol/Mkt Cap (24h)",
      value: `${(
        (cryptoData.total_volume / cryptoData.market_cap) *
        100
      ).toFixed(2)}%`,
    },
    {
      label: "Total Supply",
      value: `${formatNumber(cryptoData.total_supply)} BTC`,
    },

    {
      label: "Circulating Supply",
      value: `${formatNumber(cryptoData.circulating_supply)} BTC`,
    },
  ];
  return (
    <Grid container spacing={2}>
      {stats.map(({ label, value, change, itemColor }) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={label}>
          <Card elevation={2} sx={{ borderRadius: 4, height: "100%" }}>
            <CardContent>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography
                  fontSize={14}
                  fontWeight={800}
                  color="text.secondary"
                >
                  {label}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mt={1}>
                <Typography variant="h6" fontWeight={600}>
                  {value}
                </Typography>
              </Box>
              {change && (
                <Chip
                  icon={
                    cryptoData.price_change_percentage_24h >= 0 ? (
                      <TrendingUp />
                    ) : (
                      <TrendingDown />
                    )
                  }
                  label={change}
                  color={itemColor}
                  size="small"
                />
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatCard;
