import {
  Box,
  TextField,
  Popper,
  ClickAwayListener,
  Paper,
  CircularProgress,
  List,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import { useState, useRef, useEffect, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { cryptoApi } from "../api/CryptoApi";

const SearchCoin: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }

    setLoading(true);
    const handler = setTimeout(() => {
      cryptoApi
        .searchCryptocurrencies(query)
        .then((coins) => {
          setResults(coins.coins);
          setOpen(coins.coins.length > 0);
        })
        .finally(() => setLoading(false));
    }, 500);

    return () => clearTimeout(handler);
  }, [query]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSelect = (id: string) => {
    setOpen(false);
    setQuery("");
    navigate(`/crypto/${id}`);
  };

  const handleClickAway = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ position: "relative", width: "100%", mx: "auto" }}>
      <TextField
        label="Search Cryptocurrency"
        variant="outlined"
        fullWidth
        value={query}
        onChange={handleInputChange}
        inputRef={anchorRef}
        autoComplete="off"
      />

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        style={{ zIndex: 1300, width: anchorRef.current?.clientWidth }}
        placement="bottom-start"
      >
        <ClickAwayListener onClickAway={handleClickAway}>
          <Paper
            elevation={3}
            sx={{
              mt: 1,
              maxHeight: 300,
              overflowY: "auto",
            }}
          >
            {loading ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                p={2}
              >
                <CircularProgress size={24} />
              </Box>
            ) : results.length > 0 ? (
              <List dense>
                {results.map((coin) => (
                  <ListItemButton
                    key={coin.id}
                    onClick={() => handleSelect(coin.id)}
                  >
                    <ListItemAvatar>
                      <Avatar src={coin.thumb} alt={coin.name} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={coin.name}
                      secondary={coin.symbol.toUpperCase()}
                    />
                  </ListItemButton>
                ))}
              </List>
            ) : (
              <Box p={2} textAlign="center" color="text.secondary">
                No results found.
              </Box>
            )}
          </Paper>
        </ClickAwayListener>
      </Popper>
    </Box>
  );
};

export default SearchCoin;
