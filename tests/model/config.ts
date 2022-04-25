import { Party } from './party';

export interface Config {
  name: string;
  disputeNumber: string;
  parties?: Party[];
}
