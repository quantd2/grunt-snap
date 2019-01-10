var url, output, timeout, selector, interval;

const fse = require('fs-extra');
const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({args: ['--no-sandbox']});
    const page = await browser.newPage();

    if (process.argv.length < 3) {
      await browser.close();
    } else {
      process.argv.forEach(function(arg, i) {
        console.log(i + ': ' + arg);
      });

      url = process.argv[2];
      output = process.argv[3];
      timeout = parseInt(process.argv[4]);
      selector = process.argv[5];
      interval = parseInt(process.argv[6]);

      await page.goto(url, {waitUntil: 'networkidle2'});

      try {
        await page.waitForSelector('.dialog-warning-age button', {timeout: 1000}); //this thing might be flaky. Not sure it is a good idea!!!
        await page.click('.dialog-warning-age button');
      } catch (e) {
        console.log('no age dialog');
      }

      const html = await page.content();
      await fse.outputFile(output, html);

      await browser.close();
    }
  } catch(e) {
    console.log(e)
  }
})();
