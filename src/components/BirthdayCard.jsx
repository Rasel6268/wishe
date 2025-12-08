import { motion } from 'framer-motion'
import { useState } from 'react'
import { Heart, Star } from 'lucide-react'

export default function BirthdayCard({ image, comment, gradient = "from-pink-400 to-rose-400" }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  function handleFlip() {
    if (!isAnimating) {
      setIsAnimating(true)
      setIsFlipped(!isFlipped)
    }
  }

  return (
    <div className="w-full h-[500px] perspective-1000">
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, animationDirection: "normal" }}
        onAnimationComplete={() => setIsAnimating(false)}
      >
        {/* সামনের দিক - ছবি */}
        <div 
          className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden cursor-pointer shadow-2xl"
          onClick={handleFlip}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20`} />
          
          {/* 3D এফেক্ট লেয়ার */}
          <div className="absolute inset-4 bg-white/10 rounded-xl" />
          <div className="absolute inset-8 bg-white/5 rounded-lg" />
          
          <div className="relative h-full p-6 flex flex-col items-center justify-center">
            {/* ফটো ফ্রেম */}
            <div className="relative w-48 h-48 md:w-56 md:h-56 mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-rose-200 rounded-full transform rotate-6" />
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-300 to-rose-300 rounded-full transform -rotate-6" />
              
              {/* ইমেজ কন্টেইনার */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl">
                <img
                  src={image}
                  alt="তানজিনা রিপা"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = `https://ui-avatars.com/api/?name=Tanzina+Ripa&background=ff69b4&color=fff&size=256`
                  }}
                />
                {/* ওভারলে */}
                <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent" />
              </div>
              
              {/* ডেকোরেটিভ এলিমেন্টস */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 border-2 border-pink-300/30 rounded-full"
              />
            </div>
            
            {/* নাম এবং নির্দেশনা */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">তানজিনা রিপা</h3>
              <p className="text-gray-600 flex items-center gap-2">
                <Heart size={16} className="text-rose-500" />
                উল্টাতে হোভার বা ক্লিক করুন
                <Star size={16} className="text-yellow-500" />
              </p>
            </div>
          </div>
        </div>

        {/* পিছনের দিক - কমেন্ট */}
        <div 
          className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-2xl rotate-y-180 cursor-pointer"
          onClick={handleFlip}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
          
          {/* পিছনের জন্য 3D এফেক্ট */}
          <div className="absolute inset-4 bg-white/10 rounded-xl backdrop-blur-sm" />
          <div className="absolute inset-8 bg-white/5 rounded-lg" />
          
          <div className="relative h-full flex flex-col items-center justify-center p-6">
            {/* কমেন্ট ডিসপ্লে */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-center"
            >
              <div className="relative mb-6">
                <div className="absolute -inset-4 bg-white/20 rounded-full blur-xl" />
                <div className="relative">
                  <h2 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
                    {comment}
                  </h2>
                </div>
              </div>
              
              {/* ডেকোরেটিভ উক্তি */}
              <div className="glass-card rounded-xl p-4 max-w-sm">
                <p className="text-white/90 italic">
                  "সোনার হৃদয়ের একজন সুন্দর আত্মা। 
                  আপনার হাসি প্রতিটি কক্ষকে আলোকিত করে।"
                </p>
                <div className="flex justify-center mt-4 gap-2">
                  {[...Array(3)].map((_, i) => (
                    <Heart 
                      key={i}
                      size={20} 
                      className="text-white fill-white" 
                    />
                  ))}
                </div>
              </div>
              
              {/* ফ্লিপ ব্যাক নির্দেশনা */}
              <motion.p 
                className="mt-8 text-white/80 text-sm"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ফিরে যেতে ক্লিক করুন
              </motion.p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}