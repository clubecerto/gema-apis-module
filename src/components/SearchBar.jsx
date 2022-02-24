import React, { useContext, useState } from 'react';

import APIsManagementContext from '../context/APIsManagementContext';
import { fetchIntegrationsByCategory } from '../services';

import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import StyledInput from './StyledInput';

const SearchBar = () => {
  const [integrationsByCategory, setIntegrationsByCategory] = useState([]);

  const { categoriesList, searchInput, setSearchInput, handleSubmitClientSearch } = useContext(APIsManagementContext);

  // RECUPERA TODAS AS INTEGRAÇÕES DE UMA CATEGORIA E SALVA NO ESTADO
  const getIntegrationsList = async (categoryId) => {
    const integrationsFetched = await fetchIntegrationsByCategory(categoryId);
    setIntegrationsByCategory(integrationsFetched || []);
  };

  // HANDLE CATEGORY CHANGE
  const handleCategoryChange = ({ target: { value } }) => {
    setSearchInput((current) => ({ ...current, categoryId: value }));
    getIntegrationsList(value);
  };

  return (
    <Box sx={{ flexGrow: 1, mr: 3 }}>
      <form
        onSubmit={ handleSubmitClientSearch }
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0px 0px 15px 0px rgb(88 88 88 / 20%)",
          display: "flex",
          justifyContent: "space-between",
          padding: "16px",
        }}
      >

        { /* BUSCA POR NOME DO CLIENTE */ }
        <StyledInput
          autoFocus
          color="primary"
          label="Buscar cliente"
          name="search-client"
          onChange={ ({ target: { value } }) => setSearchInput((current) => ({ ...current, clientName: value })) }
          size="small"
          sx={{ flexGrow: 1, mr: 2 }}
          type="text"
          value={ searchInput.clientName }
          variant="outlined"
        />

        { /* FILTRO POR CATEGORIA */ }
        <StyledInput
          color="primary"
          label="Categorias"
          name="categories"
          onChange={ handleCategoryChange }
          select
          size="small"
          sx={{ width: "200px", mr: 2 }}
          value={ searchInput.categoryId }
          variant="outlined"
        >
          {
            categoriesList.map(({ categoria_id, categoria_nome }) => (
              <MenuItem
                key={ categoria_nome }
                value={ categoria_id }
              >
                { categoria_nome }
              </MenuItem>
            ))
          }
        </StyledInput>

        { /* FILTRO POR INTEGRAÇÃO */ }
        <StyledInput
          color="primary"
          disabled={ !searchInput.categoryId }
          label="Integração"
          name="integracao"
          onChange={ ({ target: { value } }) => setSearchInput((current) => ({ ...current, integrationId: value })) }
          select
          size="small"
          sx={{ width: "200px", mr: 2 }}
          value={ searchInput.integrationId }
          variant="outlined"
        >
          {
            integrationsByCategory.map(({ integracao_id, api_empresa }) => (
                <MenuItem
                  key={ api_empresa }
                  value={ integracao_id }
                >
                  { api_empresa }
                </MenuItem>
              ))
          }
        </StyledInput>

        { /* BOTÃO DE SUBMIT */ }
        <Button
          color="primary"
          sx={{ borderRadius: "10px", height: "40px" }}
          type="submit"
          variant="contained"
        >
          <SearchIcon />
        </Button>
      </form>
    </Box>
  );
};

export default SearchBar;
