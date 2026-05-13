import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NewsSection = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Backend API'den verileri çekeriz.
    // Şimdilik default port: 5000 kabul ediliyor
    axios.get('/api/news')
      .then(res => {
        // En son 3 haberi al
        setNews(res.data.slice(0, 3));
      })
      .catch(err => console.error("Haberler çekilemedi:", err));
  }, []);

  const stripHtml = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  return (
    <section id="news" className="py-24 px-8 md:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-serif text-primary mb-12 text-center uppercase tracking-wider">Son Haberler & Yazılar</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {news.map((item) => (
            <div key={item.id} className="bg-gray-50 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-contain" />
              </div>
              <div className="p-8">
                <div className="text-xs text-accent font-bold mb-3 tracking-widest uppercase">
                  {new Date(item.date).toLocaleDateString('tr-TR')}
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4 leading-tight">{item.title}</h3>
                <p className="text-gray-600 line-clamp-3">
                  {stripHtml(item.content)}
                </p>
                <div className="mt-6">
                  <button className="text-primary font-bold text-sm uppercase tracking-wider hover:text-blue-700 transition">Devamını Oku &rarr;</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
