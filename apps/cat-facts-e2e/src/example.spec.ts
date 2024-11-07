import { schemas } from '@my-monorepo-demo/cat-facts-zodios';
import { test, expect } from '@playwright/test';

const testBreed: Zod.infer<typeof schemas.Breed> = {
  breed: 'Test 1',
  country: 'United States',
  origin: 'Natural',
  coat: 'Short',
  pattern: 'All',
};

test('has title', async ({ page }) => {
  await page.route('*/**/breeds*', async (route) => {
    const response = await route.fetch();
    const json = await response.json();

    // Remove the last breed from the response.
    (json.data as any[]).pop();
    // Add the test breed to the response.
    json.data.push(testBreed);
    // Fulfill using the original response, while patching the response body
    // with the given JSON object.
    await route.fulfill({ response, json });
  });

  await page.goto('/');

  // Expect h1 to contain a substring.
  expect(await page.locator('h1').innerText()).toContain('Cat Breeds');


  // expect the test breed to be visible
  await expect(page.getByText('Test 1')).toBeVisible();
});
