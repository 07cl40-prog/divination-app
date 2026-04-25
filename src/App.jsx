import React, { useState, useEffect, useCallback } from 'react';
import { ShoppingBag, Menu, X, ChevronRight, Star, Heart, Truck, ShieldCheck, RefreshCw, Globe, ArrowRight, CheckCircle, Mail, MapPin, Clock, Sparkles, Send, Minus, Plus, CreditCard, Loader, Award, Users, Globe2, BookOpen, Play } from 'lucide-react';
import AdminPanel from './admin/AdminPanel';

const InstagramIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

// ============================================================
//  CaiShen — AI财神文创 | blingjew.com
//  Dark Luxury Edition — Inspired by ichtea.com
//  东方奢雅 × AI未来感 × 深色奢华
// ============================================================

// Color Palette
const COLORS = {
  bgDark: '#0a0a0a',
  bgCard: '#141414',
  bgElevated: '#1a1a1a',
  border: '#2a2a2a',
  gold: '#c9a961',
  goldLight: '#d4b978',
  goldDark: '#8b7355',
  textPrimary: '#f5f1ed',
  textSecondary: '#a0a0a0',
  textMuted: '#666666',
  accentRed: '#8B1A1A',
};

// Products loaded dynamically from public/data/products.json
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

const REVIEWS = [
  { name: 'Linda W.', location: 'Los Angeles, USA', text: 'Absolutely stunning! The AI-generated patterns are unlike anything I have seen. My office colleagues all asked where I got it.', rating: 5, product: '毛絨掛件款' },
  { name: 'Michael C.', location: 'London, UK', text: 'Fast shipping to UK and the packaging was luxurious. The resin ornament sits proudly on my desk. Highly recommend!', rating: 5, product: '樹膠擺件款' },
  { name: 'Sophie L.', location: 'Toronto, Canada', text: 'Bought as a Chinese New Year gift for my parents. They absolutely loved it. The quality exceeded expectations.', rating: 5, product: '文曲星禮盒' },
  { name: 'James K.', location: 'Sydney, Australia', text: 'The AI aesthetic is fascinating — traditional Chinese culture meets futuristic design. Will buy more!', rating: 5, product: '毛絨掛件款' },
];

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={14} className={i <= rating ? 'fill-[#c9a961] text-[#c9a961]' : 'text-[#333333]'} />
      ))}
    </div>
  );
}

function ProductCard({ product, onView, onQuickAdd }) {
  const [liked, setLiked] = useState(false);
  return (
    <div className="group bg-[#141414] border border-[#2a2a2a] rounded-2xl overflow-hidden hover:border-[#c9a961]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#c9a961]/5 hover:-translate-y-1">
      <div className="relative overflow-hidden bg-[#0a0a0a] aspect-square">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }} />
        <div className="hidden w-full h-full items-center justify-center bg-[#0a0a0a]">
          <div className="text-center">
            <div className="text-5xl mb-2">🧧</div>
            <div className="text-[#c9a961] font-bold">{product.name}</div>
          </div>
        </div>
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.tag && <span className={`${product.tagColor} text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide`}>{product.tag}</span>}
          {product.badge && <span className="bg-[#c9a961] text-[#0a0a0a] text-[10px] font-bold px-2 py-1 rounded-full">{product.badge}</span>}
        </div>
        <button onClick={() => setLiked(!liked)} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-[#1a1a1a]/80 backdrop-blur flex items-center justify-center hover:bg-[#2a2a2a] transition-colors">
          <Heart size={16} className={liked ? 'fill-[#c9a961] text-[#c9a961]' : 'text-[#666666]'} />
        </button>
      </div>
      <div className="p-5">
        <div className="text-[11px] text-[#c9a961]/80 font-medium tracking-[0.15em] uppercase mb-1">{product.nameEn}</div>
        <h3 className="text-[#f5f1ed] font-bold text-sm mb-2 leading-snug">{product.name}</h3>
        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={product.rating} />
          <span className="text-[11px] text-[#666666]">({product.reviews})</span>
        </div>
        <div className="flex items-end gap-3 mb-4">
          <span className="text-xl font-black text-[#c9a961]">${product.price}</span>
          <span className="text-sm text-[#666666] line-through">${product.originalPrice}</span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onView(product)} className="flex-1 py-2.5 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-[#f5f1ed] text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2">
            <ShoppingBag size={13} /> View Details
          </button>
          {onQuickAdd && (
            <button onClick={() => onQuickAdd(product)} className="w-10 h-10 bg-[#c9a961] hover:bg-[#d4b978] text-[#0a0a0a] rounded-xl transition-all flex items-center justify-center">
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
    const handler = () => setScrolled(window.scrollY > 50);
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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#2a2a2a]' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-[70px]">
          <button onClick={() => setCurrentPage('home')} className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-gradient-to-br from-[#8B1A1A] to-[#c9a961] rounded-xl flex items-center justify-center text-lg group-hover:scale-105 transition-transform shadow-lg shadow-[#c9a961]/20">🧧</div>
            <div>
              <div className="font-display text-[#f5f1ed] font-black text-lg tracking-tight leading-none">CaiShen</div>
              <div className="text-[#c9a961]/70 text-[9px] tracking-[0.25em] uppercase">AI Fortune Art</div>
            </div>
          </button>
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <button key={item.key} onClick={() => setCurrentPage(item.key)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${currentPage === item.key ? 'text-[#c9a961] bg-[#1a1a1a]' : 'text-[#a0a0a0] hover:text-[#c9a961] hover:bg-[#1a1a1a]'}`}>
                <span className="block text-[10px] opacity-50 tracking-wider uppercase">{item.labelEn}</span>
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowCart(true)} className="relative w-10 h-10 rounded-xl bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#2a2a2a] flex items-center justify-center text-[#f5f1ed] hover:text-[#c9a961] transition-all">
              <ShoppingBag size={17} />
              {cartCount > 0 && <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#c9a961] text-[#0a0a0a] text-[10px] font-black rounded-full flex items-center justify-center">{cartCount}</span>}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden w-10 h-10 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-[#f5f1ed]">
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>
      {mobileOpen && (
        <div className="lg:hidden bg-[#0a0a0a] border-t border-[#2a2a2a] px-6 py-4 space-y-1">
          {navItems.map(item => (
            <button key={item.key} onClick={() => { setCurrentPage(item.key); setMobileOpen(false); }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${currentPage === item.key ? 'text-[#c9a961] bg-[#1a1a1a]/50' : 'text-[#a0a0a0]'}`}>
              <span className="block text-[10px] opacity-50 uppercase tracking-wider">{item.labelEn}</span>{item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ============================================================
//  DARK LUXURY DESIGN — ichtea-style
// ============================================================

function Hero({ setCurrentPage }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0a]">
      {/* Background gradient */}
      <div className="absolute inset-0" style={{background: 'radial-gradient(ellipse 80% 70% at 70% 40%, rgba(201,169,97,0.08) 0%, transparent 60%)'}}></div>
      <div className="absolute inset-0" style={{background: 'radial-gradient(ellipse 50% 50% at 20% 80%, rgba(139,26,26,0.05) 0%, transparent 50%)'}}></div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{backgroundImage: 'linear-gradient(#c9a961 1px, transparent 1px), linear-gradient(90deg, #c9a961 1px, transparent 1px)', backgroundSize: '100px 100px'}}></div>

      <div className="relative max-w-7xl mx-auto px-8 lg:px-16 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen py-32">
          {/* Left: Brand statement */}
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-px bg-[#c9a961]/60"></div>
              <span className="text-[#c9a961]/80 text-[11px] tracking-[0.3em] uppercase font-medium">Since 2024 · AI Original</span>
            </div>
            
            <h1 className="font-display text-6xl lg:text-8xl font-light text-[#f5f1ed] leading-[0.9] mb-4 tracking-tight">
              <span className="block">CaiShen</span>
              <span className="block text-[#c9a961] font-light text-3xl lg:text-4xl mt-3 tracking-[0.2em]">財神文創</span>
            </h1>
            
            <p className="text-[#a0a0a0] text-lg leading-8 mt-8 mb-12 font-light max-w-md">
              An AI-forged bridge between 1,500 years of Eastern fortune culture and the homes of 36 nations.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button onClick={() => setCurrentPage('shop')} className="bg-[#c9a961] hover:bg-[#d4b978] text-[#0a0a0a] font-semibold px-8 py-4 rounded-xl transition-colors text-sm flex items-center gap-2">
                Explore Collection <ArrowRight size={16} />
              </button>
              <button onClick={() => setCurrentPage('story')} className="border border-[#2a2a2a] text-[#f5f1ed] hover:text-[#c9a961] hover:border-[#c9a961] font-medium px-8 py-4 rounded-xl transition-all text-sm">
                Our Story
              </button>
            </div>
          </div>

          {/* Right: Featured product image */}
          <div className="relative hidden lg:flex justify-center items-center">
            <div className="relative w-[500px] h-[500px]">
              {/* Decorative rings */}
              <div className="absolute inset-0 rounded-full border border-[#2a2a2a] animate-pulse" style={{animationDuration: '6s'}}></div>
              <div className="absolute inset-8 rounded-full border border-[#c9a961]/10 animate-pulse" style={{animationDuration: '10s', animationDelay: '2s'}}></div>
              <div className="absolute inset-16 rounded-full border border-[#c9a961]/5"></div>
              
              {/* Main image container */}
              <div className="absolute inset-12 rounded-3xl overflow-hidden border border-[#2a2a2a] bg-[#141414]">
                <img 
                  src="/products/product1.jpg" 
                  alt="CaiShen AI Fortune Art" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-8xl">🧧</div>';
                  }}
                />
              </div>
              
              {/* Floating badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#141414] border border-[#2a2a2a] rounded-full px-6 py-3 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#c9a961] animate-pulse"></div>
                <span className="text-[#a0a0a0] text-xs tracking-wider">AI GENERATED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-[#666666] text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#c9a961] to-transparent"></div>
      </div>
    </section>
  );
}

function HeritageSection({ setCurrentPage }) {
  const stats = [
    { num: '36+', label: 'Countries', zh: '全球佈局' },
    { num: '50K+', label: 'Families', zh: '家庭信賴' },
    { num: '1,500', label: 'Years', zh: '年文化傳承' },
  ];
  return (
    <section className="py-32 bg-[#0a0a0a] border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1a1a1a]">
          {stats.map(s => (
            <div key={s.label} className="bg-[#0a0a0a] px-8 py-20 text-center group hover:bg-[#0f0f0f] transition-colors">
              <div className="text-6xl lg:text-7xl font-black text-[#c9a961] mb-4 group-hover:scale-105 transition-transform">{s.num}</div>
              <div className="text-[#666666] text-[11px] tracking-[0.2em] uppercase mb-2">{s.label}</div>
              <div className="text-[#a0a0a0] text-sm">{s.zh}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AuthoritySection() {
  return (
    <section className="py-32 bg-[#0a0a0a] border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-px bg-[#c9a961]/40"></div>
            <span className="text-[#c9a961]/80 text-[11px] tracking-[0.3em] uppercase font-medium">Recognition</span>
            <div className="w-16 h-px bg-[#c9a961]/40"></div>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-light text-[#f5f1ed] mb-6">Heritage & Innovation</h2>
          <p className="text-[#a0a0a0] text-lg max-w-2xl mx-auto leading-relaxed">
            Where 1,500 years of Eastern fortune culture meets cutting-edge AI technology
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-[#141414] border border-[#2a2a2a] rounded-3xl p-10 group hover:border-[#c9a961]/30 transition-all">
            <div className="text-5xl mb-6">🏮</div>
            <h3 className="text-2xl font-light text-[#f5f1ed] mb-4">Cultural Heritage</h3>
            <p className="text-[#a0a0a0] leading-7 mb-6">
              The CaiShen faith spans over 1,500 years of Chinese history, representing prosperity and good fortune. 
              Our designs honor this legacy while embracing the digital age.
            </p>
            <div className="flex items-center gap-2 text-[#c9a961] text-sm">
              <span>Learn More</span>
              <ArrowRight size={14} />
            </div>
          </div>
          
          <div className="bg-[#141414] border border-[#2a2a2a] rounded-3xl p-10 group hover:border-[#c9a961]/30 transition-all">
            <div className="text-5xl mb-6">⚡</div>
            <h3 className="text-2xl font-light text-[#f5f1ed] mb-4">AI Innovation</h3>
            <p className="text-[#a0a0a0] leading-7 mb-6">
              Our proprietary AI system was trained on thousands of artifacts — from Dunhuang murals to Ming-Qing lacquerware — 
              generating unique CaiShen aesthetics for the modern era.
            </p>
            <div className="flex items-center gap-2 text-[#c9a961] text-sm">
              <span>Discover Process</span>
              <ArrowRight size={14} />
            </div>
          </div>
        </div>
        
        {/* Media mentions */}
        <div className="mt-20 pt-16 border-t border-[#1a1a1a]">
          <div className="text-center mb-12">
            <span className="text-[#666666] text-[11px] tracking-[0.3em] uppercase">Featured In</span>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-40">
            {['Forbes', 'Vogue', 'TechCrunch', 'Wired', 'Dezeen'].map(brand => (
              <span key={brand} className="text-[#a0a0a0] text-xl font-light tracking-wider">{brand}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductShowcase({ setCurrentPage, products }) {
  const featured = (products || []).slice(0, 4);
  return (
    <section className="py-32 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-16 h-px bg-[#c9a961]/40"></div>
            <span className="text-[#c9a961]/80 text-[11px] tracking-[0.3em] uppercase font-medium">Featured Collection</span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-display text-4xl lg:text-6xl font-light text-[#f5f1ed] mb-4">The Collection</h2>
              <p className="text-[#a0a0a0] text-lg max-w-xl">Each piece is uniquely generated by AI, blending ancient symbolism with contemporary aesthetics.</p>
            </div>
            <button onClick={() => setCurrentPage('shop')} className="hidden lg:flex items-center gap-2 text-[#c9a961] hover:text-[#d4b978] text-sm font-medium transition-colors group">
              View All {products?.length || 0} Pieces <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((p) => (
            <div key={p.id} className="group cursor-pointer" onClick={() => setCurrentPage('shop')}>
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-[#141414] border border-[#2a2a2a] mb-6 group-hover:border-[#c9a961]/30 transition-all">
                <img 
                  src={p.images[0]} 
                  alt={p.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-6xl">🧧</div>';
                  }}
                />
              </div>
              <div className="text-[#c9a961]/80 text-[10px] tracking-[0.2em] uppercase mb-2">{p.nameEn}</div>
              <h3 className="text-xl font-light text-[#f5f1ed] mb-2">{p.name}</h3>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-black text-[#c9a961]">${p.price}</span>
                <span className="text-sm text-[#666666] line-through">${p.originalPrice}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center lg:hidden">
          <button onClick={() => setCurrentPage('shop')} className="inline-flex items-center gap-2 text-[#c9a961] hover:text-[#d4b978] text-sm font-medium transition-colors">
            View All {products?.length || 0} Pieces <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { icon: <Truck size={20} />, label: 'Worldwide Shipping', sub: 'Orders over $39' },
    { icon: <ShieldCheck size={20} />, label: 'Authenticity Guaranteed', sub: 'Certificate included' },
    { icon: <RefreshCw size={20} />, label: '30-Day Returns', sub: 'No questions asked' },
    { icon: <Award size={20} />, label: 'Limited Edition', sub: 'Every piece unique' },
  ];
  return (
    <section className="py-24 bg-[#0a0a0a] border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {features.map((f, i) => (
            <div key={i} className="flex items-start gap-4 group">
              <div className="text-[#c9a961]/70 mt-1 shrink-0 group-hover:text-[#c9a961] transition-colors">{f.icon}</div>
              <div>
                <div className="text-[#f5f1ed] text-sm font-medium">{f.label}</div>
                <div className="text-[#666666] text-xs mt-1">{f.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  return (
    <section className="py-32 bg-[#0a0a0a] border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-16 h-px bg-[#c9a961]/40"></div>
            <span className="text-[#c9a961]/80 text-[11px] tracking-[0.3em] uppercase font-medium">Testimonials</span>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-light text-[#f5f1ed]">What They Say</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {REVIEWS.slice(0, 4).map((r, i) => (
            <div key={i} className="bg-[#141414] border border-[#2a2a2a] rounded-3xl p-8 lg:p-10 hover:border-[#c9a961]/20 transition-all">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={14} className="fill-[#c9a961] text-[#c9a961]" />
                ))}
              </div>
              <p className="text-[#a0a0a0] text-lg leading-8 mb-8 font-light">"{r.text}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[#f5f1ed] font-medium">{r.name}</div>
                  <div className="text-[#666666] text-sm">{r.location}</div>
                </div>
                <div className="text-[#c9a961]/60 text-xs tracking-wider uppercase">{r.product}</div>
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
  const handleSubmit = (e) => { e.preventDefault(); if(email) setSubmitted(true); };
  return (
    <section className="py-32 bg-[#0a0a0a] border-t border-[#1a1a1a]">
      <div className="max-w-3xl mx-auto px-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-16 h-px bg-[#c9a961]/40"></div>
          <span className="text-[#c9a961]/80 text-[11px] tracking-[0.3em] uppercase font-medium">Stay Connected</span>
          <div className="w-16 h-px bg-[#c9a961]/40"></div>
        </div>
        <h2 className="font-display text-4xl lg:text-5xl font-light text-[#f5f1ed] mb-6">Join the Circle</h2>
        <p className="text-[#a0a0a0] text-lg mb-12 max-w-xl mx-auto">Be the first to know about new collections, exclusive offers, and fortune tips.</p>
        {submitted ? (
          <div className="bg-[#141414] border border-[#c9a961]/30 text-[#c9a961] rounded-2xl px-8 py-6 text-lg">Thank you! You'll hear from us soon.</div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required className="flex-1 bg-[#141414] border border-[#2a2a2a] text-[#f5f1ed] placeholder-[#666666] px-6 py-4 rounded-xl text-sm focus:outline-none focus:border-[#c9a961] transition-colors" />
            <button type="submit" className="bg-[#c9a961] hover:bg-[#d4b978] text-[#0a0a0a] font-semibold px-8 py-4 rounded-xl transition-colors text-sm flex items-center justify-center gap-2 shrink-0">
              <Send size={16} /> Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

// ============================================================
//  Shop / Modal / Story / Contact / Footer
// ============================================================

function ShopPage({ setCurrentPage, onViewProduct, onQuickAdd, products }) {
  const [filter, setFilter] = useState('all');
  const filters = ['all', '掛件', '擺件', '禮盒'];
  const filtered = filter === 'all' ? (products || []) : (products || []).filter(p => p.name.includes(filter));
  return (
    <div className="pt-32 pb-32 bg-[#0a0a0a] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-[#c9a961]/40"></div>
            <span className="text-[#c9a961]/80 text-[11px] tracking-[0.3em] uppercase font-medium">Complete Collection</span>
            <div className="w-12 h-px bg-[#c9a961]/40"></div>
          </div>
          <h2 className="font-display text-5xl lg:text-6xl font-light text-[#f5f1ed] mb-4">全部商品</h2>
          <p className="text-[#a0a0a0] text-lg">AI 獨家系列 · {products?.length || 0} Products</p>
        </div>
        
        <div className="flex justify-center gap-3 mb-16 flex-wrap">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${filter === f ? 'bg-[#c9a961] text-[#0a0a0a]' : 'bg-[#141414] text-[#a0a0a0] border border-[#2a2a2a] hover:border-[#c9a961]/50'}`}>
              {f === 'all' ? '全部 All' : f}
            </button>
          ))}
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0a0a]/95 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-[#141414] border border-[#2a2a2a] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="grid md:grid-cols-2 gap-0">
          <div className="bg-[#0a0a0a] p-8">
            <div className="aspect-square bg-[#141414] rounded-2xl overflow-hidden mb-6 flex items-center justify-center border border-[#2a2a2a]">
              <img src={product.images[activeImg]} alt={product.name} className="w-full h-full object-cover" onError={e => { e.target.style.display='none'; }} />
            </div>
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)} className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${activeImg === i ? 'border-[#c9a961]' : 'border-[#2a2a2a] opacity-50 hover:opacity-100'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" onError={e => e.target.style.display='none'} />
                </button>
              ))}
            </div>
          </div>
          <div className="p-8 lg:p-10">
            <button onClick={onClose} className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center text-[#a0a0a0] hover:text-[#f5f1ed] float-right transition-colors"><X size={18} /></button>
            <div className="text-xs text-[#c9a961]/80 font-medium tracking-[0.2em] uppercase mb-3">{product.nameEn}</div>
            <h2 className="text-3xl font-light text-[#f5f1ed] mb-2">{product.name}</h2>
            <div className="flex items-center gap-3 mb-6">
              <StarRating rating={product.rating} />
              <span className="text-xs text-[#666666]">{product.reviews} reviews</span>
            </div>
            <div className="flex items-end gap-4 mb-8">
              <span className="text-4xl font-black text-[#c9a961]">${product.price}</span>
              <span className="text-lg text-[#666666] line-through">${product.originalPrice}</span>
              <span className="bg-[#c9a961]/10 text-[#c9a961] text-sm font-bold px-3 py-1 rounded-full">-{Math.round((1-product.price/product.originalPrice)*100)}%</span>
            </div>
            <p className="text-[#a0a0a0] leading-relaxed mb-8">{product.description}</p>
            <ul className="space-y-3 mb-8">
              {product.features.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-[#f5f1ed]"><CheckCircle size={14} className="text-[#c9a961] shrink-0" />{f}</li>
              ))}
            </ul>
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl">
                <button onClick={() => setQty(Math.max(1, qty-1))} className="w-12 h-12 flex items-center justify-center text-[#f5f1ed] font-bold text-lg hover:bg-[#2a2a2a] rounded-l-xl transition-colors">-</button>
                <span className="w-12 text-center text-[#f5f1ed] font-bold">{qty}</span>
                <button onClick={() => setQty(qty+1)} className="w-12 h-12 flex items-center justify-center text-[#f5f1ed] font-bold text-lg hover:bg-[#2a2a2a] rounded-r-xl transition-colors">+</button>
              </div>
              <button onClick={handleAdd} className={`flex-1 py-4 rounded-xl font-bold text-sm transition-all ${added ? 'bg-[#c9a961] text-[#0a0a0a]' : 'bg-[#c9a961] hover:bg-[#d4b978] text-[#0a0a0a]'}`}>
                {added ? <><CheckCircle size={16} className="inline mr-2" />Added to Cart</> : <><ShoppingBag size={16} className="inline mr-2" />Add to Cart</>}
              </button>
            </div>
            <div className="border-t border-[#2a2a2a] pt-6 space-y-3 text-xs text-[#666666]">
              <div className="flex items-center gap-3"><Truck size={14} /> 全球免運 · Orders over $39</div>
              <div className="flex items-center gap-3"><RefreshCw size={14} /> 30天退換保障</div>
              <div className="flex items-center gap-3"><Award size={14} /> 正品保障 · 珍藏證書</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StoryPage({ setCurrentPage }) {
  return (
    <div className="pt-32 pb-32 bg-[#0a0a0a] min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-24">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-[#c9a961]/40"></div>
            <span className="text-[#c9a961]/80 text-[11px] tracking-[0.3em] uppercase font-medium">Our Story</span>
            <div className="w-12 h-px bg-[#c9a961]/40"></div>
          </div>
          <h2 className="font-display text-5xl lg:text-6xl font-light text-[#f5f1ed] mb-6">品牌故事</h2>
          <p className="text-[#a0a0a0] text-lg max-w-2xl mx-auto">Where ancient wisdom meets artificial intelligence</p>
        </div>
        
        <div className="space-y-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="text-[#c9a961]/80 text-[11px] tracking-[0.3em] uppercase mb-4">Heritage</div>
              <h3 className="text-3xl font-light text-[#f5f1ed] mb-6">1,500 Years of Faith</h3>
              <p className="text-[#a0a0a0] leading-8 mb-6">
                The CaiShen faith has over 1,500 years of history in China, and is one of the most cherished cultural symbols 
                for Chinese communities worldwide. From ancient temples to modern homes, the God of Wealth has been a beacon 
                of prosperity and good fortune.
              </p>
              <p className="text-[#a0a0a0] leading-8">
                CaiShen is dedicated to reimagining this cultural treasure through AI technology, creating artifacts that 
                honor tradition while embracing the future.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-[#141414] border border-[#2a2a2a]">
                <div className="w-full h-full flex items-center justify-center text-8xl">🏮</div>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-[#141414] border border-[#2a2a2a]">
                <div className="w-full h-full flex items-center justify-center text-8xl">⚡</div>
              </div>
            </div>
            <div>
              <div className="text-[#c9a961]/80 text-[11px] tracking-[0.3em] uppercase mb-4">Innovation</div>
              <h3 className="text-3xl font-light text-[#f5f1ed] mb-6">Powered by AI</h3>
              <p className="text-[#a0a0a0] leading-8 mb-6">
                We trained a proprietary AI system on thousands of artifacts — from Dunhuang murals to Song dynasty porcelain, 
                from Ming-Qing lacquerware to contemporary design — to generate unique CaiShen aesthetic totems for the digital age.
              </p>
              <p className="text-[#a0a0a0] leading-8">
                Each piece is a collaboration between human creativity and machine intelligence, resulting in designs that 
                have never existed before, yet feel deeply familiar.
              </p>
            </div>
          </div>
          
          <div className="bg-[#141414] border border-[#2a2a2a] rounded-3xl p-10 lg:p-16 text-center">
            <div className="text-[#c9a961]/80 text-[11px] tracking-[0.3em] uppercase mb-6">The Beginning</div>
            <h3 className="font-display text-3xl font-light text-[#f5f1ed] mb-8">From a Living Room to 36 Countries</h3>
            <div className="text-[#a0a0a0] leading-8 max-w-2xl mx-auto space-y-6">
              <p>CaiShen was born in a living room overseas. Our founder grew tired of Western stereotypes about Eastern culture 
              and decided to use cutting-edge AI to reinterpret the sacred image of CaiShen.</p>
              <p>From the first sketch to the first finished product took 8 months of relentless iteration. Today, CaiShen has 
              reached tens of thousands of families across 36 countries, each piece carrying a piece of home to those far away.</p>
            </div>
            <blockquote className="mt-12 border-l-2 border-[#c9a961]/40 pl-8 text-left max-w-xl mx-auto">
              <p className="text-[#f5f1ed] italic text-lg leading-8">"We believe: wealth is energy, faith is the medium, and technology is the bridge."</p>
              <p className="text-[#c9a961] text-sm mt-4">— CaiShen Founder</p>
            </blockquote>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-6 mt-24">
          {[['36+', 'Countries', '全球佈局'], ['50K+', 'Families', '家庭信賴'], ['4.9', 'Rating', '用戶評分']].map(([num, label, zh]) => (
            <div key={label} className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-8 text-center">
              <div className="text-3xl font-black text-[#c9a961] mb-2">{num}</div>
              <div className="text-[#a0a0a0] text-[11px] tracking-wider uppercase mb-1">{label}</div>
              <div className="text-[#666666] text-xs">{zh}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const handleSubmit = (e) => { e.preventDefault(); setSent(true); };
  return (
    <div className="pt-32 pb-32 bg-[#0a0a0a] min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-[#c9a961]/40"></div>
            <span className="text-[#c9a961]/80 text-[11px] tracking-[0.3em] uppercase font-medium">Contact</span>
            <div className="w-12 h-px bg-[#c9a961]/40"></div>
          </div>
          <h2 className="font-display text-5xl lg:text-6xl font-light text-[#f5f1ed] mb-6">聯絡我們</h2>
          <p className="text-[#a0a0a0] text-lg">We'd love to hear from you</p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          {[
            { icon: <Mail size={24} />, title: 'Email', content: 'hello@blingjew.com' },
            { icon: <MapPin size={24} />, title: 'Address', content: 'Hong Kong 文運亨通有限公司' },
            { icon: <Clock size={24} />, title: 'Hours', content: 'Mon-Fri 9am-6pm HKT' },
          ].map(({ icon, title, content }) => (
            <div key={title} className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-8 text-center hover:border-[#c9a961]/20 transition-all">
              <div className="w-14 h-14 bg-[#1a1a1a] rounded-xl flex items-center justify-center mx-auto mb-6 text-[#c9a961]">{icon}</div>
              <div className="text-[#f5f1ed] font-medium text-sm mb-2">{title}</div>
              <div className="text-[#a0a0a0] text-sm">{content}</div>
            </div>
          ))}
        </div>
        
        <form onSubmit={handleSubmit} className="bg-[#141414] border border-[#2a2a2a] rounded-3xl p-8 lg:p-12">
          {sent ? (
            <div className="text-center py-16">
              <div className="text-[#c9a961] text-6xl mb-6">🧧</div>
              <div className="text-[#f5f1ed] font-light text-2xl mb-4">Message Sent!</div>
              <div className="text-[#a0a0a0]">We will get back to you within 24 hours.</div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <input required placeholder="Your Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="bg-[#0a0a0a] border border-[#2a2a2a] text-[#f5f1ed] placeholder-[#666666] px-5 py-4 rounded-xl text-sm focus:outline-none focus:border-[#c9a961] transition-colors" />
                <input required type="email" placeholder="Email Address" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="bg-[#0a0a0a] border border-[#2a2a2a] text-[#f5f1ed] placeholder-[#666666] px-5 py-4 rounded-xl text-sm focus:outline-none focus:border-[#c9a961] transition-colors" />
              </div>
              <input required placeholder="Subject" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} className="w-full bg-[#0a0a0a] border border-[#2a2a2a] text-[#f5f1ed] placeholder-[#666666] px-5 py-4 rounded-xl text-sm focus:outline-none focus:border-[#c9a961] transition-colors" />
              <textarea required rows={6} placeholder="Your Message" value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full bg-[#0a0a0a] border border-[#2a2a2a] text-[#f5f1ed] placeholder-[#666666] px-5 py-4 rounded-xl text-sm focus:outline-none focus:border-[#c9a961] transition-colors resize-none" />
              <button type="submit" className="w-full bg-[#c9a961] hover:bg-[#d4b978] text-[#0a0a0a] font-semibold py-5 rounded-xl transition-all text-sm">Send Message</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

function Footer({ setCurrentPage }) {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#1a1a1a] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-[#8B1A1A] to-[#c9a961] rounded-xl flex items-center justify-center text-lg">🧧</div>
              <div>
                <div className="font-display text-[#f5f1ed] font-black text-lg tracking-tight">CaiShen</div>
                <div className="text-[#c9a961]/70 text-[9px] tracking-[0.2em] uppercase">AI Fortune Art</div>
              </div>
            </div>
            <p className="text-[#666666] text-sm leading-7 mb-6">AI-forged Eastern fortune culture for homes across 36 nations.</p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-xl bg-[#141414] border border-[#2a2a2a] flex items-center justify-center text-[#a0a0a0] hover:text-[#c9a961] hover:border-[#c9a961]/50 transition-all">
                <InstagramIcon size={18} />
              </a>
            </div>
          </div>
          <div>
            <div className="text-[#f5f1ed] font-medium text-sm mb-6">Shop</div>
            <div className="space-y-4">
              {[
                { label: '全部商品', key: 'shop' },
                { label: '品牌故事', key: 'story' },
                { label: '聯絡我們', key: 'contact' },
              ].map(({ label, key }) => (
                <button key={key} onClick={() => setCurrentPage(key)} className="block text-[#666666] hover:text-[#c9a961] text-sm transition-colors">{label}</button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[#f5f1ed] font-medium text-sm mb-6">Support</div>
            <div className="space-y-4">
              {['Shipping Info', 'Returns & Exchanges', 'FAQ', 'Privacy Policy'].map(l => (
                <a key={l} href="#" className="block text-[#666666] hover:text-[#c9a961] text-sm transition-colors">{l}</a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[#f5f1ed] font-medium text-sm mb-6">Contact</div>
            <div className="space-y-4 text-[#666666] text-sm">
              <div>hello@blingjew.com</div>
              <div>Hong Kong</div>
              <div>文運亨通有限公司</div>
            </div>
          </div>
        </div>
        <div className="border-t border-[#1a1a1a] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[#666666] text-sm">© {year} CaiShen · blingjew.com · All rights reserved.</div>
          <div className="flex items-center gap-4">
            <img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.0.0/flags/4x3/hk.svg" alt="HK" className="h-5 opacity-30 rounded-sm" />
            <img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.0.0/flags/4x3/gb.svg" alt="UK" className="h-5 opacity-30 rounded-sm" />
            <img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.0.0/flags/4x3/us.svg" alt="US" className="h-5 opacity-30 rounded-sm" />
            <img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.0.0/flags/4x3/au.svg" alt="AU" className="h-5 opacity-30 rounded-sm" />
          </div>
        </div>
      </div>
    </footer>
  );
}

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
    setItems(prev => { const u = prev.filter(i => i.id !== id); localStorage.setItem('caishen_cart', JSON.stringify(u)); return u; });
  }, []);
  const updateQty = useCallback((id, qty) => {
    if (qty < 1) return removeItem(id);
    setItems(prev => { const u = prev.map(i => i.id === id ? { ...i, qty } : i); localStorage.setItem('caishen_cart', JSON.stringify(u)); return u; });
  }, [removeItem]);
  const clearCart = useCallback(() => { setItems([]); localStorage.removeItem('caishen_cart'); }, []);
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  return { items, addItem, removeItem, updateQty, clearCart, total };
}

function CartSidebar({ items, onClose, onRemove, onUpdateQty, onCheckout, total }) {
  const [promo, setPromo] = useState('');
  const [discount, setDiscount] = useState(0);
  const handlePromo = () => {
    if (promo.toUpperCase() === 'FIRST10') { setDiscount(0.10); setPromo(''); }
    else if (promo.toUpperCase() === 'CAISHEN20') { setDiscount(0.20); setPromo(''); }
  };
  const final = total * (1 - discount);
  if (!items.length) return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-sm flex justify-end" onClick={onClose}>
      <div className="w-full max-w-md bg-[#0a0a0a] border-l border-[#1a1a1a] h-full flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-[#1a1a1a]">
          <h2 className="font-display text-xl font-light text-[#f5f1ed]">購物車</h2>
          <button onClick={onClose} className="w-10 h-10 rounded-xl bg-[#141414] flex items-center justify-center text-[#a0a0a0] hover:text-[#f5f1ed] transition-colors"><X size={18} /></button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-10">
          <div className="text-6xl mb-6 opacity-20">🧧</div>
          <div className="text-[#666666]">您的購物車是空的</div>
        </div>
      </div>
    </div>
  );
  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-sm flex justify-end" onClick={onClose}>
      <div className="w-full max-w-md bg-[#0a0a0a] border-l border-[#1a1a1a] h-full flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-[#1a1a1a]">
          <h2 className="font-display text-xl font-light text-[#f5f1ed]">購物車 ({items.reduce((s,i) => s+i.qty, 0)})</h2>
          <button onClick={onClose} className="w-10 h-10 rounded-xl bg-[#141414] flex items-center justify-center text-[#a0a0a0] hover:text-[#f5f1ed] transition-colors"><X size={18} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.map(item => (
            <div key={item.id} className="flex gap-4 bg-[#141414] border border-[#2a2a2a] rounded-2xl p-4">
              <img src={item.images ? item.images[0] : item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover bg-[#0a0a0a] shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-[#f5f1ed] text-sm font-medium truncate">{item.name}</div>
                <div className="text-[#c9a961] text-sm font-bold mt-1">${item.price}</div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2 bg-[#0a0a0a] rounded-lg border border-[#2a2a2a]">
                    <button onClick={() => onUpdateQty(item.id, item.qty - 1)} className="w-8 h-8 flex items-center justify-center text-[#f5f1ed] text-xs hover:bg-[#1a1a1a] rounded-l-lg transition-colors"><Minus size={12} /></button>
                    <span className="text-[#f5f1ed] text-xs font-bold w-6 text-center">{item.qty}</span>
                    <button onClick={() => onUpdateQty(item.id, item.qty + 1)} className="w-8 h-8 flex items-center justify-center text-[#f5f1ed] text-xs hover:bg-[#1a1a1a] rounded-r-lg transition-colors"><Plus size={12} /></button>
                  </div>
                  <button onClick={() => onRemove(item.id)} className="text-[#666666] hover:text-[#c9a961] text-xs transition-colors">移除</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-6 border-t border-[#1a1a1a] space-y-4">
          <div className="flex gap-3">
            <input value={promo} onChange={e => setPromo(e.target.value)} placeholder="優惠碼" className="flex-1 bg-[#141414] border border-[#2a2a2a] text-[#f5f1ed] placeholder-[#666666] px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[#c9a961] transition-colors" />
            <button onClick={handlePromo} className="bg-[#141414] hover:bg-[#1a1a1a] border border-[#2a2a2a] text-[#f5f1ed] px-5 py-3 rounded-xl text-sm font-medium transition-colors">套用</button>
          </div>
          {discount > 0 && <div className="text-[#c9a961] text-sm text-center">優惠已套用：-{Math.round(discount*100)}%</div>}
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-[#666666]"><span>小計</span><span>${total.toFixed(2)}</span></div>
            {discount > 0 && <div className="flex justify-between text-sm text-[#c9a961]"><span>節省</span><span>-${(total*discount).toFixed(2)}</span></div>}
            <div className="flex justify-between text-xl font-black text-[#f5f1ed] pt-3 border-t border-[#2a2a2a]"><span>合計</span><span className="text-[#c9a961]">${final.toFixed(2)}</span></div>
          </div>
          <button onClick={onCheckout} disabled={items.length === 0} className="w-full py-4 bg-[#c9a961] hover:bg-[#d4b978] disabled:opacity-50 text-[#0a0a0a] font-bold rounded-xl transition-all text-sm flex items-center justify-center gap-2">
            <CreditCard size={16} /> Secure Checkout
          </button>
          <div className="flex items-center justify-center gap-6 text-[#666666] text-xs">
            <span>🔒 SSL加密</span><span>🚚 全球免運 $39+</span><span>↩️ 30天退換</span>
          </div>
        </div>
      </div>
    </div>
  );
}

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
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: items.map(i => ({ id: i.id, name: i.name, price: i.price, qty: i.qty })), total }),
      });
      const data = await res.json();
      if (data.url) { window.location.href = data.url; clearCart(); }
      else alert(data.error || 'Checkout failed. Please try again.');
    } catch { alert('Checkout failed. Please try again.'); }
  };
  const handleViewProduct = (product) => { setSelectedProduct(product); };
  const handleCloseModal = () => setSelectedProduct(null);
  const handleAddToCart = (product, qty = 1) => { addItem(product, qty); setShowCart(true); handleCloseModal(); };
  useEffect(() => { window.scrollTo(0, 0); }, [currentPage]);
  if (currentPage === 'admin') return <AdminPanel onBack={() => setCurrentPage('home')} onProductsUpdated={refresh} />;
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f1ed] font-sans">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} cartCount={cartCount} setShowCart={setShowCart} />
      {currentPage === 'home' && <><Hero setCurrentPage={setCurrentPage} /><HeritageSection /><AuthoritySection /><ProductShowcase setCurrentPage={setCurrentPage} products={products} /><Features /><ReviewsSection /><Newsletter /></>}
      {currentPage === 'shop' && <ShopPage setCurrentPage={setCurrentPage} onViewProduct={handleViewProduct} onQuickAdd={addItem} products={products} />}
      {currentPage === 'story' && <StoryPage setCurrentPage={setCurrentPage} />}
      {currentPage === 'contact' && <ContactPage />}
      {selectedProduct && <ProductModal product={selectedProduct} onClose={handleCloseModal} onAddToCart={handleAddToCart} />}
      {showCart && <CartSidebar items={items} onClose={() => setShowCart(false)} onRemove={removeItem} onUpdateQty={updateQty} onCheckout={handleCheckout} total={total} />}
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
