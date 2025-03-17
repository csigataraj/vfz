import { test, expect } from '@playwright/test';

test('Test using the search bar, checking the details of an item and favorite the item', async ({
  page,
}) => {
  await page.goto('http://localhost:5173/');
  await expect(page).toHaveURL('http://localhost:5173/');
  await expect(page.locator('h1')).toHaveText('Media list');

  const searchBox = page.getByRole('textbox', { name: 'Search media' });
  await page.getByRole('textbox', { name: 'Search media' }).click();
  await expect(searchBox).toBeFocused();

  await page.getByRole('textbox', { name: 'Search media' }).fill('Action');
  await expect(searchBox).toHaveValue('Action');
  await page.getByRole('textbox', { name: 'Search media' }).press('Enter');

  await page.getByRole('link', { name: 'Action movie 5' }).click();
  await expect(page).toHaveURL('/5');
  await expect(page.locator('h2')).toHaveText('Action movie 5');

  await page.goto('http://localhost:5173/');
  await expect(page).toHaveURL('http://localhost:5173/');
  await expect(page.locator('h1')).toHaveText('Media list');

  await page
    .getByRole('region')
    .filter({ hasText: 'Action movie 5' })
    .getByRole('img')
    .click();

  const filledStar = page
    .getByRole('region')
    .filter({ hasText: 'Action movie 5' })
    .getByRole('img', { name: 'star-filled' });
  await expect(filledStar).toBeVisible();
});
