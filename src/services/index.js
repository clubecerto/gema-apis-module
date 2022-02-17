import * as mocks from './mock';

const ALL_CATEGORIES_URL = '';
const ALL_INTEGRATIONS_URL = '';
const INTEGRATION_CLIENTS_URL = '';
const INTEGRATION_DETAILS_URL = '';
const CLIENT_DETAILS_URL = '';
const EDIT_CLIENT_URL = '';
const ADD_NEW_CLIENT_URL = '';

export const getIntegration = (integration_id) =>{
  const integrationSelected = `integration_${integration_id}`;
  return mocks[integrationSelected];
};

export const getClient = (client_id) =>{
  const clientSelected = `client_${client_id}`;
  return mocks[clientSelected];
};

// GET DE TODAS AS CATEGORIAS
export const getCategories = async () => {
  try {
    const allCategories = await fetch(ALL_CATEGORIES_URL);
    return JSON.parse(allCategories);
  } catch (error) {
    console.log(error);
  }
};

// GET DE TODAS AS INTEGRAÇÕES
export const getIntegrations = async () => {
  try {
    const integrations = await fetch(ALL_INTEGRATIONS_URL);
    return JSON.parse(integrations);
  } catch (error) {
    console.log(error);
  }
};

// GET DE DETALHES DE UMA INTEGRAÇÃO
export const getIntegrationDetails = async (integrationId) => {
  try {
    const allIntegrationDetails = await fetch(`${INTEGRATION_DETAILS_URL}/${integrationId}`);
    return JSON.parse(allIntegrationDetails);
  } catch (error) {
    console.log(error);
  }
};

// GET DE TODOS OS CLIENTES DE UMA DETERMINADA INTEGRAÇÃO
export const getIntegrationClients = async (integrationId) => {
  try {
    const integrationClients = await fetch(`${INTEGRATION_CLIENTS_URL}/${integrationId}`);
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
