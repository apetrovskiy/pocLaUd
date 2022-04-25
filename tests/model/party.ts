import { PartyTypes } from './party-types';

export interface Party {
  type: PartyTypes | string;
  email: string;
  password: string;
  id: string;
}
