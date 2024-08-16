import { responsiveFontSizes } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import palette from "./palette";
import shadows from "./shadows";

const getTheme = (mode) =>
  responsiveFontSizes(
    createTheme({
      palette: palette(mode),
      layout: {
        contentWidth: 1236,
      },
      shadows: shadows(mode),
      typography: {
        fontFamily: '"Noto Sans", "Inter", "Open Sans"',
        button: {
          textTransform: "none",
          fontWeight: "medium",
        },
      },
      zIndex: {
        appBar: 1200,
        drawer: 1300,
      },
      components: {
        MuiButton: {
          styleOverrides: {
            label: {
              fontWeight: 600,
            },
            containedSecondary: mode === "light" ? { color: "white" } : {},
          },
        },
      },
    })
  );

export default getTheme;
