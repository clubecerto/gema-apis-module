import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import APIsManagementContext from '../context/APIsManagementContext';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const CategoriesGrid = () => {
  const { categoriesList } = useContext(APIsManagementContext);

  const { push } = useNavigate();

  // CLICAR NA CATEGORIA REDIRECIONA PARA SUAS RESPECTIVAS INTEGRAÇÕES
  const handleClickCategory = ({ target: { name } }) => {
    push(`/${name}`);
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{ my: 1 }}
    >
      {
        categoriesList.map(({ categoria_id, categoria_nome }) => (
          <Grid
            data-testid="category-button"
            item
            key={ categoria_nome }
            xs={4}
          >
            <Button
              color= "primary"
              name={ categoria_id }
              onClick={ handleClickCategory }
              sx={{
                borderRadius: "10px",
                color: "white",
                py: 2,
                width: "100%",
              }}
              variant="contained"
              type="button"
            >
              { categoria_nome }
            </Button>
          </Grid>
        ))
      }
    </Grid>
  );
};

export default CategoriesGrid;
