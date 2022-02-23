import React, { useContext, useEffect, useRef, useState } from 'react';

import { fetchClientDetails, fetchIntegrationDetails } from '../services';

import APIsManagementContext from '../context/APIsManagementContext';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CancelIcon from '@mui/icons-material/Cancel';
import Checkbox from '@mui/material/Checkbox';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import StyledDialog from './StyledDialog';
import StyledInput from './StyledInput';
import Typography from '@mui/material/Typography';

const ClientDetailsModal = ({ isOpen, handleClose, clientId, integrationId }) => {
  const [checkboxChecked, setCheckboxChecked] = useState('');
  const [clientSelected, setClientSelected] = useState('');
  const [clientInEditing, setClientInEditing] = useState({});
  const [clientIntegration, setClientIntegration] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaveAndCancelButtonsDisplayed, setIsSaveAndCancelButtonsDisplayed] = useState(false);
  const [planoProdutoInputValue, setPlanoProdutoInputValue] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');

  const planoProdutoInput = useRef();
  const phoneNumberInput = useRef();

  const { categoriesList } = useContext(APIsManagementContext);

  // RECUPERA DADOS DA INTEGRAÇÃO ESCOLHIDA E SALVA DO ESTADO
  const getIntegrationDetails = async () => {
    const integrationDetailsFetched = await fetchIntegrationDetails(integrationId);
    setClientIntegration(integrationDetailsFetched);
  };

  // RECUPERA DADOS DO CLIENTE ESCOLHIDO E SALVA DO ESTADO
  const getClientDetails = async () => {
    const clientDetailsFetched = await fetchClientDetails(clientId);
    setClientSelected(clientDetailsFetched);
  };

  // RECUPERA DADOS DO CLIENTE ESCOLHIDA E SALVA DO ESTADO
  useEffect(() => {
    getIntegrationDetails();
    getClientDetails();
  }, []);

  // SALVA O NOME DO CHECKBOX DO CLIENTSELECTED QUE TEM CONTEÚDO NO ESTADO CHECKBOXCHECKED
  const setCheckboxAccordingToClientSelected = () => {
    if (!!clientSelected.plano) {
      setCheckboxChecked('plano');
    } else if (!!clientSelected.produto) {
      setCheckboxChecked('produto');
    } else {
      setCheckboxChecked('tombamento');
    };
  };

  // EXECUTA A FUNÇÃO SET "CHECKBOX ACCORDING TO CLIENT SELECTED" AO PREENCHER O CLIENT SELECTED
  useEffect(() => {
    setCheckboxAccordingToClientSelected();
  }, [clientSelected]);

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
      'anexo',
      'plano',
      'produto',
      'tombamento',
      'observacoes',
    ];
    return !(keysToNotBeRendered
      .some((forbiddenKey) => key === forbiddenKey));
  };

  const startToEditClient = () => {
    setIsEditing(true);
    setIsSaveAndCancelButtonsDisplayed(true);
    setClientInEditing(clientSelected);
    if (!!clientSelected.plano) {
      setCheckboxChecked('plano');
    } else if (!!clientSelected.produto) {
      setCheckboxChecked('produto');
    } else {
      setCheckboxChecked('tombamento');
    };
  };

  // LIDA COM MUDANÇAS NOS CAMPOS (EXCETO RESPONSÁVEL E PLANO/PRODUTO/TOMBAMENTO)
  const handleEdit = ({target: { name, value }}) => {
    setClientInEditing((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // LIDA COM MUDANÇAS NOS CAMPOS DO RESPONSÁVEL (EXCETO TELEFONES)
  const handleManagerEdit = ({target: { name, value }}) => {
    if (name === 'telefone') {
      setClientInEditing((current) => ({
        ...current,
        responsavel: {
          ...current.responsavel,
          telefone: [...current.responsavel.telefone, value],
        },
      }));
    } else {
      setClientInEditing((current) => ({
        ...current,
        responsavel: {
          ...current.responsavel,
          [name]: value,
        },
      }));
    };
  };

  // RESETA PLANOS/PRODUTOS NO ESTADO
  const resetPlanoProdutoValues = (name) => {
    switch (name) {
    case 'plano':
      setClientInEditing((current) => ({
        ...current,
        produto: null,
        tombamento: false,
      }));
      break;
    case 'produto':
      setClientInEditing((current) => ({
        ...current,
        plano: null,
        tombamento: false,
      }));
      break;
    default:
      setClientInEditing((current) => ({
        ...current,
        plano: null,
        produto: null,
      }));
      break;
    };
  };

  // LIDA COM MUDANÇAS NOS CHECKBOX PLANO/PRODUTO/TOMBAMENTO
  const handleCheckbox = ({ target: { name } }) => {
    if (checkboxChecked === name) {
      setCheckboxChecked('');
    } else {
      setCheckboxChecked(name);
    };
    resetPlanoProdutoValues(name);
  };

  // ADICIONA NOVO PLANO/PRODUTO AO ESTADO 
  const submitNewPlanoProdutoInputValue = () => {
    if (!clientInEditing[checkboxChecked]) {
      setClientInEditing((current) => ({
        ...current,
        [checkboxChecked]: [planoProdutoInputValue],
      }));
    } else {
      setClientInEditing((current) => ({
        ...current,
        [checkboxChecked]: [...current[checkboxChecked], planoProdutoInputValue],
      }));
    };
    setPlanoProdutoInputValue('');
    planoProdutoInput.current.focus();
  };

  // DELETA PLANO/PRODUTO DO ESTADO
  const deletePlanoProdutoInputValue = ({ currentTarget: { name } }) => {
    const newList = clientInEditing[checkboxChecked]
      .filter((value) => value !== name);
    setClientInEditing((current) => ({
      ...current,
      [checkboxChecked]: newList,
    }));
  };

  // ADICIONA NOVO NÚMERO DE TELEFONE AO ESTADO
  const submitNewPhoneNumber = () => {
    if (!clientInEditing.responsavel.telefone) {
      setClientInEditing((current) => ({
        ...current,
        responsavel: {
          ...current.responsavel,
          telefone: [newPhoneNumber],
        },
      }));
    } else {
      setClientInEditing((current) => ({
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
    const newList = clientInEditing.responsavel.telefone
      .filter((phoneNumber) => phoneNumber !== name);
    setClientInEditing((current) => ({
      ...current,
      responsavel: {
        ...current.responsavel,
        telefone: newList,
      },
    }));
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setIsSaveAndCancelButtonsDisplayed(false);
    setClientInEditing({})
  };

  const submitEdit = () => {
    cancelEdit();
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
              alignItems: "baseline",
              color: "white",
              display: "flex",
              flexGrow: 1,
              wordWrap: "break-word",
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
              { !!clientIntegration && clientIntegration.api_empresa }
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
          {
            isEditing
            ? (
              <StyledInput
                color="primary"
                label="Cron"
                name="cron"
                onChange={ handleEdit }
                required
                select
                size="small"
                sx={{ width: "100px", mr: 2 }}
                value={ clientInEditing.cron }
                variant="outlined"
              >
                <MenuItem value="1">
                  Sim
                </MenuItem>
                <MenuItem value="0">
                  Não
                </MenuItem>
              </StyledInput>
            )
            : !clientSelected.cron
            ? (
              <Box
                sx={{
                  backgroundColor: "white",
                  borderRadius: "20px",
                  color: "#b40803",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  height: "36px",
                  mr: 1,
                  paddingTop: "8px",
                  textAlign: "center",
                  width: "120px",
                }}
              >
                CRON: NÃO
              </Box>
            )
            : (
              <Box
                sx={{
                  backgroundColor: "white",
                  borderRadius: "20px",
                  color: "#00964f",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  height: "36px",
                  mr: 1,
                  paddingTop: "8px",
                  textAlign: "center",
                  width: "120px",
                }}
              >
                CRON: SIM
              </Box>
              )
            }

            { /* VISUALIZAÇÃO DO STATUS */ }
          {
            isEditing
            ? (
              <StyledInput
                color="primary"
                label="Status"
                name="status"
                onChange={ handleEdit }
                required
                select
                size="small"
                sx={{ width: "100px", mr: 2 }}
                value={ clientInEditing.status }
                variant="outlined"
              >
                <MenuItem value="1">
                  Ativo
                </MenuItem>
                <MenuItem value="0">
                  Inativo
                </MenuItem>
              </StyledInput>
            )
            : !clientSelected.status
            ? (
              <Box
                sx={{
                  backgroundColor: "white",
                  borderRadius: "20px",
                  color: "#b40803",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  height: "36px",
                  mr: 2,
                  paddingTop: "8px",
                  textAlign: "center",
                  width: "140px",
                }}
              >
                STATUS: INATIVO
              </Box>
            )
            : (
              <Box
                sx={{
                  backgroundColor: "white",
                  borderRadius: "20px",
                  color: "#00964f",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  height: "36px",
                  mr: 2,
                  paddingTop: "8px",
                  textAlign: "center",
                  width: "140px",
                }}
              >
                STATUS: ATIVO
              </Box>
            )
          }

          { /* BOTÕES DE EDITAR, CANCELAR E SALVAR EDIÇÃO */ }
          {
            isSaveAndCancelButtonsDisplayed
            ? (
              <ButtonGroup>
                <Button
                  color="whiteColor"
                  endIcon={ <CancelIcon /> }
                  onClick={ cancelEdit }
                  sx={{ borderRadius: "10px", color:"#b40803", height: "40px" }}
                  type="button"
                  variant="contained"
                >
                  Cancelar
                </Button>
                <Button
                  color="whiteColor"
                  endIcon={ <DoneIcon /> }
                  onClick={ submitEdit }
                  sx={{ borderRadius: "10px", color:"#00964f", height: "40px", width: "125px" }}
                  type="button"
                  variant="contained"
                >
                  Salvar
                </Button>
              </ButtonGroup>
            )
            : (
              <Button
                color="whiteColor"
                endIcon={ <EditIcon /> }
                onClick={ startToEditClient }
                sx={{ borderRadius: "10px", color:"#00964f", height: "40px" }}
                type="button"
                variant="contained"
              >
                Editar
              </Button>
            )
          }
        </Box>
      </DialogTitle>

      { /* CORPO DO MODAL */ }
      <DialogContent sx={{ mb: 0.5 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >

          { /* COLUNA 1 */ }
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "10px",
              boxShadow: "0px 0px 15px 0px rgb(88 88 88 / 20%)",
              mt: 1.5,
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
              { /* COLUNA 1.1 */ }
              <Box sx={{ width: "50%" }}>

                { /* DADOS DO CLIENTE */ }
                {
                  Object.keys(clientSelected).map((key) => {
                    const shouldRender = checkKey(key);
                    if (
                      shouldRender
                      && clientSelected[key] !== null
                    ) {

                      // SUBSTITUI UNDERSCORES POR ESPAÇOS E COLOCA LETRA MAIÚSCULA NA PRIMEIRA LETRA DE CADA PALAVRA QUE FORMA A CHAVE
                      const formattedKey = key.split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
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
                          {
                            isEditing
                            ? (
                              <StyledInput
                                color="primary"
                                fullWidth
                                label={ formattedKey }
                                multiline
                                name={ key }
                                onChange={ handleEdit }
                                required
                                size="small"
                                type="text"
                                value={ clientInEditing[key] }
                                variant="outlined"
                              />
                            )
                            : (
                              <Typography sx={{ wordWrap: "break-word" }}>
                                { !!clientSelected && `${formattedKey}: ${clientSelected[key]}` }
                              </Typography>
                            )
                          }
                        </Box>
                      );
                    };
                  })
                }
              </Box>

              { /* COLUNA 1.2 */ }
              <Box sx={{ width: "50%" }}>

                { /* OBSERVAÇÕES */ }
                <Box
                  sx={{
                    backgroundColor: "#efefef",
                    borderRadius: "10px",
                    mt: 1,
                    mx: 1,
                    p: 2,
                  }}
                >
                  {
                    isEditing
                    ? (
                      <StyledInput
                        color="primary"
                        fullWidth
                        label="Observações"
                        multiline
                        name="observacoes"
                        onChange={ handleEdit }
                        required
                        size="small"
                        type="text"
                        value={ clientInEditing.observacoes }
                        variant="outlined"
                      />
                    )
                    : (
                      <Typography sx={{ wordWrap: "break-word" }}>
                        { !!clientSelected && `Observações: ${clientSelected.observacoes}` }
                      </Typography>
                    )
                  }
                </Box>

                { /* PLANO/PRODUTO/TOMBAMENTO */ }
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
                  {
                    isEditing
                    ? (
                      <FormGroup sx={{ mx: 1, px: 1 }}>
                        <FormControlLabel
                        control={<Checkbox
                          checked={ checkboxChecked === 'plano' }
                          name="plano"
                          onChange={ handleCheckbox }
                        />} label="Plano" />
                        <FormControlLabel control={<Checkbox
                          checked={ checkboxChecked === 'produto' }
                          name="produto"
                          onChange={ handleCheckbox }
                        />} label="Produto" />
                        <FormControlLabel control={<Checkbox
                          checked={ checkboxChecked === 'tombamento' }
                          name="tombamento"
                          onChange={ handleCheckbox }
                        />} label="Tombamento" />
                      </FormGroup>
                    )
                    : (
                      <FormGroup sx={{ mx: 1, px: 1 }}>
                        <FormControlLabel
                        control={<Checkbox
                          checked={ !!clientSelected.plano }
                          name="plano"
                          />} label="Plano" />
                        <FormControlLabel control={<Checkbox
                          checked={ !!clientSelected.produto }
                          name="produto"
                          />} label="Produto" />
                        <FormControlLabel control={<Checkbox
                          checked={ !!clientSelected.tombamento }
                          name="tombamento"
                          />} label="Tombamento" />
                      </FormGroup>
                    )
                  }

                  { /* LISTA DOS VALORES DOS INPUTS RELACIONADOS A PLANO/PRODUTO */ }
                  {
                    !!clientSelected[checkboxChecked]
                    && checkboxChecked !== 'tombamento'
                    && (
                      <Typography sx={{ mt: 1 }}>
                        { checkboxChecked.charAt(0).toUpperCase() + checkboxChecked.slice(1) + 's:' }
                      </Typography>
                    )
                  }
                  {
                    isEditing
                    ? (
                      !!clientInEditing[checkboxChecked]
                      && checkboxChecked !== 'tombamento'
                      && (
                        <List dense>
                          {
                            clientInEditing[checkboxChecked].map((item) => (
                              <ListItem
                                key={ item }
                                secondaryAction={
                                  <IconButton
                                    aria-label="delete"
                                    color="error"
                                    edge="end"
                                    name={ item }
                                    onClick={ deletePlanoProdutoInputValue }
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
                    )
                    : (
                      !!clientSelected[checkboxChecked]
                      && checkboxChecked !== 'tombamento'
                      && (
                        <List dense>
                          {
                            clientSelected[checkboxChecked].map((item) => (
                              <ListItem
                                key={ item }
                                sx={{ backgroundColor: "white", borderRadius: "10px", mb: 1, wordWrap: "break-word" }}
                              >
                                <ListItemText primary={ item } />
                              </ListItem>
                            ))
                          }
                        </List>
                      )
                    )
                  }

                  { /* INPUT RELACIONADO A PLANO/PRODUTO */ }
                  { 
                    isEditing
                    && !!clientInEditing
                    && !!checkboxChecked
                    && checkboxChecked !== 'tombamento'
                    && (
                      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                        <StyledInput
                          color="primary"
                          fullWidth
                          label={ checkboxChecked.charAt(0).toUpperCase() + checkboxChecked.slice(1) }
                          multiline
                          name={ checkboxChecked }
                          onChange={ ({ target: { value } }) => setPlanoProdutoInputValue(value) }
                          inputRef={ planoProdutoInput }
                          size="small"
                          type="text"
                          value={ planoProdutoInputValue }
                          variant="outlined"
                        />
                        <IconButton
                          aria-label="done"
                          color="primary"
                          disabled={ !planoProdutoInputValue }
                          onClick={ submitNewPlanoProdutoInputValue }
                          sx={{ ml: 1 }}
                        >
                          <CheckCircleIcon />
                        </IconButton>
                      </Box>
                    )
                  }
                </Box>
              </Box>
            </Box>
          </Box>

          { /* COLUNA 2 */ }
          <Box sx={{ width: "33%" }}>

            { /* INFORMAÇÕES DO RESPONSÁVEL */ }
            <Box sx={{
              backgroundColor: "white",
              borderRadius: "10px",
              boxShadow: "0px 0px 15px 0px rgb(88 88 88 / 20%)",
              mt: 1.5,
              p: 2,
            }}>
              <Typography fontWeight="600" sx={{ mb: 1 }}>
                Responsável
              </Typography>

              { /* NOME DO RESPONSÁVEL */ }
              <Box sx={{
                backgroundColor: "#efefef",
                borderRadius: "10px",
                mt: 2,
                mx: 1,
                p: 2,
              }}>
                {
                  isEditing
                  ? (
                    <StyledInput
                      color="primary"
                      fullWidth
                      label="Nome"
                      multiline
                      name="nome"
                      onChange={ handleManagerEdit }
                      required
                      size="small"
                      type="text"
                      value={ !!clientInEditing && clientInEditing.responsavel.nome }
                      variant="outlined"
                    />
                  )
                  : (
                    <Typography sx={{ wordWrap: "break-word" }}>
                      Nome: { !!clientSelected && clientSelected.responsavel.nome }
                    </Typography>
                  )
                }
              </Box>

              { /* EMAIL DO REPONSÁVEL */ }
              <Box sx={{
                backgroundColor: "#efefef",
                borderRadius: "10px",
                mx: 1,
                mt: 1,
                p: 2,
              }}>
                {
                  isEditing
                  ? (
                    <StyledInput
                      color="primary"
                      fullWidth
                      label="Email"
                      multiline
                      name="email"
                      onChange={ handleManagerEdit }
                      required
                      size="small"
                      type="text"
                      value={ !!clientInEditing && clientInEditing.responsavel.email }
                      variant="outlined"
                    />
                  )
                  : (
                    <Typography sx={{ wordWrap: "break-word" }}>
                      Email: { !!clientSelected && clientSelected.responsavel.email }
                    </Typography>
                  )
                }
              </Box>

              { /* TELEFONES DO RESPONSÁVEL */ }
              <Box
                sx={{
                  backgroundColor: "#efefef",
                  borderRadius: "10px",
                  mt: 1,
                  mx: 1,
                  p: 2,
                }}
              >
                <Typography>
                  Telefones:
                </Typography>

                { /* LISTA DE TELEFONES */ }
                {
                  isEditing
                  ? (
                    <List dense>
                      {
                        clientInEditing.responsavel.telefone.map((telefone) => (
                          <ListItem
                            key={ telefone }
                            secondaryAction={
                              <IconButton
                                aria-label="delete"
                                color="error"
                                edge="end"
                                name={ telefone }
                                onClick={ deletePhoneNumber }
                              >
                                <DeleteIcon />
                              </IconButton>
                            }
                            sx={{ backgroundColor: "white", borderRadius: "10px", mb: 1, wordWrap: "break-word" }}
                          >
                            <ListItemText primary={ telefone } />
                          </ListItem>
                        ))
                      }
                    </List>
                  )
                  : (
                    <List dense>
                      {
                        !!clientSelected && clientSelected.responsavel.telefone.map((telefone) => (
                          <ListItem
                            key={ telefone }
                            sx={{ backgroundColor: "white", borderRadius: "10px", mb: 1, wordWrap: "break-word" }}
                          >
                            <ListItemText primary={ telefone } />
                          </ListItem>
                        ))
                      }
                    </List>
                  )
                }

                { /* INPUT DE TELEFONE */ }
                { 
                  isEditing
                  && !!clientInEditing
                  && (
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                      <StyledInput
                        color="primary"
                        fullWidth
                        label="Telefone"
                        multiline
                        name="telefone"
                        onChange={ ({ target: { value } }) => setNewPhoneNumber(value) }
                        inputRef={ phoneNumberInput }
                        size="small"
                        type="tel"
                        value={ newPhoneNumber }
                        variant="outlined"
                      />
                      <IconButton
                        aria-label="done"
                        color="primary"
                        disabled={ !newPhoneNumber }
                        onClick={ submitNewPhoneNumber }
                        sx={{ ml: 1 }}
                      >
                        <CheckCircleIcon />
                      </IconButton>
                    </Box>
                  )
                }
              </Box>
            </Box>

            { /* ACESSO AO ANEXO */ }
            {
              <Box sx={{
                backgroundColor: "white",
                borderRadius: "10px",
                boxShadow: "0px 0px 15px 0px rgb(88 88 88 / 20%)",
                mt: 2,
                p: 2,
              }}>
                <Typography fontWeight="600" sx={{ mb: 2 }}>
                  Anexos
                </Typography>
                {
                  isEditing
                  ? (
                    <StyledInput
                      color="primary"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      label="Anexo"
                      name="anexo"
                      // onChange={  }
                      size="small"
                      type="file"
                      variant="outlined"
                    />
                  )
                  : !!(clientSelected.anexo) && (
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
                  )
                }
              </Box>
            }
          </Box>
        </Box>
      </DialogContent>
    </StyledDialog>
  );
};

export default ClientDetailsModal;
