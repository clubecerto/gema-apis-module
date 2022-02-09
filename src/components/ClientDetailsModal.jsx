import React, { useContext, useEffect, useState } from 'react';

import { getClient } from '../services';

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
  width: '90%',
  maxWidth: '1200px',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 15,
  p: 3,
  backgroundColor: '#f5f6fa',
};

const IntegrationDetailsModal = ({ isOpen, handleClose, clientId }) => {
  const [clientSelected, setClientSelected] = useState('');
  const { categoriesList, integrationsList } = useContext(APIsManagementContext);

  // RECUPERA DADOS DA INTEGRAÇÃO ESCOLHIDA E SALVA DO ESTADO
  useEffect(() => {
    setClientSelected(getClient(clientId));
  }, []);

  const checkKey = (key) => {
    const keysToNotBeRendered = [
      'id',
      'nome',
      'status',
      'cron',
      'integracao_id',
      'categoria_id',
      'responsavel',
    ];
    return !(keysToNotBeRendered
      .some((forbiddenKey) => key === forbiddenKey));
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={ () => handleClose(clientId)}
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
              backgroundColor: "#00964f",
              borderRadius: "10px",
              p: 2,
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center"
            }}
          >

            { /* NOME DO CLIENTE */ }
            <Typography
              id="transition-modal-title"
              variant="h4"
              component="h2"
              fontWeight="600"
              sx={{
                color: "white",
                flexGrow: 1,
                display: "flex",
                alignItems: "baseline",
              }}
            >
              { clientSelected.nome }

              { /* INTEGRAÇÃO DO CLIENTE */ }
              <Typography
                id="transition-modal-title"
                variant="subtitle1"
                component="p"
                sx={{ color: "white", ml: 1 }}
              >
                { !!clientSelected && integrationsList.find((integration) => integration.integracao_id === clientSelected.integracao_id).api_empresa }
              </Typography>

              { /* CATEGORIA DO CLIENTE */ }
              <Typography
                id="transition-modal-title"
                variant="subtitle2"
                component="p"
                sx={{ color: "white", ml: 1 }}
              >
                { !!clientSelected && categoriesList.find((category) => category.categoria_id === clientSelected.categoria_id).categoria_nome }
              </Typography>
            </Typography>

            { /* VISUALIZAÇÃO DA ROTINA CRON */ }
            <Box sx={{
              backgroundColor: "#efefef",
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
                { `Cron: ${!clientSelected.cron ? 'Não' : 'Sim'}` }
              </Typography>
            </Box>

            { /* VISUALIZAÇÃO DO STATUS */ }
            {
              !clientSelected.status
              ? (
                <Box sx={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  p: 1,
                  width: "130px",
                  color: "#b40803",
                  ml: 1,
                  textAlign: "center",
                }}>
                  Status: Inativo
                </Box>
              )
              : (
                <Box sx={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  p: 1,
                  width: "130px",
                  color: "#00964f",
                  ml: 1,
                  textAlign: "center",
                }}>
                  Status: Ativo
                </Box>
              )
            }
          </Box>

          { /* CORPO DO MODAL */ }
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >

            { /* COLUNA 1 */ }
            <Box sx={{ width: "32%" }}>
              { /* INFORMAÇÕES DO RESPONSÁVEL */ }
              <Box sx={{
                backgroundColor: "white",
                boxShadow: "0px 0px 15px 0px rgb(88 88 88 / 20%)",
                p: 2,
                mt: 2,
                borderRadius: "15px",
              }}>
                <Typography fontWeight="600" sx={{ mb: 1 }}>
                  Responsável
                </Typography>
                <Box sx={{
                  backgroundColor: "#efefef",
                  p: 2,
                  mx: 1,
                  mt: 2,
                  borderRadius: "15px",
                }}>
                  <Typography>
                    Nome: { !!clientSelected && clientSelected.responsavel.nome }
                  </Typography>
                </Box>
                <Box sx={{
                  backgroundColor: "#efefef",
                  p: 2,
                  mx: 1,
                  mt: 1,
                  borderRadius: "15px",
                }}>
                  <Typography>
                    Email: { !!clientSelected && clientSelected.responsavel.email }
                  </Typography>
                </Box>
                {
                  !!clientSelected && clientSelected.responsavel.telefone.map((telefone) => (
                    <Box
                      key={ telefone }
                      sx={{
                        backgroundColor: "#efefef",
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
                <Typography fontWeight="600" sx={{ mb: 2 }}>
                  Anexos
                </Typography>
                <Link href={ clientSelected.anexo } underline="none" target="_blank">
                  <Button 
                    type=''
                    variant="contained"
                    color="primary"
                    sx={{ borderRadius: "10px" }}
                  >
                    Baixar arquivo
                  </Button>
                </Link>
              </Box>
            </Box>

            { /* COLUNA 2 */ }
            <Box
              sx={{
                width: "65%",
                backgroundColor: "white",
                boxShadow: "0px 0px 15px 0px rgb(88 88 88 / 20%)",
                borderRadius: "15px",
                p: 2,
                mt: 2,
              }}
            >
            <Typography fontWeight="600" sx={{ mb: 1 }}>
              Informações
            </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                { /* COLUNA 2.1 */ }
                <Box sx={{ width: "50%" }}>

                  { /* DADOS DO CLIENTE */ }
                  <Box>
                    {
                      Object.keys(clientSelected).map((key, index) => {
                        const shouldRender = checkKey(key);
                        if (
                          shouldRender
                          && clientSelected[key] !== null
                          && index < 14
                        ) {

                          // SUBSTITUI UNDERSCORES POR ESPAÇOS E COLOCA LETRA MAIÚSCULA NA PRIMEIRA LETRA DAS PALAVRAS QUE FORMAM A KEY
                          const formattedKey = key.split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                          return (
                            <Box
                              key={ key }
                              sx={{
                                backgroundColor: "#efefef",
                                p: 2,
                                mx: 1,
                                mt: 1,
                                borderRadius: "15px",
                              }}
                            >
                              <Typography>
                                { !!clientSelected && `${formattedKey}: ${clientSelected[key]}` }
                              </Typography>
                            </Box>
                          );
                        };
                      })
                    }
                  </Box>
                </Box>

                { /* COLUNA 2.2 */ }
                <Box sx={{ width: "50%" }}>
                  { /* DADOS DO CLIENTE */ }
                  <Box>
                    {
                      Object.keys(clientSelected).map((key, index) => {
                        const shouldRender = checkKey(key);
                        if (
                          shouldRender
                          && clientSelected[key] !== null
                          && index >= 14
                        ) {

                          // SUBSTITUI UNDERSCORES POR ESPAÇOS E COLOCA LETRA MAIÚSCULA NA PRIMEIRA LETRA DAS PALAVRAS QUE FORMAM A KEY
                          const formattedKey = key.split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                          return (
                            <Box
                              key={ key }
                              sx={{
                                backgroundColor: "#efefef",
                                p: 2,
                                mx: 1,
                                mt: 1,
                                borderRadius: "15px",
                              }}
                            >
                              <Typography>
                                { !!clientSelected && `${formattedKey}: ${clientSelected[key]}` }
                              </Typography>
                            </Box>
                          );
                        };
                      })
                    }
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default IntegrationDetailsModal;
