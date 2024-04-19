import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    // Add other color definitions as needed
  },
  typography: {
    h6: {
      fontWeight: 600, // Adjust the font weight as needed
    },
    body1: {
      fontSize: '1rem', // Adjust the font size as needed
    },
    // Add other typography definitions as needed
  },
  shape: {
    borderRadius: 8, // Adjust the border radius as needed
  },
  // You can also add custom properties if you need to
  // shadows, spacing, overrides, and other theme aspects
});

export default theme;
