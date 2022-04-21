import { Page } from '@playwright/test';
import { OpenCaseDto } from '../model/open-case-dto';
import { OdrTexts } from './odr-text';
export const login = async (page: Page, username: string, password: string) => {
  await page.locator('#loginHome').fill(username);
  await page.locator('#passwdHome').fill(password);
  await page.locator('#login-page').click();
  page.waitForNavigation();
};

export const navigateToLaUd = async (page: Page) => {
  const navigationPromise = page.waitForNavigation();
  await page.locator(`a:has-text('${OdrTexts.california}')`).click();
  await navigationPromise;
  await page
    .locator(`a:has-text('${OdrTexts.landlordTenantDisputes}')`)
    .click();
  await navigationPromise;
  await page.locator(`a:has-text('${OdrTexts.ud}')`).click();
  await navigationPromise;
};

export const openCase = async (page: Page, openCaseData: OpenCaseDto) => {
  const navigationPromise = page.waitForNavigation();
  // Main page
  await login(page, openCaseData.email, openCaseData.password);
  await navigateToLaUd(page);

  // Location
  await page.waitForSelector('#fldAppInfoCourtList_0');
  await page.locator('#fldAppInfoCourtList_0').type('L');
  await page.waitForSelector('#fldAppInfoLocList_0');
  await page.locator('#fldAppInfoLocList_0').type(`${openCaseData.location}`);
  await page.click('a.paperwork-start.sign-up-but-next-logged');
  await navigationPromise;

  // Case number
  await page.waitForSelector('#fldPEVCaseNSInput_0');
  await page.locator('#fldPEVCaseNSInput_0').fill(openCaseData.disputeNumber);
  page.on('dialog', (dialog) => dialog.accept());
  await page.click('img[name="fldPEVCaseNSNextBtn"]');
  await navigationPromise;

  // ODR Test Endpoint
  await page.locator('#casenumber').fill(openCaseData.disputeNumber);
  await page.click('input[type=submit]');
  await navigationPromise;

  // ODR Test Redirection
  await page.waitForSelector(`a:has-text("[${openCaseData.id}]")`);
};
