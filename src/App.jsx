import { BrowserRouter as Router, Routes, Route, Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Home,
  Images,
  MessageSquare,
  Gift,
  Sparkles,
  ArrowLeft
} from "lucide-react";
import WelcomePage from "./components/WelcomePage";
import GalleryPage from "./components/GalleryPage";
import MessagesPage from "./components/MessagesPage";
import WishesPage from "./components/WishesPage";
// import BirthdayCard from './components/BirthdayCard'

function App() {
  
  
  const goBack = () => {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = "/"; 
  }
};

  return (
    <Router>
      <div className="min-h-screen love-vibe-bg relative overflow-hidden">
        {/* অ্যানিমেটেড ব্যাকগ্রাউন্ড এলিমেন্টস */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-pink-300/20"
              initial={{ y: -100, x: Math.random() * window.innerWidth }}
              animate={{
                y: window.innerHeight + 100,
                x: Math.random() * window.innerWidth,
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              <Heart size={24 + Math.random() * 20} />
            </motion.div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/wishes" element={<WishesPage />} />
          </Routes>
        </AnimatePresence>

        {/* নেভিগেশন */}
        <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
    >
      <button
      onClick={goBack}
       className="cursor-pointer">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="glass-card rounded-full px-6 py-3 flex items-center gap-2 shadow-2xl text-pink-700 hover:text-rose-600 transition-colors"
        >
          <div className="p-2 rounded-full hover:bg-white/30">
            <ArrowLeft size={20} />
          </div>
          <span className="text-sm font-medium">Back</span>
        </motion.div>
      </button>
    </motion.nav>
      </div>
    </Router>
  );
}

function NavLink({ to, icon, label }) {
  return (
    <Link to={to}>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="flex flex-col items-center text-pink-700 hover:text-rose-600 transition-colors"
      >
        <div className="p-2 rounded-full hover:bg-white/30">{icon}</div>
        <span className="text-xs mt-1 font-medium">{label}</span>
      </motion.div>
    </Link>
  );
}

export default App;
