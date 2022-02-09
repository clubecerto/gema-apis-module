import React, { useContext, useEffect, useState } from 'react';

import { getClient } from '../services';

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
  maxWidth: '1200px',
  p: 3,
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  top: '50%',
  width: '90%',
};

const NewClientModal = ({ isOpen, handleClose, clientId }) => {
  const [clientSelected, setClientSelected] = useState('');

  const { categoriesList, integrationsList } = useContext(APIsManagementContext);

  // RECUPERA DADOS DA INTEGRAÇÃO ESCOLHIDA E SALVA DO ESTADO
  useEffect(() => {
    setClientSelected(getClient(clientId));
  }, []);

  // VERIFICA SE A CHAVE PASSADA É UMA DAS QUE NÃO DEVE SER RENDERIZADA
  const checkKey = (key) => {

    // CHAVES RENDERIZADAS EM OUTRA PARTE DO MODAL / NÃO DEVEM SER RENDERIZADAS NESSE MOMENTO
    const keysToNotBeRendered = [
      'categoria_id',
      'cron',
      'id',
      'integracao_id',
      'nome',
      'responsavel',
      'status',
    ];
    return !(keysToNotBeRendered
      .some((forbiddenKey) => key === forbiddenKey));
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
              display: "flex",
              justifyContent: "space-around",
              p: 2,
            }}
          >

            { /* NOME DO CLIENTE */ }
            <Typography
              id="transition-modal-title"
              component="h2"
              fontWeight="600"
              sx={{
                color: "white",
                flexGrow: 1,
                display: "flex",
                alignItems: "baseline",
              }}
              variant="h4"
            >
              { clientSelected.nome }

              { /* INTEGRAÇÃO DO CLIENTE */ }
              <Typography
                component="p"
                id="transition-modal-title"
                variant="subtitle1"
                sx={{ color: "white", ml: 1 }}
              >
                { !!clientSelected && integrationsList
                  .find((integration) => integration.integracao_id === clientSelected.integracao_id)
                  .api_empresa }
              </Typography>

              { /* CATEGORIA DO CLIENTE */ }
              <Typography
                component="p"
                id="transition-modal-title"
                variant="subtitle2"
                sx={{ color: "white", ml: 1 }}
              >
                { !!clientSelected && categoriesList
                  .find((category) => category.categoria_id === clientSelected.categoria_id)
                  .categoria_nome }
              </Typography>
            </Typography>

            { /* VISUALIZAÇÃO DA ROTINA CRON */ }
            <Box sx={{
              backgroundColor: "#efefef",
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
                  ml: 1,
                  p: 1,
                  textAlign: "center",
                  width: "130px",
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
                  mt: 2,
                  mx: 1,
                  p: 2,
                }}>
                  <Typography>
                    Nome: { !!clientSelected && clientSelected.responsavel.nome }
                  </Typography>
                </Box>
                <Box sx={{
                  backgroundColor: "#efefef",
                  borderRadius: "15px",
                  mx: 1,
                  mt: 1,
                  p: 2,
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
                <Typography fontWeight="600" sx={{ mb: 2 }}>
                  Anexos
                </Typography>
                <Link href={ clientSelected.anexo } target="_blank" underline="none">
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

            { /* COLUNA 2 */ }
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: "15px",
                boxShadow: "0px 0px 15px 0px rgb(88 88 88 / 20%)",
                mt: 2,
                p: 2,
                width: "65%",
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

                          // SUBSTITUI UNDERSCORES POR ESPAÇOS E COLOCA LETRA MAIÚSCULA NA PRIMEIRA LETRA DE CADA PALAVRA QUE FORMA A CHAVE
                          const formattedKey = key.split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
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
                                borderRadius: "15px",
                                mt: 1,
                                mx: 1,
                                p: 2,
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

export default NewClientModal;
