import React from 'react';
import { Plus, ShoppingCart } from 'lucide-react';

const ProductCard = ({ producto, addToCart }) => {
  return (
    <div className="group relative bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-3 md:p-5 transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,86,179,0.2)] border border-slate-100 hover:border-brand-secondary/10">
      <div className="relative h-32 md:h-64 bg-slate-50 rounded-[1.2rem] md:rounded-[2.5rem] flex items-center justify-center overflow-hidden mb-3 md:mb-6 border border-slate-50 group-hover:bg-blue-50/50 transition-colors duration-500">
        {producto.foto ? (
          <img 
            src={producto.foto} 
            alt={producto.nombre} 
            className="w-full h-full object-contain p-2 md:p-4 transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <span className="text-4xl md:text-7xl drop-shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-12">{producto.emoji}</span>
        )}
        <div className="absolute top-2 right-2 md:top-5 md:right-5 bg-brand-primary text-white text-[7px] md:text-[10px] font-black px-2 md:px-4 py-1 md:py-2 rounded-full shadow-lg tracking-widest uppercase animate-pulse">
          OFERTA
        </div>
      </div>
      
      <div className="space-y-1.5 md:space-y-3">
        <p className="text-[8px] md:text-[10px] text-brand-secondary font-black uppercase tracking-[0.2em] opacity-60">{producto.cat}</p>
        <h3 className="font-bold text-slate-900 text-sm md:text-xl leading-tight group-hover:text-brand-secondary transition-colors line-clamp-2">{producto.nombre}</h3>
        
        {producto.nota && (
          <p className="text-[8px] md:text-[10px] bg-slate-100 text-slate-500 py-0.5 md:py-1 px-2 md:px-3 rounded md:rounded-lg font-bold italic inline-block">
            {producto.nota}
          </p>
        )}

        {producto.items && (
          <ul className="space-y-0.5 md:space-y-1 mt-1 md:mt-2 hidden sm:block">
            {producto.items.map((item, idx) => (
              <li key={idx} className="text-[8px] md:text-[10px] text-slate-600 flex items-center gap-1 md:gap-2">
                <div className="w-0.5 md:w-1 h-0.5 md:h-1 bg-brand-primary rounded-full"></div> {item}
              </li>
            ))}
          </ul>
        )}
        
        <div className="flex items-center justify-between pt-2 md:pt-4">
          <div className="flex flex-col">
            <span className="text-slate-400 line-through text-[9px] md:text-xs font-bold mb-0.5 md:mb-1">S/ {producto.precioOld.toFixed(2)}</span>
            <span className="text-slate-900 font-black text-base md:text-2xl tracking-tighter">S/ {producto.precio.toFixed(2)}</span>
          </div>
          
          <button 
            onClick={() => addToCart(producto)}
            className="bg-brand-secondary hover:bg-brand-primary text-white p-2 md:p-4 rounded-xl md:rounded-2xl transition-all duration-300 shadow-xl shadow-blue-500/20 active:scale-90"
          >
            <Plus size={16} md:size={22} strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
