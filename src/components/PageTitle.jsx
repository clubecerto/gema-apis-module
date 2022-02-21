import React from 'react';

import CableIcon from '@mui/icons-material/Cable';
import Container from '@mui/material/Container';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

const PageTitle = () => {
  return (
    <Container
      sx={{
        alignItems: "center",
        backgroundColor: "#00964f",
        borderRadius: "10px",
        color: "white",
        display: "flex",
        my: 3,
        py: 2,
      }}
    >
      <SvgIcon fontSize="large" sx={{ mr: 1 }}>
        <CableIcon />
      </SvgIcon>
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
