const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const News = require('../models/News');

const SECRET_KEY = process.env.JWT_SECRET || 'ferit123supersecret';

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

// Tüm haberleri getir
router.get('/', async (req, res) => {
    try {
        if (!process.env.MONGODB_URI) return res.json([]);
        const news = await News.find().sort({ date: -1 }); // Yeniden eskiye sıralı
        res.json(news);
    } catch (err) {
        res.status(500).json({ message: 'Haberler getirilemedi' });
    }
});

// Yeni haber ekle
router.post('/', verifyToken, async (req, res) => {
    const { title, content, imageUrl, additionalImages, category } = req.body;
    if (!title || !content) return res.status(400).json({ message: 'Başlık ve içerik zorunludur.' });

    try {
        const newEntry = new News({
            title,
            content,
            category: category || 'Genel',
            imageUrl: imageUrl || 'https://via.placeholder.com/400x250',
            additionalImages: additionalImages || []
        });
        
        await newEntry.save();
        res.status(201).json({ message: 'Haber eklendi', id: newEntry.id, data: newEntry });
    } catch (err) {
        res.status(500).json({ message: 'Haber eklenemedi' });
    }
});

// Haber sil
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const result = await News.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Haber bulunamadı.' });
        }
        res.json({ message: 'Haber silindi.' });
    } catch (err) {
        res.status(500).json({ message: 'Silme işlemi başarısız' });
    }
});

module.exports = router;
