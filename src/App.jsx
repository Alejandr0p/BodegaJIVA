import React, { useState, useEffect } from 'react';
import { ShoppingCart, Phone, MapPin, CheckCircle, Plus, MessageCircle } from 'lucide-react';
import Catalogo from './components/Catalogo';
import Carrito from './components/Carrito';
import Checkout from './components/Checkout';
import productosData from './data/productos.json';
import promocionesData from './data/promociones.json';

const allProducts = [...promocionesData, ...productosData];

// Internal components
const Store = ({ size, className }) => (
  <svg
    width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}
  >
    <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
    <path d="M2 7h20" />
    <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
  </svg>
);

const Snow = () => {
  const snowflakes = React.useMemo(() => Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    size: Math.random() * 5 + 2,
    left: Math.random() * 100,
    delay: Math.random() * -10, // Negative delay to start mid-air
    duration: Math.random() * 10 + 10,
  })), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[50] overflow-hidden">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            left: `${flake.left}%`,
            animationDelay: `${flake.delay}s`,
            animationDuration: `${flake.duration}s`,
            animationName: 'snow',
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear'
          }}
        />
      ))}
    </div>
  );
};

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [currentEmojiIdx, setCurrentEmojiIdx] = useState(0);

  const heroEmojis = ["🍺", "🍷", "🥃", "🧊", "🥤", "🎁", "🧺", "🍊", "🍋"];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentEmojiIdx(prev => (prev + 1) % heroEmojis.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = cart.reduce((acc, item) => acc + (item.precio * item.quantity), 0);
    setTotal(newTotal);
  }, [cart]);

  const addToCart = (producto) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === producto.id);
      if (existing) {
        return prev.map(item =>
          item.id === producto.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...producto, quantity: 1 }];
    });
    // Visual feedback could be added here
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/50 flex flex-col font-sans text-slate-900 relative">
      <Snow />
      {/* Modern Header */}
      <header className="sticky top-0 z-40 bg-brand-secondary/95 backdrop-blur-xl px-4 md:px-12 py-3 md:py-5 flex items-center justify-between shadow-2xl border-b border-white/10">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="bg-white p-2 md:p-3 rounded-xl md:rounded-2xl shadow-lg shadow-black/20 rotate-3">
            <Store size={22} className="text-brand-primary md:w-[28px] md:h-[28px]" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">BODEGA <span className="text-brand-primary">JIVA</span></h1>
            <p className="text-[8px] md:text-[10px] text-blue-200 uppercase font-black tracking-[0.2em] mt-0.5">Tienda de Confianza</p>
          </div>
        </div>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative group p-3 md:p-4 bg-white/10 hover:bg-white/20 rounded-xl md:rounded-2xl border border-white/20 transition-all duration-300 active:scale-90"
        >
          <ShoppingCart className="text-white" size={22} md:size={26} />
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 md:-top-2 md:-right-2 bg-brand-primary text-white text-[9px] md:text-[11px] font-black w-5 h-5 md:w-7 md:h-7 flex items-center justify-center rounded-full border-2 md:border-4 border-brand-secondary shadow-xl">
              {totalItems}
            </span>
          )}
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Playful Hero Section */}
        <section className="relative py-12 md:py-20 px-4 md:px-12 bg-brand-secondary overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-primary rounded-full blur-[120px] opacity-20"></div>

          <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1 text-center lg:text-left space-y-6 md:space-y-8">
              <h2 className="text-4xl md:text-7xl font-black text-white leading-[1.1] tracking-tighter">
                Refresca tu día con <br />
                <span className="text-brand-primary">Bodega JIVA.</span>
              </h2>
              
              {/* Mobile Emoji Display */}
              <div className="lg:hidden flex justify-center py-4">
                <div className="relative w-40 h-40 bg-white/5 backdrop-blur-3xl rounded-[2.5rem] border border-white/20 flex items-center justify-center shadow-2xl overflow-hidden">
                  <span
                    key={`mobile-${currentEmojiIdx}`}
                    className="text-8xl drop-shadow-2xl animate-float transition-all duration-700"
                  >
                    {heroEmojis[currentEmojiIdx]}
                  </span>
                </div>
              </div>

              <p className="text-base md:text-lg text-blue-100/80 max-w-xl font-medium leading-relaxed mx-auto lg:mx-0">
                Todo lo que necesitas, helado y en tu puerta. La mejor selección de bebidas con delivery express.
              </p>
              
              <div className="space-y-1">
                <p className="text-xs md:text-sm text-brand-primary font-black uppercase tracking-widest">
                  ✨ Se hacen ventas mayoristas y minoristas ✨
                </p>
                <p className="text-[10px] md:text-xs text-blue-200 font-bold uppercase tracking-wider">
                  🤝 Abastecemos negocios y fiestas 🤝
                </p>
              </div>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <a href="#catalogo" className="w-full sm:w-auto px-10 py-4 md:py-5 bg-brand-primary hover:bg-orange-600 text-white font-black rounded-2xl shadow-xl shadow-orange-500/40 transition-all hover:-translate-y-1 active:scale-95 text-center">
                  EXPLORAR CATÁLOGO
                </a>
              </div>
            </div>

            <div className="hidden lg:block flex-1">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-white/10 rounded-[3rem] rotate-6 border border-white/10"></div>
                <div className="relative z-10 w-full h-full bg-white/5 backdrop-blur-3xl rounded-[3.5rem] -rotate-3 border border-white/20 flex items-center justify-center shadow-2xl overflow-hidden">
                  <span
                    key={currentEmojiIdx}
                    className="text-[180px] drop-shadow-2xl animate-float transition-all duration-700 animate-in fade-in slide-in-from-right-40"
                  >
                    {heroEmojis[currentEmojiIdx]}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Catalog Section */}
        <section id="catalogo" className="py-20 max-w-7xl mx-auto px-4 md:px-12">
          <div className="flex items-center gap-6 mb-12">
            <h3 className="text-3xl font-black text-slate-900 tracking-tight whitespace-nowrap">Nuestro Menú</h3>
            <div className="h-2 w-24 bg-brand-primary rounded-full"></div>
            <div className="h-px flex-1 bg-slate-200"></div>
          </div>
          <Catalogo productos={allProducts} addToCart={addToCart} />
        </section>
      </main>

      {/* Floating Action Button */}
      <a
        href="https://wa.me/51990933915"
        target="_blank"
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-5 rounded-full shadow-[0_20px_50px_-10px_rgba(37,211,102,0.5)] hover:scale-110 transition-all duration-300 group active:scale-95"
      >
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20"></div>
        <MessageCircle size={32} className="relative z-10 group-hover:rotate-12 transition-transform" />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-slate-900 px-4 py-2 rounded-xl text-xs font-black shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-slate-100 pointer-events-none">
          ¿Alguna duda? Escríbenos
        </span>
      </a>

      {/* Modern & Professional Footer */}
      <footer className="bg-slate-950 text-white pt-16 md:pt-24 pb-12 px-4 md:px-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-primary to-transparent"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20">
          <div className="space-y-6 md:space-y-8">
            <div className="flex items-center gap-4">
              <div className="bg-brand-primary p-3 rounded-2xl shadow-lg shadow-orange-500/20">
                <Store size={24} />
              </div>
              <h4 className="text-2xl md:text-3xl font-black tracking-tighter text-white">BODEGA <span className="text-brand-primary">JIVA</span></h4>
            </div>
            <p className="text-slate-400 font-medium leading-relaxed max-w-xs text-sm md:text-base">
              La bodega más completa de San Martín de Porres. Calidad, confianza y rapidez en cada entrega.
            </p>
          </div>

          <div className="space-y-6 md:space-y-8">
            <h5 className="text-xs md:text-sm font-black uppercase tracking-[0.3em] text-brand-primary">Contacto Directo</h5>
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 border border-blue-500/20 group-hover:bg-blue-500 group-hover:text-white transition-all">
                  <Phone size={18} md:size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Llámanos</p>
                  <p className="font-bold text-base md:text-lg text-white">+51 990 933 915</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-400 border border-orange-500/20 group-hover:bg-orange-500 group-hover:text-white transition-all">
                  <MapPin size={18} md:size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Ubicación</p>
                  <p className="font-bold text-base md:text-lg text-white">Pro, SMP, Lima</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 md:space-y-8">
            <h5 className="text-xs md:text-sm font-black uppercase tracking-[0.3em] text-brand-primary">Horario de Atención</h5>
            <div className="p-6 md:p-8 bg-white/5 rounded-[2rem] md:rounded-[2.5rem] border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-150 transition-transform duration-700">
                <Store size={80} md:size={100} />
              </div>
              <p className="text-slate-400 font-bold mb-2 text-[10px] md:text-xs uppercase tracking-widest">Lunes a Domingo</p>
              <p className="text-2xl md:text-3xl font-black text-white tracking-tighter">8:00 AM - 12:00 AM</p>
              <div className="mt-4 md:mt-6 inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-400 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest border border-green-500/20">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-ping"></span> Estamos Atendiendo
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
            © 2026 BODEGA JIVA. DISEÑADO CON ❤️ EN LIMA
          </p>
          <div className="flex gap-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos</a>
          </div>
        </div>
      </footer>

      {/* Overlays */}
      <Carrito
        cart={cart}
        isOpen={isCartOpen}
        setIsOpen={setIsCartOpen}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
        total={total}
        onCheckout={handleCheckout}
      />
      <Checkout
        cart={cart}
        total={total}
        isOpen={isCheckoutOpen}
        setIsOpen={setIsCheckoutOpen}
      />
    </div>
  );
}


export default App;
