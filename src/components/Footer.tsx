import React from 'react';
import { UtensilsCrossed, Phone, Mail, MapPin, Instagram, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (section: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-sand-900 text-sand-200 pt-16 pb-12 font-sans border-t border-sand-800" id="rodape">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-left pb-12 border-b border-sand-800">
          
          {/* Column 1: Brandt / Philosophy */}
          <div className="space-y-4 md:col-span-1.5" id="footer-roots">
            <div className="flex items-center space-x-3 text-sand-100">
              <div className="p-1.5 bg-olive-500/20 text-olive-400 rounded-full">
                <UtensilsCrossed size={18} className="stroke-[1.5]" />
              </div>
              <span className="font-serif text-2xl font-normal tracking-tight text-white">Raízes</span>
            </div>
            
            <p className="text-xs sm:text-sm text-sand-300 leading-relaxed">
              Resgatando a cozinha caseira cozida lentamente no barro, sustentada por produtores honestos da região. Sem pressa, sem segredos industriais, apenas afeto.
            </p>
            
            <div className="flex items-center space-x-2 text-[10px] font-mono text-sand-400 uppercase tracking-wider">
              <span>Feito com</span>
              <Heart size={10} className="text-burnt-500 fill-burnt-500" />
              <span>em Chácara das Fontes</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4" id="footer-links">
            <h4 className="font-mono text-xs font-bold text-burnt-500 uppercase tracking-[0.2em]">
              Seções
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-sand-300">
              <li>
                <button 
                  onClick={() => onNavigate('sobre')} 
                  className="hover:text-burnt-500 hover:underline smooth-transition cursor-pointer text-left"
                >
                  Nossa História
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('menu')} 
                  className="hover:text-burnt-500 hover:underline smooth-transition cursor-pointer text-left"
                >
                  Nosso Cardápio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('reservar')} 
                  className="hover:text-burnt-500 hover:underline smooth-transition cursor-pointer text-left"
                >
                  Reservas de Mesa
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('depoimentos')} 
                  className="hover:text-burnt-500 hover:underline smooth-transition cursor-pointer text-left"
                >
                  Livro de Visitas
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Hours */}
          <div className="space-y-4" id="footer-hours">
            <h4 className="font-mono text-xs font-bold text-burnt-500 uppercase tracking-[0.2em]">
              Horário do Casarão
            </h4>
            <ul className="space-y-3.5 text-xs sm:text-sm text-sand-300">
              <li className="flex justify-between">
                <span>Quarta a Sábado</span>
                <span className="font-mono text-sand-100 font-bold">12h às 23h</span>
              </li>
              <li className="flex justify-between">
                <span>Domingo</span>
                <span className="font-mono text-sand-100 font-bold">11h30 às 17h</span>
              </li>
              <li className="text-[11px] text-olive-400 italic pt-2 border-t border-sand-800">
                Fechado às Segundas e Terças para manejo da horta familiar.
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Socials */}
          <div className="space-y-4 text-left" id="footer-contact">
            <h4 className="font-mono text-xs font-bold text-burnt-500 uppercase tracking-[0.2em]">
              Fale Conosco
            </h4>
            
            <ul className="space-y-3 text-xs sm:text-sm text-sand-300">
              <li className="flex items-start space-x-3.5">
                <MapPin size={16} className="text-burnt-500 mt-0.5 shrink-0" />
                <span>Casarão dos Oliveiras, Estrada das Videiras, Km 4 - Chácaras das Fontes</span>
              </li>
              <li className="flex items-center space-x-3.5">
                <Phone size={16} className="text-burnt-500 shrink-0" />
                <span className="font-mono">(11) 98765-4321</span>
              </li>
              <li className="flex items-center space-x-3.5">
                <Mail size={16} className="text-burnt-500 shrink-0" />
                <span className="font-mono text-sand-200">casarao@raizesrestaurante.com.br</span>
              </li>
            </ul>

            <div className="pt-2 flex items-center space-x-3">
              <a 
                href="#instagram" 
                className="p-1.5 bg-sand-800 hover:bg-burnt-500 text-sand-300 hover:text-white rounded-md smooth-transition"
                title="Instagram da Família"
              >
                <Instagram size={16} />
              </a>
              <span className="text-xs text-sand-400 font-mono italic">@raizes.cozinhadeafeto</span>
            </div>
          </div>

        </div>

        {/* Outer bottom copyright with absolute simplicity */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sand-400 font-mono">
          <p>© {new Date().getFullYear()} Raízes Restaurante Tradicional. Todos os direitos reservados de culinária e afeto.</p>
          <p className="flex items-center gap-1.5">
            <span>Sustentável & Local</span>
            <span>•</span>
            <span>Estilo Orgânico Contemporâneo</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
