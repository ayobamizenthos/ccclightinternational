import { motion } from "framer-motion";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";
import imoleExterior from "@/assets/imole-exterior.png";
import gladeInterior from "@/assets/church-interior-glade.jpg";

const CathedralShowcase = () => {
  return (
    <section className="section bg-divine-ivory relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-gradient-radial from-primary/5 to-transparent blur-3xl" />
      </div>

      <div className="container-wide relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <ScrollReveal>
            <span 
              className="inline-block text-[11px] md:text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-4"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Our Sacred Space
            </span>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              <span className="text-gradient-teal">CCC Light Parish</span>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.15} direction="none">
            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
          </ScrollReveal>
        </div>

        {/* Image Grid */}
        <StaggerContainer className="grid md:grid-cols-2 gap-5 md:gap-6 mb-12 md:mb-16 max-w-5xl mx-auto" staggerDelay={0.12}>
          {[
            { img: imoleExterior, label: "Parish Exterior" }, 
            { img: gladeInterior, label: "Sacred Interior" }
          ].map((item, i) => (
            <StaggerItem key={i}>
              <motion.div
                className="image-frame-teal aspect-[4/3] group"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              >
                <img 
                  src={item.img} 
                  alt={item.label} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(195_45%_15%/0.7)] via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span 
                    className="text-white/90 text-sm md:text-base font-medium"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    {item.label}
                  </span>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Blockquote */}
        <ScrollReveal delay={0.25}>
          <blockquote className="text-center max-w-3xl mx-auto glass-card p-8 md:p-12">
            <p 
              className="text-lg md:text-xl lg:text-2xl italic leading-relaxed text-foreground mb-4" 
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              "The glory of this latter house shall be greater than the former... and in this place will I give peace."
            </p>
            <cite 
              className="text-xs tracking-[0.15em] uppercase text-primary not-italic font-semibold"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              — Haggai 2:9
            </cite>
          </blockquote>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CathedralShowcase;
