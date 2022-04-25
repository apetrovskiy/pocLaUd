import { Locations } from './locations';
import { Party } from './party';

export interface Config {
  name: string;
  disputeNumber: string;
  location: Locations | string;
  parties?: Party[];
}
