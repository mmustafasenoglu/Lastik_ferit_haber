import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="w-full bg-white text-primary px-8 py-6 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-2">
        <div className="font-extrabold text-3xl tracking-tighter">FT</div>
        <div className="font-medium text-xl ml-2 tracking-wide hidden sm:block">Ferit Tercan</div>
      </div>
      <div className="flex gap-6 font-semibold tracking-wide text-sm">
        <a href="#about" className="hover:text-accent transition-colors uppercase">Hakkımda</a>
        <a href="#news" className="hover:text-accent transition-colors uppercase">Haberler</a>
        <a href="#contact" className="hover:text-accent transition-colors uppercase">İletişim</a>
      </div>
    </nav>
  );
};

export default Navbar;
