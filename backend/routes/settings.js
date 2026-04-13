const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const settingsPath = path.join(__dirname, '../data/settings.json');
const SECRET_KEY = process.env.JWT_SECRET || 'ferit123supersecret';

const readSettings = () => {
    try {
        return JSON.parse(fs.readFileSync(settingsPath));
    } catch (e) {
        return {};
    }
};

const writeSettings = (data) => {
    fs.writeFileSync(settingsPath, JSON.stringify(data, null, 2));
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

// Ayarları getir (public)
router.get('/', (req, res) => {
    res.json(readSettings());
});

// Ayarları güncelle (korumalı)
router.put('/', verifyToken, (req, res) => {
    const current = readSettings();
    const updated = { ...current, ...req.body };
    writeSettings(updated);
    res.json({ message: 'Ayarlar güncellendi.', data: updated });
});

module.exports = router;
