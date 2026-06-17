import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StorySection from './components/StorySection';
import MenuSection from './components/MenuSection';
import ReservationForm from './components/ReservationForm';
import ReviewsSection from './components/ReviewsSection';
import Footer from './components/Footer';
import { motion } from 'motion/react';
import { MapPin, Clock, Calendar, Leaf, Compass, Map, HeartHandshake } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  // Unified scroll-to-section helper
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const target = document.getElementById(sectionId);
    if (target) {
      // Offset to account for sticky navbar (approx. 80px)
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const targetRect = target.getBoundingClientRect().top;
      const targetPosition = targetRect - bodyRect;
      const offsetPosition = targetPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Setup intersection observer to dynamically light up navbar items as users scroll
  useEffect(() => {
    const sections = ['sobre', 'menu', 'reservar', 'depoimentos'];
    const observers = sections.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        });
      }, {
        threshold: 0.25, // trigger when 25% of section is visible
        rootMargin: '-80px 0px 0px 0px' // adjust for nav height
      });

      observer.observe(el);
      return { observer, el };
    }).filter(Boolean);

    return () => {
      observers.forEach(obs => {
        if (obs) {
          obs.observer.unobserve(obs.el);
        }
      });
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-sand-100 selection:bg-olive-200 text-sand-900" id="app-container">
      {/* Dynamic Header */}
      <Navbar onNavigate={handleNavigate} activeSection={activeSection} />

      {/* Main Sections */}
      <main className="flex-grow">
        
        {/* 1. Hero & Philosophy */}
        <Hero 
          onExploreMenu={() => handleNavigate('menu')} 
          onBookTable={() => handleNavigate('reservar')} 
        />

        {/* Brand Core Strengths / Values (Warm accents, organic shapes) */}
        <section className="bg-sand-200 border-y border-sand-300 py-16" id="valores-casa">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center items-stretch font-sans">
              
              {/* Strength 1 */}
              <div className="flex flex-col items-center space-y-4 p-6 bg-sand-100 rounded-3xl border border-sand-300/60 shadow-sm smooth-transition hover:translate-y-[-4px]">
                <div className="w-14 h-14 bg-olive-500 text-white organic-border flex items-center justify-center shadow-md shadow-olive-500/10">
                  <Leaf size={24} className="stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-sand-905">Ingredientes Reais</h3>
                  <p className="text-xs sm:text-sm text-sand-800 leading-relaxed mt-2 max-w-xs mx-auto">
                    Cultivados sem pesticidas sintéticos por pequenos produtores agrícolas do cinturão verde regional.
                  </p>
                </div>
              </div>

              {/* Strength 2 */}
              <div className="flex flex-col items-center space-y-4 p-6 bg-sand-100 rounded-3xl border border-sand-300/60 shadow-sm smooth-transition hover:translate-y-[-4px]">
                <div className="w-14 h-14 bg-burnt-500 text-white organic-border flex items-center justify-center shadow-md shadow-burnt-500/10">
                  <Compass size={24} className="stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-sand-905">Espaço de Desacelere</h3>
                  <p className="text-xs sm:text-sm text-sand-800 leading-relaxed mt-2 max-w-xs mx-auto">
                    Nossa única pressa é a de fermentar o pão. Um casarão rodeado de ar fresco, mesas amplas e som de pássaros.
                  </p>
                </div>
              </div>

              {/* Strength 3 */}
              <div className="flex flex-col items-center space-y-4 p-6 bg-sand-100 rounded-3xl border border-sand-300/60 shadow-sm smooth-transition hover:translate-y-[-4px]">
                <div className="w-14 h-14 bg-olive-500 text-white organic-border flex items-center justify-center shadow-md shadow-olive-500/10">
                  <HeartHandshake size={24} className="stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-sand-905">Gente Cuidando de Gente</h3>
                  <p className="text-xs sm:text-sm text-sand-800 leading-relaxed mt-2 max-w-xs mx-auto">
                    Atendimento genuinamente caloroso e humanizado. Aqui você não escolhe por totens ou telas frias.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 2. Story Heritage */}
        <StorySection />

        {/* 3. Interactive Menu Cards & Dynamic Recommender */}
        <MenuSection />

        {/* 4. Table Reservations & receipts */}
        <ReservationForm />

        {/* 5. Guests Stories and Review Submission Form */}
        <ReviewsSection />

        {/* Special Warm Ambiance Location Invite Card (Pre-footer) */}
        <section className="py-20 bg-sand-100 border-t border-sand-300" id="convite-local">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-sand-200 rounded-[40px] border border-sand-300 overflow-hidden shadow-xl grid grid-cols-1 md:grid-cols-12">
              
              {/* Left side details */}
              <div className="p-8 sm:p-12 md:col-span-7 flex flex-col justify-center space-y-6 text-left">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-olive-500 font-bold">
                  Venha nos Visitar
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-normal text-sand-900 leading-tight">
                  Sinta o calor da lenha e o cheiro do alecrim.
                </h3>
                <p className="text-sm text-sand-800 leading-relaxed font-sans">
                  Nosso casarão histórico fica a apenas 25 minutos do centro da cidade, um trajeto verde e sinuoso que já serve para preparar a alma para um ritmo mais leve.
                </p>

                <div className="space-y-4 text-xs sm:text-sm text-sand-900 font-sans border-t border-sand-300/60 pt-4">
                  <div className="flex items-start space-x-3">
                    <MapPin size={18} className="text-burnt-500 shrink-0 mt-0.5" />
                    <span>Estrada das Videiras, Km 4 - Chácaras das Fontes (Ao lado da capela de pedras)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock size={18} className="text-burnt-500 shrink-0" />
                    <span>Quarta a Sábado das 12h às 23h • Domingos das 11h30 às 17h</span>
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    onClick={() => handleNavigate('reservar')}
                    className="inline-flex items-center justify-center bg-olive-500 hover:bg-olive-600 text-white px-8 py-3.5 soft-pill text-xs sm:text-sm font-semibold uppercase tracking-wider smooth-transition active:scale-95 shadow-md shadow-olive-500/10 cursor-pointer"
                  >
                    <span>Fazer Reserva para Este Fim de Semana</span>
                  </button>
                </div>
              </div>

              {/* Right side beautifully styled bespoke vector coordinates map */}
              <div className="bg-sand-100 p-8 md:col-span-5 flex flex-col items-center justify-center relative overflow-hidden border-t md:border-t-0 md:border-l border-sand-300 min-h-[300px]">
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#5b5e45_1px,transparent_1px)] [background-size:12px_12px]" />
                
                {/* Visual coordinate illustration depicting local topography */}
                <div className="relative z-10 w-full max-w-xs bg-white rounded-3xl p-6 border border-sand-300 shadow-xl space-y-4 text-left">
                  
                  <div className="flex items-center space-x-2.5 border-b border-sand-100 pb-2.5">
                    <Map size={18} className="text-olive-500" />
                    <span className="font-serif text-sm font-bold text-sand-900">Mapa das Colinas</span>
                  </div>

                  {/* Topographic line representation */}
                  <div className="h-28 relative rounded-xl bg-sand-50 border border-sand-200 overflow-hidden flex items-center justify-center">
                    
                    {/* Winding road (SVG) */}
                    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <path d="M 10 90 Q 70 80 110 50 T 190 20 T 260 40" fill="none" stroke="#e2e3da" strokeWidth="4" />
                      <path d="M 10 90 Q 70 80 110 50 T 190 20 T 260 40" fill="none" stroke="#cb6633" strokeWidth="2" strokeDasharray="3,3" />
                    </svg>

                    {/* Milestone labels */}
                    <div className="absolute left-6 bottom-4 text-[9px] font-mono text-sand-500 flex flex-col items-center">
                      <span className="text-sm">🛣️</span>
                      <span>Viagem</span>
                    </div>

                    <div className="absolute right-14 top-4 text-[9px] font-mono text-sand-500 flex flex-col items-center">
                      <span className="text-xl animate-bounce">📍</span>
                      <span className="font-bold text-olive-500">Raízes</span>
                    </div>

                    <div className="absolute left-28 top-12 text-[8px] font-mono text-sand-400">
                      <span>Capela de Pedras</span>
                    </div>
                  </div>

                  <p className="text-[10px] text-[#5B5E45] font-mono text-center">
                    Sinal 4G disponível • Acesso pavimentado fácil
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* Footer info/socials */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
