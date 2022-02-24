import React from 'react';
import AppRoutes from './routes';

import APIsManagement from './components/APIsManagement';
import customTheme from './assets/theme';
import { ThemeProvider } from '@mui/material';

const App = () => {
  return (
    <div className="App">
      <ThemeProvider theme={ customTheme }>
        <APIsManagement>
          <AppRoutes />
        </APIsManagement>
      </ThemeProvider>
    </div>
  );
};

export default App;
