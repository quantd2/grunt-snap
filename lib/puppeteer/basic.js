var url, output, timeout, selector, interval;

const fse = require('fs-extra');
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
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

    const html = await page.content();
    await fse.outputFile(output, html);

    await browser.close();
  }
})();
