// import { browser } from 'k6/browser';

// export const options = {
//     scenarios: {
//         ui_test: {
//             executor: 'shared-iterations',
//             iterations: 1,
//         },
//     },
// };

// export default async function () {
//     const context = browser.newContext();
//     const page = context.newPage();

//     await page.goto('https://urbangents2.yeetonline.com/login');
//     await page.locator('#login_email"]').fill('johnally2gmail.com');
//     await page.locator('#login_password').fill('12345678');
//     await page.locator('button:has-text("Login")').click();
//     await page.close();
//     await context.close();
//     check(page, {
//         'text validation': (r) => r.body.includes(' The Best Suits in the World '),
//         });
// }
import { browser } from 'k6/browser';
import { check } from 'k6';

export const options = {
    vus: 1,
    duration: '5s',
};

export default async function () {
    // Step 1: Create a browser context
    const context = browser.newContext();

    // Step 2: Create a page from the context
    const page = context.newPage();

    // Step 3: Navigate to URL
    await page.goto('https://urbangents2.yeetonline.com/login');

    // Step 4: Fill login form
    await page.locator('#login_email').fill('johnally2gmail.com');
    await page.locator('#login_password').fill('12345678');
    await page.locator('button:has-text("Login")').click();

    // Step 5: Wait for page load
    await page.waitForLoadState('networkidle');

    // Step 6: Validate <h1> text
    const h1Text = await page.locator('h1').textContent();
    check(h1Text, {
        'h1 text validation': (t) => t === 'The Best Suits in the World',
    });

    // Step 7: Close page and context
    await page.close();
    await context.close();
}
