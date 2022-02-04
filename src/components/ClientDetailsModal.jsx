import React, { useContext } from 'react';

import APIsManagementContext from '../context/APIsManagementContext';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: '1000px',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 15,
  p: 3,
  backgroundColor: '#f5f6fa'
};

const IntegrationDetailsModal = ({ isOpen, handleClose, id }) => {
  const { categoriesList } = useContext(APIsManagementContext);

  const renderDetails = () => {
    const integrationSelected = categoriesList[0].integracoes[id - 1];

    const detailsToRender = Object.keys(integrationSelected)
      .filter((key) => (
        key !== 'integracao_id'
        && key !== 'clientes'
        && key !== 'cron'
        && key !== 'status'
        && key !== 'api_empresa'
      ));
    console.log(integrationSelected);

    return (
      <>
        <Box
          sx={{
            backgroundColor: "green",
            borderRadius: "10px",
            p: 2,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center"
          }}
        >
          <Typography
            id="transition-modal-title"
            variant="h4"
            component="h2"
            sx={{ color: "white", flexGrow: 1 }}
          >
            { integrationSelected.api_empresa }
          </Typography>
          <Box sx={{
            backgroundColor: "#f5f6fa",
            borderRadius: "10px",
            p: 1,
            ml: 1,
            width: "100px",
            textAlign: "center",
          }}>
            <Typography
              id="transition-modal-title"
              variant="text"
            >
              { `Cron: ${!integrationSelected.cron ? 'Não' : 'Sim'}` }
            </Typography>
          </Box>
          {
            !integrationSelected.status
            ? (
              <Box sx={{
                backgroundColor: "#f5f6fa",
                borderRadius: "10px",
                p: 1,
                width: "100px",
                color: "red",
                ml: 1,
                textAlign: "center",
              }}>
                Status: Inativo
              </Box>
            )
            : (
              <Box sx={{
                backgroundColor: "#f5f6fa",
                borderRadius: "10px",
                p: 1,
                width: "130px",
                color: "green",
                ml: 1,
                textAlign: "center",
              }}>
                Status: Ativo
              </Box>
            )
          }
        </Box>
        {
          detailsToRender.map((detail) => {
            const formattedDetail = detail.split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            return (
              <Box>
                <Typography>
                  { `${formattedDetail}: ${ integrationSelected[detail] }` }
                </Typography>
              </Box>
            )})
        }
      </>
    );
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={ () => handleClose(id)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <Box sx={style}>
          { !!id && renderDetails() }
        </Box>
      </Fade>
    </Modal>
  );
};

export default IntegrationDetailsModal;
