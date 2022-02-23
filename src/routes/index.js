import React from 'react';
import { Route, Routes } from 'react-router-dom';

import CategoriesGrid from '../pages/CategoriesGrid';
import ClientsList from '../pages/ClientsList';
import IntegrationsList from '../pages/IntegrationsList';

const AppRoutes = () => (
  <Routes>
    <Route exact path='/' element={ <CategoriesGrid /> } />
    <Route exact path='/:categoryId' element={ <IntegrationsList /> } />
    <Route path='/:categoryId/:integrationId' element={ <ClientsList /> } />
  </Routes>
);

export default AppRoutes;
