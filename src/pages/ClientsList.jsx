import React, { useContext } from 'react';

import APIsManagementContext from '../context/APIsManagementContext';
import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


const ClientsList = ({ history: { location: { pathname } } }) => {
  const {
    categoriesList,
  } = useContext(APIsManagementContext);

  const categoryId = pathname.split('/')[1].slice(1);
  const integrationId = pathname.split('/')[2].slice(1);

  console.log(categoryId);
  console.log(integrationId);

  return (
    <Table
      aria-label="simple table"
      sx={{ my: 1 }}
    >
      <TableHead>
        <TableRow>
          {/* contato(email, telefone), informações email, botão editar */}
          <TableCell>Cliente</TableCell>
          <TableCell>Reponsável</TableCell>
          <TableCell align="center" sx={{ width: "80px" }}>Cron</TableCell>
          <TableCell align="center" sx={{ width: "140px" }}>Detalhes</TableCell>
          <TableCell align="center" sx={{ width: "120px" }}>Status</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {
          categoriesList
            .find(({ category_id }) => category_id === categoryId).integrations
            .find(({ integration_id }) => integration_id === integrationId).clients
            .map(({ client_name, status }) => (
              <TableRow
                key={ client_name }
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell sx={{ py: 1 }} >{ client_name }</TableCell>
                <TableCell sx={{ py: 1 }}>Pessoa 1</TableCell>
                <TableCell align="center" sx={{ py: 1 }}>Sim</TableCell>
                <TableCell align="center" sx={{ py: 1 }}>
                  <Button
                    color="success"
                    variant="contained"
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
  );
};

export default ClientsList;
