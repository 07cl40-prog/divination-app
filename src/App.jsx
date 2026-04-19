import React, { useState, useEffect, useCallback } from 'react';
import { ShoppingBag, Menu, X, ChevronRight, Star, Heart, Truck, ShieldCheck, RefreshCw, Globe, ArrowRight, CheckCircle, Mail, MapPin, Clock, Send, Minus, Plus, CreditCard, Award, Users, Globe2 } from 'lucide-react';
import AdminPanel from './admin/AdminPanel';

// Instagram SVG icon
const InstagramIcon = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

// ============================================================
//  CaiShen — AI Eastern Fortune Art
//  European Minimalist Luxury Redesign
// ============================================================

// Products loaded from public/data/products.json
const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/data/products.json?t=' + Date.now());
      const data = await res.json();
      setProducts(data);
    } catch { setProducts([]); }
    setLoading(false);
  }, []);
  useEffect(() => { refresh(); }, [refresh]);
  return { products, loading, refresh };
};

// Review data
const REVIEWS = [
  { name: 'Linda W.', location: 'Los Angeles, USA', text: 'Absolutely stunning. The AI-generated patterns are unlike anything I have seen. My colleagues all asked where I got it.', rating: 5 },
  { name: 'Michael C.', location: 'London, UK', text: 'Fast shipping and the packaging felt luxurious. The ornament sits proudly on my desk. Highly recommend.', rating: 5 },
  { name: 'Sophie L.', location: 'Toronto, Canada', text: 'Bought as a Chinese New Year gift for my parents. They loved it. The quality exceeded all expectations.', rating: 5 },
  { name: 'James K.', location: 'Sydney, Australia', text: 'Traditional Eastern culture meets futuristic design. Fascinating concept and beautiful execution. Will buy more.', rating: 5 },
  { name: 'Emma R.', location: 'Paris, France', text: 'Ordered for my apartment. The craftsmanship is remarkable. A true conversation piece on my console table.', rating: 5 },
];

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={12} className={i <= rating ? 'fill-[#B8860B] text-[#B8860B]' : 'text-[#CCCCCC]'} />
      ))}
    </div>
  );
}

// ============================================================
//  NAVBAR
// ============================================================
function Navbar({ currentPage, setCurrentPage, cartCount, setShowCart }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navItems = [
    { key: 'home', label: 'Home' },
    { key: 'shop', label: 'Shop' },
    { key: 'story', label: 'Story' },
    { key: 'contact', label: 'Contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm border-b border-[#E8E4E0]' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          {/* Logo */}
          <button onClick={() => setCurrentPage('home')} className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-[#1A1A1A] rounded-full flex items-center justify-center text-white text-sm font-black tracking-tight group-hover:bg-[#B8860B] transition-colors duration-200">
              祈
            </div>
            <div>
              <div className="text-[#1A1A1A] font-black text-base tracking-tight leading-none">AI CaiShen</div>
              <div className="text-[#B8860B] text-[9px] tracking-[0.25em] uppercase font-medium">Eastern Fortune Art</div>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <button key={item.key} onClick={() => setCurrentPage(item.key)}
                className={`px-5 py-2 text-sm font-medium transition-all duration-200 rounded-full ${
                  currentPage === item.key
                    ? 'bg-[#1A1A1A] text-white'
                    : 'text-[#666666] hover:text-[#1A1A1A] hover:bg-[#F5F1ED]'
                }`}>
                {item.label}
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button onClick={() => setShowCart(true)}
              className="relative w-10 h-10 rounded-full bg-[#F5F1ED] hover:bg-[#1A1A1A] flex items-center justify-center text-[#333333] hover:text-white transition-all duration-200">
              <ShoppingBag size={17} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#8B1A1A] text-white text-[10px] font-black rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 rounded-full bg-[#F5F1ED] flex items-center justify-center text-[#333333]">
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-[#E8E4E0] px-6 py-4 space-y-1">
          {navItems.map(item => (
            <button key={item.key} onClick={() => { setCurrentPage(item.key); setMobileOpen(false); }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                currentPage === item.key ? 'bg-[#1A1A1A] text-white' : 'text-[#666666]'
              }`}>
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ============================================================
//  HERO — Clean, minimal, image-forward
// ============================================================
function Hero({ setCurrentPage }) {
  return (
    <section className="relative min-h-screen flex items-center bg-[#FAFAF8] overflow-hidden pt-16">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#FAFAF8] to-[#F0EDE8] pointer-events-none"></div>
      {/* Decorative ring */}
      <div className="absolute top-1/2 right-[5%] -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#E8E4E0] pointer-events-none hidden xl:block"></div>
      <div className="absolute top-1/2 right-[5%] -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[#D4B978]/20 pointer-events-none hidden xl:block"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center min-h-[calc(100vh-64px)] py-16 lg:py-0">

          {/* Left: Brand copy */}
          <div className="max-w-xl">
            <div className="w-12 h-px bg-[#B8860B] mb-8"></div>
            <h1 className="text-[#1A1A1A] leading-none mb-6">
              <span className="block text-6xl lg:text-7xl font-black tracking-tight">AI CaiShen</span>
              <span className="block text-[#1A1A1A] text-2xl lg:text-3xl font-light mt-3 tracking-wide">Eastern Fortune Art</span>
            </h1>
            <p className="text-[#666666] text-base lg:text-lg leading-relaxed mb-10 max-w-md font-light">
              1,500 Years of Heritage,<br />Reimagined by AI.<br />
              <span className="text-[#B8860B] font-medium">For 36+ Countries.</span>
            </p>
            <button
              onClick={() => setCurrentPage('shop')}
              className="inline-flex items-center gap-3 bg-[#1A1A1A] hover:bg-[#8B1A1A] text-white font-medium px-8 py-4 rounded-full transition-all duration-300 text-sm group">
              Explore Collection
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right: Atmospheric product image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-[#B8860B]/10">
              <img
                src="/products/product1.jpg"
                alt="AI CaiShen Collection"
                className="w-full h-full object-cover"
                onError={e => {
                  e.target.style.display = 'none';
                  e.target.parentNode.innerHTML = `
                    <div class="w-full h-full bg-gradient-to-br from-[#F5F1ED] via-[#E8E4E0] to-[#D4B978]/10 flex flex-col items-center justify-center">
                      <div class="text-8xl mb-6">🧧</div>
                      <div class="text-[#B8860B] text-sm font-medium tracking-widest uppercase">CaiShen Collection</div>
                    </div>`;
                }}
              />
            </div>
          </div>
        </div>

        {/* Bottom stats bar */}
        <div className="flex items-center gap-8 lg:gap-16 py-8 mt-8 border-t border-[#E8E4E0]">
          {[
            { icon: <Globe2 size={16} />, num: '36+', label: 'Countries' },
            { icon: <Users size={16} />, num: '50K+', label: 'Happy Families' },
            { icon: <Award size={16} />, num: '4.9', label: 'Avg. Rating' },
            { icon: <ShieldCheck size={16} />, num: '100%', label: 'AI Original' },
          ].map(({ icon, num, label }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="text-[#B8860B]">{icon}</div>
              <div>
                <div className="text-[#1A1A1A] text-base font-black leading-none">{num}</div>
                <div className="text-[#999999] text-[10px] uppercase tracking-wider mt-0.5">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
//  PRODUCT CARD — Clean grid layout
// ============================================================
function ProductCard({ product, onView, onQuickAdd }) {
  const [liked, setLiked] = useState(false);

  // Map badge to proper English label
  const badgeLabel = {
    BESTSELLER: 'Best Seller',
    NEW: 'New',
    LIMITED: 'Limited',
    EXCLUSIVE: 'Exclusive',
  }[product.badge] || null;

  // English-only selling points
  const enFeatures = {
    1: ['AI-Generated Pattern', 'Premium Plush Fabric', 'Complete Gift Box'],
    2: ['Handcrafted Resin', 'Gold Patina Finish', 'Moisture Resistant'],
    3: ['AI Scholar Design', 'Dual-Piece Gift Set', 'Numbered Certificate'],
    4: ['Full 4-Piece Collection', 'Leather Storage Case', 'Collection Certificate'],
  }[product.id] || product.features?.slice(0, 3).map(f => f.replace(/[\u4e00-\u9fff]/g, '').trim()).filter(Boolean) || ['Premium Quality', 'AI Original', 'Gift Ready'];

  return (
    <div className="group bg-white border border-[#E8E4E0] rounded-2xl overflow-hidden hover:border-[#B8860B]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#B8860B]/5 flex flex-col">
      {/* Image */}
      <div className="relative aspect-square bg-[#FAFAF8] overflow-hidden">
        <img
          src={product.image}
          alt={product.nameEn || product.name}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
          onError={e => {
            e.target.style.display = 'none';
          }}
        />
        {/* Corner badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className="bg-[#B8860B] text-white text-[9px] font-bold px-2.5 py-1 rounded-full tracking-wider uppercase">
              {badgeLabel}
            </span>
          )}
        </div>
        {/* Like button */}
        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-[#999999] hover:text-[#8B1A1A] transition-colors">
          <Heart size={13} className={liked ? 'fill-[#8B1A1A] text-[#8B1A1A]' : ''} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="text-[#1A1A1A] text-sm font-semibold leading-snug mb-1">
          {product.nameEn || product.name}
        </div>
        <div className="flex items-center gap-1.5 mb-3">
          <StarRating rating={product.rating || 5} />
          <span className="text-[#999999] text-[10px]">({product.reviews})</span>
        </div>
        {/* 3 English selling points */}
        <div className="space-y-1 mb-4 flex-1">
          {enFeatures.slice(0, 3).map((f, i) => (
            <div key={i} className="flex items-center gap-1.5 text-[#666666] text-xs">
              <div className="w-1 h-1 rounded-full bg-[#B8860B] shrink-0"></div>
              {f}
            </div>
          ))}
        </div>
        <div className="flex items-end justify-between gap-2 pt-3 border-t border-[#E8E4E0]">
          <div className="flex items-end gap-2">
            <span className="text-xl font-black text-[#1A1A1A]">${product.price}</span>
            <span className="text-sm text-[#999999] line-through mb-0.5">${product.originalPrice}</span>
          </div>
          <button
            onClick={() => onView(product)}
            className="bg-[#1A1A1A] hover:bg-[#8B1A1A] text-white text-xs font-medium px-4 py-2 rounded-full transition-colors duration-200 whitespace-nowrap">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
//  PRODUCT GRID — Clean card layout
// ============================================================
function ProductGrid({ products, onViewProduct, onQuickAdd }) {
  const [filter, setFilter] = useState('all');
  const filters = ['all', 'Plush', 'Resin', 'Set'];

  const filtered = filter === 'all'
    ? (products || [])
    : (products || []).filter(p => {
        if (filter === 'Plush') return (p.nameEn || p.name).toLowerCase().includes('plush') || p.name.includes('掛件');
        if (filter === 'Resin') return (p.nameEn || p.name).toLowerCase().includes('resin') || p.name.includes('擺件');
        if (filter === 'Set') return (p.nameEn || p.name).toLowerCase().includes('set') || p.name.includes('禮盒');
        return true;
      });

  return (
    <div className="pt-28 pb-24 bg-[#FAFAF8] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <div className="mb-12">
          <div className="w-12 h-px bg-[#B8860B] mb-6"></div>
          <h2 className="text-[#1A1A1A] text-4xl lg:text-5xl font-black leading-tight mb-2">The Collection</h2>
          <p className="text-[#999999] text-sm">
            {products?.length || 0} AI-original pieces · Limited editions
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-10 flex-wrap">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                filter === f
                  ? 'bg-[#1A1A1A] text-white'
                  : 'bg-white text-[#666666] border border-[#E8E4E0] hover:border-[#B8860B] hover:text-[#B8860B]'
              }`}>
              {f === 'all' ? 'All Pieces' : f}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-[#999999]">No products found.</div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} onView={onViewProduct} onQuickAdd={onQuickAdd} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
//  CULTURE SECTION — Short, elegant, English-first
// ============================================================
function CultureSection({ setCurrentPage }) {
  const pillars = [
    { icon: '◆', title: 'Heritage', sub: '1,500 years of Eastern fortune symbolism reimagined through AI technology' },
    { icon: '◇', title: 'Craft', sub: 'Proprietary AI trained on Dunhuang murals, Song dynasty porcelain, and Ming-Qing lacquerware' },
    { icon: '◆', title: 'Global', sub: 'Reaching 36+ countries with premium Eastern aesthetics for modern interiors' },
  ];

  return (
    <section className="py-24 bg-[#FAFAF8] border-t border-[#E8E4E0]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <div className="w-12 h-px bg-[#B8860B] mb-6"></div>
          <h2 className="text-[#1A1A1A] text-4xl lg:text-5xl font-black leading-tight mb-4">
            Eastern Fortune Art
          </h2>
          <p className="text-[#666666] text-base leading-relaxed font-light">
            We fuse 1,500 years of Eastern fortune symbolism with cutting-edge AI design.
            Each piece is a modern artifact — crafted for global homes that value culture, craft, and taste.
          </p>
        </div>

        {/* Three pillars */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {pillars.map(({ icon, title, sub }) => (
            <div key={title} className="bg-white border border-[#E8E4E0] rounded-2xl p-8 hover:border-[#B8860B]/30 transition-all duration-300">
              <div className="text-[#B8860B] text-lg mb-5 font-light">{icon}</div>
              <h3 className="text-[#1A1A1A] text-lg font-black mb-3">{title}</h3>
              <p className="text-[#666666] text-sm leading-relaxed font-light">{sub}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => setCurrentPage('story')}
            className="inline-flex items-center gap-2 text-[#B8860B] hover:text-[#1A1A1A] text-sm font-medium transition-colors group">
            Discover our story <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}

// ============================================================
//  SERVICES BAR — Icons + short English
// ============================================================
function ServicesBar() {
  const services = [
    { icon: <Truck size={16} />, label: 'Worldwide Shipping', sub: 'Orders over $39' },
    { icon: <RefreshCw size={16} />, label: '30-Day Returns', sub: 'No questions asked' },
    { icon: <ShieldCheck size={16} />, label: 'Authenticity', sub: 'Certificate included' },
    { icon: <Award size={16} />, label: 'Limited Edition', sub: 'Every piece numbered' },
    { icon: <Clock size={16} />, label: 'Fast Dispatch', sub: 'Ships within 48h' },
  ];

  return (
    <section className="py-12 bg-white border-y border-[#E8E4E0]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {services.map(({ icon, label, sub }) => (
            <div key={label} className="flex flex-col items-center text-center gap-2">
              <div className="text-[#B8860B]">{icon}</div>
              <div className="text-[#1A1A1A] text-xs font-semibold">{label}</div>
              <div className="text-[#999999] text-[10px]">{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
//  REVIEWS — Horizontal carousel, minimal cards
// ============================================================
function ReviewsSection() {
  return (
    <section className="py-20 bg-[#FAFAF8] border-t border-[#E8E4E0]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-10">
          <div className="w-12 h-px bg-[#B8860B] mb-6"></div>
          <h2 className="text-[#1A1A1A] text-4xl font-black leading-tight">What They Say</h2>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <style>{`.flex-gap-5::-webkit-scrollbar { display: none; }`}</style>
          {REVIEWS.map((r, i) => (
            <div key={i} className="shrink-0 w-72 bg-white border border-[#E8E4E0] rounded-2xl p-6 flex flex-col gap-4">
              <StarRating rating={r.rating} />
              <p className="text-[#666666] text-sm leading-relaxed font-light flex-1">"{r.text}"</p>
              <div className="border-t border-[#E8E4E0] pt-4">
                <div className="text-[#1A1A1A] text-sm font-semibold">{r.name}</div>
                <div className="text-[#999999] text-xs mt-0.5">{r.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
//  NEWSLETTER — Minimal, English only
// ============================================================
function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => { e.preventDefault(); if(email) setSubmitted(true); };

  return (
    <section className="py-20 bg-[#FAFAF8] border-t border-[#E8E4E0]">
      <div className="max-w-xl mx-auto px-6 text-center">
        <div className="w-12 h-px bg-[#B8860B] mx-auto mb-6"></div>
        <h2 className="text-[#1A1A1A] text-3xl font-black mb-3">Stay Connected</h2>
        <p className="text-[#666666] text-sm mb-8 font-light">Get Exclusive Fortune Art Updates · New collections, limited editions, and special offers.</p>
        {submitted ? (
          <div className="bg-white border border-[#B8860B]/30 text-[#B8860B] rounded-2xl px-6 py-5 text-sm font-medium">
            You're in. Welcome to the circle.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 bg-white border border-[#E8E4E0] text-[#333333] placeholder-[#BBBBBB] px-4 py-3.5 rounded-full text-sm focus:outline-none focus:border-[#B8860B] transition-colors"
            />
            <button
              type="submit"
              className="bg-[#1A1A1A] hover:bg-[#8B1A1A] text-white font-medium px-6 py-3.5 rounded-full transition-colors duration-200 text-sm shrink-0 flex items-center gap-2">
              <Send size={13} />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

// ============================================================
//  STORY PAGE
// ============================================================
function StoryPage({ setCurrentPage }) {
  return (
    <div className="pt-28 pb-24 bg-[#FAFAF8] min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <div className="mb-14">
          <div className="w-12 h-px bg-[#B8860B] mb-6"></div>
          <h2 className="text-[#1A1A1A] text-4xl lg:text-5xl font-black leading-tight mb-3">Our Story</h2>
          <p className="text-[#666666] text-base font-light">Where ancient fortune meets modern craft.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="bg-white border border-[#E8E4E0] rounded-2xl p-8">
            <div className="text-[#B8860B] text-lg mb-4 font-light">— 01</div>
            <h3 className="text-[#1A1A1A] text-xl font-black mb-4">Heritage Reimagined</h3>
            <p className="text-[#666666] text-sm leading-relaxed font-light">
              The CaiShen faith has over 1,500 years of history across China and Chinese communities worldwide.
              We asked: what if cutting-edge AI could reinterpret this sacred cultural symbol for modern global homes?
            </p>
          </div>
          <div className="bg-white border border-[#B8860B]/30 rounded-2xl p-8">
            <div className="text-[#B8860B] text-lg mb-4 font-light">— 02</div>
            <h3 className="text-[#1A1A1A] text-xl font-black mb-4">Powered by AI</h3>
            <p className="text-[#666666] text-sm leading-relaxed font-light">
              We trained a proprietary AI on thousands of artifacts — Dunhuang murals, Song dynasty porcelain, Ming-Qing lacquerware —
              to generate unique aesthetic totems for the digital age.
            </p>
          </div>
        </div>

        <div className="bg-white border border-[#E8E4E0] rounded-2xl p-8 lg:p-12 mb-16 text-center">
          <h3 className="text-[#1A1A1A] text-2xl font-black mb-6">The Brand</h3>
          <p className="text-[#666666] text-sm leading-8 max-w-xl mx-auto font-light mb-6">
            Born overseas, built with AI. CaiShen was created by a team who wanted to share Eastern fortune culture
            through the lens of modern design and technology — reaching 36+ countries with pieces that feel both ancient and utterly contemporary.
          </p>
          <blockquote className="border-l-2 border-[#B8860B] pl-6 text-left max-w-xl mx-auto">
            <p className="text-[#1A1A1A] italic text-sm leading-7 font-light">
              "Let every home feel the warmth of heritage at their fingertips."
            </p>
          </blockquote>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            ['36+', 'Countries'],
            ['50K+', 'Happy Families'],
            ['4.9', 'Avg Rating'],
          ].map(([num, label]) => (
            <div key={label} className="bg-white border border-[#E8E4E0] rounded-2xl p-6 text-center">
              <div className="text-[#1A1A1A] text-2xl font-black">{num}</div>
              <div className="text-[#999999] text-[10px] uppercase tracking-wider mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
//  CONTACT PAGE
// ============================================================
function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const handleSubmit = (e) => { e.preventDefault(); setSent(true); };

  return (
    <div className="pt-28 pb-24 bg-[#FAFAF8] min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <div className="mb-14">
          <div className="w-12 h-px bg-[#B8860B] mb-6"></div>
          <h2 className="text-[#1A1A1A] text-4xl lg:text-5xl font-black leading-tight mb-3">Contact</h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {[
            { icon: <Mail size={18} />, title: 'Email', content: 'hello@blingjew.com' },
            { icon: <MapPin size={18} />, title: 'Location', content: 'Hong Kong SAR' },
            { icon: <Clock size={18} />, title: 'Hours', content: 'Mon–Fri, 9am–6pm HKT' },
          ].map(({ icon, title, content }) => (
            <div key={title} className="bg-white border border-[#E8E4E0] rounded-2xl p-6 text-center">
              <div className="text-[#B8860B] mb-3 flex justify-center">{icon}</div>
              <div className="text-[#1A1A1A] text-sm font-semibold mb-1">{title}</div>
              <div className="text-[#666666] text-xs">{content}</div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-[#E8E4E0] rounded-2xl p-6 lg:p-8">
          {sent ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 rounded-full bg-[#FAFAF8] border border-[#B8860B]/30 flex items-center justify-center mx-auto mb-4 text-[#B8860B] text-xl">✓</div>
              <div className="text-[#1A1A1A] font-black text-lg mb-2">Message Sent</div>
              <div className="text-[#666666] text-sm">We'll get back to you within 24 hours.</div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input required placeholder="Your Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                  className="w-full bg-[#FAFAF8] border border-[#E8E4E0] text-[#333333] placeholder-[#BBBBBB] px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[#B8860B] transition-colors" />
                <input required type="email" placeholder="Email Address" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                  className="w-full bg-[#FAFAF8] border border-[#E8E4E0] text-[#333333] placeholder-[#BBBBBB] px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[#B8860B] transition-colors" />
              </div>
              <input required placeholder="Subject" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})}
                className="w-full bg-[#FAFAF8] border border-[#E8E4E0] text-[#333333] placeholder-[#BBBBBB] px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[#B8860B] transition-colors" />
              <textarea required rows={5} placeholder="Your Message" value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                className="w-full bg-[#FAFAF8] border border-[#E8E4E0] text-[#333333] placeholder-[#BBBBBB] px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[#B8860B] transition-colors resize-none" />
              <button type="submit" className="w-full bg-[#1A1A1A] hover:bg-[#8B1A1A] text-white font-semibold py-4 rounded-xl transition-colors text-sm">
                Send Message
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

// ============================================================
//  PRODUCT MODAL
// ============================================================
function ProductModal({ product, onClose, onAddToCart }) {
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const enFeatures = {
    1: ['AI-Generated Pattern', 'Premium Plush Fabric', 'Complete Gift Box'],
    2: ['Handcrafted Resin', 'Gold Patina Finish', 'Moisture Resistant'],
    3: ['AI Scholar Design', 'Dual-Piece Gift Set', 'Numbered Certificate'],
    4: ['Full 4-Piece Collection', 'Leather Storage Case', 'Collection Certificate'],
  }[product.id] || product.features?.slice(0, 3).map(f => f.replace(/[\u4e00-\u9fff]/g, '').trim()).filter(Boolean) || product.features || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#FAFAF8]/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white border border-[#E8E4E0] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="grid md:grid-cols-2 gap-0">
          {/* Images */}
          <div className="bg-[#FAFAF8] p-6">
            <div className="aspect-square bg-white rounded-2xl overflow-hidden mb-4 border border-[#E8E4E0] flex items-center justify-center">
              <img src={product.images?.[activeImg] || product.image} alt={product.nameEn} className="w-full h-full object-cover" onError={e => e.target.style.display='none'} />
            </div>
            <div className="flex gap-2">
              {(product.images || [product.image]).map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${activeImg === i ? 'border-[#B8860B]' : 'border-transparent opacity-40 hover:opacity-80'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" onError={e => e.target.style.display='none'} />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="p-6 lg:p-8 flex flex-col">
            <button onClick={onClose} className="self-end w-8 h-8 rounded-full bg-[#FAFAF8] flex items-center justify-center text-[#999999] hover:text-[#1A1A1A] transition-colors mb-2">
              <X size={14} />
            </button>

            <div className="text-[#B8860B] text-[10px] tracking-[0.25em] uppercase font-medium mb-2">
              {product.badge ? { BESTSELLER: 'Best Seller', NEW: 'New Arrival', LIMITED: 'Limited Edition', EXCLUSIVE: 'Exclusive' }[product.badge] : 'AI Original'}
            </div>
            <h2 className="text-[#1A1A1A] text-xl lg:text-2xl font-black mb-2">{product.nameEn || product.name}</h2>
            <div className="flex items-center gap-2 mb-4">
              <StarRating rating={product.rating || 5} />
              <span className="text-[#999999] text-xs">({product.reviews} reviews)</span>
            </div>

            <div className="flex items-end gap-3 mb-6">
              <span className="text-3xl font-black text-[#1A1A1A]">${product.price}</span>
              <span className="text-lg text-[#999999] line-through">${product.originalPrice}</span>
              <span className="bg-[#FAFAF8] text-[#8B1A1A] text-xs font-bold px-3 py-1 rounded-full">
                {Math.round((1 - product.price / product.originalPrice) * 100)}% off
              </span>
            </div>

            {/* English features */}
            <div className="space-y-2 mb-6 flex-1">
              {enFeatures.slice(0, 3).map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-[#666666]">
                  <CheckCircle size={13} className="text-[#B8860B] shrink-0" />
                  {f}
                </div>
              ))}
            </div>

            {/* Qty + Add to cart */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center bg-[#FAFAF8] border border-[#E8E4E0] rounded-xl">
                <button onClick={() => setQty(Math.max(1, qty-1))} className="w-10 h-10 flex items-center justify-center text-[#333333] font-bold hover:bg-[#E8E4E0] rounded-l-xl transition-colors">-</button>
                <span className="w-10 text-center text-[#333333] font-bold text-sm">{qty}</span>
                <button onClick={() => setQty(qty+1)} className="w-10 h-10 flex items-center justify-center text-[#333333] font-bold hover:bg-[#E8E4E0] rounded-r-xl transition-colors">+</button>
              </div>
              <button onClick={handleAdd}
                className={`flex-1 py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                  added ? 'bg-[#B8860B] text-white' : 'bg-[#1A1A1A] hover:bg-[#8B1A1A] text-white'
                }`}>
                {added ? <><CheckCircle size={14} />Added</> : <><ShoppingBag size={14} />Add to Cart</>}
              </button>
            </div>

            {/* Trust badges */}
            <div className="border-t border-[#E8E4E0] pt-4 space-y-2 text-xs text-[#999999]">
              <div className="flex items-center gap-2"><Truck size={12} /> Free shipping on orders over $39</div>
              <div className="flex items-center gap-2"><RefreshCw size={12} /> 30-day hassle-free returns</div>
              <div className="flex items-center gap-2"><Award size={12} /> Authenticity certificate included</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
//  FOOTER
// ============================================================
function Footer({ setCurrentPage }) {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#FAFAF8] border-t border-[#E8E4E0] pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-[#1A1A1A] rounded-full flex items-center justify-center text-white text-sm font-black">祈</div>
              <div>
                <div className="text-[#1A1A1A] font-black text-base leading-none">AI CaiShen</div>
                <div className="text-[#B8860B] text-[9px] tracking-[0.2em] uppercase">Eastern Fortune Art</div>
              </div>
            </div>
            <p className="text-[#999999] text-xs leading-6 font-light mb-5">
              AI-forged Eastern fortune culture reaching 36+ countries.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-white border border-[#E8E4E0] flex items-center justify-center text-[#999999] hover:text-[#B8860B] hover:border-[#B8860B] transition-all">
                <InstagramIcon size={14} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <div className="text-[#1A1A1A] font-semibold text-sm mb-5">Shop</div>
            <div className="space-y-3">
              {[['All Pieces', 'shop'], ['Our Story', 'story'], ['Contact', 'contact']].map(([label, key]) => (
                <button key={key} onClick={() => setCurrentPage(key)}
                  className="block text-[#999999] hover:text-[#B8860B] text-xs transition-colors">{label}</button>
              ))}
            </div>
          </div>

          {/* Support */}
          <div>
            <div className="text-[#1A1A1A] font-semibold text-sm mb-5">Support</div>
            <div className="space-y-3">
              {['Shipping Info', 'Returns & Exchanges', 'FAQ', 'Privacy Policy'].map(l => (
                <a key={l} href="#" className="block text-[#999999] hover:text-[#B8860B] text-xs transition-colors">{l}</a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="text-[#1A1A1A] font-semibold text-sm mb-5">Contact</div>
            <div className="space-y-3 text-[#999999] text-xs font-light">
              <div>hello@blingjew.com</div>
              <div>Hong Kong SAR</div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#E8E4E0] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[#BBBBBB] text-xs font-light">
            © {year} CaiShen · blingjew.com · All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.0.0/flags/4x3/hk.svg" alt="HK" className="h-3.5 opacity-40 rounded-sm" />
            <img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.0.0/flags/4x3/gb.svg" alt="UK" className="h-3.5 opacity-40 rounded-sm" />
            <img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.0.0/flags/4x3/us.svg" alt="US" className="h-3.5 opacity-40 rounded-sm" />
            <img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.0.0/flags/4x3/au.svg" alt="AU" className="h-3.5 opacity-40 rounded-sm" />
            <img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.0.0/flags/4x3/fr.svg" alt="FR" className="h-3.5 opacity-40 rounded-sm" />
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================================
//  CART SIDEBAR
// ============================================================
function CartSidebar({ items, onClose, onRemove, onUpdateQty, onCheckout, total }) {
  const [promo, setPromo] = useState('');
  const [discount, setDiscount] = useState(0);

  const handlePromo = () => {
    if (promo.toUpperCase() === 'FIRST10') { setDiscount(0.10); setPromo(''); }
    else if (promo.toUpperCase() === 'CAISHEN20') { setDiscount(0.20); setPromo(''); }
  };

  const final = total * (1 - discount);

  if (!items.length) return (
    <div className="fixed inset-0 z-50 bg-white flex justify-end" onClick={onClose}>
      <div className="w-full max-w-md bg-white border-l border-[#E8E4E0] h-full flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-[#E8E4E0]">
          <h2 className="text-[#1A1A1A] text-lg font-black">Your Cart</h2>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-[#FAFAF8] flex items-center justify-center text-[#666666]"><X size={15} /></button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
          <ShoppingBag size={48} className="text-[#CCCCCC] mb-4" />
          <div className="text-[#666666] text-sm mb-2">Your cart is empty</div>
          <div className="text-[#BBBBBB] text-xs">Add something beautiful</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 bg-[#FAFAF8]/80 backdrop-blur-sm flex justify-end" onClick={onClose}>
      <div className="w-full max-w-md bg-white border-l border-[#E8E4E0] h-full flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-[#E8E4E0]">
          <h2 className="text-[#1A1A1A] text-lg font-black">Your Cart ({items.reduce((s,i) => s+i.qty, 0)})</h2>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-[#FAFAF8] flex items-center justify-center text-[#666666]"><X size={15} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.map(item => (
            <div key={item.id} className="flex gap-4 bg-[#FAFAF8] border border-[#E8E4E0] rounded-2xl p-4">
              <img
                src={item.images?.[0] || item.image}
                alt={item.name}
                className="w-20 h-20 rounded-xl object-cover bg-[#FAFAF8] shrink-0"
                onError={e => e.target.style.display='none'}
              />
              <div className="flex-1 min-w-0">
                <div className="text-[#1A1A1A] text-sm font-semibold truncate">{item.nameEn || item.name}</div>
                <div className="text-[#B8860B] text-sm font-bold mt-0.5">${item.price}</div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center bg-white border border-[#E8E4E0] rounded-lg">
                    <button onClick={() => onUpdateQty(item.id, item.qty - 1)} className="w-7 h-7 flex items-center justify-center text-[#333333] hover:bg-[#F5F1ED] rounded-lg transition-colors"><Minus size={10} /></button>
                    <span className="text-[#333333] text-xs font-bold w-6 text-center">{item.qty}</span>
                    <button onClick={() => onUpdateQty(item.id, item.qty + 1)} className="w-7 h-7 flex items-center justify-center text-[#333333] hover:bg-[#F5F1ED] rounded-lg transition-colors"><Plus size={10} /></button>
                  </div>
                  <button onClick={() => onRemove(item.id)} className="text-[#BBBBBB] hover:text-[#666666] text-xs transition-colors">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-[#E8E4E0] space-y-4">
          <div className="flex gap-2">
            <input
              value={promo}
              onChange={e => setPromo(e.target.value)}
              placeholder="Promo code"
              className="flex-1 bg-[#FAFAF8] border border-[#E8E4E0] text-[#333333] placeholder-[#BBBBBB] px-3 py-2.5 rounded-xl text-xs focus:outline-none focus:border-[#B8860B] transition-colors"
            />
            <button onClick={handlePromo}
              className="bg-[#FAFAF8] hover:bg-[#E8E4E0] text-[#333333] px-4 py-2.5 rounded-xl text-xs font-medium transition-colors">
              Apply
            </button>
          </div>
          {discount > 0 && (
            <div className="text-[#B8860B] text-xs text-center font-medium">Code applied: {Math.round(discount*100)}% off</div>
          )}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-[#999999]"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
            {discount > 0 && <div className="flex justify-between text-xs text-[#B8860B]"><span>Discount</span><span>-${(total*discount).toFixed(2)}</span></div>}
            <div className="flex justify-between text-base font-black text-[#1A1A1A] pt-2 border-t border-[#E8E4E0]">
              <span>Total</span>
              <span className="text-[#B8860B]">${final.toFixed(2)}</span>
            </div>
          </div>
          <button onClick={onCheckout} disabled={!items.length}
            className="w-full py-4 bg-[#1A1A1A] hover:bg-[#8B1A1A] disabled:opacity-40 text-white font-bold rounded-xl transition-colors text-sm flex items-center justify-center gap-2">
            <CreditCard size={14} /> Secure Checkout
          </button>
          <div className="flex items-center justify-center gap-4 text-[#BBBBBB] text-[10px]">
            <span className="flex items-center gap-1"><ShieldCheck size={10} /> Secure</span>
            <span className="flex items-center gap-1"><Truck size={10} /> $39+ Free Ship</span>
            <span className="flex items-center gap-1"><RefreshCw size={10} /> 30-Day</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
//  CART HOOK
// ============================================================
function useCart() {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('caishen_cart') || '[]'); }
    catch { return []; }
  });

  const save = (newItems) => { setItems(newItems); localStorage.setItem('caishen_cart', JSON.stringify(newItems)); };

  const addItem = useCallback((product, qty = 1) => {
    setItems(prev => {
      const exists = prev.find(i => i.id === product.id);
      const updated = exists
        ? prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i)
        : [...prev, { ...product, qty }];
      localStorage.setItem('caishen_cart', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeItem = useCallback((id) => {
    setItems(prev => {
      const u = prev.filter(i => i.id !== id);
      localStorage.setItem('caishen_cart', JSON.stringify(u));
      return u;
    });
  }, []);

  const updateQty = useCallback((id, qty) => {
    if (qty < 1) return removeItem(id);
    setItems(prev => {
      const u = prev.map(i => i.id === id ? { ...i, qty } : i);
      localStorage.setItem('caishen_cart', JSON.stringify(u));
      return u;
    });
  }, [removeItem]);

  const clearCart = useCallback(() => { setItems([]); localStorage.removeItem('caishen_cart'); }, []);
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  return { items, addItem, removeItem, updateQty, clearCart, total };
}

// ============================================================
//  MAIN APP
// ============================================================
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { items, addItem, removeItem, updateQty, clearCart, total } = useCart();
  const { products, loading, refresh } = useProducts();
  const cartCount = items.reduce((s, i) => s + i.qty, 0);

  const handleCheckout = async () => {
    if (!items.length) return;
    setShowCart(false);
    setCurrentPage('home');
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: items.map(i => ({ id: i.id, name: i.name, price: i.price, qty: i.qty })), total }),
      });
      const data = await res.json();
      if (data.url) { window.location.href = data.url; clearCart(); }
      else alert(data.error || 'Checkout failed. Please try again.');
    } catch { alert('Checkout failed. Please try again.'); }
  };

  const handleViewProduct = (product) => setSelectedProduct(product);
  const handleCloseModal = () => setSelectedProduct(null);
  const handleAddToCart = (product, qty = 1) => { addItem(product, qty); setShowCart(true); handleCloseModal(); };

  useEffect(() => { window.scrollTo(0, 0); }, [currentPage]);

  if (currentPage === 'admin') return <AdminPanel onBack={() => setCurrentPage('home')} onProductsUpdated={refresh} />;

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#333333]">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} cartCount={cartCount} setShowCart={setShowCart} />

      {currentPage === 'home' && (
        <>
          <Hero setCurrentPage={setCurrentPage} />
          <ServicesBar />
          <ProductGrid products={products} onViewProduct={handleViewProduct} onQuickAdd={addItem} />
          <CultureSection setCurrentPage={setCurrentPage} />
          <ReviewsSection />
          <Newsletter />
        </>
      )}

      {currentPage === 'shop' && (
        <ProductGrid products={products} onViewProduct={handleViewProduct} onQuickAdd={addItem} />
      )}

      {currentPage === 'story' && <StoryPage setCurrentPage={setCurrentPage} />}
      {currentPage === 'contact' && <ContactPage />}

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} onAddToCart={handleAddToCart} />
      )}

      {showCart && (
        <CartSidebar
          items={items}
          onClose={() => setShowCart(false)}
          onRemove={removeItem}
          onUpdateQty={updateQty}
          onCheckout={handleCheckout}
          total={total}
        />
      )}

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
