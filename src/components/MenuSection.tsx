import React, { useState, useMemo } from 'react';
import { MENU_ITEMS } from '../data/menu';
import { MenuItem } from '../types';
import { Search, Sparkles, AlertCircle, RefreshCw, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function MenuSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [activeTag, setActiveTag] = useState<string>('todos');
  
  // Custom Chef Assistant State
  const [moodPref, setMoodPref] = useState<string | null>(null);

  // Categories list
  const categories = [
    { id: 'todos', label: 'Tudo' },
    { id: 'entradas', label: 'Entradas' },
    { id: 'principais', label: 'Principais' },
    { id: 'acompanhamentos', label: 'Guarnições' },
    { id: 'sobremesas', label: 'Sobremesas' }
  ];

  // Derive unique tags from products to provide clean sub-filtering
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    MENU_ITEMS.forEach(item => item.tags.forEach(t => tags.add(t)));
    return ['todos', ...Array.from(tags)];
  }, []);

  // Filter items based on Category, Search term, Sub-tag and Chef Recommendations
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      // 1. Mood recommendations overrides other filters when active to give quick answers
      if (moodPref) {
        if (moodPref === 'aquecer') {
          return item.id === 'principal-1' || item.id === 'entrada-3'; // Cozido and Caldo
        }
        if (moodPref === 'familia') {
          return item.id === 'principal-1' || item.id === 'principal-3' || item.id === 'entrada-2'; // Cozido, Arroz, Bread board
        }
        if (moodPref === 'leve') {
          return item.id === 'principal-4' || item.id === 'entrada-2' || item.id === 'acompanhamento-2'; // Pumpkin, Bread, roasted veg
        }
        if (moodPref === 'doce') {
          return item.category === 'sobremesas';
        }
      }

      // 2. Normal Category filter
      if (selectedCategory !== 'todos' && item.category !== selectedCategory) {
        return false;
      }
      // 3. Sub-tag filter
      if (activeTag !== 'todos' && !item.tags.includes(activeTag)) {
        return false;
      }
      // 4. Search term filter
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        return item.name.toLowerCase().includes(term) || 
               item.description.toLowerCase().includes(term) ||
               item.tags.some(t => t.toLowerCase().includes(term));
      }
      return true;
    });
  }, [selectedCategory, activeTag, searchTerm, moodPref]);

  // Clean filters helper
  const handleClearRecommend = () => {
    setMoodPref(null);
  };

  return (
    <section id="menu" className="py-20 md:py-28 bg-sand-50/50 relative">
      <div className="absolute inset-0 bg-[radial-gradient(#eae1cc_1px,transparent_1px)] [background-size:16px_16px] opacity-35" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header styling */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-olive-500 font-bold block">
            Banquete de Estação
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-normal text-sand-900">
            Nosso Alimento Sincero
          </h2>
          <p className="text-sand-800 font-sans text-sm leading-relaxed">
            Nenhum ingrediente gourmet industrial ou preparo apressado. Cada porção reflete a colheita do dia, cozidos longos, especiarias moídas na hora e o carinho artesanal. Explore e monte sua refeição como desejar.
          </p>
        </div>

        {/* Dynamic Widget: "O que te apetece hoje?" Recommendation Tool */}
        <div className="mb-14 bg-sand-200 border border-sand-300 p-6 sm:p-8 rounded-[40px] shadow-sm max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-sand-300 pb-5 mb-6 text-left">
            <div className="flex items-center space-x-3">
              <span className="p-2.5 bg-burnt-500 text-white rounded-full">
                <Sparkles size={16} className="animate-pulse" />
              </span>
              <div>
                <h3 className="font-serif text-lg font-bold text-sand-900 font-normal">Sugestão Interativa do Cozinheiro</h3>
                <p className="text-xs text-sand-800 font-sans">Conte-nos seu desejo de hoje e sugerimos os pratos perfeitos para o seu momento.</p>
              </div>
            </div>
            {moodPref && (
              <button 
                onClick={handleClearRecommend}
                className="text-xs text-burnt-500 hover:text-burnt-600 font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer smooth-transition"
              >
                <RefreshCw size={12} /> Exibir todo o cardápio
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { id: 'aquecer', icon: '🍲', label: 'Frio ou chuva pedem afeto' },
              { id: 'familia', icon: '🏡', label: 'Família grande para celebrar' },
              { id: 'leve', icon: '🌿', label: 'Quero algo leve e fresco' },
              { id: 'doce', icon: '🍯', label: 'Desejo doce consolador' }
            ].map((mood) => {
              const isActive = moodPref === mood.id;
              return (
                <button
                  key={mood.id}
                  onClick={() => {
                    setMoodPref(isActive ? null : mood.id);
                    // Reset other filters for clean feeling
                    setSelectedCategory('todos');
                    setActiveTag('todos');
                  }}
                  className={`p-4 rounded-[24px] border text-center flex flex-col items-center justify-center space-y-2 cursor-pointer smooth-transition ${
                    isActive 
                      ? 'bg-burnt-500 border-burnt-600 text-white shadow-lg shadow-burnt-500/10'
                      : 'bg-sand-100 border-sand-300 hover:bg-sand-200/50 text-sand-900 hover:border-sand-400'
                  }`}
                >
                  <span className="text-2xl">{mood.icon}</span>
                  <span className="text-xs font-semibold font-sans tracking-tight leading-tight block">{mood.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Regular Search + Filter controls */}
        {!moodPref && (
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10 max-w-6xl mx-auto" id="menu-filters">
            
            {/* Horizontal Categories */}
            <div className="flex flex-wrap items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setActiveTag('todos'); // reset tag
                    }}
                    className={`px-6 py-3 soft-pill text-xs font-bold uppercase tracking-widest whitespace-nowrap cursor-pointer smooth-transition ${
                      isSelected
                        ? 'bg-olive-500 text-white shadow-lg shadow-olive-500/15'
                        : 'bg-sand-200 text-sand-800 hover:bg-sand-300/80 hover:text-sand-900'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Expanded Search Bar */}
            <div className="relative max-w-md w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-sand-800">
                <Search size={15} />
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar ingrediente ou prato..."
                className="w-full bg-sand-200 border border-sand-300 soft-pill py-3 pl-11 pr-5 text-xs font-semibold outline-none focus:border-olive-500 focus:bg-white placeholder-sand-850 text-sand-900 smooth-transition"
              />
            </div>
            
          </div>
        )}

        {/* Tag Filters (Sub-categories) if not in customized recommended mood */}
        {!moodPref && selectedCategory === 'todos' && (
          <div className="flex flex-wrap items-center gap-2 mb-10 max-w-6xl mx-auto justify-start border-t border-sand-300 pt-6">
            <span className="text-xs font-mono text-olive-600 font-bold mr-3 uppercase flex items-center gap-1">
              <Layers size={13} /> Estilo:
            </span>
            {allTags.map((tag) => {
              const isSelected = activeTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`text-[10px] px-3.5 py-1.5 rounded-full cursor-pointer uppercase font-mono tracking-wider font-bold smooth-transition ${
                    isSelected
                      ? 'bg-olive-500 text-white shadow-sm'
                      : 'bg-sand-200 text-sand-800 hover:bg-sand-300/80'
                  }`}
                >
                  {tag === 'todos' ? 'Mostrar Todos' : tag}
                </button>
              );
            })}
          </div>
        )}

        {/* Recommended banner overlay */}
        {moodPref && (
          <div className="max-w-6xl mx-auto mb-8 bg-burnt-50 border border-burnt-100 p-4 rounded-[20px] flex items-center justify-between text-left">
            <p className="text-xs sm:text-sm text-burnt-700 font-medium font-serif italic">
              ✨ Exibindo sugestões do chef para: <span className="font-bold underline not-italic text-burnt-500">"{
                moodPref === 'aquecer' ? 'Frio ou chuva pedem afeto' :
                moodPref === 'familia' ? 'Família grande para celebrar' :
                moodPref === 'leve' ? 'Quero algo leve e fresco' : 'Desejo doce consolador'
              }"</span>
            </p>
            <button 
              onClick={handleClearRecommend}
              className="px-4 py-2 bg-white hover:bg-burnt-100/50 text-burnt-500 text-xs font-bold uppercase tracking-wider rounded-full border border-burnt-200 smooth-transition cursor-pointer"
            >
              Limpar
            </button>
          </div>
        )}

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto" id="menu-grid">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.4 }}
                className="bg-sand-100 hover:bg-white rounded-[32px] p-6 sm:p-7 border border-sand-300 hover:border-sand-400 shadow-md hover:shadow-xl smooth-transition flex flex-col justify-between hover:translate-y-[-4px] group"
              >
                <div>
                  {/* Top line with tags & specialty label */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="bg-olive-500/10 text-olive-700 text-[9px] font-mono uppercase px-2.5 py-1 rounded-full font-bold tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {item.imageUrl && (
                      <span className="bg-burnt-100 text-burnt-500 text-[9px] font-mono uppercase px-2.5 py-1 rounded-full font-bold tracking-wider">
                        Símbolo da Casa
                      </span>
                    )}
                  </div>

                  {/* Layout: Image on top or side if available */}
                  {item.imageUrl && (
                    <div className="mb-5 rounded-[22px] overflow-hidden shadow-sm h-52 relative border border-sand-300">
                      <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-103 duration-500 ease-out"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}

                  {/* Title and Price */}
                  <div className="flex justify-between items-start gap-4">
                    <h4 className="font-serif text-xl font-bold text-sand-900 group-hover:text-burnt-500 smooth-transition">
                      {item.name}
                    </h4>
                    <span className="text-lg font-serif font-bold text-burnt-500 shrink-0">
                      R$ {item.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sand-800 text-xs sm:text-sm mt-3 leading-relaxed font-sans text-left">
                    {item.description}
                  </p>
                </div>

                {/* Allergens and Footer of card */}
                {item.allergens && item.allergens.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-sand-300/60 flex items-center justify-between text-[11px] text-sand-800 font-sans">
                    <span className="flex items-center gap-1.5">
                      <AlertCircle size={13} className="text-burnt-500" />
                      <span>Contém: {item.allergens.join(', ')}</span>
                    </span>
                    <span className="font-serif italic text-olive-500 font-bold">Raízes</span>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Fallback empty view */}
          {filteredItems.length === 0 && (
            <div className="col-span-full py-16 text-center text-sand-800 space-y-4">
              <span className="text-4xl">🥘</span>
              <p className="font-serif text-lg font-medium">Nenhum prato encontrado com essas preferências.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('todos');
                  setActiveTag('todos');
                  setMoodPref(null);
                }}
                className="bg-olive-500 hover:bg-olive-600 text-white px-5 py-2.5 soft-pill text-xs font-semibold uppercase tracking-wider smooth-transition cursor-pointer"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>

        {/* Quality Seal */}
        <div className="mt-20 bg-sand-200 border border-sand-300 rounded-[40px] p-8 sm:p-10 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 justify-between shadow-sm">
          <div className="flex items-center space-x-5 text-left">
            <span className="text-4xl sm:text-5xl">🌿</span>
            <div className="space-y-1">
              <h4 className="font-serif text-xl font-normal text-sand-900">Origem de Verdade</h4>
              <p className="text-xs sm:text-sm text-sand-800 font-sans max-w-xl leading-relaxed">
                O azeite de oliva vem direto de prensa a frio da Mantiqueira, os queijos de leite cru de pequenos produtores cooperados, e nossas ervas frescas são colhidas no nosso quintal todas as manhãs.
              </p>
            </div>
          </div>
          <div className="shrink-0">
            <span className="font-mono text-[9px] font-bold text-olive-500 uppercase bg-sand-100 px-4 py-2 rounded-full border border-sand-300 tracking-wider">
              Alimento Sustentável
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
