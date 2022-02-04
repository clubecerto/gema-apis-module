import React from 'react';

import { categoriesList } from '../services/mock';

import APIsManagementContext from '../context/APIsManagementContext';
import Container from '@mui/material/Container';
import PageTitle from './PageTitle';
import SearchBar from './SearchBar';

const APIsManagement = ({ children }) => {
  const context = {
    categoriesList,
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
