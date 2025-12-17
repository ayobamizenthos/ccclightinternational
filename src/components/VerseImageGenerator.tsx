import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Share2, Image, Palette, Type, Check } from 'lucide-react';
import { toast } from 'sonner';

interface VerseImageGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
  verseText: string;
  verseReference: string;
}

const platforms = [
  { id: 'instagram', name: 'Post', width: 1080, height: 1080 },
  { id: 'story', name: 'Story', width: 1080, height: 1920 },
  { id: 'facebook', name: 'Cover', width: 1200, height: 630 },
  { id: 'twitter', name: 'Twitter', width: 1200, height: 675 },
];

// Minimalist light luxury backgrounds for clear text visibility
const backgrounds = [
  { id: 'cream', gradient: 'linear-gradient(145deg, #FDFCF9 0%, #F5F0E6 100%)', name: 'Cream', textColor: '#1a1a1a' },
  { id: 'ivory', gradient: 'linear-gradient(135deg, #FFFFF0 0%, #FAF8F0 100%)', name: 'Ivory', textColor: '#2d2d2d' },
  { id: 'pearl', gradient: 'linear-gradient(145deg, #F8F6F3 0%, #EDE8E0 100%)', name: 'Pearl', textColor: '#1a1a1a' },
  { id: 'linen', gradient: 'linear-gradient(135deg, #FAF0E6 0%, #F5E6D3 100%)', name: 'Linen', textColor: '#3d2b1f' },
  { id: 'sage', gradient: 'linear-gradient(145deg, #F5F5F0 0%, #E8EBE4 100%)', name: 'Sage', textColor: '#2d3830' },
  { id: 'slate', gradient: 'linear-gradient(135deg, #F4F4F5 0%, #E4E4E7 100%)', name: 'Slate', textColor: '#27272a' },
];

const fonts = [
  { id: 'playfair', name: 'Elegant', family: '"Playfair Display", Georgia, serif' },
  { id: 'georgia', name: 'Classic', family: 'Georgia, Times, serif' },
  { id: 'cormorant', name: 'Refined', family: '"Cormorant Garamond", Georgia, serif' },
];

export const VerseImageGenerator = ({ isOpen, onClose, verseText, verseReference }: VerseImageGeneratorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedPlatform, setSelectedPlatform] = useState(platforms[0]);
  const [selectedBg, setSelectedBg] = useState(backgrounds[0]);
  const [selectedFont, setSelectedFont] = useState(fonts[0]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateImage = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    canvas.width = selectedPlatform.width;
    canvas.height = selectedPlatform.height;

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    const colors = selectedBg.gradient.match(/#[a-fA-F0-9]{6}/g) || ['#FDFCF9', '#F5F0E6'];
    colors.forEach((color, index) => {
      gradient.addColorStop(index / (colors.length - 1), color);
    });
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw subtle corner decorations
    const cornerSize = Math.min(canvas.width, canvas.height) * 0.08;
    ctx.strokeStyle = `${selectedBg.textColor}15`;
    ctx.lineWidth = 2;
    
    // Top-left corner
    ctx.beginPath();
    ctx.moveTo(cornerSize * 0.4, cornerSize);
    ctx.lineTo(cornerSize * 0.4, cornerSize * 0.4);
    ctx.lineTo(cornerSize, cornerSize * 0.4);
    ctx.stroke();
    
    // Bottom-right corner
    ctx.beginPath();
    ctx.moveTo(canvas.width - cornerSize * 0.4, canvas.height - cornerSize);
    ctx.lineTo(canvas.width - cornerSize * 0.4, canvas.height - cornerSize * 0.4);
    ctx.lineTo(canvas.width - cornerSize, canvas.height - cornerSize * 0.4);
    ctx.stroke();

    // Calculate font sizes
    const baseFontSize = Math.min(canvas.width, canvas.height) * 0.035;
    const quoteFontSize = baseFontSize * 3;
    const verseFontSize = baseFontSize * 1.1;
    const refFontSize = baseFontSize * 0.85;
    const brandingSize = baseFontSize * 0.55;
    const lineHeight = verseFontSize * 1.7;

    // Configure text
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Word wrap verse text
    const padding = canvas.width * 0.12;
    const maxWidth = canvas.width - (padding * 2);
    const words = verseText.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    ctx.font = `italic ${verseFontSize}px ${selectedFont.family}`;

    words.forEach(word => {
      const testLine = currentLine + word + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && currentLine !== '') {
        lines.push(currentLine.trim());
        currentLine = word + ' ';
      } else {
        currentLine = testLine;
      }
    });
    lines.push(currentLine.trim());

    // Center text vertically
    const totalTextHeight = lines.length * lineHeight;
    let startY = (canvas.height - totalTextHeight) / 2 - lineHeight * 0.5;

    // Draw quotation mark
    ctx.font = `${quoteFontSize}px ${selectedFont.family}`;
    ctx.fillStyle = `${selectedBg.textColor}10`;
    ctx.fillText('"', canvas.width / 2, startY - quoteFontSize * 0.2);

    // Draw verse lines
    ctx.fillStyle = selectedBg.textColor;
    ctx.font = `italic ${verseFontSize}px ${selectedFont.family}`;

    lines.forEach((line, index) => {
      ctx.fillText(line, canvas.width / 2, startY + index * lineHeight);
    });

    // Draw reference
    ctx.font = `600 ${refFontSize}px ${selectedFont.family}`;
    ctx.fillStyle = `${selectedBg.textColor}cc`;
    const refY = startY + lines.length * lineHeight + lineHeight * 0.6;
    ctx.fillText(`— ${verseReference}`, canvas.width / 2, refY);

    // Draw branding
    ctx.font = `500 ${brandingSize}px Inter, system-ui, sans-serif`;
    ctx.fillStyle = `${selectedBg.textColor}50`;
    ctx.fillText('CCC Light International Parish', canvas.width / 2, canvas.height - padding * 0.4);

    return canvas.toDataURL('image/png');
  }, [selectedBg, selectedFont, selectedPlatform, verseText, verseReference]);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const imageUrl = await generateImage();
      if (!imageUrl) throw new Error('Failed to generate image');

      const link = document.createElement('a');
      link.download = `verse-${selectedPlatform.id}-${verseReference.replace(/\s/g, '-')}.png`;
      link.href = imageUrl;
      link.click();
      
      toast.success('Image downloaded');
    } catch (error) {
      toast.error('Failed to download');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = async () => {
    setIsGenerating(true);
    try {
      const imageUrl = await generateImage();
      if (!imageUrl) throw new Error('Failed to generate image');

      const res = await fetch(imageUrl);
      const blob = await res.blob();
      const file = new File([blob], `verse-${selectedPlatform.id}.png`, { type: 'image/png' });

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: verseReference,
          text: `"${verseText}" — ${verseReference}`,
        });
        toast.success('Shared');
        return;
      }
      
      await navigator.clipboard.writeText(`"${verseText}" — ${verseReference}`);
      toast.success('Copied to clipboard');
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        try {
          await navigator.clipboard.writeText(`"${verseText}" — ${verseReference}`);
          toast.success('Copied to clipboard');
        } catch {
          toast.error('Failed to share');
        }
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const getPreviewStyle = () => {
    const ratio = selectedPlatform.height / selectedPlatform.width;
    return { 
      width: ratio > 1.2 ? '55%' : '100%', 
      aspectRatio: `${selectedPlatform.width}/${selectedPlatform.height}` 
    };
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-sm bg-[#FDFCF9] rounded-2xl overflow-hidden"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-stone-100">
              <h2 className="text-sm font-bold text-stone-800 flex items-center gap-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                <div className="w-7 h-7 rounded-lg bg-stone-900 flex items-center justify-center">
                  <Image className="w-3.5 h-3.5 text-white" />
                </div>
                Create Image
              </h2>
              <motion.button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center"
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-4 h-4 text-stone-500" />
              </motion.button>
            </div>

            <div className="p-4 space-y-4">
              {/* Platform Selection */}
              <div>
                <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-2 block">
                  Size
                </span>
                <div className="flex gap-1.5">
                  {platforms.map(platform => (
                    <motion.button
                      key={platform.id}
                      onClick={() => setSelectedPlatform(platform)}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        selectedPlatform.id === platform.id 
                          ? 'bg-stone-900 text-white' 
                          : 'bg-stone-100 text-stone-600'
                      }`}
                      whileTap={{ scale: 0.96 }}
                    >
                      {platform.name}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className="flex justify-center">
                <div 
                  className="rounded-xl overflow-hidden flex items-center justify-center p-4 transition-all"
                  style={{ ...getPreviewStyle(), background: selectedBg.gradient, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
                >
                  <div className="text-center" style={{ color: selectedBg.textColor }}>
                    <p className="text-xl opacity-10 mb-0.5" style={{ fontFamily: selectedFont.family }}>"</p>
                    <p 
                      className="text-sm italic leading-relaxed mb-1.5"
                      style={{ fontFamily: selectedFont.family }}
                    >
                      {verseText.length > 100 ? verseText.substring(0, 100) + '...' : verseText}
                    </p>
                    <p className="text-[10px] font-semibold opacity-80">— {verseReference}</p>
                  </div>
                </div>
              </div>

              {/* Background Selection */}
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <Palette className="w-3 h-3 text-stone-400" />
                  <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">Style</span>
                </div>
                <div className="flex gap-2">
                  {backgrounds.map(bg => (
                    <motion.button
                      key={bg.id}
                      onClick={() => setSelectedBg(bg)}
                      className={`w-10 h-10 rounded-lg relative transition-all border ${
                        selectedBg.id === bg.id ? 'ring-2 ring-stone-900 ring-offset-2 scale-105' : 'border-stone-200'
                      }`}
                      style={{ background: bg.gradient }}
                      whileTap={{ scale: 0.92 }}
                    >
                      {selectedBg.id === bg.id && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-stone-700" />
                        </div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Font Selection */}
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <Type className="w-3 h-3 text-stone-400" />
                  <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">Font</span>
                </div>
                <div className="flex gap-1.5">
                  {fonts.map(font => (
                    <motion.button
                      key={font.id}
                      onClick={() => setSelectedFont(font)}
                      className={`flex-1 px-2.5 py-2 rounded-lg text-xs transition-all ${
                        selectedFont.id === font.id 
                          ? 'bg-stone-900 text-white font-semibold' 
                          : 'bg-stone-100 text-stone-600'
                      }`}
                      style={{ fontFamily: font.family }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {font.name}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-1">
                <motion.button
                  onClick={handleDownload}
                  disabled={isGenerating}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-stone-900 text-white rounded-xl font-semibold text-sm disabled:opacity-50"
                  whileTap={{ scale: 0.97 }}
                >
                  <Download className="w-4 h-4" />
                  Download
                </motion.button>
                <motion.button
                  onClick={handleShare}
                  disabled={isGenerating}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-stone-100 text-stone-800 rounded-xl font-semibold text-sm disabled:opacity-50"
                  whileTap={{ scale: 0.97 }}
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </motion.button>
              </div>
            </div>

            <canvas ref={canvasRef} className="hidden" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VerseImageGenerator;
