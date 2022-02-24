import React, { useState, useEffect } from 'react';

import { fetchCategories, fetchClientsBySearch } from '../services';

import {
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
import { useNavigate } from 'react-router-dom';

const APIsManagement = ({ children }) => {
  const INITIAL_SEARCH_INPUT_STATE = {
    categoryId: '',
    integrationId: '',
    clientName: '',
  };

  const [isNewClientOpen, setIsNewClientOpen] = useState(false);
  const [categoriesList, setCategoriesList] = useState([]);
  const [searchInput, setSearchInput] = useState(INITIAL_SEARCH_INPUT_STATE);
  const [searchResults, setSearchResults] = useState([]);

  const { push } = useNavigate();

  // RECUPERA TODAS AS CATEGORIAS E SALVA NO ESTADO
  const getCategoriesList = async () => {
    const categoriesFetched = await fetchCategories();
    setCategoriesList(categoriesFetched || []);
  };

  useEffect(() => {
    getCategoriesList();
  }, [])

  // ABRE E FECHA MODAL DE NOVO CLIENTE
  const handleNewClientModal = () => {
    setIsNewClientOpen(!isNewClientOpen);
  };

  // BUSCA POR CLIENTE, LÓGICA PENDENTE AGUARDANDO API
  const handleSubmitClientSearch = async (event) => {
    event.preventDefault();
    const results = await fetchClientsBySearch(searchInput);
    setSearchResults(results);
    push('/search');
  };

  const context = {
    categoriesList,
    searchResults,
    searchInput,
    setSearchInput,
    handleSubmitClientSearch,
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
