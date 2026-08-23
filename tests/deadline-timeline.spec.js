const { test, expect } = require('@playwright/test');

// The horizontal visual timeline collided with itself at narrow widths during
// development (fixed-width labels overlapping once PARP/PAAB sit close
// together) — these tests exist specifically because that bug was real and
// silent (no page-level horizontal overflow, just garbled overlapping text).

test('desktop shows the horizontal timeline, not the stacked list', async ({ page }) => {
  await page.setViewportSize({ width: 1000, height: 700 });
  await page.goto('/deadlines/');
  await expect(page.locator('.dt-visual')).toBeVisible();
  await expect(page.locator('.dt-stacked')).toBeHidden();
});

test('mobile (<=640px) shows the stacked list, not the horizontal timeline', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 700 });
  await page.goto('/deadlines/');
  await expect(page.locator('.dt-stacked')).toBeVisible();
  await expect(page.locator('.dt-visual')).toBeHidden();
});

test('no two timeline node labels overlap on the horizontal version', async ({ page }) => {
  await page.setViewportSize({ width: 1000, height: 700 });
  await page.goto('/deadlines/');
  const boxes = await page.locator('.dt-node-label').evaluateAll((els) =>
    els.map((el) => el.getBoundingClientRect()).map((r) => ({ left: r.left, right: r.right, top: r.top, bottom: r.bottom }))
  );
  for (let i = 0; i < boxes.length; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
      const a = boxes[i], b = boxes[j];
      const horizontallyOverlaps = a.left < b.right && b.left < a.right;
      const verticallyOverlaps = a.top < b.bottom && b.top < a.bottom;
      expect(horizontallyOverlaps && verticallyOverlaps, `label ${i} and ${j} overlap`).toBe(false);
    }
  }
});

test('timeline shows both PARP and PAAB dates and fee/free framing', async ({ page }) => {
  await page.goto('/deadlines/');
  const text = await page.locator('.deadline-timeline').innerText();
  expect(text).toContain('PARP');
  expect(text).toContain('PAAB');
  expect(text).toContain('Free to file');
  expect(text).toMatch(/\$30 fee/);
});

test('has a screen-reader text alternative to the visual layout', async ({ page }) => {
  await page.goto('/deadlines/');
  const hiddenText = await page.locator('[data-deadline-timeline] .visually-hidden').innerText();
  expect(hiddenText).toMatch(/day/);
  expect(hiddenText).toContain('PAAB');
});
