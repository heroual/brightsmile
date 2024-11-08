import React from 'react';
import { Stethoscope, UserCircle2, Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Stethoscope className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-semibold text-gray-900">BrightSmile Dentaire</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-gray-700 hover:text-blue-600 transition">Services</a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition">À Propos</a>
            <a href="#team" className="text-gray-700 hover:text-blue-600 transition">Notre Équipe</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition">Contact</a>
            <button className="flex items-center space-x-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
              <UserCircle2 className="h-4 w-4" />
              <span>Se Connecter</span>
            </button>
          </div>
          
          <div className="md:hidden">
            <Menu className="h-6 w-6 text-gray-700" />
          </div>
        </div>
      </div>
    </nav>
  );
}