require('dotenv').config();

const puppeteer = require('puppeteer');

const selectors = {
  main: 'a[href*="forum.ge"]',
  login: 'a[href*="Login"]',
  user: 'input[name="UserName"]',
  pass: 'input[name="PassWord"]',
  hide: 'input[name="Privacy"]',
  submit: 'input[name="submit"]'
};

const { listenpost } = require('./listen');
const { nighttopic } = require('./night');
const { othertopics } = require('./other');

const RELOAD_INTERVAL = 300000;
const BASE_URL = 'https://forum.ge/';
const LAST_PAGE_STA = 3000;

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 300,
    });
    const page = await browser.newPage();
    //deprecated
    // await page.goto('http://forum.ge');
    // await page.click(selectors.main);
    // await page.click(selectors.login);

    //go directly to login
    await page.goto(`${BASE_URL}?act=Login&CODE=00`, { waitUntil: 'domcontentloaded' });;

    await page.waitFor(1000);

    await page.waitFor(selectors.user);
    await page.focus(selectors.user);
    await page.type(selectors.user, process.env.FORUM_USER);

    await page.waitFor(selectors.pass);
    await page.focus(selectors.pass);
    await page.type(selectors.pass, process.env.FORUM_PASS);

    await page.waitFor(selectors.hide);
    await page.click(selectors.hide);

    // await page.screenshot({ path: 'login.png' });
    await page.waitFor(selectors.submit);
    await page.click(selectors.submit);
    // await page.screenshot({ path: 'login_success.png' });
    //after successful login
    //take me to the topic we want to spam
    //consider there are barely a topic with more than 100 pages
    //use 3000 for safety
    //use this hack to automatically load last page
    const spamurl = `${BASE_URL}?showtopic=${process.env.TOPIC_TO_SPAM}&st=${LAST_PAGE_STA}`;
    await page.goto(spamurl, { waitUntil: 'domcontentloaded' });

    await page.waitFor(1000);

    let firstload = false;

    setInterval(async () => {
      if (firstload) {
        firstload = false;
        return;
      }
      // await page.reload(); reloads the same page loaded, can't use if topic got bumped
      await page.goto(spamurl, { waitUntil: 'domcontentloaded' });
      //anyway go to last page
      //who posted last, me ?
      const nicknames = page.$$('span.normalname>a');
      if (nicknames[nicknames.length - 1] === process.env.FORUM_USER) {
        throw "last post is mine";
      }
      if (process.env.POST_MODE === 'listen') {
        listenpost(page);
        //console.log('dothen');
      } else if (process.env.POST_MODE === 'night') {
        nighttopic(page);
      } else {
        othertopics(page);
      }
    }, RELOAD_INTERVAL);

    // await browser.close();
  } catch (err) {
    console.log(`error happened:${err.message}`);
  }
})();