const https = require('https');
const http = require('http');

function testUrl(url) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http;
    const req = protocol.get(url, { timeout: 15000 }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          length: data.length,
          hasHtml: data.includes('<html') || data.includes('<!DOCTYPE'),
          hasRoot: data.includes('id="root"'),
          snippet: data.substring(0, 500)
        });
      });
    });
    req.on('error', e => resolve({ error: e.message }));
    req.on('timeout', () => { req.destroy(); resolve({ error: 'TIMEOUT' }); });
  });
}

async function main() {
  console.log('Testing CaiShen website...\n');
  
  const urls = [
    'https://divination-qnkw8p784-07cl40-progs-projects.vercel.app',
    'https://blingjew.com'
  ];
  
  for (const url of urls) {
    const result = await testUrl(url);
    console.log(`URL: ${url}`);
    console.log(JSON.stringify(result, null, 2));
    console.log('---');
  }
}

main();
