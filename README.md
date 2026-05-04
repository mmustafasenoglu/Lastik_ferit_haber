# 📰 Ferit Tercan — Portfolyo & Haber Sitesi

> Kişisel portfolyo ve içerik yayın platformu. React + Node.js + MongoDB mimarisiyle geliştirilmiş, Vercel ve Render üzerinde çalışan tam-yığın (full-stack) bir web uygulamasıdır.

[![Frontend — Vercel](https://img.shields.io/badge/Frontend-Vercel-black?logo=vercel)](https://lastik-ferit-haber.vercel.app)
[![Backend — Render](https://img.shields.io/badge/Backend-Render-46E3B7?logo=render)](https://render.com)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

---

## 🖥️ Canlı Demo

| Ortam | URL |
|-------|-----|
| 🌐 Frontend | [lastik-ferit-haber.vercel.app](https://lastik-ferit-haber.vercel.app) |
| 🔌 Backend API | Render üzerinde barındırılıyor |

---

## 📋 İçindekiler

- [Proje Hakkında](#-proje-hakkında)
- [Özellikler](#-özellikler)
- [Teknoloji Yığını](#-teknoloji-yığını)
- [Mimari](#-mimari)
- [Kurulum](#-kurulum)
- [Ortam Değişkenleri](#-ortam-değişkenleri)
- [API Referansı](#-api-referansı)
- [Proje Yapısı](#-proje-yapısı)
- [Admin Paneli Kullanımı](#-admin-paneli-kullanımı)
- [Deployment](#-deployment)

---

## 🎯 Proje Hakkında

Bu proje, **Ferit Tercan**'ın kişisel portfolyo ve haber/blog platformudur. Kullanıcılar siteyi ziyaret ederek:

- Ferit'in biyografisini ve profilini inceleyebilir,
- Teknoloji, yazılım, kariyer ve genel kategorilerindeki haberleri okuyabilir,
- İletişim bilgilerine erişebilir.

Admin olarak giriş yapıldığında ise:

- Yeni haberler ekleyip yönetebilir,
- Profil fotoğrafı ve biyografi bilgilerini güncelleyebilir,
- Haberlere ana görsel, görsel alt yazısı ve galeri görselleri ekleyebilir.

---

## ✨ Özellikler

### 👤 Kullanıcı Tarafı
- **Ana Sayfa** — Profil kartı ve son haberler bölümü
- **Haberler** — Kategorize edilmiş haber listesi, tarih sıralı
- **Haber Detay** — Zengin metin içeriği, ana görsel + alt yazı, fotoğraf galerisi
- **Hakkımda** — Dinamik biyografi paragrafları ve profil fotoğrafı
- **İletişim** — İletişim bilgileri sayfası
- **Responsive Tasarım** — Mobil ve masaüstüne tam uyumlu

### 🔐 Admin Paneli
- **Güvenli Giriş** — JWT tabanlı kimlik doğrulama (1 günlük token)
- **Profil Yönetimi** — Drag & Drop destekli fotoğraf yükleme, 4 biyografi paragrafı
- **Haber Yönetimi:**
  - Zengin metin editörü (React Quill — Bold, İtalik, Liste, Link vb.)
  - Ana görsel yükleme (URL veya dosya olarak)
  - Ana görsel alt yazısı
  - Çoklu galeri görseli (maks. 20 görsel)
  - Kategori seçimi: Teknoloji / Yazılım / Kariyer / Genel
- **Haber Silme** — Onay diyaloğu ile güvenli silme
- **Anlık Önizleme** — Yüklenen görselleri formdayken görebilme

### ☁️ Altyapı
- Tüm görseller **Cloudinary**'e yüklenir — sunucuda lokal dosya tutulmaz
- Veriler **MongoDB Atlas**'ta saklanır
- Frontend **Vercel** CDN'i üzerinden sunulur
- Backend **Render**'da çalışır

---

## 🛠️ Teknoloji Yığını

### Frontend
| Paket | Versiyon | Açıklama |
|-------|----------|----------|
| React | 19.x | UI kütüphanesi |
| Vite | 8.x | Build aracı ve geliştirme sunucusu |
| TailwindCSS | 4.x | Utility-first CSS framework |
| React Router DOM | 7.x | Sayfa yönlendirme |
| Axios | 1.x | HTTP istemcisi |
| React Quill New | 3.x | Zengin metin editörü |
| DOMPurify | 3.x | HTML sanitizasyonu (XSS koruması) |

### Backend
| Paket | Versiyon | Açıklama |
|-------|----------|----------|
| Node.js | 18.x | Çalışma ortamı |
| Express | 5.x | Web framework |
| Mongoose | 9.x | MongoDB ODM |
| Cloudinary | 1.x | Görsel depolama servisi |
| Multer | 1.x | Dosya yükleme middleware |
| multer-storage-cloudinary | 4.x | Cloudinary Multer adaptörü |
| JSON Web Token | 9.x | Kimlik doğrulama |
| dotenv | 17.x | Ortam değişkeni yönetimi |
| cors | 2.x | CORS politikası |

---

## 🏗️ Mimari

```
┌─────────────────────────────────┐
│         Kullanıcı / Admin       │
└─────────────┬───────────────────┘
              │ HTTPS
              ▼
┌─────────────────────────────────┐
│    React Frontend (Vercel)      │
│  React Router │ Axios │ Quill   │
└─────────────┬───────────────────┘
              │ REST API (/api/*)
              ▼
┌─────────────────────────────────┐
│  Express Backend (Render)       │
│  JWT Auth │ Multer │ Routes     │
└──────┬──────────────┬───────────┘
       │              │
       ▼              ▼
┌────────────┐  ┌─────────────────┐
│  MongoDB   │  │   Cloudinary    │
│  (Atlas)   │  │  (Görsel CDN)   │
└────────────┘  └─────────────────┘
```

---

## 🚀 Kurulum

### Gereksinimler
- Node.js 18+
- npm 9+
- MongoDB Atlas hesabı
- Cloudinary hesabı

### 1. Repoyu Klonla
```bash
git clone <repo-url>
cd ferit
```

### 2. Backend Kurulumu
```bash
cd backend
npm install
```

`.env` dosyası oluştur (bkz. [Ortam Değişkenleri](#-ortam-değişkenleri)):
```bash
cp .env.example .env
# .env dosyasını düzenle
```

Backend'i başlat:
```bash
npm start
# Sunucu http://localhost:5001 adresinde çalışmaya başlar
```

### 3. Frontend Kurulumu
```bash
cd frontend
npm install
npm run dev
# Uygulama http://localhost:5173 adresinde açılır
```

---

## 🔑 Ortam Değişkenleri

`backend/.env` dosyasına aşağıdaki değişkenleri ekleyin:

```env
# MongoDB Bağlantısı
MONGODB_URI=mongodb+srv://<kullanici>:<sifre>@cluster.mongodb.net/<veritabani>

# JWT Gizli Anahtar
JWT_SECRET=guclu_bir_gizli_anahtar_buraya

# Cloudinary Kimlik Bilgileri
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Sunucu Portu (opsiyonel, varsayılan: 5001)
PORT=5001
```

> **⚠️ Uyarı:** `.env` dosyasını asla versiyon kontrolüne eklemeyin. `.gitignore`'da listelendiğinden emin olun.

---

## 📡 API Referansı

### Kimlik Doğrulama

#### `POST /api/login`
Admin girişi yapar, JWT token döner.

```json
// Request Body
{
  "username": "admin_kullanici_adi",
  "password": "sifre"
}

// Response
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "message": "Giriş başarılı"
}
```

---

### Haberler

| Method | Endpoint | Auth | Açıklama |
|--------|----------|------|----------|
| `GET` | `/api/news` | ❌ | Tüm haberleri getir (yeniden eskiye) |
| `POST` | `/api/news` | ✅ | Yeni haber ekle |
| `DELETE` | `/api/news/:id` | ✅ | Haberi sil |

#### `POST /api/news` — Haber Ekleme
```json
// Headers
Authorization: Bearer <token>

// Request Body
{
  "title": "Haber Başlığı",
  "content": "<p>HTML formatında içerik (Quill çıktısı)</p>",
  "category": "Teknoloji",        // Teknoloji | Yazılım | Kariyer | Genel
  "imageUrl": "https://...",       // Cloudinary URL
  "imageCaption": "Görsel açıklaması",
  "additionalImages": ["https://...", "https://..."]  // Maks 20 adet
}
```

---

### Görsel Yükleme

| Method | Endpoint | Auth | Açıklama |
|--------|----------|------|----------|
| `POST` | `/api/upload/news-image` | ✅ | Ana haber görseli yükle |
| `POST` | `/api/upload/news-gallery` | ✅ | Galeri görselleri yükle (maks 20) |
| `POST` | `/api/upload/profile` | ✅ | Profil fotoğrafı yükle |

Tüm yükleme endpoint'leri `multipart/form-data` formatı bekler.  
Görseller otomatik olarak Cloudinary'e yüklenir; dönen URL doğrudan kullanılabilir.

**Desteklenen formatlar:** `jpg`, `jpeg`, `png`, `webp`

---

### Site Ayarları

| Method | Endpoint | Auth | Açıklama |
|--------|----------|------|----------|
| `GET` | `/api/settings` | ❌ | Profil ayarlarını getir |
| `PUT` | `/api/settings` | ✅ | Profil ayarlarını güncelle |

```json
// PUT /api/settings — Request Body
{
  "profilePhoto": "https://res.cloudinary.com/...",
  "name": "Ferit Tercan",
  "bio": "1. paragraf metni",
  "bio2": "2. paragraf metni",
  "bio3": "3. paragraf metni",
  "bio4": "4. paragraf metni"
}
```

---

## 📁 Proje Yapısı

```
ferit/
├── 📄 package.json          # Root — build scripti (Vercel için)
├── 📄 vercel.json           # Vercel konfigürasyonu
├── 📄 render.yaml           # Render deployment konfigürasyonu
│
├── frontend/                # React uygulaması
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx       # Navigasyon çubuğu
│   │   │   ├── Hero.jsx         # Profil / Hakkımda bileşeni
│   │   │   └── NewsSection.jsx  # Ana sayfadaki haber bölümü
│   │   ├── pages/
│   │   │   ├── Home.jsx         # Ana sayfa
│   │   │   ├── News.jsx         # Haber listesi
│   │   │   ├── NewsDetail.jsx   # Haber detay sayfası
│   │   │   ├── Contact.jsx      # İletişim sayfası
│   │   │   ├── AdminLogin.jsx   # Admin giriş sayfası
│   │   │   └── AdminDashboard.jsx # Yönetim paneli
│   │   ├── App.jsx          # Router ve sayfa tanımları
│   │   └── main.jsx         # Uygulama giriş noktası
│   ├── package.json
│   └── vite.config.js
│
└── backend/                 # Express API sunucusu
    ├── models/
    │   ├── News.js          # Haber Mongoose şeması
    │   └── Settings.js      # Site ayarları Mongoose şeması
    ├── routes/
    │   ├── news.js          # Haber CRUD endpoint'leri
    │   └── settings.js      # Ayar endpoint'leri
    ├── server.js            # Express uygulama giriş noktası
    └── package.json
```

---

## 🖥️ Admin Paneli Kullanımı

Admin paneline `/admin` rotasından ulaşabilirsiniz.

### Giriş
Doğru kullanıcı adı ve şifre ile giriş yapın. Başarılı girişte JWT token tarayıcının `localStorage`'ına kaydedilir ve otomatik olarak `/admin/dashboard`'a yönlendirilirsiniz.

### Profil Ayarları
1. **Profil Fotoğrafı:** Sürükle-bırak veya tıklayarak fotoğraf yükleyin. Görsel anında Cloudinary'e yüklenir.
2. **Biyografi:** 4 ayrı paragraf alanına biyografi metinlerinizi girin.
3. **Kaydet** butonuna basarak değişiklikleri kaydedin.

### Haber Ekleme
1. **Başlık** ve **Kategori** seçin.
2. **Ana Görsel:** Cloudinary'e yüklemek için "⬆️ Yükle" butonunu kullanın veya direkt URL girin.
3. **Görsel Alt Yazısı** (opsiyonel): Röportaj kişisi adı gibi açıklamalar ekleyin.
4. **İçerik:** Zengin metin editörü ile içerik yazın (bold, italic, liste, link desteği).
5. **Galeri:** Birden fazla görsel seçerek içeriğin altına galeri ekleyin (maks. 20 görsel).
6. **Kaydet** ile haberi yayınlayın.

### Haber Silme
Haber listesindeki **Sil** butonuna tıklayın ve onay diyaloğunu onaylayın.

---

## 🚢 Deployment

### Frontend — Vercel

1. GitHub reposunu Vercel'e bağlayın.
2. **Root Directory** olarak `/` (proje kökü) seçin.
3. **Build Command:** `cd frontend && npm install && npm run build`
4. **Output Directory:** `frontend/dist`

Ya da `vercel.json` dosyası otomatik olarak yapılandırmayı sağlar.

### Backend — Render

`render.yaml` dosyası tüm Render yapılandırmasını içerir. Render Dashboard'dan:

1. **New Web Service** → GitHub reposu seçin.
2. `render.yaml` otomatik algılanır.
3. **Environment Variables** bölümünden aşağıdaki değerleri girin:

| Değişken | Açıklama |
|----------|----------|
| `MONGODB_URI` | MongoDB Atlas bağlantı URI'si |
| `JWT_SECRET` | JWT imzalama anahtarı |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud adı |
| `CLOUDINARY_API_KEY` | Cloudinary API anahtarı |
| `CLOUDINARY_API_SECRET` | Cloudinary API gizli anahtarı |

### CORS Yapılandırması

Backend'de CORS için izin verilen origin'ler `server.js`'de tanımlıdır. Yeni bir domain eklerseniz bu listeyi güncellemeyi unutmayın:

```js
// backend/server.js
app.use(cors({
  origin: [
    'https://lastik-ferit-haber.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000'
  ],
  credentials: true
}));
```

---

## 📊 Veri Modelleri

### News (Haber)
```js
{
  title:            String,   // zorunlu
  content:          String,   // zorunlu, HTML (Quill çıktısı)
  category:         String,   // varsayılan: 'Genel'
  imageUrl:         String,   // ana görsel Cloudinary URL
  imageCaption:     String,   // ana görsel alt yazısı
  additionalImages: [String], // galeri görselleri (maks 20)
  date:             Date      // varsayılan: şimdiki zaman
}
```

### Settings (Site Ayarları)
```js
{
  profilePhoto: String, // Cloudinary profil fotoğrafı URL
  name:         String, // Varsayılan: 'Ferit Tercan'
  bio:          String, // 1. biyografi paragrafı
  bio2:         String, // 2. biyografi paragrafı
  bio3:         String, // 3. biyografi paragrafı
  bio4:         String  // 4. biyografi paragrafı
}
```

---

## 🛣️ Sayfa Rotaları

| Rota | Bileşen | Açıklama |
|------|---------|----------|
| `/` | `Home` | Ana sayfa — profil kartı ve son haberler |
| `/haberler` | `News` | Tüm haberlerin listesi |
| `/haber/:id` | `NewsDetail` | Haber detay sayfası |
| `/hakkimda` | `Hero` | Profil ve biyografi |
| `/iletisim` | `Contact` | İletişim sayfası |
| `/admin` | `AdminLogin` | Admin giriş sayfası |
| `/admin/dashboard` | `AdminDashboard` | Yönetim paneli (korumalı) |

---

## 🔒 Güvenlik

- **JWT Authentication:** Tüm veri mutasyonu endpoint'leri (POST, PUT, DELETE) Bearer token doğrulaması gerektirir.
- **Token Süresi:** 1 gün — token süresi dolduğunda yeniden giriş gerekir.
- **XSS Koruması:** Haber içerikleri `DOMPurify` ile sanitize edilerek render edilir.
- **Görsel Validasyonu:** Yalnızca `jpg`, `jpeg`, `png`, `webp` formatları kabul edilir.
- **CORS Kısıtlaması:** Yalnızca izin verilen origin'lerden gelen istekler kabul edilir.

---

## 📝 Lisans

Bu proje [ISC Lisansı](https://opensource.org/licenses/ISC) ile lisanslanmıştır.

---

<div align="center">
  <p>💙 <strong>Ferit Tercan</strong> tarafından geliştirilmiştir.</p>
</div>
