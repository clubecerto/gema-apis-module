import React, { useContext, useEffect, useState } from 'react';

import { getIntegration } from '../services';

import APIsManagementContext from '../context/APIsManagementContext';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Link from '@mui/material/Link';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

// ESTILIZAÇÃO DO MODAL
const style = {
  backgroundColor: '#f5f6fa',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 15,
  left: '50%',
  maxWidth: '1000px',
  p: 3,
  position: 'absolute',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
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
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      closeAfterTransition
      onClose={ () => handleClose(integrationId)}
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
              display: "flex",
              justifyContent: "space-around",
              p: 2,
            }}
          >

            { /* NOME DA INTEGRAÇÃO */ }
            <Typography
              component="h2"
              fontWeight="600"
              id="transition-modal-title"
              sx={{
                color: "white",
                flexGrow: 1,
                display: "flex",
                alignItems: "baseline",
              }}
              variant="h4"
            >
              { integrationSelected.api_empresa }
              <Typography
                component="p"
                id="transition-modal-title"
                sx={{ color: "white", ml: 1 }}
                variant="subtitle1"
              >
                { !!integrationSelected && categoriesList
                  .find((category) => category.categoria_id === integrationSelected.categoria_id)
                  .categoria_nome }
              </Typography>
            </Typography>

            { /* VISUALIZAÇÃO DA ROTINA CRON */ }
            <Box sx={{
              backgroundColor: "white",
              borderRadius: "10px",
              ml: 1,
              p: 1,
              textAlign: "center",
              width: "100px",
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
                  backgroundColor: "white",
                  borderRadius: "10px",
                  color: "#b40803",
                  ml: 1,
                  p: 1,
                  textAlign: "center",
                  width: "130px",
                }}>
                  Status: Inativo
                </Box>
              )
              : (
                <Box sx={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  color: "#00964f",
                  p: 1,
                  ml: 1,
                  textAlign: "center",
                  width: "130px",
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
              borderRadius: "15px",
              boxShadow: "0px 0px 15px 0px rgb(88 88 88 / 20%)",
              mt: 2,
              p: 2,
            }}>
              <Typography fontWeight="600" sx={{ mb: 1 }}>
                Responsável
              </Typography>
              <Box sx={{
                backgroundColor: "#efefef",
                borderRadius: "15px",
                mt: 1,
                mx: 1,
                p: 2,
              }}>
                <Typography>
                  Nome: { !!integrationSelected && integrationSelected.responsavel.nome }
                </Typography>
              </Box>
              <Box sx={{
                backgroundColor: "#efefef",
                borderRadius: "15px",
                mt: 1,
                mx: 1,
                p: 2,
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
                      backgroundColor: "#efefef",
                      borderRadius: "15px",
                      mt: 1,
                      mx: 1,
                      p: 2,
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
              borderRadius: "15px",
              boxShadow: "0px 0px 15px 0px rgb(88 88 88 / 20%)",
              mt: 2,
              p: 2,
            }}>
              <Typography fontWeight="600" sx={{ mb: 1 }}>
                Anexos
              </Typography>
              <Link href={ integrationSelected.anexo } target="_blank" underline="none">
                <Button
                  color="primary"
                  sx={{ borderRadius: "10px" }}
                  type=''
                  variant="contained"
                >
                  Baixar arquivo
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default IntegrationDetailsModal;
