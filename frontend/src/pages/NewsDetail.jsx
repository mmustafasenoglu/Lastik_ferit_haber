import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import DOMPurify from 'dompurify';
import useDocumentTitle from '../hooks/useDocumentTitle';

const NewsDetail = () => {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useDocumentTitle(newsItem ? newsItem.title : 'Haber Detay');

  useEffect(() => {
    axios.get('/api/news')
      .then(res => {
        const item = res.data.find(n => n.id.toString() === id);
        setNewsItem(item);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center py-20 text-gray-500">Yükleniyor...</div>;
  if (!newsItem) return <div className="text-center py-20 text-red-600 font-bold text-2xl">Haber bulunamadı!</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-12">
      <div className="max-w-4xl mx-auto px-6">
        <Link to="/haberler" className="text-red-600 font-bold uppercase tracking-widest text-sm hover:text-red-800 transition-colors mb-8 inline-block">
          &larr; Tüm Haberlere Dön
        </Link>
        
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          {/* BAŞLIK VE KATEGORİ - Görselin Üstüne Alındı */}
          <div className="p-6 md:p-12 pb-6">
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-red-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md">
                {newsItem.category || 'Genel'}
              </span>
              <span className="text-gray-500 font-medium text-sm md:text-base">
                {new Date(newsItem.date).toLocaleDateString('tr-TR')}
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 leading-tight">
              {newsItem.title}
            </h1>
          </div>

          {/* ANA GÖRSEL */}
          {newsItem.imageUrl && (
              <div className="relative bg-gray-50">
                <img src={newsItem.imageUrl} alt={newsItem.title} className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-contain" />
              {newsItem.imageCaption && (
                <div className="text-center py-2 text-xs md:text-sm text-gray-500 italic bg-gray-50 border-b border-gray-100">
                  {newsItem.imageCaption}
                </div>
              )}
            </div>
          )}
          
          <div className="p-6 md:p-12 pt-8">
            <div 
              className="text-gray-800 text-base md:text-lg leading-relaxed md:leading-loose mb-12 text-justify
                [&_p]:mb-6
                [&_h1]:text-2xl md:[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:text-left
                [&_h2]:text-xl md:[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-4 [&_h2]:text-left
                [&_h3]:text-lg md:[&_h3]:text-xl [&_h3]:font-bold [&_h3]:mb-4 [&_h3]:text-left
                [&_strong]:font-bold [&_strong]:text-black
                [&_a]:text-blue-600 [&_a]:underline
                [&_*]:break-words"
              dangerouslySetInnerHTML={{ 
                __html: DOMPurify.sanitize(
                  newsItem.content
                    .replace(/&nbsp;/g, ' ')
                    .replace(/\u00A0/g, ' '), 
                  { FORBID_TAGS: ['wbr'], ADD_ATTR: ['style', 'class'] }
                ) 
              }}
            />

            {/* Ekstra Görseller (Galeri) */}
            {newsItem.additionalImages && newsItem.additionalImages.length > 0 && (
              <div className="mt-16 pt-8 border-t border-gray-100">
                <h3 className="text-2xl font-serif font-bold text-red-600 mb-6 border-l-4 border-red-600 pl-4 uppercase tracking-wider">
                  Haberden Kareler
                </h3>
                <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
                  {newsItem.additionalImages.map((img, i) => {
                    const url = typeof img === 'object' && img !== null ? img.url : img;
                    const caption = typeof img === 'object' && img !== null ? img.caption : '';
                    return (
                      <div key={i} className="break-inside-avoid flex flex-col gap-2">
                        <a href={url} target="_blank" rel="noreferrer" className="block">
                          <img src={url} alt={`Galeri ${i+1}`} className="w-full h-auto object-contain rounded-lg shadow-sm hover:shadow-md transition-all hover:scale-[1.02] cursor-pointer border border-gray-200 bg-gray-50" />
                        </a>
                        {caption && (
                          <div className="text-sm font-medium text-center text-gray-700 italic border-b border-gray-100 pb-2">
                            {caption}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                {newsItem.galleryCaption && (
                  <div className="mt-6 text-sm text-gray-500 italic text-center bg-gray-50 py-3 rounded-lg">
                    {newsItem.galleryCaption}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
