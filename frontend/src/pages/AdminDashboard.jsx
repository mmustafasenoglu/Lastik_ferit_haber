import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import useDocumentTitle from '../hooks/useDocumentTitle';

const AdminDashboard = () => {
  useDocumentTitle('Yönetim Paneli');
  const [news, setNews] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageCaption, setImageCaption] = useState('');
  const [additionalImages, setAdditionalImages] = useState([]);
  const [category, setCategory] = useState('Sağlık');

  // Yükleme stateleri
  const [newsImageUploading, setNewsImageUploading] = useState(false);
  const [galleryUploading, setGalleryUploading] = useState(false);

  // Düzenleme modal state
  const [editingNews, setEditingNews] = useState(null); // null = kapalı
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editImageUrl, setEditImageUrl] = useState('');
  const [editImageCaption, setEditImageCaption] = useState('');
  const [editCategory, setEditCategory] = useState('Sağlık');
  const [editSaving, setEditSaving] = useState(false);

  // Editör Modları
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const [isEditHtmlMode, setIsEditHtmlMode] = useState(false);

  // Profil ayarları
  const [profilePhoto, setProfilePhoto] = useState('');
  const [bio, setBio] = useState('');
  const [bio2, setBio2] = useState('');
  const [bio3, setBio3] = useState('');
  const [bio4, setBio4] = useState('');
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [photoError, setPhotoError] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) { navigate('/admin'); return; }
    fetchNews();
    fetchSettings();
  }, [token, navigate]);

  const fetchNews = async () => {
    try {
      const res = await axios.get('/api/news');
      setNews(res.data);
    } catch (err) { console.error(err); }
  };

  const fetchSettings = async () => {
    try {
      const res = await axios.get('/api/settings');
      setProfilePhoto(res.data.profilePhoto || '');
      setBio(res.data.bio || '');
      setBio2(res.data.bio2 || '');
      setBio3(res.data.bio3 || '');
      setBio4(res.data.bio4 || '');
    } catch (err) { console.error(err); }
  };

  const handlePhotoUpload = async (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setPhotoError('Sadece görsel dosyası yükleyebilirsiniz.');
      return;
    }
    setPhotoError('');
    setPhotoUploading(true);
    const formData = new FormData();
    formData.append('photo', file);
    try {
      const res = await axios.post('/api/upload/profile', formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      });
      setProfilePhoto(res.data.photoUrl);
      // biyografiyi de kaydet
      await axios.put('/api/settings',
        { profilePhoto: res.data.photoUrl, bio, bio2, bio3, bio4 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSettingsSaved(true);
      setTimeout(() => setSettingsSaved(false), 3000);
    } catch {
      setPhotoError('Yükleme başarısız. Tekrar deneyin.');
    } finally {
      setPhotoUploading(false);
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/settings',
        { profilePhoto, bio, bio2, bio3, bio4 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSettingsSaved(true);
      setTimeout(() => setSettingsSaved(false), 3000);
    } catch (err) { console.error('Ayarlar kaydedilemedi.', err); }
  };

  const handleAddNews = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/news',
        { title, content, imageUrl, imageCaption, additionalImages, category },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle(''); setContent(''); setImageUrl(''); setImageCaption(''); setAdditionalImages([]); setCategory('Sağlık');
      fetchNews();
    } catch (err) { console.error('Haber eklenemedi.', err); }
  };

  const handleNewsImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setNewsImageUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await axios.post('/api/upload/news-image', formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      });
      setImageUrl(res.data.url);
    } catch {
      alert('Ana görsel yüklenemedi.');
    } finally {
      setNewsImageUploading(false);
    }
  };

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    if (files.length > 20) {
      alert('Maksimum 20 görsel yükleyebilirsiniz.');
      return;
    }
    setGalleryUploading(true);
    const formData = new FormData();
    files.forEach(file => formData.append('images', file));
    
    try {
      const res = await axios.post('/api/upload/news-gallery', formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      });
      setAdditionalImages(res.data.urls);
    } catch {
      alert('Galeri görselleri yüklenemedi.');
    } finally {
      setGalleryUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bu haberi silmek istediğinize emin misiniz?')) return;
    try {
      await axios.delete(`/api/news/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchNews();
    } catch (err) { console.error('Silme hatası.', err); }
  };

  const handleEdit = (item) => {
    setEditingNews(item);
    setEditTitle(item.title);
    setEditContent(item.content);
    setEditImageUrl(item.imageUrl || '');
    setEditImageCaption(item.imageCaption || '');
    setEditCategory(item.category || 'Sağlık');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setEditSaving(true);
    try {
      await axios.put(`/api/news/${editingNews.id}`,
        { title: editTitle, content: editContent, imageUrl: editImageUrl, imageCaption: editImageCaption, category: editCategory, additionalImages: editingNews.additionalImages || [] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingNews(null);
      fetchNews();
    } catch (err) { console.error('Güncelleme hatası.', err); }
    finally { setEditSaving(false); }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Üst Bar */}
        <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow">
          <div>
            <h1 className="text-3xl font-bold text-primary">Yönetim Paneli</h1>
            <p className="text-gray-500 text-sm mt-1">Ferit Tercan Portfolyo Sitesi</p>
          </div>
          <button onClick={handleLogout} className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 font-medium transition">
            Çıkış Yap
          </button>
        </div>

        {/* ===== PROFİL AYARLARI ===== */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-3 flex items-center gap-2">
            🖼️ Profil & Biyografi Ayarları
          </h2>
          <form onSubmit={handleSaveSettings} className="space-y-5">
            {/* Fotoğraf Yükleme */}
            <div className="flex flex-col lg:flex-row gap-6 items-start">
              <div className="flex-1">
                <label className="block text-gray-700 text-sm font-bold mb-3">Profil Fotoğrafı</label>

                {/* Drag & Drop Alan */}
                <div
                  className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all
                    ${dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'}`}
                  onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={e => { e.preventDefault(); setDragOver(false); handlePhotoUpload(e.dataTransfer.files[0]); }}
                  onClick={() => document.getElementById('profilePhotoInput').click()}
                >
                  <input
                    id="profilePhotoInput"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => handlePhotoUpload(e.target.files[0])}
                  />
                  {photoUploading ? (
                    <div className="flex flex-col items-center gap-2 py-2">
                      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-blue-600 font-medium text-sm">Yükleniyor...</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 py-2">
                      <span className="text-4xl">📁</span>
                      <p className="text-gray-600 font-medium">Tıkla veya sürükle bırak</p>
                      <p className="text-gray-400 text-xs">PNG, JPG, WEBP — Maks. 5MB</p>
                    </div>
                  )}
                </div>
                {photoError && <p className="text-red-500 text-sm mt-2">{photoError}</p>}
              </div>

              {/* Önizleme */}
              <div className="flex flex-col items-center gap-2 flex-shrink-0">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 shadow">
                  {profilePhoto ? (
                    <img src={profilePhoto} alt="Önizleme" className="w-full h-full object-cover object-top"
                      onError={e => { e.target.src = 'https://via.placeholder.com/128'; }} />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs text-center p-2">Önizleme</div>
                  )}
                </div>
                <span className="text-xs text-gray-400">Mevcut fotoğraf</span>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Biyografi 1. Paragraf</label>
              <textarea className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 h-20" value={bio} onChange={e => setBio(e.target.value)} />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Biyografi 2. Paragraf</label>
              <textarea className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 h-20" value={bio2} onChange={e => setBio2(e.target.value)} />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Biyografi 3. Paragraf</label>
              <textarea className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 h-20" value={bio3} onChange={e => setBio3(e.target.value)} />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Biyografi 4. Paragraf</label>
              <textarea className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 h-20" value={bio4} onChange={e => setBio4(e.target.value)} />
            </div>

            <div className="flex items-center gap-4">
              <button type="submit" className="bg-blue-700 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-800 transition">
                Değişiklikleri Kaydet
              </button>
              {settingsSaved && <span className="text-green-600 font-semibold">✅ Kaydedildi! Sayfayı yenile.</span>}
            </div>
          </form>
        </div>

        {/* ===== HABERLER ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Haber Ekle Formu */}
          <div className="bg-white p-6 rounded-lg shadow lg:col-span-1 h-fit">
            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">📰 Yeni Haber Ekle</h2>
            <form onSubmit={handleAddNews} className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Başlık</label>
                <input type="text" className="w-full p-2 border rounded focus:outline-none focus:border-blue-500" value={title} onChange={e => setTitle(e.target.value)} required />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Kategori</label>
                <select className="w-full p-2 border rounded focus:outline-none focus:border-blue-500" value={category} onChange={e => setCategory(e.target.value)}>
                  <option value="Sağlık">Sağlık</option>
                  <option value="Eğitim">Eğitim</option>
                  <option value="Ekonomi">Ekonomi</option>
                  <option value="Kültür-Sanat">Kültür-Sanat</option>
                  <option value="Röportaj">Röportaj</option>
                  <option value="Yerel Haber">Yerel Haber</option>
                  <option value="Yaşam">Yaşam</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Ana Görsel (URL veya Yükle)</label>
                <div className="flex gap-2 items-center">
                  <input type="text" placeholder="Görsel URL'si girin veya yanda yükleyin" className="w-full p-2 border rounded focus:outline-none focus:border-blue-500" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
                  <label className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded cursor-pointer transition flex-shrink-0 font-bold text-sm flex items-center gap-2">
                    {newsImageUploading ? 'Yükleniyor...' : '⬆️ Yükle'}
                    <input type="file" accept="image/*" className="hidden" onChange={handleNewsImageUpload} />
                  </label>
                </div>
                {imageUrl && <img src={imageUrl} alt="Önizleme" className="mt-2 h-24 object-cover rounded shadow" />}
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Ana Görsel Alt Yazısı (Opsiyonel)</label>
                <input type="text" placeholder="Röportaj yapılan kişinin adı, soyadı vb." className="w-full p-2 border rounded focus:outline-none focus:border-blue-500" value={imageCaption} onChange={e => setImageCaption(e.target.value)} />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="block text-gray-700 text-sm font-bold">İçerik</label>
                  <button
                    type="button"
                    onClick={() => setIsHtmlMode(!isHtmlMode)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-1 rounded border transition"
                  >
                    {isHtmlMode ? '👁️ Görsel Editöre Dön' : '💻 HTML Kodu Yaz'}
                  </button>
                </div>
                
                {isHtmlMode ? (
                  <div className="grid grid-cols-1 gap-4 border rounded-lg overflow-hidden">
                    <div className="bg-[#1e1e2e] p-2">
                      <div className="text-[10px] text-gray-400 uppercase font-bold mb-1 px-1">HTML Kodu</div>
                      <textarea
                        className="w-full h-64 bg-transparent text-gray-300 font-mono text-sm p-2 focus:outline-none resize-none"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        placeholder="<p>Haber içeriği...</p>"
                      />
                    </div>
                    <div className="bg-white border-t p-4 h-64 overflow-y-auto prose prose-sm max-w-none">
                      <div className="text-[10px] text-blue-500 uppercase font-bold mb-2">Canlı Önizleme</div>
                      <div dangerouslySetInnerHTML={{ __html: content }} />
                    </div>
                  </div>
                ) : (
                  <div className="h-64 mb-12">
                    <ReactQuill theme="snow" value={content} onChange={setContent} className="h-full" />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Ekstra Görseller (Maks 20 - Haber İçeriği Altı İçin)</label>
                <label className="block w-full border-2 border-dashed border-gray-300 hover:border-blue-400 bg-gray-50 hover:bg-blue-50 text-center p-4 rounded cursor-pointer transition">
                  <span className="text-gray-600 font-bold text-sm">
                    {galleryUploading ? 'Yükleniyor...' : '🖼️ Birden Fazla Görsel Seç ve Yükle'}
                  </span>
                  <input type="file" accept="image/*" multiple className="hidden" onChange={handleGalleryUpload} />
                </label>
                {additionalImages.length > 0 && (
                  <div className="mt-3 grid grid-cols-4 sm:grid-cols-5 gap-2">
                    {additionalImages.map((img, i) => (
                      <div key={i} className="relative aspect-square">
                        <img src={img} alt="Galeri" className="w-full h-full object-cover rounded shadow-sm border" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
                Kaydet
              </button>
            </form>
          </div>

          {/* Haber Listesi */}
          <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">📋 Mevcut Haberler</h2>
            <div className="space-y-4">
              {news.map(item => (
                <div key={item.id} className="flex justify-between items-center bg-gray-50 p-4 rounded border hover:border-blue-300 transition">
                  <div className="flex items-center gap-4">
                    {item.imageUrl && (
                      <img src={item.imageUrl} alt={item.title} className="w-14 h-14 object-cover rounded-lg" onError={e => { e.target.style.display='none'; }} />
                    )}
                    <div>
                      <h3 className="font-bold text-lg text-primary">{item.title}</h3>
                      <p className="text-sm text-gray-400">{item.category} · {new Date(item.date).toLocaleDateString('tr-TR')}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-800 font-bold px-3 py-1 rounded hover:bg-blue-50 transition">
                      Düzenle
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700 font-bold px-3 py-1 rounded hover:bg-red-50 transition">
                      Sil
                    </button>
                  </div>
                </div>
              ))}
              {news.length === 0 && <p className="text-gray-500 text-center py-8">Henüz haber eklenmemiş.</p>}
            </div>
          </div>
        </div>
      </div>

      {/* ===== DÜZENLEME MODALI ===== */}
      {editingNews && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setEditingNews(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-gray-800">✏️ Haber Düzenle</h2>
              <button onClick={() => setEditingNews(null)} className="text-gray-400 hover:text-gray-700 text-2xl font-bold">×</button>
            </div>
            <form onSubmit={handleUpdate} className="p-6 space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Başlık</label>
                <input type="text" className="w-full p-2 border rounded focus:outline-none focus:border-blue-500" value={editTitle} onChange={e => setEditTitle(e.target.value)} required />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Kategori</label>
                <select className="w-full p-2 border rounded focus:outline-none focus:border-blue-500" value={editCategory} onChange={e => setEditCategory(e.target.value)}>
                  <option value="Sağlık">Sağlık</option>
                  <option value="Eğitim">Eğitim</option>
                  <option value="Ekonomi">Ekonomi</option>
                  <option value="Kültür-Sanat">Kültür-Sanat</option>
                  <option value="Röportaj">Röportaj</option>
                  <option value="Yerel Haber">Yerel Haber</option>
                  <option value="Yaşam">Yaşam</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Ana Görsel URL</label>
                <input type="text" className="w-full p-2 border rounded focus:outline-none focus:border-blue-500" value={editImageUrl} onChange={e => setEditImageUrl(e.target.value)} />
                {editImageUrl && <img src={editImageUrl} alt="Önizleme" className="mt-2 h-24 object-cover rounded shadow" />}
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Görsel Alt Yazısı</label>
                <input type="text" className="w-full p-2 border rounded focus:outline-none focus:border-blue-500" value={editImageCaption} onChange={e => setEditImageCaption(e.target.value)} />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="block text-gray-700 text-sm font-bold">İçerik</label>
                  <button
                    type="button"
                    onClick={() => setIsEditHtmlMode(!isEditHtmlMode)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-1 rounded border transition"
                  >
                    {isEditHtmlMode ? '👁️ Görsel Editöre Dön' : '💻 HTML Kodu Yaz'}
                  </button>
                </div>

                {isEditHtmlMode ? (
                  <div className="flex flex-col border rounded-lg overflow-hidden">
                    <div className="bg-[#1e1e2e] p-2 border-b border-gray-800">
                      <div className="text-[10px] text-gray-400 uppercase font-bold mb-1 px-1">HTML Kodu</div>
                      <textarea
                        className="w-full h-48 bg-transparent text-gray-300 font-mono text-sm p-2 focus:outline-none resize-none"
                        value={editContent}
                        onChange={e => setEditContent(e.target.value)}
                      />
                    </div>
                    <div className="bg-white p-4 h-48 overflow-y-auto prose prose-sm max-w-none">
                      <div className="text-[10px] text-blue-500 uppercase font-bold mb-2">Canlı Önizleme</div>
                      <div dangerouslySetInnerHTML={{ __html: editContent }} />
                    </div>
                  </div>
                ) : (
                  <div className="h-64 mb-12">
                    <ReactQuill theme="snow" value={editContent} onChange={setEditContent} className="h-full" />
                  </div>
                )}
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={editSaving} className="flex-1 bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-60 transition">
                  {editSaving ? 'Kaydediliyor...' : '💾 Kaydet'}
                </button>
                <button type="button" onClick={() => setEditingNews(null)} className="flex-1 bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded hover:bg-gray-300 transition">
                  İptal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
