import React, { useState, useEffect, useCallback } from 'react';
import { ShoppingBag, Menu, X, ChevronRight, Star, Heart, Truck, ShieldCheck, RefreshCw, Globe, ArrowRight, CheckCircle, Mail, MapPin, Clock, Sparkles, Send, Minus, Plus, CreditCard, Loader, Award, Users, Globe2, BookOpen } from 'lucide-react';
import AdminPanel from './admin/AdminPanel';

const InstagramIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

// ============================================================
//  CaiShen — AI财神文创 | blingjew.com
//  东方奢雅 × AI未来感
// ============================================================

import productsData from './data/products.json';
const PRODUCTS = productsData;

const REVIEWS = [
  { name: 'Linda W.', location: 'Los Angeles, USA', text: 'Absolutely stunning! The AI-generated patterns are unlike anything I\'ve seen. My office colleagues all asked where I got it.', rating: 5, product: '毛絨掛件款' },
  { name: 'Michael C.', location: 'London, UK', text: 'Fast shipping to UK and the packaging was luxurious. The resin ornament sits proudly on my desk. Highly recommend!', rating: 5, product: '樹膠擺件款' },
  { name: 'Sophie L.', location: 'Toronto, Canada', text: 'Bought as a Chinese New Year gift for my parents. They absolutely loved it. The quality exceeded expectations.', rating: 5, product: '文曲星禮盒' },
  { name: 'James K.', location: 'Sydney, Australia', text: 'The AI aesthetic is fascinating — traditional Chinese culture meets futuristic design. Will buy more!', rating: 5, product: '毛絨掛件款' },
];

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={14} className={i <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-700'} />
      ))}
    </div>
  );
}

function ProductCard({ product, onView, onQuickAdd }) {
  const [liked, setLiked] = useState(false);
  return (
    <div className="group bg-gradient-to-b from-stone-900 to-stone-950 border border-stone-800 rounded-2xl overflow-hidden hover:border-amber-700/50 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-900/10 hover:-translate-y-0.5">
      <div className="relative overflow-hidden bg-stone-950 aspect-square">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }} />
        <div className="hidden w-full h-full items-center justify-center bg-gradient-to-br from-amber-950 to-stone-950">
          <div className="text-center">
            <div className="text-5xl mb-2">🧧</div>
            <div className="text-amber-400 font-bold">{product.name}</div>
          </div>
        </div>
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.tag && <span className={`${product.tagColor} text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide`}>{product.tag}</span>}
          {product.badge && <span className="bg-gradient-to-r from-amber-500 to-orange-600 text-white text-[10px] font-black px-2 py-1 rounded-full">{product.badge}</span>}
        </div>
        <button onClick={() => setLiked(!liked)} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 backdrop-blur flex items-center justify-center hover:bg-black/80 transition-colors">
          <Heart size={16} className={liked ? 'fill-red-500 text-red-500' : 'text-white/60'} />
        </button>
      </div>
      <div className="p-5">
        <div className="text-[11px] text-amber-600/80 font-medium tracking-[0.15em] uppercase mb-1">{product.nameEn}</div>
        <h3 className="text-white font-bold text-sm mb-2 leading-snug">{product.name}</h3>
        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={product.rating} />
          <span className="text-[11px] text-stone-500">({product.reviews})</span>
        </div>
        <div className="flex items-end gap-3 mb-4">
          <span className="text-xl font-black text-amber-400">${product.price}</span>
          <span className="text-sm text-stone-600 line-through">${product.originalPrice}</span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onView(product)} className="flex-1 py-2.5 bg-stone-800 hover:bg-stone-700 text-white text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2">
            <ShoppingBag size={13} /> View Details
          </button>
          {onQuickAdd && (
            <button onClick={() => onQuickAdd(product)} className="w-10 h-10 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white rounded-xl transition-all flex items-center justify-center">
              <Plus size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Navbar({ currentPage, setCurrentPage, cartCount, setShowCart }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navItems = [
    { key: 'home', label: '首頁', labelEn: 'Home' },
    { key: 'shop', label: '全部商品', labelEn: 'Shop' },
    { key: 'story', label: '品牌故事', labelEn: 'Story' },
    { key: 'contact', label: '聯絡我們', labelEn: 'Contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-stone-950/95 backdrop-blur-xl border-b border-stone-800/60' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-[70px]">
          <button onClick={() => setCurrentPage('home')} className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-gradient-to-br from-red-800 to-amber-700 rounded-xl flex items-center justify-center text-lg group-hover:scale-105 transition-transform shadow-lg shadow-amber-900/30">🧧</div>
            <div>
              <div className="font-display text-white font-black text-lg tracking-tight leading-none">CaiShen</div>
              <div className="text-amber-600/70 text-[9px] tracking-[0.25em] uppercase">AI Fortune Art</div>
            </div>
          </button>
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <button key={item.key} onClick={() => setCurrentPage(item.key)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${currentPage === item.key ? 'text-amber-400 bg-amber-950/40' : 'text-stone-400 hover:text-white hover:bg-white/5'}`}>
                <span className="block text-[10px] opacity-50 tracking-wider uppercase">{item.labelEn}</span>
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowCart(true)} className="relative w-10 h-10 rounded-xl bg-stone-900/80 hover:bg-stone-800 border border-stone-700/50 flex items-center justify-center text-stone-300 hover:text-white transition-all">
              <ShoppingBag size={17} />
              {cartCount > 0 && <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-700 text-white text-[10px] font-black rounded-full flex items-center justify-center">{cartCount}</span>}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden w-10 h-10 rounded-xl bg-stone-900/80 border border-stone-700/50 flex items-center justify-center text-stone-300">
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>
      {mobileOpen && (
        <div className="lg:hidden bg-stone-950/98 border-t border-stone-800/60 px-6 py-4 space-y-1">
          {navItems.map(item => (
            <button key={item.key} onClick={() => { setCurrentPage(item.key); setMobileOpen(false); }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${currentPage === item.key ? 'text-amber-400 bg-amber-950/30' : 'text-stone-400'}`}>
              <span className="block text-[10px] opacity-50 uppercase tracking-wider">{item.labelEn}</span>{item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero({ setCurrentPage }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-stone-950">
      {/* Atmospheric background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-950 via-red-950/20 to-stone-950"></div>
      <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(120,53,15,0.15) 0%, transparent 70%)'}}></div>
      <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(217,119,6,0.4) 60px, rgba(217,119,6,0.4) 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(217,119,6,0.4) 60px, rgba(217,119,6,0.4) 61px)'}}></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-32 lg:py-0 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl">
          {/* Left: Brand narrative */}
          <div>
            {/* Heritage badge */}
            <div className="inline-flex items-center gap-2 border border-amber-800/50 bg-amber-950/30 text-amber-400 text-[11px] font-medium tracking-[0.2em] uppercase px-4 py-2 rounded-full mb-8">
              <Award size={11} />
              AI Fusion · Eastern Heritage · Since 2024
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-[72px] font-black text-white leading-[1.02] mb-6 tracking-tight">
              <span className="block text-amber-400 text-4xl sm:text-5xl lg:text-[56px] mb-2 font-black">CaiShen</span>
              <span className="block text-stone-300 font-light tracking-wide">财神文創</span>
            </h1>

            {/* Brand statement — ichtea style heritage copy */}
            <p className="text-stone-400 text-base leading-7 mb-3 max-w-md font-light">
              Every piece we craft: an unrepeatable moment.<br />
              A testament to millennia of Eastern fortune culture — reborn through AI.
            </p>
            <p className="text-amber-600/70 text-sm leading-relaxed mb-10 max-w-md">
              全球首創 AI 融合傳統美學的文創品牌。以千年財神文化為基底，AI 為橋樑，創造專屬當代的 Fortune Art。
            </p>

            {/* Heritage credentials */}
            <div className="space-y-3 mb-10 pl-4 border-l-2 border-amber-800/40">
              <div className="flex items-start gap-3">
                <Sparkles size={14} className="text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <div className="text-white text-sm font-semibold">AI-Trained on Ancient Artifacts</div>
                  <div className="text-stone-500 text-xs">敦煌壁畫 · 宋瓷 · 明清漆器 · 歷代財神畫像</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award size={14} className="text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <div className="text-white text-sm font-semibold">Unique Generation, Every Time</div>
                  <div className="text-stone-500 text-xs">每一次生成皆為原創 AI 紋樣，無法複製，永不重複</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe2 size={14} className="text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <div className="text-white text-sm font-semibold">36 Countries · 50,000+ Families</div>
                  <div className="text-stone-500 text-xs">世界各地華人與文化愛好者的選擇</div>
                </div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4">
              <button onClick={() => setCurrentPage('shop')} className="group bg-gradient-to-r from-red-800 via-red-700 to-amber-700 hover:from-red-700 hover:to-amber-600 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 flex items-center gap-3 shadow-xl shadow-red-950/60 text-sm">
                <ShoppingBag size={16} />
                探索全部商品
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => setCurrentPage('story')} className="border border-stone-700 text-stone-300 hover:text-amber-400 hover:border-amber-800 font-semibold px-8 py-4 rounded-2xl transition-all duration-300 text-sm">
                品牌故事
              </button>
            </div>
          </div>

          {/* Right: 360° Rotating CaiShen */}
          <div className="relative hidden lg:flex justify-center items-center">
            {/* Outer glow rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[500px] h-[500px] rounded-full border border-amber-900/10"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[420px] h-[420px] rounded-full border border-amber-800/20"></div>
            </div>

            {/* Main rotating sphere */}
            <div className="relative" style={{perspective: '1000px'}}>
              {/* Floating shadow */}
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-64 h-6 rounded-full bg-black/30 blur-xl"></div>

              {/* Rotating image container */}
              <div className="relative w-80 h-80" style={{transformStyle: 'preserve-3d'}}>
                {/* Spinning inner */}
                <div className="w-full h-full rounded-full animate-[spin_18s_linear_infinite]"
                  style={{
                    background: 'radial-gradient(ellipse at 30% 30%, rgba(120,53,15,0.4) 0%, transparent 60%), radial-gradient(ellipse at 70% 70%, rgba(180,50,50,0.2) 0%, transparent 60%), linear-gradient(135deg, #0a0a0a, #1a1a1a)',
                    boxShadow: '0 0 60px rgba(180,80,20,0.15), 0 0 120px rgba(180,80,20,0.08), inset 0 0 40px rgba(0,0,0,0.8)',
                    border: '1px solid rgba(180,120,20,0.3)',
                  }}
                >
                  {/* 3D CaiShen image centered and scaled */}
                  <img
                    src="/images/caishen-3d.png"
                    alt="CaiShen"
                    className="w-full h-full object-contain"
                    style={{filter: 'drop-shadow(0 0 20px rgba(200,150,30,0.3))'}}
                    onError={e => {
                      e.target.style.opacity = '0';
                    }}
                  />
                  {/* Fallback emoji */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none" id="caishen-fallback">
                    <div className="text-center">
                      <div className="text-8xl animate-pulse">🧧</div>
                      <div className="text-amber-400 font-black text-sm mt-3">CaiShen</div>
                      <div className="text-amber-600/50 text-xs mt-1">AI Fortune Art</div>
                    </div>
                  </div>
                </div>

                {/* Slow wobble overlay */}
                <div className="absolute inset-0 rounded-full animate-[spin_25s_linear_infinite_reverse]"
                  style={{background: 'conic-gradient(from 0deg, transparent 0deg, rgba(200,160,30,0.06) 60deg, transparent 120deg, rgba(200,160,30,0.04) 180deg, transparent 240deg, rgba(200,160,30,0.06) 300deg, transparent 360deg)', borderRadius: '50%'}}
                ></div>
              </div>

              {/* Particle dots orbiting */}
              <div className="absolute inset-0 animate-[spin_12s_linear_infinite]" style={{borderRadius: '50%'}}>
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-amber-400 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.8)]"></div>
              </div>
              <div className="absolute inset-0 animate-[spin_20s_linear_infinite_reverse]" style={{borderRadius: '50%'}}>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-400 rounded-full shadow-[0_0_6px_rgba(248,113,113,0.8)]"></div>
              </div>
              <div className="absolute inset-0 animate-[spin_15s_linear_infinite]" style={{borderRadius: '50%'}}>
                <div className="absolute top-1/2 right-1 -translate-y-1/2 w-1.5 h-1.5 bg-amber-300 rounded-full shadow-[0_0_6px_rgba(252,211,77,0.8)]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="flex items-center gap-12 mt-20 pt-10 border-t border-stone-800/60">
          {[['50,000+', '全球用戶'], ['36', '國家地區'], ['4.9★', '平均評分'], ['7-14', '全球到貨日']].map(([num, label]) => (
            <div key={label}>
              <div className="text-2xl font-black text-white">{num}</div>
              <div className="text-stone-600 text-[11px] tracking-wider uppercase">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeritageSection({ setCurrentPage }) {
  return (
    <section className="py-28 bg-gradient-to-b from-stone-950 to-stone-950 border-y border-stone-800/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-px bg-amber-700/60"></div>
          <span className="text-amber-600/80 text-[11px] tracking-[0.25em] uppercase font-medium">Heritage & Craftsmanship</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text content */}
          <div>
            <h2 className="font-display text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
              The Origin Story<br />
              <span className="text-amber-400">of CaiShen</span>
            </h2>
            <div className="space-y-5 text-stone-400 text-sm leading-7">
              <p>
                The CaiShen faith spans over 1,500 years — one of the most revered cultural symbols for Chinese communities worldwide. From Tang dynasty palace halls to overseas living rooms, the desire for fortune transcends borders.
              </p>
              <p>
                We asked ourselves: <em className="text-stone-300">what if ancient wisdom could meet modern technology?</em> So we trained a proprietary AI on thousands of cultural artifacts — Dunhuang murals, Song dynasty porcelain, Ming-Qing lacquerware, generations of CaiShen depictions — to create something never seen before.
              </p>
              <p>
                Each piece generated by CaiShen AI is a <span className="text-amber-400 font-medium">unique, irreplaceable work of art</span>. No two patterns are the same. Every product carries the imprint of an ancient culture reborn in the digital age.
              </p>
            </div>

            {/* Story CTA */}
            <div className="mt-8 flex items-center gap-4">
              <button onClick={() => setCurrentPage('story')} className="group text-amber-400 hover:text-amber-300 text-sm font-semibold flex items-center gap-2 transition-colors">
                Read Full Brand Story
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="h-px flex-1 bg-stone-800/60 max-w-[80px]"></div>
            </div>
          </div>

          {/* Right: Visual grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-red-950/60 to-stone-900 border border-red-900/40 rounded-2xl p-6 flex flex-col justify-between min-h-[180px]">
              <div className="text-3xl mb-3">🏮</div>
              <div>
                <div className="text-white font-bold text-sm mb-1">1,500 Years</div>
                <div className="text-stone-500 text-xs leading-relaxed">of continuous CaiShen cultural heritage and devotion</div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-amber-950/50 to-stone-900 border border-amber-900/40 rounded-2xl p-6 flex flex-col justify-between min-h-[180px]">
              <div className="text-3xl mb-3">⚡</div>
              <div>
                <div className="text-white font-bold text-sm mb-1">AI Original</div>
                <div className="text-stone-500 text-xs leading-relaxed">Proprietary AI trained on thousands of ancient artifacts</div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-stone-900 to-stone-950 border border-stone-800 rounded-2xl p-6 flex flex-col justify-between min-h-[180px]">
              <div className="text-3xl mb-3">🌍</div>
              <div>
                <div className="text-white font-bold text-sm mb-1">36 Countries</div>
                <div className="text-stone-500 text-xs leading-relaxed">Trusted by families and collectors worldwide</div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-900/40 to-amber-950/30 border border-amber-800/30 rounded-2xl p-6 flex flex-col justify-between min-h-[180px]">
              <div className="text-3xl mb-3">📜</div>
              <div>
                <div className="text-white font-bold text-sm mb-1">Certificate</div>
                <div className="text-stone-500 text-xs leading-relaxed">Every piece comes with authenticity documentation</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductShowcase({ setCurrentPage }) {
  const featured = PRODUCTS.slice(0, 4);
  return (
    <section className="py-24 bg-stone-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <div className="flex items-end justify-between mb-14">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-amber-700/60"></div>
              <span className="text-amber-600/80 text-[11px] tracking-[0.25em] uppercase font-medium">Featured Collection</span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-black text-white">The Collection</h2>
            <p className="text-stone-500 text-sm mt-2">AI 融合傳統美學 · 每一件皆為限量創作</p>
          </div>
          <button onClick={() => setCurrentPage('shop')} className="hidden sm:flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm font-semibold transition-colors group">
            全部 {PRODUCTS.length} 件商品
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Products grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map(p => (
            <ProductCard key={p.id} product={p} onView={() => {}} onQuickAdd={null} />
          ))}
        </div>

        {/* View all CTA */}
        <div className="text-center mt-12">
          <button onClick={() => setCurrentPage('shop')} className="border border-stone-700 hover:border-amber-700 text-stone-400 hover:text-amber-400 font-semibold px-10 py-4 rounded-2xl transition-all duration-300 text-sm">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { icon: <Truck size={22} />, title: '全球免運', titleEn: 'Worldwide Shipping', desc: '訂單滿 $39 全球免運，7-14個工作日送達' },
    { icon: <ShieldCheck size={22} />, title: '正品保障', titleEn: 'Authenticity Guaranteed', desc: '每件商品附珍藏編號證書，防偽驗證' },
    { icon: <RefreshCw size={22} />, title: '30天退換', titleEn: '30-Day Returns', desc: '滿意保證，30天內無條件退換' },
    { icon: <Award size={22} />, title: '限量創作', titleEn: 'Limited Edition', desc: 'AI原創紋樣，每件皆為獨一無二' },
  ];
  return (
    <section className="py-16 bg-stone-900/50 border-y border-stone-800/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="text-center group">
              <div className="w-14 h-14 rounded-2xl bg-stone-800/80 border border-stone-700/60 flex items-center justify-center mx-auto mb-4 text-amber-400 group-hover:bg-amber-900/30 group-hover:border-amber-700/50 transition-all duration-300">{f.icon}</div>
              <div className="text-amber-400 font-bold text-sm mb-0.5">{f.title}</div>
              <div className="text-stone-600 text-[10px] font-medium tracking-wider uppercase mb-2">{f.titleEn}</div>
              <div className="text-stone-500 text-xs leading-relaxed">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ShopPage({ setCurrentPage, onViewProduct, onQuickAdd }) {
  const [filter, setFilter] = useState('all');
  const filters = ['all', '掛件', '擺件', '禮盒'];
  const filtered = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.name.includes(filter));
  return (
    <div className="pt-28 pb-24 bg-stone-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-px bg-amber-700/60"></div>
            <span className="text-amber-600/80 text-[11px] tracking-[0.25em] uppercase font-medium">Full Collection</span>
            <div className="w-8 h-px bg-amber-700/60"></div>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-black text-white mb-3">全部商品</h2>
          <p className="text-stone-500 text-sm">AI 財神全系列 · {PRODUCTS.length} Products</p>
        </div>
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${filter === f ? 'bg-amber-600 text-white' : 'bg-stone-800/80 text-stone-400 hover:bg-stone-700'}`}>
              {f === 'all' ? '全部 All' : f}
            </button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map(p => <ProductCard key={p.id} product={p} onView={onViewProduct} onQuickAdd={onQuickAdd} />)}
        </div>
      </div>
    </div>
  );
}

function ProductModal({ product, onClose, onAddToCart }) {
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  if (!product) return null;
  const handleAdd = () => { onAddToCart(product, qty); setAdded(true); setTimeout(() => setAdded(false), 2000); };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-gradient-to-b from-stone-900 to-stone-950 border border-stone-700/60 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="grid md:grid-cols-2 gap-0">
          <div className="bg-stone-950 p-6">
            <div className="aspect-square bg-stone-900 rounded-2xl overflow-hidden mb-4 flex items-center justify-center border border-stone-800/60">
              <img src={product.images[activeImg]} alt={product.name} className="w-full h-full object-cover" onError={e => { e.target.style.display='none'; }} />
            </div>
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)} className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${activeImg === i ? 'border-amber-500' : 'border-transparent opacity-50 hover:opacity-100'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" onError={e => e.target.style.display='none'} />
                </button>
              ))}
            </div>
          </div>
          <div className="p-6 lg:p-8">
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 hover:text-white float-right"><X size={15} /></button>
            <div className="text-xs text-amber-600/80 font-medium tracking-widest uppercase mb-2">{product.nameEn}</div>
            <h2 className="font-cn text-2xl font-black text-white mb-1">{product.name}</h2>
            <div className="flex items-center gap-2 mb-4">
              <StarRating rating={product.rating} />
              <span className="text-xs text-stone-500">{product.reviews} reviews</span>
            </div>
            <div className="flex items-end gap-4 mb-6">
              <span className="text-4xl font-black text-amber-400">${product.price}</span>
              <span className="text-lg text-stone-600 line-through">${product.originalPrice}</span>
              <span className="bg-red-950/60 text-red-400 text-sm font-bold px-3 py-1 rounded-full">-{Math.round((1-product.price/product.originalPrice)*100)}%</span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed mb-6">{product.description}</p>
            <ul className="space-y-2 mb-6">
              {product.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-stone-300"><CheckCircle size={13} className="text-amber-500 shrink-0" />{f}</li>
              ))}
            </ul>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2 bg-stone-800/80 border border-stone-700/60 rounded-xl">
                <button onClick={() => setQty(Math.max(1, qty-1))} className="w-10 h-10 flex items-center justify-center text-white font-bold text-lg hover:bg-stone-700 rounded-l-xl transition-colors">-</button>
                <span className="w-10 text-center text-white font-bold">{qty}</span>
                <button onClick={() => setQty(qty+1)} className="w-10 h-10 flex items-center justify-center text-white font-bold text-lg hover:bg-stone-700 rounded-r-xl transition-colors">+</button>
              </div>
              <button onClick={handleAdd} className={`flex-1 py-3.5 rounded-xl font-bold text-sm transition-all ${added ? 'bg-green-700 text-white' : 'bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white'}`}>
                {added ? <><CheckCircle size={15} className="inline mr-2" />Added to Cart</> : <><ShoppingBag size={15} className="inline mr-2" />Add to Cart</>}
              </button>
            </div>
            <div className="border-t border-stone-800 pt-4 space-y-2 text-xs text-stone-600">
              <div className="flex items-center gap-2"><Truck size={12} /> 全球免運 · Orders over $39</div>
              <div className="flex items-center gap-2"><RefreshCw size={12} /> 30天退換保障</div>
              <div className="flex items-center gap-2"><Award size={12} /> 正品保證 · 珍藏證書</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StoryPage({ setCurrentPage }) {
  return (
    <div className="pt-28 pb-24 bg-stone-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-px bg-amber-700/60"></div>
            <span className="text-amber-600/80 text-[11px] tracking-[0.25em] uppercase font-medium">Our Story</span>
            <div className="w-8 h-px bg-amber-700/60"></div>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-black text-white mb-3">關於 CaiShen</h2>
        </div>

        {/* Heritage blocks */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="bg-gradient-to-br from-red-950/40 to-stone-950 border border-red-900/40 rounded-3xl p-8">
            <div className="text-4xl mb-5">🏮</div>
            <h3 className="text-xl font-black text-white mb-3">1,500 Years of Heritage</h3>
            <p className="text-stone-400 text-sm leading-7">The CaiShen faith has over 1,500 years of history in China, and is one of the most cherished cultural symbols for Chinese communities worldwide. CaiShen is dedicated to reimagining this cultural treasure through AI technology.</p>
          </div>
          <div className="bg-gradient-to-br from-amber-950/40 to-stone-950 border border-amber-900/40 rounded-3xl p-8">
            <div className="text-4xl mb-5">⚡</div>
            <h3 className="text-xl font-black text-white mb-3">Powered by AI</h3>
            <p className="text-stone-400 text-sm leading-7">We trained a proprietary AI system on thousands of artifacts — Dunhuang murals, Song dynasty porcelain, Ming-Qing lacquerware — to generate unique CaiShen aesthetic totems for the digital age.</p>
          </div>
        </div>

        {/* Full story */}
        <div className="bg-gradient-to-br from-stone-900 to-stone-950 border border-stone-800/60 rounded-3xl p-8 lg:p-12 mb-16 text-center">
          <h3 className="font-display text-2xl font-black text-white mb-6">品牌故事 · The Brand Story</h3>
          <div className="text-stone-400 text-sm leading-8 max-w-2xl mx-auto space-y-4">
            <p>CaiShen was born in a living room overseas. Our founder grew tired of Western stereotypes about Eastern culture and decided to use cutting-edge AI to reinterpret the sacred image of CaiShen.</p>
            <p>From the first sketch to the first finished product took 8 months. Today, CaiShen has reached tens of thousands of families across 36 countries.</p>
            <p>We believe: <span className="text-amber-400 font-semibold">wealth is energy, faith is the medium, and technology is the bridge.</span></p>
          </div>
          <blockquote className="mt-8 border-l-4 border-amber-700/60 pl-6 text-left max-w-xl mx-auto">
            <p className="text-stone-300 italic text-sm leading-7">"Let every overseas Chinese feel the warmth of home at their fingertips."</p>
          </blockquote>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-5">
          {[['36+', 'Countries'], ['50K+', 'Global Users'], ['4.9★', 'Avg Rating']].map(([num, label]) => (
            <div key={label} className="bg-stone-900/80 border border-stone-800/60 rounded-2xl p-6 text-center">
              <div className="text-2xl font-black text-amber-400 mb-1">{num}</div>
              <div className="text-stone-600 text-[11px] tracking-wider uppercase">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReviewsSection() {
  return (
    <section className="py-24 bg-stone-950 border-t border-stone-800/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-px bg-amber-700/60"></div>
            <span className="text-amber-600/80 text-[11px] tracking-[0.25em] uppercase font-medium">Customer Voices</span>
            <div className="w-8 h-px bg-amber-700/60"></div>
          </div>
          <h2 className="font-display text-4xl font-black text-white">真實用戶</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {REVIEWS.map((r, i) => (
            <div key={i} className="bg-gradient-to-b from-stone-900/80 to-stone-950 border border-stone-800/60 rounded-2xl p-5">
              <StarRating rating={r.rating} />
              <p className="text-stone-300 text-sm mt-3 mb-4 leading-relaxed">"{r.text}"</p>
              <div className="flex items-center justify-between">
                <div><div className="text-white font-bold text-sm">{r.name}</div><div className="text-stone-600 text-[11px]">{r.location}</div></div>
                <span className="text-[10px] text-amber-600/70 bg-amber-950/40 px-2 py-1 rounded-full">{r.product}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  return (
    <section className="py-20 bg-gradient-to-r from-red-950/40 via-stone-950 to-amber-950/20 border-y border-stone-800/50">
      <div className="max-w-xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-8 h-px bg-amber-700/60"></div>
          <BookOpen size={18} className="text-amber-500" />
          <div className="w-8 h-px bg-amber-700/60"></div>
        </div>
        <h2 className="font-display text-2xl font-black text-white mb-2">Stay in Touch</h2>
        <p className="text-stone-500 text-sm mb-8">新產品 · 限量創作 · 特別優惠，第一時間知曉</p>
        {submitted ? (
          <div className="bg-green-900/40 border border-green-800/50 text-green-400 rounded-2xl py-4 px-6 text-sm font-bold">✓ 訂閱成功！我們會第一時間與你聯繫。</div>
        ) : (
          <div className="flex gap-3 max-w-md mx-auto">
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email address" className="flex-1 bg-stone-900/80 border border-stone-700/60 rounded-xl px-4 py-3 text-white text-sm placeholder-stone-600 focus:outline-none focus:border-amber-600 transition-colors" />
            <button onClick={() => { if(email) setSubmitted(true); }} className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold px-6 py-3 rounded-xl transition-all whitespace-nowrap text-sm">Subscribe</button>
          </div>
        )}
      </div>
    </section>
  );
}

function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const handleSubmit = (e) => { e.preventDefault(); setSent(true); };
  return (
    <div className="pt-28 pb-24 bg-stone-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-px bg-amber-700/60"></div>
            <span className="text-amber-600/80 text-[11px] tracking-[0.25em] uppercase font-medium">Contact Us</span>
            <div className="w-8 h-px bg-amber-700/60"></div>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-black text-white">聯絡我們</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-5">
            {[
              { icon: <Mail size={18} />, title: '郵箱 Email', content: 'support@blingjew.com' },
              { icon: <MapPin size={18} />, title: 'Company Address', content: '香港文運亨通有限公司\nHong Kong SAR' },
              { icon: <Clock size={18} />, title: 'Business Hours', content: 'Mon–Fri 9:00–18:00 (HKT)\n24小時內回覆' },
            ].map(({ icon, title, content }) => (
              <div key={title} className="bg-stone-900/80 border border-stone-800/60 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-950/60 rounded-xl flex items-center justify-center text-amber-400 shrink-0 border border-amber-900/40">{icon}</div>
                  <div><div className="text-white font-bold text-sm mb-1">{title}</div><div className="text-stone-400 text-sm whitespace-pre-line">{content}</div></div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-stone-900/80 border border-stone-800/60 rounded-2xl p-6 lg:p-8">
            <h3 className="text-lg font-black text-white mb-5">發送訊息</h3>
            {sent ? (
              <div className="text-center py-10">
                <div className="text-4xl mb-3">✅</div>
                <div className="text-white font-bold">訊息已發送！</div>
                <div className="text-stone-400 text-sm mt-1">我們會盡快回覆</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your Name" className="w-full bg-stone-950/80 border border-stone-700/60 rounded-xl px-4 py-3 text-white text-sm placeholder-stone-600 focus:outline-none focus:border-amber-600" />
                <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="Email Address" className="w-full bg-stone-950/80 border border-stone-700/60 rounded-xl px-4 py-3 text-white text-sm placeholder-stone-600 focus:outline-none focus:border-amber-600" />
                <textarea required value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Your Message" rows={4} className="w-full bg-stone-950/80 border border-stone-700/60 rounded-xl px-4 py-3 text-white text-sm placeholder-stone-600 focus:outline-none focus:border-amber-600 resize-none" />
                <button type="submit" className="w-full bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm">
                  <Send size={15} /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer({ setCurrentPage }) {
  return (
    <footer className="bg-stone-950 border-t border-stone-800/60 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-14">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-red-800 to-amber-700 rounded-lg flex items-center justify-center text-sm">🧧</div>
              <div><div className="font-display text-white font-black text-base">CaiShen</div><div className="text-amber-600/60 text-[8px] tracking-widest uppercase">AI Fortune Art</div></div>
            </div>
            <p className="text-stone-600 text-xs leading-relaxed">全球首創 AI 融合傳統美學的文創品牌。讓每一次收藏，都是一段文化的延續。</p>
          </div>
          <div>
            <h4 className="text-stone-300 font-bold text-sm mb-4">Shop</h4>
            <ul className="space-y-2.5 text-xs text-stone-600">
              {['All Products', 'Plush Keychains', 'Resin Ornaments', 'Gift Sets'].map(item => (
                <li key={item} className="hover:text-amber-400 cursor-pointer transition-colors">{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-stone-300 font-bold text-sm mb-4">Support</h4>
            <ul className="space-y-2.5 text-xs text-stone-600">
              {['Shipping Info', 'Return Policy', 'FAQ', 'Contact Us'].map(item => (
                <li key={item} className="hover:text-amber-400 cursor-pointer transition-colors">{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-stone-300 font-bold text-sm mb-4">Company</h4>
            <ul className="space-y-2.5 text-xs text-stone-600">
              {['About Us', 'Our Story', 'Privacy Policy', 'Terms of Use'].map(item => (
                <li key={item} className="hover:text-amber-400 cursor-pointer transition-colors">{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-stone-800/60 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-stone-700">© 2024 CaiShen. 香港文運亨通有限公司. All rights reserved.</div>
          <button
            onClick={() => { window.location.hash = '#/admin'; setCurrentPage('admin'); }}
            className="text-[9px] text-stone-800 hover:text-stone-500 cursor-pointer transition-colors tracking-widest uppercase"
            title="Admin"
          >mgr</button>
          <div className="flex gap-3">
            <div className="w-9 h-9 bg-stone-900/80 rounded-lg flex items-center justify-center text-stone-600 hover:text-amber-400 cursor-pointer transition-colors border border-stone-800/60"><InstagramIcon size={15} /></div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================================
//  CART CONTEXT & STRIPE CHECKOUT
// ============================================================
function useCart() {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('caishen_cart') || '[]'); } catch { return []; }
  });
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  const save = (newItems) => { setItems(newItems); localStorage.setItem('caishen_cart', JSON.stringify(newItems)); };

  const addItem = useCallback((product, qty = 1) => {
    setItems(prev => {
      const exists = prev.find(i => i.id === product.id);
      const updated = exists
        ? prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i)
        : [...prev, { id: product.id, name: product.name, price: product.price, image: product.image, qty }];
      localStorage.setItem('caishen_cart', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeItem = useCallback((productId) => {
    setItems(prev => {
      const updated = prev.filter(i => i.id !== productId);
      localStorage.setItem('caishen_cart', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const updateQty = useCallback((productId, qty) => {
    if (qty < 1) return removeItem(productId);
    setItems(prev => {
      const updated = prev.map(i => i.id === productId ? { ...i, qty: qty } : i);
      localStorage.setItem('caishen_cart', JSON.stringify(updated));
      return updated;
    });
  }, [removeItem]);

  const clearCart = useCallback(() => { setItems([]); localStorage.removeItem('caishen_cart'); }, []);

  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  const totalPrice = items.reduce((s, i) => s + i.price * i.qty, 0);

  const checkout = useCallback(async () => {
    setIsCheckingOut(true);
    setCheckoutError('');
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: items.map(i => ({ id: i.id, qty: i.qty })) }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setCheckoutError(data.error || 'Checkout failed. Please try again.');
        setIsCheckingOut(false);
      }
    } catch {
      setCheckoutError('Network error. Please check your connection.');
      setIsCheckingOut(false);
    }
  }, [items]);

  return { items, addItem, removeItem, updateQty, clearCart, totalItems, totalPrice, isCheckingOut, checkoutError, checkout, setCheckoutError };
}

function CartSidebar({ cart, onClose }) {
  if (!cart) return null;
  const { items, removeItem, updateQty, totalItems, totalPrice, isCheckingOut, checkoutError, checkout, setCheckoutError } = cart;
  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      <div className="relative w-full max-w-md bg-gradient-to-b from-stone-900 to-stone-950 border-l border-stone-800/60 flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-stone-800/60">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <ShoppingBag size={17} /> Your Cart <span className="text-amber-400 text-sm">({totalItems})</span>
          </h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 hover:text-white"><X size={15} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-14">
              <div className="text-4xl mb-3">🧧</div>
              <div className="text-stone-500 text-sm">Your cart is empty</div>
              <div className="text-stone-600 text-xs mt-1">探索我們的珍藏系列</div>
            </div>
          ) : items.map(item => (
            <div key={item.id} className="flex gap-4 bg-stone-900/80 rounded-xl p-3 border border-stone-800/60">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-stone-950 shrink-0 flex items-center justify-center">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" onError={e => e.target.style.display='none'} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-bold text-sm truncate">{item.name}</div>
                <div className="text-amber-400 font-bold text-sm mt-1">${item.price}</div>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-6 h-6 rounded bg-stone-800 flex items-center justify-center text-white hover:bg-stone-700"><Minus size={11} /></button>
                  <span className="text-white text-sm font-bold w-6 text-center">{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-6 h-6 rounded bg-stone-800 flex items-center justify-center text-white hover:bg-stone-700"><Plus size={11} /></button>
                  <button onClick={() => removeItem(item.id)} className="ml-auto text-red-400 hover:text-red-300 text-xs transition-colors">移除</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <div className="p-6 border-t border-stone-800/60 space-y-4">
            {checkoutError && (
              <div className="bg-red-950/50 border border-red-800/50 text-red-400 text-xs rounded-xl p-3 flex items-center justify-between">
                <span>{checkoutError}</span>
                <button onClick={() => setCheckoutError('')} className="text-red-300 hover:text-red-200"><X size={13} /></button>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-stone-400 text-sm">合計 Total</span>
              <span className="text-2xl font-black text-amber-400">${totalPrice}</span>
            </div>
            <button
              onClick={checkout}
              disabled={isCheckingOut}
              className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 disabled:from-amber-800 disabled:to-orange-800 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm">
              {isCheckingOut ? <><Loader size={15} className="animate-spin" /> Processing...</> : <><CreditCard size={15} /> Secure Checkout</>}
            </button>
            <div className="flex items-center justify-center gap-5 text-[10px] text-stone-700">
              <span className="flex items-center gap-1"><ShieldCheck size={10} /> SSL Encrypted</span>
              <span className="flex items-center gap-1"><CreditCard size={10} /> Stripe Secure</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
//  MAIN APP
// ============================================================
export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('page') || 'home';
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const cart = useCart();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#/admin') {
        setCurrentPage('admin');
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const handleAddToCart = (product, qty = 1) => {
    cart.addItem(product, qty);
    setShowCart(true);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'shop': return <ShopPage setCurrentPage={setCurrentPage} onViewProduct={setSelectedProduct} onQuickAdd={handleAddToCart} />;
      case 'story': return <StoryPage setCurrentPage={setCurrentPage} />;
      case 'contact': return <ContactPage />;
      default: return (
        <>
          <Hero setCurrentPage={setCurrentPage} />
          <HeritageSection setCurrentPage={setCurrentPage} />
          <ProductShowcase setCurrentPage={setCurrentPage} />
          <Features />
          <ReviewsSection />
          <Newsletter />
        </>
      );
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-white font-sans">
      {currentPage === 'admin' ? (
        <AdminPanel />
      ) : (
        <>
          <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} cartCount={cart.totalItems} setShowCart={setShowCart} />
          {renderPage()}
          <Footer setCurrentPage={setCurrentPage} />
          {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={handleAddToCart} />}
          {showCart && <CartSidebar cart={{ ...cart }} onClose={() => setShowCart(false)} />}
        </>
      )}
    </div>
  );
}
