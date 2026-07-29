import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";

import App from "./App";
import { store } from "./RTK/store";
import "./index.css";
import "./i18n";
import { appTheme } from "./utilities/muiTheme";

/**
 * Application bootstrap entrypoint.
 */
function bootstrap() {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={appTheme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
}

bootstrap();
