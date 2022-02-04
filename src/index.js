import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import App from './App';
import CssBaseline from '@mui/material/CssBaseline';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <CssBaseline />
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
