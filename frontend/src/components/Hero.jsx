import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Hero = () => {
  const [settings, setSettings] = useState({
    profilePhoto: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    name: 'Ferit Tercan',
    bio: 'Merhaba, ben Ferit Tercan. Yenilikçi ve çözüm odaklı ürünler geliştiren bir Full-Stack Geliştiriciyim.',
    bio2: 'Teknoloji dünyasındaki gelişmeleri yakından takip ederek, modern web mimarileri (React, Node.js) üzerinden ölçeklenebilir ve yüksek performanslı uygulamalar üretiyorum.',
    bio3: 'Yazılım geliştirme sürecini sadece kod yazmak olarak değil, kullanıcıya değer katan bir hizmet olarak görüyorum. Bu vizyonla, her projede sürdürülebilirlik, hız ve etkili hikaye anlatımını merkeze koyuyorum.'
  });

  useEffect(() => {
    axios.get('http://localhost:5001/api/settings')
      .then(res => setSettings(res.data))
      .catch(err => console.error('Ayarlar yüklenemedi:', err));
  }, []);

  return (
    <section id="about" className="min-h-[80vh] flex flex-col md:flex-row bg-[#F7F7F7] overflow-hidden">
      {/* Sol Taraf: Metin */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-12 md:px-24 py-16 bg-white z-10 shadow-xl shadow-gray-200/50">
        <h1 className="text-5xl md:text-6xl font-serif text-primary mb-8 tracking-tight uppercase">
          Hakkımda
        </h1>
        <div className="space-y-6 text-lg text-gray-700 leading-relaxed font-sans">
          <p className="font-semibold text-xl text-primary">{settings.bio}</p>
          <p>{settings.bio2}</p>
          <p>{settings.bio3}</p>
        </div>
      </div>
      
      {/* Sağ Taraf: Profil Fotoğrafı */}
      <div className="w-full md:w-1/2 relative bg-secondary flex items-center justify-center p-8">
        <div className="w-full h-full max-w-lg aspect-square rounded-full overflow-hidden shadow-2xl border-8 border-white">
          <img 
            src={settings.profilePhoto} 
            alt={settings.name} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
