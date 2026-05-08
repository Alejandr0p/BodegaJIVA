import React, { useState } from 'react';
import { X, Truck, Store, MessageCircle, Plus, Landmark, Banknote, Smartphone } from 'lucide-react';

const Checkout = ({ cart, total, isOpen, setIsOpen }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    dni: '',
    telefono: '',
    direccion: '',
    metodoPago: 'Yape',
    tipoEntrega: 'delivery'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateWhatsAppMessage = () => {
    const productsList = cart.map(item => `  • ${item.nombre} x${item.quantity} = S/ ${(item.precio * item.quantity).toFixed(2)}`).join('\n');
    
    const deliveryInfo = formData.tipoEntrega === 'delivery' 
      ? `Dirección: ${formData.direccion}` 
      : `Recojo en tienda - Mz R Lote 11, Séptimo Sector de Pro, SMP`;

    const message = `¡Hola Bodega JIVA! quiero hacer un pedido:

Productos:
${productsList}

Total: S/ ${total.toFixed(2)}

Nombre: ${formData.nombre}
DNI: ${formData.dni}
Teléfono: ${formData.telefono}

${deliveryInfo}

Pago: ${formData.metodoPago}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/51990933915?text=${encodedMessage}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity" onClick={() => setIsOpen(false)}></div>
      
      <div className="relative w-full max-w-xl bg-white/95 backdrop-blur-2xl rounded-[2rem] md:rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col max-h-[90vh] border border-white/20 animate-in fade-in zoom-in duration-300">
        <div className="p-6 md:p-10 flex items-center justify-between bg-gradient-to-r from-brand-secondary to-blue-700 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-black tracking-tighter leading-none mb-1 md:mb-2 text-white">FINALIZAR PEDIDO</h2>
            <p className="text-blue-100 text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-80">Casi listo para refrescar tu día</p>
          </div>
          <button onClick={() => setIsOpen(false)} className="relative z-10 p-2 md:p-3 bg-white/10 hover:bg-white/20 rounded-xl md:rounded-2xl transition-all active:scale-90">
            <X size={20} md:size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-12 space-y-8 md:space-y-10 custom-scrollbar">
          {/* Tipo de Entrega Selector */}
          <div className="space-y-3 md:space-y-4">
            <label className="block text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">¿Cómo lo quieres recibir?</label>
            <div className="flex gap-2 md:gap-4 p-1.5 md:p-2 bg-slate-100 rounded-[1.5rem] md:rounded-3xl">
              <button 
                onClick={() => setFormData(prev => ({ ...prev, tipoEntrega: 'delivery' }))}
                className={`flex-1 flex items-center justify-center gap-2 md:gap-3 py-3 md:py-5 rounded-xl md:rounded-2xl transition-all duration-500 text-xs md:text-base ${formData.tipoEntrega === 'delivery' ? 'bg-white shadow-xl text-brand-primary font-black scale-[1.02] md:scale-[1.05]' : 'text-slate-400 font-bold hover:text-slate-600'}`}
              >
                <Truck size={18} md:size={22} className={formData.tipoEntrega === 'delivery' ? 'animate-bounce' : ''} /> DELIVERY
              </button>
              <button 
                onClick={() => setFormData(prev => ({ ...prev, tipoEntrega: 'recojo' }))}
                className={`flex-1 flex items-center justify-center gap-2 md:gap-3 py-3 md:py-5 rounded-xl md:rounded-2xl transition-all duration-500 text-xs md:text-base ${formData.tipoEntrega === 'recojo' ? 'bg-white shadow-xl text-brand-secondary font-black scale-[1.02] md:scale-[1.05]' : 'text-slate-400 font-bold hover:text-slate-600'}`}
              >
                <Store size={18} md:size={22} className={formData.tipoEntrega === 'recojo' ? 'animate-pulse' : ''} /> RECOJO
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 gap-6 md:gap-8">
            <div className="group">
              <label className="block text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 md:mb-3 ml-1 group-focus-within:text-brand-secondary transition-colors">Nombre Completo</label>
              <div className="relative">
                <input 
                  type="text" name="nombre" value={formData.nombre} onChange={handleInputChange}
                  className="w-full px-5 md:px-6 py-4 md:py-5 bg-slate-50 border-2 border-slate-100 rounded-xl md:rounded-[1.5rem] focus:bg-white focus:border-brand-secondary focus:ring-8 focus:ring-brand-secondary/5 outline-none transition-all font-bold text-slate-700 text-sm md:text-base"
                  placeholder="Ej. Juan Pérez"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="group">
                <label className="block text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 md:mb-3 ml-1 group-focus-within:text-brand-secondary transition-colors">DNI</label>
                <input 
                  type="text" name="dni" value={formData.dni} onChange={handleInputChange}
                  className="w-full px-5 md:px-6 py-4 md:py-5 bg-slate-50 border-2 border-slate-100 rounded-xl md:rounded-[1.5rem] focus:bg-white focus:border-brand-secondary focus:ring-8 focus:ring-brand-secondary/5 outline-none transition-all font-bold text-slate-700 text-sm md:text-base"
                  placeholder="8 dígitos"
                />
              </div>
              <div className="group">
                <label className="block text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 md:mb-3 ml-1 group-focus-within:text-brand-secondary transition-colors">Teléfono</label>
                <input 
                  type="text" name="telefono" value={formData.telefono} onChange={handleInputChange}
                  className="w-full px-5 md:px-6 py-4 md:py-5 bg-slate-50 border-2 border-slate-100 rounded-xl md:rounded-[1.5rem] focus:bg-white focus:border-brand-secondary focus:ring-8 focus:ring-brand-secondary/5 outline-none transition-all font-bold text-slate-700 text-sm md:text-base"
                  placeholder="999 999 999"
                />
              </div>
            </div>

            {formData.tipoEntrega === 'delivery' ? (
              <div className="group">
                <label className="block text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 md:mb-3 ml-1 group-focus-within:text-brand-secondary transition-colors">Dirección de Entrega</label>
                <textarea 
                  name="direccion" value={formData.direccion} onChange={handleInputChange}
                  className="w-full px-5 md:px-6 py-4 md:py-5 bg-slate-50 border-2 border-slate-100 rounded-xl md:rounded-[1.5rem] focus:bg-white focus:border-brand-secondary focus:ring-8 focus:ring-brand-secondary/5 outline-none transition-all h-24 md:h-32 resize-none font-bold text-slate-700 text-sm md:text-base"
                  placeholder="Calle, Número, Referencia..."
                />
              </div>
            ) : (
              <div className="p-6 md:p-8 bg-blue-50/50 rounded-2xl md:rounded-[2.5rem] border-2 border-blue-100/50 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 md:p-6 opacity-10 group-hover:scale-125 transition-transform duration-700">
                  <Store size={60} md:size={80} className="text-brand-secondary" />
                </div>
                <p className="text-[10px] md:text-[11px] font-black text-brand-secondary uppercase tracking-[0.2em] mb-2 md:mb-3">Dirección de Recojo:</p>
                <p className="text-base md:text-lg text-blue-900 font-black leading-tight relative z-10">Mz R Lote 11, Séptimo Sector de Pro, San Martín de Porres, Lima</p>
              </div>
            )}

            <div>
              <label className="block text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-1">Método de Pago</label>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {[
                  { id: 'Yape', name: 'Yape', color: 'bg-[#742284]', icon: (active) => (
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${active ? 'bg-white text-[#742284] shadow-inner' : 'bg-[#742284] text-white'}`}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" fill="currentColor"/>
                        <path d="M11 7h2v10h-2zm-4 4h10v2H7z" fill="currentColor"/>
                      </svg>
                    </div>
                  )},
                  { id: 'Plin', name: 'Plin', color: 'bg-[#00d1ff]', icon: (active) => (
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${active ? 'bg-white text-[#00d1ff] shadow-inner' : 'bg-[#00d1ff] text-white'}`}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 10V3L4 14h7v7l9-11h-7z" fill="currentColor"/>
                      </svg>
                    </div>
                  )},
                  { id: 'Transferencia', name: 'Banca', color: 'bg-blue-600', icon: (active) => (
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${active ? 'bg-white text-blue-600 shadow-inner' : 'bg-blue-600 text-white'}`}>
                      <Landmark size={24} />
                    </div>
                  )},
                  { id: 'Efectivo', name: 'Efectivo', color: 'bg-emerald-600', icon: (active) => (
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${active ? 'bg-white text-emerald-600 shadow-inner' : 'bg-emerald-600 text-white'}`}>
                      <Banknote size={24} />
                    </div>
                  )}
                ].map(metodo => (
                  <button
                    key={metodo.id}
                    onClick={() => setFormData(prev => ({ ...prev, metodoPago: metodo.id }))}
                    className={`relative flex flex-col items-center justify-center gap-2 p-5 rounded-[2rem] border-2 transition-all duration-500 ${
                      formData.metodoPago === metodo.id 
                        ? `${metodo.color} border-transparent text-white shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] scale-105 z-10` 
                        : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-slate-200 hover:bg-white'
                    }`}
                  >
                    {metodo.icon(formData.metodoPago === metodo.id)}
                    <span className="font-black text-[10px] md:text-xs uppercase tracking-widest">{metodo.name}</span>
                    {formData.metodoPago === metodo.id && (
                      <div className="absolute -top-1 -right-1">
                        <div className="bg-white p-1 rounded-full shadow-lg">
                          <div className={`w-4 h-4 ${metodo.color} rounded-full flex items-center justify-center`}>
                            <Plus size={10} className="text-white rotate-45" strokeWidth={4} />
                          </div>
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-10 bg-slate-50 border-t border-slate-100">
          <button 
            onClick={generateWhatsAppMessage}
            className="w-full bg-brand-primary hover:bg-orange-600 text-white font-black py-4 md:py-6 rounded-xl md:rounded-[2rem] shadow-[0_20px_50px_-10px_rgba(255,120,0,0.5)] transition-all duration-500 flex items-center justify-center gap-3 md:gap-4 group text-lg md:text-xl uppercase tracking-tighter"
          >
            <MessageCircle size={24} md:size={28} className="group-hover:rotate-12 group-hover:scale-125 transition-transform" />
            ENVIAR POR WHATSAPP
          </button>
          <p className="text-center text-[9px] md:text-[10px] text-slate-400 font-bold mt-4 md:mt-6 uppercase tracking-widest">Al presionar, se abrirá un chat con nosotros</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
