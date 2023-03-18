import { chromium } from 'k6/experimental/browser';
import { check } from 'k6'


export const options = {
  vus: 1, // 1 user looping 
  duration: '30s',
  iterations: 1,
   thresholds: {
      http_req_duration: ['p(95)<500'], // 95% of requests must complete below 500ms
      browser_loaded: ['avg<400']  
   },
};

export default async function () {
  const browser = chromium.launch({ headless: false });
  const page = browser.newPage();

  try {
    await page.goto('https://test.k6.io/my_messages.php', { waitUntil: 'networkidle' });

    page.locator('input[name="login"]').type('admin');
    page.locator('input[name="password"]').type('123');

    await Promise.all([
      page.waitForNavigation(),
      page.locator('input[type="submit"]').click(),
    ]);

    check(page, {
      'header': page.locator('h2').textContent() == 'Welcome, admin!',
    });

  } finally {
    page.close();
    browser.close();
  }
}
