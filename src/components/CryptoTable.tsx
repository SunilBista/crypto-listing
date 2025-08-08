import React, { useEffect, useState } from "react";
import { cryptoApi } from "../api/CryptoApi";
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
  CircularProgress,
  Pagination,
  Container,
} from "@mui/material";
import { TrendingUp, TrendingDown, ArrowDownward } from "@mui/icons-material";
import {
  formatCurrency,
  formatNumber,
  formatPercentage,
} from "../utils/format";
import { useNavigate } from "react-router-dom";
import { type CryptoTableType } from "../types/crypto";
import SearchCoin from "./SearchCoin";

const CryptoTable: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<CryptoTableType[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState<"market_cap" | "volume" | "id">(
    "market_cap"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const navigate = useNavigate();
  useEffect(() => {
    fetchCryptoCurrencies();
  }, [page, sortBy, sortOrder]);

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const getSortArrow = (column: string) => {
    const isActive = sortBy === column;
    return (
      <ArrowDownward
        fontSize="small"
        sx={{
          transform:
            isActive && sortOrder === "asc" ? "rotate(180deg)" : "none",
          transition: "transform 0.2s ease-in-out",
          ml: 0.5,
          verticalAlign: "middle",
        }}
      />
    );
  };

  const fetchCryptoCurrencies = async () => {
    try {
      setLoading(true);
      const sortParam = `${sortBy}_${sortOrder}`;
      const response = await cryptoApi.getCryptocurrencies(page, 10, sortParam);
      setCryptoData(response);
    } catch (err) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (column: "market_cap" | "volume" | "id") => {
    if (sortBy === column) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };
  return (
    <Container>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        height={80}
      >
        <SearchCoin />
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          maxWidth: "90vw",
          margin: "0 auto",
          overflowX: "auto",
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#fff",
        }}
      >
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height={80}
          >
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height={80}
          >
            <Typography color="error">{error}</Typography>
          </Box>
        ) : (
          <>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
                  <TableCell sx={{ fontWeight: "bold", cursor: "pointer" }}>
                    #
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    Price
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    24h %
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: "bold", cursor: "pointer" }}
                    onClick={() => handleSort("market_cap")}
                  >
                    Market Cap {getSortArrow("market_cap")}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: "bold", cursor: "pointer" }}
                    onClick={() => handleSort("volume")}
                  >
                    Volume (24h) {getSortArrow("volume")}
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
                          label={formatPercentage(
                            crypto.price_change_percentage_24h
                          )}
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
            <Box display="flex" justifyContent="center" mt={2} mb={2}>
              <Pagination
                count={20}
                page={page}
                onChange={handleChangePage}
                color="primary"
                shape="rounded"
              />
            </Box>
          </>
        )}
      </TableContainer>
    </Container>
  );
};

export default CryptoTable;
