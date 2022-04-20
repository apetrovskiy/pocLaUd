import { Page } from '@playwright/test';
import { OdrTexts } from './odr-text';
export const login = async (page: Page, username: string, password: string) => {
  await page.locator('#loginHome').fill(username);
  await page.locator('#passwdHome').fill(password);
  await page.locator('#login-page').click();
  page.waitForNavigation();
};

export const navigateLaUd = async (page: Page) => {
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
