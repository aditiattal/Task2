import {test, expect} from '@playwright/test';
import {booksResponse} from '../test-data/books';
import {emptyBooksResponse} from '../test-data/emptyBooks';
test('TC_005 - Mock Books API with custom books and verify UI' , async({page}) => {
    await page.route('**/BookStore/v1/Books', async route =>{
        await route.fulfill({ status : 200, contentType:'application/json',body:JSON.stringify(booksResponse)});
    });
await page.goto('https://demoqa.com/books');
await expect(page.getByText('Playwright Automation')).toBeVisible();
});
test('TC_006 - Mock empty response' , async({page}) => {
    await page.route('**/BookStore/v1/Books', async route =>{
        await route.fulfill({ status : 200, contentType:'application/json',body:JSON.stringify(emptyBooksResponse)});
    });
await page.goto('https://demoqa.com/books');
});
test('TC_007 - Delay Books API response and verify application handles slow network' , async({page}) => {
    await page.route('**/BookStore/v1/Books', async route =>{
        await route.continue();
    });
await page.goto('https://demoqa.com/books');     
await expect(page.getByText('Git Pocket Guide')).toBeVisible();

});