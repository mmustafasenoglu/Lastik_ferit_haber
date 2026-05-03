require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

const Settings = require('./models/Settings');
const newsRoutes = require('./routes/news');

const app = express();
app.use(cors({
  origin: [
    'https://lastik-ferit-haber.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000'
  ],
  credentials: true
}));
app.use(express.json());

// JWT Secret
const SECRET_KEY = process.env.JWT_SECRET || 'ferit123supersecret';

// MongoDB Bağlantısı
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI).then(() => console.log('MongoDB veritabanına başarıyla bağlanıldı!'))
    .catch(err => console.error('MongoDB bağlantı hatası:', err));
} else {
  console.log('UYARI: MONGODB_URI .env dosyasında bulunamadı. Veritabanı işlemleri çalışmayacaktır.');
}

// Cloudinary Ayarları
if (process.env.CLOUDINARY_CLOUD_NAME) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  console.log('Cloudinary başarıyla yapılandırıldı!');
} else {
  console.log('UYARI: Cloudinary API bilgileri .env dosyasında bulunamadı. Görsel yüklemeleri çalışmayacaktır.');
}

// Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ferit_haber',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
});

const upload = multer({ storage: storage });

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'Token bulunamadı.' });

  try {
    const decoded = jwt.verify(token.split(' ')[1], SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Geçersiz token.' });
  }
};

// Ana Görsel Yükleme (Artık Cloudinary'e)
app.post('/api/upload/news-image', verifyToken, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Görsel yüklenemedi. (Cloudinary bilgileri eksik olabilir)' });
  }
  res.json({ url: req.file.path, message: 'Görsel başarıyla Cloudinary\'e yüklendi!' });
});

// Profil Fotoğrafı Yükleme (Cloudinary'e)
app.post('/api/upload/profile', verifyToken, upload.single('photo'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Profil fotoğrafı yüklenemedi.' });
  }
  res.json({ photoUrl: req.file.path, message: 'Profil fotoğrafı başarıyla yüklendi!' });
});

// Çoklu Görsel Yükleme (Artık Cloudinary'e)
app.post('/api/upload/news-gallery', verifyToken, upload.array('images', 20), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'Görsel seçilmedi' });
  }
  const urls = req.files.map(file => file.path);
  res.json({ urls, message: 'Galerideki görseller başarıyla Cloudinary\'e yüklendi!' });
});

// Settings GET (MongoDB'den)
app.get('/api/settings', async (req, res) => {
  try {
    if (!process.env.MONGODB_URI) return res.json({ bio: "MongoDB Bağlantısı Bekleniyor..." });
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({
        profilePhoto: 'https://images.unsplash.com/photo-1556157382-97eda2d62296',
        name: 'Ferit Tercan',
        bio: 'Merhaba, ben Ferit Tercan.',
        bio2: '', bio3: '', bio4: ''
      });
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Settings PUT (MongoDB'ye)
app.put('/api/settings', verifyToken, async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings(req.body);
    } else {
      Object.assign(settings, req.body);
    }
    await settings.save();
    res.json({ message: 'Ayarlar güncellendi', data: settings });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Haberler Rotası
app.use('/api/news', newsRoutes);

// Admin Girişi
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'Ferittercan' && password === 'ferit06.06') {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1d' });
    return res.json({ token, message: 'Giriş başarılı' });
  }
  return res.status(401).json({ message: 'Geçersiz kullanıcı adı veya şifre' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Backend sunucusu http://localhost:${PORT} üzerinde çalışıyor.`);
});

module.exports = app;

