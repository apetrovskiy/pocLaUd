import { Page } from '@playwright/test';
import { getEdcsUrl } from '../model/urls';

export const cleanUpDispute = async (page: Page, disputeNumber: string) => {
  //
  console.log(
    '------------------------------------------------------------------------'
  );
  console.log(`Dispute number ${disputeNumber}`);
  //

  //
  console.log(`EDCS URL = ${getEdcsUrl()}`);
  //
};
