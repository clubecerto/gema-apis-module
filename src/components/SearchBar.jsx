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
  const [inputIntegrationSearch, setInputIntegrationSearch] = useState('');

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
            categoriesList.map(({ category_id, category_name }) => (
              <MenuItem
                key={ category_name }
                value={ category_id }
              >
                { category_name }
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
              .find(({ category_id }) => category_id === inputCategorySearch).integrations
              .map(({ integration_id, integration_name }) => (
                <MenuItem
                  key={ integration_name }
                  value={ integration_id }
                >
                  { integration_name }
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
