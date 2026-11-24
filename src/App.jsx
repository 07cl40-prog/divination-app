import React, { useState, useEffect, useCallback } from 'react';
import { ShoppingBag, Menu, X, ChevronRight, Star, Heart, Truck, ShieldCheck, RefreshCw, Globe, ArrowRight, CheckCircle, Mail, MapPin, Clock, Sparkles, Send, Minus, Plus, CreditCard, Loader, Award, Users, Globe2, BookOpen, Play } from 'lucide-react';
import AdminPanel from './admin/AdminPanel';

const InstagramIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

// ============================================================
//  財兜兜 CaiDouDou — AI財神 × 香港非遺文創 | blingjew.com
//  香港非遗庙宇暖色体系 — 朱红 × 鎏金 × 米白
//  廟宇暖意 × 東方雅致 × 高級文創
// ============================================================

// Color Palette — 香港非遗庙宇暖色
const COLORS = {
  bgMain: '#FDFBF7',      // 米白 页面底色
  bgCard: '#FFFFFF',      // 卡片白
  bgDeep: '#5E1B1B',      // 深朱 页脚/深色区块
  border: '#EAE3D8',      // 边线
  gold: '#C9A961',        // 鎏金 点缀
  goldLight: '#D9BC7E',
  goldDark: '#A98B4F',
  red: '#8C2C2C',         // 朱红 主色
  redHover: '#7A2525',
  textPrimary: '#2B2020', // 墨色
  textSecondary: '#6B5D52',
};

// 印章式 logo 方块 — 红底白字「財」
const SealLogo = ({ size = 36, radius = 'rounded-lg' }) => (
  <div
    className={`seal-logo ${radius} flex items-center justify-center shrink-0`}
    style={{ width: size, height: size }}
  >
    <span className="font-serif-cn font-bold leading-none" style={{ fontSize: size * 0.5 }}>財</span>
  </div>
);

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
        <Star key={i} size={14} className={i <= rating ? 'fill-[#C9A961] text-[#C9A961]' : 'text-[#EAE3D8]'} />
      ))}
    </div>
  );
}

function ProductCard({ product, onView, onQuickAdd }) {
  const [liked, setLiked] = useState(false);
  return (
    <div className="group bg-white border border-[#EAE3D8] rounded-2xl overflow-hidden hover:border-[#C9A961]/60 transition-all duration-500 hover:shadow-[0_8px_24px_rgba(140,44,44,0.10)] hover:-translate-y-1">
      <div className="relative overflow-hidden bg-[#FDFBF7] aspect-square">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }} />
        <div className="hidden w-full h-full items-center justify-center bg-[#FDFBF7]">
          <div className="text-center">
            <div className="mx-auto mb-2"><SealLogo size={56} radius="rounded-2xl" /></div>
            <div className="text-[#8C2C2C] font-bold">{product.name}</div>
          </div>
        </div>
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.tag && <span className={`${product.tagColor} text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide`}>{product.tag}</span>}
          {product.badge && <span className="bg-[#C9A961] text-[#5E1B1B] text-[10px] font-bold px-2 py-1 rounded-full">{product.badge}</span>}
        </div>
        <button onClick={() => setLiked(!liked)} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/85 backdrop-blur border border-[#EAE3D8] flex items-center justify-center hover:border-[#C9A961] transition-colors">
          <Heart size={16} className={liked ? 'fill-[#8C2C2C] text-[#8C2C2C]' : 'text-[#6B5D52]'} />
        </button>
      </div>
      <div className="p-5">
        <div className="text-[11px] text-[#A98B4F] font-medium tracking-[0.15em] uppercase mb-1">{product.nameEn}</div>
        <h3 className="text-[#2B2020] font-bold text-sm mb-2 leading-snug">{product.name}</h3>
        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={product.rating} />
          <span className="text-[11px] text-[#6B5D52]">({product.reviews})</span>
        </div>
        <div className="flex items-end gap-3 mb-4">
          <span className="text-xl font-black text-[#8C2C2C]">${product.price}</span>
          <span className="text-sm text-[#6B5D52] line-through">${product.originalPrice}</span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onView(product)} className="flex-1 py-2.5 bg-[#FDFBF7] hover:bg-[#F5EFE3] border border-[#EAE3D8] text-[#2B2020] text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2">
            <ShoppingBag size={13} /> View Details
          </button>
          {onQuickAdd && (
            <button onClick={() => onQuickAdd(product)} className="w-10 h-10 text-[#FDFBF7] rounded-xl transition-all flex items-center justify-center hover:shadow-[0_4px_14px_rgba(140,44,44,0.35)] hover:border-[#C9A961]" style={{background: 'linear-gradient(135deg, #8C2C2C 0%, #7A2525 100%)', border: '1px solid transparent'}}>
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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#EAE3D8] shadow-[0_2px_12px_rgba(43,32,32,0.05)]' : 'bg-[#FDFBF7]/80 backdrop-blur-sm'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-[70px]">
          <button onClick={() => setCurrentPage('home')} className="flex items-center gap-2.5 group">
            <div className="group-hover:scale-105 transition-transform"><SealLogo size={38} /></div>
            <div className="text-left">
              <div className="font-serif-cn text-[#2B2020] font-bold text-lg tracking-tight leading-none">財兜兜 <span className="font-display font-medium text-base">CaiDouDou</span></div>
              <div className="text-[#A98B4F] text-[9px] tracking-[0.25em] uppercase mt-0.5">AI × 香港非遺文創</div>
            </div>
          </button>
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <button key={item.key} onClick={() => setCurrentPage(item.key)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${currentPage === item.key ? 'text-[#8C2C2C] bg-[#F5EFE3]' : 'text-[#6B5D52] hover:text-[#8C2C2C] hover:bg-[#F5EFE3]'}`}>
                <span className="block text-[10px] opacity-50 tracking-wider uppercase">{item.labelEn}</span>
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowCart(true)} className="relative w-10 h-10 rounded-xl bg-white hover:bg-[#F5EFE3] border border-[#EAE3D8] flex items-center justify-center text-[#2B2020] hover:text-[#8C2C2C] transition-all">
              <ShoppingBag size={17} />
              {cartCount > 0 && <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#8C2C2C] text-[#FDFBF7] text-[10px] font-black rounded-full flex items-center justify-center border border-[#C9A961]">{cartCount}</span>}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden w-10 h-10 rounded-xl bg-white border border-[#EAE3D8] flex items-center justify-center text-[#2B2020]">
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>
      {mobileOpen && (
        <div className="lg:hidden bg-[#FDFBF7] border-t border-[#EAE3D8] px-6 py-4 space-y-1">
          {navItems.map(item => (
            <button key={item.key} onClick={() => { setCurrentPage(item.key); setMobileOpen(false); }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${currentPage === item.key ? 'text-[#8C2C2C] bg-[#F5EFE3]' : 'text-[#6B5D52]'}`}>
              <span className="block text-[10px] opacity-50 uppercase tracking-wider">{item.labelEn}</span>{item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ============================================================
//  香港非遺廟宇暖色設計 — 朱紅 × 鎏金 × 米白
// ============================================================

function Hero({ setCurrentPage }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#FDFBF7]">
      {/* 祥云云纹底纹 + 暖色光晕 */}
      <div className="absolute inset-0 pattern-xiangyun"></div>
      <div className="absolute inset-0" style={{background: 'radial-gradient(ellipse 80% 70% at 70% 30%, rgba(201,169,97,0.12) 0%, transparent 60%)'}}></div>
      <div className="absolute inset-0" style={{background: 'radial-gradient(ellipse 50% 50% at 15% 85%, rgba(140,44,44,0.07) 0%, transparent 55%)'}}></div>

      <div className="relative max-w-7xl mx-auto px-8 lg:px-16 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen py-32">
          {/* Left: Brand statement */}
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-px bg-[#C9A961]"></div>
              <span className="text-[#A98B4F] text-[11px] tracking-[0.3em] uppercase font-medium">香港非遺 · 靈感源頭 · Since 2024</span>
            </div>

            <h1 className="font-serif-cn text-6xl lg:text-7xl font-bold text-[#2B2020] leading-[1.05] mb-4 tracking-tight">
              <span className="block">把福氣<span className="text-[#8C2C2C]">兜</span>在身邊</span>
              <span className="block font-display font-light text-2xl lg:text-3xl mt-5 tracking-[0.12em] text-[#A98B4F]">Carry Your Fortune With You</span>
            </h1>

            <p className="text-[#6B5D52] text-lg leading-8 mt-8 mb-6 max-w-md">
              香港非遺祈福信俗 × AI × 情緒陪伴 —— 一只根植于香港非遗、会说话求签的 AI 财神毛绒公仔。
            </p>

            <div className="flex flex-wrap gap-4">
              <button onClick={() => setCurrentPage('shop')} className="btn-primary font-semibold px-8 py-4 text-sm flex items-center gap-2">
                Explore Collection <ArrowRight size={16} />
              </button>
              <button onClick={() => setCurrentPage('story')} className="btn-secondary font-medium px-8 py-4 text-sm">
                Our Story
              </button>
            </div>
          </div>

          {/* Right: Hero image composition */}
          <div className="relative hidden lg:flex justify-center items-center">
            <div className="relative w-[500px] h-[520px]">
              {/* 金色装饰环 */}
              <div className="absolute inset-0 rounded-[3rem] border border-[#C9A961]/25"></div>
              <div className="absolute -inset-4 rounded-[3.5rem] border border-[#C9A961]/10"></div>

              {/* 主图 — 礼盒质感 */}
              <div className="absolute inset-6 rounded-[2.5rem] overflow-hidden border border-[#EAE3D8] bg-white shadow-[0_16px_48px_rgba(140,44,44,0.14)]">
                <img
                  src="/images/hero-caishen.png"
                  alt="財兜兜 CaiDouDou — AI 財神毛絨公仔禮盒"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center"><div class="seal-logo rounded-2xl flex items-center justify-center" style="width:96px;height:96px"><span class="font-serif-cn font-bold" style="font-size:48px">財</span></div></div>';
                  }}
                />
              </div>

              {/* 小图 — 手持 AI 屏幕模块 */}
              <div className="absolute -bottom-6 -left-8 w-44 rounded-2xl overflow-hidden border border-[#EAE3D8] bg-white shadow-[0_10px_30px_rgba(43,32,32,0.16)]">
                <img
                  src="/images/caishen-hand.png"
                  alt="手持 AI 財神 — 屏幕模組展示"
                  className="w-full h-36 object-cover"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div className="px-3 py-2 bg-white border-t border-[#EAE3D8]">
                  <div className="text-[10px] text-[#6B5D52] tracking-wider">AI 求籤 · 情緒陪伴</div>
                </div>
              </div>

              {/* 浮动徽章 */}
              <div className="absolute top-8 -right-4 bg-white border border-[#EAE3D8] rounded-full px-5 py-2.5 flex items-center gap-2.5 shadow-[0_6px_18px_rgba(201,169,97,0.25)]">
                <Sparkles size={13} className="text-[#C9A961]" />
                <span className="text-[#6B5D52] text-xs tracking-wider">EN71 認證 · 香港出品</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <span className="text-[#6B5D52] text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#C9A961] to-transparent"></div>
      </div>
    </section>
  );
}

function HeritageSection({ setCurrentPage }) {
  const stats = [
    { num: '507', label: 'Listed Items', zh: '香港非遺清單項目' },
    { num: '310', label: 'Rituals & Festivals', zh: '社會實踐・儀式・節慶類' },
    { num: '2024', label: 'List Updated', zh: '2024年12月公布' },
  ];
  const heritageItems = [
    {
      icon: <Sparkles size={22} />,
      zh: '大坑舞火龍',
      en: 'Tai Hang Fire Dragon',
      level: '國家級非遺代表作名錄',
      desc: '2011年列入國家級名錄。每逢中秋，火龍巡遊大坑街巷，蓮香與火光承載百年社區祈願。',
    },
    {
      icon: <Users size={22} />,
      zh: '黃大仙信俗',
      en: 'Wong Tai Sin Belief',
      level: '非遺代表作名錄',
      desc: '「有求必應」的民間信俗，求籤問事融入香港人日常，是廟宇文化活態傳承的縮影。',
    },
    {
      icon: <BookOpen size={22} />,
      zh: '粵劇',
      en: 'Cantonese Opera',
      level: '聯合國教科文組織人類非遺名錄',
      desc: '2009年列入人類非物質文化遺產代表作名錄，戲台之上唱唸做打，是嶺南文化的聲音記憶。',
    },
  ];
  return (
    <section className="py-28 bg-white border-t border-[#EAE3D8]">
      <div className="divider-huiwen mb-24" aria-hidden="true"></div>
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-px bg-[#C9A961]/60"></div>
            <span className="text-[#A98B4F] text-[11px] tracking-[0.3em] uppercase font-medium">Hong Kong ICH · 香港非遺</span>
            <div className="w-16 h-px bg-[#C9A961]/60"></div>
          </div>
          <h2 className="font-serif-cn text-4xl lg:text-5xl font-bold text-[#2B2020] mb-6">根植於仍在活著的香港信俗</h2>
          <p className="text-[#6B5D52] text-lg max-w-3xl mx-auto leading-8">
            财兜兜承载的不只是「财神」符号，而是仍在香港庙宇中活着、已被政府列入清单的信俗。
          </p>
          <p className="text-[#A98B4F] text-xs mt-4 tracking-wide">資料來源：康樂及文化事務署非物質文化遺產辦事處</p>
        </div>

        {/* 非遗清单数据 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#EAE3D8] rounded-2xl overflow-hidden mb-16">
          {stats.map(s => (
            <div key={s.label} className="bg-[#FDFBF7] px-8 py-12 text-center group hover:bg-[#F5EFE3] transition-colors">
              <div className="text-5xl lg:text-6xl font-black text-[#8C2C2C] mb-3 group-hover:scale-105 transition-transform font-display">{s.num}</div>
              <div className="text-[#A98B4F] text-[11px] tracking-[0.2em] uppercase mb-2">{s.label}</div>
              <div className="text-[#6B5D52] text-sm">{s.zh}</div>
            </div>
          ))}
        </div>

        {/* 三个代表性项目 */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {heritageItems.map(item => (
            <div key={item.zh} className="bg-[#FDFBF7] border border-[#EAE3D8] rounded-2xl p-8 hover:border-[#C9A961]/60 hover:shadow-[0_8px_24px_rgba(201,169,97,0.15)] transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#8C2C2C] text-[#FDFBF7] flex items-center justify-center mb-5 shadow-[0_4px_12px_rgba(140,44,44,0.2)]">{item.icon}</div>
              <div className="flex items-baseline gap-3 mb-1.5">
                <h3 className="font-serif-cn text-xl font-bold text-[#2B2020]">{item.zh}</h3>
              </div>
              <div className="text-[11px] text-[#A98B4F] tracking-[0.12em] uppercase mb-3">{item.en}</div>
              <div className="inline-block text-[11px] font-semibold text-[#8C2C2C] bg-[#F5EFE3] border border-[#C9A961]/40 rounded-full px-3 py-1 mb-4">{item.level}</div>
              <p className="text-[#6B5D52] text-sm leading-7">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* 背书行 */}
        <div className="border-t border-[#EAE3D8] pt-10 text-center">
          <p className="text-[#6B5D52] text-sm leading-7 max-w-3xl mx-auto">
            <span className="text-[#8C2C2C] font-semibold">獲香港文武廟、蓬瀛仙館、黃大仙等宗教場所認可</span>
            <span className="mx-2 text-[#C9A961]">·</span>
            香港教育大學文化傳承教育及管理碩士課程師生團隊支持
          </p>
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  const certifications = [
    'EN 71-1 / -2 / -3',
    'EN IEC 62115:2020+A11:2020',
    'REACH (EC) No.1907/2006 · 7P',
    'AZO 偶氮染料',
    'CE · 2009/48/EC',
    'UK Toys (Safety) Regs 2011',
  ];
  return (
    <section className="py-28 bg-[#FDFBF7] border-t border-[#EAE3D8]">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-px bg-[#C9A961]/60"></div>
            <span className="text-[#A98B4F] text-[11px] tracking-[0.3em] uppercase font-medium">Trust &amp; Authenticity · 正版與安全</span>
            <div className="w-16 h-px bg-[#C9A961]/60"></div>
          </div>
          <h2 className="font-serif-cn text-4xl lg:text-5xl font-bold text-[#2B2020] mb-6">正版認證 · 安全守護</h2>
          <p className="text-[#6B5D52] text-lg max-w-2xl mx-auto leading-8">
            從商標註冊到玩具安全檢測，每一件財兜兜都有據可查。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* 商标 */}
          <div className="bg-white border border-[#EAE3D8] rounded-3xl p-10 hover:border-[#C9A961]/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#8C2C2C] text-[#FDFBF7] flex items-center justify-center mb-6 shadow-[0_4px_12px_rgba(140,44,44,0.2)]"><ShieldCheck size={22} /></div>
            <h3 className="font-serif-cn text-2xl font-bold text-[#2B2020] mb-4">香港註冊商標</h3>
            <p className="text-[#6B5D52] leading-7 mb-5 text-sm">
              品牌「財兜兜」為香港註冊商標（第28類 玩具類），註冊編號 <span className="text-[#8C2C2C] font-semibold">307339168</span>，香港知識產權署商標註冊處。
            </p>
            <div className="text-[11px] text-[#A98B4F] tracking-wide uppercase">Registered Trademark · IP Hong Kong</div>
          </div>

          {/* 出品方 */}
          <div className="bg-white border border-[#EAE3D8] rounded-3xl p-10 hover:border-[#C9A961]/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#8C2C2C] text-[#FDFBF7] flex items-center justify-center mb-6 shadow-[0_4px_12px_rgba(140,44,44,0.2)]"><Globe size={22} /></div>
            <h3 className="font-serif-cn text-2xl font-bold text-[#2B2020] mb-4">香港本土出品</h3>
            <p className="text-[#6B5D52] leading-7 mb-5 text-sm">
              出品方 <span className="text-[#8C2C2C] font-semibold">HK WENWIN MOMENTUM LIMITED</span>（香港文運亨通有限公司）—— 一家扎根香港的文創公司。
            </p>
            <div className="text-[11px] text-[#A98B4F] tracking-wide uppercase">Made with Heart in Hong Kong</div>
          </div>

          {/* 安全认证 */}
          <div className="bg-white border border-[#EAE3D8] rounded-3xl p-10 hover:border-[#C9A961]/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#8C2C2C] text-[#FDFBF7] flex items-center justify-center mb-6 shadow-[0_4px_12px_rgba(140,44,44,0.2)]"><Award size={22} /></div>
            <h3 className="font-serif-cn text-2xl font-bold text-[#2B2020] mb-4">權威安全檢測</h3>
            <p className="text-[#6B5D52] leading-7 mb-5 text-sm">
              檢測機構 <span className="text-[#8C2C2C] font-semibold">Bureau Veritas 必維</span>，全部項目 <span className="text-[#8C2C2C] font-semibold">PASS</span>。
            </p>
            <div className="text-[11px] text-[#A98B4F] tracking-wide uppercase">Toy Safety Tested &amp; Passed</div>
          </div>
        </div>

        {/* 认证明细 chips */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {certifications.map(c => (
            <span key={c} className="inline-flex items-center gap-2 bg-white border border-[#C9A961]/40 text-[#2B2020] text-xs font-medium rounded-full px-4 py-2">
              <CheckCircle size={13} className="text-[#8C2C2C] shrink-0" />{c}
            </span>
          ))}
        </div>
        <p className="text-center text-[#6B5D52] text-xs mt-4 leading-6 max-w-2xl mx-auto">
          檢測覆蓋：機械物理性能 / 燃燒性能 / 元素遷移（EN 71-1/-2/-3）、電動玩具安全（EN IEC 62115）、鄰苯二甲酸鹽（REACH 7P）與偶氮染料；符合歐盟 Toy Safety Directive 2009/48/EC（CE）及英國 The Toys (Safety) Regulations 2011。
        </p>

        {/* AI 伦理护栏 */}
        <div className="mt-10 border border-[#EAE3D8] bg-white rounded-2xl px-8 py-6 max-w-3xl mx-auto">
          <p className="text-[#6B5D52] text-xs leading-6 text-center">
            <span className="text-[#8C2C2C] font-semibold">AI 倫理護欄：</span>
            籤文與建議由 AI 結合道家思想語料生成並設人工複核機制；產品定位為情緒陪伴與傳統文化的當代轉譯，不預測、不承諾、不作為決策依據。
          </p>
        </div>
      </div>
    </section>
  );
}

function ProductShowcase({ setCurrentPage, products }) {
  const featured = (products || []).slice(0, 4);
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-16 h-px bg-[#C9A961]/60"></div>
            <span className="text-[#A98B4F] text-[11px] tracking-[0.3em] uppercase font-medium">Featured Collection</span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-serif-cn text-4xl lg:text-6xl font-bold text-[#2B2020] mb-4">財兜兜系列</h2>
              <p className="text-[#6B5D52] text-lg max-w-xl">由 AI 與香港非遺紋樣共同孕育的東方美學，把福氣做成可以隨身攜帶的溫度。</p>
            </div>
            <button onClick={() => setCurrentPage('shop')} className="hidden lg:flex items-center gap-2 text-[#8C2C2C] hover:text-[#7A2525] text-sm font-medium transition-colors group">
              View All {products?.length || 0} Pieces <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((p) => (
            <div key={p.id} className="group cursor-pointer" onClick={() => setCurrentPage('shop')}>
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-[#FDFBF7] border border-[#EAE3D8] mb-6 group-hover:border-[#C9A961]/60 transition-all">
                <img
                  src={p.images[0]}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center"><div class="seal-logo rounded-2xl flex items-center justify-center" style="width:72px;height:72px"><span class="font-serif-cn font-bold" style="font-size:36px">財</span></div></div>';
                  }}
                />
              </div>
              <div className="text-[#A98B4F] text-[10px] tracking-[0.2em] uppercase mb-2">{p.nameEn}</div>
              <h3 className="text-xl font-serif-cn font-bold text-[#2B2020] mb-2">{p.name}</h3>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-black text-[#8C2C2C]">${p.price}</span>
                <span className="text-sm text-[#6B5D52] line-through">${p.originalPrice}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center lg:hidden">
          <button onClick={() => setCurrentPage('shop')} className="inline-flex items-center gap-2 text-[#8C2C2C] hover:text-[#7A2525] text-sm font-medium transition-colors">
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
    { icon: <ShieldCheck size={20} />, label: 'EN71 Certified', sub: 'Bureau Veritas tested' },
    { icon: <RefreshCw size={20} />, label: '30-Day Returns', sub: 'No questions asked' },
    { icon: <Award size={20} />, label: '香港註冊商標', sub: 'Reg. 307339168' },
  ];
  return (
    <section className="py-20 bg-[#FDFBF7] border-t border-[#EAE3D8]">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {features.map((f, i) => (
            <div key={i} className="flex items-start gap-4 group">
              <div className="text-[#A98B4F] mt-1 shrink-0 group-hover:text-[#8C2C2C] transition-colors">{f.icon}</div>
              <div>
                <div className="text-[#2B2020] text-sm font-semibold">{f.label}</div>
                <div className="text-[#6B5D52] text-xs mt-1">{f.sub}</div>
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
    <section className="py-28 bg-white border-t border-[#EAE3D8]">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-16 h-px bg-[#C9A961]/60"></div>
            <span className="text-[#A98B4F] text-[11px] tracking-[0.3em] uppercase font-medium">Testimonials</span>
          </div>
          <h2 className="font-serif-cn text-4xl lg:text-5xl font-bold text-[#2B2020]">把福氣帶到世界各地</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {REVIEWS.slice(0, 4).map((r, i) => (
            <div key={i} className="bg-[#FDFBF7] border border-[#EAE3D8] rounded-3xl p-8 lg:p-10 hover:border-[#C9A961]/50 transition-all">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={14} className="fill-[#C9A961] text-[#C9A961]" />
                ))}
              </div>
              <p className="text-[#2B2020] text-lg leading-8 mb-8">"{r.text}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[#2B2020] font-semibold">{r.name}</div>
                  <div className="text-[#6B5D52] text-sm">{r.location}</div>
                </div>
                <div className="text-[#A98B4F] text-xs tracking-wider uppercase">{r.product}</div>
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
    <section className="relative py-28 bg-[#FDFBF7] border-t border-[#EAE3D8] overflow-hidden">
      <div className="absolute inset-0 pattern-xiangyun" aria-hidden="true"></div>
      <div className="relative max-w-3xl mx-auto px-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-16 h-px bg-[#C9A961]/60"></div>
          <span className="text-[#A98B4F] text-[11px] tracking-[0.3em] uppercase font-medium">Stay Connected</span>
          <div className="w-16 h-px bg-[#C9A961]/60"></div>
        </div>
        <h2 className="font-serif-cn text-4xl lg:text-5xl font-bold text-[#2B2020] mb-6">加入福氣圈</h2>
        <p className="text-[#6B5D52] text-lg mb-12 max-w-xl mx-auto">Be the first to know about new collections, exclusive offers, and fortune tips.</p>
        {submitted ? (
          <div className="bg-white border border-[#C9A961]/50 text-[#8C2C2C] rounded-2xl px-8 py-6 text-lg shadow-[0_4px_16px_rgba(201,169,97,0.15)]">Thank you! You'll hear from us soon.</div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required className="flex-1 bg-white border border-[#EAE3D8] text-[#2B2020] placeholder-[#A98B4F]/60 px-6 py-4 rounded-xl text-sm focus:outline-none focus:border-[#8C2C2C] transition-colors" />
            <button type="submit" className="btn-primary font-semibold px-8 py-4 text-sm flex items-center justify-center gap-2 shrink-0">
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
    <div className="pt-32 pb-32 bg-[#FDFBF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-[#C9A961]/60"></div>
            <span className="text-[#A98B4F] text-[11px] tracking-[0.3em] uppercase font-medium">Complete Collection</span>
            <div className="w-12 h-px bg-[#C9A961]/60"></div>
          </div>
          <h2 className="font-serif-cn text-5xl lg:text-6xl font-bold text-[#2B2020] mb-4">全部商品</h2>
          <p className="text-[#6B5D52] text-lg">香港非遺 × AI 獨家系列 · {products?.length || 0} Products</p>
        </div>

        <div className="flex justify-center gap-3 mb-16 flex-wrap">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${filter === f ? 'text-[#FDFBF7]' : 'bg-white text-[#6B5D52] border border-[#EAE3D8] hover:border-[#C9A961] hover:text-[#8C2C2C]'}`} style={filter === f ? {background: 'linear-gradient(135deg, #8C2C2C 0%, #7A2525 100%)'} : {}}>
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B2020]/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white border border-[#EAE3D8] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-[0_24px_64px_rgba(43,32,32,0.25)]" onClick={e => e.stopPropagation()}>
        <div className="grid md:grid-cols-2 gap-0">
          <div className="bg-[#FDFBF7] p-8">
            <div className="aspect-square bg-white rounded-2xl overflow-hidden mb-6 flex items-center justify-center border border-[#EAE3D8]">
              <img src={product.images[activeImg]} alt={product.name} className="w-full h-full object-cover" onError={e => { e.target.style.display='none'; }} />
            </div>
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)} className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${activeImg === i ? 'border-[#C9A961]' : 'border-[#EAE3D8] opacity-60 hover:opacity-100'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" onError={e => e.target.style.display='none'} />
                </button>
              ))}
            </div>
          </div>
          <div className="p-8 lg:p-10">
            <button onClick={onClose} className="w-10 h-10 rounded-full bg-[#FDFBF7] border border-[#EAE3D8] flex items-center justify-center text-[#6B5D52] hover:text-[#8C2C2C] float-right transition-colors"><X size={18} /></button>
            <div className="text-xs text-[#A98B4F] font-medium tracking-[0.2em] uppercase mb-3">{product.nameEn}</div>
            <h2 className="text-3xl font-serif-cn font-bold text-[#2B2020] mb-2">{product.name}</h2>
            <div className="flex items-center gap-3 mb-6">
              <StarRating rating={product.rating} />
              <span className="text-xs text-[#6B5D52]">{product.reviews} reviews</span>
            </div>
            <div className="flex items-end gap-4 mb-8">
              <span className="text-4xl font-black text-[#8C2C2C]">${product.price}</span>
              <span className="text-lg text-[#6B5D52] line-through">${product.originalPrice}</span>
              <span className="bg-[#F5EFE3] text-[#8C2C2C] border border-[#C9A961]/40 text-sm font-bold px-3 py-1 rounded-full">-{Math.round((1-product.price/product.originalPrice)*100)}%</span>
            </div>
            <p className="text-[#6B5D52] leading-relaxed mb-8">{product.description}</p>
            <ul className="space-y-3 mb-8">
              {product.features.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-[#2B2020]"><CheckCircle size={14} className="text-[#8C2C2C] shrink-0" />{f}</li>
              ))}
            </ul>
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-[#FDFBF7] border border-[#EAE3D8] rounded-xl">
                <button onClick={() => setQty(Math.max(1, qty-1))} className="w-12 h-12 flex items-center justify-center text-[#2B2020] font-bold text-lg hover:bg-[#F5EFE3] rounded-l-xl transition-colors">-</button>
                <span className="w-12 text-center text-[#2B2020] font-bold">{qty}</span>
                <button onClick={() => setQty(qty+1)} className="w-12 h-12 flex items-center justify-center text-[#2B2020] font-bold text-lg hover:bg-[#F5EFE3] rounded-r-xl transition-colors">+</button>
              </div>
              <button onClick={handleAdd} className={`flex-1 py-4 rounded-xl font-bold text-sm transition-all ${added ? 'bg-[#C9A961] text-[#5E1B1B]' : 'btn-primary'}`}>
                {added ? <><CheckCircle size={16} className="inline mr-2" />Added to Cart</> : <><ShoppingBag size={16} className="inline mr-2" />Add to Cart</>}
              </button>
            </div>
            <div className="border-t border-[#EAE3D8] pt-6 space-y-3 text-xs text-[#6B5D52]">
              <div className="flex items-center gap-3"><Truck size={14} /> 全球免運 · Orders over $39</div>
              <div className="flex items-center gap-3"><RefreshCw size={14} /> 30天退換保障</div>
              <div className="flex items-center gap-3"><Award size={14} /> EN71 / IEC 62115 檢測通過（Bureau Veritas）</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StoryPage({ setCurrentPage }) {
  return (
    <div className="pt-32 pb-32 bg-[#FDFBF7] min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-24">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-[#C9A961]/60"></div>
            <span className="text-[#A98B4F] text-[11px] tracking-[0.3em] uppercase font-medium">Our Story</span>
            <div className="w-12 h-px bg-[#C9A961]/60"></div>
          </div>
          <h2 className="font-serif-cn text-5xl lg:text-6xl font-bold text-[#2B2020] mb-6">品牌故事</h2>
          <p className="text-[#6B5D52] text-lg max-w-2xl mx-auto">Where temple warmth meets artificial intelligence · 香港非遺 × AI</p>
        </div>

        <div className="space-y-24">
          {/* 名字由来 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="text-[#A98B4F] text-[11px] tracking-[0.3em] uppercase mb-4">The Name · 名字由來</div>
              <h3 className="font-serif-cn text-3xl font-bold text-[#2B2020] mb-6">把福氣兜在身上</h3>
              <p className="text-[#6B5D52] leading-8 mb-6">
                「財」是財神的財；「兜兜」是廣東話裡圓潤可愛的意思——把福氣兜在身上，隨身帶著走。
              </p>
              <p className="text-[#6B5D52] leading-8">
                一個「兜」字，既是口袋，也是懷抱。財兜兜希望把廟宇裡那份踏實的祝福，做成可以放進日常的一件小物。
              </p>
            </div>
            <div className="order-1 md:order-2">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-white border border-[#EAE3D8] shadow-[0_8px_24px_rgba(43,32,32,0.08)]">
                <img src="/images/giftbox-red.jpg" alt="財兜兜紅禮盒" className="w-full h-full object-cover" onError={e => { e.target.style.display='none'; e.target.parentElement.innerHTML='<div class="w-full h-full flex items-center justify-center"><div class="seal-logo rounded-2xl flex items-center justify-center" style="width:80px;height:80px"><span class="font-serif-cn font-bold" style="font-size:40px">財</span></div></div>'; }} />
              </div>
              <div className="text-[#6B5D52] text-xs mt-3 text-center">紅禮盒實拍 · 福氣的第一層包裝</div>
            </div>
          </div>

          {/* 色彩与母题 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-white border border-[#EAE3D8] shadow-[0_8px_24px_rgba(43,32,32,0.08)]">
                <img src="/images/showcase.jpg" alt="財兜兜產品陳列" className="w-full h-full object-cover" onError={e => { e.target.style.display='none'; }} />
              </div>
              <div className="text-[#6B5D52] text-xs mt-3 text-center">產品陳列實拍</div>
            </div>
            <div>
              <div className="text-[#A98B4F] text-[11px] tracking-[0.3em] uppercase mb-4">Colour & Motif · 色彩與母題</div>
              <h3 className="font-serif-cn text-3xl font-bold text-[#2B2020] mb-6">廟宇裡的暖色</h3>
              <p className="text-[#6B5D52] leading-8 mb-6">
                朱紅、鎏金、米白——取自香港廟宇的門簾、供案與香燭。這三種顏色不出自任何設計趨勢，而是信俗空間裡日復一日的光。
              </p>
              <p className="text-[#6B5D52] leading-8">
                金元寶、紅綢、招財進寶印、財冠流蘇——每一個母題都對應財神信俗裡真實的器物紋樣，縫進毛絨與掛繩之間。
              </p>
              <div className="flex gap-3 mt-6">
                <span className="w-10 h-10 rounded-full bg-[#8C2C2C] border border-[#C9A961]/50" title="朱紅"></span>
                <span className="w-10 h-10 rounded-full bg-[#C9A961] border border-[#C9A961]/50" title="鎏金"></span>
                <span className="w-10 h-10 rounded-full bg-[#FDFBF7] border border-[#EAE3D8]" title="米白"></span>
              </div>
            </div>
          </div>

          {/* 三层转译 */}
          <div>
            <div className="text-center mb-12">
              <div className="text-[#A98B4F] text-[11px] tracking-[0.3em] uppercase mb-4">Three Translations · 三層轉譯</div>
              <h3 className="font-serif-cn text-3xl font-bold text-[#2B2020] mb-4">非遺不是被收藏的，是被繼續使用的</h3>
              <p className="text-[#6B5D52] text-base max-w-2xl mx-auto">從廟宇到掌心，我們把信俗拆成三層，逐一轉譯成當代物件。</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { layer: '器物層', from: '神龕金身', to: '掌心掛件', desc: '把廟裡供案上的財神形象，縮小成可以隨身攜帶的毛絨掛件。' },
                { layer: '內容層', from: '廟祝口傳', to: 'AI語音籤語', desc: '求籤問事的口述傳統，轉譯為 AI 語音互動與籤語陪伴。' },
                { layer: '關係層', from: '偶發的廟宇叩問', to: '每天的一次對話', desc: '從一年幾次的進香，變成日常裡觸手可及的一句問候。' },
              ].map(t => (
                <div key={t.layer} className="bg-white border border-[#EAE3D8] rounded-2xl p-8 hover:border-[#C9A961]/60 transition-all">
                  <div className="text-[#8C2C2C] font-serif-cn font-bold text-lg mb-3">{t.layer}</div>
                  <div className="flex items-center gap-2 text-sm text-[#6B5D52] mb-4">
                    <span>{t.from}</span>
                    <ArrowRight size={13} className="text-[#C9A961] shrink-0" />
                    <span className="text-[#2B2020] font-semibold">{t.to}</span>
                  </div>
                  <p className="text-[#6B5D52] text-sm leading-7">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 田野考察 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="text-[#A98B4F] text-[11px] tracking-[0.3em] uppercase mb-4">Fieldwork · 田野考察</div>
              <h3 className="font-serif-cn text-3xl font-bold text-[#2B2020] mb-6">從廟宇現場開始</h3>
              <p className="text-[#6B5D52] leading-8 mb-6">
                團隊在香港文武廟、蓬瀛仙館、慈山寺等宗教場所長期田野考察，記錄供桌陳設、香燭儀式與參拜者的提問方式。
              </p>
              <p className="text-[#6B5D52] leading-8">
                財兜兜的紋樣、語料與互動邏輯，都來自這些現場筆記——而不是憑空想像的「東方風」。
              </p>
            </div>
            <div className="order-1 md:order-2">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-white border border-[#EAE3D8] shadow-[0_8px_24px_rgba(43,32,32,0.08)]">
                <img src="/images/exhibition.jpg" alt="香港教育大學展示會實拍" className="w-full h-full object-cover" onError={e => { e.target.style.display='none'; }} />
              </div>
              <div className="text-[#6B5D52] text-xs mt-3 text-center">香港教育大學展示會實拍</div>
            </div>
          </div>

          {/* 点题引言 */}
          <div className="bg-white border border-[#EAE3D8] rounded-3xl p-10 lg:p-16 text-center shadow-[0_8px_24px_rgba(201,169,97,0.12)]">
            <div className="flex justify-center mb-6"><SealLogo size={56} radius="rounded-2xl" /></div>
            <blockquote className="max-w-xl mx-auto">
              <p className="font-serif-cn text-[#2B2020] text-2xl leading-9">「非遺不是被收藏的，<br />是被繼續使用的。」</p>
              <p className="text-[#A98B4F] text-sm mt-6">— 財兜兜 CaiDouDou</p>
            </blockquote>
          </div>
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
    <div className="pt-32 pb-32 bg-[#FDFBF7] min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-[#C9A961]/60"></div>
            <span className="text-[#A98B4F] text-[11px] tracking-[0.3em] uppercase font-medium">Contact</span>
            <div className="w-12 h-px bg-[#C9A961]/60"></div>
          </div>
          <h2 className="font-serif-cn text-5xl lg:text-6xl font-bold text-[#2B2020] mb-6">聯絡我們</h2>
          <p className="text-[#6B5D52] text-lg">We'd love to hear from you</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          {[
            { icon: <Mail size={24} />, title: 'Email', content: 'hello@blingjew.com' },
            { icon: <MapPin size={24} />, title: 'Company', content: 'HK WENWIN MOMENTUM LIMITED · 香港' },
            { icon: <Clock size={24} />, title: 'Hours', content: 'Mon-Fri 9am-6pm HKT' },
          ].map(({ icon, title, content }) => (
            <div key={title} className="bg-white border border-[#EAE3D8] rounded-2xl p-8 text-center hover:border-[#C9A961]/50 transition-all">
              <div className="w-14 h-14 bg-[#F5EFE3] rounded-xl flex items-center justify-center mx-auto mb-6 text-[#8C2C2C]">{icon}</div>
              <div className="text-[#2B2020] font-semibold text-sm mb-2">{title}</div>
              <div className="text-[#6B5D52] text-sm">{content}</div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-[#EAE3D8] rounded-3xl p-8 lg:p-12 shadow-[0_8px_24px_rgba(43,32,32,0.05)]">
          {sent ? (
            <div className="text-center py-16">
              <div className="flex justify-center mb-6"><SealLogo size={64} radius="rounded-2xl" /></div>
              <div className="text-[#2B2020] font-serif-cn text-2xl font-bold mb-4">Message Sent!</div>
              <div className="text-[#6B5D52]">We will get back to you within 24 hours.</div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <input required placeholder="Your Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="bg-[#FDFBF7] border border-[#EAE3D8] text-[#2B2020] placeholder-[#A98B4F]/60 px-5 py-4 rounded-xl text-sm focus:outline-none focus:border-[#8C2C2C] transition-colors" />
                <input required type="email" placeholder="Email Address" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="bg-[#FDFBF7] border border-[#EAE3D8] text-[#2B2020] placeholder-[#A98B4F]/60 px-5 py-4 rounded-xl text-sm focus:outline-none focus:border-[#8C2C2C] transition-colors" />
              </div>
              <input required placeholder="Subject" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} className="w-full bg-[#FDFBF7] border border-[#EAE3D8] text-[#2B2020] placeholder-[#A98B4F]/60 px-5 py-4 rounded-xl text-sm focus:outline-none focus:border-[#8C2C2C] transition-colors" />
              <textarea required rows={6} placeholder="Your Message" value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full bg-[#FDFBF7] border border-[#EAE3D8] text-[#2B2020] placeholder-[#A98B4F]/60 px-5 py-4 rounded-xl text-sm focus:outline-none focus:border-[#8C2C2C] transition-colors resize-none" />
              <button type="submit" className="btn-primary w-full font-semibold py-5 text-sm">Send Message</button>
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
    <footer className="bg-[#5E1B1B] pt-20 pb-12 border-t-2 border-[#C9A961]/50">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2.5 mb-6">
              <div className="bg-[#8C2C2C] rounded-lg flex items-center justify-center border border-[#C9A961]/60" style={{width: 40, height: 40}}>
                <span className="font-serif-cn text-[#FDFBF7] font-bold" style={{fontSize: 20}}>財</span>
              </div>
              <div>
                <div className="font-serif-cn text-[#FDFBF7] font-bold text-lg tracking-tight">財兜兜 <span className="font-display font-medium text-base">CaiDouDou</span></div>
                <div className="text-[#C9A961] text-[9px] tracking-[0.2em] uppercase">AI × 香港非遺文創</div>
              </div>
            </div>
            <p className="text-[#FDFBF7]/60 text-sm leading-7 mb-6">Rooted in Hong Kong intangible cultural heritage — AI-powered fortune companions, shipped worldwide.</p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-[#C9A961]/30 flex items-center justify-center text-[#C9A961] hover:bg-[#C9A961]/10 hover:border-[#C9A961] transition-all">
                <InstagramIcon size={18} />
              </a>
            </div>
          </div>
          <div>
            <div className="text-[#FDFBF7] font-semibold text-sm mb-6">Shop</div>
            <div className="space-y-4">
              {[
                { label: '全部商品', key: 'shop' },
                { label: '品牌故事', key: 'story' },
                { label: '聯絡我們', key: 'contact' },
              ].map(({ label, key }) => (
                <button key={key} onClick={() => setCurrentPage(key)} className="block text-[#FDFBF7]/60 hover:text-[#C9A961] text-sm transition-colors">{label}</button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[#FDFBF7] font-semibold text-sm mb-6">Support</div>
            <div className="space-y-4">
              {['Shipping Info', 'Returns & Exchanges', 'FAQ', 'Privacy Policy'].map(l => (
                <a key={l} href="#" className="block text-[#FDFBF7]/60 hover:text-[#C9A961] text-sm transition-colors">{l}</a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[#FDFBF7] font-semibold text-sm mb-6">Contact</div>
            <div className="space-y-4 text-[#FDFBF7]/60 text-sm">
              <div>hello@blingjew.com</div>
              <div>Hong Kong</div>
              <div>HK WENWIN MOMENTUM LIMITED<br /><span className="text-[#C9A961]/80">香港文運亨通有限公司</span></div>
            </div>
          </div>
        </div>
        <div className="border-t border-[#C9A961]/25 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[#FDFBF7]/50 text-xs leading-6 text-center sm:text-left">
            <div className="mb-1 text-[#C9A961]/80">財兜兜™ 香港註冊商標 307339168 · EN71 / IEC 62115 / REACH 測試通過（Bureau Veritas）</div>
            <div>© {year} HK WENWIN MOMENTUM LIMITED · blingjew.com · All rights reserved.</div>
          </div>
          <div className="flex items-center gap-4">
            <img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.0.0/flags/4x3/hk.svg" alt="HK" className="h-5 opacity-40 rounded-sm" />
            <img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.0.0/flags/4x3/gb.svg" alt="UK" className="h-5 opacity-40 rounded-sm" />
            <img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.0.0/flags/4x3/us.svg" alt="US" className="h-5 opacity-40 rounded-sm" />
            <img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.0.0/flags/4x3/au.svg" alt="AU" className="h-5 opacity-40 rounded-sm" />
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
    <div className="fixed inset-0 z-50 bg-[#2B2020]/60 backdrop-blur-sm flex justify-end" onClick={onClose}>
      <div className="w-full max-w-md bg-[#FDFBF7] border-l border-[#EAE3D8] h-full flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-[#EAE3D8]">
          <h2 className="font-serif-cn text-xl font-bold text-[#2B2020]">購物車</h2>
          <button onClick={onClose} className="w-10 h-10 rounded-xl bg-white border border-[#EAE3D8] flex items-center justify-center text-[#6B5D52] hover:text-[#8C2C2C] transition-colors"><X size={18} /></button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-10">
          <div className="opacity-30 mb-6"><SealLogo size={64} radius="rounded-2xl" /></div>
          <div className="text-[#6B5D52]">您的購物車是空的</div>
        </div>
      </div>
    </div>
  );
  return (
    <div className="fixed inset-0 z-50 bg-[#2B2020]/60 backdrop-blur-sm flex justify-end" onClick={onClose}>
      <div className="w-full max-w-md bg-[#FDFBF7] border-l border-[#EAE3D8] h-full flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-[#EAE3D8]">
          <h2 className="font-serif-cn text-xl font-bold text-[#2B2020]">購物車 ({items.reduce((s,i) => s+i.qty, 0)})</h2>
          <button onClick={onClose} className="w-10 h-10 rounded-xl bg-white border border-[#EAE3D8] flex items-center justify-center text-[#6B5D52] hover:text-[#8C2C2C] transition-colors"><X size={18} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.map(item => (
            <div key={item.id} className="flex gap-4 bg-white border border-[#EAE3D8] rounded-2xl p-4">
              <img src={item.images ? item.images[0] : item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover bg-[#FDFBF7] border border-[#EAE3D8] shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-[#2B2020] text-sm font-semibold truncate">{item.name}</div>
                <div className="text-[#8C2C2C] text-sm font-bold mt-1">${item.price}</div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2 bg-[#FDFBF7] rounded-lg border border-[#EAE3D8]">
                    <button onClick={() => onUpdateQty(item.id, item.qty - 1)} className="w-8 h-8 flex items-center justify-center text-[#2B2020] text-xs hover:bg-[#F5EFE3] rounded-l-lg transition-colors"><Minus size={12} /></button>
                    <span className="text-[#2B2020] text-xs font-bold w-6 text-center">{item.qty}</span>
                    <button onClick={() => onUpdateQty(item.id, item.qty + 1)} className="w-8 h-8 flex items-center justify-center text-[#2B2020] text-xs hover:bg-[#F5EFE3] rounded-r-lg transition-colors"><Plus size={12} /></button>
                  </div>
                  <button onClick={() => onRemove(item.id)} className="text-[#6B5D52] hover:text-[#8C2C2C] text-xs transition-colors">移除</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-6 border-t border-[#EAE3D8] space-y-4">
          <div className="flex gap-3">
            <input value={promo} onChange={e => setPromo(e.target.value)} placeholder="優惠碼" className="flex-1 bg-white border border-[#EAE3D8] text-[#2B2020] placeholder-[#A98B4F]/60 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[#8C2C2C] transition-colors" />
            <button onClick={handlePromo} className="bg-white hover:bg-[#F5EFE3] border border-[#EAE3D8] text-[#2B2020] px-5 py-3 rounded-xl text-sm font-medium transition-colors">套用</button>
          </div>
          {discount > 0 && <div className="text-[#8C2C2C] text-sm text-center">優惠已套用：-{Math.round(discount*100)}%</div>}
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-[#6B5D52]"><span>小計</span><span>${total.toFixed(2)}</span></div>
            {discount > 0 && <div className="flex justify-between text-sm text-[#8C2C2C]"><span>節省</span><span>-${(total*discount).toFixed(2)}</span></div>}
            <div className="flex justify-between text-xl font-black text-[#2B2020] pt-3 border-t border-[#EAE3D8]"><span>合計</span><span className="text-[#8C2C2C]">${final.toFixed(2)}</span></div>
          </div>
          <button onClick={onCheckout} disabled={items.length === 0} className="btn-primary w-full py-4 disabled:opacity-50 font-bold text-sm flex items-center justify-center gap-2">
            <CreditCard size={16} /> Secure Checkout
          </button>
          <div className="flex items-center justify-center gap-6 text-[#6B5D52] text-xs">
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
    <div className="min-h-screen bg-[#FDFBF7] text-[#2B2020] font-sans">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} cartCount={cartCount} setShowCart={setShowCart} />
      {currentPage === 'home' && <><Hero setCurrentPage={setCurrentPage} /><HeritageSection /><ProductShowcase setCurrentPage={setCurrentPage} products={products} /><Features /><TrustSection /><ReviewsSection /><Newsletter /></>}
      {currentPage === 'shop' && <ShopPage setCurrentPage={setCurrentPage} onViewProduct={handleViewProduct} onQuickAdd={addItem} products={products} />}
      {currentPage === 'story' && <StoryPage setCurrentPage={setCurrentPage} />}
      {currentPage === 'contact' && <ContactPage />}
      {selectedProduct && <ProductModal product={selectedProduct} onClose={handleCloseModal} onAddToCart={handleAddToCart} />}
      {showCart && <CartSidebar items={items} onClose={() => setShowCart(false)} onRemove={removeItem} onUpdateQty={updateQty} onCheckout={handleCheckout} total={total} />}
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
