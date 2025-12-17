import { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, Cross } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useHapticFeedback from "@/hooks/useHapticFeedback";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatWidget = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const { trigger } = useHapticFeedback();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Peace be unto you! 🙏 Welcome to CCC Light International Parish. How may we assist you on your spiritual journey today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    trigger('success');
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulated response
    setTimeout(() => {
      const responses = [
        "Thank you for reaching out. A member of our pastoral team will respond shortly. In the meantime, may God's peace be with you.",
        "Blessings! Our service times are Tuesday, Wednesday, Friday and Sunday. We would be honored to have you worship with us.",
        "The Lord hears your prayers. Please feel free to share your prayer request, and our intercessory team will lift you up in prayer.",
        "Holy, Holy, Holy! For inquiries about our programs, please contact us at ccclightinternationalparish@gmail.com.",
      ];
      const botMessage: Message = {
        id: messages.length + 2,
        text: responses[Math.floor(Math.random() * responses.length)],
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1500);
  };

  return (
    <>
      {/* Chat Button - Mobile optimized */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              trigger('medium');
              setIsOpen(true);
            }}
            className="fixed bottom-20 sm:bottom-24 right-3 sm:right-4 z-50 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-full shadow-xl touch-manipulation"
            style={{
              background: "linear-gradient(135deg, hsl(198 38% 42%) 0%, hsl(198 38% 32%) 100%)",
              boxShadow: "0 8px 32px rgba(70, 120, 135, 0.35), 0 0 0 1px rgba(255,255,255,0.1) inset",
            }}
          >
            {/* Celestial glow ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(195, 145, 32, 0.4)",
                  "0 0 0 8px rgba(195, 145, 32, 0)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            <span className="text-white text-xs sm:text-sm font-medium hidden xs:inline" style={{ fontFamily: "Outfit, sans-serif" }}>
              Chat
            </span>
            {/* Live indicator */}
            <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-green-500" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window - Mobile optimized */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-2 sm:bottom-4 right-2 sm:right-4 left-2 sm:left-auto z-50 sm:w-[340px] rounded-2xl overflow-hidden shadow-2xl"
            style={{
              boxShadow: "0 25px 60px -12px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255,255,255,0.08) inset",
              maxHeight: "calc(100vh - 80px)",
            }}
          >
            {/* Header */}
            <div
              className="relative px-4 py-4 flex items-center justify-between"
              style={{
                background: "linear-gradient(135deg, hsl(198 38% 38%) 0%, hsl(198 38% 28%) 100%)",
              }}
            >
              {/* Celestial cross pattern overlay */}
              <div 
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18 0v18H0v4h18v18h4V22h18v-4H22V0h-4z' fill='%23ffffff' fill-opacity='1'/%3E%3C/svg%3E")`,
                  backgroundSize: "24px 24px",
                }}
              />
              
              <div className="flex items-center gap-3 relative z-10">
                <div className="relative">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, hsl(42 85% 55%) 0%, hsl(42 85% 45%) 100%)",
                      boxShadow: "0 2px 8px rgba(195, 145, 32, 0.4)",
                    }}
                  >
                    <Cross className="w-5 h-5 text-white" />
                  </div>
                  {/* Online indicator */}
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                </div>
                <div>
                  <h3 
                    className="text-white font-semibold text-sm"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    CCC Light International
                  </h3>
                  <p className="text-white/70 text-xs" style={{ fontFamily: "Outfit, sans-serif" }}>
                    We typically reply instantly
                  </p>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  trigger('light');
                  setIsOpen(false);
                }}
                className="relative z-10 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </motion.button>
            </div>

            {/* Messages Area */}
            <div 
              className="h-[280px] sm:h-[320px] overflow-y-auto p-3 sm:p-4 space-y-2.5 sm:space-y-3"
              style={{
                background: "linear-gradient(180deg, hsl(40 30% 97%) 0%, hsl(40 25% 95%) 100%)",
              }}
            >
              {/* Celestial decorative element */}
              <div className="absolute top-20 left-1/2 -translate-x-1/2 w-32 h-32 opacity-5 pointer-events-none">
                <Sparkles className="w-full h-full text-gold" />
              </div>

              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl ${
                      message.isUser
                        ? "rounded-br-md"
                        : "rounded-bl-md"
                    }`}
                    style={{
                      background: message.isUser
                        ? "linear-gradient(135deg, hsl(198 38% 42%) 0%, hsl(198 38% 35%) 100%)"
                        : "white",
                      color: message.isUser ? "white" : "hsl(198 38% 25%)",
                      boxShadow: message.isUser
                        ? "0 2px 8px rgba(70, 120, 135, 0.25)"
                        : "0 2px 8px rgba(0, 0, 0, 0.06)",
                    }}
                  >
                    <p 
                      className="text-sm leading-relaxed"
                      style={{ fontFamily: "Outfit, sans-serif" }}
                    >
                      {message.text}
                    </p>
                    <p 
                      className={`text-[10px] mt-1 ${
                        message.isUser ? "text-white/60" : "text-muted-foreground"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input Area */}
            <div 
              className="p-3 border-t"
              style={{
                background: "white",
                borderColor: "hsl(40 20% 90%)",
              }}
            >
              <div className="flex items-center gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 border-0 bg-muted/50 focus-visible:ring-1 focus-visible:ring-primary/30 text-sm rounded-xl px-4"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all disabled:opacity-50"
                  style={{
                    background: inputValue.trim() 
                      ? "linear-gradient(135deg, hsl(42 85% 55%) 0%, hsl(42 85% 45%) 100%)"
                      : "hsl(40 20% 90%)",
                    boxShadow: inputValue.trim() 
                      ? "0 2px 8px rgba(195, 145, 32, 0.35)"
                      : "none",
                  }}
                >
                  <Send className={`w-4 h-4 ${inputValue.trim() ? "text-white" : "text-muted-foreground"}`} />
                </motion.button>
              </div>
              
              {/* Powered by */}
              <p 
                className="text-center text-[10px] text-muted-foreground mt-2"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                ✝ CCC Light International Parish
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

ChatWidget.displayName = "ChatWidget";

export default ChatWidget;
