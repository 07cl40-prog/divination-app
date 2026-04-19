const fs = require('fs');
let x = fs.readFileSync('C:/Users/Administrator/Desktop/divination-app/index.html', 'utf8');
x = x.replace(/content="#0a0a0a"/g, 'content="#F5F1ED"');
x = x.replace('background: #000', 'background: #F5F1ED');
fs.writeFileSync('C:/Users/Administrator/Desktop/divination-app/index.html', x, 'utf8');
console.log('done');
