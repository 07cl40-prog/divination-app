import React, { useState, useEffect, useRef } from 'react';
import { Star, MessageCircle, Calendar, Zap, Eye, TrendingUp, Award, Heart, Sparkles, Clock, ChevronRight, X, Menu } from 'lucide-react';
import axios from 'axios';

// DivineHub 全面美化版 - 赛博朋克风格升级

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://divination-app-backend-production.up.railway.app/api';

export default function DivinationApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedDiviner, setSelectedDiviner] = useState(null);
  const [user, setUser] = useState(null);
  const [diviners, setDiviners] = useState([]);
  const [sortBy, setSortBy] = useState('rating');
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      console.error('获取先生列表失败:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* 动态背景 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* 渐变背景 */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a2e] via-[#0a0a0f] to-[#0a1a2e]"></div>
        
        {/* 动态网格 */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }}></div>
        
        {/* 光晕效果 */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-pink-600/15 rounded-full blur-[100px] animate-pulse-slow-delay"></div>
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-cyan-600/10 rounded-full blur-[80px] animate-float"></div>
        
        {/* 扫描线效果 */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.1) 2px, rgba(0, 255, 255, 0.1) 4px)',
          animation: 'scanline 8s linear infinite'
        }}></div>
      </div>

      {/* 导航栏 */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a0a0f]/80 border-b border-purple-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="text-3xl animate-float">🔮</div>
                <div className="absolute inset-0 bg-purple-500/50 blur-xl rounded-full"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  DivineHub
                </h1>
                <p className="text-[10px] text-purple-400/60 tracking-widest">CONNECT WITH WISDOM</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
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
                  {page === 'home' ? '首页' : '我的'}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-white/5"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-purple-500/10 bg-[#0a0a0f]/95 backdrop-blur-xl">
            <div className="px-4 py-3 space-y-2">
              {['home', 'profile'].map((page) => (
                <button
                  key={page}
                  onClick={() => {
                    setCurrentPage(page);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full px-4 py-2 rounded-lg text-left ${
                    currentPage === page
                      ? 'bg-purple-600/20 text-purple-400'
                      : 'text-gray-400'
                  }`}
                >
                  {page === 'home' ? '首页' : '我的'}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* 主内容 */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentPage === 'home' && (
          <HomePage
            diviners={diviners}
            sortBy={sortBy}
            setSortBy={setSortBy}
            loading={loading}
            onSelectDiviner={(diviner) => {
              setSelectedDiviner(diviner);
              setCurrentPage('diviner-detail');
            }}
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
          <BookingPage
            diviner={selectedDiviner}
            onBack={() => setCurrentPage('diviner-detail')}
          />
        )}

        {currentPage === 'review' && selectedDiviner && (
          <ReviewPage
            diviner={selectedDiviner}
            onBack={() => setCurrentPage('diviner-detail')}
          />
        )}

        {currentPage === 'profile' && (
          <ProfilePage onBack={() => setCurrentPage('home')} />
        )}
      </div>

      {/* 全局样式 */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.1); }
        }
        @keyframes pulse-slow-delay {
          0%, 100% { opacity: 0.15; transform: scale(1.1); }
          50% { opacity: 0.25; transform: scale(1); }
        }
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        @keyframes scanline {
          0% { transform: translateY(0); }
          100% { transform: translateY(4px); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.5); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }
        .animate-pulse-slow-delay { animation: pulse-slow-delay 8s ease-in-out infinite; }
        .animate-shimmer { 
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        .animate-glow { animation: glow 2s ease-in-out infinite; }
        .animate-slide-up { animation: slideUp 0.5s ease-out; }
        .glass {
          background: rgba(10, 10, 15, 0.7);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(139, 92, 246, 0.1);
        }
        .neon-border {
          position: relative;
        }
        .neon-border::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.5), rgba(236, 72, 153, 0.5), rgba(6, 182, 212, 0.5));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}

// 首页
function HomePage({ diviners, sortBy, setSortBy, loading, onSelectDiviner }) {
  return (
    <div className="space-y-16 animate-slide-up">
      {/* 英雄区 */}
      <section className="relative">
        <div className="relative overflow-hidden rounded-3xl neon-border">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-[#0a0a0f] to-pink-900/20"></div>
          <div className="absolute inset-0 overflow-hidden">
            {/* 装饰元素 */}
            <div className="absolute top-10 left-10 text-6xl opacity-20 animate-float">✨</div>
            <div className="absolute top-20 right-20 text-4xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>🌟</div>
            <div className="absolute bottom-10 left-1/3 text-5xl opacity-15 animate-float" style={{ animationDelay: '2s' }}>💫</div>
          </div>
          
          <div className="relative px-8 py-20 md:py-28 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              <span>AI 驱动的玄学平台</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                连接宇宙的智慧
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              在赛博空间中，与东方玄学大师对话。<br className="hidden sm:block" />
              透明评分 · 信用指数 · 视频算命
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <div className="group px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600/20 to-purple-600/5 border border-purple-500/30 hover:border-purple-400/50 transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">✨</span>
                  <div className="text-left">
                    <div className="text-white font-semibold">透明评分</div>
                    <div className="text-xs text-gray-500">真实用户评价</div>
                  </div>
                </div>
              </div>
              <div className="group px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-600/20 to-pink-600/5 border border-pink-500/30 hover:border-pink-400/50 transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💎</span>
                  <div className="text-left">
                    <div className="text-white font-semibold">信用指数</div>
                    <div className="text-xs text-gray-500">多维度评估</div>
                  </div>
                </div>
              </div>
              <div className="group px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-600/20 to-cyan-600/5 border border-cyan-500/30 hover:border-cyan-400/50 transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🔮</span>
                  <div className="text-left">
                    <div className="text-white font-semibold">视频算命</div>
                    <div className="text-xs text-gray-500">面对面咨询</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 统计区 */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: '注册大师', value: '128+', icon: '🧙' },
          { label: '完成订单', value: '5.2K+', icon: '📊' },
          { label: '用户好评', value: '98.5%', icon: '⭐' },
          { label: '在线大师', value: '23', icon: '🟢' },
        ].map((stat, i) => (
          <div key={i} className="glass rounded-2xl p-6 text-center group hover:scale-105 transition-transform">
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {stat.value}
            </div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* 排序选项 */}
      <section className="flex flex-wrap gap-3">
        {[
          { key: 'rating', label: '按评分', icon: '⭐' },
          { key: 'credit', label: '按信用', icon: '💎' },
          { key: 'new', label: '最新加入', icon: '🆕' },
        ].map((option) => (
          <button
            key={option.key}
            onClick={() => setSortBy(option.key)}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
              sortBy === option.key
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                : 'glass text-gray-400 hover:text-white hover:border-purple-500/30'
            }`}
          >
            <span>{option.icon}</span>
            {option.label}
          </button>
        ))}
      </section>

      {/* 先生网格 */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
            <span className="text-3xl">⚡</span>
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              在线大师
            </span>
          </h2>
          <button className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1 transition">
            查看全部 <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="glass rounded-2xl p-6 animate-pulse">
                <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto mb-4"></div>
                <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-1/2 mx-auto"></div>
              </div>
            ))}
          </div>
        ) : diviners.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {diviners.map((diviner, index) => (
              <DivinerCard
                key={diviner._id}
                diviner={diviner}
                onClick={() => onSelectDiviner(diviner)}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4 opacity-50">🔮</div>
            <p className="text-gray-500">暂无在线大师</p>
            <p className="text-gray-600 text-sm mt-2">请稍后再来查看</p>
          </div>
        )}
      </section>
    </div>
  );
}

// 先生卡片 - 升级版
function DivinerCard({ diviner, onClick, index }) {
  const getCreditLevel = (score) => {
    if (score >= 90) return { level: '钻石', emoji: '💎', color: 'from-cyan-400 via-purple-400 to-pink-400', bg: 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20' };
    if (score >= 75) return { level: '金牌', emoji: '🥇', color: 'from-yellow-400 to-orange-400', bg: 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' };
    if (score >= 60) return { level: '银牌', emoji: '🥈', color: 'from-gray-300 to-gray-400', bg: 'bg-gradient-to-r from-gray-500/20 to-slate-500/20' };
    return { level: '普通', emoji: '⭐', color: 'from-blue-400 to-indigo-400', bg: 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20' };
  };

  const creditInfo = getCreditLevel(diviner.creditScore);

  return (
    <div
      onClick={onClick}
      className="group relative rounded-2xl cursor-pointer transition-all duration-500 hover:scale-[1.02]"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* 卡片背景 */}
      <div className="absolute inset-0 glass rounded-2xl group-hover:border-purple-500/30 transition-colors"></div>
      
      {/* 悬停光效 */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-600/10"></div>
      
      <div className="relative p-6 space-y-4">
        {/* 顶部：头像和状态 */}
        <div className="flex items-start justify-between">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300">
              {diviner.avatar || '✨'}
            </div>
            {/* 在线指示器 */}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-[#0a0a0f] flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {/* 信用徽章 */}
          <div className={`px-2.5 py-1 rounded-lg ${creditInfo.bg} text-xs font-medium`}>
            <span className={`bg-gradient-to-r ${creditInfo.color} bg-clip-text text-transparent`}>
              {creditInfo.emoji} {creditInfo.level}
            </span>
          </div>
        </div>

        {/* 名字和职位 */}
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
            {diviner.name}
          </h3>
          <p className="text-sm text-purple-400/80">{diviner.title}</p>
        </div>

        {/* 评分 */}
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={`${i < Math.floor(diviner.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-700'}`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-400">{diviner.rating?.toFixed(1) || '0.0'}</span>
          <span className="text-xs text-gray-600">({diviner.totalOrders || 0})</span>
        </div>

        {/* 信用进度条 */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">信用指数</span>
            <span className="text-purple-400">{diviner.creditScore}/100</span>
          </div>
          <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${creditInfo.color} rounded-full transition-all duration-500`}
              style={{ width: `${diviner.creditScore}%` }}
            />
          </div>
        </div>

        {/* 统计 */}
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {diviner.responseTime || '即时'}
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-3 h-3" />
            {diviner.totalOrders || 0} 单
          </div>
        </div>

        {/* 价格和按钮 */}
        <div className="pt-4 border-t border-purple-500/10 flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              HK${diviner.price}
            </span>
            <span className="text-xs text-gray-600 ml-1">起</span>
          </div>
          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium hover:from-purple-500 hover:to-pink-500 transition-all group-hover:shadow-lg group-hover:shadow-purple-500/25">
            预约
          </button>
        </div>
      </div>
    </div>
  );
}

// 先生详情页 - 升级版
function DivinerDetailPage({ diviner, onBack, onBooking, onReview }) {
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    fetchReviews();
  }, [diviner._id]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/diviners/${diviner._id}/reviews`);
      setReviews(response.data);
    } catch (error) {
      console.error('获取评价失败:', error);
    }
  };

  const calculateDimensionAverages = () => {
    if (reviews.length === 0) return {};
    const dimensions = ['accuracy', 'communication', 'professionalism', 'punctuality', 'valueForMoney'];
    const averages = {};
    dimensions.forEach(dim => {
      const sum = reviews.reduce((acc, review) => acc + (review.dimensions?.[dim] || 0), 0);
      averages[dim] = (sum / reviews.length).toFixed(1);
    });
    return averages;
  };

  const dimensionAverages = calculateDimensionAverages();

  return (
    <div className="space-y-8 animate-slide-up">
      {/* 返回按钮 */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition group"
      >
        <ChevronRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" />
        <span>返回</span>
      </button>

      {/* 主卡片 */}
      <div className="glass rounded-3xl overflow-hidden">
        <div className="p-8 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 左侧：头像 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center text-7xl animate-glow">
                  {diviner.avatar || '✨'}
                </div>
                <div className="absolute -bottom-2 -right-2 px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-medium flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  在线
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-1">{diviner.name}</h2>
              <p className="text-purple-400">{diviner.title}</p>
            </div>

            {/* 中间：基本信息 */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-lg font-bold text-yellow-400">{diviner.rating?.toFixed(1) || 0}</span>
                  <span className="text-sm text-gray-500">({reviews.length} 评价)</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-400">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">完成 {diviner.completedOrders}/{diviner.totalOrders} 单</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-400">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm">回复 {diviner.responseTime}</span>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed">{diviner.bio}</p>

              {/* 信用指数卡片 */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400">信用指数</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {diviner.creditScore}
                  </span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden mb-3">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full"
                    style={{ width: `${diviner.creditScore}%` }}
                  />
                </div>
                <div className="text-center">
                  <span className={`text-sm font-medium ${
                    diviner.creditScore >= 90 ? 'text-cyan-400' :
                    diviner.creditScore >= 75 ? 'text-yellow-400' :
                    diviner.creditScore >= 60 ? 'text-gray-300' : 'text-blue-400'
                  }`}>
                    {diviner.creditScore >= 90 ? '💎 钻石大师' :
                     diviner.creditScore >= 75 ? '🥇 金牌大师' :
                     diviner.creditScore >= 60 ? '🥈 银牌大师' : '⭐ 新晋大师'}
                  </span>
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onBooking}
                  className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-500 hover:to-pink-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
                >
                  <Calendar className="w-5 h-5" />
                  预约咨询 · HK${diviner.price}
                </button>
                <button
                  onClick={onReview}
                  className="flex-1 py-4 rounded-2xl glass border-purple-500/30 text-purple-400 font-semibold hover:bg-purple-500/10 transition-all flex items-center justify-center gap-2"
                >
                  <Heart className="w-5 h-5" />
                  写评价
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 标签页 */}
      <div className="border-b border-purple-500/10">
        <div className="flex gap-8">
          {[
            { key: 'info', label: '专长领域' },
            { key: 'dimensions', label: '评分维度' },
            { key: 'reviews', label: '用户评价' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-4 px-2 border-b-2 transition-all ${
                activeTab === tab.key
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-gray-500 hover:text-gray-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 内容区 */}
      {activeTab === 'info' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {diviner.specialty?.map((spec, i) => (
            <div
              key={i}
              className="glass rounded-xl p-4 text-center text-purple-300 hover:border-purple-500/30 transition-colors"
            >
              {spec}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'dimensions' && (
        <div className="space-y-4">
          {[
            { name: '准确度', key: 'accuracy', weight: '30%', desc: '预测和建议的准确性' },
            { name: '沟通能力', key: 'communication', weight: '20%', desc: '表达清晰，易于理解' },
            { name: '专业性', key: 'professionalism', weight: '25%', desc: '专业知识和态度' },
            { name: '准时性', key: 'punctuality', weight: '10%', desc: '按时开始和结束' },
            { name: '性价比', key: 'valueForMoney', weight: '15%', desc: '服务质量与价格匹配' },
          ].map((dim) => (
            <div key={dim.key} className="glass rounded-xl p-5">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-white font-semibold">{dim.name}</span>
                  <p className="text-xs text-gray-500 mt-0.5">{dim.desc}</p>
                </div>
                <span className="text-xs text-purple-400 bg-purple-500/10 px-2 py-1 rounded">
                  权重 {dim.weight}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(dimensionAverages[dim.key] || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-700'}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-400">{dimensionAverages[dim.key] || 0}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="space-y-4">
          {reviews.length > 0 ? (
            reviews.slice(0, 5).map((review, i) => (
              <div key={i} className="glass rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={14} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-white font-medium">{review.title}</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{review.content}</p>
                {review.tags?.length > 0 && (
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {review.tags.map((tag, j) => (
                      <span key={j} className="text-xs px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <div className="text-5xl mb-4 opacity-50">📝</div>
              <p className="text-gray-500">暂无评价</p>
              <button
                onClick={onReview}
                className="mt-4 text-purple-400 hover:text-purple-300 transition"
              >
                成为第一个评价者 →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// 预约页 - 升级版
function BookingPage({ diviner, onBack }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [service, setService] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const services = [
    { name: '基础咨询', price: diviner.price, duration: '30分钟', desc: '简单问题解答' },
    { name: '深度分析', price: Math.round(diviner.price * 1.5), duration: '60分钟', desc: '全面详细解读' },
    { name: '完整方案', price: diviner.price * 2, duration: '90分钟', desc: '深度+后续跟进' },
  ];

  const handleSubmit = async () => {
    if (date && time && service) {
      try {
        const selectedService = services.find(s => s.name === service);
        await axios.post(`${API_BASE_URL}/appointments`, {
          divinerId: diviner._id,
          serviceType: service,
          scheduledTime: new Date(`${date}T${time}`),
          duration: 60,
          price: selectedService.price,
        });
        setSubmitted(true);
        setTimeout(() => onBack(), 3000);
      } catch (error) {
        console.error('预约失败:', error);
      }
    }
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] animate-slide-up">
        <div className="text-center space-y-6">
          <div className="text-8xl animate-bounce">💎</div>
          <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            预约成功！
          </h3>
          <p className="text-gray-400">请等待 {diviner.name} 的确认</p>
          <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-slide-up">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition group"
      >
        <ChevronRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" />
        <span>返回</span>
      </button>

      <div className="glass rounded-3xl p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="text-4xl">{diviner.avatar || '✨'}</div>
          <div>
            <h2 className="text-2xl font-bold text-white">预约 {diviner.name}</h2>
            <p className="text-purple-400">{diviner.title}</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* 服务选择 */}
          <div>
            <label className="block text-sm font-semibold text-purple-400 mb-3">
              选择服务
            </label>
            <div className="space-y-3">
              {services.map((svc) => (
                <label
                  key={svc.name}
                  className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${
                    service === svc.name
                      ? 'glass border-purple-500/50 bg-purple-500/10'
                      : 'glass hover:border-purple-500/30'
                  }`}
                >
                  <input
                    type="radio"
                    name="service"
                    value={svc.name}
                    checked={service === svc.name}
                    onChange={(e) => setService(e.target.value)}
                    className="w-4 h-4 accent-purple-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">{svc.name}</span>
                      <span className="text-xs text-gray-500">{svc.duration}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{svc.desc}</p>
                  </div>
                  <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    HK${svc.price}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* 日期时间 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-purple-400 mb-2">
                选择日期
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-4 rounded-xl glass text-white focus:border-purple-500/50 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-purple-400 mb-2">
                选择时间
              </label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-4 rounded-xl glass text-white focus:border-purple-500/50 focus:outline-none transition appearance-none"
              >
                <option value="">选择时间段</option>
                <option value="09:00">09:00 - 10:00</option>
                <option value="10:00">10:00 - 11:00</option>
                <option value="14:00">14:00 - 15:00</option>
                <option value="15:00">15:00 - 16:00</option>
                <option value="19:00">19:00 - 20:00</option>
                <option value="20:00">20:00 - 21:00</option>
              </select>
            </div>
          </div>

          {/* 总价 */}
          {service && (
            <div className="glass rounded-xl p-5 flex justify-between items-center">
              <span className="text-gray-400">总价</span>
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                HK${services.find(s => s.name === service)?.price}
              </span>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={!date || !time || !service}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-500 hover:to-pink-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-purple-500/25"
          >
            确认预约
          </button>
        </div>
      </div>
    </div>
  );
}

// 评价页 - 升级版
function ReviewPage({ diviner, onBack }) {
  const [ratings, setRatings] = useState({
    accuracy: 5,
    communication: 5,
    professionalism: 5,
    punctuality: 5,
    valueForMoney: 5,
  });
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const availableTags = ['准确', '专业', '有耐心', '回复快', '值得推荐', '很有帮助'];

  const handleSubmit = async () => {
    if (title && content) {
      try {
        const overallRating = Math.round(
          ratings.accuracy * 0.3 +
          ratings.communication * 0.2 +
          ratings.professionalism * 0.25 +
          ratings.punctuality * 0.1 +
          ratings.valueForMoney * 0.15
        );
        await axios.post(`${API_BASE_URL}/reviews`, {
          divinerId: diviner._id,
          overallRating,
          dimensions: ratings,
          title,
          content,
          tags,
        });
        setSubmitted(true);
        setTimeout(() => onBack(), 3000);
      } catch (error) {
        console.error('评价失败:', error);
      }
    }
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] animate-slide-up">
        <div className="text-center space-y-6">
          <div className="text-8xl animate-bounce">⭐</div>
          <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            评价已提交！
          </h3>
          <p className="text-gray-400">感谢你的反馈</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-slide-up">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition group"
      >
        <ChevronRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" />
        <span>返回</span>
      </button>

      <div className="glass rounded-3xl p-8">
        <h2 className="text-2xl font-bold text-white mb-2">给 {diviner.name} 评分</h2>
        <p className="text-gray-400 mb-8">你的评价将帮助其他用户了解服务质量</p>

        <div className="space-y-6">
          {/* 评分维度 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-400">评分维度</h3>
            {[
              { key: 'accuracy', name: '准确度', weight: '30%' },
              { key: 'communication', name: '沟通能力', weight: '20%' },
              { key: 'professionalism', name: '专业性', weight: '25%' },
              { key: 'punctuality', name: '准时性', weight: '10%' },
              { key: 'valueForMoney', name: '性价比', weight: '15%' },
            ].map((dim) => (
              <div key={dim.key} className="glass rounded-xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-white font-medium">{dim.name}</span>
                  <span className="text-xs text-purple-400">权重 {dim.weight}</span>
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRatings({ ...ratings, [dim.key]: star })}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        size={24}
                        className={`${
                          ratings[dim.key] >= star
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-700'
                        } transition-colors`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 评价标题 */}
          <div>
            <label className="block text-sm font-semibold text-purple-400 mb-2">
              评价标题
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="用一句话总结你的体验"
              className="w-full p-4 rounded-xl glass text-white placeholder-gray-600 focus:border-purple-500/50 focus:outline-none transition"
            />
          </div>

          {/* 评价内容 */}
          <div>
            <label className="block text-sm font-semibold text-purple-400 mb-2">
              评价内容
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="详细描述你的体验..."
              className="w-full h-32 p-4 rounded-xl glass text-white placeholder-gray-600 focus:border-purple-500/50 focus:outline-none transition resize-none"
            />
          </div>

          {/* 标签选择 */}
          <div>
            <label className="block text-sm font-semibold text-purple-400 mb-3">
              选择标签
            </label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setTags(
                      tags.includes(tag)
                        ? tags.filter((t) => t !== tag)
                        : [...tags, tag]
                    );
                  }}
                  className={`px-4 py-2 rounded-xl text-sm transition-all ${
                    tags.includes(tag)
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      : 'glass text-gray-400 hover:text-white'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!title || !content}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-500 hover:to-pink-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-purple-500/25"
          >
            提交评价
          </button>
        </div>
      </div>
    </div>
  );
}

// 个人资料页 - 升级版
function ProfilePage({ onBack }) {
  const stats = [
    { label: '我的订单', value: '5', icon: '📊' },
    { label: '我的评价', value: '3', icon: '⭐' },
    { label: '收藏大师', value: '8', icon: '❤️' },
    { label: '账户余额', value: 'HK$0', icon: '💰' },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-slide-up">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition group"
      >
        <ChevronRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" />
        <span>返回</span>
      </button>

      <div className="glass rounded-3xl p-8">
        {/* 用户信息 */}
        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-purple-500/10">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center text-4xl">
            👤
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">用户 #12345</h2>
            <p className="text-gray-400">user@example.com</p>
          </div>
        </div>

        {/* 统计 */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="glass rounded-xl p-5 text-center">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* 菜单 */}
        <div className="space-y-2">
          {['账户设置', '订单历史', '消息通知', '帮助中心'].map((item, i) => (
            <button key={i} className="w-full p-4 rounded-xl glass text-left text-gray-300 hover:text-white hover:border-purple-500/30 transition flex items-center justify-between group">
              <span>{item}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          ))}
        </div>

        <button className="w-full mt-8 py-4 rounded-xl border border-red-500/30 text-red-400 font-semibold hover:bg-red-500/10 transition">
          退出登录
        </button>
      </div>
    </div>
  );
}
