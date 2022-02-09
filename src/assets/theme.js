import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#00964f',
    },
    secondary: {
      main: '#302E53', // <-- COR NÃO OFICIAL, NÃO USAR
    },
    error: {
      main: '#b40803',
    },
  },
});

export default customTheme;
