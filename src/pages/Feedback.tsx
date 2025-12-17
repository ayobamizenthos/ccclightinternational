import { memo, useState } from "react";
import { motion } from "framer-motion";
import { 
  MessageSquare, 
  Send, 
  Star, 
  Mail,
  Phone,
  MapPin,
  Sparkles,
  CheckCircle2,
  Heart
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const feedbackTypes = [
  { id: 'praise', label: 'Praise Report', icon: Star, color: '#fbbf24' },
  { id: 'suggestion', label: 'Suggestion', icon: Sparkles, color: '#10b981' },
  { id: 'question', label: 'Question', icon: MessageSquare, color: '#3b82f6' },
  { id: 'other', label: 'Other', icon: Heart, color: '#ec4899' },
];

const Feedback = memo(() => {
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    email: '',
    message: '',
    rating: 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.type || !formData.message.trim()) {
      toast.error('Please select a feedback type and enter your message');
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Feedback Submitted! 🙏', {
      description: 'Thank you for sharing. Your feedback helps us serve you better.',
    });
    
    setFormData({ type: '', name: '', email: '', message: '', rating: 0 });
    setIsSubmitting(false);
  };

  return (
    <>
      <SEO
        title="Feedback | CCC Light International Parish"
        description="Share your feedback, suggestions, and praise reports with CCC Light International Parish. We value your input and strive to serve you better."
        url="/feedback"
      />
      <Navigation />
      
      <main 
        id="main-content" 
        className="min-h-screen pt-24 pb-32"
        style={{
          background: 'linear-gradient(180deg, #0a1628 0%, #0c1e38 50%, #0a1628 100%)',
        }}
      >
        {/* Animated Background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)',
              filter: 'blur(80px)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 30, 0],
            }}
            transition={{ duration: 20, repeat: Infinity }}
          />
        </div>

        <div className="container max-w-2xl mx-auto px-4 relative z-10">
          <BackButton />
          
          {/* Header */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <motion.div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(6,182,212,0.25), rgba(6,182,212,0.1))',
                  border: '1px solid rgba(6,182,212,0.35)',
                }}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(6,182,212,0.25)',
                    '0 0 40px rgba(6,182,212,0.45)',
                    '0 0 20px rgba(6,182,212,0.25)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <MessageSquare className="w-6 h-6 text-cyan-400" />
              </motion.div>
            </motion.div>
            
            <h1 
              className="text-3xl md:text-4xl font-medium text-white mb-3"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Share Your{' '}
              <span 
                style={{
                  background: 'linear-gradient(135deg, #06b6d4 0%, #10b981 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Feedback
              </span>
            </h1>
            <p className="text-white/55 text-sm max-w-md mx-auto leading-relaxed">
              Your voice matters to us. Share your thoughts, suggestions, or praise reports 
              to help us serve you and our community better.
            </p>
          </motion.div>

          {/* Feedback Form */}
          <motion.form 
            onSubmit={handleSubmit}
            className="p-6 md:p-8 rounded-2xl"
            style={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)',
              border: '1px solid rgba(100,180,220,0.18)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Feedback Type Selection */}
            <div className="mb-6">
              <label className="text-white/85 text-sm font-medium mb-4 block">
                Type of Feedback
              </label>
              <div className="grid grid-cols-2 gap-3">
                {feedbackTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <motion.button
                      key={type.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, type: type.id }))}
                      className="p-4 rounded-xl text-center transition-all"
                      style={{
                        background: formData.type === type.id 
                          ? `${type.color}22`
                          : 'rgba(255,255,255,0.04)',
                        border: formData.type === type.id 
                          ? `2px solid ${type.color}65`
                          : '1px solid rgba(255,255,255,0.1)',
                        boxShadow: formData.type === type.id 
                          ? `0 8px 30px ${type.color}20`
                          : 'none',
                      }}
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Icon 
                        className="w-6 h-6 mx-auto mb-2" 
                        style={{ color: formData.type === type.id ? type.color : 'rgba(255,255,255,0.5)' }}
                      />
                      <span 
                        className="text-xs font-medium block"
                        style={{ color: formData.type === type.id ? type.color : 'rgba(255,255,255,0.5)' }}
                      >
                        {type.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Rating */}
            <div className="mb-6">
              <label className="text-white/85 text-sm font-medium mb-3 block">
                Rate Your Experience (Optional)
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Star 
                      className="w-8 h-8 transition-colors" 
                      fill={formData.rating >= star ? '#fbbf24' : 'transparent'}
                      stroke={formData.rating >= star ? '#fbbf24' : 'rgba(255,255,255,0.3)'}
                    />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Name (Optional) */}
            <div className="mb-4">
              <label className="text-white/85 text-sm font-medium mb-2 block">
                Your Name (Optional)
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-xl bg-white/6 border border-white/12 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-cyan-500/50 focus:bg-white/8 transition-all"
              />
            </div>

            {/* Email (Optional) */}
            <div className="mb-4">
              <label className="text-white/85 text-sm font-medium mb-2 block">
                Email Address (Optional)
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter your email for response"
                className="w-full px-4 py-3 rounded-xl bg-white/6 border border-white/12 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-cyan-500/50 focus:bg-white/8 transition-all"
              />
            </div>

            {/* Message */}
            <div className="mb-6">
              <label className="text-white/85 text-sm font-medium mb-2 block">
                Your Message <span className="text-red-400">*</span>
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Share your feedback, suggestions, or praise report..."
                rows={5}
                className="w-full px-4 py-3.5 rounded-xl bg-white/6 border border-white/12 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-cyan-500/50 focus:bg-white/8 transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 gap-2 text-base font-semibold"
              style={{
                background: 'linear-gradient(135deg, hsl(200 70% 55%) 0%, hsl(200 60% 45%) 100%)',
                boxShadow: '0 8px 30px rgba(100,180,220,0.3)',
              }}
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit Feedback
                </>
              )}
            </Button>
          </motion.form>

          {/* Contact Options */}
          <motion.div
            className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.a
              href="mailto:ccclightinternationalparish@gmail.com"
              className="p-5 rounded-xl text-center transition-all"
              style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                border: '1px solid rgba(100,180,220,0.12)',
              }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{
                  background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(59,130,246,0.08))',
                  border: '1px solid rgba(59,130,246,0.3)',
                }}
              >
                <Mail className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-white font-medium mb-1">Email Us</h3>
              <p className="text-white/45 text-xs break-all">ccclightinternationalparish@gmail.com</p>
            </motion.a>

            <motion.a
              href="tel:+2348012345678"
              className="p-5 rounded-xl text-center transition-all"
              style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                border: '1px solid rgba(100,180,220,0.12)',
              }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{
                  background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.08))',
                  border: '1px solid rgba(16,185,129,0.3)',
                }}
              >
                <Phone className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-white font-medium mb-1">Call Us</h3>
              <p className="text-white/45 text-xs">+234 801 234 5678</p>
            </motion.a>

            <motion.div
              className="p-5 rounded-xl text-center transition-all"
              style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                border: '1px solid rgba(100,180,220,0.12)',
              }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{
                  background: 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(168,85,247,0.08))',
                  border: '1px solid rgba(168,85,247,0.3)',
                }}
              >
                <MapPin className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-white font-medium mb-1">Visit Us</h3>
              <p className="text-white/45 text-xs">Alagbado, Lagos, Nigeria</p>
            </motion.div>
          </motion.div>

          {/* Success Animation */}
          {isSubmitting && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #06b6d4, #10b981)' }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                <CheckCircle2 className="w-10 h-10 text-white" />
              </motion.div>
            </motion.div>
          )}
        </div>
      </main>
      
      {/* Footer removed */}
    </>
  );
});

Feedback.displayName = "Feedback";

export default Feedback;