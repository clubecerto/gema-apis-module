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
        categoriesList.map(({ category_id, category_name }) => (
          <Grid
            item
            key={ category_name }
            xs={4}
          >
            <Button
              color= "success"
              name={ category_id }
              onClick={ handleClickCategory }
              sx={{
                color: "white",
                py: 2,
                width: "100%",
              }}
              variant="contained"
              type="button"
            >
              { category_name }
            </Button>
          </Grid>
        ))
      }
    </Grid>
  );
};

export default CategoriesGrid;
