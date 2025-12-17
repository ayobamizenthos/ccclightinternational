import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ChevronDown, Globe2, Check } from "lucide-react";
import { branches, Branch } from "@/data/branches";

interface BranchSelectorProps {
  selectedBranch?: Branch;
  onBranchSelect?: (branch: Branch) => void;
  variant?: "header" | "inline" | "card";
}

const BranchSelector = ({ 
  selectedBranch, 
  onBranchSelect, 
  variant = "header" 
}: BranchSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const headquarters = branches.find(b => b.isHeadquarters);
  const currentBranch = selectedBranch || headquarters;

  const handleSelect = (branch: Branch) => {
    onBranchSelect?.(branch);
    setIsOpen(false);
  };

  if (variant === "card") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {branches.map((branch, index) => (
          <motion.button
            key={branch.id}
            onClick={() => handleSelect(branch)}
            className={`group relative p-5 rounded-2xl text-left transition-all duration-300 overflow-hidden ${
              currentBranch?.id === branch.id 
                ? 'ring-2 ring-accent bg-accent/5' 
                : 'bg-card hover:bg-accent/5'
            }`}
            style={{
              border: '1px solid hsl(var(--border))',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Selected indicator */}
            {currentBranch?.id === branch.id && (
              <motion.div
                className="absolute top-3 right-3 w-6 h-6 rounded-full bg-accent flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                <Check className="w-3.5 h-3.5 text-accent-foreground" />
              </motion.div>
            )}

            {/* HQ Badge */}
            {branch.isHeadquarters && (
              <div className="absolute top-3 left-3">
                <span 
                  className="px-2 py-1 text-[9px] font-bold tracking-wider uppercase rounded-full bg-accent/20 text-accent"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  Headquarters
                </span>
              </div>
            )}

            <div className="mt-6">
              {/* Branch icon/logo placeholder */}
              <div 
                className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary)/0.15), hsl(var(--accent)/0.1))',
                  border: '1px solid hsl(var(--accent)/0.2)',
                }}
              >
                <Globe2 className="w-5 h-5 text-accent" />
              </div>

              <h4 
                className="font-medium text-foreground mb-1 group-hover:text-accent transition-colors"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {branch.shortName}
              </h4>
              
              <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                <MapPin className="w-3.5 h-3.5" />
                <span style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {branch.address.city}, {branch.address.country}
                </span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 ${
          variant === "header" 
            ? "bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20" 
            : "bg-card hover:bg-accent/5 border border-border"
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <MapPin className={`w-4 h-4 ${variant === "header" ? "text-accent" : "text-accent"}`} />
        <span 
          className={`text-sm font-medium ${variant === "header" ? "text-white" : "text-foreground"}`}
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          {currentBranch?.shortName || "Select Branch"}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className={`w-4 h-4 ${variant === "header" ? "text-white/60" : "text-muted-foreground"}`} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              className="absolute top-full left-0 mt-2 w-72 z-50 rounded-2xl overflow-hidden"
              style={{
                background: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
              }}
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-2">
                <p 
                  className="px-3 py-2 text-[10px] font-semibold tracking-[0.15em] uppercase text-muted-foreground"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  Select Location
                </p>
                
                <div className="space-y-1">
                  {branches.map((branch) => (
                    <motion.button
                      key={branch.id}
                      onClick={() => handleSelect(branch)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 ${
                        currentBranch?.id === branch.id 
                          ? 'bg-accent/10' 
                          : 'hover:bg-muted'
                      }`}
                      whileHover={{ x: 4 }}
                    >
                      <div 
                        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          currentBranch?.id === branch.id 
                            ? 'bg-accent text-accent-foreground' 
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {branch.isHeadquarters ? (
                          <Globe2 className="w-4 h-4" />
                        ) : (
                          <MapPin className="w-4 h-4" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span 
                            className={`text-sm font-medium truncate ${
                              currentBranch?.id === branch.id ? 'text-accent' : 'text-foreground'
                            }`}
                            style={{ fontFamily: 'Outfit, sans-serif' }}
                          >
                            {branch.shortName}
                          </span>
                          {branch.isHeadquarters && (
                            <span className="px-1.5 py-0.5 text-[8px] font-bold tracking-wider uppercase rounded bg-accent/20 text-accent">
                              HQ
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground truncate block">
                          {branch.address.country}
                        </span>
                      </div>

                      {currentBranch?.id === branch.id && (
                        <Check className="w-4 h-4 text-accent flex-shrink-0" />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BranchSelector;
