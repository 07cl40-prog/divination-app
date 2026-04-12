const https = require('https');

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function checkUrl(url) {
  return new Promise((resolve) => {
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 15000 }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        const titleMatch = data.match(/<title[^>]*>([^<]+)<\/title>/i);
        const title = titleMatch ? titleMatch[1] : 'NO TITLE';
        const isCaiShen = title.includes('CaiShen');
        const status = res.statusCode;
        const redirect = res.headers.location || '';
        console.log(`${url} => ${status}${redirect ? ' (→ ' + redirect + ')' : ''} | "${title}" | CaiShen: ${isCaiShen}`);
        resolve({ status, title, isCaiShen, redirect });
      });
    });
    req.on('error', e => { console.log(url + ' => ERROR: ' + e.message); resolve({ error: e.message }); });
    req.on('timeout', () => { req.destroy(); console.log(url + ' => TIMEOUT'); resolve({ error: 'TIMEOUT' }); });
  });
}

async function main() {
  console.log('Waiting 90 seconds for Vercel deployment...\n');
  await wait(90000);
  
  const results = await Promise.all([
    checkUrl('https://blingjew.com'),
    checkUrl('https://www.blingjew.com'),
    checkUrl('https://divination-9kohrpg9p-07cl40-progs-projects.vercel.app')
  ]);
  
  console.log('\n=== Summary ===');
  const allOk = results.every(r => !r.error && (r.status === 200 || r.status === 301) && r.isCaiShen);
  console.log(allOk ? '✅ All sites working correctly!' : '⚠️ Some issues detected');
}
main();
