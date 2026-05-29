import { test, expect } from '@playwright/test';
//radhe@Mac Agents % pwd /Users/radhe/Projects/Agents
//radhe@Mac Agents % npx playwright test --reporter=line,allure-playwright 
//radhe@Mac Agents % allure generate ./allure-results --clean
//radhe@Mac Agents % allure open ./allure-report
//radhe@Mac Agents % npx playwright test --config=playwright.service.config.js --workers=5


test('test', async ({ page }) => {
  await page.goto('https://eventhub.rahulshettyacademy.com/login');
  await page.getByRole('textbox', { name: 'Email' }).fill('radhe11@hotmail.co.uk');
  await page.getByRole('textbox', { name: 'Password' }).fill('Krishna@135');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Browse Events →' }).click();
  await page.getByRole('article').filter({ hasText: 'ConcertFeaturedHollywood' }).getByTestId('book-now-btn').click();
  await page.getByRole('button', { name: '+' }).click();
  await page.getByRole('textbox', { name: 'Full Name*' }).fill('Radhe');
  await page.getByTestId('customer-email').click();
  await page.getByTestId('customer-email').fill('radhe11@hotmail.co.uk');
  await page.getByRole('textbox', { name: 'Phone Number*' }).fill('053463636363');
  await page.getByRole('button', { name: 'Confirm Booking' }).click();
  await page.getByRole('button', { name: 'View My Bookings' }).click();
  await page.getByTestId('nav-bookings').click();
  await page.getByTestId('logout-btn').click();
});