import { test, expect, Page } from '@playwright/test';
import { Locations } from './common/locations';
import { openCase } from './common/odr-helper';
import { OpenCaseDto } from './model/open-case-dto';

test.beforeEach(async ({ page }) => {
  // TODO: use config
  await page.goto('https://devtest.turbocourt.com');
});

// TODO: to test data
const plaintiffName = 'pla001@rambler.ru';
const plaintiffPassword = 'Lock12Lock';
const plaintiffId = '17698209';
const disputeNumber = '29STUD45011';

test.describe('LA UD start', () => {
  test('should login into ODR', async ({ page }) => {
    // const { chromium } = require('playwright');
    // const browser = await chromium.launch()
    // const page = await browser.newPage()
    // const navigationPromise = page.waitForNavigation();

    // TODO: to config
    await page.setViewportSize({ width: 2655, height: 1361 });

    const openCaseData: OpenCaseDto = {
      email: plaintiffName,
      password: plaintiffPassword,
      id: plaintiffId,
      location: Locations.stanleyMosk,
      disputeNumber: disputeNumber,
    };

    await openCase(page, openCaseData);

    await page.pause();

    // await browser.close()
    await page.close();
  });
});
