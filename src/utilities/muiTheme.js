import { createTheme } from "@mui/material/styles";

const THEME_VARIANTS = {
  MODERN_SLATE_INDIGO: "modernSlateIndigo",
  MIDNIGHT_DARK: "midnightDark"
};

const APP_PALETTES = {
  [THEME_VARIANTS.MODERN_SLATE_INDIGO]: {
    primary: {
      main: "#4f46e5",
      light: "#818cf8"
    },
    secondary: {
      main: "#f43f5e"
    },
    warning: {
      main: "#f59e0b"
    },
    border: {
      main: "#e2e8f0"
    },
    surface: {
      main: "#ffffff"
    },
    text: {
      primary: "#0f172a",
      secondary: "#64748b",
      light: "#94a3b8"
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff"
    }
  },
  [THEME_VARIANTS.MIDNIGHT_DARK]: {
    mode: "dark",
    primary: {
      main: "#6366f1",
      light: "#a5b4fc"
    },
    secondary: {
      main: "#fb7185"
    },
    warning: {
      main: "#fbbf24"
    },
    border: {
      main: "#1e293b"
    },
    surface: {
      main: "#1e293b"
    },
    text: {
      primary: "#f8fafc",
      secondary: "#94a3b8",
      light: "#64748b"
    },
    background: {
      default: "#0f172a",
      paper: "#1e293b"
    }
  }
};

const ACTIVE_THEME_VARIANT = THEME_VARIANTS.MODERN_SLATE_INDIGO;

/**
 * Shared MUI theme used throughout the application.
 */
export function createAppTheme(variant = ACTIVE_THEME_VARIANT) {
  return createTheme({
    palette: APP_PALETTES[variant] ?? APP_PALETTES[ACTIVE_THEME_VARIANT],
    typography: {
      fontFamily: ["'Inter'", "'Poppins'", "sans-serif"].join(","),
      h3: {
        fontWeight: 800,
        letterSpacing: "-0.02em"
      },
      subtitle1: {
        fontWeight: 600,
        lineHeight: 1.2
      },
      body1: {
        fontWeight: 400
      }
    },
    shape: {
      borderRadius: 12
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 8
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            boxShadow: "0px 1px 3px rgba(15, 23, 42, 0.04), 0px 4px 12px rgba(15, 23, 42, 0.03)",
            transition: "box-shadow 0.2s ease, transform 0.2s ease",
            "&:hover": {
              boxShadow: "0px 4px 8px rgba(15, 23, 42, 0.06), 0px 12px 24px rgba(15, 23, 42, 0.06)"
            }
          }
        }
      }
    }
  });
}

export const appTheme = createAppTheme();

export { APP_PALETTES, THEME_VARIANTS };
