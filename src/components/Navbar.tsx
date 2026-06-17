import React, { useState } from 'react';
import { UtensilsCrossed, Menu, X, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

interface NavbarProps {
  onNavigate: (section: string) => void;
  activeSection: string;
}

export default function Navbar({ onNavigate, activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'sobre', label: 'Sobre Nós' },
    { id: 'menu', label: 'Cardápio' },
    { id: 'reservar', label: 'Reservas' },
    { id: 'depoimentos', label: 'Histórias d\'Aqui' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-sand-100/90 backdrop-blur-md border-b border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            onClick={() => handleLinkClick('home')} 
            className="flex items-center space-x-3 cursor-pointer group"
            id="nav-logo"
          >
            <div className="p-2 sm:p-2.5 bg-olive-500 text-white organic-border group-hover:opacity-90 smooth-transition">
              <UtensilsCrossed size={18} className="stroke-[1.5]" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tighter text-sand-900 group-hover:text-burnt-500 smooth-transition">
                Raízes
              </span>
              <span className="block text-[9px] font-mono tracking-[0.2em] text-olive-600 uppercase font-semibold leading-none mt-0.5">
                cozinha de afeto
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10" id="desktop-nav">
            <div className="flex space-x-8">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleLinkClick(item.id)}
                    className={`relative text-xs uppercase tracking-widest font-semibold py-2 smooth-transition ${
                      isActive 
                        ? 'text-burnt-500' 
                        : 'text-[#5B5E45] hover:text-burnt-500'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-burnt-500 rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <button
              id="cta-reserve"
              onClick={() => handleLinkClick('reservar')}
              className="flex items-center space-x-2 bg-olive-500 hover:bg-olive-600 text-white px-6 py-2.5 soft-pill text-xs font-semibold uppercase tracking-wider smooth-transition active:scale-95 shadow-md shadow-olive-500/10"
            >
              <Calendar size={14} className="stroke-[2]" />
              <span>Reservar Mesa</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-sand-800 hover:text-burnt-500 hover:bg-sand-200 smooth-transition focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden border-b border-sand-200 bg-sand-100"
          id="mobile-nav-menu"
        >
          <div className="px-2 pt-2 pb-6 space-y-2 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium smooth-transition ${
                  activeSection === item.id
                    ? 'bg-orange-100/50 text-burnt-600 font-semibold'
                    : 'text-sand-800 hover:bg-sand-200/50 hover:text-olive-600'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 px-4">
              <button
                onClick={() => handleLinkClick('reservar')}
                className="w-full flex items-center justify-center space-x-2 bg-olive-600 hover:bg-olive-700 text-sand-100 px-5 py-3 rounded-xl text-base font-medium smooth-transition active:scale-95 shadow-sm"
              >
                <Calendar size={18} />
                <span>Reservar Mesa</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
