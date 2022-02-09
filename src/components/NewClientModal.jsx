import React, { useContext, useState } from 'react';

import { getClient } from '../services';

import APIsManagementContext from '../context/APIsManagementContext';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import StyledInput from './StyledInput';

// ESTILIZAÇÃO DO MODAL
const style = {
  backgroundColor: '#f5f6fa',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 15,
  left: '50%',
  maxWidth: '1200px',
  p: 3,
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  top: '50%',
  width: '90%',
};

const NewClientModal = ({ isOpen, handleClose, clientId }) => {
  const [integrationSelected, setIntegrationSelected] = useState('');
  const [categorySelected, setCategorySelected] = useState('');
  const [requiredFields, setRequiredFields] = useState([]);

  const { categoriesList, integrationsList, } = useContext(APIsManagementContext);
  

  // VERIFICA SE A CHAVE PASSADA É UMA DAS QUE NÃO DEVE SER RENDERIZADA
  const checkKey = (key) => {

    // CHAVES RENDERIZADAS EM OUTRA PARTE DO MODAL / NÃO DEVEM SER RENDERIZADAS NESSE MOMENTO
    const keysToNotBeRendered = [
      'categoria_id',
      'id',
      'integracao_id',
    ];
    return !(keysToNotBeRendered
      .some((forbiddenKey) => key === forbiddenKey));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const firstIntegrationClient = getClient(1);
    const requiredKeys = Object.keys(firstIntegrationClient)
      .filter((key) => !!key);
    setRequiredFields(requiredKeys);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      closeAfterTransition
      onClose={ () => handleClose(clientId)}
      open={isOpen}
    >
      <Fade in={isOpen}>
        <Box sx={style}>

          { /* HEADER DO MODAL */ }
          <Box
            sx={{
              alignItems: "center",
              backgroundColor: "#00964f",
              borderRadius: "10px",
              color: "white",
              display: "flex",
              justifyContent: "space-between",
              mb: 2,
              p: 2,
            }}
          >
            <Typography
              component="h1"
              fontWeight="600"
              pl={1}
              variant="h4"
            >
              API's
            </Typography>
            <form
              onSubmit={ handleSubmit }
            >
              <StyledInput
                color="darkBG"
                label="Categorias"
                name="categories"
                onChange={ ({ target: { value } }) => setCategorySelected(value) }
                select
                size="small"
                sx={{ mr: 2, width: "200px" }}
                value={ categorySelected }
                variant="outlined"
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
                color="darkBG"
                disabled={ !categorySelected }
                label="Integração"
                name="integracao"
                onChange={ ({ target: { value } }) => setIntegrationSelected(value) }
                select
                size="small"
                sx={{ width: "200px", mr: 2 }}
                value={ integrationSelected }
                variant="outlined"
              >
                {
                  !!categorySelected && integrationsList
                    .filter(({ categoria_id }) => categoria_id === categorySelected)
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
                color="darkBG"
                sx={{ borderRadius: "10px", color:"#00964f", height: "40px" }}
                type="submit"
                variant="contained"
              >
                Continuar
              </Button>
            </form>
          </Box>

          { /* CORPO DO MODAL */ }
          <Box
            fullWidth
            sx={{
              backgroundColor: "white",
              borderRadius: "10px",
              boxShadow: "0px 0px 15px 0px rgb(88 88 88 / 20%)",
              display: "flex",
              justifyContent: "space-between",
              padding: "16px",
            }}
          >
            { /* COLUNA 1 */ }
            <Box sx={{ width: "50%" }}>
              {
                requiredFields.map((key, index) => {
                  const shouldRender = checkKey(key);

                  if (shouldRender && (index < 7)) {
                    // SUBSTITUI UNDERSCORES POR ESPAÇOS E COLOCA LETRA MAIÚSCULA NA PRIMEIRA LETRA DE CADA PALAVRA QUE FORMA A CHAVE
                    const formattedKey = key
                      .split('_').map((word) => word.charAt(0).toUpperCase()
                        + word.slice(1)).join(' ');
                    return (
                      <Box
                        key={ key }
                        sx={{
                          backgroundColor: "#efefef",
                          borderRadius: "15px",
                          mt: 1,
                          mx: 1,
                          p: 2,
                        }}
                      >
                        <Typography>
                          { requiredFields.length > 0 && `${formattedKey}: ${key}` }
                        </Typography>
                      </Box>
                    );
                  }
                })
              }
            </Box>

            { /* COLUNA 2 */ }
            <Box sx={{ width: "50%" }}>
              {
                requiredFields.map((key, index) => {
                  const shouldRender = checkKey(key);

                  if (shouldRender && (index > 13)) {
                    // SUBSTITUI UNDERSCORES POR ESPAÇOS E COLOCA LETRA MAIÚSCULA NA PRIMEIRA LETRA DE CADA PALAVRA QUE FORMA A CHAVE
                    const formattedKey = key
                      .split('_').map((word) => word.charAt(0).toUpperCase()
                        + word.slice(1)).join(' ');
                    return (
                      <Box
                        key={ key }
                        sx={{
                          backgroundColor: "#efefef",
                          borderRadius: "15px",
                          mt: 1,
                          mx: 1,
                          p: 2,
                        }}
                      >
                        <Typography>
                          { requiredFields.length > 0 && `${formattedKey}: ${key}` }
                        </Typography>
                      </Box>
                    );
                  }
                })
              }
            </Box>
            
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default NewClientModal;
