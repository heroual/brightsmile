import React, { useState, useEffect } from 'react';
import { Stethoscope, UserCircle2, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Stethoscope className="h-8 w-8 text-blue-600" />
            <span className={`ml-2 text-xl font-semibold ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}>
              BrightSmile Dentaire
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className={`${
              isScrolled ? 'text-gray-700' : 'text-white'
            } hover:text-blue-600 transition`}>
              Services
            </a>
            <a href="#about" className={`${
              isScrolled ? 'text-gray-700' : 'text-white'
            } hover:text-blue-600 transition`}>
              À Propos
            </a>
            <a href="#team" className={`${
              isScrolled ? 'text-gray-700' : 'text-white'
            } hover:text-blue-600 transition`}>
              Notre Équipe
            </a>
            <a href="#contact" className={`${
              isScrolled ? 'text-gray-700' : 'text-white'
            } hover:text-blue-600 transition`}>
              Contact
            </a>
            <button className="flex items-center space-x-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
              <UserCircle2 className="h-4 w-4" />
              <span>Se Connecter</span>
            </button>
          </div>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
          >
            {isOpen ? (
              <X className={`h-6 w-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white rounded-lg shadow-lg">
            <a
              href="#services"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition"
              onClick={() => setIsOpen(false)}
            >
              Services
            </a>
            <a
              href="#about"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition"
              onClick={() => setIsOpen(false)}
            >
              À Propos
            </a>
            <a
              href="#team"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition"
              onClick={() => setIsOpen(false)}
            >
              Notre Équipe
            </a>
            <a
              href="#contact"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
            <button className="w-full flex items-center justify-center space-x-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
              <UserCircle2 className="h-4 w-4" />
              <span>Se Connecter</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}