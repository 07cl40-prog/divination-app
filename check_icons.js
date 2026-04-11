const l = require('./node_modules/lucide-react');
const k = Object.keys(l);
const check = ['Sparkles', 'ShoppingBag', 'Menu', 'X', 'ChevronRight', 'Star', 'Heart', 'Truck', 'ShieldCheck', 'RefreshCw', 'Globe', 'ArrowRight', 'CheckCircle', 'Mail', 'MapPin', 'Clock'];
check.forEach(name => {
  console.log(name + ': ' + (k.includes(name) ? 'OK' : 'MISSING'));
});
