import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: '"Lucida Console", Monaco, monospace',
    h4: {
      fontSize: '1.5rem',
    },
    body1: {
      fontSize: '1rem',
      color: '#333',
    },
  },
});

export default theme;
