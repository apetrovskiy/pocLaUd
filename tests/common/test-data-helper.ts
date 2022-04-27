import { PartyTypes } from '../model/party-types';
import { OpenCaseDto } from '../model/open-case-dto';
import { loadConfig, selectParty } from './config-helper';

export const prepareOpenCaseData = (partyType: PartyTypes): OpenCaseDto => {
  const config = loadConfig();
  const party = selectParty(partyType);

  const openCaseData: OpenCaseDto = {
    email: party.email,
    password: party.password,
    id: party.id,
    location: config.location,
    disputeNumber: config.disputeNumber,
  };
  return openCaseData;
};
