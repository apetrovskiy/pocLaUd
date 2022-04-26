import { test, expect, Page } from '@playwright/test';
import { loadConfig } from './common/config-helper';
import { Locations } from './model/locations';
import { openCase } from './common/odr-helper';
import { OpenCaseDto } from './model/open-case-dto';
import { cleanUpDispute } from './common/edcs-helper';
import { DisputeConfig } from './model/dispute-config';
import { getEnvUrl } from './model/urls';
import { prepareOpenCaseData } from './common/test-data-helper';
import { PartyTypes } from './model/party-types';

let config: Partial<DisputeConfig> = {};

test.beforeEach(async ({ page }) => {
  config = loadConfig();
  await cleanUpDispute(page, config.disputeNumber!);
  await page.goto(getEnvUrl());
});

test.describe('LA UD start', () => {
  test('should login into ODR as a plaintiff SRL', async ({ page }) => {
    // const { chromium } = require('playwright');
    // const browser = await chromium.launch()
    // const page = await browser.newPage()
    // const navigationPromise = page.waitForNavigation();

    // TODO: to config
    await page.setViewportSize({ width: 2655, height: 1361 });

    const openCaseData: OpenCaseDto = prepareOpenCaseData(
      PartyTypes.plaintiffSrl
    );

    await openCase(page, openCaseData);

    // await page.pause();

    // await browser.close()
    await page.close();
  });

  test('should login into ODR as a defendant SRL', async ({ page }) => {
    // TODO: to config
    await page.setViewportSize({ width: 2655, height: 1361 });

    const openCaseData: OpenCaseDto = prepareOpenCaseData(
      PartyTypes.defendantSrl
    );

    await openCase(page, openCaseData);

    // await page.pause();

    // await browser.close()
    await page.close();
  });
});
