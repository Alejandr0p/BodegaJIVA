import React from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

const Carrito = ({ cart, isOpen, setIsOpen, updateQuantity, removeItem, total, onCheckout }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen md:max-w-md bg-white shadow-2xl flex flex-col">
          <div className="p-4 md:p-6 flex items-center justify-between border-b bg-brand-secondary">
            <h2 className="text-xl md:text-2xl font-black text-white flex items-center gap-2 tracking-tighter">
              <ShoppingBag /> MI CARRITO
            </h2>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-300">
                <ShoppingBag size={60} md:size={80} className="mb-4 md:mb-6 opacity-20" />
                <p className="text-base md:text-lg font-bold">Tu carrito está vacío</p>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="mt-3 md:mt-4 text-brand-secondary font-black uppercase tracking-widest text-[10px] md:text-xs hover:underline"
                >
                  Seguir comprando
                </button>
              </div>
            ) : (
              <div className="space-y-4 md:space-y-6">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-3 md:gap-4 items-center">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-slate-50 rounded-xl md:rounded-2xl flex items-center justify-center text-3xl md:text-4xl border border-slate-100 p-2">
                      {item.foto ? <img src={item.foto} className="w-full h-full object-contain rounded-xl md:rounded-2xl" /> : item.emoji}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 text-base md:text-lg leading-tight mb-0.5 md:mb-1">{item.nombre}</h4>
                      <p className="text-brand-primary font-black text-sm md:text-base">S/ {item.precio.toFixed(2)}</p>
                      
                      <div className="flex items-center gap-3 md:gap-4 mt-2 md:mt-3">
                        <div className="flex items-center bg-slate-100 rounded-lg md:rounded-xl p-0.5 md:p-1">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 md:p-1.5 hover:bg-white hover:shadow-sm rounded-md md:rounded-lg text-slate-500 transition-all"
                          >
                            <Minus size={12} md:size={14} strokeWidth={3} />
                          </button>
                          <span className="px-3 md:px-4 font-black text-xs md:text-sm text-slate-900">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 md:p-1.5 hover:bg-white hover:shadow-sm rounded-md md:rounded-lg text-slate-500 transition-all"
                          >
                            <Plus size={12} md:size={14} strokeWidth={3} />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-slate-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} md:size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-6 md:p-8 border-t bg-slate-50">
              <div className="flex items-center justify-between mb-6 md:mb-8">
                <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px] md:text-xs">Total del pedido:</span>
                <span className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter">S/ {total.toFixed(2)}</span>
              </div>
              <button 
                onClick={onCheckout}
                className="w-full bg-brand-primary hover:bg-orange-600 text-white font-black py-4 md:py-5 rounded-xl md:rounded-2xl shadow-xl shadow-orange-500/30 transition-all duration-300 active:scale-95 text-base md:text-lg"
              >
                FINALIZAR PEDIDO
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Carrito;
