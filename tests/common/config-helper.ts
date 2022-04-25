import 'dotenv/config';
import { Config } from '../model/config';
import configDataSet from '../data/parties.json';
import { Environments } from '../model/environments';
import { Party } from '../model/party';
import { PartyTypes } from '../model/party-types';

export const loadConfig = (): Config => {
  const envName = process.env.ENVIRONMENT || Environments.devTest;
  let subset: Config = {
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
