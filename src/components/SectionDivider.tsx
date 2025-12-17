import { Cross } from "lucide-react";
import { memo } from "react";

interface SectionDividerProps {
  variant?: "gold" | "teal" | "celestial";
  showCross?: boolean;
}

const SectionDivider = memo(({ variant = "celestial", showCross = true }: SectionDividerProps) => {
  const gradients = {
    gold: "linear-gradient(90deg, transparent, rgba(212,175,55,0.6), rgba(255,248,225,0.8), rgba(212,175,55,0.6), transparent)",
    teal: "linear-gradient(90deg, transparent, rgba(70,120,135,0.6), rgba(16,185,129,0.5), rgba(70,120,135,0.6), transparent)",
    celestial: "linear-gradient(90deg, transparent, rgba(70,120,135,0.5), rgba(212,175,55,0.6), rgba(70,120,135,0.5), transparent)",
  };

  const colors = {
    gold: "#D4AF37",
    teal: "#10B981",
    celestial: "#467887",
  };

  return (
    <div className="relative py-8 md:py-12 overflow-hidden">
      <div className="relative flex items-center justify-center">
        {/* Left decorative dots - static */}
        <div className="flex items-center gap-2 mr-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: 4 + i * 2,
                height: 4 + i * 2,
                background: colors[variant],
                opacity: 0.4 + i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Left line */}
        <div 
          className="flex-1 h-[1px] max-w-[200px] md:max-w-[300px]"
          style={{ background: gradients[variant] }}
        />

        {/* Center element */}
        {showCross ? (
          <div className="relative mx-4 md:mx-6">
            {/* Diamond container */}
            <div 
              className="relative w-10 h-10 md:w-12 md:h-12 rotate-45 flex items-center justify-center"
              style={{
                background: variant === "gold" 
                  ? "linear-gradient(135deg, rgba(212,175,55,0.2), rgba(212,175,55,0.05))"
                  : variant === "teal"
                  ? "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.05))"
                  : "linear-gradient(135deg, rgba(70,120,135,0.2), rgba(212,175,55,0.1))",
                border: variant === "gold" 
                  ? "1px solid rgba(212,175,55,0.4)"
                  : variant === "teal"
                  ? "1px solid rgba(16,185,129,0.4)"
                  : "1px solid rgba(70,120,135,0.4)",
                borderRadius: "4px",
              }}
            >
              <Cross 
                className="-rotate-45" 
                style={{ 
                  color: colors[variant],
                  width: 16,
                  height: 16,
                }}
                strokeWidth={1.5}
              />
            </div>
          </div>
        ) : (
          <div className="mx-4 md:mx-6">
            <div
              className="w-3 h-3 rounded-full"
              style={{
                background: variant === "gold" 
                  ? "linear-gradient(135deg, #D4AF37, #FFF8E1)"
                  : variant === "teal"
                  ? "linear-gradient(135deg, #10B981, #6EE7B7)"
                  : "linear-gradient(135deg, #467887, #D4AF37)",
              }}
            />
          </div>
        )}

        {/* Right line */}
        <div 
          className="flex-1 h-[1px] max-w-[200px] md:max-w-[300px]"
          style={{ background: gradients[variant] }}
        />

        {/* Right decorative dots - static */}
        <div className="flex items-center gap-2 ml-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: 8 - i * 2,
                height: 8 - i * 2,
                background: colors[variant],
                opacity: 0.8 - i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

SectionDivider.displayName = "SectionDivider";

export default SectionDivider;
