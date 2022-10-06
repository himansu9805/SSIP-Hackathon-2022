import './App.css';
import Portal from './pages/Portal';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ['Open Sans'].join(','),
    },
    palette:{
      primary : {
        main: "#000",
        dark: "#555"
      },
      secondary : {
        main: "#555",
        dark: "#ccc"
      }
    }
  });
  
  return (
    <ThemeProvider theme={theme}>
      <Portal />
    </ThemeProvider>
  );
}

export default App;
