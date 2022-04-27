import { Page } from '@playwright/test';
import { DisputeConfig } from '../model/dispute-config';
import { getEdcsUrl } from '../model/urls';

export const cleanUpDispute = async (page: Page, config: DisputeConfig) => {
  await page.goto(getEdcsUrl());

  const navigationPromise = page.waitForNavigation();
  // login
  await page.waitForSelector('#fldLoginUserId_0');
  await page
    .locator('#fldLoginUserId_0')
    .fill(config.commonConfig!.edcsUsername!);
  await page.waitForSelector('#fldLoginSrcPassword_0');
  await page
    .locator('#fldLoginSrcPassword_0')
    .fill(config.commonConfig!.edcsPassword!);
  await page.click('.btn');
  await navigationPromise;

  // case inquiry
  await page.waitForSelector("text='Case Inquiry'");
  await page.click("text='Case Inquiry'");
  await navigationPromise;

  // case inquiry
  await page.waitForSelector("text='Search Disputes'");
  await page.click("text='Search Disputes'");
  await navigationPromise;

  // search disputes
  await page.waitForSelector('#fldDisputeSearchCaseNum_0');
  await page.locator('#fldDisputeSearchCaseNum_0').fill(config.disputeNumber);
  await page.click('.btn');
  await navigationPromise;

  try {
    const searchResult = page.locator('#fldDisputeSearchResult1CaseName1 > a');
    if (await searchResult.isVisible()) {
      await page.waitForSelector('#fldDisputeSearchResult1CaseName1 > a');
      await page.click('#fldDisputeSearchResult1CaseName1 > a');
      await navigationPromise;

      // view dispute
      await page.waitForSelector("text='Clean in Database'");
      page.on('dialog', (dialog) => dialog.accept());
      await page.click("text='Clean in Database'");
      await navigationPromise;
    }
  } catch (e) {
    // TODO: log this
  }
};
