import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, BellOff, Clock, Plus, Trash2, Check, BookOpen, Flame } from 'lucide-react';
import { toast } from 'sonner';
import { useNotifications } from '@/hooks/useNotifications';

interface ReminderTime {
  id: string;
  time: string;
  label: string;
  enabled: boolean;
}

interface BibleNotificationSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BibleNotificationSettings = ({ isOpen, onClose }: BibleNotificationSettingsProps) => {
  const { isSupported, permission, requestPermission, scheduleDailyNotification, showNotification } = useNotifications();
  const [reminders, setReminders] = useState<ReminderTime[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newTime, setNewTime] = useState('08:00');
  const [newLabel, setNewLabel] = useState('Morning Reading');

  // Load saved reminders
  useEffect(() => {
    const saved = localStorage.getItem('bible_reminders');
    if (saved) {
      setReminders(JSON.parse(saved));
    } else {
      // Default reminders
      setReminders([
        { id: '1', time: '06:00', label: 'Morning Devotion', enabled: true },
        { id: '2', time: '21:00', label: 'Evening Reflection', enabled: true },
      ]);
    }
  }, []);

  // Save reminders
  useEffect(() => {
    localStorage.setItem('bible_reminders', JSON.stringify(reminders));
  }, [reminders]);

  const handleEnableNotifications = async () => {
    const granted = await requestPermission();
    if (granted) {
      toast.success('Notifications enabled! 🔔');
      
      // Schedule active reminders
      reminders.filter(r => r.enabled).forEach(reminder => {
        const [hour, minute] = reminder.time.split(':').map(Number);
        scheduleDailyNotification(
          'Time for Bible Reading 📖',
          {
            body: reminder.label,
            icon: '/ccc-rainbow-logo.png',
            tag: `bible-reminder-${reminder.id}`,
          },
          hour,
          minute
        );
      });
    } else {
      toast.error('Please allow notifications in your browser settings');
    }
  };

  const toggleReminder = (id: string) => {
    setReminders(prev => prev.map(r => 
      r.id === id ? { ...r, enabled: !r.enabled } : r
    ));
    toast.success('Reminder updated');
  };

  const addReminder = () => {
    if (!newTime) return;
    
    const newReminder: ReminderTime = {
      id: Date.now().toString(),
      time: newTime,
      label: newLabel || 'Bible Reading',
      enabled: true,
    };
    
    setReminders(prev => [...prev, newReminder]);
    setIsAddingNew(false);
    setNewTime('08:00');
    setNewLabel('Morning Reading');
    
    // Schedule the new reminder if notifications are enabled
    if (permission.granted) {
      const [hour, minute] = newTime.split(':').map(Number);
      scheduleDailyNotification(
        'Time for Bible Reading 📖',
        {
          body: newLabel || 'Bible Reading',
          icon: '/ccc-rainbow-logo.png',
          tag: `bible-reminder-${newReminder.id}`,
        },
        hour,
        minute
      );
    }
    
    toast.success('Reminder added');
  };

  const deleteReminder = (id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id));
    toast.success('Reminder removed');
  };

  const testNotification = () => {
    showNotification('Bible Reminder 📖', {
      body: 'This is a test notification for your Bible reading reminder!',
      icon: '/ccc-rainbow-logo.png',
    });
    toast.success('Test notification sent!');
  };

  const formatTime = (time: string) => {
    const [hour, minute] = time.split(':').map(Number);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minute.toString().padStart(2, '0')} ${ampm}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[70] bg-black/90 flex items-end sm:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden max-h-[90vh] overflow-y-auto"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Reading Reminders
              </h2>
              <motion.button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100"
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-5 h-5 text-gray-500" />
              </motion.button>
            </div>

            <div className="p-5">
              {/* Permission Status */}
              {!isSupported ? (
                <div className="text-center py-8 px-4 bg-gray-50 rounded-2xl mb-6">
                  <BellOff className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">
                    Notifications are not supported on this device
                  </p>
                </div>
              ) : !permission.granted ? (
                <motion.button
                  onClick={handleEnableNotifications}
                  className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl font-semibold mb-6"
                  whileTap={{ scale: 0.98 }}
                >
                  <Bell className="w-5 h-5" />
                  Enable Daily Reminders
                </motion.button>
              ) : (
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-2xl mb-6">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-green-900">Notifications Active</p>
                    <p className="text-sm text-green-700">You'll receive daily reminders</p>
                  </div>
                  <motion.button
                    onClick={testNotification}
                    className="text-xs px-3 py-1.5 bg-green-600 text-white rounded-full"
                    whileTap={{ scale: 0.95 }}
                  >
                    Test
                  </motion.button>
                </div>
              )}

              {/* Benefits */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Build Your Habit
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-xl">
                    <Flame className="w-5 h-5 text-orange-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Keep Your Streak</p>
                      <p className="text-sm text-gray-500">Daily reminders help maintain your reading streak</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                    <BookOpen className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Never Miss a Day</p>
                      <p className="text-sm text-gray-500">Set multiple reminders for morning and evening</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reminders List */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Your Reminders
                  </h3>
                  <motion.button
                    onClick={() => setIsAddingNew(true)}
                    className="text-sm font-medium text-gray-900 flex items-center gap-1"
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </motion.button>
                </div>

                <div className="space-y-2">
                  {reminders.map(reminder => (
                    <motion.div
                      key={reminder.id}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                      layout
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{formatTime(reminder.time)}</p>
                        <p className="text-sm text-gray-500">{reminder.label}</p>
                      </div>
                      
                      {/* Toggle */}
                      <motion.button
                        onClick={() => toggleReminder(reminder.id)}
                        className={`w-12 h-7 rounded-full p-1 transition-colors ${
                          reminder.enabled ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          className="w-5 h-5 bg-white rounded-full shadow"
                          animate={{ x: reminder.enabled ? 20 : 0 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      </motion.button>
                      
                      {/* Delete */}
                      <motion.button
                        onClick={() => deleteReminder(reminder.id)}
                        className="p-2 rounded-full hover:bg-gray-200"
                        whileTap={{ scale: 0.95 }}
                      >
                        <Trash2 className="w-4 h-4 text-gray-400" />
                      </motion.button>
                    </motion.div>
                  ))}

                  {/* Add New Form */}
                  <AnimatePresence>
                    {isAddingNew && (
                      <motion.div
                        className="p-4 bg-gray-100 rounded-xl space-y-3"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <div className="flex gap-3">
                          <div className="flex-1">
                            <label className="text-xs text-gray-500 mb-1 block">Time</label>
                            <input
                              type="time"
                              value={newTime}
                              onChange={(e) => setNewTime(e.target.value)}
                              className="w-full px-3 py-2 bg-white rounded-lg text-gray-900 border-0"
                            />
                          </div>
                          <div className="flex-1">
                            <label className="text-xs text-gray-500 mb-1 block">Label</label>
                            <input
                              type="text"
                              value={newLabel}
                              onChange={(e) => setNewLabel(e.target.value)}
                              placeholder="e.g. Morning Prayer"
                              className="w-full px-3 py-2 bg-white rounded-lg text-gray-900 border-0"
                            />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <motion.button
                            onClick={addReminder}
                            className="flex-1 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium"
                            whileTap={{ scale: 0.98 }}
                          >
                            Add Reminder
                          </motion.button>
                          <motion.button
                            onClick={() => setIsAddingNew(false)}
                            className="px-4 py-2 bg-white text-gray-600 rounded-lg text-sm font-medium"
                            whileTap={{ scale: 0.98 }}
                          >
                            Cancel
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BibleNotificationSettings;
