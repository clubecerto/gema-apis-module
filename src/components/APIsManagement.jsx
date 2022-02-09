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
import { Box } from '@mui/system';
import { Button } from '@mui/material';

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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <SearchBar/>
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "10px",
              boxShadow: "0px 0px 15px 0px rgb(88 88 88 / 20%)",
              margin: "auto",
              p: 2,
            }}
          >
            <Button
              variant="contained"
              sx={{ height: "40px", borderRadius: "10px" }}
            >
              Cadastrar novo cliente
            </Button>
          </Box>
        </Box>
        { children }
      </Container>
    </APIsManagementContext.Provider>
  );
};

export default APIsManagement;
