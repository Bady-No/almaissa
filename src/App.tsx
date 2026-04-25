/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import {
  ShoppingBag,
  Menu,
  X,
  Instagram,
  ArrowRight,
  Play,
  Plus,
  Upload,
  Check,
  MessageCircle,
  ChevronRight,
  ChevronLeft,
  Search,
  User,
  Heart,
  Share2,
  CreditCard,
  Wallet,
  ShieldCheck
} from 'lucide-react';

// --- Types ---
interface Abaya {
  id: number;
  name: string;
  collection: string;
  price: string;
  image: string;
  images?: string[];
  description?: string;
  sizes?: string[];
  status?: 'new arrival' | 'limited edition' | 'sold out' | string;
}

interface CartItem {
  cartId: string;
  id: number;
  name: string;
  price: string;
  image: string;
  size?: string;
  quantity: number;
}

interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
  city: string;
}

const WhatsAppOrderModal = ({
  isOpen,
  onClose,
  onConfirm,
  orderDetails
}: {
  isOpen: boolean,
  onClose: () => void,
  onConfirm: (info: CustomerInfo) => void,
  orderDetails: string
}) => {
  const [info, setInfo] = useState<CustomerInfo>({
    name: '',
    phone: '',
    address: '',
    city: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!info.name || !info.phone || !info.address || !info.city) {
      return;
    }
    onConfirm(info);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-matte-black/80 backdrop-blur-xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="relative bg-beige w-full max-w-3xl rounded-sm shadow-[0_30px_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row border border-gold/30"
          >
            {/* Left Side: Brand/Summary */}
            <div className="hidden md:flex md:w-2/5 bg-bordeaux p-10 flex-col justify-between text-cream relative overflow-hidden border-r border-gold/10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full -ml-32 -mb-32 blur-3xl" />

              <div className="relative z-10">
                <div className="mb-12">
                  <span className="text-[9px] uppercase tracking-[0.6em] text-gold font-bold block mb-4">Al Maissa Label</span>
                  <div className="h-px bg-gold/30 w-16 mb-8" />
                </div>

                <h3 className="text-4xl font-serif leading-tight mb-8 italic">
                  Refining <br />
                  <span className="text-gold not-italic font-special text-2xl tracking-widest uppercase block mt-2">Your Style.</span>
                </h3>

                <div className="space-y-6">
                  <p className="text-[11px] text-cream/70 leading-relaxed font-light tracking-wide max-w-[200px]">
                    Your selection is held for you. Complete these details to finalize your bespoke order.
                  </p>

                  <div className="pt-8 border-t border-gold/10">
                    <span className="text-[8px] uppercase tracking-[0.3em] text-gold/60 block mb-3">Order Summary</span>
                    <p className="text-xs font-serif italic text-cream/90">{orderDetails}</p>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-12">
                <div className="flex items-center gap-4 text-gold/80 group">
                  <div className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center group-hover:border-gold/50 transition-colors">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-widest font-bold block">Secure Checkout</span>
                    <span className="text-[8px] text-cream/40 uppercase tracking-tighter">Verified by Al Maissa</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="flex-1 p-8 md:p-14 bg-cream relative">
              {/* Decorative Frame */}
              <div className="absolute inset-4 border border-gold/5 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-12">
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.5em] text-gold font-bold block mb-3">Step 02 / Final</span>
                    <h3 className="text-4xl font-special text-bordeaux tracking-tight uppercase">Personal Details</h3>
                  </div>
                  <button onClick={onClose} className="text-bordeaux/20 hover:text-bordeaux transition-colors p-2 -mr-4">
                    <X size={24} strokeWidth={1} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="relative group">
                      <label className="text-[8px] uppercase tracking-[0.3em] text-gold font-bold block mb-2 transition-colors group-focus-within:text-bordeaux">Full Name</label>
                      <input
                        type="text"
                        required
                        value={info.name}
                        onChange={(e) => setInfo({ ...info, name: e.target.value })}
                        className="w-full bg-transparent border-b border-bordeaux/10 py-3 text-sm text-bordeaux focus:outline-none focus:border-gold transition-all placeholder:text-bordeaux/10 font-light"
                        placeholder="e.g. Sarah Ahmed"
                      />
                    </div>
                    <div className="relative group">
                      <label className="text-[8px] uppercase tracking-[0.3em] text-gold font-bold block mb-2 transition-colors group-focus-within:text-bordeaux">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={info.phone}
                        onChange={(e) => setInfo({ ...info, phone: e.target.value })}
                        className="w-full bg-transparent border-b border-bordeaux/10 py-3 text-sm text-bordeaux focus:outline-none focus:border-gold transition-all placeholder:text-bordeaux/10 font-light"
                        placeholder="+49 -- --- ----"
                      />
                    </div>
                  </div>

                  <div className="relative group">
                    <label className="text-[8px] uppercase tracking-[0.3em] text-gold font-bold block mb-2 transition-colors group-focus-within:text-bordeaux">City</label>
                    <input
                      type="text"
                      required
                      value={info.city}
                      onChange={(e) => setInfo({ ...info, city: e.target.value })}
                      className="w-full bg-transparent border-b border-bordeaux/10 py-3 text-sm text-bordeaux focus:outline-none focus:border-gold transition-all placeholder:text-bordeaux/10 font-light"
                      placeholder="e.g. Dubai, Abu Dhabi, Casablanca"
                    />
                  </div>

                  <div className="relative group">
                    <label className="text-[8px] uppercase tracking-[0.3em] text-gold font-bold block mb-2 transition-colors group-focus-within:text-bordeaux">Delivery Address</label>
                    <textarea
                      required
                      value={info.address}
                      onChange={(e) => setInfo({ ...info, address: e.target.value })}
                      className="w-full bg-transparent border-b border-bordeaux/10 py-3 text-sm text-bordeaux focus:outline-none focus:border-gold transition-all h-20 resize-none placeholder:text-bordeaux/10 font-light"
                      placeholder="Street, Building, Apartment No."
                    />
                  </div>

                  <div className="pt-8">
                    <button
                      type="submit"
                      className="w-full py-6 bg-bordeaux text-white uppercase text-[10px] tracking-[0.5em] font-display font-bold hover:bg-gold hover:text-bordeaux transition-all duration-700 flex items-center justify-center gap-4 group shadow-[0_20px_40px_rgba(74,14,14,0.2)]"
                    >
                      Complete via WhatsApp
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-bordeaux/10 transition-colors">
                        <MessageCircle size={16} className="group-hover:scale-110 transition-transform" />
                      </div>
                    </button>

                    <div className="flex items-center justify-center gap-4 mt-8 opacity-40">
                      <div className="h-px bg-bordeaux/20 flex-1" />
                      <span className="text-[8px] uppercase tracking-[0.4em] text-bordeaux font-bold whitespace-nowrap">Luxury Service Guaranteed</span>
                      <div className="h-px bg-bordeaux/20 flex-1" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- Mock Data ---
const COLLECTIONS = [
  { id: 4, name: "Stone Collection", image: "../images/heropic.jpg" },
  { id: 5, name: "Jellaba", image: "../images/pic1.jpeg" },
];

const SIGNATURE_ABAYAS: Abaya[] = [
  {
    id: 1,
    name: "Beige Essence Abaya",
    collection: "Stone Collection",
    price: "74,99€",
    image: "../images/abaya-beige11.jpg",
    images: [
      "../images/abaya-beige11.jpg",
      "../images/abaya-beige1.jpg",
      "../images/abaya-beige111.jpg"
    ],
    status: "limited edition",
    description: "A structured piece in slate gray, evoking the strength and calmness of natural stone.",
    sizes: [" one size "]
  },
   {
    id: 2,
    name: "Sahara mint Jellaba",
    collection: "Jellaba",
    price: "89,99€",
    image: "../images/pic1.jpeg",
    status: "new arrival",
    images: [
      "../images/pic1.jpeg",
      "../images/pic11.jpeg",
      "../images/pic111.jpeg"
    ],
    description: "Elegant and effortlessly chic. This nude jellaba with soft mint details features a flowy silhouette and lightweight fabric for all-day comfort.Perfect for both everyday wear and special occasions ",
    sizes: ["S / M", "M / L"]
  },
  {
    id: 3,
    name: "Black Abaya",
    collection: "Stone Collection",
    price: "74,99€",
    image: "../images/black1.jpeg",
    images: [
      "./images/black1.jpeg",
      "./images/black11.jpeg",
      "./images/black111.jpeg"
    ],
    status: "limited edition",
    description: "Elegant black abaya with a soft, flowy fit. Designed with subtle sleeve detailing for a refined, minimalist looka timeless essential, perfect for everyday wear or special occasions.",
    sizes: ["one size"]
  },
  {
    id: 4,
    name: "Sage Elégance Jellaba",
    collection: "Jellaba",
    price: "89,99€",
    image: "../images/pic2.jpeg",
    images: [
      "../images/pic2.jpeg",
      "../images/pic22.jpeg",
      "../images/pic222.jpeg"
    ],
    status: "new arrival",
    description: "Timeless and refined. This soft sage-toned jellaba with delicate cream details features a flowy silhouette and lightweight fabric for an effortlessly elegant look.Perfect for both everyday wear and special occasions ",
    sizes: ["S / M", "M / L"]
  },
  {
    id: 5,
    name: "Signature Burgundy Abaya",
    collection: "Stone Collection",
    price: "74,99€",
    image: "../images/red1.jpeg",
    images: [
      "../images/red1.jpeg",
      "../images/red11.jpeg",
      "../images/red111.jpeg"
    ],
    status: "limited edition",
    description: "Elegant burgundy abaya with a soft, flowy fit. Designed with subtle sleeve detailing for a refined, minimalist lookour signature colour, perfect for everyday wear or special occasions",
    sizes: ["one size"]
  },
  {
    id: 6,
    name: "Darkbrown abaya ",
    collection: "Stone Collection",
    price: "74,99€",
    image: "../images/brown1.jpeg",
    images: [
      "../images/brown1.jpeg",
      "../images/brown11.jpeg",
      "../images/brown111.jpeg"
    ],
    status: "sold out",
    description: "Elegant burgundy abaya with a soft, flowy fit. Designed with subtle sleeve detailing for a refined, minimalist lookour signature colour, perfect for everyday wear or special occasions",
    sizes: ["one size"]
  },
  {
    id: 7,
    name: "Sahara Sunset Jellaba",
    collection: "Jellaba",
    price: "89,99€",
    image: "../images/pic3.jpeg",
    images: [
      "../images/pic3.jpeg",
      "../images/pic33.jpeg",
      "../images/pic333.jpeg"
    ],
    status: "new arrival",
    description: "Bold and elegant. This black jellaba with warm sunset-toned details features a flowy silhouette and lightweight fabric for a striking, refined look.Perfect for both everyday wear and special occasions ",
    sizes: ["S / M", "M / L"]
  },
  {
    id: 8,
    name: "Velvet Rouge Jellaba",
    collection: "Jellaba",
    price: "89,99€",
    image: "../images/pic4.jpeg",
    images: [
      "../images/pic4.jpeg",
      "../images/pic44.jpeg",
      "../images/pic444.jpeg"
    ],
    status: "new arrival",
    description: "A bold expression of elegance. This deep burgundy jellaba with soft rose details features a flowy silhouette and lightweight fabric for a luxurious, feminine look.Perfect for both everyday wear and special occasions.",
    sizes: ["S / M", "M / L"]
  },
];

const LOOKBOOK_IMAGES = [
  "../images/red111.jpeg",
  "../images/pic3.jpeg",
  "../images/pic1.jpeg",
];

// --- Components ---

const Navbar = ({ cartCount, onOpenCart, onViewChange, currentView }: {
  cartCount: number,
  onOpenCart: () => void,
  onViewChange: (view: 'home' | 'shop' | 'cart' | 'story' | 'contact') => void,
  currentView: 'home' | 'shop' | 'cart' | 'story' | 'contact'
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 px-6 py-2 ${isScrolled || currentView !== 'home' ? 'bg-white/70 backdrop-blur-xl py-1 border-b border-bordeaux/5 shadow-[0_10px_40px_-15px_rgba(45,10,10,0.1)]' : 'bg-bordeaux/50 backdrop-blur-md'}`}>
      <div className={`absolute bottom-0 left-0 w-full h-12 translate-y-full bg-gradient-to-b from-white/20 to-transparent backdrop-blur-sm pointer-events-none transition-opacity duration-700 ${isScrolled || currentView !== 'home' ? 'opacity-100' : 'opacity-0'}`}></div>
      <div className="max-w-7xl mx-auto flex items-center justify-between relative z-10">
        <div className={`flex-1 hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-display font-light ${isScrolled || currentView !== 'home' ? 'text-bordeaux/60' : 'text-white/80'}`}>
          <button onClick={() => onViewChange('home')} className={`hover:text-gold transition-colors ${currentView === 'home' ? 'text-gold font-bold' : ''}`}>Home</button>
          <button onClick={() => onViewChange('shop')} className={`hover:text-gold transition-colors ${currentView === 'shop' ? 'text-gold font-bold' : ''}`}>Shop</button>
          <button onClick={() => onViewChange('contact')} className={`hover:text-gold transition-colors ${currentView === 'contact' ? 'text-gold font-bold' : ''}`}>Contact Us</button>
          <button onClick={() => onViewChange('story')} className={`hover:text-gold transition-colors ${currentView === 'story' ? 'text-gold font-bold' : ''}`}>Our Story</button>
        </div>

        <div className="flex-1 flex justify-center">
          <button onClick={() => onViewChange('home')} className="h-16 md:h-24 transition-transform duration-500 hover:scale-105">
            <img
              src="../images/logo1.png"
              alt=""
              className="h-full w-auto object-contain brightness-110"
              referrerPolicy="no-referrer"
            />
          </button>
        </div>

        <div className={`flex-1 flex items-center justify-end gap-3 md:gap-8 ${isScrolled || currentView !== 'home' ? 'text-bordeaux/60' : 'text-white/80'}`}>
          <button className="hidden md:block hover:text-gold transition-colors">
            <Search size={18} strokeWidth={1.5} />
          </button>
          
          <button 
            onClick={() => onViewChange('cart')} 
            className={`relative flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full border border-current/10 hover:border-gold hover:text-gold transition-all duration-500 ${currentView === 'cart' ? 'text-gold border-gold' : ''}`}
          >
            <ShoppingBag size={18} strokeWidth={1.5} />
            {cartCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-bordeaux text-white text-[7px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-beige shadow-sm"
              >
                {cartCount}
              </motion.span>
            )}
          </button>

          <button 
            onClick={() => setIsMenuOpen(true)} 
            className="md:hidden flex items-center gap-2 group"
          >
            <div className="flex flex-col items-end">
              <span className="text-[7px] uppercase tracking-[0.2em] font-display text-bordeaux/40 group-hover:text-gold transition-colors leading-none mb-0.5">Explore</span>
              <span className="text-[9px] uppercase tracking-[0.3em] font-display font-bold text-current group-hover:text-gold transition-colors leading-none">Menu</span>
            </div>
            <div className="w-9 h-9 rounded-full border border-current/20 flex flex-col items-center justify-center gap-1 group-hover:border-gold group-hover:text-gold transition-all duration-500">
              <div className="w-4 h-[1px] bg-current transition-all group-hover:bg-gold" />
              <div className="w-3 h-[1px] bg-current transition-all group-hover:bg-gold translate-x-[2px]" />
              <div className="w-4 h-[1px] bg-current transition-all group-hover:bg-gold" />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex flex-col md:hidden"
            style={{ backgroundColor: '#F5F2ED', height: '100dvh', width: '100vw' }}
          >
            {/* Header Area */}
            <div className="flex items-center justify-between p-6 bg-white border-b border-bordeaux/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-gold flex items-center justify-center">
                  <span className="text-xs font-serif text-bordeaux font-bold">AM</span>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] font-display text-bordeaux/40 leading-none mb-1">Label</p>
                  <p className="text-[11px] uppercase tracking-[0.4em] font-display text-bordeaux font-bold leading-none">Al Maissa</p>
                </div>
              </div>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="w-12 h-12 rounded-full bg-bordeaux/5 flex items-center justify-center text-bordeaux active:scale-95 transition-all"
              >
                <X size={24} strokeWidth={1} />
              </button>
            </div>

            {/* Links Area */}
            <div className="flex-1 overflow-y-auto px-8 py-10 flex flex-col justify-start mt-4">
              {[
                { name: 'Home', view: 'home', number: '01' },
                { name: 'Our Collections', view: 'shop', number: '02' },
                { name: 'The Studio', view: 'story', number: '03' },
                { name: 'Your Bag', view: 'cart', number: '04' },
                { name: 'Get In Touch', view: 'contact', number: '05' }
              ].map((item, i) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + (i * 0.05) }}
                  className="group flex items-center justify-between w-full py-6 border-b border-bordeaux/5 text-left"
                  onClick={() => {
                    onViewChange(item.view as any);
                    setIsMenuOpen(false);
                  }}
                >
                  <div className="flex items-center gap-6">
                    <span className="text-[9px] font-display text-gold/60 font-bold tracking-[0.3em] group-hover:text-gold transition-colors">
                      {item.number}
                    </span>
                    <span className="text-xl md:text-2xl font-serif text-bordeaux group-hover:text-gold group-hover:italic transition-all duration-500 tracking-wide">
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500">
                    <span className="text-[8px] uppercase tracking-widest text-gold font-bold">Explore</span>
                    <ArrowRight size={14} className="text-gold" />
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Footer Area */}
            <div className="p-8 bg-white border-t border-bordeaux/5">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                  <p className="text-[8px] uppercase tracking-[0.4em] text-gold font-bold">Social Media</p>
                  <div className="flex flex-col gap-2">
                    <a href="https://www.instagram.com/almaissa.label?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-bordeaux/50 hover:text-gold transition-all">
                      <Instagram size={12} />
                      Instagram
                    </a>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-[8px] uppercase tracking-[0.4em] text-gold font-bold">Assistance</p>
                  <div className="flex flex-col gap-2">
                    <a href="https://wa.me/49 162 6126283" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-bordeaux/50 hover:text-gold transition-all">
                      <MessageCircle size={12} />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 pt-8 border-t border-bordeaux/5 flex justify-between items-center opacity-30">
                <p className="text-[7px] uppercase tracking-[0.5em] text-bordeaux font-bold">Al Maissa Label</p>
                <p className="text-[7px] uppercase tracking-[0.4em] text-bordeaux">&copy; 2024</p>
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-[-1] opacity-[0.02]">
              <span className="text-[50vw] font-serif text-bordeaux absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-12">AM</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onViewChange }: { onViewChange: (view: string) => void }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Inner shadow for overall shading */}
      <div className="absolute inset-0 z-10 pointer-events-none shadow-[inset_0_0_100px_rgba(74,14,14,0.1)]"></div>

      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <img
          src="../images/heropic.jpg"
          alt="Luxury Abaya"
          className="w-full h-full object-cover brightness-[0.85]"
          referrerPolicy="no-referrer"
        />
        {/* Top shading for depth and navbar legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-bordeaux/50 via-transparent to-transparent h-1/2"></div>
        {/* Bottom fade to white */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
      </motion.div>

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ opacity }}
        >
          <span className="text-[10px] md:text-xs uppercase tracking-[0.5em] font-display text-gold mb-6 block">
            Couture Modesty
          </span>
          <h1 className="text-5xl md:text-8xl font-sans font-bold mb-8 leading-[1.1] tracking-tight text-white">
            Al Maissa <span className="text-bordeaux">Label</span>
          </h1>
          <p className="text-base md:text-xl font-sans text-white/70 max-w-2xl mx-auto mb-12">
            Redefining modest elegance through artisanal craftsmanship.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <button
              onClick={() => onViewChange('shop')}
              className="px-12 py-5 bg-bordeaux text-white uppercase text-[10px] tracking-[0.3em] font-display font-semibold hover:bg-gold transition-all duration-700 gold-glow"
            >
              Explore Collection
            </button>
            <button
              onClick={() => onViewChange('story')}
              className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-display text-white/80 hover:text-gold transition-colors"
            >
              Our Story <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-bordeaux/30">Scroll to Discover</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gold/50 to-transparent"></div>
      </motion.div>
    </section>
  );
};

const ProductModal = ({ abaya, allAbayas, viewHistory, isOpen, onClose, onAddToCart, onSelectAbaya }: {
  abaya: Abaya,
  allAbayas: Abaya[],
  viewHistory: number[],
  isOpen: boolean,
  onClose: () => void,
  onAddToCart: (item: CartItem) => void,
  onSelectAbaya: (abaya: Abaya) => void,
  key?: React.Key
}) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const productImages = abaya.images || [abaya.image];

  useEffect(() => {
    setSelectedSize(null);
    setQuantity(1);
    setCurrentImageIndex(0);
    setIsWhatsAppModalOpen(false);
    setAddedToCart(false);
    setIsWishlisted(false);
  }, [abaya.id]);

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  const handleAddToCart = () => {
    onAddToCart({
      cartId: `${abaya.id}-${selectedSize || 'no-size'}`,
      id: abaya.id,
      name: abaya.name,
      price: abaya.price,
      image: abaya.image,
      size: selectedSize || undefined,
      quantity: quantity
    });
    onClose();
  };

  const handleAddToCartAnimated = () => {
    setAddedToCart(true);
    setTimeout(() => {
      handleAddToCart();
    }, 900);
  };

  const handleWhatsAppOrder = () => setIsWhatsAppModalOpen(true);

  const confirmWhatsAppOrder = (customerInfo: CustomerInfo) => {
    const message = `Hello Al Maissa Label, I would like to order:\n---\nProduct: ${abaya.name}\nCollection: ${abaya.collection}\n${selectedSize ? `Size: ${selectedSize}` : 'Size: Not specified'}\nQuantity: ${quantity}\nPrice: ${abaya.price}\n---\nCustomer Details:\nName: ${customerInfo.name}\nPhone: ${customerInfo.phone}\nCity: ${customerInfo.city}\nAddress: ${customerInfo.address}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/491626126283?text=${encodedMessage}`, '_blank');
    setIsWhatsAppModalOpen(false);
  };

  const handleShare = async () => {
    const shareData = {
      title: `Al Maissa Label — ${abaya.name}`,
      text: `Discover the ${abaya.name} from Al Maissa Label's ${abaya.collection}.`,
      url: window.location.href,
    };
    try {
      if (navigator.share) await navigator.share(shareData);
      else { await navigator.clipboard.writeText(window.location.href); alert('Link copied!'); }
    } catch (err) { console.error(err); }
  };

  const suggestions = allAbayas
    .filter(a => a.id !== abaya.id)
    .sort((a, b) => {
      if (a.collection === abaya.collection && b.collection !== abaya.collection) return -1;
      if (a.collection !== abaya.collection && b.collection === abaya.collection) return 1;
      const aH = viewHistory.indexOf(a.id), bH = viewHistory.indexOf(b.id);
      if (aH !== -1 && bH === -1) return -1;
      if (aH === -1 && bH !== -1) return 1;
      if (aH !== -1 && bH !== -1) return aH - bH;
      return 0;
    })
    .slice(0, 4);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
          {/* Cinematic Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-matte-black/82 backdrop-blur-2xl"
          />

          {/* ═══ MAIN MODAL ═══ */}
          <motion.div
            initial={{ opacity: 0, y: 48, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.97 }}
            transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[1080px] flex flex-col bg-cream overflow-hidden"
            style={{
              borderRadius: '2px',
              maxHeight: 'calc(100dvh - 20px)',
              boxShadow: '0 40px 130px rgba(0,0,0,0.7), 0 0 0 1px rgba(74,14,14,0.08)'
            }}
          >
            {/* Film grain texture */}
            <div
              className="absolute inset-0 pointer-events-none z-0 opacity-[0.018]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat',
                backgroundSize: '150px'
              }}
            />

            {/* ─── TOP BRAND BAR ─── */}
            <div className="relative z-20 flex items-center justify-between px-5 md:px-8 py-3 border-b border-bordeaux/8 bg-cream shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-[7px] md:text-[8px] uppercase tracking-[0.55em] text-gold font-bold font-display">Al Maissa</span>
                <span className="w-[3px] h-[3px] rounded-full bg-bordeaux/20" />
                <span className="hidden sm:block text-[7px] uppercase tracking-[0.35em] text-bordeaux/40 font-display">{abaya.collection}</span>
              </div>
              <div className="flex items-center gap-1 md:gap-3">
                {/* Wishlist */}
                <button
                  onClick={() => setIsWishlisted(v => !v)}
                  className="flex items-center gap-1.5 text-bordeaux/40 hover:text-bordeaux transition-colors px-2 py-2 group/wish"
                >
                  <motion.div animate={isWishlisted ? { scale: [1, 1.5, 1] } : {}} transition={{ duration: 0.35 }}>
                    <Heart
                      size={15}
                      strokeWidth={1.5}
                      className={`transition-all ${isWishlisted ? 'fill-bordeaux text-bordeaux' : 'group-hover/wish:scale-110'}`}
                    />
                  </motion.div>
                  <span className="hidden md:block text-[7px] uppercase tracking-[0.25em] font-display">Save</span>
                </button>
                {/* Share */}
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 text-bordeaux/40 hover:text-bordeaux transition-colors px-2 py-2"
                >
                  <Share2 size={15} strokeWidth={1.5} />
                  <span className="hidden md:block text-[7px] uppercase tracking-[0.25em] font-display">Share</span>
                </button>
                <div className="w-px h-4 bg-bordeaux/12 mx-1" />
                {/* Close */}
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center text-bordeaux/40 hover:text-bordeaux transition-all hover:rotate-90 duration-300"
                >
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* ─── SCROLLABLE BODY ─── */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden">

              {/* ══ SPLIT LAYOUT ══ */}
              <div className="flex flex-col md:flex-row">

                {/* ── LEFT: Image Gallery ── */}
                <div className="md:w-[52%] flex md:flex-row shrink-0" style={{ minHeight: '300px' }}>

                  {/* Thumbnail strip — desktop */}
                  <div
                    className="hidden md:flex flex-col gap-1.5 p-2 bg-beige/70 border-r border-bordeaux/8 overflow-y-auto shrink-0"
                    style={{ width: '66px' }}
                  >
                    {productImages.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentImageIndex(i)}
                        className="relative shrink-0 overflow-hidden"
                        style={{ aspectRatio: '3/4', borderRadius: '1px' }}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                        {/* Active indicator */}
                        <motion.div
                          animate={{ opacity: currentImageIndex === i ? 1 : 0 }}
                          className="absolute inset-0 border-[2px] border-bordeaux"
                        />
                        {/* Inactive overlay */}
                        {currentImageIndex !== i && (
                          <div className="absolute inset-0 bg-white/45 hover:bg-white/20 transition-colors" />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Main Image */}
                  <div className="flex-1 relative overflow-hidden group/mainimg" style={{ maxHeight: '580px' }}>
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentImageIndex}
                        src={productImages[currentImageIndex]}
                        alt={`${abaya.name} — ${currentImageIndex + 1}`}
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full h-full object-cover object-top transition-transform duration-[3.5s] ease-out group-hover/mainimg:scale-[1.05]"
                        style={{ minHeight: '300px', maxHeight: '580px' }}
                      />
                    </AnimatePresence>

                    {/* Bottom vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-matte-black/38 via-transparent to-transparent pointer-events-none" />

                    {/* Prev / Next */}
                    {productImages.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/14 backdrop-blur-md border border-white/22 flex items-center justify-center text-white hover:bg-white/32 transition-all opacity-0 group-hover/mainimg:opacity-100 duration-300"
                        >
                          <ChevronLeft size={17} />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/14 backdrop-blur-md border border-white/22 flex items-center justify-center text-white hover:bg-white/32 transition-all opacity-0 group-hover/mainimg:opacity-100 duration-300"
                        >
                          <ChevronRight size={17} />
                        </button>
                      </>
                    )}

                    {/* Collection badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1.5 bg-bordeaux text-white text-[7px] uppercase tracking-[0.45em] font-display font-bold">
                        {abaya.collection}
                      </span>
                    </div>

                    {/* Mobile dot nav */}
                    {productImages.length > 1 && (
                      <div className="md:hidden absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                        {productImages.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setCurrentImageIndex(i)}
                            className={`rounded-full transition-all duration-300 ${
                              currentImageIndex === i ? 'w-5 h-[5px] bg-white' : 'w-[5px] h-[5px] bg-white/45'
                            }`}
                          />
                        ))}
                      </div>
                    )}

                    {/* Image counter */}
                    <div className="hidden md:block absolute bottom-4 right-4 z-10">
                      <span className="text-[8px] text-white/55 font-display tracking-widest tabular-nums">
                        {String(currentImageIndex + 1).padStart(2, '0')} / {String(productImages.length).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ── RIGHT: Details Panel ── */}
                <div className="md:w-[48%] flex flex-col px-7 md:px-10 py-8 md:py-10 gap-5">

                  {/* ① Brand + Name */}
                  <div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 }}
                      className="flex items-center gap-3 mb-3"
                    >
                      <div className="h-px w-5 bg-gold/60" />
                      <span className="text-[7px] uppercase tracking-[0.65em] text-gold font-bold font-display">
                        {abaya.collection}
                      </span>
                    </motion.div>

                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.13 }}
                      className="font-serif text-bordeaux leading-[1.18] mb-4"
                      style={{ fontSize: 'clamp(1.6rem, 3vw, 2.1rem)', fontStyle: 'italic' }}
                    >
                      {abaya.name}
                    </motion.h2>

                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.22, duration: 0.7 }}
                      className="h-px origin-left"
                      style={{ background: 'linear-gradient(to right, rgba(212,175,55,0.5), transparent)' }}
                    />
                  </div>

                  {/* ② Price */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.18 }}
                    className="flex items-baseline gap-4 flex-wrap"
                  >
                    <span className="font-serif text-bordeaux" style={{ fontSize: '1.8rem', letterSpacing: '-0.01em' }}>
                      {abaya.price}
                    </span>
                    {quantity > 1 && (
                      <span className="text-xs text-bordeaux/40 font-display">
                        × {quantity}
                      </span>
                    )}
                    <span
                      className="ml-auto text-[7px] uppercase tracking-[0.3em] text-gold font-display font-bold px-2.5 py-1 border border-gold/28"
                      style={{ background: 'rgba(212,175,55,0.07)' }}
                    >
                      Free Delivery
                    </span>
                  </motion.div>

                  {/* ③ Description */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.22 }}
                    className="text-[12.5px] text-bordeaux/62 leading-[1.95] font-serif"
                    style={{ fontStyle: 'italic' }}
                  >
                    {abaya.description || 'Handcrafted with the finest materials, this piece embodies the essence of Al Maissa Label\'s commitment to luxury and modest elegance.'}
                  </motion.p>

                  <div className="h-px bg-bordeaux/7" />

                  {/* ④ Size Selector */}
                  {abaya.sizes && abaya.sizes.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.27 }}
                    >
                      <div className="flex items-center justify-between mb-3.5">
                        <span className="text-[8px] uppercase tracking-[0.45em] text-bordeaux/50 font-display font-bold">
                          Select Size
                        </span>
                        <button className="text-[8px] uppercase tracking-[0.2em] text-gold font-display underline underline-offset-2 hover:text-bordeaux transition-colors">
                          Size Guide
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2.5">
                        {abaya.sizes.map(size => (
                          <motion.button
                            key={size}
                            onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                            whileTap={{ scale: 0.93 }}
                            className={`relative px-4 py-3 text-[9px] uppercase tracking-[0.25em] font-display font-bold border transition-all duration-300 flex items-center gap-2 ${
                              selectedSize === size
                                ? 'bg-bordeaux text-white border-bordeaux'
                                : 'bg-transparent text-bordeaux border-bordeaux/20 hover:border-bordeaux/55'
                            }`}
                            style={selectedSize === size ? { boxShadow: '0 6px 22px rgba(74,14,14,0.22)' } : {}}
                          >
                            {size}
                            {selectedSize === size && (
                              <motion.span
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="w-3.5 h-3.5 rounded-full bg-white/22 flex items-center justify-center"
                              >
                                <Check size={8} />
                              </motion.span>
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* ⑤ Quantity */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.32 }}
                    className="flex items-center gap-5"
                  >
                    <span className="text-[8px] uppercase tracking-[0.45em] text-bordeaux/50 font-display font-bold">Qty</span>
                    <div className="flex items-center border border-bordeaux/15">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 flex items-center justify-center text-bordeaux/60 hover:text-bordeaux hover:bg-bordeaux/5 transition-all border-r border-bordeaux/15 text-xl font-light"
                      >
                        −
                      </button>
                      <span className="w-11 text-center text-sm font-display text-bordeaux font-semibold tabular-nums">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center text-bordeaux/60 hover:text-bordeaux hover:bg-bordeaux/5 transition-all border-l border-bordeaux/15 text-xl font-light"
                      >
                        +
                      </button>
                    </div>
                  </motion.div>

                  {/* ⑥ CTA Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.38 }}
                    className="space-y-3"
                  >
                    {/* Primary — Add to Bag */}
                    <button
                      disabled={abaya.status === 'sold out'}
                      onClick={abaya.status === 'sold out' ? undefined : handleAddToCartAnimated}
                      className={`w-full py-[1.1rem] relative overflow-hidden flex items-center justify-center gap-3 uppercase text-[9px] tracking-[0.52em] font-display font-bold transition-colors duration-700 ${
                        abaya.status === 'sold out'
                          ? 'bg-gray-300 text-gray-500 opacity-50 cursor-not-allowed'
                          : 'group/ctabag bg-bordeaux text-white hover:bg-matte-black'
                      }`}
                    >
                      <AnimatePresence mode="wait">
                        {abaya.status === 'sold out' ? (
                          <motion.span
                            key="soldout"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className="flex items-center gap-2"
                          >
                            Out of Stock
                          </motion.span>
                        ) : addedToCart ? (
                          <motion.span
                            key="added"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className="flex items-center gap-2"
                          >
                            <Check size={13} strokeWidth={2.5} />
                            Added to Bag
                          </motion.span>
                        ) : (
                          <motion.span
                            key="add"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className="flex items-center gap-3"
                          >
                            <ShoppingBag size={13} strokeWidth={2} />
                            Add to Bag
                          </motion.span>
                        )}
                      </AnimatePresence>
                      {/* shimmer — only when active */}
                      {abaya.status !== 'sold out' && (
                        <span className="absolute inset-0 -translate-x-full group-hover/ctabag:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-[1.1s]" />
                      )}
                    </button>

                    {/* Secondary — WhatsApp */}
                    <button
                      disabled={abaya.status === 'sold out'}
                      onClick={abaya.status === 'sold out' ? undefined : handleWhatsAppOrder}
                      className={`w-full py-4 border uppercase text-[9px] tracking-[0.42em] font-display font-bold flex items-center justify-center gap-3 transition-all duration-500 ${
                        abaya.status === 'sold out'
                          ? 'border-gray-300 text-gray-400 opacity-50 cursor-not-allowed'
                          : 'group/ctawa border-bordeaux/25 text-bordeaux hover:bg-bordeaux hover:text-white hover:border-bordeaux'
                      }`}
                    >
                      <MessageCircle
                        size={13}
                        strokeWidth={1.5}
                        className={abaya.status !== 'sold out' ? 'group-hover/ctawa:scale-110 transition-transform' : ''}
                      />
                      {abaya.status === 'sold out' ? 'Out of Stock' : 'Order via WhatsApp'}
                    </button>
                  </motion.div>

                  {/* ⑦ Trust Strip */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.44 }}
                    className="grid grid-cols-3 gap-2 py-4 border-y border-bordeaux/8"
                  >
                    {[
                      { icon: <ShieldCheck size={13} strokeWidth={1.5} />, top: 'Secure', btm: 'Payment' },
                      { icon: <Check size={13} strokeWidth={2.2} />, top: 'Handcrafted', btm: 'Quality' },
                      { icon: <MessageCircle size={13} strokeWidth={1.5} />, top: 'Direct', btm: 'From Label' },
                    ].map(item => (
                      <div key={item.top} className="flex flex-col items-center gap-1.5 text-center">
                        <div className="w-7 h-7 rounded-full border border-bordeaux/12 flex items-center justify-center text-gold">
                          {item.icon}
                        </div>
                        <p className="text-[7px] uppercase tracking-[0.22em] font-display font-bold text-bordeaux leading-none">{item.top}</p>
                        <p className="text-[6px] uppercase tracking-wider text-bordeaux/35 font-display leading-none">{item.btm}</p>
                      </div>
                    ))}
                  </motion.div>

                  {/* ⑧ Payment Methods */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <p className="text-[7px] uppercase tracking-[0.42em] text-bordeaux/35 font-display mb-2.5">
                      Accepted Payments
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {[
                        { icon: <CreditCard size={12} />, label: 'Bank Transfer' },
                        { icon: <Wallet size={12} />, label: 'PayPal' },
                      ].map(m => (
                        <div
                          key={m.label}
                          className="flex items-center gap-1.5 px-3 py-2 bg-white border border-bordeaux/8"
                        >
                          <span className="text-bordeaux/40">{m.icon}</span>
                          <span className="text-[7px] uppercase tracking-wider font-display text-bordeaux/50 font-bold">{m.label}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* ── YOU MAY ALSO LOVE ── */}
              <div className="border-t border-bordeaux/10 bg-beige/45 px-7 md:px-10 py-7">
                <div className="flex items-center gap-5 mb-5">
                  <div className="h-px bg-bordeaux/10 flex-1" />
                  <span className="text-[7px] uppercase tracking-[0.65em] text-bordeaux/35 font-display font-bold whitespace-nowrap">
                    You May Also Love
                  </span>
                  <div className="h-px bg-bordeaux/10 flex-1" />
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {suggestions.map((s, i) => (
                    <motion.button
                      key={s.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.07 * i }}
                      onClick={() => onSelectAbaya(s)}
                      className="group/sug text-left"
                    >
                      <div className="aspect-[3/4] overflow-hidden mb-2 relative" style={{ borderRadius: '1px' }}>
                        <img
                          src={s.image}
                          alt={s.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/sug:scale-110"
                        />
                        <div className="absolute inset-0 bg-bordeaux/0 group-hover/sug:bg-bordeaux/10 transition-colors duration-500" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/sug:opacity-100 transition-opacity duration-300">
                          <span className="text-[7px] uppercase tracking-[0.3em] text-white font-display font-bold bg-bordeaux/65 px-2 py-1 backdrop-blur-sm">
                            View
                          </span>
                        </div>
                      </div>
                      <p className="text-[8px] font-serif text-bordeaux leading-tight group-hover/sug:text-gold transition-colors duration-300 truncate">
                        {s.name}
                      </p>
                      <p className="text-[7px] text-gold font-display mt-0.5">{s.price}</p>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      <WhatsAppOrderModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        onConfirm={confirmWhatsAppOrder}
        orderDetails={`${abaya.name} (${selectedSize}) x ${quantity}`}
      />
    </AnimatePresence>
  );
};

const ProductCard = ({ abaya, onAddToCart, onOpenModal }: { abaya: Abaya, onAddToCart: (item: CartItem) => void, onOpenModal: (abaya: Abaya) => void, key?: React.Key }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const productImages = abaya.images || [abaya.image];

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  const handleQuickAdd = (size: string) => {
    onAddToCart({
      cartId: `${abaya.id}-${size}`,
      id: abaya.id,
      name: abaya.name,
      price: abaya.price,
      image: abaya.image,
      size: size,
      quantity: 1
    });
    setShowQuickAdd(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowQuickAdd(false);
      }}
      onClick={() => onOpenModal(abaya)}
      className="group relative cursor-pointer"
    >
      <div className="aspect-[3/4] overflow-hidden bg-cream relative rounded-sm shadow-sm group-hover:shadow-2xl transition-all duration-1000">
        {/* Floating Badge */}
        {abaya.status && (
          <div className="absolute top-4 left-4 z-10">
            <span
              className={`px-3 py-1 backdrop-blur-md text-[8px] uppercase tracking-[0.2em] font-display font-bold rounded-full border ${
                abaya.status === 'sold out'
                  ? 'bg-red-600 text-white border-red-800/40 animate-pulse shadow-[0_0_12px_rgba(220,38,38,0.5)]'
                  : 'bg-white/90 text-bordeaux border-bordeaux/5'
              }`}
            >
              {abaya.status}
            </span>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={productImages[currentImageIndex]}
            alt={abaya.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110 ${
              abaya.status === 'sold out' ? 'grayscale opacity-50' : ''
            }`}
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>

        {productImages.length > 1 && isHovered && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-all z-30"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-all z-30"
            >
              <ChevronRight size={14} />
            </button>
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
              {productImages.map((_, i) => (
                <div
                  key={i}
                  className={`w-1 h-1 rounded-full transition-all ${currentImageIndex === i ? 'bg-white w-3' : 'bg-white/40'}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-bordeaux/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            // Wishlist logic here if any
          }}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-bordeaux/40 hover:text-red-500 transition-all duration-500 opacity-0 group-hover:opacity-100 transform translate-y-[-10px] group-hover:translate-y-0 z-30"
        >
          <Heart size={18} strokeWidth={1.5} />
        </button>

        {/* Quick Actions Container */}
        <div className="absolute inset-x-4 bottom-4 z-20 overflow-hidden rounded-sm">
          <AnimatePresence mode="wait">
            {isHovered && (
              <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                exit={{ y: 100 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="bg-white/95 backdrop-blur-md shadow-xl"
              >
                {!showQuickAdd ? (
                  <div className="flex flex-col">
                    <button
                      disabled={abaya.status === 'sold out'}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowQuickAdd(true);
                      }}
                      className={`w-full py-4 uppercase text-[9px] tracking-[0.3em] font-display font-bold flex items-center justify-center gap-2 transition-all duration-500 ${
                        abaya.status === 'sold out'
                          ? 'text-red-400 opacity-50 cursor-not-allowed'
                          : 'text-bordeaux hover:bg-gold hover:text-white'
                      }`}
                    >
                      {abaya.status === 'sold out' ? 'Out of Stock' : <><Plus size={12} /> Quick Add</>}
                    </button>
                  </div>
                ) : (
                  <div className="p-4" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[8px] uppercase tracking-widest text-bordeaux/40 font-bold">Select Size (Optional)</span>
                      <button onClick={() => setShowQuickAdd(false)} className="text-bordeaux/40 hover:text-bordeaux"><X size={12} /></button>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {(abaya.sizes || ['52', '54', '56']).map(size => (
                        <button
                          key={size}
                          onClick={() => handleQuickAdd(size)}
                          className="py-2 border border-bordeaux/10 text-[10px] font-display text-bordeaux hover:bg-bordeaux hover:text-white transition-all duration-300 rounded-sm"
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => handleQuickAdd('Standard')}
                      className="w-full py-2 bg-bordeaux/5 text-bordeaux uppercase text-[8px] tracking-widest font-bold hover:bg-bordeaux hover:text-white transition-all duration-500 rounded-sm"
                    >
                      Add without size
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold mb-2 font-display">{abaya.collection}</p>
        <h3 className="text-lg md:text-xl font-serif text-bordeaux mb-2 group-hover:text-gold transition-colors duration-500">{abaya.name}</h3>
        <p className="text-sm font-display text-bordeaux/60 tracking-widest">{abaya.price}</p>
      </div>
    </motion.div>
  );
};

const CartDrawer = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }: {
  isOpen: boolean,
  onClose: () => void,
  cartItems: CartItem[],
  onUpdateQuantity: (id: string, delta: number) => void,
  onRemoveItem: (id: string) => void
}) => {
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const parsePrice = (priceStr: string): number =>
    parseFloat(priceStr.replace(',', '.').replace(/[^0-9.]/g, '')) || 0;

  const formatPrice = (amount: number): string =>
    `${amount.toFixed(2).replace('.', ',')}€`;

  const totalPrice = cartItems.reduce((acc, item) =>
    acc + parsePrice(item.price) * item.quantity, 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setIsWhatsAppModalOpen(true);
  };

  const confirmWhatsAppOrder = (customerInfo: CustomerInfo) => {
    const itemsList = cartItems.map(item => `- ${item.name} (${item.size}) x ${item.quantity} - ${item.price}`).join('\n');
    const message = `Hello Al Maissa Label, I would like to place an order:
---
Order Details:
${itemsList}

Total: ${formatPrice(totalPrice)}
---
Customer Details:
Name: ${customerInfo.name}
Phone: ${customerInfo.phone}
City: ${customerInfo.city}
Address: ${customerInfo.address}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/491626126283?text=${encodedMessage}`, '_blank');
    setIsWhatsAppModalOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-bordeaux/20 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative w-full max-w-md bg-beige h-full shadow-2xl flex flex-col"
          >
            <div className="p-8 border-b border-bordeaux/5 flex items-center justify-between">
              <h2 className="text-xl font-serif text-bordeaux tracking-widest uppercase">Shopping Bag</h2>
              <button onClick={onClose} className="text-bordeaux hover:text-gold transition-colors">
                <X size={24} strokeWidth={1} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <ShoppingBag size={48} strokeWidth={1} className="text-bordeaux/10" />
                  <p className="text-bordeaux/40 font-serif italic">Your bag is empty.</p>
                  <button onClick={onClose} className="text-[10px] uppercase tracking-widest text-gold font-bold border-b border-gold pb-1">Start Shopping</button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.cartId} className="flex gap-6 group">
                    <div className="w-24 aspect-[3/4] overflow-hidden rounded-sm">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="text-sm font-serif text-bordeaux">{item.name}</h3>
                          <button onClick={() => onRemoveItem(item.cartId)} className="text-bordeaux/20 hover:text-red-500 transition-colors">
                            <X size={14} />
                          </button>
                        </div>
                        <p className="text-[10px] text-gold uppercase tracking-widest mb-2">{item.size ? `Size: ${item.size}` : 'Standard Size'}</p>
                        <div className="flex items-baseline gap-2 mb-4">
                          <p className="font-serif text-bordeaux" style={{ fontSize: '1rem' }}>
                            {item.quantity > 1
                              ? formatPrice(parsePrice(item.price) * item.quantity)
                              : item.price}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-[9px] text-bordeaux/40 font-display">
                              ({item.price} ea)
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => onUpdateQuantity(item.cartId, -1)}
                          className="w-6 h-6 border border-bordeaux/10 flex items-center justify-center hover:border-gold transition-colors text-xs text-bordeaux"
                        >
                          -
                        </button>
                        <span className="text-xs font-display text-bordeaux">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.cartId, 1)}
                          className="w-6 h-6 border border-bordeaux/10 flex items-center justify-center hover:border-gold transition-colors text-xs text-bordeaux"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-8 border-t border-bordeaux/5 space-y-6 bg-cream">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-bordeaux/40">Subtotal</span>
                  <span className="text-2xl font-serif tracking-wide text-bordeaux">{formatPrice(totalPrice)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full py-5 bg-bordeaux text-white uppercase text-[11px] tracking-[0.3em] font-display font-semibold hover:bg-gold hover:text-bordeaux transition-all duration-500"
                >
                  Checkout via WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
      <WhatsAppOrderModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        onConfirm={confirmWhatsAppOrder}
        orderDetails={`${cartItems.length} items in bag`}
      />
    </AnimatePresence>
  );
};

const BrandStory = () => {
  return (
    <section className="py-24 px-6 bg-cream/20">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-32 items-center">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="aspect-[4/5] overflow-hidden rounded-sm shadow-2xl"
          >
            <img
              src="../images/pic2.jpeg"
              alt="Artisanal Craftsmanship"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute -bottom-16 -right-16 hidden xl:block w-72 aspect-square bg-beige p-4 shadow-2xl border border-bordeaux/5"
          >
            <img
              src="../images/abayablack1.jpg"
              alt="Detail"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-[10px] uppercase tracking-[0.5em] text-gold block mb-8">Our Heritage</span>
            <h2 className="text-4xl md:text-6xl font-special text-bordeaux mb-10 leading-tight">
              A Legacy of <br />
              <span className="italic text-gold font-serif">Modest Luxury</span>
            </h2>
            <p className="text-lg text-bordeaux/60 font-light leading-relaxed mb-8 font-serif italic">
              "Every stitch is a dialogue between tradition and contemporary couture."
            </p>
            <div className="space-y-6 text-bordeaux/50 font-light leading-relaxed">
              <p>
                Founded on the principles of artisanal craftsmanship and timeless design, <span className="font-serif font-medium text-bordeaux italic">Al Maissa Label</span> redefines the modern abaya. We believe that modesty is not just a choice, but a statement of refined power and grace.
              </p>
              <p>
                Our studio in the heart of Dubai serves as a sanctuary for creativity, where we source the world's finest silks and velvets to create silhouettes that empower the woman who wears them.
              </p>
            </div>
          </motion.div>

          <button className="group flex items-center gap-6 text-[10px] uppercase tracking-[0.4em] font-display text-bordeaux font-semibold">
            Explore Our World <div className="w-12 h-[1px] bg-gold group-hover:w-16 transition-all duration-500"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

const StoreControlPreview = () => {
  return (
    <section className="py-24 px-6 bg-beige relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="glass-card p-10 rounded-2xl shadow-2xl border border-white/20 relative"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-bordeaux flex items-center justify-center text-white">
                    <Check size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-serif text-bordeaux">Smart Inventory</h4>
                    <p className="text-[10px] text-bordeaux/40 uppercase tracking-widest">Real-time Sync</p>
                  </div>
                </div>
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-beige bg-gold/20 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="h-12 bg-bordeaux/5 rounded-lg flex items-center px-4 justify-between">
                  <span className="text-xs text-bordeaux/60">L'Elegance Noire</span>
                  <span className="text-[10px] bg-gold/20 text-gold px-2 py-1 rounded">In Stock</span>
                </div>
                <div className="h-12 bg-bordeaux/5 rounded-lg flex items-center px-4 justify-between">
                  <span className="text-xs text-bordeaux/60">Midnight Silk</span>
                  <span className="text-[10px] bg-bordeaux/10 text-bordeaux px-2 py-1 rounded">Low Stock</span>
                </div>
                <div className="h-24 bg-gold/5 border border-gold/10 rounded-lg p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center text-gold">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-bordeaux font-medium">New Customer Inquiry</p>
                    <p className="text-[10px] text-bordeaux/40">Customer from Dubai, UAE</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="order-1 lg:order-2 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[10px] uppercase tracking-[0.5em] text-gold block mb-6">Modern Boutique</span>
              <h2 className="text-4xl md:text-6xl font-serif text-bordeaux mb-8 leading-tight">
                Smart Store <br />
                <span className="italic text-gold">Control</span>
              </h2>
              <p className="text-lg text-bordeaux/60 font-light leading-relaxed mb-8">
                Experience seamless management of your luxury boutique. From real-time inventory tracking to direct customer engagement, our platform is designed for the modern fashion house.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-2xl font-serif text-bordeaux mb-2">99.9%</h4>
                  <p className="text-[10px] uppercase tracking-widest text-bordeaux/40">Uptime Guarantee</p>
                </div>
                <div>
                  <h4 className="text-2xl font-serif text-bordeaux mb-2">24/7</h4>
                  <p className="text-[10px] uppercase tracking-widest text-bordeaux/40">Concierge Support</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const DeviceShowcase = () => {
  return (
    <section className="py-24 px-6 bg-cream/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[10px] uppercase tracking-[0.5em] text-gold block mb-6">Mobile First</span>
              <h2 className="text-4xl md:text-6xl font-serif text-bordeaux mb-8 leading-tight">
                Boutique in <br />
                <span className="italic text-gold">Your Pocket</span>
              </h2>
              <p className="text-lg text-bordeaux/60 font-light leading-relaxed mb-12">
                Our mobile-optimized experience ensures that luxury is always within reach. Browse, select, and order with Apple-level simplicity, designed for the sophisticated woman on the go.
              </p>

              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full bg-bordeaux/5 flex items-center justify-center text-gold">
                    <ShoppingBag size={24} strokeWidth={1} />
                  </div>
                  <div>
                    <h4 className="text-sm font-serif text-bordeaux">One-Tap Ordering</h4>
                    <p className="text-xs text-bordeaux/40">Seamless WhatsApp integration</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full bg-bordeaux/5 flex items-center justify-center text-gold">
                    <Instagram size={24} strokeWidth={1} />
                  </div>
                  <div>
                    <h4 className="text-sm font-serif text-bordeaux">Visual Discovery</h4>
                    <p className="text-xs text-bordeaux/40">Immersive lookbook experience</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative flex justify-center"
          >
            {/* iPhone Mockup */}
            <div className="relative w-[300px] h-[600px] bg-bordeaux rounded-[3rem] p-3 shadow-2xl border-[8px] border-bordeaux/10">
              <div className="absolute -left-[7px] top-36 w-[2px] h-12 bg-bordeaux/10 rounded-l-sm"></div>
              <div className="absolute -left-[7px] top-52 w-[2px] h-12 bg-bordeaux/10 rounded-l-sm"></div>
              <div className="absolute -right-[7px] top-40 w-[2px] h-20 bg-bordeaux/10 rounded-r-sm"></div>

              {/* iPhone Screen */}
              <div className="aspect-[9/19.5] bg-beige rounded-[2.2rem] overflow-hidden relative group border border-bordeaux/5">
                <img
                  src="../images/pic33.jpeg"
                  alt="Mobile View"
                  className="w-full h-full object-cover brightness-95 group-hover:scale-110 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className="h-16 mb-4">
                    <img
                      src="../images/logo1.png"
                      alt="Al Maissa Logo"
                      className="h-full w-auto object-contain brightness-110"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="w-8 h-[1px] bg-gold mb-4"></div>
                  <button className="px-4 py-2 bg-gold/20 backdrop-blur-md border border-gold/30 text-[8px] uppercase tracking-widest text-gold rounded-full">Shop Mobile</button>
                </div>
              </div>
              {/* Dynamic Island */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-6 bg-bordeaux/10 rounded-full z-20"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Lookbook = () => {
  return (
    <section className="py-24 px-6 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <span className="text-[10px] uppercase tracking-[0.5em] text-gold block mb-6">Social Gallery</span>
            <h2 className="text-4xl md:text-6xl font-serif text-bordeaux leading-tight">Instagram <span className="italic">Lookbook</span></h2>
          </div>
          <a
            href="https://www.instagram.com/almaissa.label?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-bordeaux/40 hover:text-gold transition-colors font-bold"
          >
            Follow @almaissa.label <Instagram size={16} />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {LOOKBOOK_IMAGES.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="group relative aspect-square overflow-hidden rounded-sm cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-500"
            >
              <img
                src={img}
                alt={`Lookbook ${i}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <Instagram size={30} className="text-white" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = ({ onViewChange }: { onViewChange: (view: any) => void }) => {
  return (
    <footer className="bg-beige pt-24 pb-12 px-6 border-t border-bordeaux/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="h-16 md:h-20 mb-12">
          <img
            src="../images/logo1.png"
            alt="Al Maissa Logo"
            className="h-full w-auto object-contain brightness-110"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 mb-12 text-[10px] uppercase tracking-[0.3em] text-bordeaux/60 font-display">
          <button onClick={() => onViewChange('home')} className="hover:text-gold transition-colors">Home</button>
          <button onClick={() => onViewChange('shop')} className="hover:text-gold transition-colors">Shop</button>
          <button onClick={() => onViewChange('story')} className="hover:text-gold transition-colors">Our Story</button>
          <button onClick={() => onViewChange('contact')} className="hover:text-gold transition-colors">Contact Us</button>
        </div>

        <div className="flex items-center gap-8 mb-16">
          <a href="https://www.instagram.com/almaissa.label?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer">
            <Instagram className="text-bordeaux/40 hover:text-gold cursor-pointer transition-colors" size={18} />
          </a>
          <div className="w-5 h-5 border border-bordeaux/20 rounded-full flex items-center justify-center text-[8px] hover:border-gold hover:text-gold cursor-pointer transition-colors text-bordeaux/30">f</div>
          <div className="w-5 h-5 border border-bordeaux/20 rounded-full flex items-center justify-center text-[8px] hover:border-gold hover:text-gold cursor-pointer transition-colors text-bordeaux/30">X</div>
        </div>

        <div className="w-full pt-12 border-t border-bordeaux/5 flex flex-col md:flex-row items-center justify-between gap-6 text-[8px] uppercase tracking-[0.2em] text-bordeaux/20 font-serif">
          <p>© 2024 <span className="italic font-bold">Al Maissa Label</span></p>
          <p className="italic">Redefining Modest Luxury</p>
          <p>Created by Creative Touch</p>
        </div>
      </div>
    </footer>
  );
};

const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/491626126283"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring' }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-10 right-10 z-[100] group"
    >
      <div className="absolute inset-0 bg-bordeaux/10 blur-xl rounded-full group-hover:bg-bordeaux/20 transition-all duration-500"></div>
      <div className="relative w-16 h-16 bg-bordeaux rounded-full flex items-center justify-center shadow-2xl shadow-bordeaux/20 border border-gold/20">
        <MessageCircle size={30} className="text-gold" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-beige rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-gold rounded-full animate-pulse"></div>
        </div>
      </div>
      <div className="absolute right-20 top-1/2 -translate-y-1/2 bg-beige/80 backdrop-blur-md border border-bordeaux/10 px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        <p className="text-[10px] uppercase tracking-widest text-gold font-bold">Luxury Concierge</p>
        <p className="text-[9px] text-bordeaux/60">Order via WhatsApp</p>
      </div>
    </motion.a>
  );
};

const StoryPage = () => {
  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="grid md:grid-cols-2 gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="text-[10px] uppercase tracking-[0.6em] text-gold block mb-8">Our Heritage</span>
          <h2 className="text-5xl md:text-7xl font-serif text-bordeaux mb-12 leading-tight">
            The Art of <br />
            <span className="italic text-gold">Al Maissa</span>
          </h2>
          <div className="space-y-8 text-lg text-bordeaux/70 font-light leading-relaxed font-serif italic">
            <p>
              Founded on the principles of timeless elegance and uncompromising quality, Al Maissa Label was born from a desire to redefine modest luxury.
            </p>
            <p>
              Every stitch tells a story of heritage, every fabric choice reflects our commitment to comfort, and every design is a celebration of the modern woman's grace.
            </p>
            <p>
              Our journey began in the heart of artisanal workshops, where traditional techniques meet contemporary silhouettes. Today, we continue to craft pieces that are not just garments, but expressions of identity and refined taste.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="relative"
        >
          <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-2xl">
            <img
              src="../images/red11.jpeg"
              alt="Artisanal Craftsmanship"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-12 -left-12 w-64 h-80 bg-gold/10 backdrop-blur-xl border border-gold/20 p-8 hidden md:block">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold mb-4">Established</p>
            <p className="text-3xl font-serif text-bordeaux mb-6">2026</p>
            <p className="text-xs text-bordeaux/60 leading-relaxed uppercase tracking-widest">
              Dedicated to the pursuit of modest excellence.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="mt-48">
        <div className="text-center mb-12">
          <span className="text-[10px] uppercase tracking-[0.6em] text-gold block mb-8">The Creative Process</span>
          <h2 className="text-4xl md:text-6xl font-serif text-bordeaux">Artisanal <span className="italic">Excellence</span></h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Fabric Selection",
              description: "We source only the most exquisite silks, velvets, and linens from world-renowned mills, ensuring every piece feels as divine as it looks.",
              image: "../images/black1.jpeg"
            },
            {
              title: "Hand-Stitched Detail",
              description: "Our master artisans dedicate countless hours to hand-applied embellishments and precision stitching, creating wearable works of art.",
              image: "../images/pic444.jpeg"
            },
            {
              title: "Modern Silhouettes",
              description: "We bridge the gap between traditional modesty and contemporary fashion, designing silhouettes that empower and inspire.",
              image: "../images/pic222.jpeg"
            }
          ].map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className="group"
            >
              <div className="aspect-[4/5] overflow-hidden rounded-sm mb-8 relative">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-bordeaux/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <h3 className="text-xl font-serif text-bordeaux mb-4">{step.title}</h3>
              <p className="text-sm text-bordeaux/60 leading-relaxed font-light">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-24 bg-bordeaux py-16 px-12 rounded-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <div className="text-[30vw] font-special text-gold whitespace-nowrap -rotate-12 translate-x-1/4">AL MAISSA</div>
        </div>
        <div className="max-w-3xl relative z-10">
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-12 leading-tight">
            Designed for the <br />
            <span className="italic text-gold">Modern Muse</span>
          </h2>
          <p className="text-xl text-white/70 font-serif italic leading-relaxed mb-12">
            "Our mission is to provide every woman with a piece that makes her feel confident, elegant, and true to her values."
          </p>
          <div className="w-24 h-[1px] bg-gold"></div>
        </div>
      </div>
    </div>
  );
};

const ContactPage = () => {
  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="text-[10px] uppercase tracking-[0.6em] text-gold block mb-8">Get in Touch</span>
          <h2 className="text-6xl md:text-8xl font-serif text-bordeaux mb-8 leading-tight">
            Luxury <span className="italic">Concierge</span>
          </h2>
          <p className="text-lg text-bordeaux/40 max-w-2xl mx-auto font-light">
            Whether you have a question about our collections or require a bespoke consultation, our team is here to assist you.
          </p>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        {[
          { icon: <MessageCircle size={32} />, title: "WhatsApp", detail: "+49 162 6126283", action: "Chat Now", link: "https://wa.me/49 162 6126283" },
          { icon: <Instagram size={32} />, title: "Instagram", detail: "@almaissa.label", action: "Follow Us", link: "https://www.instagram.com/almaissa.label?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
          { icon: <Share2 size={32} />, title: "Email", detail: "almaissalabel@gmail.com", action: "Send Email", link: "mailto:concierge@almaissa.com" }
        ].map((item, i) => (
          <motion.a
            href={item.link}
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="p-12 bg-white/40 backdrop-blur-md border border-bordeaux/5 rounded-sm text-center group hover:bg-bordeaux hover:text-white transition-all duration-700"
          >
            <div className="text-gold mb-8 flex justify-center group-hover:text-white transition-colors">{item.icon}</div>
            <h3 className="text-xl font-serif mb-2">{item.title}</h3>
            <p className="text-sm opacity-60 mb-8 uppercase tracking-widest">{item.detail}</p>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold border-b border-gold group-hover:border-white">{item.action}</span>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

// --- Main App ---

const ShopPage = ({ onAddToCart, onOpenModal }: { onAddToCart: (item: CartItem) => void, onOpenModal: (abaya: Abaya) => void }) => {
  const [selectedCollection, setSelectedCollection] = useState<string>('All');
  const collections = ['All', ...new Set(SIGNATURE_ABAYAS.map(a => a.collection))];

  const filteredAbayas = selectedCollection === 'All'
    ? SIGNATURE_ABAYAS
    : SIGNATURE_ABAYAS.filter(a => a.collection === selectedCollection);

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="text-[10px] uppercase tracking-[0.6em] text-gold block mb-8">The Boutique</span>
          <h2 className="text-6xl md:text-8xl font-serif text-bordeaux mb-16 leading-tight">
            Our <span className="italic">Collections</span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 border-y border-bordeaux/5 py-10">
          {collections.map(collection => (
            <button
              key={collection}
              onClick={() => setSelectedCollection(collection)}
              className="relative group py-2"
            >
              <span className={`text-[11px] uppercase tracking-[0.3em] font-display transition-all duration-500 ${selectedCollection === collection ? 'text-bordeaux font-bold' : 'text-bordeaux/30 group-hover:text-bordeaux/60'}`}>
                {collection}
              </span>
              {selectedCollection === collection && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-1 left-0 w-full h-[1px] bg-gold"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-24"
      >
        <AnimatePresence mode="popLayout">
          {filteredAbayas.map((abaya) => (
            <motion.div
              layout
              key={abaya.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <ProductCard abaya={abaya} onAddToCart={onAddToCart} onOpenModal={onOpenModal} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

const CartPage = ({ cartItems, onUpdateQuantity, onRemoveItem }: {
  cartItems: CartItem[],
  onUpdateQuantity: (id: string, delta: number) => void,
  onRemoveItem: (id: string) => void
}) => {
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const subtotal = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.price.replace('$', '').replace(',', ''));
    return acc + (price * item.quantity);
  }, 0);

  const handleWhatsAppOrder = () => {
    if (cartItems.length === 0) return;
    setIsWhatsAppModalOpen(true);
  };

  const confirmWhatsAppOrder = (customerInfo: CustomerInfo) => {
    const itemsList = cartItems.map(item => `- ${item.name} (${item.size}) x ${item.quantity} - ${item.price}`).join('\n');
    const message = `Hello Al Maissa Label, I would like to place an order:
---
Order Details:
${itemsList}

Total: $${subtotal.toLocaleString()}
---
Customer Details:
Name: ${customerInfo.name}
Phone: ${customerInfo.phone}
City: ${customerInfo.city}
Address: ${customerInfo.address}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/491626126283?text=${encodedMessage}`, '_blank');
    setIsWhatsAppModalOpen(false);
  };

  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-20">
        <span className="text-[10px] uppercase tracking-[0.5em] text-gold block mb-6">Your Selection</span>
        <h2 className="text-5xl md:text-7xl font-serif text-bordeaux mb-4">Shopping <span className="italic">Bag</span></h2>
        <p className="text-bordeaux/40 text-sm tracking-widest uppercase">{cartItems.length} Items</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 border-y border-bordeaux/5">
          <p className="text-bordeaux/60 font-serif italic text-xl mb-12">"Your bag is currently empty."</p>
          <button className="px-12 py-5 bg-bordeaux text-white uppercase text-[10px] tracking-[0.3em] font-display">Continue Shopping</button>
        </div>
      ) : (
        <div className="space-y-12">
          {cartItems.map((item) => (
            <div key={item.cartId} className="flex gap-8 pb-12 border-b border-bordeaux/5">
              <div className="w-32 md:w-48 aspect-[3/4] overflow-hidden rounded-sm">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-between py-2">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl md:text-2xl font-serif text-bordeaux">{item.name}</h3>
                    <div className="text-right">
                      <p className="text-lg font-display text-bordeaux">
                        ${(parseFloat(item.price.replace('$', '').replace(',', '')) * item.quantity).toLocaleString()}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-[10px] text-bordeaux/40 font-display">
                          ({item.price} each)
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="text-[10px] uppercase tracking-widest text-gold mb-6">{item.size ? `Size: ${item.size}` : 'Standard Size'}</p>

                  <div className="flex items-center gap-6">
                    <button onClick={() => onUpdateQuantity(item.cartId, -1)} className="text-bordeaux/40 hover:text-bordeaux"><ChevronLeft size={16} /></button>
                    <span className="text-sm font-display text-bordeaux">{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.cartId, 1)} className="text-bordeaux/40 hover:text-bordeaux"><ChevronRight size={16} /></button>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveItem(item.cartId)}
                  className="text-[9px] uppercase tracking-widest text-bordeaux/40 hover:text-red-500 transition-colors text-left"
                >
                  Remove Item
                </button>
              </div>
            </div>
          ))}

          <div className="pt-12">
            <div className="flex justify-between items-end mb-12">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-bordeaux/40 mb-2">Subtotal</p>
                <p className="text-4xl font-serif text-bordeaux">${subtotal.toLocaleString()}</p>
              </div>
              <p className="text-[10px] text-bordeaux/40 italic">Taxes and shipping calculated at checkout</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-6 bg-bordeaux text-white uppercase text-[11px] tracking-[0.3em] font-display font-bold hover:bg-gold transition-all duration-700"
              >
                Checkout via WhatsApp
              </button>
              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-6 border border-bordeaux/20 text-bordeaux uppercase text-[11px] tracking-[0.3em] font-display hover:bg-bordeaux/5 transition-all duration-700 flex items-center justify-center gap-3"
              >
                Direct Order <MessageCircle size={18} />
              </button>
            </div>

            <div className="pt-12 border-t border-bordeaux/5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold mb-6 text-center">Accepted Payment Methods</p>
              <div className="flex flex-wrap justify-center gap-8">
                <div className="flex items-center gap-3">
                  <CreditCard size={18} className="text-bordeaux/40" />
                  <div>
                    <p className="text-[10px] font-bold text-bordeaux uppercase tracking-wider">Bank Transfer</p>
                    <p className="text-[8px] text-bordeaux/40 uppercase tracking-tighter">Direktüberweisung</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Wallet size={18} className="text-bordeaux/40" />
                  <div>
                    <p className="text-[10px] font-bold text-bordeaux uppercase tracking-wider">PayPal</p>
                    <p className="text-[8px] text-bordeaux/40 uppercase tracking-tighter">Secure Checkout</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <WhatsAppOrderModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        onConfirm={confirmWhatsAppOrder}
        orderDetails={`${cartItems.length} items in bag`}
      />
    </div>
  );
}

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedAbaya, setSelectedAbaya] = useState<Abaya | null>(null);
  const [viewHistory, setViewHistory] = useState<number[]>([]);
  const [currentView, setCurrentView] = useState<'home' | 'shop' | 'cart' | 'story' | 'contact'>('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const addToCart = (newItem: CartItem) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.cartId === newItem.cartId);
      if (existingItem) {
        return prev.map(item =>
          item.cartId === newItem.cartId
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }
      return [...prev, newItem];
    });
    setIsCartOpen(true);
  };

  const handleOpenModal = (abaya: Abaya) => {
    setSelectedAbaya(abaya);
    setViewHistory(prev => {
      const filtered = prev.filter(id => id !== abaya.id);
      return [abaya.id, ...filtered].slice(0, 5);
    });
  };

  const updateQuantity = (cartId: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.cartId === cartId) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const removeItem = (cartId: string) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="relative min-h-screen bg-white">
      <div className="fixed inset-0 z-[-1] champagne-gradient pointer-events-none"></div>

      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onViewChange={setCurrentView}
        currentView={currentView}
      />

      <main>
        {currentView === 'home' ? (
          <>
            <Hero onViewChange={setCurrentView} />

            <section className="py-24 px-6 max-w-7xl mx-auto relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden opacity-[0.03] select-none">
                <div className="text-[20vw] font-special text-bordeaux whitespace-nowrap animate-pulse">AL MAISSA LABEL</div>
              </div>

              <div className="flex flex-col items-center text-center mb-16 relative z-10">
                <div className="max-w-4xl">
                  <span className="text-[10px] uppercase tracking-[0.6em] text-gold block mb-8">The Collection</span>
                  <h2 className="text-5xl md:text-8xl font-playfair text-bordeaux leading-tight whitespace-nowrap">
                    Signature <span className="italic">Abayas</span>
                  </h2>
                </div>
                <div className="flex gap-6 mt-16">
                  <button className="w-16 h-16 rounded-full border border-bordeaux/10 flex items-center justify-center hover:border-gold hover:bg-gold/5 transition-all duration-500 text-bordeaux group">
                    <ChevronLeft size={28} strokeWidth={1} className="group-hover:-translate-x-1 transition-transform" />
                  </button>
                  <button className="w-16 h-16 rounded-full border border-bordeaux/10 flex items-center justify-center hover:border-gold hover:bg-gold/5 transition-all duration-500 text-bordeaux group">
                    <ChevronRight size={28} strokeWidth={1} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20 relative z-10">
                {SIGNATURE_ABAYAS.slice(0, 4).map((abaya, index) => (
                  <div key={abaya.id} className={index % 2 === 1 ? 'md:mt-12' : ''}>
                    <ProductCard abaya={abaya} onAddToCart={addToCart} onOpenModal={handleOpenModal} />
                  </div>
                ))}
              </div>
              <div className="mt-32 text-center relative z-10">
                <button
                  onClick={() => setCurrentView('shop')}
                  className="group relative px-16 py-6 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-bordeaux translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out"></div>
                  <div className="relative border border-bordeaux/20 px-16 py-6 text-bordeaux group-hover:text-white uppercase text-[10px] tracking-[0.4em] font-display transition-colors duration-700">
                    Explore Full Boutique
                  </div>
                </button>
              </div>
            </section>

            <BrandStory />

            <section className="py-20 bg-bordeaux relative overflow-hidden">
              {/* Background Parallax Elements */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gold/[0.05]"></div>
                <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gold/[0.05]"></div>
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute top-1/4 left-10 text-[12vw] font-serif text-gold/[0.03] whitespace-nowrap leading-none italic select-none"
                >
                  L'Exclusivité
                </motion.div>
              </div>

              <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 items-center">

                  {/* Left Column: Imagery with Custom Mask */}
                  <div className="lg:col-span-5 relative">
                    <motion.div
                      initial={{ opacity: 0, scale: 1.05 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                      className="relative z-10 aspect-[4/5] overflow-hidden rounded-t-full border border-gold/30"
                    >
                      <img
                        src="../images/abaya-beige11.jpg"
                        alt="Luxury Couture"
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[2s] ease-out"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bordeaux via-transparent to-transparent opacity-60"></div>
                    </motion.div>

                    {/* Floating Accent */}
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gold/10 backdrop-blur-2xl border border-gold/30 rounded-full flex items-center justify-center p-4 z-20 hidden xl:flex">
                      <p className="text-[9px] text-gold uppercase tracking-[0.4em] text-center leading-relaxed font-bold">
                        Limited <br /> Edition
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Content */}
                  <div className="lg:col-span-7 lg:pl-12">
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="flex items-center gap-4 mb-8">
                        <div className="h-[1px] w-10 bg-gold"></div>
                        <span className="text-[9px] uppercase tracking-[0.6em] text-gold font-bold">Maison Privilege</span>
                      </div>

                      <h2 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-[0.95] tracking-tighter">
                        The <span className="italic text-gold">Art</span> of <br />
                        Giving
                      </h2>

                      <p className="text-lg text-white/60 font-serif italic leading-relaxed mb-12 max-w-lg">
                        "A gesture of appreciation for those who seek the extraordinary. Experience our curated collection with a singular benefit."
                      </p>

                      <div className="relative mb-16 group">
                        <div className="flex items-baseline gap-4">
                          <span className="text-[10rem] font-serif text-gold/[0.05] leading-none absolute -top-16 -left-8 select-none">5</span>
                          <div className="relative z-10">
                            <p className="text-[9px] uppercase tracking-[0.3em] text-gold mb-3">Your Exclusive Benefit</p>
                            <div className="flex items-baseline gap-3">
                              <span className="text-7xl font-serif text-white">5</span>
                              <span className="text-3xl font-serif text-gold italic">% OFF</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-8 items-end">
                        <div className="space-y-3">
                          <p className="text-[9px] uppercase tracking-[0.3em] text-white/40">Invitation Code</p>
                          <div className="relative group cursor-pointer inline-block">
                            <div className="absolute -inset-2 bg-gold/10 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <p className="text-2xl font-serif text-white tracking-[0.2em] relative z-10">almaissa5</p>
                          </div>
                        </div>

                        <button
                          onClick={() => setCurrentView('shop')}
                          className="group relative overflow-hidden py-5 px-10 bg-gold text-bordeaux uppercase text-[9px] tracking-[0.3em] font-display font-bold transition-all duration-700 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                        >
                          <span className="relative z-10">Enter the Boutique</span>
                          <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.16, 1, 0.3, 1]"></div>
                        </button>
                      </div>
                    </motion.div>
                  </div>

                </div>
              </div>

              {/* Bottom Decorative Rail */}
              <div className="absolute bottom-0 left-0 w-full h-16 border-t border-white/10 flex items-center px-10 justify-between">
                <div className="flex gap-8">
                  <span className="text-[7px] uppercase tracking-[0.3em] text-white/30">Handcrafted in Dubai</span>
                  <span className="text-[7px] uppercase tracking-[0.3em] text-white/30">Worldwide Shipping</span>
                </div>
                <div className="w-24 h-[1px] bg-gold/30"></div>
              </div>
            </section>

            <StoreControlPreview />

            <DeviceShowcase />

            <Lookbook />
          </>
        ) : currentView === 'shop' ? (
          <ShopPage onAddToCart={addToCart} onOpenModal={handleOpenModal} />
        ) : currentView === 'story' ? (
          <StoryPage />
        ) : currentView === 'contact' ? (
          <ContactPage />
        ) : (
          <CartPage cartItems={cartItems} onUpdateQuantity={updateQuantity} onRemoveItem={removeItem} />
        )}
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />

      {selectedAbaya && (
        <ProductModal
          abaya={selectedAbaya}
          allAbayas={SIGNATURE_ABAYAS}
          viewHistory={viewHistory}
          isOpen={!!selectedAbaya}
          onClose={() => setSelectedAbaya(null)}
          onAddToCart={addToCart}
          onSelectAbaya={handleOpenModal}
        />
      )}

      <Footer onViewChange={setCurrentView} />
      <WhatsAppButton />
    </div>
  );
}
