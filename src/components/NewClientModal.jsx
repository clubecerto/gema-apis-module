import React, { useContext, useRef, useState } from 'react';

import { getClient } from '../services';

import APIsManagementContext from '../context/APIsManagementContext';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DoneIcon from '@mui/icons-material/Done';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Typography from '@mui/material/Typography';
import StyledInput from './StyledInput';
import StyledDialog from './StyledDialog';

const NewClientModal = ({ isOpen, handleClose, clientId }) => {
  const INITIAL_NEW_CLIENT_STATE = {
    categoria_id: '',
    integracao_id: '',
    nome: '',
    status: '',
    cron: '',
    responsavel: {
      nome: '',
      email: '',
      telefone: [],
    },
    plano: null,
    produto: null,
    tombamento: false,
  };

  const [newClientInputs, setNewClientInputs] = useState(INITIAL_NEW_CLIENT_STATE);
  const [requiredFields, setRequiredFields] = useState([]);
  const [checkboxChecked, setCheckboxChecked] = useState('');
  const [isExtraInputDisplayed, setIsExtraInputDisplayed] = useState(false);
  const [extraInputValue, setExtraInputValue] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [isFinishButtonDisplayed, setIsFinishButtonDisplayed] = useState(false);

  const extraInput = useRef();
  const phoneNumberInput = useRef();

  const { categoriesList, integrationsList, } = useContext(APIsManagementContext);

  // VERIFICA SE A CHAVE PASSADA É UMA DAS QUE NÃO DEVE SER RENDERIZADA
  const checkKey = (key) => {

    // CHAVES RENDERIZADAS EM OUTRA PARTE DO MODAL / NÃO DEVEM SER RENDERIZADAS NESSE MOMENTO
    const keysToNotBeRendered = [
      'nome',
      'status',
      'cron',
      'responsavel',
      'categoria_id',
      'id',
      'integracao_id',
      'tombamento',
      'plano',
      'produto',
      'anexo',
    ];
    return !(keysToNotBeRendered
      .some((forbiddenKey) => key === forbiddenKey));
  };

  // LIDA COM O BOTÃO CONTINUAR DO HEADER DO MODAL 
  const handleHeaderSubmit = (event) => {
    event.preventDefault();
    const firstIntegrationClient = getClient(1); // ALTERAR PARA RECUPERAR O PRIMEIRO CLIENTE DA INTEGRAÇÃO, DE ACORDO COM A API
    const requiredKeys = Object.keys(firstIntegrationClient)
      .filter((key) => (
        !!firstIntegrationClient[key] && checkKey(key)
      ));
    setRequiredFields(requiredKeys);
    requiredKeys.forEach((key) => setNewClientInputs((current) => ({ ...current, [key]: '' })));
    setIsFinishButtonDisplayed(true);
  };

  // LIDA COM MUDANÇAS NOS INPUTS, SALVO EXCESSÕES (RESPONSÁVEL E CHECKBOX)
  const handleInputChanges = ({ target: { name, value }}) => {
    setNewClientInputs({
      ...newClientInputs,
      [name]: value,
    });
  };

  // LIDA COM MUDANÇAS NOS INPUTS DO RESPONSÁVEL PELA CONTA
  const handleManagerChanges = ({ target: { name, value }}) => {
    setNewClientInputs({
      ...newClientInputs,
      responsavel: {
        ...newClientInputs.responsavel,
        [name]: value,
      },
    });
  };

  // DEFINE SE O INPUT ASSOCIADO AOS CHECKBOX É RENDERIZADO
  const extraFieldHandler = (name) => {
    if (name === 'tombamento' || name === checkboxChecked) {
      setIsExtraInputDisplayed(false);
    } else {
      setIsExtraInputDisplayed(true);
    };
  }

  // RESETA PLANOS/PRODUTOS NO ESTADO
  const resetExtraInputValues = (name) => {
    switch (name) {
    case 'plano':
      setNewClientInputs((current) => ({
        ...current,
        produto: null,
        tombamento: false,
      }));
      break;
    case 'produto':
      setNewClientInputs((current) => ({
        ...current,
        plano: null,
        tombamento: false,
      }));
      break;
    default:
      setNewClientInputs((current) => ({
        ...current,
        plano: null,
        produto: null,
      }));
      break;
    };
    
    setNewClientInputs((current) => ({
      ...current,
      plano: null,
      produto: null,
      tombamento: false,
    }));
  };

  // LIDA COM MUDANÇAS NOS CHECKBOX
  const handleCheckbox = ({ target: { name }}) => {
    if (checkboxChecked === name) {
      setCheckboxChecked('');
    } else {
      setCheckboxChecked(name);
    };
    extraFieldHandler(name);
    resetExtraInputValues(name);
  };

  // ADICIONA NOVO PLANO/PRODUTO AO ESTADO 
  const submitNewExtraInputValue = () => {
    if (!newClientInputs[checkboxChecked]) {
      setNewClientInputs((current) => ({
        ...current,
        [checkboxChecked]: [extraInputValue],
      }));
    } else {
      setNewClientInputs((current) => ({
        ...current,
        [checkboxChecked]: [...current[checkboxChecked], extraInputValue],
      }));
    };
    setExtraInputValue('');
    extraInput.current.focus();
  };

  // DELETA PLANO/PRODUTO DO ESTADO
  const deleteExtraInputValue = ({ currentTarget: { name } }) => {
    const newList = newClientInputs[checkboxChecked]
      .filter((value) => value !== name);
    setNewClientInputs((current) => ({
      ...current,
      [checkboxChecked]: newList,
    }));
  };

  // ADICIONA NOVO NÚMERO DE TELEFONE AO ESTADO
  const submitNewPhoneNumber = () => {
    if (!newClientInputs.responsavel.telefone) {
      setNewClientInputs((current) => ({
        ...current,
        responsavel: {
          ...current.responsavel,
          telefone: [newPhoneNumber],
        },
      }));
    } else {
      setNewClientInputs((current) => ({
        ...current,
        responsavel: {
          ...current.responsavel,
          telefone: [...current.responsavel.telefone, newPhoneNumber],
        },
      }));
    };
    setNewPhoneNumber('');
    phoneNumberInput.current.focus();
  };

  // DELETA NÚMERO DE TELEFONE DO ESTADO
  const deletePhoneNumber = ({ currentTarget: { name } }) => {
    const newList = newClientInputs.responsavel.telefone
      .filter((phoneNumber) => phoneNumber !== name);
    setNewClientInputs((current) => ({
      ...current,
      responsavel: {
        ...current.responsavel,
        telefone: newList,
      },
    }));
  };

  // RENDERIZA A PRIMEIRA COLUNA DE INPUTS
  const renderClientData_C1 = () => {
    return (
      <>
        <Typography sx={{ mr: 1, pb: 1, fontWeight: "600" }}>
          Informações
        </Typography>
        <Box
          sx={{
            backgroundColor: "#efefef",
            borderRadius: "10px",
            mt: 1,
            mx: 1,
            p: 2,
          }}
        >
          <StyledInput
            autoFocus
            color="primary"
            fullWidth
            label="Nome do cliente"
            multiline
            name="nome"
            onChange={ handleInputChanges }
            required
            size="small"
            type="text"
            value={ newClientInputs.nome }
            variant="outlined"
          />
        </Box>
        <Box
          sx={{
            backgroundColor: "#efefef",
            borderRadius: "10px",
            mt: 1,
            mx: 1,
            p: 2,
          }}
        >
          <StyledInput
            color="primary"
            fullWidth
            label="Status"
            name="status"
            onChange={ handleInputChanges }
            required
            select
            size="small"
            value={ newClientInputs.status }
            variant="outlined"
          >
            <MenuItem sx={{ borderRadius: "10px" }} value="1">
              Ativo
            </MenuItem>
            <MenuItem value="0">
              Inativo
            </MenuItem>
          </StyledInput>
        </Box>
        <Box
          sx={{
            backgroundColor: "#efefef",
            borderRadius: "10px",
            mt: 1,
            mx: 1,
            p: 2,
          }}
        >
          <StyledInput
            color="primary"
            fullWidth
            label="Cron"
            name="cron"
            onChange={ handleInputChanges }
            required
            select
            size="small"
            value={ newClientInputs.cron }
            variant="outlined"
          >
            <MenuItem value="1">
              Sim
            </MenuItem>
            <MenuItem value="0">
              Não
            </MenuItem>
          </StyledInput>
        </Box>
        <Box
          sx={{
            backgroundColor: "#efefef",
            borderRadius: "10px",
            mt: 1,
            mx: 1,
            p: 2,
          }}
        >

          { /* CHECKBOX PARA ESCOLHA PLANO/PRODUTO/TOMBAMENTO */ }
          <FormGroup>
            <FormControlLabel
            control={<Checkbox
              checked={ checkboxChecked === "plano" }
              name="plano"
              onChange={ handleCheckbox }
            />} label="Plano" />
            <FormControlLabel control={<Checkbox
              checked={ checkboxChecked === "produto" }
              name="produto"
              onChange={ handleCheckbox }
            />} label="Produto" />
            <FormControlLabel control={<Checkbox
              checked={ checkboxChecked === "tombamento" }
              name="tombamento"
              onChange={ handleCheckbox }
            />} label="Tombamento" />
          </FormGroup>

          { /* LISTA DOS VALORES DOS INPUTS RELACIONADOS A PLANO/PRODUTO */ }
          {
            !!newClientInputs[checkboxChecked]
            && checkboxChecked !== 'tombamento'
            && (
              <List dense>
                {
                  newClientInputs[checkboxChecked].map((item) => (
                    <ListItem
                      key={ item }
                      secondaryAction={
                        <IconButton
                          aria-label="delete"
                          color="error"
                          edge="end"
                          name={ item }
                          onClick={ deleteExtraInputValue }
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                      sx={{ backgroundColor: "white", borderRadius: "10px", mb: 1, wordWrap: "break-word" }}
                    >
                      <ListItemText primary={ item } />
                    </ListItem>
                  ))
                }
              </List>
            )
          }

          { /* INPUT RELACIONADO A PLANO/PRODUTO */ }
          { 
            isExtraInputDisplayed && (
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                <StyledInput
                  color="primary"
                  fullWidth
                  label={ checkboxChecked.charAt(0).toUpperCase() + checkboxChecked.slice(1) }
                  multiline
                  name={ checkboxChecked }
                  onChange={ ({ target: { value } }) => setExtraInputValue(value) }
                  inputRef={ extraInput }
                  size="small"
                  type="text"
                  value={ extraInputValue }
                  variant="outlined"
                />
                <IconButton
                  aria-label="done"
                  color="primary"
                  disabled={ !extraInputValue }
                  onClick={ submitNewExtraInputValue }
                  sx={{ ml: 1 }}
                >
                  <CheckCircleIcon />
                </IconButton>
              </Box>
            )
          }
        </Box>
      </>
    );
  };

  // RENDERIZA A SEGUNDA COLUNA DE INPUTS
  const renderClientData_C2 = () => {
    return (
      <>
        {
          requiredFields.map((key) => {
            // SUBSTITUI UNDERSCORES POR ESPAÇOS E COLOCA LETRA MAIÚSCULA NA PRIMEIRA LETRA DE CADA PALAVRA QUE FORMA A CHAVE
            const formattedKey = key
              .split('_').map((word) => word.charAt(0).toUpperCase()
                + word.slice(1)).join(' ');
            return (
              <Box
                key={ key }
                sx={{
                  backgroundColor: "#efefef",
                  borderRadius: "10px",
                  mt: 1,
                  mx: 1,
                  p: 2,
                }}
              >
                <StyledInput
                  color="primary"
                  fullWidth
                  label={ formattedKey }
                  multiline
                  name={ key }
                  onChange={ handleInputChanges }
                  required
                  size="small"
                  type="text"
                  value={ newClientInputs[key] }
                  variant="outlined"
                />
              </Box>
            );
          })
        }
        {
          (
            <Box
              sx={{
                backgroundColor: "#efefef",
                borderRadius: "10px",
                mt: 1,
                mx: 1,
                p: 2,
              }}
            >
              <StyledInput
                color="primary"
                fullWidth
                InputLabelProps={{ shrink: true }}
                label="Anexo"
                name="anexo"
                onChange={ handleInputChanges }
                size="small"
                type="file"
                value={ newClientInputs.anexo }
                variant="outlined"
              />
            </Box>
          )
        }
      </>
    );
  };

  // RENDERIZA A TERCEIRA COLUNA DE INPUTS
  const renderClientManagerData = () => {
    return (
      <>
        <Typography sx={{ mr: 1, pb: 1, fontWeight: "600" }}>
          Responsável
        </Typography>
        <Box
          sx={{
            backgroundColor: "#efefef",
            borderRadius: "10px",
            mt: 1,
            mx: 1,
            p: 2,
          }}
        >
          <StyledInput
            color="primary"
            fullWidth
            label="Nome"
            multiline
            name="nome"
            onChange={ handleManagerChanges }
            required
            size="small"
            type="text"
            value={ newClientInputs.responsavel.nome }
            variant="outlined"
          />
        </Box>
        <Box
          sx={{
            backgroundColor: "#efefef",
            borderRadius: "10px",
            mt: 1,
            mx: 1,
            p: 2,
          }}
        >
          <StyledInput
            color="primary"
            fullWidth
            label="Email"
            multiline
            name="email"
            onChange={ handleManagerChanges }
            required
            size="small"
            type="email"
            value={ newClientInputs.responsavel.email }
            variant="outlined"
          />
        </Box>

        <Box
          sx={{
            backgroundColor: "#efefef",
            borderRadius: "10px",
            mt: 1,
            mx: 1,
            p: 2,
          }}
        >
          { /* LISTA DE TELEFONES ADICIONADOS */ }
          {
            !!newClientInputs.responsavel.telefone
            && (
              <List dense style={{ padding: 0 }}>
                {
                  newClientInputs.responsavel.telefone.map((numero) => (
                    <ListItem
                      key={ numero }
                      secondaryAction={
                        <IconButton
                          aria-label="delete"
                          color="error"
                          edge="end"
                          name={ numero }
                          onClick={ deletePhoneNumber }
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                      sx={{
                        backgroundColor: "white",
                        borderRadius: "10px",
                        mb: 1,
                        wordWrap: "break-word"
                      }}
                    >
                      <ListItemText primary={ numero } />
                    </ListItem>
                  ))
                }
              </List>
            )
          }

          { /* INPUT DO TELEFONE */ }
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <StyledInput
              color="primary"
              fullWidth
              inputRef={ phoneNumberInput }
              label="Telefone"
              multiline
              name="telefone"
              onChange={ ({ target: { value } }) => setNewPhoneNumber(value) }
              required
              size="small"
              sx={{ mt: 1 }}
              type="tel"
              value={ newPhoneNumber }
              variant="outlined"
              />
            <IconButton
              aria-label="done"
              color="primary"
              disabled={ !newPhoneNumber }
              onClick={ submitNewPhoneNumber }
              sx={{ ml: 1, mt: 1 }}
              >
              <CheckCircleIcon />
            </IconButton>
          </Box>
        </Box>
      </>
    );
  };

  // SALVA NOVO CLIENTE
  const submitNewClient = () => {
    console.log(newClientInputs);
  };

  return (
    <StyledDialog
      open={isOpen}
      onClose={() => handleClose(clientId)}
      scroll={"paper"}
      maxWidth="lg"
      fullWidth
      sx={{ borderRadius: "10px" }}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >

      { /* HEADER DO MODAL */ }
      <DialogTitle sx={{ mt: 1 }} id="scroll-dialog-title">
        <Box
          sx={{
            alignItems: "center",
            backgroundColor: "#00964f",
            borderRadius: "10px",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            p: 2,
          }}
        >
          <Typography
            component="h1"
            fontWeight="600"
            pl={1}
            variant="h4"
          >
            Novo Cliente
          </Typography>

          { /*CAMPOS PARA SELECIONAR CATGORIA E INTEGRAÇÃO */ }
          <form
            onSubmit={ handleHeaderSubmit }
          >
            <StyledInput
              color="whiteColor"
              label="Categorias"
              name="categories"
              onChange={ ({ target: { value } }) => {
                setNewClientInputs({ ...newClientInputs, categoria_id: value, integracao_id: '' });
                setIsFinishButtonDisplayed(false);
              } }
              select
              size="small"
              sx={{ mr: 2, width: "200px" }}
              value={ newClientInputs.categoria_id }
              variant="outlined"
            >
              {
                categoriesList.map(({ categoria_id, categoria_nome }) => (
                  <MenuItem
                    key={ categoria_nome }
                    value={ categoria_id }
                  >
                    { categoria_nome }
                  </MenuItem>
                ))
              }
            </StyledInput>
            <StyledInput
              color="whiteColor"
              disabled={ !newClientInputs.categoria_id }
              label="Integração"
              name="integracao"
              onChange={ ({ target: { value } }) => {
                setNewClientInputs({ ...newClientInputs, integracao_id: value });
                setIsFinishButtonDisplayed(false);
              } }
              select
              size="small"
              sx={{ width: "200px", mr: 2 }}
              value={ newClientInputs.integracao_id }
              variant="outlined"
            >
              {
                !!newClientInputs.categoria_id && integrationsList
                  .filter(({ categoria_id }) => categoria_id === newClientInputs.categoria_id)
                  .map(({ integracao_id, api_empresa }) => (
                    <MenuItem
                      key={ api_empresa }
                      value={ integracao_id }
                    >
                      { api_empresa }
                    </MenuItem>
                  ))
              }
            </StyledInput>
            {
              isFinishButtonDisplayed
              ? (
                <Button
                  color="whiteColor"
                  endIcon={ <DoneIcon /> }
                  onClick={ submitNewClient }
                  sx={{ borderRadius: "10px", color:"#00964f", height: "40px" }}
                  type="button"
                  variant="contained"
                >
                  Finalizar
                </Button>
              )
              : (
                <Button
                  color="whiteColor"
                  disabled={ !newClientInputs.integracao_id }
                  endIcon={ <NavigateNextIcon /> }
                  sx={{ borderRadius: "10px", color:"#00964f", height: "40px" }}
                  type="submit"
                  variant="contained"
                >
                  Continuar
                </Button>
              )
            }
          </form>
        </Box>
      </DialogTitle>

      { /* BODY DO MODAL */ }
      <DialogContent sx={{ mb: 0.5 }}>
        { requiredFields.length > 0 && (
          <Box
            fullWidth
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >

            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: "10px",
                boxShadow: "0px 0px 15px 0px rgb(88 88 88 / 20%)",
                display: "flex",
                justifyContent: "space-between",
                mt: 1.5,
                padding: "16px",
                width: "66%",
              }}
            >
              { /* COLUNA 1 */ }
              <Box sx={{ width: "50%" }}>
                { renderClientData_C1() }
              </Box>

              { /* COLUNA 2 */ }
              <Box sx={{ width: "50%", pt: 4 }}>
                { renderClientData_C2() }
              </Box>
            </Box>

            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: "10px",
                boxShadow: "0px 0px 15px 0px rgb(88 88 88 / 20%)",
                display: "flex",
                justifyContent: "space-between",
                ml: 2,
                mt: 1.5,
                padding: "16px",
                width: "32%",
              }}
            >
              { /* COLUNA 3 */ }
              <Box sx={{ width: "100%" }}>
                { renderClientManagerData() }
              </Box>
            </Box>
          </Box>)
        }
      </DialogContent>
    </StyledDialog>
  );
};

export default NewClientModal;
