import React, { useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";

import App from "./App";
import { store } from "./RTK/store";
import "./index.css";
import "./i18n";
import { createAppTheme, THEME_VARIANTS } from "./utilities/muiTheme";

function Root() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = useMemo(
    () => createAppTheme(isDarkMode ? THEME_VARIANTS.MIDNIGHT_DARK : THEME_VARIANTS.MODERN_SLATE_INDIGO),
    [isDarkMode]
  );

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App
          isDarkMode={isDarkMode}
          onToggleTheme={() => setIsDarkMode((value) => !value)}
        />
      </ThemeProvider>
    </Provider>
  );
}

/**
 * Application bootstrap entrypoint.
 */
function bootstrap() {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>
  );
}

bootstrap();
