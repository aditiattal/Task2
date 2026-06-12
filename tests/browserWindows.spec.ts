import { test,expect } from '@playwright/test';
test.beforeEach(async({ page }) => {
    await page.goto('https://demoqa.com/browser-windows');
});
test('TC_001 Verify New Tab button opens a new tab ',async({page})=>{
    const [newTab] = await Promise.all([page.context().waitForEvent('page'),page.locator('#tabButton').click()]);
    await newTab.waitForLoadState();
    expect(newTab).toBeTruthy();
});
test('TC_002 Verify content of newly opened tab ',async({page})=>{
    const [newTab] = await Promise.all([page.context().waitForEvent('page'),page.locator('#tabButton').click()]);
    await newTab.waitForLoadState();
    await expect(newTab.locator('#sampleHeading')).toBeVisible();
    await expect(newTab.locator('#sampleHeading')).toHaveText(('This is a sample page'));

});
test('TC_003 Close child tab and switch back to parent. ',async({page})=>{
    const [childTab] = await Promise.all([page.context().waitForEvent('page'),page.locator('#tabButton').click()]);
    await childTab.waitForLoadState();
    await childTab.close();
    await expect (page).toHaveURL('https://demoqa.com/browser-windows');

});
test('TC_004 Verify New Window Message functionality. ',async({page})=>{
    const [messageWindow] = await Promise.all([page.context().waitForEvent('page'),page.locator('#messageWindowButton').click()]);
    await messageWindow.waitForLoadState();
    await messageWindow.waitForLoadState();
    const text = await messageWindow.locator('body').textContent();
    expect(text).toContain('Knowledge increases by sharing but not by saving. Please share this website with your friends and in your organization.');
});