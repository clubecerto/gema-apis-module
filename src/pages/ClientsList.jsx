import React, { useContext, useState } from 'react';

import APIsManagementContext from '../context/APIsManagementContext';
import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import ClientDetailsModal from '../components/ClientDetailsModal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


const ClientsList = ({ history: { location: { pathname } } }) => {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [modalClientId, setModalClientId] = useState('');

  const { clientsList } = useContext(APIsManagementContext);

  const integrationId = pathname.split('/')[2].slice(1);

  const handleDetailsModal = (clientId) => {
    setModalClientId(clientId);
    setIsDetailsModalOpen(!isDetailsModalOpen);
  }

  return (
    <>
      { !!isDetailsModalOpen && <ClientDetailsModal
        clientId={ modalClientId }
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
            <TableCell sx={{ fontWeight: "600" }}>Cliente</TableCell>
            <TableCell sx={{ fontWeight: "600" }}>Reponsável</TableCell>
            <TableCell align="center" sx={{ width: "80px", fontWeight: "600" }}>Cron</TableCell>
            <TableCell align="center" sx={{ width: "140px", fontWeight: "600" }}>Detalhes</TableCell>
            <TableCell align="center" sx={{ width: "120px", fontWeight: "600" }}>Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {
            clientsList
              .filter(({ integracao_id }) => integracao_id === integrationId)
                .map(({ nome, status, cron, responsavel, id }) => (
                  <TableRow
                    key={ nome }
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell sx={{ py: 1 }} >{ nome }</TableCell>
                    <TableCell sx={{ py: 1 }}>{ responsavel }</TableCell>
                    <TableCell align="center" sx={{ py: 1 }}>
                      { !cron ? 'Não' : 'Sim' }
                    </TableCell>
                    <TableCell align="center" sx={{ py: 1 }}>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={ () => handleDetailsModal(id) }
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

export default ClientsList;
