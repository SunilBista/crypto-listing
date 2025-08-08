import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

import { cryptoApi } from "../api/CryptoApi";

import StatCard from "./StatCard";

import { type CryptoCurrencyType } from "../types/crypto";
import MainCard from "./MainCard";

const CryptoDetail: React.FC = () => {
  const [currentCryptoData, setCurrentCryptoData] =
    useState<CryptoCurrencyType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      fetchCryptoDetail(id);
    }
  }, [id]);

  const fetchCryptoDetail = async (cryptoId: string) => {
    setLoading(true);
    setError("");
    try {
      const data = await cryptoApi.getCryptocurrencyDetail(cryptoId);
      console.log("Detail data", data);
      if (data) {
        setCurrentCryptoData(data);
      } else {
        setError("Cryptocurrency not found.");
      }
    } catch (err) {
      setError("Failed to load cryptocurrency data.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !currentCryptoData) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography color="error">{error || "No data available."}</Typography>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate("/")}
          sx={{ mt: 2 }}
        >
          Back to Market
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate("/")}
        sx={{ mb: 3 }}
      >
        Back to Market
      </Button>
      <Box textAlign="center" mb={3}>
        <Typography
          variant="h6"
          component="h2"
          sx={{ color: "#37474f", fontWeight: 600 }}
        >
          Crypto Info
        </Typography>
      </Box>
      <MainCard cryptoData={currentCryptoData} />
      <StatCard cryptoData={currentCryptoData} />
    </Box>
  );
};

export default CryptoDetail;
