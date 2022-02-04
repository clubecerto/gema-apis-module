import React from 'react';
import { Route } from 'react-router-dom';

import CategoriesGrid from '../pages/CategoriesGrid';
import ClientsList from '../pages/ClientsList';
import IntegrationsList from '../pages/IntegrationsList';

const Routes = () => (
  <>
    <Route exact path='/' component={ CategoriesGrid } />
    <Route exact path='/:categoryId' component={ IntegrationsList } />
    <Route path='/:categoryId/:integrationId' component={ ClientsList } />
  </>
);

export default Routes;
