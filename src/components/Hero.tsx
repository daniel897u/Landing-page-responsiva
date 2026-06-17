import React from 'react';
import { Sparkles, ArrowRight, Heart, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onExploreMenu: () => void;
  onBookTable: () => void;
}

export default function Hero({ onExploreMenu, onBookTable }: HeroProps) {
  return (
    <section className="relative overflow-hidden py-12 md:py-20 lg:py-24 bg-sand-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text/Poetry Space */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left" id="hero-intro">
            <motion.span 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-burnt-500 uppercase tracking-[0.3em] text-xs font-bold mb-4 block"
            >
              Cozinha de Origem & Afeto
            </motion.span>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.1] text-sand-900 mb-6 font-normal tracking-tight"
              id="hero-title"
            >
              A mesa que<br />
              <span className="italic text-burnt-500 font-normal">nos une.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-base sm:text-lg text-sand-800 leading-relaxed font-sans mb-8 max-w-md"
              id="hero-description"
            >
              Resgatamos a tradição com ingredientes orgânicos locais e cozimento paciente em panelas de barro. Um refúgio contemporâneo feito para celebrar o prazer de estar junto.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 mb-8"
              id="hero-actions"
            >
              <button 
                onClick={onBookTable}
                className="group bg-olive-500 hover:bg-olive-600 text-white px-10 py-4 soft-pill font-semibold text-sm transition duration-200 shadow-lg shadow-olive-500/10 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                id="hero-reserve-btn"
              >
                <span>Reservar Mesa</span>
                <Calendar size={15} />
              </button>
              
              <button 
                onClick={onExploreMenu}
                className="flex items-center justify-center space-x-2 text-sm font-semibold uppercase tracking-wider text-burnt-500 hover:text-burnt-600 border-b-2 border-burnt-500/30 hover:border-burnt-500 pb-1 w-fit transition-all duration-200 cursor-pointer"
                id="hero-menu-btn"
              >
                <span>Ver nosso cardápio</span>
                <ArrowRight size={14} />
              </button>
            </motion.div>

            {/* Micro Details on Slow Living and Trust */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-sand-300 font-sans"
              id="hero-stats"
            >
              <div>
                <span className="block text-xl font-serif text-olive-500 font-semibold italic">100%</span>
                <span className="text-[10px] uppercase tracking-wider text-sand-800 font-semibold">Organico</span>
              </div>
              <div>
                <span className="block text-xl font-serif text-olive-500 font-semibold italic">Lento</span>
                <span className="text-[10px] uppercase tracking-wider text-sand-800 font-semibold">Fogão de Barro</span>
              </div>
              <div>
                <span className="block text-xl font-serif text-olive-500 font-semibold italic">Afeto</span>
                <span className="text-[10px] uppercase tracking-wider text-sand-800 font-semibold">Três Gerações</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Image / Atmosphere Card */}
          <div className="lg:col-span-6 relative flex items-center justify-center" id="hero-visual">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-sand-200 rounded-full -z-0 opacity-40 blur-lg" />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative w-full max-w-lg aspect-square sm:h-[480px] bg-sand-300 soft-pill overflow-hidden shadow-2xl border-4 border-sand-200"
            >
              <div className="relative w-full h-full">
                <img 
                  src="/src/assets/images/rustic_gathering_1781719368412.jpg" 
                  alt="Compartilhando refeições tradicionais entre amigos e família" 
                  className="w-full h-full object-cover hover:scale-103 duration-500 ease-out"
                  referrerPolicy="no-referrer"
                />
                
                {/* Embedded dynamic card conveying realism and human connection */}
                <div className="absolute bottom-6 left-6 right-6 bg-black/30 backdrop-blur-md p-5 rounded-2xl border border-white/25 text-white flex items-center justify-between shadow-sm">
                  <div className="flex items-center space-x-3 text-left">
                    <span className="text-2xl">🍲</span>
                    <div>
                      <p className="font-serif text-sm font-semibold text-white">Aconchego na Mesa</p>
                      <p className="text-[10px] text-sand-100 opacity-90 leading-none">Cozido aromático fervendo agora</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block bg-burnt-500 text-white text-[9px] font-mono px-2 py-0.5 rounded uppercase font-semibold leading-none">
                      Estação
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Absolute badge sticker from Editorial template: "Ingredientes da nossa horta" */}
            <div className="absolute -bottom-4 -left-6 w-36 h-36 sm:w-44 sm:h-44 bg-burnt-500 organic-border flex items-center justify-center p-5 text-white text-center leading-tight shadow-xl shadow-burnt-500/20 transform -rotate-6 z-20">
              <span className="font-serif italic text-sm sm:text-base">Ingredientes frescos da nossa horta</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
