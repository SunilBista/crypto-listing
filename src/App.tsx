import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Container, AppBar, Toolbar, Typography } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Table } from "./components/Table";
import { Detail } from "./components/Detail";
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography
              align="center"
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Crypto Market Tracker
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Routes>
            <Route path="/" element={<Table />} />
            <Route path="/crypto/:id" element={<Detail />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
