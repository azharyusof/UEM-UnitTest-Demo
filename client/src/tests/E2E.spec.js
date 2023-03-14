//import test & expect features from Playwright 
const { test, expect } = require('@playwright/test');



test('Verify the website link loads smoothly and displays the home page title', async ({ page }) => {
    await page.goto('http://localhost:3001/');
  //*[@id="root"]/div/nav/section/div/strong
    const locator = page.locator('//*[@id="root"]/div/nav/section/div/strong')
    await expect(locator).toHaveText("Movie Voting App 2022");
});



test('Verify the interface link between the votes number component and vote button. i.e. clicking the  movie 3 vote button should increase the votes numbers on the UI', async ({ page }) => {
    await page.goto('http://localhost:3001/');

    // locate the movie 3 vote button with xPath
    //*[@id="root"]/div/section/div/div/div[3]/div/div[3]/div/button
    const voteButton = page.locator('//*[@id="root"]/div/section/div/div/div[3]/div/div[3]/div/button')
    // then click the button with left click and click it twice
    await voteButton.click({button: "left", clickCount: 1});

    // locate the movie 3 vote numbers element with xPath
    const voteNumDisplay = page.locator('//*[@id="root"]/div/section/div/div/div[3]/div/div[2]/div')
    // then check is the value of the element same after we click
    await expect(voteNumDisplay).toHaveText("Votes: 1")
});



