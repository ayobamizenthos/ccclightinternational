import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import useHapticFeedback from "@/hooks/useHapticFeedback";

const BackButton = memo(() => {
  const navigate = useNavigate();
  const { trigger } = useHapticFeedback();

  const handleClick = () => {
    trigger('light');
    navigate(-1);
  };

  return (
    <motion.button
      onClick={handleClick}
      className="fixed top-24 left-4 z-40 group touch-manipulation"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ x: -2 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Go back"
    >
      <motion.div 
        className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          background: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(212,175,55,0.2)',
        }}
        whileHover={{
          background: 'rgba(212,175,55,0.15)',
          borderColor: 'rgba(212,175,55,0.4)',
          boxShadow: '0 8px 25px rgba(212,175,55,0.2)',
        }}
      >
        <ChevronLeft className="w-5 h-5 text-gold" strokeWidth={2} />
      </motion.div>
    </motion.button>
  );
});

BackButton.displayName = 'BackButton';

export default BackButton;