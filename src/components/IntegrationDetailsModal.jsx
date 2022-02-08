import React, { useContext, useEffect, useState } from 'react';

import { getIntegration } from '../services';

import APIsManagementContext from '../context/APIsManagementContext';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';

// ESTILIZAÇÃO DO MODAL
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
  backgroundColor: '#f5f6fa',
};

const IntegrationDetailsModal = ({ isOpen, handleClose, integrationId }) => {
  const [integrationSelected, setIntegrationSelected] = useState('');
  const { categoriesList } = useContext(APIsManagementContext);

  // RECUPERA DADOS DA INTEGRAÇÃO ESCOLHIDA E SALVA DO ESTADO
  useEffect(() => {
    setIntegrationSelected(getIntegration(integrationId));
  }, []);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={ () => handleClose(integrationId)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <Box sx={style}>

          { /* HEADER DO MODAL */ }
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

            { /* NOME DA INTEGRAÇÃO */ }
            <Typography
              id="transition-modal-title"
              variant="h4"
              component="h2"
              sx={{
                color: "white",
                flexGrow: 1,
                display: "flex",
                alignItems: "baseline",
              }}
            >
              { integrationSelected.api_empresa }
              <Typography
                id="transition-modal-title"
                variant="subtitle1"
                component="p"
                sx={{ color: "white", ml: 1 }}
              >
                { !!integrationSelected && categoriesList.find((category) => category.categoria_id === integrationSelected.categoria_id).categoria_nome }
              </Typography>
            </Typography>

            { /* VISUALIZAÇÃO DA ROTINA CRON */ }
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

            { /* VISUALIZAÇÃO DO STATUS */ }
            {
              !integrationSelected.status
              ? (
                <Box sx={{
                  backgroundColor: "#f5f6fa",
                  borderRadius: "10px",
                  p: 1,
                  width: "130px",
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

          { /* CORPO DO MODAL */ }
          <Box>

            { /* INFORMAÇÕES DO RESPONSÁVEL */ }
            <Box sx={{
              backgroundColor: "white",
              boxShadow: "0px 0px 15px 0px rgb(88 88 88 / 20%)",
              p: 2,
              mt: 2,
              borderRadius: "15px",
            }}>
              <Typography sx={{ mb: 1 }}>
                Responsável
              </Typography>
              <Box sx={{
                backgroundColor: "#f5f6fa",
                border: "1px solid green",
                p: 2,
                mx: 1,
                mt: 1,
                borderRadius: "15px",
              }}>
                <Typography>
                  Nome: { !!integrationSelected && integrationSelected.responsavel.nome }
                </Typography>
              </Box>
              <Box sx={{
                backgroundColor: "#f5f6fa",
                border: "1px solid green",
                p: 2,
                mx: 1,
                mt: 1,
                borderRadius: "15px",
              }}>
                <Typography>
                  Email: { !!integrationSelected && integrationSelected.responsavel.email }
                </Typography>
              </Box>
              {
                !!integrationSelected && integrationSelected.responsavel.telefone.map((telefone) => (
                  <Box
                    key={ telefone }
                    sx={{
                      backgroundColor: "#f5f6fa",
                      border: "1px solid green",
                      p: 2,
                      mx: 1,
                      mt: 1,
                      borderRadius: "15px",
                    }}
                  >
                    <Typography>
                      Telefone: { telefone }
                    </Typography>
                  </Box>
                ))
              }
            </Box>

            { /* ACESSO AO ANEXO */ }
            <Box sx={{
              backgroundColor: "white",
              boxShadow: "0px 0px 15px 0px rgb(88 88 88 / 20%)",
              p: 2,
              mt: 2,
              borderRadius: "15px",
            }}>
              <Typography sx={{ mb: 1 }}>
                Anexos
              </Typography>
              <Link href={ integrationSelected.anexo } underline="none" target="_blank">
                <Button type='' variant="contained" color="success">Baixar arquivo</Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default IntegrationDetailsModal;
