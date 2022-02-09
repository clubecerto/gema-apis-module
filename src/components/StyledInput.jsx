import { styled } from '@mui/material';
import TextField from '@mui/material/TextField';


const StyledInput = styled(TextField)(() => ({
  '& fieldset': {
    borderRadius: '10px',
  },
}));

export default StyledInput;
