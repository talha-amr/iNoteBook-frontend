import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#8BAAAD',  // Muted teal (for buttons/actions)
      light: '#C1D5D7',  // Lighter teal
      dark: '#5F888B',   // Darker teal
      contrastText: '#FFFFFF', // White text for readability
    },
    secondary: {
      main: '#313e3eff',  // Soft rose (secondary actions)
      contrastText: 'rgba(255, 255, 255, 1)', // Warm dark brown for contrast
    },
    background: {
      default: '#effff3ff',  // Creamy off-white (page bg)
      paper: '#FFFFFF',     // Pure white (note cards)
    },
    text: {
      primary: '#4A4A4A',   // Soft black (main text)
      secondary: '#7A7A7A', // Gray (secondary text)
    },
    error: {
      main: '#FFB3B3',      // Soft pink (error states)
    },
    success: {
      main: '#C1E1C1',      // Mint green (success)
    }
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 14,
    h6: {
      fontWeight: 600,      // Slightly bolder headings
      color: '#5F888B',     // Matching primary dark
    },
    body1: {
      lineHeight: 1.6,      // Better readability for notes
    }
  },

});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', 
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#628894ff', 
      contrastText: '#000000ff',
    },
    background: {
      default: '#121212', 
      paper: '#1e1e1e',     
    },
    text: {
      primary: '#ffffff',
      secondary: '#bbbbbb',
    },
  },
  typography: {
    fontFamily: 'Lato, Roboto, sans-serif',
  },
});

