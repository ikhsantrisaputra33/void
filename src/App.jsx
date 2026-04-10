import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  ChevronRight, 
  Info, 
  Zap, 
  Globe, 
  ShieldCheck, 
  Terminal,
  ArrowRight,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Assets & Constants ---
const PRODUCTS = [
  {
    id: 'rp-01',
    name: 'REMNANT PARKA [01]',
    price: 420.0,
    tag: 'LIMITED 1/5',
    material: 'RECLAIMED COTTON',
    desc: 'Forged from the remnants of maritime rigging and heavy workwear.',
    img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800',
    details: ['Waterproof coating', 'Reinforced elbows', 'Adjustable hood']
  },
  {
    id: 'vt-02',
    name: 'VOID TROUSER',
    price: 285.0,
    tag: 'MADE TO ORDER',
    material: 'INDUSTRIAL NYLON',
    desc: 'Multi-paneled construction utilizing zero-waste cutting patterns.',
    img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800',
    details: ['Articulated knees', 'Six pocket system', 'Tapered fit'],
    offset: true
  },
  {
    id: 'sv-03',
    name: 'SCAVENGER VEST',
    price: 195.0,
    tag: 'ARCHIVE PIECE',
    material: 'MIL-SPEC WEBBING',
    desc: 'Layering piece constructed from deconstructed military surplus.',
    img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800',
    details: ['Modular attachment points', 'Breathable mesh', 'Quick-release buckles']
  }
];

// --- Components ---

const GrainOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] overflow-hidden">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

const Navbar = ({ cartCount, onOpenCart }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/90 py-4 backdrop-blur-md' : 'bg-transparent py-6'}`}>
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer group">
          <img src="/logo.png" alt="RUSTHAVEN Icon" className="w-8 h-8 md:w-10 md:h-10 object-contain mix-blend-screen opacity-90 group-hover:opacity-100 transition-opacity" />
          <div className="text-xl md:text-2xl font-black tracking-tighter text-white font-headline">
            RUSTHAVEN
          </div>
        </div>
        
        <div className="hidden lg:flex gap-10 items-center">
          {['STORY', 'ARCHIVE', 'PROCESS', 'PHILOSOPHY'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="font-headline text-[10px] tracking-[0.3em] font-bold text-neutral-400 hover:text-white transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-white transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={onOpenCart}
            className="relative text-white hover:text-neutral-400 transition-colors"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button className="text-white lg:hidden">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

const ProductCard = ({ product, onAddToCart }) => {
  const [tactical, setTactical] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`group relative bg-neutral-900/50 border border-white/5 p-2 transition-all hover:border-white/20 ${product.offset ? 'md:mt-24' : ''}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-neutral-800">
        <img 
          src={product.img} 
          alt={product.name}
          className={`w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 ${tactical ? 'opacity-20 blur-sm' : ''}`}
        />
        
        {/* Tactical Overlay */}
        <AnimatePresence>
          {tactical && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 p-6 flex flex-col justify-center gap-4 text-xs font-headline tracking-widest text-white z-10"
            >
              {product.details.map((d, i) => (
                <div key={i} className="flex items-center gap-2 border-l border-white/30 pl-3">
                  <ChevronRight size={10} className="text-white/50" />
                  {d.toUpperCase()}
                </div>
              ))}
              <div className="mt-4 pt-4 border-t border-white/10 text-[9px] text-neutral-500">
                ORIGIN: RECLAIMED_STOCK_77A
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          onMouseEnter={() => setTactical(true)}
          onMouseLeave={() => setTactical(false)}
          className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-md rounded-full text-white/60 hover:text-white transition-colors"
        >
          <Info size={16} />
        </button>
      </div>

      <div className="px-4 pb-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-headline font-black text-lg uppercase tracking-tighter text-white">
            {product.name}
          </h3>
          <span className="font-headline text-sm text-neutral-400">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <p className="font-body italic text-neutral-500 text-sm mb-6 line-clamp-2">
          "{product.desc}"
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="bg-white/5 text-neutral-300 px-2 py-1 text-[9px] font-headline font-bold tracking-widest uppercase border border-white/10">
            {product.tag}
          </span>
          <span className="bg-white/5 text-neutral-500 px-2 py-1 text-[9px] font-headline tracking-widest uppercase border border-white/10">
            {product.material}
          </span>
        </div>

        <button 
          onClick={() => onAddToCart(product)}
          className="w-full bg-white text-black py-3 font-headline font-black text-[10px] tracking-[0.3em] uppercase hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 group/btn active:scale-[0.98]"
        >
          <Plus size={14} />
          ADD TO ARCHIVE
        </button>
      </div>
    </motion.div>
  );
};

const CartDrawer = ({ isOpen, onClose, items, onRemove }) => {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0e0e0e] z-[101] shadow-2xl border-l border-white/5 flex flex-col"
          >
            <div className="p-8 flex justify-between items-center border-b border-white/5">
              <h2 className="font-headline font-black text-xl tracking-tighter text-white">YOUR_ARCHIVE</h2>
              <button onClick={onClose} className="text-white hover:rotate-90 transition-transform"><X size={24} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                  <Terminal size={48} className="mb-4" />
                  <p className="font-headline text-xs tracking-widest uppercase">Archive is empty.</p>
                </div>
              ) : (
                items.map((item, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    <img src={item.img} className="w-20 h-24 object-cover grayscale" alt="" />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-headline font-bold text-xs text-white uppercase">{item.name}</h4>
                        <button onClick={() => onRemove(idx)} className="text-neutral-500 hover:text-white"><X size={14} /></button>
                      </div>
                      <p className="text-[10px] text-neutral-500 font-headline mt-1 tracking-widest">{item.material}</p>
                      <p className="text-xs text-white mt-4 font-headline">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-8 border-t border-white/5 space-y-4">
              <div className="flex justify-between font-headline text-sm uppercase tracking-widest text-neutral-400">
                <span>Subtotal</span>
                <span className="text-white">${total.toFixed(2)}</span>
              </div>
              <button className="w-full bg-white text-black py-5 font-headline font-black tracking-[0.3em] uppercase hover:bg-neutral-300 transition-all">
                SECURE CHECKOUT
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const addToCart = (product) => {
    setCart([...cart, product]);
    setIsCartOpen(true);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <div className="bg-[#131313] text-on-surface font-body selection:bg-white selection:text-black min-h-screen">
      <GrainOverlay />
      
      <Navbar cartCount={cart.length} onOpenCart={() => setIsCartOpen(true)} />
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart} 
        onRemove={removeFromCart}
      />

      <main>
        {/* HERO */}
        <section className="relative h-screen flex items-center px-6 md:px-16 overflow-hidden">
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 z-0"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-transparent z-10" />
            <img 
              src="/hero-bg.png" 
              className="w-full h-full object-cover grayscale"
              alt="Industrial landscape"
            />
          </motion.div>
          
          <div className="relative z-20 w-full">
            <motion.h1 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="font-headline text-[13vw] leading-[0.8] font-black uppercase tracking-tighter mb-4 text-white"
            >
              REJECT THE<br />TEMPORARY
            </motion.h1>
            <motion.p 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="font-body italic text-2xl md:text-4xl text-neutral-400 max-w-xl mb-12"
            >
              Wear Time. Not Trends.
            </motion.p>
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-col md:flex-row gap-6"
            >
              <button 
                onClick={() => document.getElementById('archive').scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-black px-12 py-5 font-headline font-black uppercase tracking-widest hover:bg-neutral-300 transition-all flex items-center gap-3"
              >
                EXPLORE ARCHIVE <ArrowRight size={18} />
              </button>
              <button className="border border-white/20 text-white px-12 py-5 font-headline font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                STORY [01]
              </button>
            </motion.div>
          </div>
          
          <div className="absolute bottom-10 left-6 md:left-16 flex items-center gap-4 text-white/40 font-headline text-[9px] tracking-[0.4em]">
            <span className="w-12 h-px bg-white/20" />
            V0.23 FALL_RECON
          </div>
        </section>

        {/* MANIFESTO */}
        <section className="py-40 px-6 md:px-16 bg-[#0e0e0e]" id="story">
          <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <span className="font-headline text-white/30 text-[10px] tracking-[0.4em] uppercase block mb-6">[ MANIFESTO ]</span>
              <h2 className="font-headline text-6xl md:text-9xl font-black uppercase tracking-tighter mb-8 leading-[0.85] text-white">
                THE<br />RESISTANCE
              </h2>
            </div>
            <div className="lg:col-start-7 lg:col-span-6 flex flex-col justify-center">
              <p className="font-body text-2xl md:text-4xl leading-tight text-neutral-300 mb-10">
                We exist in the friction between creation and consumption. Mass production is a death sentence for culture and earth.
              </p>
              <div className="space-y-6 text-neutral-500 leading-relaxed max-w-lg">
                <p>
                  Every stitch is a protest. We take what was abandoned—heavy denims, weathered canvases, industrial fibers—and reconstruct them into armor for the modern nomad.
                </p>
                <p className="italic border-l border-white/10 pl-6">
                  "Sustainability isn't a strategy, it's the only remaining choice."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ARCHIVE GRID */}
        <section className="py-40 px-6 md:px-16 bg-[#131313]" id="archive">
          <div className="max-w-screen-2xl mx-auto">
            <div className="flex justify-between items-end mb-24 border-b border-white/5 pb-10">
              <h2 className="font-headline text-6xl md:text-8xl font-black uppercase tracking-tighter text-white">THE ARCHIVE</h2>
              <div className="hidden md:block font-headline text-[10px] tracking-[0.5em] text-neutral-600 uppercase">
                VOL. 23 — SYSTEM_UPDATE
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {PRODUCTS.map((p) => (
                <ProductCard key={p.id} product={p} onAddToCart={addToCart} />
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES / PHILOSOPHY */}
        <section className="py-40 px-6 md:px-16 bg-[#0e0e0e] overflow-hidden relative" id="philosophy">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-white/[0.02] -skew-x-12 translate-x-1/2" />
          
          <div className="max-w-screen-2xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
              <div className="lg:col-span-6">
                <h2 className="font-headline text-6xl md:text-8xl font-black uppercase tracking-tighter text-white mb-20">
                  BEYOND<br />CLOTHING
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {[
                    { icon: <Zap />, title: "CIRCULAR DESIGN", text: "Every fiber is traced. Every scrap is repurposed. Zero-waste isn't a goal, it's our floor." },
                    { icon: <ShieldCheck />, title: "TACTICAL UTILITY", text: "Built for the urban landscape. Modular pockets, weather resistance, and heavy reinforcement." },
                    { icon: <Globe />, title: "LOCAL ETHOS", text: "Constructed in localized hubs to minimize carbon impact and support skilled artisans." },
                    { icon: <Info />, title: "OPEN ARCHIVE", text: "Repair manuals provided with every purchase. Your garment is meant to be maintained, not replaced." }
                  ].map((feat, i) => (
                    <div key={i} className="space-y-4 group">
                      <div className="text-white/20 group-hover:text-white transition-colors">
                        {feat.icon}
                      </div>
                      <h4 className="font-headline font-bold text-sm tracking-widest text-white">{feat.title}</h4>
                      <p className="text-neutral-500 text-sm leading-relaxed">{feat.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="lg:col-span-6 relative flex items-center justify-center">
                <div className="aspect-square w-full max-w-md border border-white/5 p-4 rounded-full animate-[spin_20s_linear_infinite] opacity-20">
                  <div className="w-full h-full border border-dashed border-white/20 rounded-full" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800" 
                    className="w-64 h-80 object-cover grayscale rounded-sm shadow-2xl z-10" 
                    alt="Process shot" 
                  />
                  <div className="absolute top-1/2 -translate-y-1/2 -right-10 bg-white text-black p-4 font-headline text-[9px] tracking-widest vertical-text uppercase font-black">
                    MANUAL_RECONSTRUCTION
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ENLIST */}
        <section className="py-60 px-6 md:px-16 bg-white text-black text-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-5">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-headline text-[25vw] font-black tracking-tighter">JOIN</div>
          </div>
          
          <div className="max-w-3xl mx-auto relative z-10">
            <h2 className="font-headline text-6xl md:text-9xl font-black uppercase tracking-tighter mb-10 leading-[0.8]">
              JOIN THE<br />MOVEMENT
            </h2>
            <p className="font-body text-xl md:text-2xl italic mb-16 text-neutral-600">
              Enter the archive. Receive transmissions on new drops and tactical updates.
            </p>
            
            <form onSubmit={handleSubscribe} className="relative max-w-xl mx-auto group">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="YOUR_EMAIL_ADDR"
                className="w-full bg-transparent border-b-4 border-black/10 p-8 font-headline text-xl focus:outline-none focus:border-black transition-all placeholder:text-black/20 uppercase tracking-widest"
                required
              />
              <button 
                type="submit"
                disabled={status === 'loading'}
                className="mt-8 w-full bg-black text-white p-6 font-headline font-black text-xl tracking-[0.3em] uppercase hover:bg-neutral-800 transition-all flex items-center justify-center gap-4 active:scale-[0.98]"
              >
                {status === 'loading' ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                    <Zap size={24} />
                  </motion.div>
                ) : status === 'success' ? (
                  "ENLISTED_SUCCESS"
                ) : (
                  "ENLIST NOW"
                )}
              </button>
            </form>

            <div className="mt-24 flex flex-wrap justify-center gap-12">
              {['INSTAGRAM', 'DISCORD', 'ARE.NA', 'TWITTER'].map(link => (
                <a key={link} href="#" className="font-headline text-xs tracking-[0.2em] font-bold hover:underline transition-all">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black py-20 px-6 md:px-16 border-t border-white/5">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="RUSTHAVEN Icon" className="w-8 h-8 object-contain mix-blend-screen opacity-70" />
              <div className="text-2xl font-black tracking-tighter text-white font-headline">RUSTHAVEN</div>
            </div>
            <p className="text-[10px] tracking-[0.3em] text-neutral-600 uppercase">© 2024 ARCHIVE OF RESISTANCE</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
            <div className="space-y-4">
              <h5 className="font-headline text-white text-[10px] tracking-widest font-black">NAVIGATE</h5>
              <div className="flex flex-col gap-2 font-headline text-[10px] text-neutral-500 uppercase tracking-widest">
                <a href="#" className="hover:text-white transition-colors">Shipment</a>
                <a href="#" className="hover:text-white transition-colors">Returns</a>
                <a href="#" className="hover:text-white transition-colors">Sizing</a>
              </div>
            </div>
            <div className="space-y-4">
              <h5 className="font-headline text-white text-[10px] tracking-widest font-black">LEGAL</h5>
              <div className="flex flex-col gap-2 font-headline text-[10px] text-neutral-500 uppercase tracking-widest">
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Ethics</a>
              </div>
            </div>
            <div className="space-y-4 hidden sm:block">
              <h5 className="font-headline text-white text-[10px] tracking-widest font-black">LOC</h5>
              <p className="font-headline text-[10px] text-neutral-700 uppercase tracking-widest">
                BERLIN_LAB_01<br />52.5200° N, 13.4050° E
              </p>
            </div>
          </div>
        </div>
      </footer>
      
      <style>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
    </div>
  );
}
