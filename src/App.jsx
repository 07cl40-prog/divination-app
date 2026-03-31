import React, { useState, useEffect, useRef } from 'react';
import { Star, MessageCircle, Calendar, Zap, Eye, TrendingUp, Award, Heart, Send, Sparkles, Moon, Bot, Loader2 } from 'lucide-react';
import axios from 'axios';

// 香港文運亨通 - AI智能解夢 + 在線真人算命

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://divination-app-backend-production.up.railway.app/api';

export default function DivinationApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedDiviner, setSelectedDiviner] = useState(null);
  const [diviners, setDiviners] = useState([]);
  const [sortBy, setSortBy] = useState('rating');
  const [loading, setLoading] = useState(false);

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
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* 賽博背景 */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-black"></div>
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 136, 0.03) 2px, rgba(0, 255, 136, 0.03) 4px)',
        }}></div>
      </div>

      {/* 導航欄 */}
      <nav className="border-b border-purple-500/30 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-2xl">🔮</div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              香港文運亨通
            </h1>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setCurrentPage('home')} className={`px-4 py-2 rounded transition ${currentPage === 'home' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-purple-400'}`}>
              首頁
            </button>
            <button onClick={() => setCurrentPage('ai-dream')} className={`px-4 py-2 rounded transition ${currentPage === 'ai-dream' ? 'bg-cyan-600 text-white' : 'text-gray-400 hover:text-cyan-400'}`}>
              🌙 AI解夢
            </button>
            <button onClick={() => setCurrentPage('profile')} className={`px-4 py-2 rounded transition ${currentPage === 'profile' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-purple-400'}`}>
              我的
            </button>
          </div>
        </div>
      </nav>

      {/* 主內容 */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {currentPage === 'home' && (
          <HomePage
            diviners={diviners}
            sortBy={sortBy}
            setSortBy={setSortBy}
            loading={loading}
            onSelectDiviner={(diviner) => { setSelectedDiviner(diviner); setCurrentPage('diviner-detail'); }}
          />
        )}

        {currentPage === 'ai-dream' && (
          <AIDreamPage onBack={() => setCurrentPage('home')} />
        )}

        {currentPage === 'diviner-detail' && selectedDiviner && (
          <DivinerDetailPage
            diviner={selectedDiviner}
            onBack={() => setCurrentPage('home')}
            onBooking={() => setCurrentPage('booking')}
          />
        )}

        {currentPage === 'booking' && selectedDiviner && (
          <BookingPage diviner={selectedDiviner} onBack={() => setCurrentPage('diviner-detail')} />
        )}

        {currentPage === 'profile' && (
          <ProfilePage onBack={() => setCurrentPage('home')} />
        )}
      </div>

      <style jsx>{`
        @keyframes scan { 0% { transform: translateY(0); } 100% { transform: translateY(10px); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        .animate-pulse-custom { animation: pulse 2s ease-in-out infinite; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-shimmer { background: linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.3), transparent); background-size: 200% 100%; animation: shimmer 2s infinite; }
      `}</style>
    </div>
  );
}

// AI解夢頁面
function AIDreamPage({ onBack }) {
  const [dream, setDream] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [dreamAnalysis, setDreamAnalysis] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const commonDreams = [
    '夢見蛇纏身', '夢見親人過世', '夢見被追殺', '夢見掉牙齒',
    '夢見結婚', '夢見考試', '夢見洪水', '夢見飛翔'
  ];

  const handleSubmit = async (dreamText) => {
    if (!dreamText.trim()) return;
    
    const userMessage = { role: 'user', content: dreamText };
    setMessages(prev => [...prev, userMessage]);
    setDream('');
    setIsLoading(true);

    // 模擬AI回應（實際專案需要接入LLM API）
    setTimeout(() => {
      const aiResponse = generateDreamAnalysis(dreamText);
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse.fullAnalysis }]);
      setDreamAnalysis(aiResponse);
      setShowResult(true);
      setIsLoading(false);
    }, 2000);
  };

  const generateDreamAnalysis = (dreamText) => {
    // 這裡是模擬分析，實際需要接入AI API
    const dreamDB = {
      '蛇': { symbol: '🐍', title: '蛇', category: '財運與轉機', analysis: '蛇在夢中象徵著潛在的財富機會或生命中的重要轉折點。這個夢預示著您近期可能會遇到意想不到的好運，或是有貴人相助。', advice: '建議您保持開放的心態，勇於接受新的機會。' },
      '死亡': { symbol: '😢', title: '死亡/過世', category: '新生與轉變', analysis: '夢見死亡通常象徵著結束和新的開始。這預示著您生活中的某個階段即將結束，另一個新的階段即將開啟。', advice: '這是一個充滿希望的夢境，預示著蛻變和成長。' },
      '結婚': { symbol: '💒', title: '結婚', category: '姻緣與合作', analysis: '結婚象徵著結合與承諾。這個夢可能預示著新的合作關係、感情發展，或是事業上的新階段。', advice: '如有心儀的對象，建議主動出擊。' },
      '追逐': { symbol: '🏃', title: '被追殺', category: '壓力與焦慮', analysis: '被追逐的夢通常反映現實生活中的壓力或逃避的問題。這是您潛意識在提醒您需要面對某些困擾。', advice: '建議正面迎接挑戰，而非一味逃避。' },
      '牙齒': { symbol: '🦷', title: '掉牙齒', category: '自信與形象', analysis: '牙齒象徵自信和形象。這個夢可能預示著您對自己外在或能力有些許不安，或是擔心他人的看法。', advice: '建立自信，相信自己的價值。' },
      '考試': { symbol: '📝', title: '考試', category: '考驗與準備', analysis: '考試的夢預示著您正在經歷或即將面臨某種考驗。這可能是事業上的重要關卡，或是對自己能力的測試。', advice: '機會留給有準備的人，繼續充實自己。' },
      '洪水': { symbol: '🌊', title: '洪水', category: '情緒與變化', analysis: '洪水象徵著強烈的情緒或不可控的變化。這個夢預示著您近期可能經歷情緒波動，或是生活中有大變化。', advice: '學會情緒管理，保持內心平靜。' },
      '飛翔': { symbol: '🦅', title: '飛翔', category: '自由與突破', analysis: '飛翔象徵著自由、突破和更高的視野。這個夢預示著您即將擺脫束縛，達到新的高度。', advice: '勇於追求夢想，突破舒適區。' },
    };

    let result = { symbol: '🔮', title: '神秘夢境', category: '潛意識訊息', analysis: '這個夢境蘊含著豐富的潛意識訊息，需要細細品味。', advice: '建議記錄夢境細節，深入思考。' };
    
    for (const [key, value] of Object.entries(dreamDB)) {
      if (dreamText.includes(key)) {
        result = value;
        break;
      }
    }

    const fullAnalysis = `${result.symbol} 【${result.title}】解析

📌 夢境分類：${result.category}

💭 夢境含義：
${result.analysis}

✨ 建議指引：
${result.advice}

🌟 周公解夢溫馨提示：
這個夢境反映了您近期的生活狀態和內心訴求。建議您結合實際情況，理性看待夢境指引。`;

    return { ...result, fullAnalysis };
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <button onClick={onBack} className="text-purple-400 hover:text-purple-300 transition flex items-center gap-2">
        ← 返回
      </button>

      {/* 頂部介紹 */}
      <div className="relative overflow-hidden rounded-lg border border-cyan-500/30 bg-gradient-to-br from-cyan-900/20 to-purple-900/20 p-8">
        <div className="absolute top-4 right-4">
          <div className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-medium flex items-center gap-1">
            <Bot className="w-3 h-3" />
            AI驅動
          </div>
        </div>
        <div className="relative z-10 text-center">
          <div className="text-6xl mb-4 animate-float">🌙</div>
          <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            AI智能解夢
          </h2>
          <p className="text-gray-400 mb-4">
            基於千萬級夢境數據訓練，結合傳統周公解夢智慧<br/>
            探索你潛意識中的秘密
          </p>
          <div className="flex justify-center gap-4 text-sm">
            <div className="flex items-center gap-1 text-cyan-400">
              <Zap className="w-4 h-4" /> 3秒解析
            </div>
            <div className="flex items-center gap-1 text-purple-400">
              <Eye className="w-4 h-4" /> 深度分析
            </div>
            <div className="flex items-center gap-1 text-pink-400">
              <Sparkles className="w-4 h-4" /> 完全免費
            </div>
          </div>
        </div>
      </div>

      {/* 對話區域 */}
      <div className="rounded-lg border border-purple-500/30 bg-purple-900/10 overflow-hidden">
        {/* 輸入區 */}
        <div className="p-6 border-b border-purple-500/20">
          <label className="block text-purple-400 font-medium mb-3">描述你的夢境</label>
          <div className="flex gap-3">
            <textarea
              value={dream}
              onChange={(e) => setDream(e.target.value)}
              placeholder="例如：夢見自己在一片森林裡迷路，然後看到一條大蛇..."
              className="flex-1 p-4 rounded-lg bg-black/50 border border-purple-500/30 text-white placeholder-gray-600 focus:border-cyan-400 focus:outline-none transition resize-none h-24"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(dream);
                }
              }}
            />
            <button
              onClick={() => handleSubmit(dream)}
              disabled={!dream.trim() || isLoading}
              className="px-6 rounded-lg bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-semibold hover:from-cyan-500 hover:to-purple-500 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
          
          {/* 快捷夢境標籤 */}
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="text-xs text-gray-500">快捷解夢：</span>
            {commonDreams.map((d, i) => (
              <button
                key={i}
                onClick={() => handleSubmit(d)}
                className="text-xs px-3 py-1 rounded-full border border-purple-500/30 text-purple-300 hover:bg-purple-500/20 transition"
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* 對話歷史 */}
        <div className="p-6 max-h-[400px] overflow-y-auto space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              <Moon className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>描述你的夢境，AI將為你解讀</p>
            </div>
          )}
          
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-lg p-4 ${
                msg.role === 'user' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                  : 'bg-purple-900/50 border border-purple-500/30'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {msg.role === 'assistant' ? <Bot className="w-4 h-4 text-cyan-400" /> : <span className="text-sm">你</span>}
                </div>
                <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-purple-900/50 border border-purple-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Bot className="w-4 h-4" />
                  <span className="text-sm">AI解析中...</span>
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 底部說明 */}
      <div className="text-center text-gray-500 text-sm">
        <p>💡 AI解夢僅供參考，不能替代專業心理咨詢</p>
      </div>
    </div>
  );
}

// 首頁
function HomePage({ diviners, sortBy, setSortBy, loading, onSelectDiviner }) {
  return (
    <div className="space-y-12">
      {/* 英雄區 */}
      <div className="relative overflow-hidden rounded-lg border border-purple-500/50 bg-gradient-to-br from-purple-900/30 to-black p-12 text-center">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)',
        }}></div>
        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            連接宇宙的智慧
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            在賽博空間中，與東方玄學大師對話
          </p>
          <div className="flex justify-center gap-4">
            <div className="px-6 py-2 rounded border border-purple-500/50 text-purple-400 text-sm">
              ✨ 透明評分
            </div>
            <div className="px-6 py-2 rounded border border-pink-500/50 text-pink-400 text-sm">
              💎 信用指數
            </div>
            <div className="px-6 py-2 rounded border border-cyan-500/50 text-cyan-400 text-sm">
              🔮 AI解夢
            </div>
          </div>
        </div>
      </div>

      {/* 排序選項 */}
      <div className="flex gap-4 flex-wrap">
        <button onClick={() => setSortBy('rating')} className={`px-4 py-2 rounded transition ${sortBy === 'rating' ? 'bg-purple-600 text-white' : 'border border-purple-500/30 text-gray-400 hover:text-purple-400'}`}>
          按評分排序
        </button>
        <button onClick={() => setSortBy('credit')} className={`px-4 py-2 rounded transition ${sortBy === 'credit' ? 'bg-purple-600 text-white' : 'border border-purple-500/30 text-gray-400 hover:text-purple-400'}`}>
          按信用指數排序
        </button>
        <button onClick={() => setSortBy('new')} className={`px-4 py-2 rounded transition ${sortBy === 'new' ? 'bg-purple-600 text-white' : 'border border-purple-500/30 text-gray-400 hover:text-purple-400'}`}>
          最新加入
        </button>
      </div>

      {/* 大師網格 */}
      <div>
        <h3 className="text-2xl font-bold mb-8 text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
          ⚡ 在線大師
        </h3>
        {loading ? (
          <div className="text-center text-gray-400">載入中...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {diviners.map((diviner) => (
              <DivinerCard key={diviner._id} diviner={diviner} onClick={() => onSelectDiviner(diviner)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// 大師卡片
function DivinerCard({ diviner, onClick }) {
  const getCreditLevel = (score) => {
    if (score >= 90) return { level: '鑽石', emoji: '💎', color: 'from-cyan-400 to-purple-400' };
    if (score >= 75) return { level: '金牌', emoji: '🥇', color: 'from-yellow-400 to-orange-400' };
    if (score >= 60) return { level: '銀牌', emoji: '🥈', color: 'from-gray-300 to-gray-500' };
    return { level: '普通', emoji: '⭐', color: 'from-blue-400 to-blue-600' };
  };

  const creditInfo = getCreditLevel(diviner.creditScore);

  return (
    <div onClick={onClick} className="group relative overflow-hidden rounded-lg border border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-black p-6 cursor-pointer transition hover:border-purple-400/60 hover:shadow-lg hover:shadow-purple-500/20">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition" style={{ background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, transparent 100%)' }}></div>
      <div className="relative z-10 space-y-4">
        <div className="flex items-start justify-between">
          <div className="text-5xl">{diviner.avatar || '✨'}</div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-xs text-green-400">在線</span>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-bold text-white">{diviner.name}</h4>
          <p className="text-sm text-purple-400">{diviner.title}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className={i < Math.floor(diviner.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'} />
            ))}
          </div>
          <span className="text-xs text-gray-400">{diviner.rating?.toFixed(1) || 0}</span>
        </div>
        <div className="pt-4 border-t border-purple-500/20">
          <div className="text-center">
            <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">HK${diviner.price}</span>
            <p className="text-xs text-gray-500">起價</p>
          </div>
        </div>
        <button className="w-full mt-4 py-2 rounded bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-sm hover:from-purple-500 hover:to-pink-500 transition">
          查看詳情
        </button>
      </div>
    </div>
  );
}

// 大師詳情頁
function DivinerDetailPage({ diviner, onBack, onBooking }) {
  return (
    <div className="space-y-8">
      <button onClick={onBack} className="text-purple-400 hover:text-purple-300 transition flex items-center gap-2">← 返回</button>
      <div className="rounded-lg border border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-black p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <div className="text-8xl mb-4">{diviner.avatar || '✨'}</div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-green-400 font-semibold">在線</span>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h2 className="text-3xl font-bold text-white">{diviner.name}</h2>
              <p className="text-xl text-purple-400">{diviner.title}</p>
            </div>
            <div className="flex items-center gap-2">
              <Star size={18} className="text-yellow-400 fill-yellow-400" />
              <span className="text-lg font-semibold">{diviner.rating?.toFixed(1) || 0}</span>
              <span className="text-gray-500">({diviner.totalOrders} 評價)</span>
            </div>
            <p className="text-gray-300">{diviner.bio}</p>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-gradient-to-br from-purple-900/30 to-black border border-purple-500/30 text-center">
              <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">{diviner.creditScore}</div>
              <p className="text-xs text-gray-400">信用指數</p>
            </div>
            <button onClick={onBooking} className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-500 hover:to-pink-500 transition flex items-center justify-center gap-2">
              <Calendar size={20} /> 付費預約 HK${diviner.price}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 預約頁
function BookingPage({ diviner, onBack }) {
  const [submitted, setSubmitted] = useState(false);
  
  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center space-y-4">
          <div className="text-6xl animate-bounce">💎</div>
          <h3 className="text-2xl font-bold text-purple-400">預約成功！</h3>
          <p className="text-gray-400">請等待 {diviner.name} 的確認</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <button onClick={onBack} className="text-purple-400 hover:text-purple-300 transition flex items-center gap-2">← 返回</button>
      <div className="rounded-lg border border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-black p-8">
        <h2 className="text-2xl font-bold mb-2 text-white">預約 {diviner.name}</h2>
        <p className="text-gray-400 mb-6">選擇服務和時間</p>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-purple-900/20 border border-purple-500/30 text-center">
            <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">HK${diviner.price}</span>
            <p className="text-sm text-gray-400">基礎咨詢 30分鐘</p>
          </div>
          <button onClick={() => setSubmitted(true)} className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-500 hover:to-pink-500 transition">
            確認預約
          </button>
        </div>
      </div>
    </div>
  );
}

// 個人資料頁
function ProfilePage({ onBack }) {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <button onClick={onBack} className="text-purple-400 hover:text-purple-300 transition flex items-center gap-2">← 返回</button>
      <div className="rounded-lg border border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-black p-8">
        <h2 className="text-2xl font-bold mb-6 text-white">我的帳戶</h2>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-purple-900/10 border border-purple-500/20">
            <p className="text-gray-500 text-sm">我的訂單</p>
            <p className="text-white font-semibold">5 條</p>
          </div>
          <div className="p-4 rounded-lg bg-purple-900/10 border border-purple-500/20">
            <p className="text-gray-500 text-sm">我的評價</p>
            <p className="text-white font-semibold">3 條</p>
          </div>
          <div className="p-4 rounded-lg bg-purple-900/10 border border-purple-500/20">
            <p className="text-gray-500 text-sm">帳戶餘額</p>
            <p className="text-white font-semibold">HK$0</p>
          </div>
        </div>
        <button className="w-full mt-6 py-3 rounded-lg border border-red-500/50 text-red-400 font-semibold hover:bg-red-500/10 transition">
          退出登錄
        </button>
      </div>
    </div>
  );
}
