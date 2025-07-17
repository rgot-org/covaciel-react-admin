// theme.ts
import { createTheme } from "@mui/material/styles";

export const customTheme = createTheme({
  palette: {
    mode: "dark", // active automatiquement des couleurs sombres MUI
    background: {
      default: "#321479", // Fond général très sombre
      paper: "#6528F7", // Fond des cartes/panels
    },
    primary: {
      main: "#eeeeee", // violet par défaut React-Admin
    },
    secondary: {
      main: "#eeeeee",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 12, // base: mobile par défaut
    h6: {
      fontWeight: 600,
      "@media (min-width:1920px)": {
        fontSize: "2rem", // écran 1080p+
      },
      "@media (min-width:2560px)": {
        fontSize: "1.6rem", // écran 4K
      },
    },
    // Tu peux ajuster les tailles via breakpoints
    body1: {
      textTransform: "uppercase",
      color: "#321479",
      fontWeight: 600,

      fontSize: "1rem",
      "@media (min-width:1920px)": {
        fontSize: "2rem", // écran 1080p+
      },
      "@media (min-width:2560px)": {
        fontSize: "1.6rem", // écran 4K
      },
    },
    body2: {
      
      textTransform: "uppercase",
      color: "#321479",
      fontWeight: 600,
      fontSize: "0.9rem",
      "@media (min-width:1920px)": {
        fontSize: "1.6rem",
      },
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          lineHeight: 1.1,
        },
      },
    },
    
  },
  // components: {
  //   RaEdit: {
  //       styleOverrides: {
  //         root: {
  //             backgroundColor: "Lavender",
  //             "& .RaDatagrid-headerCell": {
  //                 backgroundColor: "MistyRose",
  //             },
  //         },
  //         main:{
  //           backgroundColor: "Lavender"
  //         }
  //      }
  //   }
//}

  
});
