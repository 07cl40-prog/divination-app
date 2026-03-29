import React, { useState, useEffect } from 'react';
import { Star, MessageCircle, Calendar, Zap, Eye, TrendingUp, Award, Heart } from 'lucide-react';
import axios from 'axios';

// DivineHub 完整前端应用 - 包含所有后台功能

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export default function DivinationApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedDiviner, setSelectedDiviner] = useState(null);
  const [user, setUser] = useState(null);
  const [diviners, setDiviners] = useState([]);
  const [sortBy, setSortBy] = useState('rating');
  const [loading, setLoading] = useState(false);

  // 获取先生列表
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
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* 赛博背景效果 */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-black"></div>
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 136, 0.03) 2px, rgba(0, 255, 136, 0.03) 4px)',
          animation: 'scan 8s linear infinite'
        }}></div>
      </div>

      {/* 导航栏 */}
      <nav className="border-b border-purple-500/30 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-2xl">🔮</div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              DivineHub
            </h1>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setCurrentPage('home')}
              className={`px-4 py-2 rounded transition ${
                currentPage === 'home'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-purple-400'
              }`}
            >
              首页
            </button>
            <button
              onClick={() => setCurrentPage('profile')}
              className={`px-4 py-2 rounded transition ${
                currentPage === 'profile'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-purple-400'
              }`}
            >
              我的
            </button>
          </div>
        </div>
      </nav>

      {/* 主内容 */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
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

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(10px); }
        }
      `}</style>
    </div>
  );
}

// 首页
function HomePage({ diviners, sortBy, setSortBy, loading, onSelectDiviner }) {
  return (
    <div className="space-y-12">
      {/* 英雄区 */}
      <div className="relative overflow-hidden rounded-lg border border-purple-500/50 bg-gradient-to-br from-purple-900/30 to-black p-12 text-center">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)',
        }}></div>
        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            连接宇宙的智慧
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            在赛博空间中，与东方玄学大师对话
          </p>
          <div className="flex justify-center gap-4">
            <div className="px-6 py-2 rounded border border-purple-500/50 text-purple-400 text-sm">
              ✨ 透明评分
            </div>
            <div className="px-6 py-2 rounded border border-pink-500/50 text-pink-400 text-sm">
              💎 信用指数
            </div>
            <div className="px-6 py-2 rounded border border-cyan-500/50 text-cyan-400 text-sm">
              🔮 视频算命
            </div>
          </div>
        </div>
      </div>

      {/* 排序选项 */}
      <div className="flex gap-4">
        <button
          onClick={() => setSortBy('rating')}
          className={`px-4 py-2 rounded transition ${
            sortBy === 'rating'
              ? 'bg-purple-600 text-white'
              : 'border border-purple-500/30 text-gray-400 hover:text-purple-400'
          }`}
        >
          按评分排序
        </button>
        <button
          onClick={() => setSortBy('credit')}
          className={`px-4 py-2 rounded transition ${
            sortBy === 'credit'
              ? 'bg-purple-600 text-white'
              : 'border border-purple-500/30 text-gray-400 hover:text-purple-400'
          }`}
        >
          按信用指数排序
        </button>
        <button
          onClick={() => setSortBy('new')}
          className={`px-4 py-2 rounded transition ${
            sortBy === 'new'
              ? 'bg-purple-600 text-white'
              : 'border border-purple-500/30 text-gray-400 hover:text-purple-400'
          }`}
        >
          最新加入
        </button>
      </div>

      {/* 先生网格 */}
      <div>
        <h3 className="text-2xl font-bold mb-8 text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
          ⚡ 在线大师
        </h3>
        {loading ? (
          <div className="text-center text-gray-400">加载中...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {diviners.map((diviner) => (
              <DivinerCard
                key={diviner._id}
                diviner={diviner}
                onClick={() => onSelectDiviner(diviner)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// 先生卡片
function DivinerCard({ diviner, onClick }) {
  // 计算信用等级
  const getCreditLevel = (score) => {
    if (score >= 90) return { level: '钻石', emoji: '🥇', color: 'from-yellow-400 to-yellow-600' };
    if (score >= 75) return { level: '金牌', emoji: '🥈', color: 'from-gray-300 to-gray-500' };
    if (score >= 60) return { level: '银牌', emoji: '🥉', color: 'from-orange-300 to-orange-500' };
    return { level: '普通', emoji: '⭐', color: 'from-blue-400 to-blue-600' };
  };

  const creditInfo = getCreditLevel(diviner.creditScore);

  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden rounded-lg border border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-black p-6 cursor-pointer transition hover:border-purple-400/60 hover:shadow-lg hover:shadow-purple-500/20"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition" style={{
        background: `linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, transparent 100%)`,
      }}></div>

      <div className="relative z-10 space-y-4">
        {/* 头像和在线状态 */}
        <div className="flex items-start justify-between">
          <div className="text-5xl">{diviner.avatar || '✨'}</div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-xs text-green-400">在线</span>
          </div>
        </div>

        {/* 名字和职位 */}
        <div>
          <h4 className="text-lg font-bold text-white">{diviner.name}</h4>
          <p className="text-sm text-purple-400">{diviner.title}</p>
        </div>

        {/* 评分 */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(diviner.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}
              />
            ))}
          </div>
          <span className="text-xs text-gray-400">{diviner.rating?.toFixed(1) || 0}</span>
        </div>

        {/* 信用指数 */}
        <div className="flex items-center gap-2">
          <span className="text-sm">{creditInfo.emoji}</span>
          <div className="flex-1 bg-gray-700 rounded-full h-2">
            <div
              className={`bg-gradient-to-r ${creditInfo.color} h-2 rounded-full`}
              style={{ width: `${(diviner.creditScore / 100) * 100}%` }}
            ></div>
          </div>
          <span className="text-xs text-gray-400">{diviner.creditScore}/100</span>
        </div>

        {/* 统计信息 */}
        <div className="text-xs text-gray-400 space-y-1">
          <div>📊 订单: {diviner.totalOrders}</div>
          <div>⏱️ 平均: {diviner.responseTime}</div>
        </div>

        {/* 价格 */}
        <div className="pt-4 border-t border-purple-500/20">
          <div className="text-center">
            <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
              HK${diviner.price}
            </span>
            <p className="text-xs text-gray-500">起价</p>
          </div>
        </div>

        {/* 按钮 */}
        <button className="w-full mt-4 py-2 rounded bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-sm hover:from-purple-500 hover:to-pink-500 transition">
          查看详情
        </button>
      </div>
    </div>
  );
}

// 先生详情页
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

  // 计算评分维度平均值
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
    <div className="space-y-8">
      <button
        onClick={onBack}
        className="text-purple-400 hover:text-purple-300 transition flex items-center gap-2"
      >
        ← 返回
      </button>

      {/* 头部信息 */}
      <div className="rounded-lg border border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-black p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 左侧：头像 */}
          <div className="flex flex-col items-center">
            <div className="text-8xl mb-4">{diviner.avatar || '✨'}</div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-green-400 font-semibold">在线</span>
            </div>
          </div>

          {/* 中间：基本信息 */}
          <div className="space-y-4">
            <div>
              <h2 className="text-3xl font-bold text-white">{diviner.name}</h2>
              <p className="text-xl text-purple-400">{diviner.title}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Star size={18} className="text-yellow-400 fill-yellow-400" />
                <span className="text-lg font-semibold">{diviner.rating?.toFixed(1) || 0}</span>
                <span className="text-gray-500">({reviews.length} 条评价)</span>
              </div>
            </div>

            <p className="text-gray-300">{diviner.bio}</p>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <Eye size={16} />
                <span>完成率: {diviner.completedOrders}/{diviner.totalOrders}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Zap size={16} />
                <span>平均回复: {diviner.responseTime}</span>
              </div>
            </div>
          </div>

          {/* 右侧：信用指数和按钮 */}
          <div className="space-y-4">
            {/* 信用指数卡片 */}
            <div className="p-4 rounded-lg bg-gradient-to-br from-purple-900/30 to-black border border-purple-500/30">
              <div className="text-center mb-3">
                <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                  {diviner.creditScore}
                </div>
                <p className="text-xs text-gray-400">信用指数</p>
              </div>
              <div className="bg-gray-700 rounded-full h-2 mb-3">
                <div
                  className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full"
                  style={{ width: `${diviner.creditScore}%` }}
                ></div>
              </div>
              <p className="text-xs text-center text-purple-400 font-semibold">
                {diviner.creditScore >= 90 ? '🥇 钻石' : diviner.creditScore >= 75 ? '🥈 金牌' : diviner.creditScore >= 60 ? '🥉 银牌' : '⭐ 普通'}
              </p>
            </div>

            {/* 按钮 */}
            <button
              onClick={onBooking}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-500 hover:to-pink-500 transition flex items-center justify-center gap-2"
            >
              <Calendar size={20} />
              付费预约 HK${diviner.price}
            </button>
            <button
              onClick={onReview}
              className="w-full py-3 rounded-lg border border-purple-500/50 text-purple-400 font-semibold hover:bg-purple-500/10 transition flex items-center justify-center gap-2"
            >
              <Heart size={20} />
              给先生评分
            </button>
          </div>
        </div>
      </div>

      {/* 标签页 */}
      <div className="border-b border-purple-500/30">
        <div className="flex gap-8">
          {['info', 'dimensions', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-2 border-b-2 transition ${
                activeTab === tab
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-gray-500 hover:text-gray-400'
              }`}
            >
              {tab === 'info' ? '专长领域' : tab === 'dimensions' ? '评分维度' : '用户评价'}
            </button>
          ))}
        </div>
      </div>

      {/* 内容 */}
      {activeTab === 'info' && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-purple-400">专长领域</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {diviner.specialty?.map((spec, i) => (
              <div
                key={i}
                className="p-4 rounded-lg border border-purple-500/30 bg-purple-900/10 text-center text-purple-300 hover:border-purple-400/60 transition"
              >
                {spec}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'dimensions' && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-purple-400">评分维度</h3>
          <div className="space-y-4">
            {[
              { name: '准确度', key: 'accuracy', weight: '30%' },
              { name: '沟通能力', key: 'communication', weight: '20%' },
              { name: '专业性', key: 'professionalism', weight: '25%' },
              { name: '准时性', key: 'punctuality', weight: '10%' },
              { name: '性价比', key: 'valueForMoney', weight: '15%' },
            ].map((dim) => (
              <div key={dim.key} className="p-4 rounded-lg border border-purple-500/20 bg-purple-900/5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-semibold">{dim.name}</span>
                  <span className="text-xs text-gray-400">权重: {dim.weight}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < Math.floor(dimensionAverages[dim.key] || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-400">{dimensionAverages[dim.key] || 0}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-purple-400">用户评价</h3>
          {reviews.length > 0 ? (
            reviews.slice(0, 5).map((review, i) => (
              <div key={i} className="p-4 rounded-lg border border-purple-500/20 bg-purple-900/5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={14} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{review.title}</span>
                </div>
                <p className="text-gray-300 text-sm">{review.content}</p>
                {review.tags?.length > 0 && (
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {review.tags.map((tag, j) => (
                      <span key={j} className="text-xs px-2 py-1 rounded bg-purple-500/20 text-purple-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-400">暂无评价</p>
          )}
        </div>
      )}
    </div>
  );
}

// 预约页
function BookingPage({ diviner, onBack }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [service, setService] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const services = [
    { name: '基础咨询', price: diviner.price },
    { name: '深度分析', price: Math.round(diviner.price * 1.5) },
    { name: '完整方案', price: diviner.price * 2 },
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
        setTimeout(() => onBack(), 2000);
      } catch (error) {
        console.error('预约失败:', error);
      }
    }
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center space-y-4">
          <div className="text-6xl animate-bounce">💎</div>
          <h3 className="text-2xl font-bold text-purple-400">预约成功！</h3>
          <p className="text-gray-400">请等待 {diviner.name} 的确认</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <button
        onClick={onBack}
        className="text-purple-400 hover:text-purple-300 transition flex items-center gap-2"
      >
        ← 返回
      </button>

      <div className="rounded-lg border border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-black p-8">
        <h2 className="text-2xl font-bold mb-2 text-white">预约 {diviner.name}</h2>
        <p className="text-gray-400 mb-6">选择服务类型和时间</p>

        <div className="space-y-6">
          {/* 服务选择 */}
          <div>
            <label className="block text-sm font-semibold text-purple-400 mb-3">
              选择服务
            </label>
            <div className="space-y-2">
              {services.map((svc) => (
                <label key={svc.name} className="flex items-center gap-3 p-3 rounded-lg border border-purple-500/30 cursor-pointer hover:bg-purple-900/10 transition">
                  <input
                    type="radio"
                    name="service"
                    value={svc.name}
                    checked={service === svc.name}
                    onChange={(e) => setService(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="flex-1 text-white">{svc.name}</span>
                  <span className="text-purple-400 font-semibold">HK${svc.price}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 日期选择 */}
          <div>
            <label className="block text-sm font-semibold text-purple-400 mb-2">
              选择日期
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 rounded-lg bg-black border border-purple-500/30 text-white focus:border-purple-400 focus:outline-none transition"
            />
          </div>

          {/* 时间选择 */}
          <div>
            <label className="block text-sm font-semibold text-purple-400 mb-2">
              选择时间
            </label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-3 rounded-lg bg-black border border-purple-500/30 text-white focus:border-purple-400 focus:outline-none transition"
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

          {/* 总价 */}
          {service && (
            <div className="p-4 rounded-lg bg-purple-900/20 border border-purple-500/30">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">总价</span>
                <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                  HK${services.find(s => s.name === service)?.price}
                </span>
              </div>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={!date || !time || !service}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-500 hover:to-pink-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            确认预约
          </button>
        </div>
      </div>
    </div>
  );
}

// 评价页
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
          (ratings.accuracy * 0.3 + ratings.communication * 0.2 + ratings.professionalism * 0.25 + ratings.punctuality * 0.1 + ratings.valueForMoney * 0.15)
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
        setTimeout(() => onBack(), 2000);
      } catch (error) {
        console.error('评价失败:', error);
      }
    }
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center space-y-4">
          <div className="text-6xl animate-bounce">⭐</div>
          <h3 className="text-2xl font-bold text-purple-400">评价已提交！</h3>
          <p className="text-gray-400">感谢你的评价</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <button
        onClick={onBack}
        className="text-purple-400 hover:text-purple-300 transition flex items-center gap-2"
      >
        ← 返回
      </button>

      <div className="rounded-lg border border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-black p-8">
        <h2 className="text-2xl font-bold mb-2 text-white">给 {diviner.name} 评分</h2>
        <p className="text-gray-400 mb-6">你的评价将帮助其他用户了解先生的服务质量</p>

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
              <div key={dim.key} className="p-4 rounded-lg border border-purple-500/20 bg-purple-900/5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-semibold">{dim.name}</span>
                  <span className="text-xs text-gray-400">权重: {dim.weight}</span>
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRatings({ ...ratings, [dim.key]: star })}
                      className="transition"
                    >
                      <Star
                        size={24}
                        className={ratings[dim.key] >= star ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}
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
              className="w-full p-3 rounded-lg bg-black border border-purple-500/30 text-white placeholder-gray-600 focus:border-purple-400 focus:outline-none transition"
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
              className="w-full h-32 p-3 rounded-lg bg-black border border-purple-500/30 text-white placeholder-gray-600 focus:border-purple-400 focus:outline-none transition"
            />
          </div>

          {/* 标签选择 */}
          <div>
            <label className="block text-sm font-semibold text-purple-400 mb-2">
              选择标签
            </label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    if (tags.includes(tag)) {
                      setTags(tags.filter(t => t !== tag));
                    } else {
                      setTags([...tags, tag]);
                    }
                  }}
                  className={`px-3 py-1 rounded-full text-sm transition ${
                    tags.includes(tag)
                      ? 'bg-purple-600 text-white'
                      : 'border border-purple-500/30 text-gray-400 hover:text-purple-400'
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
            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-500 hover:to-pink-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            提交评价
          </button>
        </div>
      </div>
    </div>
  );
}

// 个人资料页
function ProfilePage({ onBack }) {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <button
        onClick={onBack}
        className="text-purple-400 hover:text-purple-300 transition flex items-center gap-2"
      >
        ← 返回
      </button>

      <div className="rounded-lg border border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-black p-8">
        <h2 className="text-2xl font-bold mb-6 text-white">我的账户</h2>

        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-purple-900/10 border border-purple-500/20">
            <p className="text-gray-500 text-sm">用户名</p>
            <p className="text-white font-semibold">用户 #12345</p>
          </div>

          <div className="p-4 rounded-lg bg-purple-900/10 border border-purple-500/20">
            <p className="text-gray-500 text-sm">我的订单</p>
            <p className="text-white font-semibold">5 条</p>
          </div>

          <div className="p-4 rounded-lg bg-purple-900/10 border border-purple-500/20">
            <p className="text-gray-500 text-sm">我的评价</p>
            <p className="text-white font-semibold">3 条</p>
          </div>

          <div className="p-4 rounded-lg bg-purple-900/10 border border-purple-500/20">
            <p className="text-gray-500 text-sm">账户余额</p>
            <p className="text-white font-semibold">HK$0</p>
          </div>
        </div>

        <button className="w-full mt-6 py-3 rounded-lg border border-red-500/50 text-red-400 font-semibold hover:bg-red-500/10 transition">
          退出登录
        </button>
      </div>
    </div>
  );
}
