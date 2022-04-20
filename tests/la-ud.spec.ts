import { test, expect, Page } from '@playwright/test';
import { OdrTexts } from './common/odr-text';

test.beforeEach(async ({ page }) => {
  // TODO: use config
  await page.goto('https://devtest.turbocourt.com');
});

// TODO: to test data
const plaintiffName = 'pla001@rambler.ru';
const plaintiffPassword = 'Lock12Lock';

test.describe('LA UD start', () => {
  test('should login into ODR', async ({ page }) => {
    // const { chromium } = require('playwright');
    // const browser = await chromium.launch()
    // const page = await browser.newPage()
    const navigationPromise = page.waitForNavigation();

    // TODO: to config
    await page.setViewportSize({ width: 2655, height: 1361 });

    await page.locator('#loginHome').fill(plaintiffName);
    await page.locator('#passwdHome').fill(plaintiffPassword);
    await page.locator('#login-page').click();

    await navigationPromise;

    // TODO: to test data
    await page.locator(`a:has-text('${OdrTexts.california.toString()}')`).click();

    await navigationPromise;

    await page
      .locator(`a:has-text('${OdrTexts.landlordTenantDisputes}')`)
      .click();

    await navigationPromise;

    await page.locator(`a:has-text('${OdrTexts.ud}')`).click();

    await navigationPromise;

    await page.waitForSelector('#fldAppInfoCourtList_0');
    await page.locator('#fldAppInfoCourtList_0').type('L');
    // await page.click('#fldAppInfoCourtList_0');

    await page.waitForSelector('#fldAppInfoLocList_0');
    // TODO: from test data
    await page.locator('#fldAppInfoLocList_0').type('Stanley');
    // await page.click('#fldAppInfoLocList_0');

    // await page.selectOption('#fldAppInfoLocList_0', '22852661');

    // #wrapper > table > tbody > tr:nth-child(1) > td > div:nth-child(14) > table:nth-child(1) > tbody > tr:nth-child(2) > td.main-area > table:nth-child(4) > tbody > tr:nth-child(4) > td:nth-child(3) > a.paperwork-start.sign-in-but-next
    // await page.waitForSelector(
    //   '.main-area > table > tbody > tr:nth-child(4) > td:nth-child(3)'
    // );
    // await page.click(
    //   '.main-area > table > tbody > tr:nth-child(4) > td:nth-child(3)'
    // );
    await page.waitForSelector('a.paperwork-start');
    await page.click('a.paperwork-start');

    await page.waitForSelector('tbody > tr > td > .sign-in-but-next > img');
    await page.click('tbody > tr > td > .sign-in-but-next > img');

    // await browser.close()
    await page.close();
  });
});
