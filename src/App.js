import './App.css';
import Login from './pages/Login';
import Portal from './pages/Portal';
import Admin from './pages/Admin';
import History from './pages/History';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ['Open Sans'].join(','),
    },
    palette: {
      primary: {
        main: "#000",
        dark: "#555"
      },
      secondary: {
        main: "#555",
        dark: "#ccc"
      }
    }
  });

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/portal" element={<Portal />} />
          <Route path="/history" element={<History />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
