import * as mocks from './mock';

const getIntegration = (integration_id) =>{
  const integrationSelected = `integration_${integration_id}`;
  return mocks[integrationSelected];
};

export default getIntegration;
