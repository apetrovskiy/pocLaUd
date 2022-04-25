import { loadConfig } from '../common/config-helper';

const baseUrl = 'turbocourt.com';

export enum URLs {
  edcs = '/edcs',
  cprof = '/cprof',
}

export const getEnvUrl = () => {
  const config = loadConfig();
  return 'https://' + config.name + '.' + baseUrl;
};

export const getEdcsUrl = () => {
  return getEnvUrl() + URLs.edcs;
};

export const getCprofUrl = () => {
  return getEnvUrl() + URLs.cprof;
};
