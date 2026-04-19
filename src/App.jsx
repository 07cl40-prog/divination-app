
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
        <Star key={i} size={14} className={i <= rating ? 'fill-[#FFB800] text-[#B8860B]' : 'text-[#333333]'} />
      ))}
    </div>
  );
}

function ProductCard({ product, onView, onQuickAdd }) {
  const [liked, setLiked] = useState(false);
  return (
    <div className="group bg-gradient-to-b from-[#F5F1ED] to-[#FAF7F4] border border-[#E5E0DB] rounded-2xl overflow-hidden hover:border-[#8B1A1A]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#D4B978]/10 hover:-translate-y-0.5">
      <div className="relative overflow-hidden bg-[#F5F1ED] aspect-square">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }} />
        <div className="hidden w-full h-full items-center justify-center bg-gradient-to-br from-[#FAF7F4] to-[#F5F1ED]">
          <div className="text-center">
            <div className="text-5xl mb-2">🧧</div>
            <div className="text-[#B8860B] font-bold">{product.name}</div>
          </div>
        </div>
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.tag && <span className={`${product.tagColor} text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide`}>{product.tag}</span>}
          {product.badge && <span className="bg-[#8B1A1A] text-white text-[10px] font-bold px-2 py-1 rounded-full">{product.badge}</span>}
        </div>
        <button onClick={() => setLiked(!liked)} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-[#F5F1ED] backdrop-blur flex items-center justify-center hover:bg-[#F5F1ED] transition-colors">
          <Heart size={16} className={liked ? 'fill-[#FF4444] text-[#B8860B]' : 'text-[#999999]'} />
        </button>
      </div>
      <div className="p-5">
        <div className="text-[11px] text-[#B8860B]/80 font-medium tracking-[0.15em] uppercase mb-1">{product.nameEn}</div>
        <h3 className="text-[#333333] font-bold text-sm mb-2 leading-snug">{product.name}</h3>
        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={product.rating} />
          <span className="text-[11px] text-[#666666]">({product.reviews})</span>
        </div>
        <div className="flex items-end gap-3 mb-4">
          <span className="text-xl font-black text-[#B8860B]">${product.price}</span>
          <span className="text-sm text-[#666666] line-through">${product.originalPrice}</span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onView(product)} className="flex-1 py-2.5 bg-[#F5F1ED] hover:bg-[#FAF7F4] text-[#333333] text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2">
            <ShoppingBag size={13} /> View Details
          </button>
          {onQuickAdd && (
            <button onClick={() => onQuickAdd(product)} className="w-10 h-10 bg-[#B8860B] hover:bg-[#D4B978] text-white rounded-xl transition-all flex items-center justify-center">
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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#F5F1ED] border-b border-[#E5E0DB]' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-[70px]">
          <button onClick={() => setCurrentPage('home')} className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-gradient-to-br from-[#8B1A1A] to-[#B8860B] rounded-xl flex items-center justify-center text-lg group-hover:scale-105 transition-transform shadow-lg shadow-[#D4B978]/20">🧧</div>
            <div>
              <div className="font-display text-[#333333] font-black text-lg tracking-tight leading-none">CaiShen</div>
              <div className="text-[#B8860B]/70 text-[9px] tracking-[0.25em] uppercase">AI Fortune Art</div>
            </div>
          </button>
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <button key={item.key} onClick={() => setCurrentPage(item.key)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${currentPage === item.key ? 'text-[#B8860B] bg-[#FAF7F4]' : 'text-[#666666] hover:text-[#B8860B] hover:bg-[#FAF7F4]'}`}>
                <span className="block text-[10px] opacity-50 tracking-wider uppercase">{item.labelEn}</span>
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowCart(true)} className="relative w-10 h-10 rounded-xl bg-[#F5F1ED] hover:bg-[#FAF7F4] border border-[#D4B978] flex items-center justify-center text-[#333333] hover:text-[#B8860B] transition-all">
              <ShoppingBag size={17} />
              {cartCount > 0 && <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-700 text-white text-[10px] font-black rounded-full flex items-center justify-center">{cartCount}</span>}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden w-10 h-10 rounded-xl bg-[#F5F1ED] border border-[#E5E0DB] flex items-center justify-center text-[#333333]">
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>
      {mobileOpen && (
        <div className="lg:hidden bg-[#F5F1ED] border-t border-[#E5E0DB] px-6 py-4 space-y-1">
          {navItems.map(item => (
            <button key={item.key} onClick={() => { setCurrentPage(item.key); setMobileOpen(false); }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${currentPage === item.key ? 'text-[#B8860B] bg-[#FAF7F4]/50' : 'text-[#666666]'}`}>
              <span className="block text-[10px] opacity-50 uppercase tracking-wider">{item.labelEn}</span>{item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ============================================================
//  NEW DESIGN — ichtea-style luxury minimalism
// ============================================================

function Hero({ setCurrentPage }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-[#F5F1ED]"></div>
      <div className="absolute inset-0" style={{background: 'radial-gradient(ellipse 70% 60% at 65% 50%, rgba(184,134,11,0.05) 0%, transparent 70%)'}}></div>

      <div className="relative max-w-7xl mx-auto px-8 lg:px-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-24">
          {/* Left: Brand statement */}
          <div className="max-w-lg">
            <div className="text-[#B8860B]/60 text-[11px] tracking-[0.3em] uppercase font-medium mb-8">Eastern Fortune 路 AI Original</div>
            <h1 className="font-display text-6xl lg:text-7xl font-light text-[#B8860B] leading-[0.95] mb-2 tracking-tight">
              <span className="block text-[#B8860B]">CaiShen</span>
              <span className="block text-[#666666] font-light text-4xl lg:text-5xl mt-1">財神文創</span>
            </h1>
            <p className="text-[#666666] text-base leading-8 mt-8 mb-10 font-light">
              An AI-forged bridge between 1,500 years of Eastern fortune culture<br className="hidden sm:block" />
              and the homes of 36 nations.
            </p>
            <div className="flex gap-4">
              <button onClick={() => setCurrentPage('shop')} className="bg-[#8B1A1A] hover:bg-[#A84444] text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-sm flex items-center gap-2">
                Explore Collection <ArrowRight size={14} />
              </button>
              <button onClick={() => setCurrentPage('story')} className="border border-[#E5E0DB] text-[#666666] hover:text-[#B8860B] hover:border-[#8B1A1A] font-medium px-8 py-3.5 rounded-xl transition-all text-sm">
                Our Story
              </button>
            </div>
          </div>

          {/* Right: Video orb */}
          <div className="relative hidden lg:flex justify-center items-center">
            <div className="relative w-96 h-96">
              <div className="absolute inset-0 rounded-full border border-[#E5E0DB] animate-pulse" style={{animationDuration: '5s'}}></div>
              <div className="absolute inset-3 rounded-full border border-[#8B1A1A]/10 animate-pulse" style={{animationDuration: '8s', animationDelay: '2s'}}></div>
              <div className="absolute inset-6 rounded-full overflow-hidden border border-[#8B1A1A]/20 shadow-[0_0_40px_rgba(184,134,11,0.06)]">
                <video src="/videos/caishen-entering.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
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
    <section className="py-24 bg-[#F5F1ED] border-t border-[#E5E0DB]">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-3 gap-px bg-[#FAF7F4]/30">
          {stats.map(s => (
            <div key={s.label} className="bg-[#F5F1ED] px-8 py-16 text-center">
              <div className="text-5xl font-black text-[#B8860B] mb-2">{s.num}</div>
              <div className="text-[#666666] text-[10px] tracking-widest uppercase mb-1">{s.label}</div>
              <div className="text-[#666666] text-xs">{s.zh}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductShowcase({ setCurrentPage, products }) {
  const featured = (products || []).slice(0, 4);
  return (
    <section className="py-8 bg-[#F5F1ED]">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-px bg-[#D4B978]/60"></div>
            <span className="text-[#B8860B]/80 text-[11px] tracking-[0.3em] uppercase font-medium">Featured</span>
          </div>
          <div className="flex items-end justify-between">
            <h2 className="font-display text-4xl lg:text-5xl font-black text-[#333333]">The Collection</h2>
            <button onClick={() => setCurrentPage('shop')} className="hidden sm:flex items-center gap-2 text-[#B8860B] hover:text-[#D4B978] text-sm font-medium transition-colors group">
              All {products?.length || 0} pieces <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
        <div className="space-y-28">
          {featured.map((p, i) => {
            const isEven = i % 2 === 0;
            return (
              <div key={p.id} className="grid lg:grid-cols-2 gap-16 items-center">
                <div className={isEven ? '' : 'lg:order-2'}>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#FAF7F4]">
                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
                <div className={isEven ? '' : 'lg:order-1'}>
                  <div className="text-[#B8860B]/60 text-[10px] tracking-[0.25em] uppercase font-medium mb-3">AI Original 路 Limited</div>
                  <h3 className="text-3xl font-black text-[#333333] mb-1">{p.name}</h3>
                  <div className="text-[#666666] text-sm mb-4">{p.nameEn}</div>
                  <p className="text-[#666666] text-sm leading-7 mb-6">{p.description}</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {p.features.slice(0, 3).map((f, fi) => (
                      <span key={fi} className="text-xs text-[#666666] bg-[#FAF7F4] border border-[#D4B978] px-3 py-1 rounded-full">{f}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-black text-[#B8860B]">${p.price}</span>
                    <button onClick={() => setCurrentPage('shop')} className="border border-[#8B1A1A]/50 text-[#B8860B] hover:bg-[#8B1A1A] hover:text-white font-medium px-7 py-3 rounded-xl transition-all text-sm">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { icon: <Truck size={18} />, label: 'Worldwide Shipping', sub: 'Orders over $39' },
    { icon: <ShieldCheck size={18} />, label: 'Authenticity', sub: 'Certificate included' },
    { icon: <RefreshCw size={18} />, label: '30-Day Returns', sub: 'No questions' },
    { icon: <Award size={18} />, label: 'Limited Edition', sub: 'Every piece unique' },
  ];
  return (
    <section className="py-14 bg-[#F5F1ED] border-t border-[#E5E0DB]">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="text-[#B8860B]/70 mt-0.5 shrink-0">{f.icon}</div>
              <div>
                <div className="text-[#666666] text-sm font-semibold">{f.label}</div>
                <div className="text-[#666666] text-xs mt-0.5">{f.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  const starsMap = ['★★★★★', '★★★★★', '★★★★', '★★★★★'];
  return (
    <section className="py-20 bg-[#F5F1ED] border-t border-[#E5E0DB]">
      <div className="max-w-7xl mx-auto px-8 lg:px-16 mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-px bg-[#D4B978]/60"></div>
          <span className="text-[#B8860B]/80 text-[11px] tracking-[0.3em] uppercase font-medium">Voices</span>
        </div>
        <h2 className="font-display text-4xl font-black text-[#333333]">What They Say</h2>
      </div>
      <div className="flex gap-5 overflow-x-auto pb-4 px-8 lg:px-16" style={{scrollbarWidth: 'none'}}>
        {REVIEWS.map((r, i) => (
          <div key={i} className="shrink-0 w-72 bg-[#FAF7F4] border border-[#D4B978] rounded-2xl p-6">
            <div className="text-[#B8860B] text-sm mb-3">{starsMap[i]}</div>
            <p className="text-[#666666] text-sm leading-6 mb-5">"{r.text}"</p>
            <div className="border-t border-[#E5E0DB] pt-4">
              <div className="text-[#333333] text-sm font-semibold">{r.name}</div>
              <div className="text-[#666666] text-xs mt-0.5">{r.location}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
//  Shop / Modal / Story / Newsletter / Contact / Footer
// ============================================================

function ShopPage({ setCurrentPage, onViewProduct, onQuickAdd, products }) {
  const [filter, setFilter] = useState('all');
  const filters = ['all', '掛件', '擺件', '禮盒'];
  const filtered = filter === 'all' ? (products || []) : (products || []).filter(p => p.name.includes(filter));
  return (
    <div className="pt-28 pb-24 bg-[#F5F1ED] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-px bg-[#D4B978]/60"></div>
            <span className="text-[#B8860B]/80 text-[11px] tracking-[0.25em] uppercase font-medium">Full Collection</span>
            <div className="w-8 h-px bg-[#D4B978]/60"></div>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-black text-[#333333] mb-3">全部商品</h2>
          <p className="text-[#666666] text-sm">AI 獨家系列 · {products?.length || 0} Products</p>
        </div>
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${filter === f ? 'bg-[#8B1A1A] text-white' : 'bg-[#FAF7F4] text-[#666666] hover:bg-[#F5F1ED]'}`}>
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#F5F1ED] backdrop-blur-sm" onClick={onClose}>
      <div className="bg-gradient-to-b from-[#F5F1ED] to-[#FAF7F4] border border-[#E5E0DB] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="grid md:grid-cols-2 gap-0">
          <div className="bg-[#F5F1ED] p-6">
            <div className="aspect-square bg-[#FAF7F4] rounded-2xl overflow-hidden mb-4 flex items-center justify-center border border-[#E5E0DB]">
              <img src={product.images[activeImg]} alt={product.name} className="w-full h-full object-cover" onError={e => { e.target.style.display='none'; }} />
            </div>
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)} className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${activeImg === i ? 'border-[#B8860B]' : 'border-transparent opacity-50 hover:opacity-100'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" onError={e => e.target.style.display='none'} />
                </button>
              ))}
            </div>
          </div>
          <div className="p-6 lg:p-8">
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#FAF7F4] flex items-center justify-center text-[#666666] hover:text-[#8B1A1A] float-right"><X size={15} /></button>
            <div className="text-xs text-[#B8860B]/80 font-medium tracking-widest uppercase mb-2">{product.nameEn}</div>
            <h2 className="font-cn text-2xl font-black text-[#333333] mb-1">{product.name}</h2>
            <div className="flex items-center gap-2 mb-4">
              <StarRating rating={product.rating} />
              <span className="text-xs text-[#666666]">{product.reviews} reviews</span>
            </div>
            <div className="flex items-end gap-4 mb-6">
              <span className="text-4xl font-black text-[#B8860B]">${product.price}</span>
              <span className="text-lg text-[#666666] line-through">${product.originalPrice}</span>
              <span className="bg-[#F5F1ED] text-[#8B1A1A] text-sm font-bold px-3 py-1 rounded-full">-{Math.round((1-product.price/product.originalPrice)*100)}%</span>
            </div>
            <p className="text-[#666666] text-sm leading-relaxed mb-6">{product.description}</p>
            <ul className="space-y-2 mb-6">
              {product.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-[#333333]"><CheckCircle size={13} className="text-[#B8860B] shrink-0" />{f}</li>
              ))}
            </ul>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2 bg-[#FAF7F4] border border-[#D4B978] rounded-xl">
                <button onClick={() => setQty(Math.max(1, qty-1))} className="w-10 h-10 flex items-center justify-center text-[#333333] font-bold text-lg hover:bg-[#F5F1ED] rounded-l-xl transition-colors">-</button>
                <span className="w-10 text-center text-[#333333] font-bold">{qty}</span>
                <button onClick={() => setQty(qty+1)} className="w-10 h-10 flex items-center justify-center text-[#333333] font-bold text-lg hover:bg-[#F5F1ED] rounded-r-xl transition-colors">+</button>
              </div>
              <button onClick={handleAdd} className={`flex-1 py-3.5 rounded-xl font-bold text-sm transition-all ${added ? 'bg-[#8C6D1F] text-white' : 'bg-[#8B1A1A] hover:bg-[#A84444] text-white'}`}>
                {added ? <><CheckCircle size={15} className="inline mr-2" />Added to Cart</> : <><ShoppingBag size={15} className="inline mr-2" />Add to Cart</>}
              </button>
            </div>
            <div className="border-t border-[#E5E0DB] pt-4 space-y-2 text-xs text-[#666666]">
              <div className="flex items-center gap-2"><Truck size={12} /> 全球免運 · Orders over $39</div>
              <div className="flex items-center gap-2"><RefreshCw size={12} /> 30天退換保障</div>
              <div className="flex items-center gap-2"><Award size={12} /> 正品保障 · 珍藏證書</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StoryPage({ setCurrentPage }) {
  return (
    <div className="pt-28 pb-24 bg-[#F5F1ED] min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-px bg-[#D4B978]/60"></div>
            <span className="text-[#B8860B]/80 text-[11px] tracking-[0.25em] uppercase font-medium">Our Story</span>
            <div className="w-8 h-px bg-[#D4B978]/60"></div>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-black text-[#333333] mb-3">品牌故事</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="bg-gradient-to-br from-[#FAF7F4] to-[#F5F1ED] border border-[#E5E0DB] rounded-3xl p-8">
            <div className="text-4xl mb-5">🏮</div>
            <h3 className="text-xl font-black text-[#333333] mb-3">1,500 Years of Heritage</h3>
            <p className="text-[#666666] text-sm leading-7">The CaiShen faith has over 1,500 years of history in China, and is one of the most cherished cultural symbols for Chinese communities worldwide. CaiShen is dedicated to reimagining this cultural treasure through AI technology.</p>
          </div>
          <div className="bg-gradient-to-br from-[#FAF7F4] to-[#F5F1ED] border border-[#D4B978] rounded-3xl p-8">
            <div className="text-4xl mb-5">⚡</div>
            <h3 className="text-xl font-black text-[#333333] mb-3">Powered by AI</h3>
            <p className="text-[#666666] text-sm leading-7">We trained a proprietary AI system on thousands of artifacts — Dunhuang murals, Song dynasty porcelain, Ming-Qing lacquerware — to generate unique CaiShen aesthetic totems for the digital age.</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#F5F1ED] to-[#FAF7F4] border border-[#E5E0DB] rounded-3xl p-8 lg:p-12 mb-16 text-center">
          <h3 className="font-display text-2xl font-black text-[#333333] mb-6">品牌故事 · The Brand Story</h3>
          <div className="text-[#666666] text-sm leading-8 max-w-2xl mx-auto space-y-4">
            <p>CaiShen was born in a living room overseas. Our founder grew tired of Western stereotypes about Eastern culture and decided to use cutting-edge AI to reinterpret the sacred image of CaiShen.</p>
            <p>From the first sketch to the first finished product took 8 months. Today, CaiShen has reached tens of thousands of families across 36 countries.</p>
            <p>We believe: <span className="text-[#B8860B] font-semibold">wealth is energy, faith is the medium, and technology is the bridge.</span></p>
          </div>
          <blockquote className="mt-8 border-l-4 border-[#8B1A1A]/60 pl-6 text-left max-w-xl mx-auto">
            <p className="text-[#333333] italic text-sm leading-7">"Let every overseas Chinese feel the warmth of home at their fingertips."</p>
          </blockquote>
        </div>
        <div className="grid grid-cols-3 gap-5">
          {[['36+', 'Countries'], ['50K+', 'Global Users'], ['4.9', 'Avg Rating']].map(([num, label]) => (
            <div key={label} className="bg-[#F5F1ED] border border-[#E5E0DB] rounded-2xl p-6 text-center">
              <div className="text-2xl font-black text-[#B8860B] mb-1">{num}</div>
              <div className="text-[#666666] text-[11px] tracking-wider uppercase">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => { e.preventDefault(); if(email) setSubmitted(true); };
  return (
    <section className="py-20 bg-[#F5F1ED] border-t border-[#E5E0DB]/50">
      <div className="max-w-2xl mx-auto px-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-8 h-px bg-[#D4B978]/60"></div>
          <span className="text-[#B8860B]/80 text-[11px] tracking-[0.25em] uppercase font-medium">Stay Connected</span>
          <div className="w-8 h-px bg-[#D4B978]/60"></div>
        </div>
        <h2 className="font-display text-3xl font-black text-[#333333] mb-3">Join the Circle</h2>
        <p className="text-[#666666] text-sm mb-8">Be the first to know about new collections, exclusive offers, and fortune tips.</p>
        {submitted ? (
          <div className="bg-[#FAF7F4] border border-[#D4B978] text-[#8C6D1F] rounded-2xl px-6 py-5 text-sm">Thank you! You'll hear from us soon.</div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required className="flex-1 bg-[#FAF7F4] border border-[#D4B978] text-[#333333] placeholder-[#999999] px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:border-[#B8860B]" />
            <button type="submit" className="bg-[#8B1A1A] hover:bg-[#A84444] text-white font-semibold px-6 py-3.5 rounded-xl transition-colors text-sm flex items-center gap-2 shrink-0">
              <Send size={14} /> Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const handleSubmit = (e) => { e.preventDefault(); setSent(true); };
  return (
    <div className="pt-28 pb-24 bg-[#F5F1ED] min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-px bg-[#D4B978]/60"></div>
            <span className="text-[#B8860B]/80 text-[11px] tracking-[0.25em] uppercase font-medium">Contact</span>
            <div className="w-8 h-px bg-[#D4B978]/60"></div>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-black text-[#333333] mb-3">聯絡我們</h2>
        </div>
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {[
            { icon: <Mail size={20} />, title: 'Email', content: 'hello@blingjew.com' },
            { icon: <MapPin size={20} />, title: 'Address', content: 'Hong Kong 文運亨通有限公司' },
            { icon: <Clock size={20} />, title: 'Hours', content: 'Mon-Fri 9am-6pm HKT' },
          ].map(({ icon, title, content }) => (
            <div key={title} className="bg-[#FAF7F4] border border-[#D4B978] rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-[#FAF7F4] rounded-xl flex items-center justify-center mx-auto mb-4 text-[#B8860B]">{icon}</div>
              <div className="text-[#333333] font-semibold text-sm mb-1">{title}</div>
              <div className="text-[#666666] text-xs">{content}</div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="bg-[#FAF7F4] border border-[#D4B978] rounded-2xl p-6 lg:p-8">
          {sent ? (
            <div className="text-center py-10">
              <div className="text-[#B8860B] text-4xl mb-4">🧧</div>
              <div className="text-[#333333] font-black text-xl mb-2">Message Sent!</div>
              <div className="text-[#666666] text-sm">We will get back to you within 24 hours.</div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input required placeholder="Your Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="bg-[#FAF7F4] border border-[#D4B978] text-[#333333] placeholder-[#999999] px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[#B8860B]" />
                <input required type="email" placeholder="Email Address" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="bg-[#FAF7F4] border border-[#D4B978] text-[#333333] placeholder-[#999999] px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[#B8860B]" />
              </div>
              <input required placeholder="Subject" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} className="w-full bg-[#FAF7F4] border border-[#D4B978] text-[#333333] placeholder-[#999999] px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[#B8860B] resize-none" value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full bg-[#FAF7F4] border border-[#D4B978] text-white placeholder-[#999999] px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[#8B1A1A] resize-none" />
              <button type="submit" className="w-full bg-[#8B1A1A] hover:bg-[#A84444] text-white font-semibold py-4 rounded-xl transition-all text-sm">Send Message</button>
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
    <footer className="bg-[#F5F1ED] border-t border-[#E5E0DB] pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 bg-gradient-to-br from-[#8B1A1A] to-[#B8860B] rounded-xl flex items-center justify-center text-lg">🧧</div>
              <div>
                <div className="font-display text-[#333333] font-black text-lg tracking-tight">CaiShen</div>
                <div className="text-[#B8860B]/70 text-[9px] tracking-[0.2em] uppercase">AI Fortune Art</div>
              </div>
            </div>
            <p className="text-[#666666] text-xs leading-6 mb-5">AI-forged Eastern fortune culture for homes across 36 nations.</p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-xl bg-[#FAF7F4] border border-[#D4B978] flex items-center justify-center text-[#666666] hover:text-[#B8860B] hover:border-[#8B1A1A] transition-all">
                <InstagramIcon size={16} />
              </a>
            </div>
          </div>
          <div>
            <div className="text-[#333333] font-semibold text-sm mb-5">Shop</div>
            <div className="space-y-3">
              {[
                { label: '全部商品', key: 'shop' },
                { label: '品牌故事', key: 'story' },
                { label: '聯絡我們', key: 'contact' },
              ].map(({ label, key }) => (
                <button key={key} onClick={() => setCurrentPage(key)} className="block text-[#666666] hover:text-[#B8860B] text-xs transition-colors">{label}</button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[#333333] font-semibold text-sm mb-5">Support</div>
            <div className="space-y-3">
              {['Shipping Info', 'Returns & Exchanges', 'FAQ', 'Privacy Policy'].map(l => (
                <a key={l} href="#" className="block text-[#666666] hover:text-[#B8860B] text-xs transition-colors">{l}</a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[#333333] font-semibold text-sm mb-5">Contact</div>
            <div className="space-y-3 text-[#666666] text-xs">
              <div>hello@blingjew.com</div>
              <div>Hong Kong</div>
              <div>文運亨通有限公司</div>
            </div>
          </div>
        </div>
        <div className="border-t border-[#E5E0DB] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[#666666] text-xs">© {year} CaiShen · blingjew.com · All rights reserved.</div>
          <div className="flex items-center gap-4">
            <img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.0.0/flags/4x3/hk.svg" alt="HK" className="h-4 opacity-50 rounded-sm" />
            <img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.0.0/flags/4x3/gb.svg" alt="UK" className="h-4 opacity-50 rounded-sm" />
            <img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.0.0/flags/4x3/us.svg" alt="US" className="h-4 opacity-50 rounded-sm" />
            <img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.0.0/flags/4x3/au.svg" alt="AU" className="h-4 opacity-50 rounded-sm" />
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
    <div className="fixed inset-0 z-50 bg-[#F5F1ED] backdrop-blur-sm flex justify-end" onClick={onClose}>
      <div className="w-full max-w-md bg-[#F5F1ED] border-l border-[#E5E0DB] h-full flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-[#E5E0DB]">
          <h2 className="font-display text-xl font-black text-[#333333]">購物車</h2>
          <button onClick={onClose} className="w-9 h-9 rounded-xl bg-[#FAF7F4] flex items-center justify-center text-[#666666]"><X size={16} /></button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-10">
          <div className="text-6xl mb-4 opacity-30">🧧</div>
          <div className="text-[#666666] text-sm">您的購物車是空的</div>
        </div>
      </div>
    </div>
  );
  return (
    <div className="fixed inset-0 z-50 bg-[#F5F1ED] backdrop-blur-sm flex justify-end" onClick={onClose}>
      <div className="w-full max-w-md bg-[#F5F1ED] border-l border-[#E5E0DB] h-full flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-[#E5E0DB]">
          <h2 className="font-display text-xl font-black text-[#333333]">購物車 ({items.reduce((s,i) => s+i.qty, 0)})</h2>
          <button onClick={onClose} className="w-9 h-9 rounded-xl bg-[#FAF7F4] flex items-center justify-center text-[#666666]"><X size={16} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.map(item => (
            <div key={item.id} className="flex gap-4 bg-[#FAF7F4] border border-[#D4B978] rounded-2xl p-4">
              <img src={item.images ? item.images[0] : item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover bg-[#FAF7F4] shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-[#333333] text-sm font-semibold truncate">{item.name}</div>
                <div className="text-[#B8860B] text-sm font-bold mt-0.5">${item.price}</div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2 bg-[#FAF7F4] rounded-lg">
                    <button onClick={() => onUpdateQty(item.id, item.qty - 1)} className="w-7 h-7 flex items-center justify-center text-[#333333] text-xs hover:bg-[#F5F1ED] rounded-lg transition-colors"><Minus size={11} /></button>
                    <span className="text-[#333333] text-xs font-bold w-6 text-center">{item.qty}</span>
                    <button onClick={() => onUpdateQty(item.id, item.qty + 1)} className="w-7 h-7 flex items-center justify-center text-[#333333] text-xs hover:bg-[#F5F1ED] rounded-lg transition-colors"><Plus size={11} /></button>
                  </div>
                  <button onClick={() => onRemove(item.id)} className="text-[#666666] hover:text-[#666666] text-xs transition-colors">移除</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-6 border-t border-[#E5E0DB] space-y-4">
          <div className="flex gap-2">
            <input value={promo} onChange={e => setPromo(e.target.value)} placeholder="優惠碼" className="flex-1 bg-[#F5F1ED] border border-[#E5E0DB] text-white placeholder-[#999999] px-3 py-2.5 rounded-xl text-xs focus:outline-none focus:border-[#8B1A1A]" />
            <button onClick={handlePromo} className="bg-[#F5F1ED] hover:bg-[#FAF7F4] text-[#333333] px-4 py-2.5 rounded-xl text-xs font-medium transition-colors">套用</button>
          </div>
          {discount > 0 && <div className="text-[#8C6D1F] text-xs text-center">優惠已套用：-{Math.round(discount*100)}%</div>}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-[#666666]"><span>小計</span><span>${total.toFixed(2)}</span></div>
            {discount > 0 && <div className="flex justify-between text-xs text-[#8C6D1F]"><span>節省</span><span>-${(total*discount).toFixed(2)}</span></div>}
            <div className="flex justify-between text-lg font-black text-[#333333] pt-2 border-t border-[#E5E0DB]"><span>合計</span><span className="text-[#B8860B]">${final.toFixed(2)}</span></div>
          </div>
          <button onClick={onCheckout} disabled={items.length === 0} className="w-full py-4 bg-[#8B1A1A] hover:bg-[#A84444] disabled:opacity-50 text-white font-bold rounded-xl transition-all text-sm flex items-center justify-center gap-2">
            <CreditCard size={15} /> Secure Checkout
          </button>
          <div className="flex items-center justify-center gap-4 text-[#666666] text-[10px]">
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
    <div className="min-h-screen bg-[#F5F1ED] text-[#333333] font-sans">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} cartCount={cartCount} setShowCart={setShowCart} />
      {currentPage === 'home' && <><Hero setCurrentPage={setCurrentPage} /><HeritageSection /><ProductShowcase setCurrentPage={setCurrentPage} products={products} /><Features /><ReviewsSection /><Newsletter /></>}
      {currentPage === 'shop' && <ShopPage setCurrentPage={setCurrentPage} onViewProduct={handleViewProduct} onQuickAdd={addItem} products={products} />}
      {currentPage === 'story' && <StoryPage setCurrentPage={setCurrentPage} />}
      {currentPage === 'contact' && <ContactPage />}
      {selectedProduct && <ProductModal product={selectedProduct} onClose={handleCloseModal} onAddToCart={handleAddToCart} />}
      {showCart && <CartSidebar items={items} onClose={() => setShowCart(false)} onRemove={removeItem} onUpdateQty={updateQty} onCheckout={handleCheckout} total={total} />}
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
