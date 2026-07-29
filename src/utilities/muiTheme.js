import { createTheme } from "@mui/material/styles";

/**
 * Shared MUI theme used throughout the application.
 */
export const appTheme = createTheme({
  palette: {
    primary: {
      main: "#2563eb", // Modern Blue
      light: "#60a5fa"
    },
    secondary: {
      main: "#f43f5e" // Soft Rose for favorites
    },
    border: {
      main: "#e2e8f0"
    },
    surface: {
      main: "#ffffff"
    },
    text: {
      primary: "#0f172a", // Slate 900
      secondary: "#64748b", // Slate 500
      light: "#94a3b8"
    },
    background: {
      default: "#f8fafc", // Slate 50
      paper: "#ffffff"
    }
  },
  typography: {
    fontFamily: ["'Inter'", "'Poppins'", "sans-serif"].join(","),
    h3: {
      fontWeight: 800,
      letterSpacing: "-0.02em",
      color: "#0f172a"
    },
    subtitle1: {
      fontWeight: 600,
      lineHeight: 1.2
    },
    body1: {
      fontWeight: 400,
      color: "#64748b"
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
          backgroundImage: "none"
        }
      }
    }
  }
});
