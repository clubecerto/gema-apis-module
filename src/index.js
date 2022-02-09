import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import App from './App';
import CssBaseline from '@mui/material/CssBaseline';
import { GlobalStyles } from '@mui/material';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <CssBaseline />
      <GlobalStyles
          styles={{
            body: { backgroundColor: "#f5f6fa" },
          }}
        />
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
