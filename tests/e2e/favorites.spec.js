const { test, expect } = require('@playwright/test');

test('can add and remove favorite launches', async ({ page }) => {
  await page.goto('/launches');
  await favoriteFirstItem(page, 'launch');
  await removeFavorite(page);
});

test('can add and remove favorite launch pads', async ({ page }) => {
  await page.goto('/launch-pads');
  await favoriteFirstItem(page, 'launch-pad');
  await removeFavorite(page);
});

async function favoriteFirstItem(page, type) {
  await page.locator('[data-testid="favorite-button"]').first().click();
  await page.locator('[data-testid="user-drawer"]').click();
  if (type === 'launch-pad') {
    // Chakra UI removes testids on tabs, so we have to rely on text contents
    await page.locator('[data-testid="user-drawer-body"] button', { hasText: 'Favorite Launch Pads' }).click();
  }
  await expect(page.locator(`[data-testid="user-drawer-body"] [data-testid="${type}-item"]`)).toHaveCount(1);
}

async function removeFavorite(page) {
  await page.locator('[data-testid="user-drawer-body"] [data-testid="favorite-button"]').click();
  await expect(page.locator('[data-testid="user-drawer-body"] [data-testid="launch-pad-item"]')).toHaveCount(0);
  await expect(page.locator('[data-testid="no-favorites"]')).toBeVisible();
}
