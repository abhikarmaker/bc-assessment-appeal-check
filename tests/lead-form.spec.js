const { test, expect } = require('@playwright/test');

test('consent checkbox is unticked by default', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#consent')).not.toBeChecked();
});

test('submitting without consent is blocked with a clear message', async ({ page }) => {
  await page.goto('/');
  await page.fill('#name', 'Test User');
  await page.fill('#email', 'test@example.com');
  await page.fill('#address', '123 Test St');
  await page.click('#lead-submit');
  await expect(page.locator('#lead-form-status')).toContainText('consent');
  await expect(page.locator('#consent')).not.toBeChecked();
});

test('missing required fields is blocked even with consent checked', async ({ page }) => {
  await page.goto('/');
  await page.check('#consent');
  await page.click('#lead-submit');
  await expect(page.locator('#lead-form-status')).toContainText('name, email');
});

test('honeypot field is present but positioned off-screen for real users', async ({ page }) => {
  await page.goto('/');
  const honeypot = page.locator('input[name="company_website"]');
  await expect(honeypot).toBeAttached();
  const box = await honeypot.boundingBox();
  // Off-screen (negative x), not merely visually hidden — bots that ignore
  // CSS still see and fill a type="text" input, which is the whole point.
  expect(box.x).toBeLessThan(0);
});
