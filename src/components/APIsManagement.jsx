import React from 'react';

import {
  categoriesList,
  integrationsList,
  clientsList,
  client_1,
  client_2,
  client_3,
  client_4,
  client_5,
  client_6,
  client_7,
  client_8,
} from '../services/mock';

import APIsManagementContext from '../context/APIsManagementContext';
import Container from '@mui/material/Container';
import PageTitle from './PageTitle';
import SearchBar from './SearchBar';

const APIsManagement = ({ children }) => {
  const context = {
    categoriesList,
    integrationsList,
    clientsList,
    client_1,
    client_2,
    client_3,
    client_4,
    client_5,
    client_6,
    client_7,
    client_8,
  };

  return (
    <APIsManagementContext.Provider value={ context }>
      <Container>
        <PageTitle />
        <SearchBar />
        { children }
      </Container>
    </APIsManagementContext.Provider>
  );
};

export default APIsManagement;
