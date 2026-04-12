const https = require('https');

function check(url) {
  return new Promise((resolve) => {
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 15000 }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        const isVite = data.includes('assets/') && data.includes('.js"');
        const isNext = data.includes('_next/static') || data.includes('__NEXT_DATA__');
        const isCaiShen = data.includes('CaiShen') || data.includes('caishen') || data.includes('blingjew') || data.includes('财神');
        const titleMatch = data.match(/<title[^>]*>([^<]+)<\/title>/i);
        const title = titleMatch ? titleMatch[1] : 'NO TITLE';
        console.log('\n=== ' + url + ' ===');
        console.log('Status:', res.statusCode);
        console.log('Title:', title);
        console.log('Is Vite app:', isVite);
        console.log('Is Next.js:', isNext);
        console.log('Is CaiShen:', isCaiShen);
        if (!isCaiShen && !isVite) {
          console.log('CONTENT PREVIEW:', data.substring(0, 600));
        }
        resolve();
      });
    });
    req.on('error', e => { console.log('ERROR:', e.message); resolve(); });
    req.on('timeout', () => { req.destroy(); console.log('TIMEOUT'); resolve(); });
  });
}

async function main() {
  console.log('Checking CaiShen website on blingjew.com...');
  await check('https://blingjew.com');
  await check('https://www.blingjew.com');
  console.log('\nDone.');
}
main();
