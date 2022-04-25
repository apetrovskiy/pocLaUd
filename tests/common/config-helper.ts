import 'dotenv/config';
import { Config } from '../model/config';
import configDataSet from '../data/parties.json';
import { Environments } from '../model/environments';

export const loadConfig = (): Config => {
  const envName = process.env.ENVIRONMENT || Environments.devTest;
  let subset: Config = { name: Environments.devTest, disputeNumber: '' };
  for (let i = 0; i < configDataSet.length; i++) {
    if (configDataSet[i].name === envName) {
      subset = configDataSet[i];
      break;
    }
  }
  return subset;
};
