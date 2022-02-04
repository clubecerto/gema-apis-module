import React, { useContext } from 'react';

import APIsManagementContext from '../context/APIsManagementContext';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const CategoriesGrid = ({ history: { push } }) => {
  const { categoriesList } = useContext(APIsManagementContext);

  const handleClickCategory = ({ target: { name } }) => {
    push(`/:${name}`);
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
            item
            key={ categoria_nome }
            xs={4}
          >
            <Button
              color= "success"
              name={ categoria_id }
              onClick={ handleClickCategory }
              sx={{
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
