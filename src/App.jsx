import React, { useState, useEffect, useCallback } from 'react';
import { ShoppingBag, Menu, X, ChevronRight, Star, Heart, Truck, ShieldCheck, RefreshCw, Globe, ArrowRight, CheckCircle, Mail, MapPin, Clock, Sparkles, Send, Minus, Plus, CreditCard, Loader } from 'lucide-react';

const InstagramIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

// ============================================================
//  CaiShen — AI财神文创 | blingjew.com
//  东方奢雅 × AI未来感
// ============================================================

const PRODUCTS = [
  {
    id: 1,
    name: 'AI財神 · 毛絨掛件款',
    nameEn: 'CaiShen AI Plush Keychain',
    price: 59,
    originalPrice: 89,
    tag: '爆款',
    tagColor: 'bg-red-700',
    image: '/products/product1.jpg',
    images: ['/products/product1.jpg', '/products/product2.jpg', '/products/product3.jpg'],
    description: '掌心大小的精緻毛絨掛件，AI生成東方美學紋樣，搭配流蘇，可懸掛於手機、鑰匙、背包。新年送禮首選。',
    features: ['AI生成東方紋樣', '優質毛絨面料', '附赠流蘇掛繩', '精美禮盒包裝'],
    rating: 4.9,
    reviews: 284,
    badge: 'BESTSELLER'
  },
  {
    id: 2,
    name: 'AI財神 · 樹脂擺件款',
    nameEn: 'CaiShen AI Resin Ornament',
    price: 79,
    originalPrice: 119,
    tag: '新品',
    tagColor: 'bg-yellow-600',
    image: '/products/product2.jpg',
    images: ['/products/product2.jpg', '/products/product3.jpg', '/products/product1.jpg'],
    description: '高品質樹脂財神擺件，AI融合傳統金漆工藝與現代極簡美學，居家/辦公室招財鎮店之寶。',
    features: ['手工樹脂鑄造', '金漆AI紋樣', '防潮耐用', '附底座支架'],
    rating: 4.8,
    reviews: 156,
    badge: 'NEW'
  },
  {
    id: 3,
    name: 'AI財神 · 文曲星禮盒',
    nameEn: 'CaiShen AI Scholar Set',
    price: 99,
    originalPrice: 149,
    tag: '限定',
    tagColor: 'bg-purple-800',
    image: '/products/product3.jpg',
    images: ['/products/product3.jpg', '/products/product4.jpg', '/products/product5.jpg'],
    description: '文曲星與財神雙神合一，AI智能設計學業財富雙加持。內含擺件×1 + 毛絨掛件×1，超值禮盒裝。',
    features: ['雙神合一設計', 'AI智能寓意', '禮盒套裝含2件', '限量編號證書'],
    rating: 5.0,
    reviews: 87,
    badge: 'LIMITED'
  },
  {
    id: 4,
    name: 'AI财神 · 金运手办公盒',
    nameEn: 'CaiShen AI Fortune Box',
    price: 129,
    originalPrice: 189,
    tag: '典藏',
    tagColor: 'bg-amber-700',
    image: '/products/product4.jpg',
    images: ['/products/product4.jpg', '/products/product5.jpg', '/products/product1.jpg'],
    description: '收藏級精品禮盒，內含全套4款AI財神系列。適合高端送禮，附真皮包裝箱與鑑定證書。',
    features: ['全套4件套', '真皮包裝箱', '收藏編號證書', '高端禮盒送禮'],
    rating: 5.0,
    reviews: 42,
    badge: 'EXCLUSIVE'
  }
];

const REVIEWS = [
  { name: 'Linda W.', location: 'Los Angeles, USA', text: 'Absolutely stunning! The AI-generated patterns are unlike anything I\'ve seen. My office colleagues all asked where I got it.', rating: 5, product: '毛絨掛件款' },
  { name: 'Michael C.', location: 'London, UK', text: 'Fast shipping to UK and the packaging was luxurious. The resin ornament sits proudly on my desk. Highly recommend!', rating: 5, product: '樹脂擺件款' },
  { name: 'Sophie L.', location: 'Toronto, Canada', text: 'Bought as a Chinese New Year gift for my parents. They absolutely loved it. The quality exceeded expectations.', rating: 5, product: '文曲星禮盒' },
  { name: 'James K.', location: 'Sydney, Australia', text: 'The AI aesthetic is fascinating — traditional Chinese culture meets futuristic design. Will buy more!', rating: 5, product: '毛絨掛件款' },
];

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={14} className={i <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'} />
      ))}
    </div>
  );
}

function ProductCard({ product, onView, onQuickAdd }) {
  const [liked, setLiked] = useState(false);
  return (
    <div className="group bg-gradient-to-b from-zinc-900 to-black border border-yellow-900/30 rounded-2xl overflow-hidden hover:border-yellow-600/50 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-900/20 hover:-translate-y-1">
      <div className="relative overflow-hidden bg-zinc-950 aspect-square">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }} />
        <div className="hidden w-full h-full items-center justify-center bg-gradient-to-br from-red-950 to-black">
          <div className="text-center">
            <div className="text-5xl mb-2">🧧</div>
            <div className="text-yellow-500 font-bold">{product.name}</div>
          </div>
        </div>
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span className={`${product.tagColor} text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide`}>{product.tag}</span>
          {product.badge && <span className="bg-gradient-to-r from-yellow-500 to-amber-600 text-black text-xs font-black px-2 py-1 rounded-full">{product.badge}</span>}
        </div>
        <button onClick={() => setLiked(!liked)} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 backdrop-blur flex items-center justify-center hover:bg-black/80 transition-colors">
          <Heart size={16} className={liked ? 'fill-red-500 text-red-500' : 'text-white/70'} />
        </button>
      </div>
      <div className="p-5">
        <div className="text-xs text-yellow-600/80 font-medium tracking-widest uppercase mb-1">{product.nameEn}</div>
        <h3 className="text-white font-bold text-base mb-2 leading-tight">{product.name}</h3>
        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={product.rating} />
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <span className="price text-2xl font-black text-yellow-400">${product.price}</span>
          <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
          <span className="text-xs text-red-400 font-semibold bg-red-950/50 px-2 py-0.5 rounded">-{Math.round((1-product.price/product.originalPrice)*100)}%</span>
        </div>
        <button onClick={() => onView(product)} className="w-full py-2.5 bg-gradient-to-r from-red-800 to-red-700 hover:from-red-700 hover:to-red-600 text-white text-sm font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2">
          <ShoppingBag size={15} /> View Details
        </button>
        {onQuickAdd && (
          <button onClick={() => onQuickAdd(product)} className="w-full py-2 mt-2 bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 text-black text-sm font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2">
            <Plus size={14} /> Quick Add
          </button>
        )}
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
    { key: 'home', label: '首頁 Home', labelEn: 'Home' },
    { key: 'shop', label: '全部商品 Shop', labelEn: 'Shop' },
    { key: 'story', label: '品牌故事 Story', labelEn: 'Story' },
    { key: 'contact', label: '聯絡我們 Contact', labelEn: 'Contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-xl border-b border-yellow-900/30' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <button onClick={() => setCurrentPage('home')} className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-red-700 to-yellow-600 rounded-xl flex items-center justify-center text-lg group-hover:scale-110 transition-transform">🧧</div>
            <div>
              <div className="font-display text-white font-black text-lg tracking-tight leading-none">CaiShen</div>
              <div className="text-yellow-600/80 text-[9px] tracking-[0.2em] uppercase">AI Fortune Art</div>
            </div>
          </button>
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <button key={item.key} onClick={() => setCurrentPage(item.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${currentPage === item.key ? 'text-yellow-400 bg-yellow-950/50' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                <span className="block text-xs opacity-60">{item.labelEn}</span>
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowCart(true)} className="relative w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all">
              <ShoppingBag size={18} />
              {cartCount > 0 && <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-600 text-white text-[10px] font-black rounded-full flex items-center justify-center">{cartCount}</span>}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>
      {mobileOpen && (
        <div className="lg:hidden bg-black/98 border-t border-yellow-900/30 px-4 py-4 space-y-1">
          {navItems.map(item => (
            <button key={item.key} onClick={() => { setCurrentPage(item.key); setMobileOpen(false); }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${currentPage === item.key ? 'text-yellow-400 bg-yellow-950/50' : 'text-gray-400'}`}>
              <span className="block text-xs opacity-60">{item.labelEn}</span>{item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero({ setCurrentPage }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-red-950/60 via-black to-yellow-950/40"></div>
      <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(circle at 20% 50%, #dc2626 0%, transparent 50%), radial-gradient(circle at 80% 20%, #ca8a04 0%, transparent 40%), radial-gradient(circle at 60% 80%, #7f1d1d 0%, transparent 50%)'}}></div>
      <div className="absolute inset-0" style={{backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 80px, rgba(217,119,6,0.03) 80px, rgba(217,119,6,0.03) 81px), repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(217,119,6,0.03) 80px, rgba(217,119,6,0.03) 81px)'}}></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-yellow-950/60 border border-yellow-800/40 text-yellow-400 text-xs font-bold px-4 py-1.5 rounded-full mb-6">
              <Sparkles size={12} /> AI Meets Ancient Fortune
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-4">
              <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">CaiShen</span>
              <br />
              <span className="font-cn text-white">财神文创</span>
            </h1>
            <p className="text-lg text-gray-400 mb-3 max-w-lg leading-relaxed">
              World's First AI-Powered Traditional Fortune Art Brand.<br />
              Every piece, crafted by AI trained on millennia of CaiShen culture.
            </p>
            <p className="text-sm text-yellow-600/80 mb-8 max-w-lg">
              全球首款 AI 融合东方传统美学的文创品牌。
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => setCurrentPage('shop')} className="group bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 flex items-center gap-3 shadow-xl shadow-red-900/40 hover:shadow-red-800/60">
                <ShoppingBag size={18} />
                Shop All Products
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => setCurrentPage('story')} className="border border-yellow-800/60 text-yellow-400 hover:bg-yellow-950/50 font-bold px-8 py-4 rounded-2xl transition-all duration-200">
                Our Story
              </button>
            </div>
            <div className="flex items-center gap-8 mt-12 pt-8 border-t border-white/10">
              <div><div className="text-2xl font-black text-white">50K+</div><div className="text-xs text-gray-500">Global Users</div></div>
              <div><div className="text-2xl font-black text-white">4.9★</div><div className="text-xs text-gray-500">Avg Rating</div></div>
              <div><div className="text-2xl font-black text-white">36</div><div className="text-xs text-gray-500">Countries</div></div>
              <div><div className="text-2xl font-black text-white">7-14</div><div className="text-xs text-gray-500">Days Worldwide</div></div>
            </div>
          </div>
          <div className="relative hidden lg:flex justify-center">
            <div className="relative">
              <div className="w-96 h-96 rounded-full bg-gradient-to-br from-red-900/60 to-yellow-900/40 flex items-center justify-center animate-pulse">
                <img src="/images/caishen-cutout.png" alt="CaiShen AI" className="w-80 h-80 object-contain" onError={e => { e.target.parentElement.innerHTML='<div class=\'text-8xl\'>🧧</div>'; }} />
              </div>
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-yellow-500 to-amber-600 text-black font-black text-sm px-4 py-2 rounded-2xl rotate-12 shadow-lg shadow-yellow-900/40">AI 创作</div>
              <div className="absolute -bottom-4 -left-4 bg-black/80 backdrop-blur border border-yellow-800/50 text-yellow-400 font-bold text-xs px-4 py-2 rounded-xl -rotate-6">限量发售</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductShowcase({ setCurrentPage }) {
  const featured = PRODUCTS.slice(0, 2);
  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="text-yellow-600 text-xs font-bold tracking-[0.3em] uppercase mb-2 font-display">Featured Collection</div>
            <h2 className="text-4xl font-black text-white">Popular Picks</h2>
          </div>
          <button onClick={() => setCurrentPage('shop')} className="hidden sm:flex items-center gap-2 text-yellow-400 hover:text-yellow-300 text-sm font-semibold transition-colors">
            View All <ChevronRight size={16} />
          </button>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {featured.map(p => (
            <div key={p.id} className="group relative bg-gradient-to-br from-zinc-900 to-black border border-yellow-900/30 rounded-3xl overflow-hidden hover:border-yellow-600/40 transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={e => { e.target.style.display='none'; }} />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`${p.tagColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>{p.tag}</span>
                  <span className="text-xs text-gray-500">{p.nameEn}</span>
                </div>
                <h3 className="text-xl font-black text-white mb-2">{p.name}</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{p.description.slice(0,80)}...</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="price text-2xl font-black text-yellow-400">${p.price}</span>
                    <span className="text-sm text-gray-500 line-through">${p.originalPrice}</span>
                  </div>
                  <button onClick={() => setCurrentPage('shop')} className="bg-yellow-600 hover:bg-yellow-500 text-black font-bold text-sm px-5 py-2 rounded-xl transition-colors flex items-center gap-2">
                    Shop Now <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { icon: <Truck size={24} />, title: 'Free Shipping', titleEn: '全球包邮', desc: 'On orders over $39 · Delivered worldwide in 7-14 days' },
    { icon: <ShieldCheck size={24} />, title: 'Authenticity Guaranteed', titleEn: '正品保障', desc: 'Every piece comes with a certificate & anti-counterfeit code' },
    { icon: <RefreshCw size={24} />, title: '30-Day Returns', titleEn: '30天退换', desc: 'Not satisfied? Free returns within 30 days, we cover shipping' },
    { icon: <Globe size={24} />, title: 'Multi-Language', titleEn: '多语言支持', desc: 'Supports English, Traditional Chinese, French & Spanish' },
  ];
  return (
    <section className="py-16 bg-gradient-to-r from-red-950/50 via-black to-yellow-950/30 border-y border-yellow-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={i} className="text-center group">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-900/60 to-yellow-900/40 border border-yellow-900/40 flex items-center justify-center mx-auto mb-3 text-yellow-400 group-hover:scale-110 transition-transform">{f.icon}</div>
              <div className="text-yellow-400 font-bold text-sm mb-0.5">{f.title}</div>
              <div className="text-yellow-600/60 text-[10px] font-medium tracking-wider uppercase">{f.titleEn}</div>
              <div className="text-gray-500 text-xs mt-1">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ShopPage({ setCurrentPage, onViewProduct, onQuickAdd }) {
  const [filter, setFilter] = useState('all');
  const filters = ['all', '挂件 Keychain', '摆件 Ornament', '礼盒 Set'];
  const filtered = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.name.includes(filter));
  return (
    <div className="pt-24 pb-20 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-yellow-600 text-xs font-bold tracking-[0.3em] uppercase mb-2">Full Collection</div>
          <h2 className="text-4xl font-black text-white mb-3">Shop All Products</h2>
          <p className="text-gray-500 text-sm">AI財神全系列 · All 4 Products</p>
        </div>
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${filter === f ? 'bg-yellow-600 text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
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

  const handleAdd = () => {
    onAddToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-gradient-to-b from-zinc-900 to-black border border-yellow-900/40 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="grid md:grid-cols-2 gap-0">
          <div className="bg-black/50 p-6">
            <div className="aspect-square bg-zinc-950 rounded-2xl overflow-hidden mb-4 flex items-center justify-center">
              <img src={product.images[activeImg]} alt={product.name} className="w-full h-full object-cover" onError={e => { e.target.style.display='none'; }} />
            </div>
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)} className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${activeImg === i ? 'border-yellow-500' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" onError={e => e.target.style.display='none'} />
                </button>
              ))}
            </div>
          </div>
          <div className="p-6 lg:p-8">
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white float-right"><X size={16} /></button>
            <div className="text-xs text-yellow-600/80 font-medium tracking-widest uppercase mb-2 font-display">{product.nameEn}</div>
            <h2 className="font-cn text-2xl font-black text-white mb-1">{product.name}</h2>
            <div className="flex items-center gap-2 mb-4">
              <StarRating rating={product.rating} />
              <span className="text-xs text-gray-500">{product.reviews} reviews</span>
            </div>
            <div className="flex items-end gap-4 mb-6">
              <span className="price text-4xl font-black text-yellow-400">${product.price}</span>
              <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
              <span className="bg-red-950/60 text-red-400 text-sm font-bold px-3 py-1 rounded-full">-{Math.round((1-product.price/product.originalPrice)*100)}%</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">{product.description}</p>
            <ul className="space-y-2 mb-6">
              {product.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle size={14} className="text-yellow-500 shrink-0" />{f}</li>
              ))}
            </ul>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl">
                <button onClick={() => setQty(Math.max(1, qty-1))} className="w-10 h-10 flex items-center justify-center text-white font-bold text-lg hover:bg-white/10 rounded-l-xl transition-colors">-</button>
                <span className="w-10 text-center text-white font-bold">{qty}</span>
                <button onClick={() => setQty(qty+1)} className="w-10 h-10 flex items-center justify-center text-white font-bold text-lg hover:bg-white/10 rounded-r-xl transition-colors">+</button>
              </div>
              <button onClick={handleAdd} className={`flex-1 py-3.5 rounded-xl font-bold text-sm transition-all ${added ? 'bg-green-600 text-white' : 'bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white'}`}>
                {added ? <><CheckCircle size={16} className="inline mr-2" />Added to Cart</> : <><ShoppingBag size={16} className="inline mr-2" />Add to Cart</>}
              </button>
            </div>
            <div className="border-t border-white/10 pt-4 space-y-2 text-xs text-gray-500">
              <div className="flex items-center gap-2"><Truck size={12} /> Free shipping worldwide · Orders over $39</div>
              <div className="flex items-center gap-2"><RefreshCw size={12} /> 30-day hassle-free returns</div>
              <div className="flex items-center gap-2"><ShieldCheck size={12} /> Authenticity guaranteed · Certificate included</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StoryPage({ setCurrentPage }) {
  return (
    <div className="pt-24 pb-20 bg-black min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-yellow-600 text-xs font-bold tracking-[0.3em] uppercase mb-2">Our Story</div>
          <h2 className="text-4xl font-black text-white mb-3">About CaiShen</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-br from-red-950/40 to-black border border-red-900/30 rounded-3xl p-8">
            <div className="text-4xl mb-4">🏮</div>
            <h3 className="text-xl font-black text-white mb-3">1,500 Years of Heritage</h3>
            <p className="text-gray-400 text-sm leading-relaxed">The CaiShen faith has over 1,500 years of history in China, and is one of the most cherished cultural symbols for Chinese communities worldwide. CaiShen is dedicated to reimagining this cultural treasure through AI technology.</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-950/40 to-black border border-yellow-900/30 rounded-3xl p-8">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-black text-white mb-3">Powered by AI</h3>
            <p className="text-gray-400 text-sm leading-relaxed">We trained a proprietary AI system on thousands of artifacts — Dunhuang murals, Song dynasty porcelain, Ming-Qing lacquerware — to generate unique CaiShen aesthetic totems for the digital age.</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-zinc-900 to-black border border-yellow-900/20 rounded-3xl p-8 lg:p-12 mb-16 text-center">
          <h3 className="text-2xl font-black text-white mb-4">The Brand Story</h3>
          <p className="text-gray-400 text-sm leading-8 max-w-2xl mx-auto">CaiShen was born in a living room overseas. Our founder grew tired of Western stereotypes about Eastern culture and decided to use cutting-edge AI to reinterpret the sacred image of CaiShen. From the first sketch to the first finished product took 8 months.<br /><br />Today, CaiShen has reached tens of thousands of families across 36 countries. We believe: wealth is energy, faith is the medium, and technology is the bridge.<br /><br /><span className="text-yellow-400 font-bold">"Let every overseas Chinese feel the warmth of home at their fingertips."</span></p>
        </div>
        <div className="grid grid-cols-3 gap-6 text-center">
          {[['36+', 'Countries'], ['50K+', 'Global Users'], ['4.9★', 'Avg Rating']].map(([num, label]) => (
            <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="price text-2xl font-black text-yellow-400 mb-1">{num}</div>
              <div className="text-xs text-gray-500">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReviewsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-black via-zinc-950 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-yellow-600 text-xs font-bold tracking-[0.3em] uppercase mb-2">Customer Reviews</div>
          <h2 className="text-3xl font-black text-white">What Our Customers Say</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {REVIEWS.map((r, i) => (
            <div key={i} className="bg-gradient-to-b from-zinc-900/80 to-black border border-white/10 rounded-2xl p-5">
              <StarRating rating={r.rating} />
              <p className="text-gray-300 text-sm mt-3 mb-3 leading-relaxed">"{r.text}"</p>
              <div className="flex items-center justify-between">
                <div><div className="text-white font-bold text-sm">{r.name}</div><div className="text-xs text-gray-500">{r.location}</div></div>
                <span className="text-xs text-yellow-600/70 bg-yellow-950/40 px-2 py-1 rounded-full">{r.product}</span>
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
    <section className="py-20 bg-gradient-to-r from-red-950/60 via-red-900/40 to-yellow-950/40 border-y border-yellow-900/30">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="text-4xl mb-4">📬</div>
        <h2 className="text-3xl font-black text-white mb-2">Subscribe for Exclusive Offers</h2>
        <p className="text-gray-400 text-sm mb-6">Be the first to know about new arrivals & special discounts</p>
        {submitted ? (
          <div className="bg-green-900/40 border border-green-700/50 text-green-400 rounded-2xl py-4 px-6 text-sm font-bold">✓ Subscribed! We'll be in touch soon.</div>
        ) : (
          <div className="flex gap-3 max-w-md mx-auto">
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email address" className="flex-1 bg-black/60 border border-yellow-900/50 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-yellow-600 transition-colors" />
            <button onClick={() => { if(email) setSubmitted(true); }} className="bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 text-black font-bold px-6 py-3 rounded-xl transition-all whitespace-nowrap">Subscribe</button>
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
    <div className="pt-24 pb-20 bg-black min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-yellow-600 text-xs font-bold tracking-[0.3em] uppercase mb-2">Contact Us</div>
          <h2 className="text-4xl font-black text-white">Get in Touch</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-zinc-900 to-black border border-yellow-900/20 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-yellow-950/60 rounded-xl flex items-center justify-center text-yellow-400 shrink-0"><Mail size={18} /></div>
                <div><div className="text-white font-bold text-sm mb-1">邮箱 Email</div><div className="text-gray-400 text-sm">support@blingjew.com</div></div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-zinc-900 to-black border border-yellow-900/20 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-yellow-950/60 rounded-xl flex items-center justify-center text-yellow-400 shrink-0"><MapPin size={18} /></div>
                <div><div className="text-white font-bold text-sm mb-1">Company Address</div><div className="text-gray-400 text-sm">香港文運亨通有限公司<br />Hong Kong SAR</div></div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-zinc-900 to-black border border-yellow-900/20 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-yellow-950/60 rounded-xl flex items-center justify-center text-yellow-400 shrink-0"><Clock size={18} /></div>
                <div><div className="text-white font-bold text-sm mb-1">Business Hours</div><div className="text-gray-400 text-sm">Mon–Fri 9:00–18:00 (HKT)<br />We reply within 24 hours</div></div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-zinc-900 to-black border border-yellow-900/20 rounded-2xl p-6 lg:p-8">
            <h3 className="text-lg font-black text-white mb-5">Send a Message</h3>
            {sent ? (
              <div className="text-center py-8"><div className="text-4xl mb-3">✅</div><div className="text-white font-bold">Message Sent!</div><div className="text-gray-400 text-sm mt-1">We'll get back to you shortly</div></div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your Name" className="w-full bg-black/60 border border-yellow-900/40 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-yellow-600" />
                <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="Email Address" className="w-full bg-black/60 border border-yellow-900/40 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-yellow-600" />
                <textarea required value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Your Message" rows={4} className="w-full bg-black/60 border border-yellow-900/40 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-yellow-600 resize-none" />
                <button type="submit" className="w-full bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2">
                  <Send size={16} /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-black border-t border-yellow-900/30 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-red-700 to-yellow-600 rounded-lg flex items-center justify-center text-sm">🧧</div>
              <div><div className="font-display text-white font-black text-base">CaiShen</div><div className="text-yellow-600/60 text-[8px] tracking-widest uppercase">AI Fortune Art</div></div>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed">World's First AI-Powered Traditional Fortune Art Brand. Bringing wealth and culture into the digital age.</p>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Shop</h4>
            <ul className="space-y-2 text-xs text-gray-500">
              <li className="hover:text-yellow-400 cursor-pointer transition-colors">All Products</li>
              <li className="hover:text-yellow-400 cursor-pointer transition-colors">Plush Keychains</li>
              <li className="hover:text-yellow-400 cursor-pointer transition-colors">Resin Ornaments</li>
              <li className="hover:text-yellow-400 cursor-pointer transition-colors">Gift Sets</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Support</h4>
            <ul className="space-y-2 text-xs text-gray-500">
              <li className="hover:text-yellow-400 cursor-pointer transition-colors">Shipping Info</li>
              <li className="hover:text-yellow-400 cursor-pointer transition-colors">Return Policy</li>
              <li className="hover:text-yellow-400 cursor-pointer transition-colors">FAQ</li>
              <li className="hover:text-yellow-400 cursor-pointer transition-colors">Contact Us</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Company</h4>
            <ul className="space-y-2 text-xs text-gray-500">
              <li className="hover:text-yellow-400 cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-yellow-400 cursor-pointer transition-colors">Our Story</li>
              <li className="hover:text-yellow-400 cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-yellow-400 cursor-pointer transition-colors">Terms of Use</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-gray-600">© 2024 CaiShen. 香港文運亨通有限公司. All rights reserved.</div>
          <div className="flex gap-3">
            <div className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center text-gray-500 hover:text-yellow-400 cursor-pointer transition-colors"><InstagramIcon size={16} /></div>
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
    } catch (err) {
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
      <div className="relative w-full max-w-md bg-gradient-to-b from-zinc-900 to-black border-l border-yellow-900/30 flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <ShoppingBag size={18} /> Your Cart <span className="text-yellow-400 text-sm">({totalItems})</span>
          </h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white"><X size={16} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">🧧</div>
              <div className="text-gray-500 text-sm">Your cart is empty</div>
              <div className="text-gray-600 text-xs mt-1">Let's find something special!</div>
            </div>
          ) : items.map(item => (
            <div key={item.id} className="flex gap-4 bg-white/5 rounded-xl p-3">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-zinc-950 shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" onError={e => e.target.style.display='none'} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-bold text-sm truncate">{item.name}</div>
                <div className="price text-yellow-400 font-bold text-sm mt-1">${item.price}</div>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-6 h-6 rounded bg-white/10 flex items-center justify-center text-white hover:bg-white/20"><Minus size={12} /></button>
                  <span className="text-white text-sm font-bold w-6 text-center">{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-6 h-6 rounded bg-white/10 flex items-center justify-center text-white hover:bg-white/20"><Plus size={12} /></button>
                  <button onClick={() => removeItem(item.id)} className="ml-auto text-red-400 hover:text-red-300 text-xs">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <div className="p-6 border-t border-white/10 space-y-4">
            {checkoutError && (
              <div className="bg-red-950/50 border border-red-800/50 text-red-400 text-xs rounded-xl p-3 flex items-center justify-between">
                <span>{checkoutError}</span>
                <button onClick={() => setCheckoutError('')} className="text-red-300 hover:text-red-200"><X size={14} /></button>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">合计 Total</span>
              <span className="price text-2xl font-black text-yellow-400">${totalPrice}</span>
            </div>
            <button
              onClick={checkout}
              disabled={isCheckingOut}
              className="w-full py-3.5 bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 disabled:from-yellow-800 disabled:to-amber-800 text-black font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm">
              {isCheckingOut ? <><Loader size={16} className="animate-spin" /> Processing...</> : <><CreditCard size={16} /> Secure Checkout</>}
            </button>
            <div className="flex items-center justify-center gap-4 text-[10px] text-gray-600">
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
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const cart = useCart();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

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
          <ProductShowcase setCurrentPage={setCurrentPage} />
          <Features />
          <ReviewsSection />
          <Newsletter />
        </>
      );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} cartCount={cart.totalItems} setShowCart={setShowCart} />
      {renderPage()}
      <Footer />
      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={handleAddToCart} />}
      {showCart && <CartSidebar cart={{ ...cart }} onClose={() => setShowCart(false)} />}
    </div>
  );
}
