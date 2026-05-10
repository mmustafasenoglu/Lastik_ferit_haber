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
          {newsItem.imageUrl && (
            <div className="relative">
              <img src={newsItem.imageUrl} alt={newsItem.title} className="w-full h-[400px] md:h-[500px] object-cover" />
              {newsItem.imageCaption && (
                <div className="text-center py-2 text-sm text-gray-500 italic bg-gray-50 border-b border-gray-100">
                  {newsItem.imageCaption}
                </div>
              )}
            </div>
          )}
          
          <div className="p-8 md:p-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-red-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md">
                {newsItem.category || 'Genel'}
              </span>
              <span className="text-gray-500 font-medium">
                {new Date(newsItem.date).toLocaleDateString('tr-TR')}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-8 leading-tight">
              {newsItem.title}
            </h1>
            
            <div 
              className="prose prose-lg max-w-none text-gray-800 leading-relaxed mb-12 [&_*]:!whitespace-normal
                prose-p:font-medium prose-p:text-gray-800 prose-p:mb-6 
                prose-headings:text-gray-900 prose-headings:font-serif prose-headings:mb-4
                prose-strong:font-bold prose-strong:text-black"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(newsItem.content) }}
            />

            {/* Ekstra Görseller (Galeri) */}
            {newsItem.additionalImages && newsItem.additionalImages.length > 0 && (
              <div className="mt-16 pt-8 border-t border-gray-100">
                <h3 className="text-2xl font-serif font-bold text-red-600 mb-6 border-l-4 border-red-600 pl-4 uppercase tracking-wider">
                  Haberden Kareler
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {newsItem.additionalImages.map((img, i) => (
                    <a href={img} target="_blank" rel="noreferrer" key={i}>
                      <img src={img} alt={`Galeri ${i+1}`} className="w-full aspect-square object-cover rounded-lg shadow-sm hover:shadow-md transition-all hover:scale-105 cursor-pointer border border-gray-200" />
                    </a>
                  ))}
                </div>
                {newsItem.galleryCaption && (
                  <div className="mt-4 text-sm text-gray-500 italic text-center">
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
