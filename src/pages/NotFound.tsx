import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const NotFound = () => {
  return (
    <>
      <SEO
        title="Page Not Found - CCC Light International Parish"
        description="The page you're looking for doesn't exist. Return to CCC Light International Parish homepage."
        url="/404"
      />
      <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #0a1628 0%, #0c1e38 50%, #0a1628 100%)' }}>
        <Navigation />
        
        <div className="min-h-[80vh] flex items-center justify-center px-5">
          <motion.div 
            className="text-center max-w-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* 404 Number */}
            <motion.h1 
              className="text-8xl md:text-9xl font-bold mb-4"
              style={{ 
                fontFamily: 'Playfair Display, serif',
                background: 'linear-gradient(135deg, hsl(var(--primary)), #D4AF37)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              404
            </motion.h1>
            
            <h2 
              className="text-2xl md:text-3xl font-medium text-white mb-4"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Page Not Found
            </h2>
            
            <p 
              className="text-white/60 mb-8"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              The page you're looking for doesn't exist or has been moved. 
              Let us guide you back to the path of light.
            </p>
            
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/">
                <motion.button
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37, #A07C32)',
                    color: 'white',
                    boxShadow: '0 8px 25px rgba(212,175,55,0.3)',
                  }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Home className="w-4 h-4" />
                  Return Home
                </motion.button>
              </Link>
              
              <motion.button
                onClick={() => window.history.back()}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all border"
                style={{
                  background: 'transparent',
                  color: 'white',
                  borderColor: 'rgba(212,175,55,0.3)',
                }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -2,
                  borderColor: 'rgba(212,175,55,0.6)',
                  background: 'rgba(212,175,55,0.05)',
                }}
                whileTap={{ scale: 0.98 }}
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </motion.button>
            </div>
          </motion.div>
        </div>
        
        {/* Footer removed */}
      </div>
    </>
  );
};

export default NotFound;
