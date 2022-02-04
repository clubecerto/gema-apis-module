import React, { useContext, useState } from 'react';

import APIsManagementContext from '../context/APIsManagementContext';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DetailsModal from '../components/DetailsModal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const IntegrationsList = ({ history: { push, location: { pathname } } }) => {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [modalIntegrationId, setModalIntegrationId] = useState('');

  const { categoriesList } = useContext(APIsManagementContext);

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
      <DetailsModal
        type="integrationDetails"
        id={ modalIntegrationId }
        isOpen={ isDetailsModalOpen }
        handleClose={ handleDetailsModal }
      />
      <Table
        aria-label="simple table"
        sx={{ my: 1 }}
        >
        <TableHead>
          <TableRow>
            { /* nome responsavel, contato, anexos, status, cron */ }
            <TableCell>API Empresa</TableCell>
            <TableCell>Responsável</TableCell>
            <TableCell align="center" sx={{ width: "80px" }}>Cron</TableCell>
            <TableCell align="center" sx={{ width: "140px" }}>Detalhes</TableCell>
            <TableCell align="center" sx={{ width: "120px" }}>Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {
            categoriesList
            .find(({ category_id }) => category_id === categoryId).integrations
            .map(({ integration_id, integration_name, status, cron }) => (
              <TableRow
              key={ integration_name }
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                  <TableCell
                    sx={{ py: 1 }}
                    >
                    <Button
                      color="success"
                      name={ integration_id }
                      onClick={ handleClickIntegration }
                      variant="outlined"
                      type="button"
                    >
                      { integration_name }
                    </Button>
                  </TableCell>
                  <TableCell sx={{ py: 1 }}>Pessoa 1</TableCell>
                  <TableCell align="center" sx={{ py: 1 }}>
                    { !cron ? 'Não' : 'Sim' }
                  </TableCell>
                  <TableCell align="center" sx={{ py: 1 }}>
                    <Button
                      color="success"
                      variant="contained"
                      onClick={ () => handleDetailsModal(integration_id) }
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
                      !!status
                      ? (
                        <Box
                        sx={{
                          backgroundColor: "green",
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
                      : (
                        <Box
                        sx={{
                          backgroundColor: "red",
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
