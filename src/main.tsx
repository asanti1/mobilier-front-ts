import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import theme from "./material/theme";
import { Router } from "./router/routes";
import { store } from "./store/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Router />
          <CssBaseline />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
