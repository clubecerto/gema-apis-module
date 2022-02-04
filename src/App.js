import React from 'react';
import Routes from './routes';
import { Switch } from 'react-router-dom';

import APIsManagement from './components/APIsManagement';

const App = () => {
  return (
    <div className="App">
      <Switch>
        <APIsManagement>
          <Routes />
        </APIsManagement>
      </Switch>
    </div>
  );
};

export default App;
