import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  await page.getByRole('textbox', { name: 'email@example.com' }).fill('radhe11@hotmail.co.uk');
  await page.getByRole('textbox', { name: 'enter your passsword' }).fill('Krishna@135');
  await page.getByRole('button', { name: 'Login' }).click();
  
  // Wait for the dashboard to load completely
  await page.waitForLoadState('networkidle');

  // Use Regex for button names to ignore font-awesome icons and extra spaces.
  await page.getByRole('button', { name: /Add To Cart/i }).nth(1).click();
  await page.getByRole('button', { name: /Cart/i }).first().click();
  await page.getByRole('button', { name: /Checkout/i }).click();

  // Country Selection
  await page.getByPlaceholder('Select Country').pressSequentially('ind');
  await page.getByRole('button', { name: 'India' }).last().click();

  await page.getByText('Place Order').click();

  // Assertion: Verify success message
  await expect(page.locator(".hero-primary")).toContainText("Thankyou for the order.");
  
  await page.getByRole('button', { name: 'Sign Out' }).click();
});