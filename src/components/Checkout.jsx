import React, { useState } from 'react';
import { X, Truck, Store, MessageCircle, Plus } from 'lucide-react';

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
      
      <div className="relative w-full max-w-xl bg-white/95 backdrop-blur-2xl rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col max-h-[90vh] border border-white/20 animate-in fade-in zoom-in duration-300">
        <div className="p-10 flex items-center justify-between bg-gradient-to-r from-brand-secondary to-blue-700 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-black tracking-tighter leading-none mb-2">FINALIZAR PEDIDO</h2>
            <p className="text-blue-100 text-xs font-bold uppercase tracking-widest opacity-80">Casi listo para refrescar tu día</p>
          </div>
          <button onClick={() => setIsOpen(false)} className="relative z-10 p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all active:scale-90">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-10 custom-scrollbar">
          {/* Tipo de Entrega Selector */}
          <div className="space-y-4">
            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">¿Cómo lo quieres recibir?</label>
            <div className="flex gap-4 p-2 bg-slate-100 rounded-3xl">
              <button 
                onClick={() => setFormData(prev => ({ ...prev, tipoEntrega: 'delivery' }))}
                className={`flex-1 flex items-center justify-center gap-3 py-5 rounded-2xl transition-all duration-500 ${formData.tipoEntrega === 'delivery' ? 'bg-white shadow-2xl text-brand-primary font-black scale-[1.05]' : 'text-slate-400 font-bold hover:text-slate-600'}`}
              >
                <Truck size={22} className={formData.tipoEntrega === 'delivery' ? 'animate-bounce' : ''} /> DELIVERY
              </button>
              <button 
                onClick={() => setFormData(prev => ({ ...prev, tipoEntrega: 'recojo' }))}
                className={`flex-1 flex items-center justify-center gap-3 py-5 rounded-2xl transition-all duration-500 ${formData.tipoEntrega === 'recojo' ? 'bg-white shadow-2xl text-brand-secondary font-black scale-[1.05]' : 'text-slate-400 font-bold hover:text-slate-600'}`}
              >
                <Store size={22} className={formData.tipoEntrega === 'recojo' ? 'animate-pulse' : ''} /> RECOJO
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 gap-8">
            <div className="group">
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1 group-focus-within:text-brand-secondary transition-colors">Nombre Completo</label>
              <div className="relative">
                <input 
                  type="text" name="nombre" value={formData.nombre} onChange={handleInputChange}
                  className="w-full px-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] focus:bg-white focus:border-brand-secondary focus:ring-8 focus:ring-brand-secondary/5 outline-none transition-all font-bold text-slate-700"
                  placeholder="Ej. Juan Pérez"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group">
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1 group-focus-within:text-brand-secondary transition-colors">DNI</label>
                <input 
                  type="text" name="dni" value={formData.dni} onChange={handleInputChange}
                  className="w-full px-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] focus:bg-white focus:border-brand-secondary focus:ring-8 focus:ring-brand-secondary/5 outline-none transition-all font-bold text-slate-700"
                  placeholder="8 dígitos"
                />
              </div>
              <div className="group">
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1 group-focus-within:text-brand-secondary transition-colors">Teléfono</label>
                <input 
                  type="text" name="telefono" value={formData.telefono} onChange={handleInputChange}
                  className="w-full px-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] focus:bg-white focus:border-brand-secondary focus:ring-8 focus:ring-brand-secondary/5 outline-none transition-all font-bold text-slate-700"
                  placeholder="999 999 999"
                />
              </div>
            </div>

            {formData.tipoEntrega === 'delivery' ? (
              <div className="group">
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1 group-focus-within:text-brand-secondary transition-colors">Dirección de Entrega</label>
                <textarea 
                  name="direccion" value={formData.direccion} onChange={handleInputChange}
                  className="w-full px-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] focus:bg-white focus:border-brand-secondary focus:ring-8 focus:ring-brand-secondary/5 outline-none transition-all h-32 resize-none font-bold text-slate-700"
                  placeholder="Calle, Número, Referencia..."
                />
              </div>
            ) : (
              <div className="p-8 bg-blue-50/50 rounded-[2.5rem] border-2 border-blue-100/50 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-125 transition-transform duration-700">
                  <Store size={80} className="text-brand-secondary" />
                </div>
                <p className="text-[11px] font-black text-brand-secondary uppercase tracking-[0.2em] mb-3">Dirección de Recojo:</p>
                <p className="text-lg text-blue-900 font-black leading-tight relative z-10">Mz R Lote 11, Séptimo Sector de Pro, San Martín de Porres, Lima</p>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">Método de Pago</label>
              <div className="relative group">
                <select 
                  name="metodoPago" value={formData.metodoPago} onChange={handleInputChange}
                  className="w-full px-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] focus:bg-white focus:border-brand-secondary focus:ring-8 focus:ring-brand-secondary/5 outline-none appearance-none font-black text-slate-700 cursor-pointer"
                >
                  <option value="Yape">Yape 📱</option>
                  <option value="Plin">Plin 📱</option>
                  <option value="Transferencia">Transferencia Bancaria 🏦</option>
                  <option value="Efectivo">Efectivo 💵</option>
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-brand-secondary">
                  <Plus size={20} className="rotate-45" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-10 bg-slate-50 border-t border-slate-100">
          <button 
            onClick={generateWhatsAppMessage}
            className="w-full bg-brand-primary hover:bg-orange-600 text-white font-black py-6 rounded-[2rem] shadow-[0_20px_50px_-10px_rgba(255,120,0,0.5)] transition-all duration-500 flex items-center justify-center gap-4 group text-xl uppercase tracking-tighter"
          >
            <MessageCircle size={28} className="group-hover:rotate-12 group-hover:scale-125 transition-transform" />
            ENVIAR POR WHATSAPP
          </button>
          <p className="text-center text-[10px] text-slate-400 font-bold mt-6 uppercase tracking-widest">Al presionar, se abrirá un chat con nosotros</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
