import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#00964f',
    },
    error: {
      main: '#b40803',
    },
    whiteColor: {
      main: 'white',
    }
  },
});

export default customTheme;
