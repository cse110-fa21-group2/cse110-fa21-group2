/* eslint-disable no-promise-executor-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-undef */

/**
 * @jest-environment jsdom
 */

/**
 * File: e2e_timer_tests.js
 * Author: Manshi Yang
 * Description: Include some e2e tests for timer
 * Note: Please run with the command 'npm run test --detectOpenHandles'
 */
const puppeteer = require('puppeteer');

// TODO: replace with the correct web link
const URL = 'http://127.0.0.1:5500/source/index.html';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// Avoid timeout error due to default low timeout limit
jest.setTimeout(600000);
describe('Basic user flow for Website', () => {
  // Check timer initial value
  it('Test initial timer setting', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(URL);
    // console.log('Go to explore page');
    const button = await page.$('#explore-nav');
    await button.click();
    // console.log(button);
    await page.waitForTimeout(3000);
    const cardItem = await page.$('recipe-card');
    const shadow = await cardItem.getProperty('shadowRoot');
    const card = await shadow.$('div.custom-card');
    await card.click();
    // console.log('go to recipe page');
    await page.waitForTimeout(1000);
    const timer = await page.$('#timer');
    const initialText = await page.evaluate((el) => el.innerText, timer);
    // console.log(initialText);
    expect(initialText).toBe('Begin Timer');
    await browser.close();
  });

  // Test setTimer to 2 seconds and let the timer finishes
  it('Test set timer and count down', async () => {
    // Set up and navigate to recipe page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(URL);
    const button = await page.$('#explore-nav');
    await button.click();
    await page.waitForTimeout(3000);
    const cardItem = await page.$('recipe-card');
    const shadow = await cardItem.getProperty('shadowRoot');
    const card = await shadow.$('div.custom-card');
    await card.click();
    await page.waitForTimeout(1000);
    // Set the second value to 2
    await page.$eval('#seconds', (element) => element.value = '2');
    const startButton = await page.$('#setTime');
    await startButton.click();
    await delay(1000); // wait 1s for text to change
    const timer = await page.$('#timer');
    const initialText = await page.evaluate((el) => el.innerText, timer);
    expect(initialText).toBe('0h 0m 2s');
    await delay(3000); // wait 3s for timer to finish counting down
    const finalText = await page.evaluate((el) => el.innerText, timer);
    expect(finalText).toBe('Done!');
  });

  // Test pause & reset
  it('Test pause & reset timer', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(URL);
    const button = await page.$('#explore-nav');
    await button.click();
    await page.waitForTimeout(3000);
    const cardItem = await page.$('recipe-card');
    const shadow = await cardItem.getProperty('shadowRoot');
    const card = await shadow.$('div.custom-card');
    await card.click();
    await page.waitForTimeout(1000);
    await page.$eval('#seconds', (element) => element.value = '10');
    const startButton = await page.$('#setTime');
    const pauseButton = await page.$('#pause');
    const resetButton = await page.$('#reset');
    const timer = await page.$('#timer');
    // Start timer
    await startButton.click();
    await delay(1000); // wait 1s for text to change
    const initialText = await page.evaluate((el) => el.innerText, timer);
    // Check initial value
    expect(initialText).toBe('0h 0m 10s');
    // Wait 2s and pause the timer
    await delay(2000);
    await pauseButton.click();
    const pausedText = await page.evaluate((el) => el.innerText, timer);
    // Check timer after pause
    expect(pausedText).toBe('0h 0m 8s (Paused)');
    // Reset the timer
    await resetButton.click();
    await delay(1000); // wait 1s for text to change
    const resetText = await page.evaluate((el) => el.innerText, timer);
    // Check timer after reset
    expect(resetText).toBe('Begin Timer');
  });
});
