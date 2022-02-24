import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import APIsManagementContext from '../context/APIsManagementContext';

import CategoriesGrid from '../pages/CategoriesGrid';
import ClientsList from '../pages/ClientsList';
import IntegrationsList from '../pages/IntegrationsList';


const AppRoutes = () => {
  const { searchResults } = useContext(APIsManagementContext);
  
  return (
    <Routes>
      <Route exact path='/' element={ <CategoriesGrid /> } />
      <Route exact path='/:categoryId' element={ <IntegrationsList /> } />
      <Route path='/:categoryId/:integrationId' element={ <ClientsList /> } />
      <Route path='/search' element={ <ClientsList searchResults={ searchResults } /> } />
    </Routes>
  );
};

export default AppRoutes;
