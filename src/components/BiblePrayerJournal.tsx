import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Trash2, Check, Clock, Heart, BookOpen } from 'lucide-react';

interface PrayerEntry {
  id: string;
  title: string;
  content: string;
  category: 'gratitude' | 'petition' | 'intercession' | 'confession';
  date: string;
  answered: boolean;
  answeredDate?: string;
}

const categories = [
  { id: 'gratitude', label: 'Gratitude', icon: Heart, color: 'text-rose-500' },
  { id: 'petition', label: 'Petition', icon: BookOpen, color: 'text-blue-500' },
  { id: 'intercession', label: 'Intercession', icon: Clock, color: 'text-amber-500' },
  { id: 'confession', label: 'Confession', icon: Check, color: 'text-emerald-500' },
];

const BiblePrayerJournal: React.FC = () => {
  const [prayers, setPrayers] = useState<PrayerEntry[]>([]);
  const [isAddingPrayer, setIsAddingPrayer] = useState(false);
  const [newPrayer, setNewPrayer] = useState({ title: '', content: '', category: 'petition' as const });
  const [filter, setFilter] = useState<string>('all');
  const [selectedPrayer, setSelectedPrayer] = useState<PrayerEntry | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('bible-prayer-journal');
    if (saved) setPrayers(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('bible-prayer-journal', JSON.stringify(prayers));
  }, [prayers]);

  const addPrayer = () => {
    if (!newPrayer.title.trim() || !newPrayer.content.trim()) return;
    const prayer: PrayerEntry = {
      id: Date.now().toString(),
      ...newPrayer,
      date: new Date().toISOString(),
      answered: false,
    };
    setPrayers([prayer, ...prayers]);
    setNewPrayer({ title: '', content: '', category: 'petition' });
    setIsAddingPrayer(false);
  };

  const toggleAnswered = (id: string) => {
    setPrayers(prayers.map(p => 
      p.id === id ? { ...p, answered: !p.answered, answeredDate: !p.answered ? new Date().toISOString() : undefined } : p
    ));
  };

  const deletePrayer = (id: string) => {
    setPrayers(prayers.filter(p => p.id !== id));
    setSelectedPrayer(null);
  };

  const filteredPrayers = filter === 'all' ? prayers : 
    filter === 'answered' ? prayers.filter(p => p.answered) :
    filter === 'pending' ? prayers.filter(p => !p.answered) :
    prayers.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-white px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900">Prayer Journal</h1>
          <p className="text-sm text-gray-500">{prayers.length} prayers recorded</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAddingPrayer(true)}
          className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center shadow-lg"
        >
          <Plus className="w-5 h-5 text-white" />
        </motion.button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
        {['all', 'pending', 'answered', ...categories.map(c => c.id)].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === f ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Prayer List */}
      <div className="space-y-3">
        {filteredPrayers.map((prayer) => {
          const cat = categories.find(c => c.id === prayer.category);
          return (
            <motion.div
              key={prayer.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setSelectedPrayer(prayer)}
              className={`p-4 rounded-xl border cursor-pointer transition-colors ${
                prayer.answered ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {cat && <cat.icon className={`w-4 h-4 ${cat.color}`} />}
                    <span className="text-xs text-gray-500">{cat?.label}</span>
                    {prayer.answered && (
                      <span className="text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full">Answered</span>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900">{prayer.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mt-1">{prayer.content}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(prayer.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredPrayers.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No prayers yet. Start your journal!</p>
        </div>
      )}

      {/* Add Prayer Modal */}
      <AnimatePresence>
        {isAddingPrayer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end"
            onClick={() => setIsAddingPrayer(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-white rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-serif font-bold">New Prayer</h2>
                <button onClick={() => setIsAddingPrayer(false)}>
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
                  <div className="flex gap-2 flex-wrap">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setNewPrayer({ ...newPrayer, category: cat.id as any })}
                        className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 transition-colors ${
                          newPrayer.category === cat.id ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        <cat.icon className="w-4 h-4" />
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Title</label>
                  <input
                    type="text"
                    value={newPrayer.title}
                    onChange={(e) => setNewPrayer({ ...newPrayer, title: e.target.value })}
                    placeholder="What are you praying for?"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Prayer</label>
                  <textarea
                    value={newPrayer.content}
                    onChange={(e) => setNewPrayer({ ...newPrayer, content: e.target.value })}
                    placeholder="Write your prayer..."
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                  />
                </div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={addPrayer}
                  className="w-full py-4 bg-amber-500 text-white rounded-xl font-semibold"
                >
                  Save Prayer
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Prayer Detail Modal */}
      <AnimatePresence>
        {selectedPrayer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end"
            onClick={() => setSelectedPrayer(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-white rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-serif font-bold">{selectedPrayer.title}</h2>
                <button onClick={() => setSelectedPrayer(null)}>
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <p className="text-gray-600 mb-6 whitespace-pre-wrap">{selectedPrayer.content}</p>

              <div className="flex gap-3">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleAnswered(selectedPrayer.id)}
                  className={`flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2 ${
                    selectedPrayer.answered ? 'bg-gray-100 text-gray-600' : 'bg-emerald-500 text-white'
                  }`}
                >
                  <Check className="w-5 h-5" />
                  {selectedPrayer.answered ? 'Mark Pending' : 'Mark Answered'}
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => deletePrayer(selectedPrayer.id)}
                  className="py-3 px-4 bg-red-100 text-red-600 rounded-xl"
                >
                  <Trash2 className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BiblePrayerJournal;
