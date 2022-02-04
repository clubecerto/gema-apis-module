import React, { useContext, useState } from 'react';

import APIsManagementContext from '../context/APIsManagementContext';
import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';

const SearchBar = () => {
  const [inputClientSearch, setInputClientSearch] = useState('');
  const [inputCategorySearch, setInputCategorySearch] = useState('');
  const [inputIntegrationSearch, setInputIntegrationSearch] = useState('1');

  const { categoriesList } = useContext(APIsManagementContext);

  const handleSubmitClientSearch = (event) => {
    event.preventDefault();
  };

  return (
    <Box>
      <form
        onSubmit={ handleSubmitClientSearch }
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <TextField
          color="success"
          
          label="Buscar cliente"
          name="search-client"
          size="small"
          type="text"
          variant="outlined"
          sx={{ flexGrow: 1, mr: 2, borderRadius: "2px" }}
          value={ inputClientSearch }
          onChange={ ({ target: { value } }) => setInputClientSearch(value) }
        />
        <TextField
          color="success"
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
        </TextField>
        <TextField
          color="success"
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
            !!inputCategorySearch && categoriesList
              .find(({ categoria_id }) => categoria_id === inputCategorySearch).integracoes
              .map(({ integracao_id, api_empresa }) => (
                <MenuItem
                  key={ api_empresa }
                  value={ integracao_id }
                >
                  { api_empresa }
                </MenuItem>
              ))
          }
        </TextField>
        <Button
          type="submit"
          variant="contained"
          color="success"
          sx={{ height: "40px" }}
        >
          <SearchIcon />
        </Button>
      </form>
    </Box>
  );
};

export default SearchBar;
