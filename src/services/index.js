import axios from 'axios';
// import * as mocks from './mock';

const ALL_CATEGORIES_URL = 'https://clubecerto.com.br/gema/api-manager/categorias';
const INTEGRATIONS_BY_CATEGORY_URL = '';
const INTEGRATION_DETAILS_URL = '';
const CLIENTS_BY_INTEGRATION_URL = '';
const CLIENT_DETAILS_URL = '';
const EDIT_CLIENT_URL = '';
const ADD_NEW_CLIENT_URL = '';

// export const getIntegration = (integration_id) =>{
//   const integrationSelected = `integration_${integration_id}`;
//   return mocks[integrationSelected];
// };

// export const getClient = (client_id) =>{
//   const clientSelected = `client_${client_id}`;
//   return mocks[clientSelected];
// };

// GET DE TODAS AS CATEGORIAS
export const getCategories = async () => {
  const headers = {
    Accept: '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
  };

  try {
    const allCategories = await axios.get(ALL_CATEGORIES_URL, { headers });
    console.log(allCategories);
    return JSON.parse(allCategories);
  } catch (error) {
    console.log(error);
  }
};

// GET DE TODAS AS INTEGRAÇÕES DE UMA DETERMINADA CATEGORIA
export const getIntegrationsByCategory = async (categoryId) => {
  try {
    const integrationsByCategory = await axios.get(INTEGRATIONS_BY_CATEGORY_URL);
    return JSON.parse(integrationsByCategory);
  } catch (error) {
    console.log(error);
  }
};

// GET DE DETALHES DE UMA INTEGRAÇÃO
export const getIntegrationDetails = async (integrationId) => {
  const routeParams = {
    params: {
      id: integrationId,
    },
  };

  try {
    const allIntegrationDetails = await axios.get(INTEGRATION_DETAILS_URL, routeParams);
    return JSON.parse(allIntegrationDetails);
  } catch (error) {
    console.log(error);
  }
};

// GET DE TODOS OS CLIENTES DE UMA DETERMINADA INTEGRAÇÃO
export const getIntegrationClients = async (integrationId) => {
  try {
    const integrationClients = await fetch(`${CLIENTS_BY_INTEGRATION_URL}/${integrationId}`);
    return JSON.parse(integrationClients);
  } catch (error) {
    console.log(error);
  }
};

// GET DE DETALHES DE UM CLIENTES
export const getClientDetails = async (clientId) => {
  try {
    const clientDetails = await fetch(`${CLIENT_DETAILS_URL}/${clientId}`);
    return JSON.parse(clientDetails);
  } catch (error) {
    console.log(error);
  }
};

// PATCH PARA EDITAR NOVO CLIENTE
export const editClient = async (client) => {
  try {

  } catch (error) {
    console.log(error);
  }
};

// POST PARA ADICIONAR NOVO CLIENTE
export const addNewClient = async (client) => {
  try {

  } catch (error) {
    console.log(error);
  }
};
