import React, { useContext, useState } from 'react';

import APIsManagementContext from '../context/APIsManagementContext';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IntegrationDetailsModal from '../components/IntegrationDetailsModal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const IntegrationsList = ({ history: { push, location: { pathname } } }) => {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [modalIntegrationId, setModalIntegrationId] = useState('');

  const { integrationsList } = useContext(APIsManagementContext);

  // CAPTURA ID DA CATEGORIA SELECIONADA POR MEIO DO URL
  const categoryId = pathname.slice(2);

  // CLICAR NA INTEGRAÇÃO REDIRECIONA PARA SEUS RESPECTIVOS CLIENTES
  const handleClickIntegration = ({ target: { name } }) => {
    push(`${pathname}/:${name}`);
  };

  // ABRE E FECHA MODAL DE DETALHES DO CLIENTE
  const handleDetailsModal = (integrationId) => {
    setModalIntegrationId(integrationId)
    setIsDetailsModalOpen(!isDetailsModalOpen);
  };

  return (
    <>
      { !!isDetailsModalOpen && <IntegrationDetailsModal
        handleClose={ handleDetailsModal }
        integrationId={ modalIntegrationId }
        isOpen={ isDetailsModalOpen }
      /> }
      <Table
        aria-label="integrations list table"
        sx={{
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0px 0px 15px 0px rgb(88 88 88 / 20%)",
          my: 3,
        }}
      >
        { /* HEADER DA TABELA */ }
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "600" }}>API Empresa</TableCell>
            <TableCell sx={{ fontWeight: "600" }}>Responsável</TableCell>
            <TableCell align="center" sx={{ fontWeight: "600", width: "140px" }}>Detalhes</TableCell>
            <TableCell align="center" sx={{ fontWeight: "600", width: "120px" }}>Cron</TableCell>
            <TableCell align="center" sx={{ fontWeight: "600", width: "120px" }}>Status</TableCell>
          </TableRow>
        </TableHead>

        { /* CORPO DA TABELA */ }
        <TableBody>
          {
            integrationsList
              .filter(({ categoria_id }) => categoria_id === categoryId)
              .map(({ integracao_id, api_empresa, responsavel, status, cron }) => (
                <TableRow
                key={ api_empresa }
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell
                      sx={{ py: 1 }}
                    >
                      <Button
                        color="primary"
                        fullWidth
                        name={ integracao_id }
                        onClick={ handleClickIntegration }
                        sx={{ borderRadius: "10px" }}
                        type="button"
                        variant="outlined"
                      >
                        { api_empresa }
                      </Button>
                    </TableCell>
                    <TableCell sx={{ py: 1 }}>{ responsavel }</TableCell>
                    <TableCell align="center" sx={{ py: 1 }}>
                      <Button
                        color="primary"
                        onClick={ () => handleDetailsModal(integracao_id) }
                        sx={{ borderRadius: "10px" }}
                        variant="contained"
                      >
                        Ver mais
                      </Button>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        py: 1,
                      }}
                    >
                      { /* VISUALIZAÇÃO DA ROTINA CRON */ }
                      {
                        !cron
                        ? (
                          <Box
                          sx={{
                            backgroundColor: "#b40803",
                            borderRadius: "20px",
                            color: "white",
                            height: "36px",
                            paddingTop: "8px",
                            width: "90px",
                          }}
                          >
                            NÃO
                          </Box>
                        )
                        : (
                          <Box
                            sx={{
                              backgroundColor: "#00964f",
                              borderRadius: "20px",
                              color: "white",
                              height: "36px",
                              paddingTop: "8px",
                              width: "90px",
                            }}
                          >
                            SIM
                          </Box>
                        )
                    }
                  </TableCell>
                  <TableCell
                      align="center"
                      sx={{
                        py: 1,
                      }}
                    >
                      { /* VISUALIZAÇÃO DO STATUS */ }
                      {
                        !status
                        ? (
                          <Box
                          sx={{
                            backgroundColor: "#b40803",
                            borderRadius: "20px",
                            color: "white",
                            height: "36px",
                            paddingTop: "8px",
                            width: "90px",
                          }}
                          >
                            INATIVO
                          </Box>
                        )
                        : (
                          <Box
                            sx={{
                              backgroundColor: "#00964f",
                              borderRadius: "20px",
                              color: "white",
                              height: "36px",
                              paddingTop: "8px",
                              width: "90px",
                            }}
                          >
                            ATIVO
                          </Box>
                        )
                    }
                  </TableCell>
                </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </>
  );
};

export default IntegrationsList;
