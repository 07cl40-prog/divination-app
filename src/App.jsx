import React, { useState, useEffect } from 'react';
import { Star, Calendar, Zap, Eye, Heart, Sparkles, Clock, ChevronRight, Menu, Users, Bot, Crystal, Wand2, Compass, Sun, Moon } from 'lucide-react';
import axios from 'axios';

// 香港文運亨通 - 雙板塊設計：在線真人算命 + 專業AI排盤

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://divination-app-backend-production.up.railway.app/api';

// 大師分類配置
const DIVINER_CATEGORIES = [
  { key: 'bazi', name: '八字命理', icon: '📜', color: 'from-amber-500 to-orange-500' },
  { key: 'ziwei', name: '紫微斗數', icon: '⭐', color: 'from-purple-500 to-pink-500' },
  { key: 'fengshui', name: '風水堪輿', icon: '🏔️', color: 'from-green-500 to-emerald-500' },
  { key: 'tarot', name: '塔羅占卜', icon: '🃏', color: 'from-blue-500 to-indigo-500' },
  { key: 'astrology', name: '星座運勢', icon: '🌟', color: 'from-violet-500 to-purple-500' },
  { key: 'qimen', name: '奇門遁甲', icon: '☯️', color: 'from-cyan-500 to-blue-500' },
];

export default function DivinationApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedDiviner, setSelectedDiviner] = useState(null);
  const [user, setUser] = useState(null);
  const [diviners, setDiviners] = useState([]);
  const [sortBy, setSortBy] = useState('rating');
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSection, setActiveSection] = useState('ai');

  useEffect(() => {
    fetchDiviners();
  }, [sortBy]);

  const fetchDiviners = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/diviners`, {
        params: { sort: sortBy, limit: 12 }
      });
      setDiviners(response.data.diviners);
    } catch (error) {
      console.error('獲取先生列表失敗:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* 動態背景 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a2e] via-[#0a0a0f] to-[#0a1a2e]"></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.5) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}></div>
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-pink-600/15 rounded-full blur-[100px] animate-pulse-slow-delay"></div>
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-cyan-600/10 rounded-full blur-[80px] animate-float"></div>
      </div>

      {/* 導航欄 */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a0a0f]/80 border-b border-purple-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="text-3xl animate-float">🔮</div>
                <div className="absolute inset-0 bg-purple-500/50 blur-xl rounded-full"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  香港文運亨通
                </h1>
                <p className="text-[10px] text-purple-400/60 tracking-widest">連接宇宙的智慧</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-2">
              {['home', 'profile'].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    currentPage === page
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {page === 'home' ? '首頁' : '我的'}
                </button>
              ))}
            </div>

            <button className="md:hidden p-2 rounded-lg hover:bg-white/5" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-purple-500/10 bg-[#0a0a0f]/95 backdrop-blur-xl">
            <div className="px-4 py-3 space-y-2">
              {['home', 'profile'].map((page) => (
                <button
                  key={page}
                  onClick={() => { setCurrentPage(page); setMobileMenuOpen(false); }}
                  className={`w-full px-4 py-2 rounded-lg text-left ${currentPage === page ? 'bg-purple-600/20 text-purple-400' : 'text-gray-400'}`}
                >
                  {page === 'home' ? '首頁' : '我的'}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* 主內容 */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentPage === 'home' && (
          <HomePage
            diviners={diviners}
            sortBy={sortBy}
            setSortBy={setSortBy}
            loading={loading}
            onSelectDiviner={(diviner) => { setSelectedDiviner(diviner); setCurrentPage('diviner-detail'); }}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        )}

        {currentPage === 'diviner-detail' && selectedDiviner && (
          <DivinerDetailPage
            diviner={selectedDiviner}
            onBack={() => setCurrentPage('home')}
            onBooking={() => setCurrentPage('booking')}
            onReview={() => setCurrentPage('review')}
          />
        )}

        {currentPage === 'booking' && selectedDiviner && (
          <BookingPage diviner={selectedDiviner} onBack={() => setCurrentPage('diviner-detail')} />
        )}

        {currentPage === 'review' && selectedDiviner && (
          <ReviewPage diviner={selectedDiviner} onBack={() => setCurrentPage('diviner-detail')} />
        )}

        {currentPage === 'profile' && (
          <ProfilePage onBack={() => setCurrentPage('home')} />
        )}
      </div>

      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes pulse-slow { 0%, 100% { opacity: 0.2; transform: scale(1); } 50% { opacity: 0.3; transform: scale(1.1); } }
        @keyframes pulse-slow-delay { 0%, 100% { opacity: 0.15; transform: scale(1.1); } 50% { opacity: 0.25; transform: scale(1); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }
        .animate-pulse-slow-delay { animation: pulse-slow-delay 8s ease-in-out infinite; }
        .animate-slide-up { animation: slideUp 0.5s ease-out; }
        .glass { background: rgba(10, 10, 15, 0.7); backdrop-filter: blur(20px); border: 1px solid rgba(139, 92, 246, 0.1); }
        .neon-border { position: relative; }
        .neon-border::before { content: ''; position: absolute; inset: -1px; border-radius: inherit; padding: 1px; background: linear-gradient(135deg, rgba(139, 92, 246, 0.5), rgba(236, 72, 153, 0.5), rgba(6, 182, 212, 0.5)); -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none; }
      `}</style>
    </div>
  );
}

// 首頁 - 雙板塊設計
function HomePage({ diviners, sortBy, setSortBy, loading, onSelectDiviner, activeCategory, setActiveCategory, activeSection, setActiveSection }) {
  return (
    <div className="space-y-12 animate-slide-up">
      {/* 英雄區 */}
      <section className="relative">
        <div className="relative overflow-hidden rounded-3xl neon-border">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-[#0a0a0f] to-pink-900/20"></div>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-10 text-6xl opacity-20 animate-float">✨</div>
            <div className="absolute top-20 right-20 text-4xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>🌟</div>
            <div className="absolute bottom-10 left-1/3 text-5xl opacity-15 animate-float" style={{ animationDelay: '2s' }}>💫</div>
          </div>
          
          <div className="relative px-8 py-16 md:py-20 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              <span>香港頂尖玄學平台</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                連接宇宙的智慧
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              在線真人算命 · 專業AI排盤 · 視頻咨詢
            </p>
          </div>
        </div>
      </section>

      {/* 雙板塊切換 */}
      <section>
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-2xl bg-gray-900/50 p-1.5 gap-1">
            <button
              onClick={() => setActiveSection('human')}
              className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeSection === 'human' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Users className="w-5 h-5" />
              在線真人算命
            </button>
            <button
              onClick={() => setActiveSection('ai')}
              className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeSection === 'ai' ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/25' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Bot className="w-5 h-5" />
              專業AI排盤
            </button>
          </div>
        </div>

        {/* 在線真人算命板塊 */}
        {activeSection === 'human' && (
          <div className="space-y-8">
            <div className="flex flex-wrap gap-3 justify-center">
              <button onClick={() => setActiveCategory('all')} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeCategory === 'all' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'glass text-gray-400 hover:text-white'}`}>
                全部大師
              </button>
              {DIVINER_CATEGORIES.map((cat) => (
                <button key={cat.key} onClick={() => setActiveCategory(cat.key)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${activeCategory === cat.key ? `bg-gradient-to-r ${cat.color} text-white` : 'glass text-gray-400 hover:text-white'}`}>
                  <span>{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              {[
                { key: 'rating', label: '按評分', icon: '⭐' },
                { key: 'credit', label: '按信用', icon: '💎' },
                { key: 'new', label: '最新加入', icon: '🆕' },
              ].map((option) => (
                <button key={option.key} onClick={() => setSortBy(option.key)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${sortBy === option.key ? 'bg-purple-600/30 border border-purple-500/50 text-purple-300' : 'glass text-gray-400 hover:text-white'}`}>
                  <span>{option.icon}</span>
                  {option.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {loading ? (
                [...Array(4)].map((_, i) => (
                  <div key={i} className="glass rounded-2xl p-6 animate-pulse">
                    <div className="w-16 h-16 bg-gray-700 rounded-2xl mx-auto mb-4"></div>
                    <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto mb-2"></div>
                    <div className="h-3 bg-gray-700 rounded w-1/2 mx-auto"></div>
                  </div>
                ))
              ) : (
                diviners.map((diviner, index) => (
                  <DivinerCard key={diviner._id} diviner={diviner} onClick={() => onSelectDiviner(diviner)} index={index} />
                ))
              )}
            </div>
          </div>
        )}

        {/* 專業AI排盤板塊 */}
        {activeSection === 'ai' && <AISection />}
      </section>
    </div>
  );
}

// AI排盤板塊
function AISection() {
  const aiServices = [
    { id: 'bazi', name: 'AI八字排盤', icon: '📜', emoji: '生辰八字', description: '輸入出生時間，AI自動生成完整命盤分析報告', features: ['命局分析', '大運流年', '神煞吉兇', '事業財運', '婚姻感情', '健康運勢'], color: 'from-amber-500 to-orange-500', bgColor: 'from-amber-500/20 to-orange-500/10', borderColor: 'border-amber-500/30', popular: true },
    { id: 'ziwei', name: 'AI紫微斗數', icon: '⭐', emoji: '紫微命盤', description: '精準計算十二宮位，深度解析人生各領域', features: ['命宮身宮', '十四主星', '四化飛星', '十年大限', '流年運勢', '人生指引'], color: 'from-purple-500 to-pink-500', bgColor: 'from-purple-500/20 to-pink-500/10', borderColor: 'border-purple-500/30', popular: true },
    { id: 'tarot', name: 'AI塔羅占卜', icon: '🃏', emoji: '塔羅牌陣', description: 'AI塔羅牌解讀，探索內心深處的答案', features: ['過去現在未來', '愛情事業財運', '靈性指引', '每週運勢', '決策建議', '心靈探索'], color: 'from-violet-500 to-purple-500', bgColor: 'from-violet-500/20 to-purple-500/10', borderColor: 'border-violet-500/30', popular: false },
    { id: 'qimen', name: 'AI奇門遁甲', icon: '☯️', emoji: '奇門盤', description: '時空方位預測，把握人生關鍵時刻', features: ['格局分析', '吉兇方位', '時機選擇', '決策建議', '趨吉避兇', '商業決策'], color: 'from-cyan-500 to-blue-500', bgColor: 'from-cyan-500/20 to-blue-500/10', borderColor: 'border-cyan-500/30', popular: false },
    { id: 'astrology', name: 'AI星座運勢', icon: '🌟', emoji: '星座命盤', description: '每日星座運勢預測，掌握人生方向', features: ['今日運勢', '本週運勢', '本月運勢', '年度運勢', '愛情運勢', '事業運勢'], color: 'from-yellow-500 to-orange-500', bgColor: 'from-yellow-500/20 to-orange-500/10', borderColor: 'border-yellow-500/30', popular: true },
    { id: 'dream', name: 'AI周公解夢', icon: '🌙', emoji: '夢境解析', description: '夢境深度解析，探索潛意識信息', features: ['夢境解讀', '心理分析', '預兆提示', '成長建議', '潛意識探索', '靈性指引'], color: 'from-indigo-500 to-purple-500', bgColor: 'from-indigo-500/20 to-purple-500/10', borderColor: 'border-indigo-500/30', popular: false },
  ];

  const popularServices = aiServices.filter(s => s.popular);

  return (
    <div className="space-y-10">
      {/* AI品牌展示區 */}
      <div className="relative overflow-hidden rounded-3xl glass border border-cyan-500/20">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full blur-[80px]"></div>
        
        <div className="relative p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center animate-float">
                <span className="text-5xl md:text-6xl">🤖</span>
              </div>
              <div className="absolute -top-2 -right-2 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/30">
                AI驅動
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">專業AI排盤系統</span>
              </h2>
              <p className="text-gray-400 mb-6 max-w-xl">基於千萬級玄學數據訓練，結合傳統易學智慧與現代AI技術，為您提供精準、專業、即時的命理分析服務</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-300"><span className="text-cyan-400">⚡</span> 3秒出結果</div>
                <div className="flex items-center gap-2 text-sm text-gray-300"><span className="text-purple-400">📊</span> 深度解讀</div>
                <div className="flex items-center gap-2 text-sm text-gray-300"><span className="text-pink-400">🔒</span> 隱私保護</div>
                <div className="flex items-center gap-2 text-sm text-gray-300"><span className="text-amber-400">💎</span> 完全免費</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 熱門服務 */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2"><span className="text-2xl">🔥</span> 熱門服務</h3>
          <span className="text-sm text-gray-500">最受歡迎的AI排盤</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {popularServices.map((service) => (
            <div key={service.id} className={`group relative overflow-hidden rounded-2xl glass ${service.borderColor} hover:border-opacity-60 transition-all duration-300 cursor-pointer`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${service.bgColor} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
              <div className="relative p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center text-3xl group-hover:scale-110 transition-transform`}>
                    {service.icon}
                  </div>
                  <div className="px-2 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-medium">熱門</div>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{service.name}</h4>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">{service.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.features.slice(0, 3).map((feature, i) => (<span key={i} className="text-xs px-2 py-1 rounded-lg bg-gray-800/50 text-gray-300">{feature}</span>))}
                </div>
                <button className={`w-full py-3 rounded-xl bg-gradient-to-r ${service.color} text-white font-semibold text-sm hover:opacity-90 transition flex items-center justify-center gap-2`}>
                  <span>立即體驗</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 全部AI服務 */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2"><span className="text-2xl">✨</span> 全部AI服務</h3>
          <span className="text-sm text-gray-500">6項專業排盤服務</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {aiServices.map((service) => (
            <div key={service.id} className={`group glass rounded-2xl p-5 ${service.borderColor} hover:border-opacity-60 transition-all duration-300 cursor-pointer`}>
              <div className="flex items-center gap-4 mb-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>{service.icon}</div>
                <div className="flex-1">
                  <h4 className="text-base font-bold text-white">{service.name}</h4>
                  <p className="text-xs text-gray-500">{service.emoji}</p>
                </div>
                {service.popular && <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px] font-medium">熱門</span>}
              </div>
              <p className="text-xs text-gray-400 mb-3 line-clamp-2">{service.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {service.features.slice(0, 4).map((feature, i) => (<span key={i} className="text-[10px] px-2 py-0.5 rounded bg-gray-800/50 text-gray-400">{feature}</span>))}
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-800">
                <span className="text-cyan-400 font-bold text-sm">免費</span>
                <button className={`px-3 py-1.5 rounded-lg bg-gradient-to-r ${service.color} text-white text-xs font-medium hover:opacity-90 transition`}>開始排盤</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 底部優勢說明 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: '⚡', title: '即時生成', desc: 'AI秒級回應', color: 'from-cyan-500 to-blue-500' },
          { icon: '📊', title: '專業分析', desc: '深度解讀報告', color: 'from-purple-500 to-pink-500' },
          { icon: '🔒', title: '隱私保護', desc: '數據加密存儲', color: 'from-amber-500 to-orange-500' },
          { icon: '💎', title: '完全免費', desc: '無隱藏費用', color: 'from-violet-500 to-purple-500' },
        ].map((item, i) => (
          <div key={i} className="glass rounded-xl p-4 text-center group hover:scale-105 transition-transform">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center text-xl mx-auto mb-2 group-hover:scale-110 transition-transform`}>{item.icon}</div>
            <div className="text-sm font-semibold text-white">{item.title}</div>
            <div className="text-xs text-gray-500">{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 大師卡片
function DivinerCard({ diviner, onClick, index }) {
  const getCreditLevel = (score) => {
    if (score >= 90) return { level: '鑽石', emoji: '💎', color: 'from-cyan-400 via-purple-400 to-pink-400', bg: 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20' };
    if (score >= 75) return { level: '金牌', emoji: '🥇', color: 'from-yellow-400 to-orange-400', bg: 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' };
    if (score >= 60) return { level: '銀牌', emoji: '🥈', color: 'from-gray-300 to-gray-400', bg: 'bg-gradient-to-r from-gray-500/20 to-slate-500/20' };
    return { level: '普通', emoji: '⭐', color: 'from-blue-400 to-indigo-400', bg: 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20' };
  };

  const getSpecialtyCategory = (specialty) => {
    const categoryMap = {
      '八字命理': { key: 'bazi', color: 'from-amber-500 to-orange-500' }, '紫微斗數': { key: 'ziwei', color: 'from-purple-500 to-pink-500' },
      '風水布局': { key: 'fengshui', color: 'from-green-500 to-emerald-500' }, '塔羅占卜': { key: 'tarot', color: 'from-blue-500 to-indigo-500' },
      '星座運勢': { key: 'astrology', color: 'from-violet-500 to-purple-500' }, '奇門遁甲': { key: 'qimen', color: 'from-cyan-500 to-blue-500' },
      '易經占卜': { key: 'qimen', color: 'from-cyan-500 to-blue-500' }, '姓名分析': { key: 'bazi', color: 'from-amber-500 to-orange-500' },
      '手相分析': { key: 'bazi', color: 'from-amber-500 to-orange-500' }, '夢境解析': { key: 'tarot', color: 'from-blue-500 to-indigo-500' },
      '財運分析': { key: 'bazi', color: 'from-amber-500 to-orange-500' }, '生命靈數': { key: 'astrology', color: 'from-violet-500 to-purple-500' },
      '姻緣測算': { key: 'ziwei', color: 'from-purple-500 to-pink-500' }, '生肖運勢': { key: 'bazi', color: 'from-amber-500 to-orange-500' },
    };
    return categoryMap[specialty?.[0]] || { key: 'bazi', color: 'from-purple-500 to-pink-500' };
  };

  const creditInfo = getCreditLevel(diviner.creditScore);
  const categoryInfo = getSpecialtyCategory(diviner.specialty);

  return (
    <div onClick={onClick} className="group relative rounded-2xl cursor-pointer transition-all duration-500 hover:scale-[1.02]" style={{ animationDelay: `${index * 100}ms` }}>
      <div className="absolute inset-0 glass rounded-2xl group-hover:border-purple-500/30 transition-colors"></div>
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-600/10"></div>
      
      <div className="relative p-5 space-y-3">
        <div className="flex items-start justify-between">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
              {diviner.avatar || '✨'}
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0a0a0f] flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className={`px-2 py-1 rounded-lg ${creditInfo.bg} text-xs font-medium`}>
            <span className={`bg-gradient-to-r ${creditInfo.color} bg-clip-text text-transparent`}>{creditInfo.emoji} {creditInfo.level}</span>
          </div>
        </div>

        <div>
          <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">{diviner.name}</h3>
          <p className="text-xs text-purple-400/80">{diviner.title}</p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {diviner.specialty?.slice(0, 3).map((spec, i) => (
            <span key={i} className={`text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r ${categoryInfo.color} text-white font-medium`}>{spec}</span>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span className="text-white font-medium">{diviner.rating?.toFixed(1) || 0}</span>
            <span