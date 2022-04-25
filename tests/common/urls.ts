const environment = process.env.ENVIRONMENT;
const baseUrl = 'turbocourt.com';

export enum URLs {
  edcs = '/edcs',
  cprof = '/cprof',
}

export const getEnvUrl = () => {
  return environment + '.' + baseUrl;
};

export const getEdcsUrl = () => {
  return getEnvUrl() + URLs.edcs;
};

export const getCprofUrl = () => {
  return getEnvUrl() + URLs.cprof;
};
