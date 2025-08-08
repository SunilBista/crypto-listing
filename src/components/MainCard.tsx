import { TrendingUp, TrendingDown } from "@mui/icons-material";
import { Card, CardContent, Grid, Typography, Chip } from "@mui/material";
import { formatNumber, formatPercentage } from "../utils/format";
import { type CryptoCurrencyType } from "../types/crypto";

const MainCard: React.FC<{ cryptoData: CryptoCurrencyType }> = ({
  cryptoData,
}) => {
  return (
    <Card sx={{ borderRadius: 4, mb: 3, backgroundColor: "#f7f9fc" }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <img
            src={cryptoData.image}
            alt={cryptoData.name}
            width={40}
            height={40}
          />
          <Typography variant="h5" fontWeight={600}>
            {cryptoData.name}
          </Typography>
          <Typography component="span" color="text.secondary" fontSize={14}>
            <Chip
              label={`${cryptoData.symbol.toUpperCase()} #${
                cryptoData.market_cap_rank
              }`}
              size="small"
              sx={{ fontSize: 12, height: 24 }}
              color="primary"
            />
          </Typography>
        </Grid>

        <Typography
          component="span"
          variant="h3"
          fontWeight={700}
          sx={{ mt: 2 }}
        >
          ${formatNumber(cryptoData.current_price)}
          <Chip
            icon={
              cryptoData.price_change_percentage_24h >= 0 ? (
                <TrendingUp />
              ) : (
                <TrendingDown />
              )
            }
            sx={{ ml: 2, mt: 1 }}
            label={formatPercentage(cryptoData.price_change_percentage_24h)}
            color={
              cryptoData.price_change_percentage_24h >= 0 ? "success" : "error"
            }
            size="small"
          />
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MainCard;
