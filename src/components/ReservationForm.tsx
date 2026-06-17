import React, { useState, useEffect } from 'react';
import { Calendar, Users, MapPin, Clock, Check, AlertCircle, X, Trash2, ShieldCheck } from 'lucide-react';
import { Reservation } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export default function ReservationForm() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '20:00',
    guests: 4,
    area: 'salao_principal' as 'salao_principal' | 'jardim' | 'forno_lenha',
    notes: ''
  });

  const [bookingResponse, setBookingResponse] = useState<Reservation | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Load existing reservations from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('raizes_reservations');
      if (stored) {
        setReservations(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Erro ao ler reservas', e);
    }
  }, []);

  // Save to localStorage helper
  const saveReservations = (updated: Reservation[]) => {
    setReservations(updated);
    try {
      localStorage.setItem('raizes_reservations', JSON.stringify(updated));
    } catch (e) {
      console.error('Erro ao salvar reservas', e);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'guests' ? parseInt(value) || 2 : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Validations
    if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time) {
      setErrorMessage('Por favor, preencha todos os campos obrigatórios em destaque.');
      return;
    }

    const today = new Date();
    const selectedDate = new Date(formData.date);
    today.setHours(0,0,0,0);
    
    // Allow reservation for today or future only
    if (selectedDate < today) {
      setErrorMessage('Selecione uma data de hoje em diante para sua reserva.');
      return;
    }

    // Create Reservation
    const newReservation: Reservation = {
      id: 'res-' + Math.random().toString(36).substr(2, 9),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      date: formData.date,
      time: formData.time,
      guests: formData.guests,
      area: formData.area,
      notes: formData.notes,
      status: 'confirmada', // Instant confirmation for simplicity & trust
      createdAt: new Date().toISOString()
    };

    const updated = [newReservation, ...reservations];
    saveReservations(updated);
    
    // Set booking receipt response to display ticket overlay
    setBookingResponse(newReservation);
    
    // Reset form fields
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '20:00',
      guests: 4,
      area: 'salao_principal',
      notes: ''
    });
  };

  const handleCancelReservation = (id: string) => {
    const isConfirmed = window.confirm('Tem certeza de que deseja cancelar esta reserva para a sua mesa?');
    if (isConfirmed) {
      const updated = reservations.filter(res => res.id !== id);
      saveReservations(updated);
      if (bookingResponse?.id === id) {
        setBookingResponse(null);
      }
    }
  };

  // Convert area slug to human name
  const getAreaName = (area: string) => {
    switch (area) {
      case 'salao_principal': return 'Salão Principal Aconchegante';
      case 'jardim': return 'Jardim Florido de Oliveiras';
      case 'forno_lenha': return 'Próximo ao Forno à Lenha de Barro';
      default: return area;
    }
  };

  return (
    <section id="reservar" className="py-20 md:py-28 bg-sand-200 relative">
      <div className="absolute inset-0 bg-[radial-gradient(#cb6633_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-15" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" id="reservas-section">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-burnt-500 font-bold block">
            Garanta seu Lugar
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-normal text-sand-900">
            Acolhimento à Sua Espera
          </h2>
          <p className="text-sand-800 font-sans text-sm leading-relaxed">
            Reservar um espaço no Raízes é simples e sem burocracias. Não cobramos taxa de reserva. Solicitamos apenas que nos avise com antecedência caso mude de planos, para acolhermos outra família com o mesmo carinho.
          </p>
        </div>

        {/* Dynamic content Grid showing Reservation Form + Active Tickets */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          
          {/* Reservation Forms Column */}
          <div className="lg:col-span-7 bg-sand-100 p-8 sm:p-10 rounded-[40px] border border-sand-300 shadow-xl relative">
            <h3 className="font-serif text-2xl font-bold text-sand-900 mb-8 flex items-center gap-2">
              <Calendar size={20} className="text-burnt-500" />
              Preencha Seus Detalhes
            </h3>

            {errorMessage && (
              <div className="mb-6 p-4 bg-burnt-50 border border-burnt-100 rounded-[20px] text-xs sm:text-sm text-burnt-700 flex items-start gap-2">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 text-left font-sans text-sand-900">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Nome */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="name" className="text-xs font-bold text-olive-650 uppercase tracking-widest font-mono">
                    Seu Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ex: Maria Joana da Silva"
                    required
                    className="bg-sand-200 border border-sand-300 rounded-[14px] px-4 py-3.5 text-xs font-semibold focus:outline-none focus:border-olive-500 focus:bg-white placeholder-sand-800 text-sand-900 smooth-transition"
                  />
                </div>

                {/* Telefone */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="phone" className="text-xs font-bold text-olive-650 uppercase tracking-widest font-mono">
                    Telefone de Contato *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Ex: (11) 98765-4321"
                    required
                    className="bg-sand-200 border border-sand-300 rounded-[14px] px-4 py-3.5 text-xs font-semibold focus:outline-none focus:border-olive-500 focus:bg-white placeholder-sand-800 text-sand-900 smooth-transition"
                  />
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Email */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="email" className="text-xs font-bold text-olive-650 uppercase tracking-widest font-mono">
                    E-mail para Confirmação *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Ex: maria@email.com"
                    required
                    className="bg-sand-200 border border-sand-300 rounded-[14px] px-4 py-3.5 text-xs font-semibold focus:outline-none focus:border-olive-500 focus:bg-white placeholder-sand-800 text-sand-900 smooth-transition"
                  />
                </div>

                {/* Quantidade de Pessoas */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="guests" className="text-xs font-bold text-olive-650 uppercase tracking-widest font-mono">
                    Número de Pessoas *
                  </label>
                  <select
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                    className="bg-sand-200 border border-sand-300 rounded-[14px] px-4 py-3.5 text-xs font-semibold focus:outline-none focus:border-olive-500 focus:bg-white text-sand-900 smooth-transition"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Pessoa' : 'Pessoas'}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Data */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="date" className="text-xs font-bold text-olive-650 uppercase tracking-widest font-mono">
                    Selecione o Dia *
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="bg-sand-200 border border-sand-300 rounded-[14px] px-4 py-3.5 text-xs font-semibold focus:outline-none focus:border-olive-500 focus:bg-white text-sand-900 smooth-transition"
                  />
                </div>

                {/* Horários */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="time" className="text-xs font-bold text-olive-650 uppercase tracking-widest font-mono">
                    Horário Desejado *
                  </label>
                  <select
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="bg-sand-200 border border-sand-300 rounded-[14px] px-4 py-3.5 text-xs font-semibold focus:outline-none focus:border-olive-500 focus:bg-white text-sand-900 smooth-transition"
                  >
                    <optgroup label="Almoço">
                      <option value="12:00">12:00</option>
                      <option value="12:30">12:30</option>
                      <option value="13:00">13:00</option>
                      <option value="13:30">13:30</option>
                      <option value="14:00">14:00</option>
                    </optgroup>
                    <optgroup label="Jantar">
                      <option value="19:00">19:00</option>
                      <option value="19:30">19:30</option>
                      <option value="20:00">20:00</option>
                      <option value="20:30">20:30</option>
                      <option value="21:00">21:00</option>
                      <option value="21:30">21:30</option>
                    </optgroup>
                  </select>
                </div>

              </div>

              {/* Área do Restaurante */}
              <div className="flex flex-col space-y-2">
                <label className="text-xs font-bold text-olive-650 uppercase tracking-widest font-mono">
                  Área Preferida *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'salao_principal', label: 'Salão Principal', detail: 'Quente e musical' },
                    { id: 'jardim', label: 'Jardim de Oliveiras', detail: 'Fresco e romântico' },
                    { id: 'forno_lenha', label: 'Forno de Barro', detail: 'Aromas marcantes' }
                  ].map(opt => (
                    <label
                      key={opt.id}
                      className={`p-3.5 border rounded-[16px] flex flex-col cursor-pointer text-left smooth-transition select-none ${
                        formData.area === opt.id
                          ? 'border-olive-500 bg-olive-500/10 text-olive-900'
                          : 'border-sand-300 bg-sand-200 hover:bg-sand-300/45'
                      }`}
                    >
                      <input
                        type="radio"
                        name="area"
                        value={opt.id}
                        checked={formData.area === opt.id}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <span className="text-xs font-bold leading-tight">{opt.label}</span>
                      <span className="text-[10px] text-sand-800 leading-none mt-1">{opt.detail}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Observações */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="notes" className="text-xs font-bold text-olive-650 uppercase tracking-widest font-mono">
                  Alguma Preferência ou Restrição Alimentar? (Opcional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={2}
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Ex: Levarei um carrinho de bebê, ou preciso de talheres sem glúten..."
                  className="bg-sand-200 border border-sand-300 rounded-[14px] px-4 py-3.5 text-xs font-semibold focus:outline-none focus:border-olive-500 focus:bg-white placeholder-sand-800 text-sand-900 resize-none smooth-transition"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-olive-500 hover:bg-olive-600 text-white py-4 px-4 soft-pill font-bold text-xs sm:text-sm uppercase tracking-wider smooth-transition active:scale-98 shadow-lg shadow-olive-500/15 cursor-pointer"
              >
                Confirmar Minha Reserva Gratuitamente
              </button>

            </form>
          </div>

          {/* Ticket / Active Bookings Column */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-start">
            
            {/* Interactive Section 1: Latest Booking Confirmation Ticket */}
            <AnimatePresence mode="popLayout">
              {bookingResponse ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white border border-sand-300 rounded-[32px] p-6 sm:p-7 shadow-lg relative"
                  id="receipt-ticket"
                >
                  <div className="absolute top-4 right-4 bg-olive-500/10 text-olive-700 px-3 py-1 rounded-full text-[9px] font-mono uppercase font-bold tracking-wider">
                    Mesa Garantida
                  </div>

                  <div className="flex items-center gap-3 border-b border-sand-200 pb-4 mb-4 text-left">
                    <span className="text-3xl">🍲</span>
                    <div>
                      <h4 className="font-serif text-base font-bold text-sand-900">Seu Ticket de Afeto</h4>
                      <p className="text-[11px] text-sand-800">Apresente ao chegar no casarão.</p>
                    </div>
                  </div>

                  <ul className="space-y-3.5 text-left text-xs font-sans text-sand-900">
                    <li className="flex justify-between pb-1.5 border-b border-dashed border-sand-300">
                      <span className="text-sand-800 font-medium">Nome</span>
                      <span className="font-bold text-sand-900">{bookingResponse.name}</span>
                    </li>
                    <li className="flex justify-between pb-1.5 border-b border-dashed border-sand-300">
                      <span className="text-sand-800 font-medium">Data / Hora</span>
                      <span className="font-bold text-sand-900">{bookingResponse.date} às {bookingResponse.time}</span>
                    </li>
                    <li className="flex justify-between pb-1.5 border-b border-dashed border-sand-300">
                      <span className="text-sand-800 font-medium">Lugares</span>
                      <span className="font-bold text-sand-900">{bookingResponse.guests} Pessoas</span>
                    </li>
                    <li className="flex justify-between pb-1.5 border-b border-dashed border-sand-300">
                      <span className="text-sand-800 font-medium">Espaço</span>
                      <span className="font-bold text-sand-900">{getAreaName(bookingResponse.area)}</span>
                    </li>
                    {bookingResponse.notes && (
                      <li className="flex flex-col text-left bg-sand-200 p-3 rounded-[16px] border border-sand-300 mt-2">
                        <span className="text-[9px] text-olive-600 uppercase tracking-widest font-mono font-bold">Nota ao Cozinheiro</span>
                        <span className="text-xs text-sand-900 italic mt-0.5 font-medium">"{bookingResponse.notes}"</span>
                      </li>
                    )}
                  </ul>

                  <div className="mt-5 text-center bg-olive-500/5 p-3.5 rounded-[16px] border border-olive-500/20 flex items-center justify-center gap-2">
                    <ShieldCheck size={16} className="text-olive-500" />
                    <p className="text-[10px] text-olive-800 leading-tight">
                      Um lembrete foi agendado! Aguardamos você com alegria.
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-4">
                    <button 
                      onClick={() => setBookingResponse(null)}
                      className="text-xs font-bold text-olive-500 hover:text-olive-600 uppercase tracking-wider smooth-transition cursor-pointer"
                    >
                      Nova reserva
                    </button>
                    <button 
                      onClick={() => handleCancelReservation(bookingResponse.id)}
                      className="text-xs text-burnt-500 hover:text-burnt-600 font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                    >
                      <Trash2 size={13} /> Cancelar
                    </button>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            {/* List of past/all offline booked tables to give complete control */}
            <div className="bg-sand-100 p-6 sm:p-8 rounded-[32px] border border-sand-300 shadow-lg flex-1 flex flex-col justify-between">
              <div className="text-left">
                <h4 className="font-serif text-lg font-bold text-sand-900 border-b border-sand-300 pb-3 mb-4 flex items-center gap-2">
                  <Clock size={16} className="text-olive-500" />
                  Minhas Reservas ({reservations.length})
                </h4>

                {reservations.length === 0 ? (
                  <div className="py-8 text-center text-sand-800 space-y-2">
                    <span className="text-3xl">🪑</span>
                    <p className="text-xs font-medium">Você não tem mesas reservadas para esta sessão.</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                    {reservations.map((res) => (
                      <div 
                        key={res.id} 
                        className="bg-white p-3.5 rounded-[16px] border border-sand-300 flex items-center justify-between text-xs cursor-pointer hover:border-burnt-500 smooth-transition"
                        onClick={() => setBookingResponse(res)}
                      >
                        <div className="text-left space-y-1">
                          <p className="font-bold text-sand-900">{res.name}</p>
                          <p className="text-[11px] text-sand-800 font-medium">
                            📅 {res.date} às {res.time} • 👥 {res.guests} Pessoas
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCancelReservation(res.id);
                          }}
                          className="p-1 px-1.5 border border-sand-300 rounded-lg text-sand-800 hover:bg-burnt-50 hover:text-burnt-500 smooth-transition"
                          title="Remover"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Informational Card reinforcing trust */}
              <div className="pt-6 border-t border-sand-300 text-left space-y-2">
                <h5 className="font-serif text-sm font-bold text-sand-900">📍 Onde Nos Encontrar</h5>
                <p className="text-xs text-sand-800 leading-relaxed font-sans">
                  Casarão dos Oliveiras, Estrada das Videiras, Km 4 - Chácaras das Fontes. Estacionamento gratuito e sombreado por oliveiras centenárias.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
