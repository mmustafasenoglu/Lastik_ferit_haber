import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useDocumentTitle from '../hooks/useDocumentTitle';

const Home = () => {
  useDocumentTitle('Ana Sayfa');
  const [news, setNews] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    axios.get('/api/news')
      .then(res => setNews(res.data))
      .catch(err => console.error("Haberler çekilemedi:", err));
  }, []);

  // Slider otomatik geçiş
  useEffect(() => {
    if (news.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % Math.min(news.length, 3));
    }, 5000);
    return () => clearInterval(interval);
  }, [news]);

  const popularNews = news.slice(0, 3); // Son 3 haber slider'da gösterilsin

  const stripHtml = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-12">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* En Üst - Popüler Haber Slider */}
        {popularNews.length > 0 ? (
          <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[400px] md:h-[500px] group">
            {popularNews.map((item, index) => (
              <div 
                key={item.id} 
                className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              >
                <div className="absolute inset-0 bg-black/40 z-10"></div>
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-20 bg-gradient-to-t from-black/90 to-transparent text-white">
                  <span className="bg-accent text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md mb-4 inline-block">
                    {item.category || 'Genel'}
                  </span>
                  <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 leading-tight">{item.title}</h2>
                  <p className="text-gray-200 line-clamp-2 md:w-2/3 text-lg">{stripHtml(item.content)}</p>
                </div>
              </div>
            ))}
            
            {/* Slider Noktaları */}
            <div className="absolute bottom-6 right-6 z-30 flex gap-2">
              {popularNews.map((_, index) => (
                <button 
                  key={index} 
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-accent w-8' : 'bg-white/50'}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500 text-lg">Henüz haber eklenmemiş.</div>
        )}

        {/* Alt Kısım - Son Haberler Grid */}
        {news.length > 0 && (
          <div className="mt-16">
            <div className="flex justify-between items-end mb-8 border-l-4 border-accent pl-4">
              <h3 className="text-2xl font-serif font-bold text-red-600 uppercase tracking-wider m-0 leading-none">
                Son Haberler
              </h3>
              <a href="/haberler" className="text-sm font-bold text-gray-500 hover:text-red-600 transition-colors uppercase tracking-wider">
                Tümünü Gör &rarr;
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularNews.map(item => (
                <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100">
                  <div className="h-48 overflow-hidden relative">
                    <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold uppercase px-3 py-1 rounded shadow-lg z-10">
                      {item.category || 'Genel'}
                    </span>
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="text-xs text-gray-400 font-bold mb-2">
                      {new Date(item.date).toLocaleDateString('tr-TR')}
                    </div>
                    <h4 className="text-xl font-bold text-[#1e3a8a] mb-3 leading-snug hover:text-red-600 transition-colors cursor-pointer">{item.title}</h4>
                    <p className="text-gray-900 font-semibold line-clamp-3 mb-6 flex-grow">{stripHtml(item.content)}</p>
                    <a href={`/haber/${item.id}`} className="text-gray-500 font-bold text-sm uppercase tracking-wider hover:text-red-600 transition text-left mt-auto">
                      Devamını Oku &rarr;
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Home;
