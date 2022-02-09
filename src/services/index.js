import * as mocks from './mock';

export const getIntegration = (integration_id) =>{
  const integrationSelected = `integration_${integration_id}`;
  return mocks[integrationSelected];
};

export const getClient = (client_id) =>{
  const clientSelected = `client_${client_id}`;
  return mocks[clientSelected];
};
