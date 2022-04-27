import { CommonConfig } from './common-config';
import { Locations } from './locations';
import { Party } from './party';

export interface DisputeConfig {
  name: string;
  disputeNumber: string;
  location: Locations | string;
  parties?: Party[];
  commonConfig?: CommonConfig;
}
