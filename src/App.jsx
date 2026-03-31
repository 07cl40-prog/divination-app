import React, { useState, useEffect, useRef } from 'react';
import { Star, Calendar, Zap, Eye, Heart, Send, Sparkles, Bot, Loader2, MessageCircle, TrendingUp, Compass } from 'lucide-react';
import axios from 'axios';

// 香港文運亨通 - AI智能運勢 + 在線真人算命

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
        @keyframes typing { 0% { opacity: 0.3; } 50% { opacity: 1; } 100% { opacity: 0.3; } }
        .animate-pulse-custom { animation: pulse 2s ease-in-out infinite; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-shimmer { background: linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.3), transparent); background-size: 200% 100%; animation: shimmer 2s infinite; }
        .typing-dot { animation: typing 1.4s infinite; }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
      `}</style>
    </div>
  );
}

// AI運勢助手組件
function AIFortuneAssistant() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '你好！我是AI運勢助手🌟\n\n我可以幫你：\n• 📅 今日/本週/本月運勢分析\n• 💼 事業發展建議\n• 💕 感情姻緣指引\n• 💰 財運投資建議\n• 🎯 人生決策參考\n\n請告訴我你的出生年月日，或描述你想了解的問題～' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fortuneTypes = [
    '今日運勢', '本週運勢', '本月運勢', '事業運', '財運', '感情運', '健康運'
  ];

  const handleSend = async (text) => {
    if (!text.trim()) return;
    
    const userMessage = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // 模擬AI回應
    setTimeout(() => {
      const response = generateFortuneResponse(text);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsLoading(false);
    }, 1500);
  };

  const generateFortuneResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('今日') || input.includes('今天')) return generateDailyFortune();
    if (input.includes('本週') || input.includes('這週')) return generateWeeklyFortune();
    if (input.includes('本月') || input.includes('這個月')) return generateMonthlyFortune();
    if (input.includes('事業') || input.includes('工作')) return generateCareerFortune();
    if (input.includes('財運') || input.includes('錢') || input.includes('投資')) return generateWealthFortune();
    if (input.includes('感情') || input.includes('愛情') || input.includes('姻緣')) return generateLoveFortune();
    if (input.includes('健康') || input.includes('身體')) return generateHealthFortune();
    return generateGeneralFortune(userInput);
  };

  const generateDailyFortune = () => {
    const fortunes = [
      { stars: '⭐⭐⭐⭐⭐', color: '紫色', direction: '東南方', advice: '今日運勢極佳，適合做重要決定！' },
      { stars: '⭐⭐⭐⭐', color: '金色', direction: '正南方', advice: '運勢平穩向上，把握機會。' },
    ];
    const f = fortunes[Math.floor(Math.random() * fortunes.length)];
    return `📅 今日運勢分析

綜合指數：${f.stars}
幸運顏色：${f.color}
吉利方位：${f.direction}

💫 運勢解讀：
${f.advice}

🎯 建議行動：
• 上午適合處理重要事務
• 下午人際運佳，適合社交
• 晚上宜靜心休息`;
  };

  const generateWeeklyFortune = () => `📆 本週運勢預測

週一～週三：⭐⭐⭐⭐ 事業運上升
週四～週五：⭐⭐⭐⭐⭐ 財運亨通
週末：⭐⭐⭐ 感情運佳

💡 本週重點：把握週四週五的財運高峰`;

  const generateMonthlyFortune = () => `📅 本月運勢總覽

🎯 整體運勢：⭐⭐⭐⭐
💼 事業運：⭐⭐⭐⭐⭐
💰 財運：⭐⭐⭐⭐
💕 感情運：⭐⭐⭐
🏃 健康運：⭐⭐⭐⭐

✨ 本月開運方位：東南方`;

  const generateCareerFortune = () => `💼 事業運勢分析

📊 當前狀態：事業正處於上升期
🎯 近期機遇：新合作機會出現
💡 建議：主動承擔更多責任
🌟 開運：辦公桌擺放綠色植物`;

  const generateWealthFortune = () => `💰 財運分析報告

📈 財運指數：⭐⭐⭐⭐
💵 收入：正財穩定增長
🎯 建議：本月適合儲蓄
⚠️ 提醒：注意電信詐騙
🍀 開運：錢包內放置古錢幣`;

  const generateLoveFortune = () => `💕 感情運勢分析

💖 桃花指數：⭐⭐⭐⭐
💑 有伴者：關係穩定，適合談婚論嫁
💃 單身者：下旬桃花運旺盛
🎯 開運：佩戴粉晶飾品`;

  const generateHealthFortune = () => `🏃 健康運勢提醒

💪 整體狀況：⭐⭐⭐⭐
⚠️ 注意：作息不規律，容易疲勞
🥗 建議：多吃蔬菜水果
🌿 開運食物：紅棗、枸杞、蜂蜜`;

  const generateGeneralFortune = (input) => `🔮 運勢解讀

根據「${input}」分析：

📊 整體運勢：⭐⭐⭐⭐
💫 關鍵指引：保持積極樂觀的心態
🎯 行動建議：制定明確的目標計劃
✨ 開運：每天早起面向東方深呼吸三次`;

  return (
    <div className="rounded-xl border border-cyan-500/30 bg-gradient-to-br from-cyan-900/10 via-purple-900/10 to-pink-900/10 overflow-hidden">
      <div className="p-4 border-b border-cyan-500/20 bg-cyan-500/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center animate-float">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-white">AI運勢助手</h3>
            <p className="text-xs text-cyan-400">在線 · 隨時為你解讀運勢</p>
          </div>
        </div>
      </div>

      <div className="h-[280px] overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-lg p-3 text-sm ${
              msg.role === 'user' 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                : 'bg-purple-900/30 border border-purple-500/20 text-gray-200'
            }`}>
              <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-purple-900/30 border border-purple-500/20 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-cyan-400" />
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 typing-dot"></span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 typing-dot"></span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 typing-dot"></span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="px-4 py-2 border-t border-cyan-500/10">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {fortuneTypes.map((type, i) => (
            <button key={i} onClick={() => handleSend(type)} className="whitespace-nowrap px-3 py-1.5 rounded-full text-xs bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30 transition">
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-cyan-500/20">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="輸入你的問題，例如：1990年5月15日出生，今日運勢如何？"
            className="flex-1 px-4 py-2 rounded-lg bg-black/50 border border-purple-500/30 text-white text-sm placeholder-gray-600 focus:border-cyan-400 focus:outline-none transition"
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(input); }}}
          />
          <button onClick={() => handleSend(input)} disabled={!input.trim() || isLoading} className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-purple-600 text-white hover:from-cyan-500 hover:to-purple-500 transition disabled:opacity-50">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// 首頁
function HomePage({ diviners, sortBy, setSortBy, loading, onSelectDiviner }) {
  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-xl border border-purple-500/50 bg-gradient-to-br from-purple-900/30 to-black p-8 text-center">
        <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
          連接宇宙的智慧
        </h2>
        <p className="text-gray-400 mb-6">AI運勢解讀 · 真人算命咨詢 · 專業命理分析</p>
        <div className="flex justify-center gap-3 flex-wrap">
          <div className="px-4 py-2 rounded-full border border-cyan-500/50 text-cyan-400 text-sm bg-cyan-500/10">🤖 AI運勢</div>
          <div className="px-4 py-2 rounded-full border border-purple-500/50 text-purple-400 text-sm bg-purple-500/10">✨ 透明評分</div>
          <div className="px-4 py-2 rounded-full border border-pink-500/50 text-pink-400 text-sm bg-pink-500/10">💎 信用指數</div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <Compass className="w-5 h-5 text-cyan-400" />
          <h3 className="text-xl font-bold text-white">AI運勢助手</h3>
          <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs">NEW</span>
        </div>
        <AIFortuneAssistant />
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            <h3 className="text-xl font-bold text-white">在線大師</h3>
          </div>
          <div className="flex gap-2">
            {['rating', 'credit', 'new'].map((type) => (
              <button key={type} onClick={() => setSortBy(type)} className={`px-3 py-1 rounded-full text-xs transition ${sortBy === type ? 'bg-purple-600 text-white' : 'border border-purple-500/30 text-gray-400 hover:text-purple-400'}`}>
                {type === 'rating' ? '按評分' : type === 'credit' ? '按信用' : '最新'}
              </button>
            ))}
          </div>
        </div>
        
        {loading ? (
          <div className="text-center text-gray-400 py-8">載入中...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {diviners.map((diviner) => (
              <DivinerCard key={diviner._id} diviner={diviner} onClick={() => onSelectDiviner(diviner)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function DivinerCard({ diviner, onClick }) {
  // 使用东方玄学风格头像 - notionists简约人物风格
  const avatarUrl = `https://api.dicebear.com/7.x/notionists/svg?seed=${diviner._id}&backgroundColor=1a1a2e,16213e,0f3460,e94560&radius=50`;
  
  return (
    <div onClick={onClick} className="group relative overflow-hidden rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-black p-5 cursor-pointer transition hover:border-purple-400/60 hover:shadow-lg hover:shadow-purple-500/20">
      <div className="relative z-10 space-y-3">
        <div className="flex items-start justify-between">
          <div className="relative">
            <img 
              src={avatarUrl} 
              alt={diviner.name}
              className="w-16 h-16 rounded-full border-2 border-purple-500/50 bg-gradient-to-br from-purple-900/40 to-black object-cover"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-black animate-pulse"></div>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-green-400">在線</span>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-white">{diviner.name}</h4>
          <p className="text-xs text-purple-400">{diviner.title}</p>
        </div>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} className={i < Math.floor(diviner.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'} />
          ))}
          <span className="text-xs text-gray-400 ml-1">{diviner.rating?.toFixed(1)}</span>
        </div>
        <div className="pt-3 border-t border-purple-500/20 flex items-center justify-between">
          <span className="text-lg font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">HK${diviner.price}</span>
          <span className="text-xs text-gray-500">起</span>
        </div>
      </div>
    </div>
  );
}

function DivinerDetailPage({ diviner, onBack, onBooking }) {
  // 东方玄学风格头像
  const avatarUrl = `https://api.dicebear.com/7.x/notionists/svg?seed=${diviner._id}&backgroundColor=1a1a2e,16213e,0f3460,e94560&radius=50`;
  
  return (
    <div className="space-y-6">
      <button onClick={onBack} className="text-purple-400 hover:text-purple-300 transition flex items-center gap-2">← 返回</button>
      <div className="rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-black p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center">
            <div className="relative mb-2">
              <img 
                src={avatarUrl} 
                alt={diviner.name}
                className="w-24 h-24 rounded-full border-3 border-purple-500/50 bg-gradient-to-br from-purple-900/40 to-black object-cover"
              />
              <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-400 rounded-full border-3 border-black animate-pulse"></div>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-green-400 text-sm">在線</span>
            </div>
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <h2 className="text-2xl font-bold text-white">{diviner.name}</h2>
              <p className="text-purple-400">{diviner.title}</p>
            </div>
            <div className="flex items-center gap-2">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              <span className="font-semibold">{diviner.rating?.toFixed(1)}</span>
              <span className="text-gray-500 text-sm">({diviner.totalOrders} 評價)</span>
            </div>
            <p className="text-gray-300 text-sm">{diviner.bio}</p>
          </div>
          <div className="space-y-3 md:w-48">
            <div className="p-4 rounded-lg bg-purple-900/30 border border-purple-500/30 text-center">
              <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">{diviner.creditScore}</div>
              <p className="text-xs text-gray-400">信用指數</p>
            </div>
            <button onClick={onBooking} className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-500 hover:to-pink-500 transition">
              預約 HK${diviner.price}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BookingPage({ diviner, onBack }) {
  const [submitted, setSubmitted] = useState(false);
  
  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center space-y-3">
          <div className="text-5xl animate-bounce">💎</div>
          <h3 className="text-xl font-bold text-purple-400">預約成功！</h3>
          <p className="text-gray-400 text-sm">請等待 {diviner.name} 確認</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <button onClick={onBack} className="text-purple-400 hover:text-purple-300 transition flex items-center gap-2">← 返回</button>
      <div className="rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-black p-6">
        <h2 className="text-xl font-bold mb-1 text-white">預約 {diviner.name}</h2>
        <p className="text-gray-400 text-sm mb-4">選擇服務時間</p>
        <div className="p-3 rounded-lg bg-purple-900/20 border border-purple-500/30 text-center mb-4">
          <span className="text-xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">HK${diviner.price}</span>
          <p className="text-xs text-gray-400">基礎咨詢 30分鐘</p>
        </div>
        <button onClick={() => setSubmitted(true)} className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-500 hover:to-pink-500 transition">
          確認預約
        </button>
      </div>
    </div>
  );
}

function ProfilePage({ onBack }) {
  return (
    <div className="space-y-4 max-w-md mx-auto">
      <button onClick={onBack} className="text-purple-400 hover:text-purple-300 transition flex items-center gap-2">← 返回</button>
      <div className="rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-black p-6">
        <h2 className="text-xl font-bold mb-4 text-white">我的帳戶</h2>
        <div className="space-y-3">
          {['我的訂單', '我的評價', '帳戶餘額'].map((item, i) => (
            <div key={i} className="p-4 rounded-lg bg-purple-900/10 border border-purple-500/20 flex justify-between">
              <span className="text-gray-400 text-sm">{item}</span>
              <span className="text-white font-semibold">{i === 2 ? 'HK$0' : '5'}</span>
            </div>
          ))}
        </div>
        <button className="w-full mt-6 py-3 rounded-lg border border-red-500/50 text-red-400 font-semibold hover:bg-red-500/10 transition">
          退出登錄
        </button>
      </div>
    </div>
  );
}
