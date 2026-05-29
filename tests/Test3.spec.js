import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  
  // Assert login page loaded correctly
  await expect(page).toHaveURL('https://rahulshettyacademy.com/client/#/auth/login');
  await expect(page).toHaveTitle(/Let's Shop/i); 
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  await expect(page.getByRole('link', { name: ' dummywebsite@' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Log in' })).toBeVisible();
  await expect(page.getByText('Don\'t have an account?')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Register' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Practice Website for Rahul' })).toBeVisible();
  await expect(page.getByText('Email')).toBeVisible();
  //await expect(page.getByText('Password')).toBeVisible(); 
  await expect(page.getByRole('link', { name: 'Forgot password?' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  //await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();

  await page.getByRole('textbox', { name: 'email@example.com' }).fill('radhe11@hotmail.co.uk');
  await page.getByRole('textbox', { name: 'enter your passsword' }).fill('Krishna@135');
  await page.getByRole('button', { name: 'Login' }).click();
  
  // Wait for the dashboard to load completely
  await page.locator(".card-body").first().waitFor();
  await expect(page).toHaveURL(/.*dashboard/);
  await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();
  
  // Verify product list is visible
  await expect(page.locator(".card-body")).not.toHaveCount(0);

  // Use Regex for button names to ignore font-awesome icons and extra spaces.
  await page.getByRole('button', { name: /Add To Cart/i }).nth(1).click();

  // Assertion: Product addition confirmation (Toastr message)
  await expect(page.locator("#toast-container")).toBeVisible();
  await expect(page.locator("#toast-container")).toContainText("Product Added To Cart");

  await page.getByRole('button', { name: /Cart/i }).first().click();
  
  // Assertion: Verify Cart page header and Checkout button
  await expect(page.getByText('My Cart')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Checkout' })).toBeVisible();

  await page.getByRole('button', { name: /Checkout/i }).click();

  // Assertion: Verify navigation to checkout summary
  await expect(page.getByText('Shipping Information')).toBeVisible();

  // Country Selection
  await page.getByPlaceholder('Select Country').pressSequentially('ind');
  await page.locator(".ta-results").waitFor();
  //await expect(page.getByRole('button', { name: 'India' })).toBeVisible();
  await page.getByRole('button', { name: 'India' }).last().click();

  await page.getByText('Place Order').click();

  // Assertion: Verify success message
  await expect(page.locator(".hero-primary")).toBeVisible();
  await expect(page.locator(".hero-primary")).toContainText("Thankyou for the order.");
  
  await page.getByRole('button', { name: 'Sign Out' }).click();

  // Final Assertion: Verify redirection to login page after sign out
  await expect(page).toHaveURL(/.*login/);
});