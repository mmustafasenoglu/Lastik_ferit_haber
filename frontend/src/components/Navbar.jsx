import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Route değiştiğinde mobil menüyü otomatik kapat
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
  }, [location]);

  return (
    <nav className="w-full bg-[#1a1a2e] text-white px-6 md:px-8 py-5 flex justify-between items-center shadow-lg sticky top-0 z-40 border-b border-white/5">
      <div className="flex items-center gap-2 relative z-50">
        <Link to="/" className="flex items-center gap-4 group">
          {/* F/T Logo */}
          <svg width="64" height="64" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
            <circle cx="50" cy="50" r="46" fill="#1a1a2e" stroke="white" strokeWidth="3"/>
            <text textAnchor="middle" x="28" y="66" fontFamily="Georgia, serif" fontSize="46" fontWeight="bold" fill="white">F</text>
            <text textAnchor="middle" x="50" y="66" fontFamily="Georgia, serif" fontSize="38" fontWeight="400" fill="#c0392b">/</text>
            <text textAnchor="middle" x="73" y="66" fontFamily="Georgia, serif" fontSize="46" fontWeight="bold" fill="white">T</text>
          </svg>
          
          <div className="flex items-center font-serif text-2xl md:text-3xl tracking-[0.1em] font-black text-white uppercase hidden sm:flex">
            <span>FERIT</span>
            <span className="mx-2 text-red-500 font-light">/</span>
            <span>TERCAN</span>
          </div>
        </Link>
      </div>

      {/* Masaüstü Menü */}
      <div className="hidden md:flex gap-8 font-bold tracking-wide text-lg">
        <Link to="/" className="hover:text-red-400 transition-colors uppercase">Ana Sayfa</Link>
        <Link to="/haberler" className="hover:text-red-400 transition-colors uppercase">Haberler</Link>
        <Link to="/hakkimda" className="hover:text-red-400 transition-colors uppercase">Hakkımda</Link>
        <Link to="/iletisim" className="hover:text-red-400 transition-colors uppercase">İletişim</Link>
      </div>

      {/* Hamburger İkonu (Mobil ve Tablet) */}
      <button 
        className="md:hidden flex flex-col items-center justify-center gap-1.5 w-10 h-10 p-2 z-50 focus:outline-none" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menüyü Aç/Kapat"
      >
        <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
        <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></div>
        <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
      </button>

      {/* Mobil Açılır Menü */}
      <div className={`absolute top-full left-0 w-full bg-[#1a1a2e] border-t border-white/10 shadow-2xl md:hidden flex flex-col py-2 px-6 transition-all duration-300 overflow-hidden origin-top ${isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
        <Link to="/" className="py-3 font-bold text-lg uppercase border-b border-white/5 hover:text-red-400 transition text-white">Ana Sayfa</Link>
        <Link to="/haberler" className="py-3 font-bold text-lg uppercase border-b border-white/5 hover:text-red-400 transition text-white">Haberler</Link>
        <Link to="/hakkimda" className="py-3 font-bold text-lg uppercase border-b border-white/5 hover:text-red-400 transition text-white">Hakkımda</Link>
        <Link to="/iletisim" className="py-3 font-bold text-lg uppercase hover:text-red-400 transition text-white">İletişim</Link>
      </div>
    </nav>
  );
};

export default Navbar;
