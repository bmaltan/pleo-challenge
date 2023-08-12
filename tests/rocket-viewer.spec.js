const { test, expect } = require('@playwright/test');

test('can open and close rocket viewer', async ({ page }) => {
  await page.goto('/launches');
  await page.locator('[data-testid="launch-item"]').first().click();
  await page.locator('[data-testid="view-in-3d"]').click();
  await expect(page.locator('#rocket-viewer')).toHaveCount(1);
  await page.keyboard.press('Escape');
  await expect(page.locator('#rocket-viewer')).toHaveCount(0);
});
