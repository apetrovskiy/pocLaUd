import { test, expect, Page } from '@playwright/test';
import { loadConfig } from './common/config-helper';
import { Locations } from './model/locations';
import { openCase } from './common/odr-helper';
import { OpenCaseDto } from './model/open-case-dto';
import { cleanUpDispute } from './common/edcs-helper';
import { Config } from './model/config';
import { getEnvUrl } from './model/urls';

let config: Partial<Config> = {};

test.beforeEach(async ({ page }) => {
  // TODO: use config
  // await page.goto('https://devtest.turbocourt.com');
  config = loadConfig();
  cleanUpDispute(page, config.disputeNumber!);
  await page.goto(getEnvUrl());
});

// TODO: to test data
// const disputeNumber = '29STUD45011';

const plaintiffName = 'pla001@rambler.ru';
const plaintiffPassword = 'Lock12Lock';
const plaintiffId = '17698209';

const defendantName = 'defe001@rambler.ru';
const defendantsPassword = 'Lock12Lock';
const defendantId = '17698208';

test.describe('LA UD start', () => {
  test('should login into ODR as a plaintiff SRL', async ({ page }) => {
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
      disputeNumber: config.disputeNumber!,
    };

    await openCase(page, openCaseData);

    // await page.pause();

    // await browser.close()
    await page.close();
  });

  test('should login into ODR as a defendant SRL', async ({ page }) => {
    // TODO: to config
    await page.setViewportSize({ width: 2655, height: 1361 });

    const openCaseData: OpenCaseDto = {
      email: defendantName,
      password: defendantsPassword,
      id: defendantId,
      location: Locations.stanleyMosk,
      disputeNumber: config.disputeNumber!,
    };

    await openCase(page, openCaseData);

    // await page.pause();

    // await browser.close()
    await page.close();
  });
});
