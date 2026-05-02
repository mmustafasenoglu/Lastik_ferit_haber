require('dotenv').config();
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;

async function testConnections() {
    console.log('--- BAĞLANTI TESTİ BAŞLIYOR ---');

    // 1. MONGODB TESTİ
    try {
        console.log('MongoDB\'ye bağlanılıyor...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Bağlantısı BAŞARILI!');
        
        // Örnek koleksiyonları listele (bağlantının çalıştığından emin olmak için)
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log(`✅ Veritabanında okuma/yazma erişimi BAŞARILI. (Mevcut koleksiyon sayısı: ${collections.length})`);
    } catch (err) {
        console.error('❌ MongoDB Bağlantı HATASI:', err.message);
    }

    // 2. CLOUDINARY TESTİ
    try {
        console.log('\nCloudinary ayarları kontrol ediliyor...');
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
        
        const result = await cloudinary.api.ping();
        if (result.status === 'ok') {
            console.log('✅ Cloudinary Bağlantısı BAŞARILI!');
        } else {
            console.log('❌ Cloudinary beklenmedik bir yanıt döndürdü:', result);
        }
    } catch (err) {
        console.error('❌ Cloudinary Bağlantı HATASI:', err.message);
    }

    console.log('\n--- BAĞLANTI TESTİ BİTTİ ---');
    process.exit(0);
}

testConnections();
