import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Play, Pause, Maximize2, Images } from "lucide-react";
import imoleExterior from "@/assets/imole-exterior.png";
import gladeInterior from "@/assets/church-interior-glade.jpg";

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

const galleryImages: GalleryImage[] = [
  { src: imoleExterior, alt: "CCC Light Parish Exterior - Main Building", category: "Exterior" },
  { src: gladeInterior, alt: "CCC Light Parish Interior - Worship Hall", category: "Interior" },
  { src: imoleExterior, alt: "Parish Entrance - Welcome Area", category: "Exterior" },
  { src: gladeInterior, alt: "Sanctuary - Sacred Space", category: "Interior" },
  { src: imoleExterior, alt: "Parish Architecture - Divine Design", category: "Exterior" },
  { src: gladeInterior, alt: "Altar Area - Place of Worship", category: "Interior" },
];

const ImageGallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const categories = ["All", "Exterior", "Interior"];
  
  const filteredImages = activeFilter === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeFilter);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      
      if (e.key === "Escape") {
        setSelectedIndex(null);
        setIsZoomed(false);
      } else if (e.key === "ArrowLeft") {
        navigatePrev();
      } else if (e.key === "ArrowRight") {
        navigateNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, navigateNext, navigatePrev]);

  useEffect(() => {
    if (!isPlaying || selectedIndex === null) return;
    
    const interval = setInterval(() => {
      setSelectedIndex(prev => 
        prev !== null ? (prev + 1) % filteredImages.length : 0
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying, selectedIndex, filteredImages.length]);

  const navigateNext = useCallback(() => {
    setSelectedIndex(prev => 
      prev !== null ? (prev + 1) % filteredImages.length : 0
    );
    setIsZoomed(false);
  }, [filteredImages.length]);

  const navigatePrev = useCallback(() => {
    setSelectedIndex(prev => 
      prev !== null ? (prev - 1 + filteredImages.length) % filteredImages.length : 0
    );
    setIsZoomed(false);
  }, [filteredImages.length]);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setIsZoomed(false);
    setIsPlaying(false);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    setIsZoomed(false);
    setIsPlaying(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="gallery" className="py-32 relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[hsl(45,25%,97%)] to-white" />
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-[hsl(43,90%,52%)] rounded-full filter blur-[280px] opacity-[0.05]" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-[hsl(210,70%,48%)] rounded-full filter blur-[250px] opacity-[0.04]" />
        <div className="absolute inset-0 opacity-[0.015] cross-pattern" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          className="text-center mb-16 space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.span
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[hsl(43,90%,52%,0.1)] border border-[hsl(43,90%,52%,0.3)]"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <Images className="w-4 h-4 text-[hsl(43,90%,52%)]" />
            <span className="text-[hsl(40,85%,35%)] text-xs font-semibold tracking-[0.2em] uppercase">
              Photo Gallery
            </span>
          </motion.span>
          
          <motion.h2
            className="text-5xl md:text-7xl font-heading font-light tracking-wide leading-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-[hsl(220,20%,25%)]">Our </span>
            <span className="text-gradient-gold">Parish</span>
          </motion.h2>
          
          <motion.div
            className="flex items-center justify-center gap-4"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="w-24 h-px bg-gradient-to-r from-transparent to-[hsl(43,90%,52%)]" />
            <div className="w-3 h-3 rotate-45 bg-[hsl(43,90%,52%)] shadow-[0_0_15px_hsl(43,90%,52%,0.5)]" />
            <div className="w-24 h-px bg-gradient-to-l from-transparent to-[hsl(43,90%,52%)]" />
          </motion.div>
          
          <motion.p
            className="text-xl md:text-2xl text-[hsl(220,15%,45%)] mt-8 font-light tracking-wide"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Explore the beauty of CCC Light Parish through our lens
          </motion.p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="flex justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-3 rounded-full text-sm font-medium tracking-wider transition-all duration-500 ${
                activeFilter === category
                  ? "bg-gradient-to-r from-[hsl(43,90%,52%)] to-[hsl(40,85%,45%)] text-white shadow-[0_8px_30px_rgba(210,172,71,0.3)]"
                  : "bg-white/80 border border-[hsl(43,90%,52%,0.2)] text-[hsl(220,15%,40%)] hover:border-[hsl(43,90%,52%,0.5)] hover:shadow-lg"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {filteredImages.map((image, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative cursor-pointer"
              onClick={() => openLightbox(index)}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur-xl border border-[hsl(43,90%,52%,0.15)] shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgba(210,172,71,0.2)] transition-all duration-700">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="inline-block px-3 py-1 rounded-full bg-[hsl(43,90%,52%,0.9)] text-white text-xs font-semibold tracking-wider mb-2">
                      {image.category}
                    </span>
                    <p className="text-white font-light text-sm">{image.alt}</p>
                  </motion.div>
                  
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <motion.div 
                      className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                    >
                      <Maximize2 className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>
                </div>
                
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[hsl(43,90%,52%,0.3)] rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[hsl(43,90%,52%,0.3)] rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
              onClick={closeLightbox}
            />
            
            <div className="absolute top-0 left-0 right-0 z-20 p-6 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-white/60 text-sm font-light">
                  {selectedIndex + 1} / {filteredImages.length}
                </span>
                <span className="text-[hsl(43,90%,60%)] text-sm font-medium ml-4">
                  {filteredImages[selectedIndex].category}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <motion.button
                  className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white/80 hover:bg-white/20 transition-all"
                  onClick={() => setIsZoomed(!isZoomed)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
                </motion.button>
                
                <motion.button
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all ${
                    isPlaying 
                      ? "bg-[hsl(43,90%,52%)] border-[hsl(43,90%,52%)] text-white" 
                      : "bg-white/10 border-white/20 text-white/80 hover:bg-white/20"
                  }`}
                  onClick={() => setIsPlaying(!isPlaying)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </motion.button>
                
                <motion.button
                  className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white/80 hover:bg-red-500/80 transition-all"
                  onClick={closeLightbox}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
            
            <motion.div
              className={`relative z-10 max-w-[90vw] max-h-[80vh] transition-transform duration-500 ${
                isZoomed ? "cursor-zoom-out scale-150" : "cursor-zoom-in"
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              key={selectedIndex}
            >
              <img
                src={filteredImages[selectedIndex].src}
                alt={filteredImages[selectedIndex].alt}
                className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.5)]"
              />
            </motion.div>
            
            <motion.button
              className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:bg-[hsl(43,90%,52%)] transition-all"
              onClick={(e) => { e.stopPropagation(); navigatePrev(); }}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            
            <motion.button
              className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:bg-[hsl(43,90%,52%)] transition-all"
              onClick={(e) => { e.stopPropagation(); navigateNext(); }}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2 p-3 rounded-2xl bg-black/50 backdrop-blur-xl border border-white/10">
              {filteredImages.map((image, index) => (
                <motion.button
                  key={index}
                  className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    index === selectedIndex 
                      ? "border-[hsl(43,90%,52%)] shadow-[0_0_15px_hsl(43,90%,52%,0.5)]" 
                      : "border-transparent opacity-50 hover:opacity-100"
                  }`}
                  onClick={(e) => { e.stopPropagation(); setSelectedIndex(index); setIsZoomed(false); }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
                </motion.button>
              ))}
            </div>
            
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 text-center">
              <p className="text-white/90 font-light text-lg">
                {filteredImages[selectedIndex].alt}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ImageGallery;
