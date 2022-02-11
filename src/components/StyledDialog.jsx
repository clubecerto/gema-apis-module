import { styled } from '@mui/material';
import Dialog from '@mui/material/Dialog';

// INPUT ESTILIZADO PARA ADEQUAR CANTOS ARREDONDADOS
const StyledDialog = styled(Dialog)(() => ({
  '& .MuiPaper-root': {
    borderRadius: '10px',
  },
}));

export default StyledDialog;
