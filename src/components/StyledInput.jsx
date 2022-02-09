import { styled } from '@mui/material';
import TextField from '@mui/material/TextField';

// INPUT ESTILIZADO PARA ADEQUAR CANTOS ARREDONDADOS
const StyledInput = styled(TextField)(() => ({
  '& fieldset': {
    borderRadius: '10px',
  },
}));

export default StyledInput;
