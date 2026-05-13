import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useDocumentTitle from '../hooks/useDocumentTitle';

const News = () => {
  useDocumentTitle('Haberler');
  const [news, setNews] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Tümü');

  useEffect(() => {
    axios.get('/api/news')
      .then(res => setNews(res.data))
      .catch(err => console.error("Haberler çekilemedi:", err));
  }, []);

  const categories = ['Tümü', ...new Set(news.map(item => item.category || 'Genel'))];
  
  const filteredNews = activeCategory === 'Tümü' 
    ? news 
    : news.filter(item => (item.category || 'Genel') === activeCategory);
    
  const stripHtml = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-12">
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <h1 className="text-4xl md:text-5xl font-serif text-red-600 mb-2 tracking-tight uppercase text-center">
          Haberler
        </h1>
        <p className="text-gray-500 text-center max-w-2xl mx-auto">En güncel yazılarım ve haberler</p>
      </div>

      <div className="bg-white mb-12">
        <div className="max-w-6xl mx-auto flex justify-center gap-4 md:gap-8 overflow-x-auto px-6 py-2 scrollbar-hide border-b border-gray-100">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap font-bold text-base tracking-widest uppercase px-6 py-3 rounded-full transition-all duration-300 ${activeCategory === cat ? 'bg-red-600 text-white shadow-md' : 'text-gray-500 hover:text-red-600 hover:bg-red-50'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div>
          <h3 className="text-2xl font-serif font-bold text-red-600 mb-8 border-l-4 border-accent pl-4 uppercase tracking-wider">
            {activeCategory === 'Tümü' ? 'Tüm Haberler' : `${activeCategory} Haberleri`}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map(item => (
              <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100">
                  <div className="h-48 overflow-hidden relative bg-gray-50 flex items-center justify-center">
                    <span className="absolute top-4 left-4 bg-primary text-white text-xs font-bold uppercase px-3 py-1 rounded shadow-lg z-10">
                      {item.category || 'Genel'}
                    </span>
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-xs text-gray-400 font-bold mb-2">
                    {new Date(item.date).toLocaleDateString('tr-TR')}
                  </div>
                  <h4 className="text-xl font-bold text-primary mb-3 leading-snug">{item.title}</h4>
                  <p className="text-gray-900 font-semibold line-clamp-3 mb-6 flex-grow">{stripHtml(item.content)}</p>
                  <a href={`/haber/${item.id}`} className="text-accent font-bold text-sm uppercase tracking-wider hover:text-blue-800 transition text-left mt-auto block">
                    Devamını Oku &rarr;
                  </a>
                </div>
              </div>
            ))}
            {filteredNews.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-500 text-lg">Bu kategoride henüz haber bulunmuyor.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
