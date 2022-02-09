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

  const categoryId = pathname.slice(2);

  const handleClickIntegration = ({ target: { name } }) => {
    push(`${pathname}/:${name}`);
  };

  const handleDetailsModal = (integrationId) => {
    setModalIntegrationId(integrationId)
    setIsDetailsModalOpen(!isDetailsModalOpen);
  }

  return (
    <>
      { !!isDetailsModalOpen && <IntegrationDetailsModal
        integrationId={ modalIntegrationId }
        isOpen={ isDetailsModalOpen }
        handleClose={ handleDetailsModal }
      /> }
      <Table
        aria-label="simple table"
        sx={{
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0px 0px 15px 0px rgb(88 88 88 / 20%)",
          my: 3,
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "600" }}>API Empresa</TableCell>
            <TableCell sx={{ fontWeight: "600" }}>Responsável</TableCell>
            <TableCell align="center" sx={{ width: "80px", fontWeight: "600" }}>Cron</TableCell>
            <TableCell align="center" sx={{ width: "140px", fontWeight: "600" }}>Detalhes</TableCell>
            <TableCell align="center" sx={{ width: "120px", fontWeight: "600" }}>Status</TableCell>
          </TableRow>
        </TableHead>

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
                        variant="outlined"
                        type="button"
                      >
                        { api_empresa }
                      </Button>
                    </TableCell>
                    <TableCell sx={{ py: 1 }}>{ responsavel }</TableCell>
                    <TableCell align="center" sx={{ py: 1 }}>
                      { !cron ? 'Não' : 'Sim' }
                    </TableCell>
                    <TableCell align="center" sx={{ py: 1 }}>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={ () => handleDetailsModal(integracao_id) }
                        sx={{ borderRadius: "10px" }}
                      >
                        Ver mais
                      </Button>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        py: 1,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {
                        !status
                        ? (
                          <Box
                          sx={{
                            backgroundColor: "#b40803",
                            color: "white",
                            height: "36px",
                            width: "90px",
                            borderRadius: "20px",
                            paddingTop: "8px",
                          }}
                          >
                            INATIVO
                          </Box>
                        )
                        : (
                          <Box
                          sx={{
                            backgroundColor: "#00964f",
                            color: "white",
                            height: "36px",
                              width: "90px",
                              borderRadius: "20px",
                              paddingTop: "8px",
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
