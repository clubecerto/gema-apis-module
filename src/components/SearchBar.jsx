import React, { useContext, useState } from 'react';

import APIsManagementContext from '../context/APIsManagementContext';
import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import StyledInput from './StyledInput';

const SearchBar = () => {
  const [inputClientSearch, setInputClientSearch] = useState('');
  const [inputCategorySearch, setInputCategorySearch] = useState('');
  const [inputIntegrationSearch, setInputIntegrationSearch] = useState('');

  const {
    categoriesList,
    integrationsList,
  } = useContext(APIsManagementContext);

  const handleSubmitClientSearch = (event) => {
    event.preventDefault();
  };

  return (
    <Box>
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
        <StyledInput
          color="primary"
          label="Buscar cliente"
          name="search-client"
          size="small"
          type="text"
          variant="outlined"
          sx={{ flexGrow: 1, mr: 2 }}
          value={ inputClientSearch }
          onChange={ ({ target: { value } }) => setInputClientSearch(value) }
        />
        <StyledInput
          color="primary"
          label="Categorias"
          name="categories"
          select
          size="small"
          variant="outlined"
          sx={{ width: "200px", mr: 2 }}
          value={ inputCategorySearch }
          onChange={ ({ target: { value } }) => setInputCategorySearch(value) }
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
        <StyledInput
          color="primary"
          disabled={ !inputCategorySearch }
          label="Integração"
          name="integracao"
          onChange={ ({ target: { value } }) => setInputIntegrationSearch(value) }
          select
          size="small"
          variant="outlined"
          sx={{ width: "200px", mr: 2 }}
          value={ inputIntegrationSearch }
        >
          {
            !!inputCategorySearch && integrationsList
              .filter(({ categoria_id }) => categoria_id === inputCategorySearch)
              .map(({ integracao_id, api_empresa }) => (
                <MenuItem
                  key={ api_empresa }
                  value={ integracao_id }
                >
                  { api_empresa }
                </MenuItem>
              ))
          }
        </StyledInput>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ height: "40px", borderRadius: "10px" }}
        >
          <SearchIcon />
        </Button>
      </form>
    </Box>
  );
};

export default SearchBar;
