import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, Check, UserPlus, Sparkles, Filter } from 'lucide-react';
import { Review } from '../types';
import { motion, AnimatePresence } from 'motion/react';

// Preset reviews reflecting traditional family, comforting, slow meals
const PRESET_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Henrique Guimarães',
    location: 'São Paulo',
    rating: 5,
    comment: 'O Cozido da Terra é indescritível. Tem gosto de infância, da casa da minha avó no interior. A carne se desfaz na boca de tão macia. O ambiente com as oliveiras do lado de fora desacelera qualquer estresse.',
    date: '12 Jun 2026'
  },
  {
    id: 'rev-2',
    name: 'Clara Vasconcellos',
    location: 'Belo Horizonte',
    rating: 5,
    comment: 'Que experiência acolhedora. O atendimento é extremamente humano, sem aquela frieza robótica dos restaurantes modernos da capital. A rabanada com calda de laranja queimada coroou a melhor refeição do meu ano.',
    date: '04 Jun 2026'
  },
  {
    id: 'rev-3',
    name: 'Antônio Prado',
    location: 'Local / Vizinho',
    rating: 5,
    comment: 'Sou morador da região e frequento desde a abertura. Eles mantêm os mesmos produtores locais, os queijos são incríveis e o pão quente com azeite de oliva suave é imperdível.',
    date: '28 Mai 2026'
  }
];

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filterRating, setFilterRating] = useState<number | 'todos'>('todos');

  // Form states
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('raizes_reviews');
      if (stored) {
        setReviews(JSON.parse(stored));
      } else {
        setReviews(PRESET_REVIEWS);
        localStorage.setItem('raizes_reviews', JSON.stringify(PRESET_REVIEWS));
      }
    } catch (e) {
      setReviews(PRESET_REVIEWS);
    }
  }, []);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!name || !comment) {
      setFormError('Por favor, preencha o seu nome e seu depoimento sincero.');
      return;
    }

    const newReview: Review = {
      id: 'rev-' + Math.random().toString(36).substr(2, 9),
      name,
      location: location || 'Visitante',
      rating,
      comment,
      date: 'Hoje',
      isUserAdded: true
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    try {
      localStorage.setItem('raizes_reviews', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }

    // Reset Form
    setName('');
    setLocation('');
    setRating(5);
    setComment('');
    setShowSuccess(true);
    setFormError('');
    
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  const handleClearAddedReviews = () => {
    const isApproved = window.confirm('Queres mesmo restaurar os depoimentos de visitantes originais da casa?');
    if (isApproved) {
      setReviews(PRESET_REVIEWS);
      localStorage.setItem('raizes_reviews', JSON.stringify(PRESET_REVIEWS));
    }
  };

  // Filter reviews
  const displayedReviews = reviews.filter(rev => {
    if (filterRating === 'todos') return true;
    return rev.rating === filterRating;
  });

  return (
    <section id="depoimentos" className="py-20 md:py-28 bg-sand-50 relative">
      <div className="absolute inset-0 bg-[radial-gradient(#8f9779_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-15" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-burnt-500 font-bold block">
            Vozes de Quem Nos Visita
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-normal text-sand-900">
            Histórias d'Além Mesa
          </h2>
          <p className="text-sand-800 font-sans text-sm leading-relaxed">
            Toda refeição deixa um rastro na memória de quem a compartilha. Aqui estão relatos espontâneos deixados em nosso livro de visitas de madeira e convertidos em nossa vitrine digital.
          </p>
        </div>

        {/* Layout Grid: Left Reviews List, Right Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          
          {/* Reviews List & Stats Filter */}
          <div className="lg:col-span-7 space-y-6" id="reviews-display">
            
            {/* Quick Metrics Bar */}
            <div className="bg-sand-100 p-6 rounded-[30px] border border-sand-300 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-left shadow-sm">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">⭐</span>
                <div>
                  <h4 className="font-serif text-base font-bold text-sand-900 font-normal">Média de Satisfação</h4>
                  <p className="text-xs text-sand-800 font-sans">Nota 4.9 de 5 baseada em avaliações autênticas.</p>
                </div>
              </div>
              
              {/* Rating filter controls */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-mono uppercase text-olive-600 font-bold mr-1.5 flex items-center gap-1">
                  <Filter size={12} /> Filtrar:
                </span>
                {['todos', 5, 4].map(val => (
                  <button
                    key={val.toString()}
                    onClick={() => setFilterRating(val as any)}
                    className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition duration-150 cursor-pointer soft-pill ${
                      filterRating === val
                        ? 'bg-olive-500 text-white font-bold shadow-sm'
                        : 'bg-sand-200 text-sand-800 hover:bg-sand-300'
                    }`}
                  >
                    {val === 'todos' ? 'Tudo' : `${val} Estrelas`}
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated Wood/Clay Guestbook posts */}
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {displayedReviews.map((rev) => (
                  <motion.div
                    key={rev.id}
                    layout
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -10 }}
                    className="p-7 bg-sand-100 rounded-[32px] border border-sand-300 text-left relative shadow-sm"
                  >
                    {rev.isUserAdded && (
                      <span className="absolute top-4 right-4 text-[9px] font-mono uppercase bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full font-bold">
                        Seu Depoimento
                      </span>
                    )}

                    <div className="flex items-center gap-1 text-amber-500 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          className={i < rev.rating ? 'fill-amber-550 text-amber-550' : 'text-sand-300'} 
                        />
                      ))}
                    </div>

                    <p className="text-sand-900 text-xs sm:text-sm italic leading-relaxed font-serif pb-5">
                      "{rev.comment}"
                    </p>

                    <div className="flex justify-between items-center border-t border-sand-300 pt-4 text-[11px] font-sans">
                      <div>
                        <span className="font-bold text-sand-900">{rev.name}</span>
                        <span className="text-sand-800 font-medium ml-1.5">• {rev.location}</span>
                      </div>
                      <span className="text-sand-800 font-mono italic">{rev.date}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {displayedReviews.length === 0 && (
                <div className="py-12 bg-sand-200/45 rounded-[32px] text-center text-sand-850 italic text-sm font-serif border border-sand-300">
                  Nenhum depoimento encontrado com a classificação selecionada.
                </div>
              )}
            </div>

            {/* Restore Default button if user added reviews exist */}
            {reviews.some(r => r.isUserAdded) && (
              <div className="text-right">
                <button
                  onClick={handleClearAddedReviews}
                  className="text-xs text-olive-600 hover:text-burnt-500 font-bold uppercase tracking-wider underline cursor-pointer font-sans"
                >
                  Restaurar depoimentos originais
                </button>
              </div>
            )}
          </div>

          {/* Guestbook Form */}
          <div className="lg:col-span-5 bg-sand-100 p-8 sm:p-10 rounded-[40px] border border-sand-300 shadow-xl h-fit text-left">
            <h3 className="font-serif text-lg font-bold text-sand-900 mb-2 flex items-center gap-2">
              <MessageSquare size={18} className="text-burnt-500" />
              Assine Nosso Livro de Visitas
            </h3>
            <p className="text-[12px] text-sand-850 leading-relaxed font-sans mb-6">
              Compartilhe como foi sua experiência em nossa casa para inspirar outras pessoas a nos visitarem.
            </p>

            <AnimatePresence>
              {formError && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="mb-4 p-3.5 bg-burnt-100/55 border border-burnt-300 rounded-xl text-xs text-burnt-800 flex items-center gap-2 font-sans font-semibold text-left"
                >
                  <span>⚠️ {formError}</span>
                </motion.div>
              )}

              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="mb-4 p-3.5 bg-emerald-100/60 border border-emerald-300 rounded-xl text-xs text-emerald-800 flex items-center gap-2 font-sans font-bold text-left"
                >
                  <Check size={14} className="stroke-[3]" />
                  <span>Muito obrigado! Seu depoimento foi afixado com carinho no livro.</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmitReview} className="space-y-5 font-sans text-sand-900 text-xs sm:text-sm">
              {/* Estrelas */}
              <div className="flex flex-col space-y-2">
                <span className="text-xs font-bold text-olive-650 uppercase tracking-widest font-mono">
                  Sua Classificação *
                </span>
                <div className="flex items-center gap-2 pt-1">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const starVal = i + 1;
                    const isLit = hoveredStar !== null ? starVal <= hoveredStar : starVal <= rating;
                    return (
                      <button
                        type="button"
                        key={starVal}
                        onClick={() => setRating(starVal)}
                        onMouseEnter={() => setHoveredStar(starVal)}
                        onMouseLeave={() => setHoveredStar(null)}
                        className="cursor-pointer focus:outline-none focus:scale-110 duration-100"
                        title={`${starVal} estrelas`}
                      >
                        <Star 
                          size={24} 
                          className={`transition ${isLit ? 'fill-amber-500 text-amber-500' : 'text-sand-300'}`} 
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Nome */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="revName" className="text-xs font-bold text-olive-650 uppercase tracking-widest font-mono">
                  Seu Nome *
                </label>
                <input
                  type="text"
                  id="revName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Clara Ribeiro"
                  required
                  className="bg-sand-200 border border-sand-300 rounded-[14px] px-4 py-3.5 text-xs font-semibold focus:outline-none focus:border-olive-500 focus:bg-white text-sand-900 placeholder-sand-800 smooth-transition"
                />
              </div>

              {/* Cidade / Origem */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="revLocation" className="text-xs font-bold text-olive-650 uppercase tracking-widest font-mono">
                  Cidade ou Origem
                </label>
                <input
                  type="text"
                  id="revLocation"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Ex: São Paulo / SP"
                  className="bg-sand-200 border border-sand-300 rounded-[14px] px-4 py-3.5 text-xs font-semibold focus:outline-none focus:border-olive-500 focus:bg-white text-sand-900 placeholder-sand-800 smooth-transition"
                />
              </div>

              {/* Comentário */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="revComment" className="text-xs font-bold text-olive-650 uppercase tracking-widest font-mono">
                  Seu Relato Sincero *
                </label>
                <textarea
                  id="revComment"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Descreva o sabor que sentiu, o prato que escolheu ou o ambiente..."
                  required
                  className="bg-sand-200 border border-sand-300 rounded-[14px] px-4 py-3.5 text-xs font-semibold focus:outline-none focus:border-olive-500 focus:bg-white text-sand-900 placeholder-sand-800 resize-none smooth-transition"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-olive-500 hover:bg-olive-600 text-white font-bold py-4 px-4 soft-pill smooth-transition text-xs uppercase tracking-wider cursor-pointer shadow-lg shadow-olive-500/15"
              >
                Afixar no Livro de Visitas
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
