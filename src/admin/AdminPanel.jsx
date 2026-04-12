import React, { useState, useEffect, useRef } from 'react';
import {
  Package, Plus, Trash2, Edit2, Eye, EyeOff, Save,
  X, CheckCircle, AlertCircle, Loader, LogOut, ShoppingBag, Star,
  Settings, Zap, ExternalLink, Globe
} from 'lucide-react';

// GitHub icon as inline SVG (lucide-react doesn't export "Github")
const GitHubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

import productsData from '../data/products.json';

const ADMIN_PASSWORD = 'caishen2026';
const GITHUB_OWNER = '07cl40-prog';
const GITHUB_REPO = 'divination-app';
const PRODUCTS_PATH = 'src/data/products.json';

const TAG_COLORS = [
  { value: 'bg-red-700', label: 'Red 紅' },
  { value: 'bg-yellow-600', label: 'Yellow 黃' },
  { value: 'bg-purple-800', label: 'Purple 紫' },
  { value: 'bg-amber-700', label: 'Amber 琥珀' },
  { value: 'bg-emerald-700', label: 'Green 綠' },
  { value: 'bg-blue-700', label: 'Blue 藍' },
];

const BADGE_OPTIONS = ['', 'BESTSELLER', 'NEW', 'LIMITED', 'EXCLUSIVE', 'HOT'];

// ============================================================
//  GITHUB API HELPERS
// ============================================================
async function githubGetContent(token, path) {
  const res = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`, {
    headers: { Authorization: `token ${token}`, Accept: 'application/vnd.github.v3+json' }
  });
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  return res.json();
}

async function githubPutContent(token, path, content, sha, message) {
  const res = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`, {
    method: 'PUT',
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      content: btoa(unescape(encodeURIComponent(content))),
      sha,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`GitHub API error: ${res.status} - ${err.message || ''}`);
  }
  return res.json();
}

// ============================================================
//  IMAGE UPLOAD COMPONENT
// ============================================================
function ImageUpload({ images, onChange, label = 'Images', token }) {
  const [previews, setPreviews] = useState(images || []);
  const fileInputRef = useRef(null);

  useEffect(() => { setPreviews(images || []); }, [images]);

  const handleFiles = (files) => {
    Array.from(files).forEach(file => {
      if (file.size > 10 * 1024 * 1024) { alert(`File ${file.name} > 10MB`); return; }
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviews(prev => {
          const updated = [...prev, e.target.result];
          onChange(updated);
          return updated;
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setPreviews(prev => {
      const updated = prev.filter((_, i) => i !== index);
      onChange(updated);
      return updated;
    });
  };

  return (
    <div>
      <div className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">{label}</div>
      <div
        className="border-2 border-dashed border-yellow-900/50 rounded-xl p-4 text-center cursor-pointer hover:border-yellow-600 transition-colors mb-3"
        onClick={() => fileInputRef.current?.click()}
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
      >
        <input ref={fileInputRef} type="file" multiple accept="image/*" className="hidden"
          onChange={e => handleFiles(e.target.files)} />
        <div className="flex flex-col items-center gap-1">
          <Save size={18} className="text-gray-600" />
          <p className="text-gray-500 text-xs">Click or drag images here (max 10MB each)</p>
        </div>
      </div>
      {previews.length > 0 && (
        <div className="grid grid-cols-5 gap-2">
          {previews.map((src, i) => (
            <div key={i} className="relative group aspect-square bg-zinc-900 rounded-lg overflow-hidden border border-yellow-900/30">
              <img src={src} alt="" className="w-full h-full object-cover" />
              {i === 0 && <div className="absolute top-1 left-1 bg-yellow-600 text-black text-[9px] font-black px-1 rounded">MAIN</div>}
              <button onClick={() => removeImage(i)}
                className="absolute top-1 right-1 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <X size={10} className="text-white" />
              </button>
            </div>
          ))}
        </div>
      )}
      {token && (
        <p className="text-[10px] text-gray-600 mt-1">Images embedded as data URLs — synced to GitHub on save.</p>
      )}
    </div>
  );
}

// ============================================================
//  PRODUCT FORM
// ============================================================
function ProductForm({ product, onSave, onCancel, token, onSetStatus }) {
  const isNew = !product.id;
  const [form, setForm] = useState({ ...product, images: product.images || [], features: product.features || [] });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const setNum = k => e => set(k, Number(e.target.value));

  const handleSave = async () => {
    if (!form.name || !form.nameEn || !form.price) {
      alert('Please fill in: Product Name (ZH), Product Name (EN), and Price');
      return;
    }
    setSaving(true);
    onSetStatus({ type: 'loading', msg: 'Saving product...' });
    try {
      await onSave(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      onSetStatus({ type: 'error', msg: err.message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Product Name (ZH) *</label>
          <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="AI財神 · 毛絨掛件款" className="w-full bg-black/60 border border-yellow-900/50 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-yellow-600" />
        </div>
        <div>
          <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Product Name (EN) *</label>
          <input value={form.nameEn} onChange={e => set('nameEn', e.target.value)} placeholder="CaiShen AI Plush Keychain" className="w-full bg-black/60 border border-yellow-900/50 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-yellow-600" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Price ($) *</label>
          <input type="number" value={form.price} onChange={setNum('price')} min="1" className="w-full bg-black/60 border border-yellow-900/50 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-yellow-600" />
        </div>
        <div>
          <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Original Price ($)</label>
          <input type="number" value={form.originalPrice || ''} onChange={setNum('originalPrice')} min="1" className="w-full bg-black/60 border border-yellow-900/50 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-yellow-600" />
        </div>
        <div>
          <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Rating (0-5)</label>
          <input type="number" value={form.rating || 4.8} onChange={setNum('rating')} min="0" max="5" step="0.1" className="w-full bg-black/60 border border-yellow-900/50 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-yellow-600" />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Tag Label</label>
          <input value={form.tag || ''} onChange={e => set('tag', e.target.value)} placeholder="爆款" className="w-full bg-black/60 border border-yellow-900/50 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-yellow-600" />
        </div>
        <div>
          <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Tag Color</label>
          <select value={form.tagColor || 'bg-yellow-600'} onChange={e => set('tagColor', e.target.value)} className="w-full bg-black/60 border border-yellow-900/50 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-yellow-600">
            {TAG_COLORS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Badge</label>
          <select value={form.badge || ''} onChange={e => set('badge', e.target.value)} className="w-full bg-black/60 border border-yellow-900/50 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-yellow-600">
            {BADGE_OPTIONS.map(b => <option key={b} value={b}>{b || '(none)'}</option>)}
          </select>
        </div>
        <div className="flex items-center pt-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <div className={`w-10 h-6 rounded-full transition-colors ${form.active !== false ? 'bg-yellow-600' : 'bg-zinc-700'}`} onClick={() => set('active', form.active !== false ? false : true)}>
              <div className={`w-5 h-5 bg-white rounded-full mx-0.5 my-0.5 transition-transform ${form.active !== false ? 'translate-x-4' : ''}`} />
            </div>
            <span className="text-white text-sm">{form.active !== false ? 'Active' : 'Hidden'}</span>
          </label>
        </div>
      </div>
      <div>
        <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Description (ZH)</label>
        <textarea value={form.description || ''} onChange={e => set('description', e.target.value)} rows={3} placeholder="產品描述..." className="w-full bg-black/60 border border-yellow-900/50 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-yellow-600 resize-none" />
      </div>
      <div>
        <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Features (one per line)</label>
        <textarea
          value={(form.features || []).join('\n')}
          onChange={e => set('features', e.target.value.split('\n').filter(f => f.trim()))}
          rows={4} placeholder={"AI生成東方紋樣\n優質毛絨面料"} className="w-full bg-black/60 border border-yellow-900/50 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-yellow-600 resize-none font-mono" />
      </div>
      <ImageUpload
        images={form.images}
        onChange={(imgs) => { set('images', imgs); }}
        label="Product Images"
        token={token}
      />
      <div className="flex gap-3 pt-2">
        <button onClick={handleSave} disabled={saving}
          className="flex-1 bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 text-black font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60">
          {saving ? <Loader size={16} className="animate-spin" /> : saved ? <CheckCircle size={16} /> : <Zap size={16} />}
          {saving ? 'Saving & Syncing to GitHub...' : saved ? '✓ Synced to GitHub!' : token ? 'Save & Auto-Deploy' : 'Save Product'}
        </button>
        <button onClick={onCancel} className="px-6 bg-zinc-800 hover:bg-zinc-700 text-gray-300 font-bold py-3 rounded-xl transition-all flex items-center gap-2">
          <X size={16} /> Cancel
        </button>
      </div>
      {!token && (
        <div className="bg-yellow-900/20 border border-yellow-800/40 rounded-xl p-3">
          <p className="text-yellow-400 text-xs font-bold flex items-center gap-1.5"><AlertCircle size={12} /> No GitHub Token configured.</p>
          <p className="text-gray-500 text-[11px] mt-1">Go to <strong>Settings</strong> to add your GitHub PAT to enable auto-deploy.</p>
        </div>
      )}
    </div>
  );
}

// ============================================================
//  GITHUB SETTINGS
// ============================================================
function GitHubSettings({ token, onSave }) {
  const [input, setInput] = useState(token || '');
  const [saved, setSaved] = useState(false);
  const [testStatus, setTestStatus] = useState(null);

  const handleSave = () => {
    onSave(input.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleTest = async () => {
    if (!input) return;
    setTestStatus('testing');
    try {
      const data = await githubGetContent(input, PRODUCTS_PATH);
      setTestStatus({ ok: true, msg: `✓ Connected! File: ${data.name} (SHA: ${data.sha?.slice(0, 8)}...)` });
    } catch (err) {
      setTestStatus({ ok: false, msg: `✗ Error: ${err.message}` });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <GitHubIcon size={18} />
          <h3 className="text-white font-black text-base">GitHub Auto-Deploy Settings</h3>
        </div>
        <p className="text-gray-500 text-xs mb-4 leading-relaxed">
          A <strong className="text-gray-400">GitHub Personal Access Token (PAT)</strong> is required to automatically sync product changes to your repo and trigger Vercel deployment.
          Only needs <code className="bg-black px-1 rounded text-yellow-400">repo</code> scope (or <code className="bg-black px-1 rounded text-yellow-400">public_repo</code> if your repo is public).
        </p>
      </div>
      <div>
        <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">GitHub Personal Access Token</label>
        <input type="password" value={input} onChange={e => setInput(e.target.value)}
          placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
          className="w-full bg-black/60 border border-yellow-900/50 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-yellow-600 font-mono" />
      </div>
      <div className="flex gap-3">
        <button onClick={handleTest} disabled={!input || testStatus === 'testing'}
          className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-all disabled:opacity-50">
          <Globe size={14} /> {testStatus === 'testing' ? 'Testing...' : 'Test Connection'}
        </button>
        <button onClick={handleSave} disabled={!input}
          className="flex-1 bg-gradient-to-r from-green-700 to-green-600 hover:from-green-600 hover:to-green-500 text-white font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50">
          {saved ? <CheckCircle size={14} /> : <Save size={14} />}
          {saved ? 'Saved!' : 'Save Token'}
        </button>
      </div>
      {testStatus && (
        <div className={`rounded-xl px-4 py-2.5 text-xs font-bold ${testStatus === 'testing' ? 'bg-zinc-800 text-gray-400' : testStatus.ok ? 'bg-green-900/40 border border-green-800/50 text-green-400' : 'bg-red-900/40 border border-red-800/50 text-red-400'}`}>
          {typeof testStatus === 'string' ? testStatus : testStatus.msg}
        </div>
      )}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4">
        <p className="text-gray-400 text-xs font-bold mb-2">How to create a GitHub PAT:</p>
        <ol className="text-gray-500 text-[11px] space-y-1 list-decimal list-inside">
          <li>Go to <a href="https://github.com/settings/tokens" target="_blank" rel="noopener" className="text-yellow-400 hover:underline">github.com/settings/tokens</a></li>
          <li>Click <strong className="text-gray-400">Generate new token (classic)</strong></li>
          <li>Set expiration (e.g. 30 days) and enable <strong className="text-gray-400">repo</strong> scope</li>
          <li>Copy the token and paste it above</li>
        </ol>
      </div>
    </div>
  );
}

// ============================================================
//  LOGIN SCREEN
// ============================================================
function LoginScreen({ onLogin }) {
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_auth', '1');
      onLogin();
    } else {
      setError(true); setShaking(true);
      setTimeout(() => setShaking(false), 500);
      setPw('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-black to-yellow-950 flex items-center justify-center p-4">
      <div className={`w-full max-w-sm ${shaking ? 'animate-pulse' : ''}`}>
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🧧</div>
          <h1 className="text-2xl font-black text-white mb-1">CaiShen Admin</h1>
          <p className="text-gray-500 text-sm">AI Fortune Art · Product Management</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-zinc-900/80 border border-yellow-900/40 rounded-2xl p-6">
          <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Password</label>
          <input type="password" value={pw} onChange={e => { setPw(e.target.value); setError(false); }}
            placeholder="Enter admin password..." autoFocus
            className={`w-full bg-black/60 border rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 mb-4 focus:outline-none transition-colors ${error ? 'border-red-500' : 'border-yellow-900/50 focus:border-yellow-600'}`} />
          {error && <p className="text-red-400 text-xs mb-3">Incorrect password. Try again.</p>}
          <button type="submit" className="w-full bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-bold py-3 rounded-xl transition-all">
            Sign In
          </button>
        </form>
        <p className="text-center text-gray-600 text-xs mt-4">blingjew.com · Admin Portal</p>
      </div>
    </div>
  );
}

// ============================================================
//  MAIN ADMIN PANEL
// ============================================================
export default function AdminPanel() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('admin_auth') === '1');
  const [products, setProducts] = useState(() => productsData);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [toast, setToast] = useState(null);
  const [activeTab, setActiveTab] = useState('products');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('gh_token') || '');
  const [deployStatus, setDeployStatus] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSaveToken = (newToken) => {
    if (newToken) { localStorage.setItem('gh_token', newToken); setToken(newToken); }
    else { localStorage.removeItem('gh_token'); setToken(''); }
  };

  // Sync products array to GitHub products.json
  const syncToGitHub = async (updatedProducts, actionLabel) => {
    if (!token) { showToast('No GitHub token. Go to Settings to add your GitHub PAT.', 'error'); return; }
    setDeployStatus({ type: 'loading', msg: 'Fetching current file SHA...' });
    try {
      const currentFile = await githubGetContent(token, PRODUCTS_PATH);
      const newContent = JSON.stringify(updatedProducts, null, 2);
      setDeployStatus({ type: 'loading', msg: `Pushing to GitHub: ${actionLabel}...` });
      await githubPutContent(token, PRODUCTS_PATH, newContent, currentFile.sha, actionLabel);
      setDeployStatus({ type: 'success', msg: '✓ Pushed to GitHub! Vercel auto-deploying in ~1-2 min.', url: 'https://github.com/07cl40-prog/divination-app/actions' });
      showToast(`✓ ${actionLabel} — GitHub updated! Vercel deploying...`, 'success');
    } catch (err) {
      setDeployStatus({ type: 'error', msg: `GitHub Error: ${err.message}` });
      showToast(`GitHub sync failed: ${err.message}`, 'error');
      throw err;
    }
  };

  const handleLogin = () => setAuthed(true);
  const handleLogout = () => { sessionStorage.removeItem('admin_auth'); setAuthed(false); };

  const handleSaveProduct = async (savedProduct) => {
    let updatedProducts;
    setProducts(prev => {
      const existing = prev.find(p => p.id === savedProduct.id);
      if (existing) { updatedProducts = prev.map(p => p.id === savedProduct.id ? savedProduct : p); }
      else { const newId = Math.max(0, ...prev.map(p => p.id)) + 1; updatedProducts = [...prev, { ...savedProduct, id: newId, reviews: savedProduct.reviews || 0 }]; }
      return updatedProducts;
    });
    setEditingProduct(null);
    setIsCreating(false);
    await syncToGitHub(updatedProducts, savedProduct.id ? `Update product: ${savedProduct.name}` : `Add product: ${savedProduct.name}`);
  };

  const handleDelete = async (id) => {
    const product = products.find(p => p.id === id);
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    setDeleteConfirm(null);
    await syncToGitHub(updatedProducts, `Delete product: ${product?.name}`);
  };

  const activeProducts = products.filter(p => p.active !== false);
  const totalRevenue = activeProducts.reduce((s, p) => s + (p.price || 0) * (p.reviews || 0), 0);

  if (!authed) return <LoginScreen onLogin={handleLogin} />;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-[100] px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-2 shadow-2xl ${toast.type === 'success' ? 'bg-green-900/90 border border-green-600 text-green-300' : 'bg-red-900/90 border border-red-600 text-red-300'}`}>
          {toast.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
          {toast.msg}
        </div>
      )}

      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-zinc-900/95 backdrop-blur border-b border-yellow-900/40">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-red-700 to-yellow-600 rounded-xl flex items-center justify-center text-lg">🧧</div>
            <div>
              <div className="text-white font-black text-sm">CaiShen Admin</div>
              <div className="text-yellow-600/60 text-[10px]">blingjew.com · Auto-Deploy</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {deployStatus && (
              <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold ${
                deployStatus.type === 'loading' ? 'bg-yellow-900/40 text-yellow-400' :
                deployStatus.type === 'success' ? 'bg-green-900/40 text-green-400' : 'bg-red-900/40 text-red-400'
              }`}>
                {deployStatus.type === 'loading' && <Loader size={12} className="animate-spin" />}
                {deployStatus.type === 'success' && <CheckCircle size={12} />}
                {deployStatus.type === 'error' && <AlertCircle size={12} />}
                <span className="max-w-[280px] truncate">{deployStatus.msg}</span>
                {deployStatus.url && <a href={deployStatus.url} target="_blank" rel="noopener" className="underline ml-1 opacity-70 hover:opacity-100"><ExternalLink size={10} /></a>}
              </div>
            )}
            <div className="flex gap-1 bg-zinc-800 rounded-lg p-1">
              {[['products', <Package size={14} />, 'Products'], ['settings', <Settings size={14} />, 'Settings']].map(([tab, icon, label]) => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition-all ${activeTab === tab ? 'bg-yellow-600 text-black' : 'text-gray-400 hover:text-white'}`}>
                  {icon} {label}
                </button>
              ))}
            </div>
            <div className="text-right hidden md:block">
              <div className="text-xs text-gray-500">{activeProducts.length} active products</div>
              <div className="text-xs text-yellow-500 font-bold">${totalRevenue.toLocaleString()} potential GMV</div>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-1.5 text-gray-500 hover:text-red-400 text-xs font-bold transition-colors">
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            [products.length, 'Total Products', <Package size={18} />],
            [activeProducts.length, 'Active Listings', <Eye size={18} />],
            [products.filter(p => p.active === false).length, 'Hidden', <EyeOff size={18} />],
            [totalRevenue.toLocaleString(), 'Potential GMV ($)', <ShoppingBag size={18} />],
          ].map(([val, label, icon], i) => (
            <div key={i} className="bg-zinc-900/80 border border-yellow-900/30 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">{label}</span>
                <span className="text-yellow-600/60">{icon}</span>
              </div>
              <div className="text-2xl font-black text-white">{val}</div>
            </div>
          ))}
        </div>

        {/* PRODUCTS TAB */}
        {activeTab === 'products' && (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-black text-white">Product Management</h2>
                <p className="text-xs mt-0.5">
                  {token
                    ? <span className="text-green-500 flex items-center gap-1"><CheckCircle size={11} /> GitHub connected — changes auto-deploy to Vercel</span>
                    : <span className="text-yellow-500 flex items-center gap-1"><AlertCircle size={11} /> No GitHub token — go to Settings to enable auto-deploy</span>
                  }
                </p>
              </div>
              <button onClick={() => {
                setIsCreating(true);
                setEditingProduct({ name: '', nameEn: '', price: 59, originalPrice: 89, tag: '新品', tagColor: 'bg-yellow-600', image: '', images: [], description: '', features: [], rating: 4.8, reviews: 0, badge: '', active: true });
              }}
                className="flex items-center gap-2 bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white text-sm font-bold px-4 py-2 rounded-xl transition-all">
                <Plus size={14} /> Add Product
              </button>
            </div>

            {(isCreating || editingProduct) && (
              <div className="bg-zinc-900/90 border border-yellow-600/50 rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-black text-white flex items-center gap-2">
                    {isCreating ? <><Plus size={16} /> New Product</> : <><Edit2 size={16} /> Editing: {editingProduct?.name || '(new product)'}</>}
                  </h3>
                </div>
                <ProductForm
                  product={editingProduct}
                  onSave={handleSaveProduct}
                  onCancel={() => { setIsCreating(false); setEditingProduct(null); }}
                  token={token}
                  onSetStatus={setDeployStatus}
                />
              </div>
            )}

            {/* Product List */}
            <div className="space-y-3">
              {products.map(product => (
                <div key={product.id} className={`bg-zinc-900/80 border rounded-2xl p-4 flex items-center gap-4 transition-all ${product.active === false ? 'opacity-50 border-zinc-800' : 'border-yellow-900/30 hover:border-yellow-700/50'}`}>
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-zinc-800 shrink-0">
                    <img src={product.images?.[0] || product.image || '/products/product1.jpg'} alt="" className="w-full h-full object-cover" onError={e => e.target.style.display='none'} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      {product.tag && <span className={`${product.tagColor} text-white text-xs font-bold px-2 py-0.5 rounded-full`}>{product.tag}</span>}
                      {product.badge && <span className="bg-gradient-to-r from-yellow-500 to-amber-600 text-black text-xs font-black px-2 py-0.5 rounded-full">{product.badge}</span>}
                      {product.active === false && <span className="bg-zinc-700 text-gray-400 text-xs px-2 py-0.5 rounded-full">Hidden</span>}
                    </div>
                    <div className="text-white font-bold text-sm truncate">{product.name}</div>
                    <div className="text-gray-500 text-xs truncate">{product.nameEn}</div>
                  </div>
                  <div className="text-right shrink-0 hidden sm:block">
                    <div className="text-yellow-400 font-black text-lg">${product.price}</div>
                    {product.originalPrice > product.price && <div className="text-gray-600 text-xs line-through">${product.originalPrice}</div>}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <div className="flex items-center gap-1 text-gray-500 text-xs mr-2 hidden md:flex">
                      <Star size={11} className="fill-yellow-400 text-yellow-400" /> {product.rating || 4.8}
                      <span className="text-gray-600">({product.reviews || 0})</span>
                    </div>
                    <button onClick={() => { setEditingProduct(product); setIsCreating(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="p-2 rounded-lg bg-zinc-800 hover:bg-yellow-600 hover:text-black text-gray-400 transition-all" title="Edit"><Edit2 size={14} /></button>
                    <button onClick={() => setDeleteConfirm(product.id)}
                      className="p-2 rounded-lg bg-zinc-800 hover:bg-red-600 text-gray-400 hover:text-white transition-all" title="Delete"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>

            {deleteConfirm && (
              <div className="fixed inset-0 z-[90] bg-black/80 backdrop-blur flex items-center justify-center p-4">
                <div className="bg-zinc-900 border border-red-900/50 rounded-2xl p-6 max-w-sm w-full">
                  <div className="text-4xl mb-3 text-center">⚠️</div>
                  <h3 className="text-white font-black text-lg text-center mb-2">Delete Product?</h3>
                  <p className="text-gray-400 text-sm text-center mb-5">This will delete the product and push the change to GitHub (auto-deploy).</p>
                  <div className="flex gap-3">
                    <button onClick={() => setDeleteConfirm(null)} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-2.5 rounded-xl transition-all">Cancel</button>
                    <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 bg-red-700 hover:bg-red-600 text-white font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2">
                      <Trash2 size={14} /> Delete & Deploy
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl">
            <div className="bg-zinc-900/80 border border-yellow-900/30 rounded-2xl p-6 mb-6">
              <GitHubSettings token={token} onSave={handleSaveToken} />
            </div>
            <div className="bg-zinc-900/80 border border-yellow-900/30 rounded-2xl p-6">
              <h3 className="text-white font-black text-base mb-3">How Auto-Deploy Works</h3>
              <ol className="space-y-2 text-gray-400 text-xs">
                {[
                  ['Step 1', 'Go to Settings, paste your GitHub PAT, and click "Test Connection" to verify.'],
                  ['Step 2', 'Go to Products → click "Add Product" or the Edit button on any product.'],
                  ['Step 3', 'Fill in details, upload images, and click "Save & Auto-Deploy".'],
                  ['Step 4', 'The system automatically pushes updated products.json to GitHub.'],
                  ['Step 5', 'Vercel detects the new commit and auto-deploys your site in ~1-2 minutes.'],
                ].map(([step, desc]) => (
                  <li key={step} className="flex items-start gap-2">
                    <span className="bg-yellow-600 text-black font-black text-[10px] px-1.5 py-0.5 rounded shrink-0 mt-0.5">{step}</span>
                    <span>{desc}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-gray-500 text-[11px]">💡 Images are embedded as Base64 data URLs in products.json. For large volumes, consider using Cloudinary/ImgBB and storing URLs instead.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
