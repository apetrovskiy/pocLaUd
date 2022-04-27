import { Page } from '@playwright/test';
import { OpenCaseDto } from '../model/open-case-dto';
import { OdrTexts } from '../model/odr-text';
import { getOpeningOfferPage } from '../model/urls';

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
  await page.click(`a:has-text("[${openCaseData.id}]")`);
  await navigationPromise;

  // Welcome to ODR
  // Your Case Information
  // https://devtest.turbocourt.com/elf/dispatcher.jsp?gopage=p.intro
  await page.waitForSelector(
    "text='Welcome to the Los Angeles Superior Court Online Dispute Resolution (ODR) website'"
  );
  // await page.locator(`text='${openCaseData.disputeNumber}'`);
  // await page.click("text='Opening Offer")
  await page.goto(getOpeningOfferPage());

  /*
  await page.waitForTimeout(1000)
  await page.click("a:has-text('Next')");
  await navigationPromise;

  // Two or More Tenants
  // https://devtest.turbocourt.com/elf/dispatcher.jsp?gopage=p.mult.tenants
  await page.waitForSelector("text='Two or More Tenants'");
  await page.waitForTimeout(1000)
  await page.click("a:has-text('Next')");
  await navigationPromise;

  // Mediation
  await page.waitForSelector("text='Free Mediation is Available");
  await page.waitForTimeout(1000)
  await page.click("a:has-text('Next')");
  await navigationPromise;
  */

  // Opening Offer
  await page.waitForSelector("text='Opening Offer'");
  // await page.check('#q.ODR.po.option0');
  // await page.check('q.ODR.po.option0');
  await page.waitForTimeout(1000);
  await page.click("a:has-text('Next')");
  await navigationPromise;

  // Option A
  await page.waitForSelector(
    "text='Option A: Tenant will move out. Landlord will have '"
  );
  await page.waitForTimeout(1000);

  // // What's Next
  // await page.click("a:has-text('Next')");
  // await navigationPromise;

  // // Final Review
  // await page.waitForSelector('q.ODR.do.option0'); // Option A
  // // await page.click('q.ODR.do.option0'); // Option A
  // await page.check('q.ODR.do.option0'); // Option A
  // await page.click("a:has-text('Next')");
  // await navigationPromise;

  //
  await page.pause();
};
