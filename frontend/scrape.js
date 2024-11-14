import {firefox} from 'playwright';

async function scrapeYouTubeByCategory(category) {

  const browser = await firefox.launch({ headless: false });
  const page = await browser.newPage();

  const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(category)}`;
  await page.goto(searchUrl);
  await page.waitForTimeout(3000);

  for (let i = 0; i < 3; i++) {
    await page.evaluate(() => window.scrollBy(0, window.innerHeight));
    await page.waitForTimeout(2000);
  }

  const videoLocator = page.locator('ytd-video-renderer');
  const videoCount = await videoLocator.count();
  const videoData = [];

  for (let i = 0; i < videoCount; i++) {
    try {
      const video = videoLocator.nth(i);

      const title = await video.locator('#video-title').innerText();
      const url = await video.locator('#video-title').getAttribute('href');

      let views = 'N/A';
      let uploadTime = 'N/A';

      const viewsLocator = video.locator('#metadata-line');

      let inputString = await viewsLocator.innerText();

      // const inputString = '12 days ago' '2 years ago' '8 months ago' '2 weeks ago' '99K views\n2 months ago' '1.7M views\n13 days ago';

        // const regex = /(\d+K|\d+)(?:\s+views)?\s*(\d+\s\w+\s\w+|\d+\s\w+)/;

        const regex = /([\d.]+[KM])\s+views\s*([\d]+\s\w+\s\w+|\d+\s\w+)/;

        const match = inputString.match(regex);

        if (match) {
            views = match[1];  // the first capturing group (e.g., '99K')
            uploadTime = match[2];  // the second capturing group (e.g., '2 months ago')
        }

        if (views.endsWith('K')) {
            views = parseFloat(views.replace('K', '')) * 1000;
        } else if (views.endsWith('M')) {
            views = parseFloat(views.replace('M', '')) * 1000000;
        } else {
            views = parseFloat(views);
        }

        uploadTime = parseTimeAgo(uploadTime);

      videoData.push({title, url, views, uploadTime});
    } catch (error) {
      console.log('Error extracting video data:', error);
    }
  }

  await browser.close();

  console.log(videoData);
}

scrapeYouTubeByCategory('technology');


function parseTimeAgo(timeAgoString) {
    const now = new Date();
    const regex = /(\d+)\s*(day|month|year|week)s?\s*ago/;

    const match = timeAgoString.match(regex);
  
    if (!match) {
      return null;
    }

    const number = parseInt(match[1], 10);
    const unit = match[2];

    switch (unit) {
      case 'day':
        now.setDate(now.getDate() - number);
        break;
      case 'week':
        now.setDate(now.getDate() - number * 7);
        break;
      case 'month':
        now.setMonth(now.getMonth() - number);
        break;
      case 'year':
        now.setFullYear(now.getFullYear() - number);
        break;
    }
  
    return now;
}


      // const viewsLocator = video.locator('#metadata-line span:nth-child(1)');
      // const viewsLocator = video.locator('#metadata-line').locator('nth=0');
      // if (await viewsLocator.count() > 0) {
        // views = await viewsLocator.innerText();
      // }

      // const uploadTimeLocator = video.locator('#metadata-line span:nth-child(2)');
      // const uploadTimeLocator = video.locator('#metadata-line').locator('nth=1');
      // if (await uploadTimeLocator.count() > 0) {
        // uploadTime = await uploadTimeLocator.innerText();
      // }
