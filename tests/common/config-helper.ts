import 'dotenv/config';
import { DisputeConfig } from '../model/dispute-config';
import configDataSet from '../data/parties.json';
import { Environments } from '../model/environments';
import { Party } from '../model/party';
import { PartyTypes } from '../model/party-types';
import { CommonConfig } from '../model/common-config';

export const loadConfig = (): DisputeConfig => {
  const envName = process.env.ENVIRONMENT || Environments.devTest;
  const commonConfig: CommonConfig = {
    edcsUsername: process.env.EDCS_USERNAME || '',
    edcsPassword: process.env.EDCS_PASSWORD || '',
  };
  let subset: DisputeConfig = {
    name: Environments.devTest,
    disputeNumber: '',
    location: '',
  };
  for (let i = 0; i < configDataSet.length; i++) {
    if (configDataSet[i].name === envName) {
      subset = configDataSet[i];
      break;
    }
  }
  subset.commonConfig = commonConfig;
  return subset;
};

export const selectParty = (partyType: PartyTypes): Party => {
  const config = loadConfig();
  const party = config.parties!.find((p) => p.type === partyType) || {
    type: partyType,
    email: '',
    password: '',
    id: '',
  };
  return party;
};
