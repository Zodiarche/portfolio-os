import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#6366f1",
      dark: "#4f46e5",
    },
    secondary: {
      main: "#818cf8",
    },
    background: {
      default: "#008080",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
        contained: {
          backgroundColor: "#6366f1",
          boxShadow: "none",
          "&:hover": {
            backgroundColor: "#4f46e5",
            boxShadow: "none",
          },
          "&:active": {
            boxShadow: "none",
          },
        },
        outlined: {
          borderColor: "#6366f1",
          color: "#6366f1",
          "&:hover": {
            borderColor: "#6366f1",
            backgroundColor: "rgba(99, 102, 241, 0.06)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});

export default theme;
