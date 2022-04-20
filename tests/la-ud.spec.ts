import { test, expect, Page } from '@playwright/test';
import { Locations } from './common/locations';
import { login, navigateLaUd as navigateToLaUd } from './common/odr-helper';
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

    await login(page, plaintiffName, plaintiffPassword);
    await navigateToLaUd(page);

    await page.waitForSelector('#fldAppInfoCourtList_0');
    await page.locator('#fldAppInfoCourtList_0').type('L');
    // await page.click('#fldAppInfoCourtList_0');

    await page.waitForSelector('#fldAppInfoLocList_0');
    // TODO: from test data
    await page.locator('#fldAppInfoLocList_0').type(`${Locations.stanleyMosk}`);

    await page.waitForSelector('a.paperwork-start');
    await page.click('a.paperwork-start');

    await page.waitForSelector('tbody > tr > td > .sign-in-but-next > img');
    await page.click('tbody > tr > td > .sign-in-but-next > img');

    // await browser.close()
    await page.close();
  });
});
