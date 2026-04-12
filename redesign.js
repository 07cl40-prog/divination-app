
// CaiShen homepage redesign script
const fs = require('fs');
const lines = fs.readFileSync('./src/App.jsx', 'utf8').split('\n');

function findEnd(lines, start) {
  for (let i = start + 1; i < lines.length; i++) {
    if (lines[i].trim() === '}') return i;
  }
  return lines.length - 1;
}

const heroStart = lines.findIndex(l => l.includes('function Hero('));
const heroEnd = findEnd(lines, heroStart);
const heritageStart = lines.findIndex(l => l.includes('function HeritageSection'));
const heritageEnd = findEnd(lines, heritageStart);
const showcaseStart = lines.findIndex(l => l.includes('function ProductShowcase'));
const showcaseEnd = findEnd(lines, showcaseStart);
const featuresStart = lines.findIndex(l => l.includes('function Features()'));
const featuresEnd = findEnd(lines, featuresStart);
const reviewsStart = lines.findIndex(l => l.includes('function ReviewsSection()'));
const reviewsEnd = findEnd(lines, reviewsStart);

console.log('Found - Hero:', heroStart, 'Heritage:', heritageStart, 'Showcase:', showcaseStart, 'Features:', featuresStart, 'Reviews:', reviewsStart);

// === NEW COMPONENTS (written as plain strings, not template literals) ===

const newHero = [
  'function Hero({ setCurrentPage }) {',
  '  return (',
  '    <section className="relative min-h-screen flex items-center overflow-hidden">',
  '      <div className="absolute inset-0 bg-[#080808]"></div>',
  '      <div className="absolute inset-0" style={{background: \'radial-gradient(ellipse 70% 60% at 65% 50%, rgba(100,40,10,0.12) 0%, transparent 70%)\'}}></div>',
  '      <div className="relative max-w-7xl mx-auto px-8 lg:px-16 w-full">',
  '        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-24">',
  '          <div className="max-w-lg">',
  '            <div className="text-amber-500/60 text-[11px] tracking-[0.3em] uppercase font-medium mb-8">Eastern Fortune 路 AI Original</div>',
  '            <h1 className="font-display text-6xl lg:text-7xl font-black text-white leading-[0.95] mb-2 tracking-tight">',
  '              <span className="block text-amber-400">CaiShen</span>',
  '              <span className="block text-stone-400 font-light text-4xl lg:text-5xl mt-1">璐㈢～鏂囧壍</span>',
  '            </h1>',
  '            <p className="text-stone-500 text-base leading-8 mt-8 mb-10 font-light">',
  '              An AI-forged bridge between 1,500 years of Eastern fortune culture<br className="hidden sm:block" />',
  '              and the homes of 36 nations.',
  '            </p>',
  '            <div className="flex gap-4">',
  '              <button onClick={() => setCurrentPage(\'shop\')} className="bg-amber-600 hover:bg-amber-500 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-sm flex items-center gap-2">',
  '                Explore Collection <ArrowRight size={14} />',
  '              </button>',
  '              <button onClick={() => setCurrentPage(\'story\')} className="border border-stone-700 text-stone-400 hover:text-amber-400 hover:border-amber-700 font-medium px-8 py-3.5 rounded-xl transition-all text-sm">',
  '                Our Story',
  '              </button>',
  '            </div>',
  '          </div>',
  '          <div className="relative hidden lg:flex justify-center items-center">',
  '            <div className="relative w-96 h-96">',
  '              <div className="absolute inset-0 rounded-full border border-amber-900/15 animate-pulse" style={{animationDuration: \'5s\'}}></div>',
  '              <div className="absolute inset-3 rounded-full border border-amber-800/10 animate-pulse" style={{animationDuration: \'8s\', animationDelay: \'2s\'}}></div>',
  '              <div className="absolute inset-6 rounded-full overflow-hidden border border-amber-800/20 shadow-[0_0_100px_rgba(100,30,5,0.15)]">',
  '                <video src="/videos/caishen-entering.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />',
  '              </div>',
  '            </div>',
  '          </div>',
  '        </div>',
  '      </div>',
  '    </section>',
  '  );',
  '}',
].join('\n');

const newHeritageSection = [
  'function HeritageSection({ setCurrentPage }) {',
  '  const stats = [',
  '    { num: \'36+\', label: \'Countries\', zh: \'鍏ㄧ悆甯冨疆\' },',
  '    { num: \'50K+\', label: \'Families\', zh: \'瀹跺涵淇濋獥\' },',
  '    { num: \'1,500\', label: \'Years\', zh: \'鏃跺皵濂借揣\' },',
  '  ];',
  '  return (',
  '    <section className="py-24 bg-[#080808] border-t border-stone-900">',
  '      <div className="max-w-7xl mx-auto px-8 lg:px-16">',
  '        <div className="grid grid-cols-3 gap-px bg-stone-800/30">',
  '          {stats.map(s => (',
  '            <div key={s.label} className="bg-[#080808] px-8 py-16 text-center">',
  '              <div className="text-5xl font-black text-amber-400 mb-2">{s.num}</div>',
  '              <div className="text-stone-600 text-[10px] tracking-widest uppercase mb-1">{s.label}</div>',
  '              <div className="text-stone-700 text-xs">{s.zh}</div>',
  '            </div>',
  '          ))}',
  '        </div>',
  '      </div>',
  '    </section>',
  '  );',
  '}',
].join('\n');

const newProductShowcase = [
  'function ProductShowcase({ setCurrentPage }) {',
  '  const featured = PRODUCTS.slice(0, 4);',
  '  return (',
  '    <section className="py-8 bg-[#080808]">',
  '      <div className="max-w-7xl mx-auto px-8 lg:px-16">',
  '        <div className="mb-14">',
  '          <div className="flex items-center gap-3 mb-4">',
  '            <div className="w-10 h-px bg-amber-700/60"></div>',
  '            <span className="text-amber-600/80 text-[11px] tracking-[0.3em] uppercase font-medium">Featured</span>',
  '          </div>',
  '          <div className="flex items-end justify-between">',
  '            <h2 className="font-display text-4xl lg:text-5xl font-black text-white">The Collection</h2>',
  '            <button onClick={() => setCurrentPage(\'shop\')} className="hidden sm:flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors group">',
  '              All {PRODUCTS.length} pieces <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />',
  '            </button>',
  '          </div>',
  '        </div>',
  '        <div className="space-y-28">',
  '          {featured.map((p, i) => {',
  '            const isEven = i % 2 === 0;',
  '            return (',
  '              <div key={p.id} className="grid lg:grid-cols-2 gap-16 items-center">',
  '                <div className={isEven ? \'\' : \'lg:order-2\'}>',
  '                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-stone-900">',
  '                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />',
  '                  </div>',
  '                </div>',
  '                <div className={isEven ? \'\' : \'lg:order-1\'}>',
  '                  <div className="text-amber-500/60 text-[10px] tracking-[0.25em] uppercase font-medium mb-3">AI Original 路 Limited</div>',
  '                  <h3 className="text-3xl font-black text-white mb-1">{p.name}</h3>',
  '                  <div className="text-stone-600 text-sm mb-4">{p.nameEn}</div>',
  '                  <p className="text-stone-400 text-sm leading-7 mb-6">{p.description}</p>',
  '                  <div className="flex flex-wrap gap-2 mb-8">',
  '                    {p.features.slice(0,3).map((f, fi) => (',
  '                      <span key={fi} className="text-xs text-stone-500 bg-stone-900 border border-stone-800 px-3 py-1 rounded-full">{f}</span>',
  '                    ))}',
  '                  </div>',
  '                  <div className="flex items-center gap-4">',
  '                    <span className="text-3xl font-black text-amber-400">{'${p.price}'}</span>',
  '                    <button onClick={() => setCurrentPage(\'shop\')} className="border border-amber-700/50 text-amber-400 hover:bg-amber-600 hover:text-white font-medium px-7 py-3 rounded-xl transition-all text-sm">',
  '                      View Details',
  '                    </button>',
  '                  </div>',
  '                </div>',
  '              </div>',
  '            );',
  '          })}',
  '        </div>',
  '      </div>',
  '    </section>',
  '  );',
  '}',
].join('\n');

const newFeatures = [
  'function Features() {',
  '  const features = [',
  '    { icon: <Truck size={18} />, label: \'Worldwide Shipping\', sub: \'Orders over $39\' },',
  '    { icon: <ShieldCheck size={18} />, label: \'Authenticity\', sub: \'Certificate included\' },',
  '    { icon: <RefreshCw size={18} />, label: \'30-Day Returns\', sub: \'No questions\' },',
  '    { icon: <Award size={18} />, label: \'Limited Edition\', sub: \'Every piece unique\' },',
  '  ];',
  '  return (',
  '    <section className="py-14 bg-[#080808] border-t border-stone-900">',
  '      <div className="max-w-7xl mx-auto px-8 lg:px-16">',
  '        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">',
  '          {features.map((f, i) => (',
  '            <div key={i} className="flex items-start gap-4">',
  '              <div className="text-amber-500/70 mt-0.5 shrink-0">{f.icon}</div>',
  '              <div>',
  '                <div className="text-stone-300 text-sm font-semibold">{f.label}</div>',
  '                <div className="text-stone-600 text-xs mt-0.5">{f.sub}</div>',
  '              </div>',
  '            </div>',
  '          ))}',
  '        </div>',
  '      </div>',
  '    </section>',
  '  );',
  '}',
].join('\n');

const starsStr = JSON.stringify(['★★★★★', '★★★★★', '★★★★', '★★★★★']);

const newReviewsSection = [
  'function ReviewsSection() {',
  '  const starsMap = ' + starsStr + ';',
  '  return (',
  '    <section className="py-20 bg-[#080808] border-t border-stone-900">',
  '      <div className="max-w-7xl mx-auto px-8 lg:px-16 mb-10">',
  '        <div className="flex items-center gap-3 mb-4">',
  '          <div className="w-10 h-px bg-amber-700/60"></div>',
  '          <span className="text-amber-600/80 text-[11px] tracking-[0.3em] uppercase font-medium">Voices</span>',
  '        </div>',
  '        <h2 className="font-display text-4xl font-black text-white">What They Say</h2>',
  '      </div>',
  '      <div className="flex gap-5 overflow-x-auto pb-4 px-8 lg:px-16" style={{scrollbarWidth: \'none\'}}>',
  '        {REVIEWS.map((r, i) => (',
  '          <div key={i} className="shrink-0 w-72 bg-stone-900/60 border border-stone-800/60 rounded-2xl p-6">',
  '            <div className="text-amber-400 text-sm mb-3">{starsMap[i]}</div>',
  '            <p className="text-stone-300 text-sm leading-6 mb-5">"{r.text}"</p>',
  '            <div className="border-t border-stone-800/60 pt-4">',
  '              <div className="text-white text-sm font-semibold">{r.name}</div>',
  '              <div className="text-stone-600 text-xs mt-0.5">{r.location}</div>',
  '            </div>',
  '          </div>',
  '        ))}',
  '      </div>',
  '    </section>',
  '  );',
  '}',
].join('\n');

// === ASSEMBLE ===
// Keep: everything before Hero (lines 0 to heroStart-1)
// Keep: newHero
// Keep: newHeritageSection
// Keep: newProductShowcase
// Keep: newFeatures
// Skip: old HeritageSection (heritageStart to heritageEnd)
// Skip: old ProductShowcase (showcaseStart to showcaseEnd)
// Skip: old Features (featuresStart to featuresEnd)
// Skip: old ReviewsSection (reviewsStart to reviewsEnd)
// Keep: everything after reviewsEnd

let result = [
  ...lines.slice(0, heroStart),
  newHero,
  newHeritageSection,
  newProductShowcase,
  newFeatures,
  ...lines.slice(reviewsEnd + 1)
];

fs.writeFileSync('./src/App.jsx', result.join('\n'), 'utf8');
console.log('Done! Total lines:', result.length);
