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

//     await page.goto('https://github.com/');
//     await page.screenshot({ path: 'screenshot.png' });

//     await page.close();
//     await context.close();
// }
import { browser } from 'k6/browser';

export const options = {
  scenarios: {
    browser: {
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
  thresholds: {
    checks: ['rate==1.0'],
  },
};

export default async function () {
  const page = await browser.newPage();

  try {
    await page.goto('https://test.k6.io/');
  } finally {
    await page.close();
  }
}