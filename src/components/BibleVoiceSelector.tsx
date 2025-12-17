import { memo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Check, Volume2, Mic } from 'lucide-react';

interface BibleVoiceSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  selectedVoice: SpeechSynthesisVoice | null;
  onSelectVoice: (voice: SpeechSynthesisVoice) => void;
}

const sampleText = "For God so loved the world, that he gave his only begotten Son.";

const BibleVoiceSelector = memo(({ isOpen, onClose, selectedVoice, onSelectVoice }: BibleVoiceSelectorProps) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [previewingVoice, setPreviewingVoice] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const loadVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      // Filter for English voices and prioritize premium ones
      const englishVoices = allVoices
        .filter(v => v.lang.startsWith('en'))
        .sort((a, b) => {
          // Prioritize Google and Microsoft voices
          const aScore = a.name.includes('Google') ? 2 : a.name.includes('Microsoft') ? 1 : 0;
          const bScore = b.name.includes('Google') ? 2 : b.name.includes('Microsoft') ? 1 : 0;
          return bScore - aScore;
        });
      setVoices(englishVoices);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => { window.speechSynthesis.onvoiceschanged = null; };
  }, []);

  const previewVoice = (voice: SpeechSynthesisVoice) => {
    window.speechSynthesis.cancel();
    
    if (previewingVoice === voice.name && isPlaying) {
      setIsPlaying(false);
      setPreviewingVoice(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(sampleText);
    utterance.voice = voice;
    utterance.rate = 0.9;
    utterance.pitch = 1;

    utterance.onstart = () => {
      setIsPlaying(true);
      setPreviewingVoice(voice.name);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setPreviewingVoice(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleSelect = (voice: SpeechSynthesisVoice) => {
    window.speechSynthesis.cancel();
    onSelectVoice(voice);
    onClose();
  };

  const getVoiceLabel = (voice: SpeechSynthesisVoice) => {
    if (voice.name.includes('Google UK English Male')) return 'British Male';
    if (voice.name.includes('Google UK English Female')) return 'British Female';
    if (voice.name.includes('Google US English')) return 'American';
    if (voice.name.includes('Microsoft David')) return 'David';
    if (voice.name.includes('Microsoft Mark')) return 'Mark';
    if (voice.name.includes('Microsoft Zira')) return 'Zira';
    if (voice.name.includes('Daniel')) return 'Daniel';
    if (voice.name.includes('Samantha')) return 'Samantha';
    if (voice.name.includes('Karen')) return 'Karen';
    if (voice.name.includes('Alex')) return 'Alex';
    return voice.name.split(' ').slice(0, 2).join(' ');
  };

  const getVoiceType = (voice: SpeechSynthesisVoice) => {
    if (voice.name.includes('Google')) return 'Premium';
    if (voice.name.includes('Microsoft')) return 'Enhanced';
    return 'Standard';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[80vh] overflow-hidden"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
                  <Mic className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Choose Voice</h2>
                  <p className="text-xs text-gray-500">Select your preferred narrator</p>
                </div>
              </div>
              <motion.button
                onClick={onClose}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-5 h-5 text-gray-600" />
              </motion.button>
            </div>

            {/* Voice List */}
            <div className="overflow-y-auto max-h-[calc(80vh-80px)] p-4 space-y-2">
              {voices.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Loading voices...
                </div>
              ) : (
                voices.slice(0, 12).map((voice) => {
                  const isSelected = selectedVoice?.name === voice.name;
                  const isPreviewing = previewingVoice === voice.name;
                  const voiceType = getVoiceType(voice);

                  return (
                    <motion.div
                      key={voice.name}
                      className={`flex items-center gap-4 p-4 rounded-2xl transition-colors ${
                        isSelected ? 'bg-gray-900' : 'bg-gray-50'
                      }`}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Preview Button */}
                      <motion.button
                        onClick={() => previewVoice(voice)}
                        className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          isSelected 
                            ? 'bg-white/20' 
                            : isPreviewing 
                              ? 'bg-gray-900 text-white' 
                              : 'bg-white'
                        }`}
                        whileTap={{ scale: 0.9 }}
                      >
                        {isPreviewing && isPlaying ? (
                          <Pause className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-gray-900'}`} />
                        ) : (
                          <Play className={`w-5 h-5 ${isSelected ? 'text-white' : isPreviewing ? 'text-white' : 'text-gray-900'}`} />
                        )}
                      </motion.button>

                      {/* Voice Info */}
                      <div className="flex-1 min-w-0" onClick={() => handleSelect(voice)}>
                        <div className="flex items-center gap-2">
                          <h3 className={`font-semibold ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                            {getVoiceLabel(voice)}
                          </h3>
                          {voiceType === 'Premium' && (
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                              isSelected ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-700'
                            }`}>
                              Premium
                            </span>
                          )}
                        </div>
                        <p className={`text-xs mt-0.5 ${isSelected ? 'text-white/70' : 'text-gray-500'}`}>
                          {voice.lang}
                        </p>
                      </div>

                      {/* Select Indicator */}
                      {isSelected && (
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                          <Check className="w-5 h-5 text-gray-900" />
                        </div>
                      )}
                    </motion.div>
                  );
                })
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

BibleVoiceSelector.displayName = 'BibleVoiceSelector';

export default BibleVoiceSelector;
