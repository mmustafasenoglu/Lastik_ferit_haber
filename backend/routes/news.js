const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const dataPath = path.join(__dirname, '../data/news.json');
const SECRET_KEY = process.env.JWT_SECRET || 'ferit123supersecret';

// Veriyi Oku
const readData = () => {
    try {
        const rawData = fs.readFileSync(dataPath);
        return JSON.parse(rawData);
    } catch (error) {
        return [];
    }
};

// Veriyi Yaz
const writeData = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// JWT Middleware
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
router.get('/', (req, res) => {
    const news = readData();
    res.json(news);
});

// Yeni haber ekle
router.post('/', verifyToken, (req, res) => {
    const { title, content, imageUrl } = req.body;
    if (!title || !content) return res.status(400).json({ message: 'Başlık ve içerik zorunludur.' });

    const news = readData();
    const newEntry = {
        id: Date.now().toString(),
        title,
        content,
        imageUrl: imageUrl || 'https://via.placeholder.com/400x250',
        date: new Date().toISOString()
    };
    
    news.unshift(newEntry);
    writeData(news);
    
    res.status(201).json({ message: 'Haber eklendi', data: newEntry });
});

// Haber sil
router.delete('/:id', verifyToken, (req, res) => {
    let news = readData();
    const filteredNews = news.filter(item => item.id !== req.params.id);
    
    if (news.length === filteredNews.length) {
        return res.status(404).json({ message: 'Haber bulunamadı.' });
    }
    
    writeData(filteredNews);
    res.json({ message: 'Haber silindi.' });
});

module.exports = router;
