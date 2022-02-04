import React, { useContext } from 'react';

import APIsManagementContext from '../context/APIsManagementContext';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
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
  p: 4,
  textAlign: 'center',
};

const DetailsModal = ({ type, isOpen, handleClose, id }) => {
  const { categoriesList } = useContext(APIsManagementContext);

  /// talvez fazer requisição para buscar detalhes da integração específica
  const renderDetails = () => {
    const integrationSelected = categoriesList[0].integracoes[id - 1];
  
    const detailsToRender = Object.keys(integrationSelected)
      .filter((key) => key !== 'integracao_id' && key !== 'clientes');
    console.log(integrationSelected);

    return (
      <Container>
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
      </Container>
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
          <Typography id="transition-modal-title" variant="h5" sx={{ color: "green" }} component="h2">
            Detalhes
          </Typography>
          { !!id && renderDetails() }
        </Box>
      </Fade>
    </Modal>
  );
};

export default DetailsModal;
