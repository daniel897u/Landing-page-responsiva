import React from 'react';
import { Sparkles, Compass, Heart, Users } from 'lucide-react';
import { motion } from 'motion/react';

export default function StorySection() {
  return (
    <section id="sobre" className="py-20 md:py-28 bg-sand-100 overflow-hidden relative">
      {/* Decorative details simulating real leaf shadow style */}
      <div className="absolute top-10 right-0 w-64 h-64 bg-olive-200/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-burnt-200/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Story Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Photos / Asymmetric Layout Columns */}
          <div className="lg:col-span-6 relative" id="story-visuals">
            <div className="grid grid-cols-2 gap-4">
              
              {/* Photo 1: Cosy Room Ambiance */}
              <div className="space-y-4">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="rounded-[32px] overflow-hidden bg-sand-200 p-2 border border-sand-300 shadow-sm"
                >
                  <img 
                    src="/src/assets/images/warm_ambiance_1781719395167.jpg" 
                    alt="Interior acolhedor do restaurante Raízes" 
                    className="w-full h-56 sm:h-64 object-cover rounded-[24px] hover:scale-102 transition duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <span className="block text-[11px] font-mono text-sand-800 mt-2 text-center italic">
                    Nosso salão banhado a sol
                  </span>
                </motion.div>
                
                {/* Embedded badge */}
                <div className="bg-olive-500 text-white p-6 rounded-[32px] border border-olive-600 space-y-2 hidden sm:block">
                  <span className="text-2xl">🍯</span>
                  <h5 className="font-serif text-sm font-bold">Sem Pressa</h5>
                  <p className="text-[11px] leading-relaxed text-sand-100 opacity-90">
                    Nenhum molho sai pré-pronto. Amassamos os alhos, colhemos o alecrim e assamos tudo no calor correto do carvão vegetal.
                  </p>
                </div>
              </div>

              {/* Photo 2: Traditional Cookware/Stew */}
              <div className="space-y-4 pt-8">
                <div className="bg-sand-200 p-6 rounded-[32px] border border-sand-300 flex flex-col justify-between h-40">
                  <span className="text-burnt-500"><Users size={24} /></span>
                  <div>
                    <h5 className="font-serif text-sm font-bold text-sand-900 leading-tight">Negócio Familiar</h5>
                    <p className="text-[11px] text-sand-800 mt-1">Três gerações de tempero e hospitalidade.</p>
                  </div>
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="rounded-[32px] overflow-hidden bg-sand-200 p-2 border border-sand-300 shadow-sm"
                >
                  <img 
                    src="/src/assets/images/traditional_stew_1781719381334.jpg" 
                    alt="Prato cozido tradicional em tigela de barro" 
                    className="w-full h-48 sm:h-56 object-cover rounded-[24px]"
                    referrerPolicy="no-referrer"
                  />
                  <span className="block text-[11px] font-mono text-sand-500 mt-2 text-center italic">
                    O autêntico cozido da terra
                  </span>
                </motion.div>
              </div>

            </div>
          </div>

          {/* Story Text / Editorial */}
          <div className="lg:col-span-6 space-y-8 text-left" id="story-content">
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-olive-500 font-bold block">
                Nossa Essência
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-normal text-sand-900 leading-tight">
                Um lugar feito de <span className="text-burnt-500 italic block sm:inline">tempo, afeto e lenha</span>
              </h2>
            </div>

            <div className="space-y-6 text-sand-800 font-sans text-sm sm:text-base leading-relaxed">
              <p>
                O <strong>Raízes</strong> não nasceu de um plano corporativo de franquias ou do desejo de seguir tendências gourmet complexas. Nascemos na cozinha de azulejos antigos de nossa avó Clementina, onde o estalar da lenha no fogão de ferro ditava o ritmo de nossas conversas de domingo.
              </p>
              
              <blockquote className="border-l-2 border-burnt-500/60 pl-5 py-1 italic text-sand-900 font-serif text-base sm:text-lg">
                "A comida cura o cansaço do dia se for servida por mãos gentis e temperada sem atalhos."
              </blockquote>

              <p>
                Quando abrimos as portas do nosso casarão, decidimos preservar essa verdade. Aqui, as mesas são de madeira de demolição, sem forros plásticos, projetadas para acomodar cotovelos apoiados e risadas fartas. Oferecemos apenas o que plantamos e aquilo que sabemos preparar com verdade absoluta.
              </p>
            </div>

            {/* Anchors / Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-sand-300 font-sans">
              <div className="flex items-start space-x-3">
                <span className="text-lg p-2 bg-olive-500 text-white organic-border shrink-0">🌿</span>
                <div>
                  <h4 className="font-serif text-sm font-bold text-sand-950">Comércio Justo Local</h4>
                  <p className="text-[11px] text-sand-800">Parcerias com 8 microrregiões próximas de agricultura familiar agrícola.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="text-lg p-2 bg-burnt-500 text-white organic-border shrink-0">🔥</span>
                <div>
                  <h4 className="font-serif text-sm font-bold text-sand-950">Fervura Paciente</h4>
                  <p className="text-[11px] text-sand-800">Nossas panelas de barro nunca aceleram. Cozimentos de até 15 horas.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
