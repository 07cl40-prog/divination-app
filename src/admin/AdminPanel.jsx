import React, { useState, useEffect, useRef } from 'react';
import {
  Package, Plus, Trash2, Edit2, Eye, EyeOff, Upload, Image, Save,
  X, CheckCircle, AlertCircle, Loader, LogOut, ShoppingBag, Star, ChevronDown
} from 'lucide-react';
import productsData from '../data/products.json';

// Simple auth: hardcoded password
const ADMIN_PASSWORD = 'caishen2026';

const TAG_COLORS = [
  { value: 'bg-red-700', label: 'Red 紅' },
  { value: 'bg-yellow-600', label: 'Yellow 黃' },
  { value: 'bg-purple-800', label: 'Purple 紫' },
  { value: 'bg-amber-700', label: 'Amber 琥珀' },
  { value: 'bg-emerald-700', label: 'Green 綠' },
  { value: 'bg-blue-700', label: 'Blue 藍' },
];

const BADGE_OPTIONS = ['', 'BESTSELLER', 'NEW', 'LIMITED', 'EXCLUSIVE', 'HOT'];

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
      setError(true);
      setShaking(true);
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
          <p className="text-gray-500 text-sm">AI Fortune Art · Admin Panel</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-zinc-900/80 border border-yellow-900/40 rounded-2xl p-6">
          <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">
            Password
          </label>
          <input
            type="password"
            value={pw}
            onChange={e => { setPw(e.target.value); setError(false); }}
            placeholder="Enter admin password..."
            className={`w-full bg-black/60 border rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 mb-4 focus:outline-none transition-colors ${error ? 'border-red-500' : 'border-yellow-900/50 focus:border-yellow-600'}`}
            autoFocus
          />
          {error && <p className="text-red-400 text-xs mb-3">Incorrect password. Try again.</p>}
          <button type="submit" className="w-full bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-bold py-3 rounded-xl transition-all">
            Sign In
          </button>
        </form>
        <p className="text-center text-gray-600 text-xs mt-4">blingjew.com / Admin Portal</p>
      </div>
    </div>
  );
}

function ImageUpload({ images, onChange, label = 'Images' }) {
  const [previews, setPreviews] = useState(images || []);
  const fileInputRef = useRef(null);

  const handleFiles = (files) => {
    const newPreviews = [];
    Array.from(files).forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        alert(`File ${file.name} is too large (max 5MB)`);
        return;
      }
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

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div>
      <div className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">{label}</div>
      <div
        className="border-2 border-dashed border-yellow-900/50 rounded-xl p-4 text-center cursor-pointer hover:border-yellow-600 transition-colors mb-3"
        onClick={() => fileInputRef.current?.click()}
        onDragOver={e => e.preventDefault()}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={e => handleFiles(e.target.files)}
        />
        <Upload size={20} className="mx-auto text-gray-600 mb-2" />
        <p className="text-gray-500 text-xs">Click or drag images here</p>
        <p className="text-gray-600 text-[10px] mt-1">Max 5MB per image · JPG, PNG, WebP</p>
      </div>
      {previews.length > 0 && (
        <div className="grid grid-cols-5 gap-2">
          {previews.map((src, i) => (
            <div key={i} className="relative group aspect-square bg-zinc-900 rounded-lg overflow-hidden border border-yellow-900/30">
              <img src={src} alt="" className="w-full h-full object-cover" />
              {i === 0 && <div className="absolute top-1 left-1 bg-yellow-600 text-black text-[9px] font-black px-1 rounded">MAIN</div>}
              <button
                onClick={() => removeImage(i)}
                className="absolute top-1 right-1 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={10} className="text-white" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProductForm({ product, onSave, onCancel }) {
  const isNew = !product.id;
  const [form, setForm] = useState(product);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 600));
    onSave(form);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const setNum = (k) => (e) => set(k, Number(e.target.value));
  const setBool = (k) => (e) => set(k, e.target.checked);

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
          <input type="number" value={form.originalPrice} onChange={setNum('originalPrice')} min="1" className="w-full bg-black/60 border border-yellow-900/50 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-yellow-600" />
        </div>
        <div>
          <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Rating</label>
          <input type="number" value={form.rating} onChange={setNum('rating')} min="0" max="5" step="0.1" className="w-full bg-black/60 border border-yellow-900/50 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-yellow-600" />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div>
          <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Tag Label</label>
          <input value={form.tag} onChange={e => set('tag', e.target.value)} placeholder="爆款" className="w-full bg-black/60 border border-yellow-900/50 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-yellow-600" />
        </div>
        <div>
          <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Tag Color</label>
          <select value={form.tagColor} onChange={e => set('tagColor', e.target.value)} className="w-full bg-black/60 border border-yellow-900/50 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-yellow-600">
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
            <div className={`w-10 h-6 rounded-full transition-colors ${form.active ? 'bg-yellow-600' : 'bg-zinc-700'}`}
              onClick={() => set('active', !form.active)}>
              <div className={`w-5 h-5 bg-white rounded-full mx-0.5 my-0.5 transition-transform ${form.active ? 'translate-x-4' : ''}`} />
            </div>
            <span className="text-white text-sm">{form.active ? 'Active' : 'Hidden'}</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Description (ZH)</label>
        <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3} placeholder="產品描述..." className="w-full bg-black/60 border border-yellow-900/50 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-yellow-600 resize-none" />
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
        onChange={(imgs) => {
          set('images', imgs);
          if (imgs.length > 0) set('image', imgs[0]);
        }}
        label="Product Images (will be embedded as data URLs)"
      />

      <div className="flex gap-3 pt-2">
        <button onClick={handleSave} disabled={saving} className="flex-1 bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 text-black font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60">
          {saving ? <Loader size={16} className="animate-spin" /> : saved ? <CheckCircle size={16} /> : <Save size={16} />}
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Product'}
        </button>
        <button onClick={onCancel} className="px-6 bg-zinc-800 hover:bg-zinc-700 text-gray-300 font-bold py-3 rounded-xl transition-all flex items-center gap-2">
          <X size={16} /> Cancel
        </button>
      </div>
    </div>
  );
}

export default function AdminPanel() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('admin_auth') === '1');
  const [products, setProducts] = useState(() => productsData);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [exportReady, setExportReady] = useState(false);
  const [toast, setToast] = useState(null);
  const [activeTab, setActiveTab] = useState('products');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogin = () => setAuthed(true);

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    setAuthed(false);
  };

  const handleSaveProduct = (savedProduct) => {
    setProducts(prev => {
      const existing = prev.find(p => p.id === savedProduct.id);
      if (existing) {
        return prev.map(p => p.id === savedProduct.id ? savedProduct : p);
      } else {
        const newId = Math.max(0, ...prev.map(p => p.id)) + 1;
        return [...prev, { ...savedProduct, id: newId, reviews: 0 }];
      }
    });
    setEditingProduct(null);
    setIsCreating(false);
    showToast(savedProduct.id ? 'Product updated!' : 'Product created!');
    setExportReady(true);
  };

  const handleDelete = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setDeleteConfirm(null);
    showToast('Product deleted');
    setExportReady(true);
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(products, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'products.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast('products.json downloaded! Commit this to GitHub to deploy.');
  };

  const activeProducts = products.filter(p => p.active);
  const totalRevenue = activeProducts.reduce((s, p) => s + p.price * p.reviews, 0);

  if (!authed) return <LoginScreen onLogin={handleLogin} />;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-[100] px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-2 shadow-2xl ${toast.type === 'success' ? 'bg-yellow-900/90 border border-yellow-600 text-yellow-300' : 'bg-red-900/90 border border-red-600 text-red-300'}`}>
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
              <div className="text-yellow-600/60 text-[10px]">blingjew.com</div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex gap-1 bg-zinc-800 rounded-lg p-1">
              {[['products', <Package size={14} />, 'Products'], ['images', <Image size={14} />, 'Images']].map(([tab, icon, label]) => (
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
            [products.filter(p => !p.active).length, 'Hidden', <EyeOff size={18} />],
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

        {/* Products Tab */}
        {activeTab === 'products' && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-black text-white">Product Management</h2>
              <div className="flex gap-3">
                {exportReady && (
                  <button onClick={handleExport} className="flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white text-sm font-bold px-4 py-2 rounded-xl transition-all">
                    <Save size={14} /> Export products.json
                  </button>
                )}
                <button onClick={() => { setIsCreating(true); setEditingProduct({ name: '', nameEn: '', price: 59, originalPrice: 89, tag: '新品', tagColor: 'bg-yellow-600', image: '/products/product1.jpg', images: [], description: '', features: [], rating: 4.8, reviews: 0, badge: '', active: true }); }}
                  className="flex items-center gap-2 bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white text-sm font-bold px-4 py-2 rounded-xl transition-all">
                  <Plus size={14} /> Add Product
                </button>
              </div>
            </div>

            {/* Creating / Editing */}
            {isCreating && (
              <div className="bg-zinc-900/90 border border-yellow-600/50 rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-black text-white flex items-center gap-2"><Plus size={16} /> New Product</h3>
                </div>
                <ProductForm product={editingProduct} onSave={handleSaveProduct} onCancel={() => { setIsCreating(false); setEditingProduct(null); }} />
              </div>
            )}

            {editingProduct && !isCreating && (
              <div className="bg-zinc-900/90 border border-yellow-600/50 rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-black text-white flex items-center gap-2"><Edit2 size={16} /> Editing: {editingProduct.name}</h3>
                </div>
                <ProductForm product={editingProduct} onSave={handleSaveProduct} onCancel={() => setEditingProduct(null)} />
              </div>
            )}

            {/* Product List */}
            <div className="space-y-3">
              {products.map(product => (
                <div key={product.id} className={`bg-zinc-900/80 border rounded-2xl p-4 flex items-center gap-4 transition-all ${!product.active ? 'opacity-50 border-zinc-800' : 'border-yellow-900/30 hover:border-yellow-700/50'}`}>
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-zinc-800 shrink-0">
                    <img src={product.images?.[0] || product.image || '/products/product1.jpg'} alt="" className="w-full h-full object-cover" onError={e => e.target.style.display='none'} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`${product.tagColor} text-white text-xs font-bold px-2 py-0.5 rounded-full`}>{product.tag}</span>
                      {product.badge && <span className="bg-gradient-to-r from-yellow-500 to-amber-600 text-black text-xs font-black px-2 py-0.5 rounded-full">{product.badge}</span>}
                      {!product.active && <span className="bg-zinc-700 text-gray-400 text-xs px-2 py-0.5 rounded-full">Hidden</span>}
                    </div>
                    <div className="text-white font-bold text-sm truncate">{product.name}</div>
                    <div className="text-gray-500 text-xs truncate">{product.nameEn}</div>
                  </div>
                  <div className="text-right shrink-0 hidden sm:block">
                    <div className="text-yellow-400 font-black text-lg">${product.price}</div>
                    <div className="text-gray-600 text-xs line-through">${product.originalPrice}</div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <div className="flex items-center gap-1 text-gray-500 text-xs mr-2 hidden md:flex">
                      <Star size={11} className="fill-yellow-400 text-yellow-400" /> {product.rating}
                      <span className="text-gray-600">({product.reviews})</span>
                    </div>
                    <button onClick={() => { setEditingProduct(product); setIsCreating(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="p-2 rounded-lg bg-zinc-800 hover:bg-yellow-600 hover:text-black text-gray-400 transition-all" title="Edit">
                      <Edit2 size={14} />
                    </button>
                    <button onClick={() => setDeleteConfirm(product.id)}
                      className="p-2 rounded-lg bg-zinc-800 hover:bg-red-600 text-gray-400 hover:text-white transition-all" title="Delete">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Delete confirm modal */}
            {deleteConfirm && (
              <div className="fixed inset-0 z-[90] bg-black/80 backdrop-blur flex items-center justify-center p-4">
                <div className="bg-zinc-900 border border-red-900/50 rounded-2xl p-6 max-w-sm w-full">
                  <div className="text-4xl mb-3 text-center">⚠️</div>
                  <h3 className="text-white font-black text-lg text-center mb-2">Delete Product?</h3>
                  <p className="text-gray-400 text-sm text-center mb-5">This action cannot be undone. The product will be permanently removed.</p>
                  <div className="flex gap-3">
                    <button onClick={() => setDeleteConfirm(null)} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-2.5 rounded-xl transition-all">Cancel</button>
                    <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 bg-red-700 hover:bg-red-600 text-white font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2">
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Images Tab */}
        {activeTab === 'images' && (
          <>
            <div className="mb-6">
              <h2 className="text-lg font-black text-white mb-1">Image Gallery</h2>
              <p className="text-gray-500 text-sm">All product images currently uploaded to the server.</p>
            </div>
            <div className="bg-zinc-900/80 border border-yellow-900/30 rounded-2xl p-6">
              <div className="text-sm text-yellow-400 mb-4 flex items-center gap-2">
                <AlertCircle size={14} /> Product images are stored in <code className="bg-black px-2 py-0.5 rounded">public/products/</code>. Upload new images via the form below.
              </div>
              <div className="bg-black/40 border-2 border-dashed border-yellow-900/40 rounded-xl p-8 text-center cursor-pointer hover:border-yellow-600 transition-colors">
                <Upload size={32} className="mx-auto text-gray-600 mb-3" />
                <p className="text-white font-bold mb-1">Upload New Product Image</p>
                <p className="text-gray-500 text-xs mb-3">JPG, PNG, WebP · Max 5MB · Saves to public/products/</p>
                <input type="file" accept="image/*" className="hidden" id="img-upload" />
                <label htmlFor="img-upload" className="inline-flex items-center gap-2 bg-yellow-600 hover:bg-yellow-500 text-black font-bold px-5 py-2 rounded-xl cursor-pointer transition-all text-sm">
                  <Upload size={14} /> Choose Image
                </label>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-3 mt-6">
                {['product1.jpg', 'product2.jpg', 'product3.jpg', 'product4.jpg', 'product5.jpg'].map((name, i) => (
                  <div key={name} className="aspect-square bg-zinc-800 rounded-xl overflow-hidden border border-yellow-900/20 relative group">
                    <img src={`/products/${name}`} alt={name} className="w-full h-full object-cover" onError={e => {
                      e.target.style.display='none';
                      e.target.nextSibling.style.display='flex';
                    }} />
                    <div className="hidden w-full h-full items-center justify-center bg-zinc-800">
                      <span className="text-gray-600 text-xs">No img</span>
                    </div>
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
                      <span className="text-white text-xs font-bold truncate max-w-full px-2">{name}</span>
                      <span className="text-yellow-400 text-[10px]">In products/</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
