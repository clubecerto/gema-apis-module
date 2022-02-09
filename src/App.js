import React from 'react';
import Routes from './routes';
import { Switch } from 'react-router-dom';

import APIsManagement from './components/APIsManagement';
import customTheme from './assets/theme';
import { ThemeProvider } from '@mui/material';

const App = () => {
  return (
    <div className="App">
      <ThemeProvider theme={ customTheme }>
        <Switch>
          <APIsManagement>
            <Routes />
          </APIsManagement>
        </Switch>
      </ThemeProvider>
    </div>
  );
};

export default App;
