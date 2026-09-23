import React, { useState, useEffect } from 'react';
import { 
  Search, ShoppingBag, MapPin, MessageCircle, Star, Heart, 
  Truck, RefreshCcw, ShieldCheck, Headphones, User, ShoppingCart, 
  ChevronDown, Mail, Gift, Diamond, Menu, X, ChevronRight, Store, Trash2, Plus, Minus
} from 'lucide-react';

export default function EcommerceArtesanal() {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Nuevos estados para navegación
  const [currentView, setCurrentView] = useState('inicio'); // inicio, catalogo, empresas, perfilEmpresa
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Productos actualizados con 'precioOriginal' para mostrar el descuento (tachado)
  const productos = [
    {
      id: 1,
      nombre: 'Café Premium Duitama',
      categoria: 'café',
      precio: 39900,
      precioOriginal: 49900,
      imagen: 'https://picsum.photos/seed/cafe1/500/500',
      descripcion: 'Café de altura cultivado en nuestras fincas, tueste medio con notas de chocolate y caramelo.',
      vendedor: 'Finca Las Nubes',
      whatsapp: '573105551234',
      rating: 4.8,
      reviews: 128,
      etiqueta: 'Sale',
      colorEtiqueta: 'bg-orange-500'
    },
    {
      id: 2,
      nombre: 'Miel Artesanal Pura',
      categoria: 'alimentos',
      precio: 35000,
      precioOriginal: null,
      imagen: 'https://picsum.photos/seed/miel2/500/500',
      descripcion: 'Miel 100% pura sin procesar, de abejas criadas en la región.',
      vendedor: 'Apícola Boyacá',
      whatsapp: '573146772233',
      rating: 4.9,
      reviews: 96,
      etiqueta: 'Best Seller',
      colorEtiqueta: 'bg-green-700'
    },
    {
      id: 3,
      nombre: 'Tejido Artesanal Wayuu',
      categoria: 'artesanía',
      precio: 150000,
      precioOriginal: null,
      imagen: 'https://picsum.photos/seed/tejido3/500/500',
      descripcion: 'Bolso tejido a mano con técnicas tradicionales Wayuu. Pieza única y original.',
      vendedor: 'Manos de Arte',
      whatsapp: '573158884455',
      rating: 4.7,
      reviews: 142,
      etiqueta: 'New',
      colorEtiqueta: 'bg-green-600'
    },
    {
      id: 4,
      nombre: 'Mermelada de Fresa Casera',
      categoria: 'alimentos',
      precio: 24900,
      precioOriginal: null,
      imagen: 'https://picsum.photos/seed/merme4/500/500',
      descripcion: 'Mermelada hecha con fresas frescas de la región, sin conservantes.',
      vendedor: 'Sabores Caseros',
      whatsapp: '573167995566',
      rating: 4.6,
      reviews: 87,
      etiqueta: null
    },
    {
      id: 5,
      nombre: 'Cerámica Decorativa',
      categoria: 'artesanía',
      precio: 69900,
      precioOriginal: 85000,
      imagen: 'https://picsum.photos/seed/cera5/500/500',
      descripcion: 'Pieza de cerámica hecha a mano, diseño tradicional con acabado moderno.',
      vendedor: 'Taller Cerámico',
      whatsapp: '573176660077',
      rating: 4.9,
      reviews: 110,
      etiqueta: 'Sale',
      colorEtiqueta: 'bg-orange-500'
    },
    {
      id: 6,
      nombre: 'Papa Criolla Orgánica',
      categoria: 'agrícola',
      precio: 15000,
      precioOriginal: null,
      imagen: 'https://picsum.photos/seed/papa6/500/500',
      descripcion: 'Papa criolla cultivada sin químicos, ideal para ajiaco y guisos.',
      vendedor: 'Cultivos Ecológicos',
      whatsapp: '573185771188',
      rating: 4.5,
      reviews: 76,
      etiqueta: null
    }
  ];

  // Datos mock de Empresas
  const empresas = [
    {
      id: 1,
      nombre: 'Finca Las Nubes',
      logo: 'https://picsum.photos/seed/emp1/200/200',
      descripcion: 'Productores de café especial de alta montaña con más de 20 años de tradición.',
      categoria: 'Caficultura',
      productoEstrellaId: 1,
      whatsapp: '573105551234',
    },
    {
      id: 2,
      nombre: 'Apícola Boyacá',
      logo: 'https://picsum.photos/seed/emp2/200/200',
      descripcion: 'Miel 100% natural, polen y derivados. Trabajamos por el cuidado de las abejas.',
      categoria: 'Apicultura',
      productoEstrellaId: 2,
      whatsapp: '573146772233',
    },
    {
      id: 3,
      nombre: 'Manos de Arte',
      logo: 'https://picsum.photos/seed/emp3/200/200',
      descripcion: 'Tejidos artesanales y piezas únicas elaboradas con técnicas tradicionales.',
      categoria: 'Artesanías',
      productoEstrellaId: 3,
      whatsapp: '573158884455',
    },
    {
      id: 4,
      nombre: 'Sabores Caseros',
      logo: 'https://picsum.photos/seed/emp4/200/200',
      descripcion: 'Conservas, mermeladas y dulces tradicionales hechos como en casa.',
      categoria: 'Alimentos',
      productoEstrellaId: 4,
      whatsapp: '573167995566',
    },
    {
      id: 5,
      nombre: 'Taller Cerámico',
      logo: 'https://picsum.photos/seed/emp5/200/200',
      descripcion: 'Cerámica utilitaria y decorativa moldeada a mano.',
      categoria: 'Artesanías',
      productoEstrellaId: 5,
      whatsapp: '573176660077',
    },
    {
      id: 6,
      nombre: 'Cultivos Ecológicos',
      logo: 'https://picsum.photos/seed/emp6/200/200',
      descripcion: 'Agricultura limpia sin agroquímicos. Del campo a tu mesa.',
      categoria: 'Agropecuaria',
      productoEstrellaId: 6,
      whatsapp: '573185771188',
    }
  ];

  const categorias = [
    { id: 'café', nombre: 'Café', imagen: 'https://picsum.photos/seed/cat1/200/200' },
    { id: 'alimentos', nombre: 'Alimentos', imagen: 'https://picsum.photos/seed/cat2/200/200' },
    { id: 'artesanía', nombre: 'Artesanía', imagen: 'https://picsum.photos/seed/cat3/200/200' },
    { id: 'agrícola', nombre: 'Agrícola', imagen: 'https://picsum.photos/seed/cat4/200/200' },
    { id: 'ofertas', nombre: 'Ofertas', imagen: 'https://picsum.photos/seed/cat5/200/200' },
  ];

  const productosFiltrados = productos.filter(p => {
    const cumpleCategoria = selectedCategory === 'todos' || p.categoria === selectedCategory;
    const cumpleBusqueda = p.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    return cumpleCategoria && cumpleBusqueda;
  });

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const addToCart = (producto) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.producto.id === producto.id);
      if (existing) {
        return prev.map(item => item.producto.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item);
      }
      return [...prev, { producto, cantidad: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productoId) => {
    setCartItems(prev => prev.filter(item => item.producto.id !== productoId));
  };

  const updateQuantity = (productoId, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.producto.id === productoId) {
        const newQuantity = Math.max(1, item.cantidad + delta);
        return { ...item, cantidad: newQuantity };
      }
      return item;
    }));
  };

  const cartTotalItems = cartItems.reduce((acc, item) => acc + item.cantidad, 0);

  const agruparCarritoPorEmpresa = () => {
    const grupos = {};
    cartItems.forEach(item => {
      const vendedor = item.producto.vendedor;
      if (!grupos[vendedor]) grupos[vendedor] = [];
      grupos[vendedor].push(item);
    });
    return grupos;
  };

  const sendWhatsAppOrder = (vendedor, items) => {
    const empresaInfo = empresas.find(e => e.nombre === vendedor);
    const numero = empresaInfo ? empresaInfo.whatsapp : items[0].producto.whatsapp;

    let totalVendedor = 0;
    let mensaje = `Hola, me gustaría realizar el siguiente pedido a *${vendedor}*:\n\n`;
    
    items.forEach(item => {
      const subtotal = item.producto.precio * item.cantidad;
      totalVendedor += subtotal;
      mensaje += `- ${item.cantidad}x ${item.producto.nombre} ($${subtotal.toLocaleString('es-CO')})\n`;
    });

    mensaje += `\n*Total aproximado: $${totalVendedor.toLocaleString('es-CO')}*\n\n¿Me confirman disponibilidad y métodos de pago?`;
    
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] font-sans text-gray-900">
      {/* Top Announcement Bar */}
      <div className="bg-black text-white text-xs py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2"><Truck size={14} /> Envío gratis en pedidos de $50.000+</span>
            <span className="flex items-center gap-2"><RefreshCcw size={14} /> Devoluciones a 30 días</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2"><ShieldCheck size={14} /> Pago Seguro</span>
            <span className="flex items-center gap-2"><Headphones size={14} /> Soporte 24/7</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setSelectedCategory('todos')}>
            <div className="bg-black p-1.5 rounded-lg shadow-sm">
              <ShoppingBag size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Artesanos<span className="font-light text-gray-500">Duitama</span></h1>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-gray-500">
            <button onClick={() => setCurrentView('inicio')} className={`${currentView === 'inicio' ? 'text-black border-b-2 border-black' : 'hover:text-black'} pb-1 transition-colors`}>Inicio</button>
            <button onClick={() => setCurrentView('catalogo')} className={`${currentView === 'catalogo' ? 'text-black border-b-2 border-black' : 'hover:text-black'} pb-1 transition-colors`}>Catálogo</button>
            <button onClick={() => setCurrentView('empresas')} className={`${currentView === 'empresas' ? 'text-black border-b-2 border-black' : 'hover:text-black'} pb-1 transition-colors`}>Empresas</button>
            <a href="#" className="hover:text-black transition-colors">Ofertas</a>
            <a href="#" className="hover:text-black transition-colors">Nosotros</a>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4 md:gap-5 text-gray-500">
            {isSearchActive ? (
               <div className="relative flex items-center hidden sm:flex">
                 <input 
                   type="text" 
                   autoFocus
                   placeholder="Buscar..." 
                   className="pl-3 pr-8 py-1.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black w-56 transition-all bg-gray-50"
                   value={searchTerm}
                   onChange={(e) => { setSearchTerm(e.target.value); setCurrentView('catalogo'); }}
                 />
                 <X size={16} className="absolute right-3 cursor-pointer text-gray-400 hover:text-black transition-colors" onClick={() => { setIsSearchActive(false); setSearchTerm(''); }} />
               </div>
            ) : (
               <Search size={20} className="cursor-pointer hover:text-black transition-colors hidden sm:block" onClick={() => setIsSearchActive(true)} />
            )}
            <User size={20} className="cursor-pointer hover:text-black transition-colors hidden sm:block" />
            <Heart size={20} className="cursor-pointer hover:text-black transition-colors hidden sm:block" />
            <div className="relative cursor-pointer hover:text-black transition-colors" onClick={() => setIsCartOpen(true)}>
              <ShoppingCart size={20} />
              {cartTotalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartTotalItems}
                </span>
              )}
            </div>
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-1 text-gray-500 hover:text-black transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white">
            <nav className="flex flex-col px-4 py-4 space-y-4 font-medium text-gray-700">
              <button onClick={() => { setCurrentView('inicio'); setIsMobileMenuOpen(false); }} className={`text-left ${currentView === 'inicio' ? 'text-[#1e5631]' : ''}`}>Inicio</button>
              <button onClick={() => { setCurrentView('catalogo'); setIsMobileMenuOpen(false); }} className={`text-left ${currentView === 'catalogo' ? 'text-[#1e5631]' : ''}`}>Catálogo</button>
              <button onClick={() => { setCurrentView('empresas'); setIsMobileMenuOpen(false); }} className={`text-left ${currentView === 'empresas' ? 'text-[#1e5631]' : ''}`}>Empresas</button>
              <a href="#" className="hover:text-[#1e5631]">Ofertas</a>
              <a href="#" className="hover:text-[#1e5631]">Nosotros</a>
              <div className="flex items-center gap-6 pt-4 border-t border-gray-100 sm:hidden">
                <Search size={20} className="cursor-pointer hover:text-[#1e5631]" />
                <User size={20} className="cursor-pointer hover:text-[#1e5631]" />
                <Heart size={20} className="cursor-pointer hover:text-[#1e5631]" />
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Breadcrumbs */}
      {currentView !== 'inicio' && (
        <div className="bg-transparent">
          <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-400 flex items-center gap-2 overflow-x-auto whitespace-nowrap">
            <button onClick={() => setCurrentView('inicio')} className="hover:text-black flex items-center gap-1 transition-colors">Inicio</button>
            <ChevronRight size={14} />
            {currentView === 'catalogo' && <span className="text-gray-900 font-medium">Catálogo de Productos</span>}
            {currentView === 'empresas' && <span className="text-gray-900 font-medium">Empresas Participantes</span>}
            {currentView === 'perfilEmpresa' && selectedCompany && (
              <>
                <button onClick={() => setCurrentView('empresas')} className="hover:text-black transition-colors">Empresas</button>
                <ChevronRight size={14} />
                <span className="text-gray-900 font-medium">{selectedCompany.nombre}</span>
              </>
            )}
          </div>
        </div>
      )}

      {/* VISTA: INICIO */}
      {currentView === 'inicio' && (
        <>
          {/* Hero Section */}
          <section className="bg-transparent relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 py-16 md:py-32 grid md:grid-cols-2 gap-12 items-center">
              <div className="z-10">
                <div className="inline-block bg-black text-white text-xs font-bold px-3 py-1 rounded-full mb-6 uppercase tracking-wider shadow-sm">
                  Novedades 2024
                </div>
                <h2 className="text-5xl md:text-6xl lg:text-8xl font-black text-gray-900 leading-tight mb-6 tracking-tight">
                  Vive Mejor.<br />
                  Consume Local.
                </h2>
                <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-lg font-light leading-relaxed">
                  Descubre productos artesanales premium, seleccionados cuidadosamente para tu estilo de vida. Apoya lo nuestro de forma inteligente.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={() => setCurrentView('catalogo')} className="bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-colors shadow-lg flex items-center justify-center gap-2">
                    Comprar Ahora <span className="text-xl">→</span>
                  </button>
                  <button onClick={() => setCurrentView('empresas')} className="bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-gray-50 border border-gray-200 transition-colors shadow-sm text-center">
                    Ver Empresas
                  </button>
                </div>
              </div>

              <div className="relative h-[400px] md:h-[500px]">
                <div className="absolute inset-0 flex justify-center items-center">
                   <img 
                     src="https://picsum.photos/seed/hero/800/600" 
                     alt="Productos Artesanales" 
                     className="w-full h-full object-cover rounded-2xl shadow-xl"
                   />
                   <div className="absolute top-4 right-4 bg-black text-white w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-2xl transform rotate-12">
                     <span className="text-xs font-medium uppercase">Hasta</span>
                     <span className="text-3xl font-black leading-none">50%</span>
                     <span className="text-sm font-bold">OFF</span>
                   </div>
                   <div className="absolute -bottom-6 right-4 md:right-10 bg-white p-3 rounded-xl shadow-lg flex items-center gap-2 sm:gap-3 scale-90 sm:scale-100 origin-bottom-right">
                     <div className="flex -space-x-2">
                       <img src="https://picsum.photos/seed/user1/100/100" className="w-8 h-8 rounded-full border-2 border-white" alt="User" />
                       <img src="https://picsum.photos/seed/user2/100/100" className="w-8 h-8 rounded-full border-2 border-white" alt="User" />
                       <img src="https://picsum.photos/seed/user3/100/100" className="w-8 h-8 rounded-full border-2 border-white" alt="User" />
                     </div>
                     <div>
                       <p className="text-xs font-bold text-gray-900">Clientes Felices</p>
                       <div className="flex text-amber-400">
                         {[...Array(5)].map((_,i) => <Star key={i} size={10} className="fill-current" />)}
                       </div>
                     </div>
                   </div>
                </div>
              </div>
            </div>
          </section>

          {/* Producto Estrella Section */}
          <section className="max-w-7xl mx-auto px-4 py-16">
            <div className="bg-black rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl">
              <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center text-white">
                <div className="flex items-center gap-2 mb-6">
                  <Star className="text-yellow-400 fill-yellow-400" size={24} />
                  <span className="text-yellow-400 font-bold tracking-widest uppercase text-xs">Producto Estrella del Mes</span>
                </div>
                <h3 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Miel Artesanal Pura</h3>
                <p className="text-gray-400 text-lg md:text-xl mb-10 font-light leading-relaxed">Nuestra miel más vendida, 100% pura y sin procesar, recolectada por Apícola Boyacá. Un endulzante natural lleno de beneficios para tu salud.</p>
                <button 
                  onClick={() => { setSelectedProduct(productos.find(p => p.id === 2)); }}
                  className="bg-white text-black font-bold py-4 px-10 rounded-full self-start hover:bg-gray-100 transition-transform hover:-translate-y-1 shadow-lg"
                >
                  Ver Producto
                </button>
              </div>
              <div className="md:w-1/2 h-64 md:h-auto">
                <img src="https://picsum.photos/seed/miel2/800/800" alt="Miel Pura" className="w-full h-full object-cover" />
              </div>
            </div>
          </section>

          {/* Shop by Category */}
          <section className="max-w-7xl mx-auto px-4 pb-16">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-[1px] flex-1 bg-gray-200"></div>
              <h3 className="text-2xl font-bold text-gray-900">Comprar por Categoría</h3>
              <div className="h-[1px] flex-1 bg-gray-200"></div>
            </div>
            <div className="overflow-hidden w-full relative pause-on-hover px-4">
              <div className="animate-marquee-left flex gap-4 md:gap-6 py-2">
                {[...categorias, ...categorias].map((cat, index) => (
                  <div 
                    key={`${cat.id}-${index}`} 
                    onClick={() => { setSelectedCategory(cat.id); setCurrentView('catalogo'); }}
                    className="min-w-[160px] md:min-w-[200px] bg-white rounded-3xl p-5 flex flex-col items-center justify-center cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-none group shadow-sm flex-shrink-0"
                  >
                    <div className="w-24 h-24 mb-4 rounded-full overflow-hidden bg-gray-50 flex items-center justify-center shadow-inner">
                      {cat.id === 'ofertas' ? (
                         <div className="w-full h-full bg-black flex items-center justify-center text-white">
                           <span className="text-3xl font-black">%</span>
                         </div>
                      ) : (
                        <img src={cat.imagen} alt={cat.nombre} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      )}
                    </div>
                    <p className="font-semibold text-gray-900 text-sm group-hover:text-black transition-colors">{cat.nombre}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Featured Products */}
          <section className="max-w-7xl mx-auto px-4 pb-16">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔥</span>
                <h3 className="text-2xl font-bold text-gray-900">Productos Destacados</h3>
              </div>
              <button onClick={() => setCurrentView('catalogo')} className="text-black font-semibold hover:underline flex items-center gap-1">
                Ver catálogo <span className="text-lg">→</span>
              </button>
            </div>
            <div className="overflow-hidden w-full relative pause-on-hover px-4">
              <div className="animate-marquee-right flex gap-6 py-4">
                {[...productos.slice(0, 4), ...productos.slice(0, 4)].map((producto, index) => (
                  <div key={`${producto.id}-${index}`} className="min-w-[280px] w-[280px] flex-shrink-0 bg-white rounded-3xl p-5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative flex flex-col h-full shadow-sm">
                    <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                      {producto.etiqueta && (
                        <span className={`${producto.colorEtiqueta} text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider`}>
                          {producto.etiqueta}
                        </span>
                      )}
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); toggleFavorite(producto.id); }} className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors">
                      <Heart size={16} className={favorites.includes(producto.id) ? "fill-red-500 text-red-500" : "text-gray-400"} />
                    </button>
                    <div className="bg-gray-50 rounded-xl overflow-hidden aspect-square mb-4 cursor-pointer" onClick={() => setSelectedProduct(producto)}>
                      <img src={producto.imagen} alt={producto.nombre} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 flex flex-col pt-2">
                      <p className="text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">{producto.vendedor}</p>
                      <h4 className="text-gray-900 font-bold mb-2 cursor-pointer hover:text-black line-clamp-2" onClick={() => setSelectedProduct(producto)}>{producto.nombre}</h4>
                      <div className="flex items-baseline gap-2 mb-4 mt-auto">
                        <span className="text-xl font-black text-gray-900">${producto.precio.toLocaleString('es-CO')}</span>
                        {producto.precioOriginal && <span className="text-sm text-gray-400 line-through">${producto.precioOriginal.toLocaleString('es-CO')}</span>}
                      </div>
                      <button onClick={() => addToCart(producto)} className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 rounded-full transition-colors flex items-center justify-center gap-2">
                        <ShoppingCart size={18} /> Agregar al Carrito
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features Banner */}
          <section className="max-w-7xl mx-auto px-4 mb-20">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  { icon: <Diamond size={32} className="text-black"/>, title: 'Calidad Premium', desc: 'Productos seleccionados' },
                  { icon: <Truck size={32} className="text-black"/>, title: 'Envíos Nacionales', desc: 'A todo el país' },
                  { icon: <Store size={32} className="text-black"/>, title: 'Apoyo Local', desc: 'Directo del productor' },
                  { icon: <ShieldCheck size={32} className="text-black"/>, title: 'Compra Segura', desc: 'Trato directo' },
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-4">
                    {feat.icon}
                    <div>
                      <h4 className="font-bold text-gray-900">{feat.title}</h4>
                      <p className="text-sm text-gray-500">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* VISTA: CATÁLOGO */}
      {currentView === 'catalogo' && (
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <h2 className="text-3xl font-bold text-gray-900">Catálogo de Productos</h2>
            
            {/* Buscador Visible en Catálogo */}
            <div className="relative w-full md:w-72">
              <input 
                type="text" 
                placeholder="Buscar productos o empresas..." 
                className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-black focus:ring-1 focus:ring-black bg-gray-50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search size={18} className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          {/* Filtros de Categoría tipo Píldoras */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6 whitespace-nowrap">
            <button 
              onClick={() => setSelectedCategory('todos')}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${selectedCategory === 'todos' ? 'bg-black text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}`}
            >
              Todos
            </button>
            {categorias.map(cat => (
              <button 
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${selectedCategory === cat.id ? 'bg-black text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}`}
              >
                {cat.nombre}
              </button>
            ))}
          </div>

          {productosFiltrados.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
              <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">No encontramos productos que coincidan con tu búsqueda.</p>
              <button onClick={() => {setSearchTerm(''); setSelectedCategory('todos');}} className="mt-4 text-black font-semibold hover:underline">Limpiar filtros</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {productosFiltrados.map((producto) => (
                <div key={producto.id} className="bg-white rounded-3xl p-5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative flex flex-col h-full shadow-sm border-none">
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    {producto.etiqueta && (
                      <span className={`${producto.colorEtiqueta} text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider`}>
                        {producto.etiqueta}
                      </span>
                    )}
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); toggleFavorite(producto.id); }} className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors">
                    <Heart size={16} className={favorites.includes(producto.id) ? "fill-red-500 text-red-500" : "text-gray-400"} />
                  </button>
                  <div className="bg-gray-50 rounded-xl overflow-hidden aspect-square mb-4 cursor-pointer" onClick={() => setSelectedProduct(producto)}>
                    <img src={producto.imagen} alt={producto.nombre} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex-1 flex flex-col pt-2">
                    <p className="text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">{producto.vendedor}</p>
                    <h4 className="text-gray-900 font-bold mb-2 cursor-pointer hover:text-black line-clamp-2" onClick={() => setSelectedProduct(producto)}>{producto.nombre}</h4>
                    <div className="flex items-baseline gap-2 mb-4 mt-auto">
                      <span className="text-xl font-black text-gray-900">${producto.precio.toLocaleString('es-CO')}</span>
                      {producto.precioOriginal && <span className="text-sm text-gray-400 line-through">${producto.precioOriginal.toLocaleString('es-CO')}</span>}
                    </div>
                    <button onClick={() => addToCart(producto)} className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 rounded-full transition-colors flex items-center justify-center gap-2">
                      <ShoppingCart size={18} /> Agregar al Carrito
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* VISTA: EMPRESAS */}
      {currentView === 'empresas' && (
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Empresas Participantes</h2>
            <p className="text-gray-600">Conoce a los productores y artesanos locales que hacen posible el E-Commerce Nodo Duitama. Apoya el talento de nuestra región.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {empresas.map((empresa) => (
              <div key={empresa.id} className="bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col shadow-sm">
                <div className="h-32 bg-black relative">
                  <div className="absolute -bottom-10 left-6 w-20 h-20 bg-white rounded-full p-1 shadow-md">
                     <img src={empresa.logo} alt={empresa.nombre} className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-medium border border-white/30">
                    {empresa.categoria}
                  </div>
                </div>
                <div className="pt-14 p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{empresa.nombre}</h3>
                  <p className="text-gray-600 text-sm mb-6 flex-1 font-light leading-relaxed">{empresa.descripcion}</p>
                  
                  <button 
                    onClick={() => { setSelectedCompany(empresa); setCurrentView('perfilEmpresa'); }}
                    className="w-full bg-white border border-gray-200 text-black hover:bg-black hover:text-white font-medium py-3 rounded-full transition-colors shadow-sm"
                  >
                    Ver Perfil y Productos
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* VISTA: PERFIL DE EMPRESA */}
      {currentView === 'perfilEmpresa' && selectedCompany && (
        <section className="max-w-7xl mx-auto px-4 py-8">
          {/* Header Empresa */}
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm mb-12 flex flex-col md:flex-row items-center md:items-start gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gray-50 rounded-full -translate-y-1/2 translate-x-1/3"></div>
            
            <img src={selectedCompany.logo} alt={selectedCompany.nombre} className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-lg border-4 border-white z-10" />
            
            <div className="flex-1 text-center md:text-left z-10">
              <div className="inline-block bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
                {selectedCompany.categoria}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{selectedCompany.nombre}</h2>
              <p className="text-gray-600 text-lg mb-6 max-w-2xl">{selectedCompany.descripcion}</p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button 
                  onClick={() => window.open(`https://wa.me/${selectedCompany.whatsapp}`, '_blank')}
                  className="bg-[#25D366] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle size={20} /> Contactar Empresa
                </button>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-2">Productos de {selectedCompany.nombre}</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Filtramos los productos que pertenecen a esta empresa. Por ahora usamos vendedor === nombre para simular */}
            {productos.filter(p => p.vendedor === selectedCompany.nombre).length > 0 ? (
               productos.filter(p => p.vendedor === selectedCompany.nombre).map((producto) => (
                <div key={producto.id} className={`bg-white rounded-3xl p-5 border-none shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative flex flex-col h-full ${producto.id === selectedCompany.productoEstrellaId ? 'ring-2 ring-yellow-400' : ''}`}>
                  
                  {/* Highlight si es producto estrella */}
                  {producto.id === selectedCompany.productoEstrellaId && (
                     <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-widest z-20 shadow-md whitespace-nowrap flex items-center gap-1">
                       <Star size={12} className="fill-black" /> Estrella
                     </div>
                  )}

                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    {producto.etiqueta && (
                      <span className={`${producto.colorEtiqueta} text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider`}>
                        {producto.etiqueta}
                      </span>
                    )}
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); toggleFavorite(producto.id); }} className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors">
                    <Heart size={16} className={favorites.includes(producto.id) ? "fill-red-500 text-red-500" : "text-gray-400"} />
                  </button>
                  <div className="bg-gray-50 rounded-xl overflow-hidden aspect-square mb-4 cursor-pointer" onClick={() => setSelectedProduct(producto)}>
                    <img src={producto.imagen} alt={producto.nombre} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex-1 flex flex-col pt-2">
                    <h4 className="text-gray-900 font-bold mb-2 cursor-pointer hover:text-black line-clamp-2 mt-2" onClick={() => setSelectedProduct(producto)}>{producto.nombre}</h4>
                    <div className="flex items-baseline gap-2 mb-4 mt-auto">
                      <span className="text-xl font-black text-gray-900">${producto.precio.toLocaleString('es-CO')}</span>
                      {producto.precioOriginal && <span className="text-sm text-gray-400 line-through">${producto.precioOriginal.toLocaleString('es-CO')}</span>}
                    </div>
                    <button onClick={() => addToCart(producto)} className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 rounded-full transition-colors flex items-center justify-center gap-2">
                      <ShoppingCart size={18} /> Agregar al Carrito
                    </button>
                  </div>
                </div>
               ))
            ) : (
               <p className="text-gray-500 col-span-full">Esta empresa aún no tiene productos registrados en el catálogo.</p>
            )}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
            
            {/* Brand Info */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-black p-1.5 rounded-lg shadow-sm">
                  <ShoppingBag size={20} className="text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Artesanos<span className="font-light text-gray-500">Duitama</span></h2>
              </div>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                Tu tienda local integral para productos de alta calidad a los mejores precios.
              </p>
              <div className="flex items-center gap-4 text-gray-600 font-medium">
                <a href="#" className="hover:text-black transition-colors">Facebook</a>
                <a href="#" className="hover:text-black transition-colors">Instagram</a>
                <a href="#" className="hover:text-black transition-colors">Twitter</a>
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Tienda</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><a href="#" className="hover:text-black transition-colors">Todos los Productos</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Nuevos</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Más Vendidos</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Ofertas</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Colecciones</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-4">Atención al Cliente</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><a href="#" className="hover:text-black transition-colors">Política de Envíos</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Devoluciones y Cambios</a></li>
                <li><a href="#" className="hover:text-black transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Rastrea tu Orden</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Contáctanos</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-4">Nosotros</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><a href="#" className="hover:text-black transition-colors">Nuestra Historia</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Sostenibilidad</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Carreras</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Blog</a></li>
              </ul>
            </div>

            {/* Small subscribe & badges */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Mantente conectado</h4>
              <p className="text-sm text-gray-500 mb-4">Recibe actualizaciones sobre nuevos productos.</p>
              <div className="flex gap-2 mb-6">
                <input type="email" placeholder="Ingresa tu email" className="border border-gray-200 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black bg-gray-50" />
                <button className="bg-black hover:bg-gray-800 transition-colors text-white px-4 py-2 rounded-lg text-sm font-medium">Suscribir</button>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-gray-600">
                 <Truck size={16} className="text-black"/> 
                 <div><span className="font-bold">Envío Gratis</span><br/>Pedidos +$50k</div>
              </div>
            </div>

          </div>

          <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row items-center justify-between">
            <p className="text-xs text-gray-400">
              © 2024 Artesanos Duitama. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Modal Quick View (simplified version) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}>
          <div className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden flex flex-col md:flex-row" onClick={e => e.stopPropagation()}>
            <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-100">
               <img src={selectedProduct.imagen} alt={selectedProduct.nombre} className="w-full h-full object-cover mix-blend-multiply" />
            </div>
            <div className="p-8 w-full md:w-1/2 flex flex-col justify-center">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{selectedProduct.vendedor}</span>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{selectedProduct.nombre}</h3>
              <div className="flex items-end gap-3 mb-4">
                 <span className="text-3xl font-black text-[#1e5631]">${selectedProduct.precio.toLocaleString('es-CO')}</span>
                 {selectedProduct.precioOriginal && (
                    <span className="text-lg text-gray-400 line-through mb-1">${selectedProduct.precioOriginal.toLocaleString('es-CO')}</span>
                 )}
              </div>
              <p className="text-gray-600 mb-8">{selectedProduct.descripcion}</p>
              
              <button 
                onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                className="w-full bg-black text-white font-bold py-4 rounded-full flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors shadow-lg"
              >
                <ShoppingCart size={20} /> Agregar al Carrito
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}>
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <ShoppingCart size={24} className="text-black" />
                Mi Carrito ({cartTotalItems})
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-4">
                  <ShoppingBag size={64} className="opacity-50" />
                  <p>Tu carrito está vacío</p>
                  <button onClick={() => {setIsCartOpen(false); setCurrentView('catalogo');}} className="mt-4 px-8 py-3 bg-black hover:bg-gray-800 transition-colors text-white rounded-full font-medium shadow-md">Ver productos</button>
                </div>
              ) : (
                <div className="space-y-6">
                  {Object.entries(agruparCarritoPorEmpresa()).map(([vendedor, items]) => {
                    const subtotalVendedor = items.reduce((acc, item) => acc + (item.producto.precio * item.cantidad), 0);
                    return (
                      <div key={vendedor} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2 mb-4 border-b border-gray-50 pb-2">
                          <Store size={18} className="text-black" />
                          <h3 className="font-bold text-gray-900">{vendedor}</h3>
                        </div>
                        
                        <div className="space-y-4 mb-4">
                          {items.map(item => (
                            <div key={item.producto.id} className="flex gap-4">
                              <img src={item.producto.imagen} alt={item.producto.nombre} className="w-16 h-16 object-cover rounded-xl bg-gray-50" />
                              <div className="flex-1">
                                <h4 className="text-sm font-medium text-gray-900 line-clamp-2">{item.producto.nombre}</h4>
                                <p className="text-black font-bold mt-1">${item.producto.precio.toLocaleString('es-CO')}</p>
                                
                                <div className="flex items-center justify-between mt-2">
                                  <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                                    <button onClick={() => updateQuantity(item.producto.id, -1)} className="p-1 text-gray-500 hover:text-black hover:bg-gray-100 rounded-l-lg transition-colors"><Minus size={14} /></button>
                                    <span className="w-8 text-center text-sm font-medium">{item.cantidad}</span>
                                    <button onClick={() => updateQuantity(item.producto.id, 1)} className="p-1 text-gray-500 hover:text-black hover:bg-gray-100 rounded-r-lg transition-colors"><Plus size={14} /></button>
                                  </div>
                                  <button onClick={() => removeFromCart(item.producto.id)} className="text-gray-400 hover:text-red-500 p-1">
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="border-t border-gray-50 pt-4 mt-2">
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-600 font-medium">Subtotal Empresa:</span>
                            <span className="text-lg font-bold text-gray-900">${subtotalVendedor.toLocaleString('es-CO')}</span>
                          </div>
                          <button 
                            onClick={() => sendWhatsAppOrder(vendedor, items)}
                            className="w-full bg-[#25D366] text-white font-medium py-3 rounded-full hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-2 shadow-sm"
                          >
                            <MessageCircle size={18} /> Pedir a esta Empresa
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            
            {cartItems.length > 0 && (
              <div className="p-4 bg-white border-t border-gray-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-500 font-medium">Total Global Estimado</span>
                  <span className="text-xl font-black text-black">
                    ${cartItems.reduce((acc, item) => acc + (item.producto.precio * item.cantidad), 0).toLocaleString('es-CO')}
                  </span>
                </div>
                <p className="text-xs text-gray-400 text-center">Debes enviar el pedido individualmente a cada empresa usando los botones verdes de arriba.</p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
