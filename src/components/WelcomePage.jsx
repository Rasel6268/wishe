import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router';


const WelcomePage = ({ onEnter }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [icons, setIcons] = useState([]);
  const router = useNavigate()

  // জন্মদিনের আইকন
  const birthdayIcons = [
    '🎂', '🎁', '🎈', '✨', '🥳', '🎉', '🎊', '❤️', '🌟', '💝',
    '🍰', '🎇', '🎆', '🪅', '🪩', '🎀', '🍾', '🥂', '🎂', '🎁',
    '🎈', '✨', '🥳', '🎉', '🎊', '❤️', '🌟', '💝', '🍰', '🎇'
  ];


  useEffect(() => {
    const initialIcons = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      icon: birthdayIcons[i % birthdayIcons.length],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 30 + 20,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      rotation: Math.random() * 360,
      opacity: Math.random() * 0.5 + 0.3,
      pulseSpeed: Math.random() * 2 + 1,
      blinkSpeed: Math.random() * 3 + 1
    }));
    setIcons(initialIcons);
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      setIcons(prevIcons => 
        prevIcons.map(icon => ({
          ...icon,
          x: (icon.x + icon.speedX) % 100,
          y: (icon.y + icon.speedY) % 100,
          rotation: (icon.rotation + 0.5) % 360
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    setIsVisible(false);
    setTimeout(() => {
     router('/gallery')
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 0.8,
            transition: { duration: 1 }
          }}
          className="fixed inset-0 bg-linear-to-br from-pink-500 via-purple-600 to-blue-600 overflow-hidden z-50"
        >
          {/* অ্যানিমেটেড ব্যাকগ্রাউন্ড আইকন */}
          <div className="absolute inset-0">
            {icons.map((icon) => (
              <motion.div
                key={icon.id}
                className="absolute"
                style={{
                  left: `${icon.x}%`,
                  top: `${icon.y}%`,
                  fontSize: `${icon.size}px`,
                  opacity: icon.opacity
                }}
                animate={{
                  rotate: icon.rotation,
                  scale: [1, 1.2, 1],
                  opacity: [icon.opacity, icon.opacity + 0.3, icon.opacity]
                }}
                transition={{
                  scale: {
                    duration: icon.pulseSpeed,
                    repeat: Infinity,
                    repeatType: "reverse"
                  },
                  opacity: {
                    duration: icon.blinkSpeed,
                    repeat: Infinity,
                    repeatType: "reverse"
                  },
                  rotate: {
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
              >
                {icon.icon}
              </motion.div>
            ))}
          </div>

          {/* ভাসমান বেলুন */}
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${10 + i * 12}%`,
                  top: '120%'
                }}
                animate={{
                  y: [0, -window.innerHeight - 100],
                  x: [0, Math.sin(i) * 50]
                }}
                transition={{
                  y: {
                    duration: 8 + i * 2,
                    repeat: Infinity,
                    ease: "linear"
                  },
                  x: {
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }
                }}
              >
                <div className="text-4xl">
                  {'🎈'}
                </div>
                <motion.div 
                  className="w-0.5 h-20 bg-black/30 mx-auto"
                  animate={{
                    height: ['80px', '100px', '80px']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* কনফেটি ইফেক্ট */}
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={`confetti-${i}`}
                className="absolute w-2 h-2"
                style={{
                  left: `${Math.random() * 100}%`,
                  backgroundColor: ['#FF6B6B', '#4ECDC4', '#FFD166', '#06D6A0', '#118AB2', '#EF476F'][Math.floor(Math.random() * 6)]
                }}
                initial={{ 
                  y: -50,
                  rotate: 0 
                }}
                animate={{
                  y: window.innerHeight + 100,
                  rotate: 360,
                  x: Math.sin(i * 0.5) * 100
                }}
                transition={{
                  y: {
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 5
                  },
                  rotate: {
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
              />
            ))}
          </div>

          {/* মূল কন্টেন্ট */}
          <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
            {/* ডেকোরেটিভ বর্ডার */}
            <div className="absolute inset-8 border-4 border-white/20 rounded-3xl pointer-events-none"></div>
            
            {/* স্বাগতম বার্তা */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center max-w-4xl"
            >
              {/* অ্যানিমেটেড গ্রিটিং টেক্সট */}
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 1, -1, 0] 
                }}
                transition={{ 
                  scale: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  },
                  rotate: {
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }
                }}
              >
                <h1 className="text-7xl md:text-9xl font-bold text-white mb-6">
                  🎉 স্বাগতম! 🎉
                </h1>
              </motion.div>

              {/* বন্ধুর নাম সেকশন */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
                className="relative inline-block mb-8"
              >
                <div className="relative px-8 py-4 bg-linear-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl border-2 border-white/30">
                  <h2 className="text-4xl md:text-5xl font-bold text-white">
                    তানজিনা রিপা
                  </h2>
                  <p className="text-xl text-white/80 mt-2">
                    জন্মদিনের শুভেচ্ছা!!
                  </p>
                  <div className="absolute -top-3 -left-3 w-6 h-6 bg-yellow-400 rounded-full animate-pulse"></div>
                  <div className="absolute -top-3 -right-3 w-6 h-6 bg-pink-400 rounded-full animate-pulse delay-300"></div>
                  <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-blue-400 rounded-full animate-pulse delay-500"></div>
                  <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-green-400 rounded-full animate-pulse delay-700"></div>
                </div>
              </motion.div>

              {/* জন্মদিন বার্তা */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mb-12"
              >
                <p className="text-2xl md:text-3xl text-white/90 mb-6 font-light">
                  তোর জন্য অপেক্ষা করছে একটি বিশেষ জন্মদিন উপহার !
                </p>
                <div className="flex justify-center space-x-4 text-4xl">
                  <motion.span
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 10, -10, 0] 
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      delay: 0
                    }}
                  >
                    🎂
                  </motion.span>
                  <motion.span
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, -10, 10, 0] 
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      delay: 0.5
                    }}
                  >
                    🎁
                  </motion.span>
                  <motion.span
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 10, -10, 0] 
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      delay: 1
                    }}
                  >
                    ✨
                  </motion.span>
                  <motion.span
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, -10, 10, 0] 
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      delay: 1.5
                    }}
                  >
                    🎈
                  </motion.span>
                </div>
              </motion.div>

              {/* প্রবেশ বাটন */}
              <motion.button
                onClick={handleEnter}
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 0 40px rgba(255,255,255,0.5)"
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2 }}
                className="relative px-12 py-6 bg-linear-to-r from-yellow-400 to-pink-500 text-white rounded-full text-3xl font-bold shadow-2xl overflow-hidden group cursor-pointer"
              >
                {/* বাটন শাইন ইফেক্ট */}
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ['0%', '100%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                <span className="relative z-10 flex items-center space-x-4">
                  <span>প্রবেশ করুন উদযাপনে</span>
                  <motion.span
                    animate={{ x: [0, 10, 0] }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity 
                    }}
                  >
                    🚀
                  </motion.span>
                </span>
                
                {/* বাটন গ্লো */}
                <div className="absolute inset-0 rounded-full bg-linear-to-r from-yellow-400/30 to-pink-500/30 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              </motion.button>

              {/* নির্দেশনা */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                className="mt-8 text-white/70 text-lg"
              >
                উদযাপন শুরু করতে এখানে ক্লিক কর ! 
              </motion.p>
            </motion.div>

            {/* নীচের ডেকোরেশন */}
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ delay: 2 }}
              className="absolute bottom-8 left-0 right-0"
            >
              <div className="flex justify-center space-x-8 text-2xl opacity-70">
                {['💝', '🌟', '🎊', '🎇', '🪅'].map((icon, i) => (
                  <motion.span
                    key={i}
                    animate={{ 
                      y: [0, -5, 0],
                      rotate: [0, 360] 
                    }}
                    transition={{ 
                      y: {
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3
                      },
                      rotate: {
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                      }
                    }}
                  >
                    {icon}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* অ্যাম্বিয়েন্ট মিউজিক টগল (ঐচ্ছিক) */}
          <div className="absolute top-8 right-8 z-20">
            <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
              <span className="text-2xl">🎵</span>
            </button>
          </div>
          
          {/* বাংলা ফন্ট স্টাইল */}
          <style jsx global>{`
            * {
              font-family: 'Noto Sans Bengali', 'Kalpurush', sans-serif;
            }
            
            h1, h2, h3, h4, h5, h6 {
              font-family: 'Noto Sans Bengali', 'SolaimanLipi', sans-serif;
              font-weight: 700;
            }
            
            .bengali-text {
              font-family: 'Noto Sans Bengali', 'Kalpurush', sans-serif;
              line-height: 1.8;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};



export default WelcomePage;
