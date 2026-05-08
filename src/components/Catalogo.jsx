import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, Filter, X } from 'lucide-react';
import ProductCard from './ProductCard';

const categories = [
  { id: 'todos', name: 'Todos' },
  { id: 'promociones', name: 'Promociones 🎁' },
  { id: 'promo-mayo', name: 'Promo Mayo 🌸' },
  { id: 'piscos', name: 'Piscos' },
  { id: 'bebidas', name: 'Bebidas' },
  { id: 'aguas', name: 'Aguas' },
  { id: 'cervezas', name: 'Cervezas' },
  { id: 'licores', name: 'Licores' }
];

const Catalogo = ({ productos, addToCart }) => {
  const [filter, setFilter] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('none');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...productos];

    // Category filter
    if (filter !== 'todos') {
      result = result.filter(p => p.cat === filter);
    }

    // Search filter
    if (searchTerm.trim() !== '') {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.nombre.toLowerCase().includes(lowerSearch) || 
        p.cat.toLowerCase().includes(lowerSearch)
      );
    }

    // Price Range filter
    if (minPrice !== '') {
      result = result.filter(p => (p.precio || 0) >= parseFloat(minPrice));
    }
    if (maxPrice !== '') {
      result = result.filter(p => (p.precio || 0) <= parseFloat(maxPrice));
    }

    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.precio - b.precio);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.precio - a.precio);
    }

    return result;
  }, [productos, filter, searchTerm, sortBy, minPrice, maxPrice]);

  return (
    <div className="py-4 md:py-8 space-y-8">
      {/* Search and Filters Bar */}
      <div className="flex flex-col gap-6 bg-white p-6 rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-100 animate-fade-in transition-all hover:shadow-[0_40px_80px_-20px_rgba(0,86,179,0.1)]">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-md group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary group-focus-within:scale-110 transition-all duration-300" size={18} />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl outline-none focus:bg-white focus:border-brand-primary/30 focus:ring-8 focus:ring-brand-primary/5 transition-all font-bold text-slate-700 placeholder:text-slate-400"
            />
          </div>

          <div className="relative w-full md:w-64 group">
            <Filter className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-secondary group-focus-within:scale-110 transition-all duration-300" size={18} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full pl-12 pr-10 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl outline-none appearance-none cursor-pointer focus:bg-white focus:border-brand-secondary/30 focus:ring-8 focus:ring-brand-secondary/5 transition-all font-black text-[10px] md:text-xs uppercase tracking-widest text-slate-600"
            >
              <option value="none">Ordenar por</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
            </select>
            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-brand-secondary pointer-events-none group-focus-within:rotate-180 transition-transform duration-300" size={18} />
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="flex flex-col md:flex-row items-center gap-4 pt-4 border-t border-slate-50">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-pulse"></div>
            Rango de Precio (S/):
          </span>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full md:w-28 px-4 py-3 bg-slate-50 border-2 border-slate-50 rounded-xl outline-none focus:bg-white focus:border-brand-primary/30 focus:ring-8 focus:ring-brand-primary/5 transition-all font-bold text-sm text-slate-700"
            />
            <span className="text-slate-300 font-bold">a</span>
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full md:w-28 px-4 py-3 bg-slate-50 border-2 border-slate-50 rounded-xl outline-none focus:bg-white focus:border-brand-primary/30 focus:ring-8 focus:ring-brand-primary/5 transition-all font-bold text-sm text-slate-700"
            />
            {(minPrice || maxPrice) && (
              <button 
                onClick={() => {setMinPrice(''); setMaxPrice('');}}
                className="ml-2 p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300 active:scale-90 flex items-center justify-center shadow-sm"
                title="Limpiar rango"
              >
                <X size={16} strokeWidth={3} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Categories Scroll */}
      <div className="flex overflow-x-auto no-scrollbar gap-3 md:gap-4 pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 justify-start">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={`whitespace-nowrap px-6 md:px-8 py-3 rounded-xl md:rounded-2xl text-[10px] md:text-[11px] font-black uppercase tracking-widest transition-all duration-300 flex-shrink-0 hover:scale-105 active:scale-95 ${
              filter === cat.id 
                ? (cat.id === 'promociones' || cat.id === 'promo-mayo' ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-xl shadow-pink-500/30 scale-105' : 'bg-brand-secondary text-white shadow-xl shadow-blue-500/30 scale-105')
                : (cat.id === 'promociones' || cat.id === 'promo-mayo' ? 'bg-pink-50 text-pink-600 border border-pink-100 hover:bg-pink-100' : 'bg-white text-slate-400 hover:text-brand-secondary border border-slate-100 hover:border-brand-secondary/20 shadow-sm')
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 min-h-[400px]">
        {filteredAndSortedProducts.length > 0 ? (
          filteredAndSortedProducts.map(producto => (
            <ProductCard 
              key={producto.id} 
              producto={producto} 
              addToCart={addToCart} 
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-slate-300">
            <Search size={80} className="mb-4 opacity-20" />
            <p className="text-xl font-bold">No encontramos lo que buscas</p>
            <p className="text-sm">Prueba con otra palabra o categoría</p>
            <button 
              onClick={() => {setSearchTerm(''); setFilter('todos');}}
              className="mt-6 text-brand-primary font-black uppercase tracking-widest text-xs hover:underline"
            >
              Ver todos los productos
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalogo;
