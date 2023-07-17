import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import {createTheme, StyledEngineProvider, ThemeProvider} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#1ea6aa',
            contrastText: "#fcfcfc",
        },
        secondary: {
            main: "#DADEFA",
            contrastText: "#fcfcfc",
        },
        background: {
            default: "#212121",
            paper: "#2B2B2B",
        },
        text: {
            primary: "#fcfcfc",
            secondary: "#d1d1d1",
            disabled: "#F3F3F3",
        },
    },
    typography: {
        allVariants: {
            color: "#fcfcfc",
        }
    }
});

// @ts-ignore
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter basename="/">
          <StyledEngineProvider injectFirst>
              <ThemeProvider theme={theme}>
                <App />
              </ThemeProvider>
          </StyledEngineProvider>
      </BrowserRouter>
  </React.StrictMode>,
)
