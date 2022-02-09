import React from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const PageTitle = () => {
  return (
    <Container
      sx={{
        backgroundColor: "#00964f",
        borderRadius: "10px",
        color: "white",
        my: 3,
        py: 2,
      }}
    >
      <Typography
        component="h1"
        fontWeight="600"
        variant="h4"
      >
        API's
      </Typography>
    </Container>
  );
};

export default PageTitle;
