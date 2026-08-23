const { test, expect } = require('@playwright/test');

async function check(page, { status, supportingChild = 'no', residency = 'yes', arrears = 'no', currentPaid = 'no', equity }) {
  await page.goto('/deferment/');
  if (status) await page.selectOption('#status', status);
  await page.check(`input[name=supportingChild][value=${supportingChild}]`);
  await page.check(`input[name=residency][value=${residency}]`);
  await page.check(`input[name=taxesArrears][value=${arrears}]`);
  await page.check(`input[name=currentPaid][value=${currentPaid}]`);
  if (equity) await page.selectOption('#equity', equity);
  await page.click('#deferment-form button[type=submit]');
  await page.waitForSelector('#deferment-result.is-visible');
  return page.locator('#deferment-result h3').innerText();
}

test('55+ with 30% equity qualifies for the Regular Program', async ({ page }) => {
  const title = await check(page, { status: '55plus', equity: '25' });
  expect(title).toContain('Regular Program');
});

test('supporting a child with 20% equity qualifies for Families with Children only', async ({ page }) => {
  const title = await check(page, { status: 'none', supportingChild: 'yes', equity: '15' });
  expect(title).toContain('Families with Children Program');
  expect(title).not.toContain('Regular Program');
});

test('55+ and supporting a child with 80% equity qualifies for both', async ({ page }) => {
  const title = await check(page, { status: '55plus', supportingChild: 'yes', equity: '75' });
  expect(title).toContain('both programs');
});

test('55+ with under-15% equity is ineligible on equity, not status', async ({ page }) => {
  const title = await check(page, { status: '55plus', equity: 'under15' });
  expect(title).toContain('too low');
});

test('less than a year of BC residency is ineligible regardless of status', async ({ page }) => {
  const title = await check(page, { status: '55plus', residency: 'no', equity: '75' });
  expect(title).toContain('Not eligible');
});

test('unpaid prior-year taxes blocks eligibility', async ({ page }) => {
  const title = await check(page, { status: '55plus', arrears: 'yes', equity: '75' });
  expect(title).toContain('arrears');
});

test('no qualifying status (not 55+, no child) is ineligible', async ({ page }) => {
  const title = await check(page, { status: 'none', equity: '75' });
  expect(title).toContain("Doesn't look like a fit");
});

test('result never recommends deferring either way', async ({ page }) => {
  await check(page, { status: '55plus', equity: '75' });
  const text = (await page.locator('#deferment-result').innerText()).toLowerCase();
  expect(text).not.toMatch(/you should defer/);
});

test('eligible result shows an illustrative cost-over-time chart, clearly labeled as an example', async ({ page }) => {
  await check(page, { status: '55plus', equity: '75' });
  const chart = page.locator('.cost-chart');
  await expect(chart).toBeVisible();
  const text = await chart.innerText();
  expect(text).toMatch(/example only/i);
  expect(text).toContain('Year 1');
  expect(text).toContain('Year 10');
  // Never implies it's the homeowner's real number — this tool collects no tax amount.
  expect(text.toLowerCase()).not.toContain('your taxes are');
});

test('cost chart bars grow monotonically with time (compound interest, not flat)', async ({ page }) => {
  await check(page, { status: '55plus', equity: '75' });
  const widths = await page.locator('.cost-chart-bar').evaluateAll((els) =>
    els.map((el) => parseFloat(el.style.width))
  );
  expect(widths.length).toBe(4);
  for (let i = 1; i < widths.length; i++) {
    expect(widths[i]).toBeGreaterThan(widths[i - 1]);
  }
});

test('ineligible result does not show the cost chart', async ({ page }) => {
  await check(page, { status: 'none', equity: '75' }); // no qualifying status at all
  await expect(page.locator('.cost-chart')).toHaveCount(0);
});
