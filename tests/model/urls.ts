import { Page } from '@playwright/test';
import { loadConfig } from '../common/config-helper';

const baseUrl = 'turbocourt.com';

export enum URLs {
  edcs = '/edcs',
  cprof = '/cprof',
  openingOffer = '/elf/dispatcher.jsp?gopage=p.odr.pstart.negotiation',
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
export const getOpeningOfferPage = () => {
  return getEnvUrl() + URLs.openingOffer;
};
