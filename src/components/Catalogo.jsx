import React, { useState } from 'react';
import ProductCard from './ProductCard';

const categories = [
  { id: 'todos', name: 'Todos' },
  { id: 'promociones', name: 'Promociones 🎁' },
  { id: 'piscos', name: 'Piscos' },
  { id: 'bebidas', name: 'Bebidas' },
  { id: 'aguas', name: 'Aguas' },
  { id: 'cervezas', name: 'Cervezas' },
  { id: 'licores', name: 'Licores' }
];

const Catalogo = ({ productos, addToCart }) => {
  const [filter, setFilter] = useState('todos');

  const filteredProducts = filter === 'todos' 
    ? productos 
    : productos.filter(p => p.cat === filter);

  return (
    <div className="py-8">
      <div className="flex flex-wrap gap-4 mb-16 justify-center md:justify-start">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={`px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${
              filter === cat.id 
                ? (cat.id === 'promociones' ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-xl shadow-pink-500/30 scale-110' : 'bg-brand-secondary text-white shadow-xl shadow-blue-500/30 scale-105')
                : (cat.id === 'promociones' ? 'bg-pink-50 text-pink-600 border border-pink-100 hover:bg-pink-100' : 'bg-white text-slate-400 hover:text-brand-secondary border border-slate-100 hover:border-brand-secondary/20 shadow-sm')
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(producto => (
          <ProductCard 
            key={producto.id} 
            producto={producto} 
            addToCart={addToCart} 
          />
        ))}
      </div>
    </div>
  );
};

export default Catalogo;
