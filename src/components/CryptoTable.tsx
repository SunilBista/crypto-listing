import React, { useEffect, useState } from "react";
// import { cryptoApi } from "../api/CryptoApi";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  Chip,
  Tooltip,
  Box,
} from "@mui/material";
import { TrendingUp, TrendingDown } from "@mui/icons-material";
import {
  formatCurrency,
  formatNumber,
  formatPercentage,
} from "../utils/format";
import cryptoDataJson from "../data/data.json";
import { useNavigate } from "react-router-dom";
import { type CryptoTableType } from "../types/crypto";

const CryptoTable: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<CryptoTableType[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchCryptoCurrencies();
  }, []);

  const fetchCryptoCurrencies = async () => {
    try {
      const data = cryptoDataJson;
      console.log("static data", data);
      setCryptoData(data);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
            <TableCell sx={{ fontWeight: "bold" }}>#</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Price
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              24h %
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Market Cap
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Volume (24h)
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Circulating Supply
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cryptoData.map((crypto) => (
            <Tooltip
              title="Click to view details"
              arrow
              placement="right"
              key={crypto.id}
            >
              <TableRow
                key={crypto?.id}
                hover
                sx={{ cursor: "pointer" }}
                onClick={() => navigate(`/crypto/${crypto.id}`)}
              >
                <TableCell>{crypto.market_cap_rank}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Avatar
                      src={crypto.image}
                      sx={{ width: 32, height: 32, mr: 2 }}
                    />
                    <Box>
                      <Typography variant="body1" fontWeight="medium">
                        {crypto.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {crypto.symbol.toUpperCase()}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body1" fontWeight="medium">
                    {formatCurrency(crypto.current_price)}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Chip
                    icon={
                      crypto.price_change_percentage_24h >= 0 ? (
                        <TrendingUp />
                      ) : (
                        <TrendingDown />
                      )
                    }
                    label={formatPercentage(crypto.price_change_percentage_24h)}
                    color={
                      crypto.price_change_percentage_24h >= 0
                        ? "success"
                        : "error"
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(crypto.market_cap)}
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(crypto.total_volume)}
                </TableCell>
                <TableCell align="right">
                  {formatNumber(crypto.circulating_supply)}{" "}
                  {crypto.symbol.toUpperCase()}
                </TableCell>
              </TableRow>
            </Tooltip>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CryptoTable;
