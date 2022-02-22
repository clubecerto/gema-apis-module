import React, { useState, useEffect } from 'react';

import { getCategories } from '../services';

import {
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
import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import NewClientModal from '../components/NewClientModal';
import PageTitle from './PageTitle';
import SearchBar from './SearchBar';

const APIsManagement = ({ children }) => {
  const [isNewClientOpen, setIsNewClientOpen] = useState(false);
  const [categoriesList, setCategoriesList] = useState([]);

  // RECUPERA TODAS AS CATEGORIAS E SALVA NO ESTADO
  const getCategoriesList = async () => {
    const categoriesFetched = await getCategories();
    // console.log(categoriesFetched);
    setCategoriesList(categoriesFetched);
  };

  useEffect(() => {
    getCategoriesList();
  }, [])

  const handleNewClientModal = () => {
    setIsNewClientOpen(!isNewClientOpen);
  };

  const context = {
    categoriesList,
    integrationsByCategory,
    getIntegrationsList,
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
      { !!isNewClientOpen && <NewClientModal
        handleClose={ handleNewClientModal }
        isOpen={ isNewClientOpen }
      /> }
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
              onClick={ handleNewClientModal }
              sx={{ height: "40px", borderRadius: "10px" }}
              variant="contained"
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
