import axios from 'axios';
// import * as mocks from './mock';

const ALL_CATEGORIES_URL = 'https://clubecerto.com.br/gema/api-manager/categorias';
const INTEGRATIONS_BY_CATEGORY_URL = 'https://clubecerto.com.br/gema/api-manager/categorias'; // <= LINK ERRADO
const INTEGRATION_DETAILS_URL = 'https://clubecerto.com.br/gema/api-manager/categorias'; // <= LINK ERRADO
const CLIENTS_BY_INTEGRATION_URL = 'https://clubecerto.com.br/gema/api-manager/categorias'; // <= LINK ERRADO
const CLIENT_DETAILS_URL = 'https://clubecerto.com.br/gema/api-manager/categorias'; // <= LINK ERRADO
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
export const fetchCategories = async () => {
  try {
    const allCategories = await axios.get(ALL_CATEGORIES_URL);
    return allCategories.data;
  } catch (error) {
    console.log(error);
  }
};

// GET DE TODAS AS INTEGRAÇÕES DE UMA DETERMINADA CATEGORIA
export const fetchIntegrationsByCategory = async (categoryId) => {
  try {
    const integrationsByCategory = await axios.get(INTEGRATIONS_BY_CATEGORY_URL);
    return integrationsByCategory.data;
  } catch (error) {
    console.log(error);
  }
};

// GET DE DETALHES DE UMA INTEGRAÇÃO
export const fetchIntegrationDetails = async (integrationId) => {
  const routeParams = {
    params: {
      id: integrationId,
    },
  };

  try {
    const allIntegrationDetails = await axios.get(INTEGRATION_DETAILS_URL, routeParams);
    return allIntegrationDetails.data;
  } catch (error) {
    console.log(error);
  }
};

// GET DE TODOS OS CLIENTES DE UMA DETERMINADA INTEGRAÇÃO
export const fetchClientsByIntegration = async (integrationId) => {
  try {
    const clientsByIntegration = await axios.get(CLIENTS_BY_INTEGRATION_URL);
    return clientsByIntegration.data;
  } catch (error) {
    console.log(error);
  }
};

// GET DE DETALHES DE UM CLIENTES
export const fetchClientDetails = async (clientId) => {
  const routeParams = {
    params: {
      id: clientId,
    },
  };

  try {
    const allClientDetails = await axios.get(CLIENT_DETAILS_URL, routeParams);
    return allClientDetails.data;
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
