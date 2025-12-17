import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, RotateCcw, Check, ChevronLeft, ChevronRight, Sparkles, Trophy, Flame } from 'lucide-react';

interface MemoryVerse {
  id: string;
  reference: string;
  text: string;
  mastery: number; // 0-100
  lastReviewed: string;
  timesReviewed: number;
}

const ScriptureMemorization: React.FC = () => {
  const [verses, setVerses] = useState<MemoryVerse[]>([]);
  const [isAddingVerse, setIsAddingVerse] = useState(false);
  const [newVerse, setNewVerse] = useState({ reference: '', text: '' });
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('scripture-memorization');
    if (saved) setVerses(JSON.parse(saved));
    const savedStreak = localStorage.getItem('memorization-streak');
    if (savedStreak) setStreak(parseInt(savedStreak));
  }, []);

  useEffect(() => {
    localStorage.setItem('scripture-memorization', JSON.stringify(verses));
  }, [verses]);

  const addVerse = () => {
    if (!newVerse.reference.trim() || !newVerse.text.trim()) return;
    const verse: MemoryVerse = {
      id: Date.now().toString(),
      ...newVerse,
      mastery: 0,
      lastReviewed: new Date().toISOString(),
      timesReviewed: 0,
    };
    setVerses([...verses, verse]);
    setNewVerse({ reference: '', text: '' });
    setIsAddingVerse(false);
  };

  const deleteVerse = (id: string) => {
    setVerses(verses.filter(v => v.id !== id));
  };

  const markReview = (remembered: boolean) => {
    const verse = verses[currentCardIndex];
    const masteryChange = remembered ? 20 : -10;
    const newMastery = Math.max(0, Math.min(100, verse.mastery + masteryChange));
    
    setVerses(verses.map(v => 
      v.id === verse.id ? { 
        ...v, 
        mastery: newMastery, 
        lastReviewed: new Date().toISOString(),
        timesReviewed: v.timesReviewed + 1 
      } : v
    ));

    if (remembered) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      localStorage.setItem('memorization-streak', newStreak.toString());
    }

    setIsFlipped(false);
    if (currentCardIndex < verses.length - 1) {
      setTimeout(() => setCurrentCardIndex(currentCardIndex + 1), 300);
    } else {
      setIsReviewMode(false);
      setCurrentCardIndex(0);
    }
  };

  const startReview = () => {
    if (verses.length === 0) return;
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setIsReviewMode(true);
  };

  const totalMastery = verses.length > 0 
    ? Math.round(verses.reduce((acc, v) => acc + v.mastery, 0) / verses.length) 
    : 0;

  const masteredCount = verses.filter(v => v.mastery >= 80).length;

  return (
    <div className="min-h-screen bg-white px-4 py-6">
      {!isReviewMode ? (
        <>
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-serif font-bold text-gray-900">Memorization</h1>
              <p className="text-sm text-gray-500">{verses.length} verses • {masteredCount} mastered</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAddingVerse(true)}
              className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <Plus className="w-5 h-5 text-white" />
            </motion.button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 text-center">
              <Flame className="w-6 h-6 text-amber-500 mx-auto mb-1" />
              <p className="text-2xl font-bold text-amber-600">{streak}</p>
              <p className="text-xs text-amber-700">Streak</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 text-center">
              <Trophy className="w-6 h-6 text-emerald-500 mx-auto mb-1" />
              <p className="text-2xl font-bold text-emerald-600">{masteredCount}</p>
              <p className="text-xs text-emerald-700">Mastered</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center">
              <Sparkles className="w-6 h-6 text-blue-500 mx-auto mb-1" />
              <p className="text-2xl font-bold text-blue-600">{totalMastery}%</p>
              <p className="text-xs text-blue-700">Progress</p>
            </div>
          </div>

          {/* Start Review Button */}
          {verses.length > 0 && (
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={startReview}
              className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-semibold mb-6 flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Start Review Session
            </motion.button>
          )}

          {/* Verse List */}
          <div className="space-y-3">
            {verses.map((verse) => (
              <motion.div
                key={verse.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl border border-gray-200 bg-white"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{verse.reference}</h3>
                  <button onClick={() => deleteVerse(verse.id)} className="text-gray-400">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{verse.text}</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${verse.mastery}%` }}
                      className={`h-full rounded-full ${
                        verse.mastery >= 80 ? 'bg-emerald-500' : 
                        verse.mastery >= 50 ? 'bg-amber-500' : 'bg-gray-400'
                      }`}
                    />
                  </div>
                  <span className="text-xs text-gray-500">{verse.mastery}%</span>
                </div>
              </motion.div>
            ))}
          </div>

          {verses.length === 0 && (
            <div className="text-center py-12">
              <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Add verses to start memorizing!</p>
            </div>
          )}

          {/* Add Verse Modal */}
          <AnimatePresence>
            {isAddingVerse && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50 flex items-end"
                onClick={() => setIsAddingVerse(false)}
              >
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full bg-white rounded-t-3xl p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-serif font-bold">Add Verse</h2>
                    <button onClick={() => setIsAddingVerse(false)}>
                      <X className="w-6 h-6 text-gray-400" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Reference</label>
                      <input
                        type="text"
                        value={newVerse.reference}
                        onChange={(e) => setNewVerse({ ...newVerse, reference: e.target.value })}
                        placeholder="e.g., John 3:16"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Verse Text</label>
                      <textarea
                        value={newVerse.text}
                        onChange={(e) => setNewVerse({ ...newVerse, text: e.target.value })}
                        placeholder="Enter the verse text..."
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                      />
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={addVerse}
                      className="w-full py-4 bg-amber-500 text-white rounded-xl font-semibold"
                    >
                      Add to Collection
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        /* Flashcard Review Mode */
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => setIsReviewMode(false)} className="text-gray-600">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <span className="text-sm text-gray-500">
              {currentCardIndex + 1} / {verses.length}
            </span>
            <div className="w-6" />
          </div>

          {/* Progress Bar */}
          <div className="h-1 bg-gray-100 rounded-full mb-8 overflow-hidden">
            <motion.div
              animate={{ width: `${((currentCardIndex + 1) / verses.length) * 100}%` }}
              className="h-full bg-amber-500 rounded-full"
            />
          </div>

          {/* Flashcard */}
          <div className="flex-1 flex items-center justify-center px-4">
            <motion.div
              onClick={() => setIsFlipped(!isFlipped)}
              className="w-full aspect-[3/4] relative cursor-pointer perspective-1000"
              style={{ perspective: '1000px' }}
            >
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full relative"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-amber-50 to-white rounded-3xl shadow-xl border border-amber-100 flex flex-col items-center justify-center p-8 backface-hidden"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <p className="text-xs text-amber-600 uppercase tracking-wider mb-4">Reference</p>
                  <h2 className="text-3xl font-serif font-bold text-gray-900 text-center">
                    {verses[currentCardIndex]?.reference}
                  </h2>
                  <p className="text-sm text-gray-400 mt-8">Tap to reveal verse</p>
                </div>

                {/* Back */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-white to-amber-50 rounded-3xl shadow-xl border border-amber-100 flex flex-col items-center justify-center p-8"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <p className="text-sm text-amber-600 mb-4">{verses[currentCardIndex]?.reference}</p>
                  <p className="text-lg font-serif text-gray-800 text-center leading-relaxed">
                    "{verses[currentCardIndex]?.text}"
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Actions */}
          {isFlipped && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4 mt-8 px-4 pb-8"
            >
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => markReview(false)}
                className="flex-1 py-4 bg-red-100 text-red-600 rounded-xl font-semibold flex items-center justify-center gap-2"
              >
                <X className="w-5 h-5" />
                Forgot
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => markReview(true)}
                className="flex-1 py-4 bg-emerald-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                Got it!
              </motion.button>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default ScriptureMemorization;
