import { motion } from 'framer-motion'
import { Gift, Cake, Star, Music, PartyPopper, Heart } from 'lucide-react'

export default function WishesPage() {
  const wishes = [
    {
      id: 1,
      icon: <Cake className="text-pink-500" size={32} />,
      title: "মিষ্টি শুভেচ্ছা",
      description: "আপনার জন্মদিন মিষ্টি এবং আনন্দে পূর্ণ হোক!",
      color: "from-pink-400 to-rose-400"
    },
    {
      id: 2,
      icon: <Star className="text-yellow-500" size={32} />,
      title: "উজ্জ্বলভাবে জ্বলো",
      description: "তুমি যেমন তারকা, তেমনি উজ্জ্বল থাকো!",
      color: "from-yellow-400 to-orange-400"
    },
    {
      id: 3,
      icon: <Music className="text-purple-500" size={32} />,
      title: "আনন্দময় মুহূর্ত",
      description: "তোমার জীবন সর্বদা সুন্দর সঙ্গীতে পূর্ণ থাকুক!",
      color: "from-purple-400 to-pink-400"
    },
    {
      id: 4,
      icon: <Gift className="text-rose-500" size={32} />,
      title: "অনন্ত উপহার",
      description: "জীবন তোমাকে অসীম সুখ উপহার দিক!",
      color: "from-rose-400 to-red-400"
    },
    {
      id: 5,
      icon: <PartyPopper className="text-blue-500" size={32} />,
      title: "উৎসব",
      description: "প্রতিদিন তোমার জন্য উৎসব হোক!",
      color: "from-blue-400 to-cyan-400"
    },
    {
      id: 6,
      icon: <Heart className="text-red-500" size={32} />,
      title: "ভালোবাসা ও সুখ",
      description: "ভালোবাসা ও সুখ সর্বদা তোমার সঙ্গী হোক!",
      color: "from-red-400 to-pink-400"
    }
  ]

  return (
    <div className="min-h-screen p-4 pt-20 pb-32">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto"
      >
        {/* হেডার */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <Gift className="text-pink-500" size={32} />
            <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              জন্মদিনের শুভেচ্ছা
            </h1>
            <PartyPopper className="text-yellow-500" size={32} />
          </motion.div>
          <p className="text-gray-600 text-lg">একজন বিশেষ মানুষের জন্য বিশেষ শুভেচ্ছা!</p>
        </div>

        {/* শুভেচ্ছা গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {wishes.map((wish, index) => (
            <motion.div
              key={wish.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`bg-linear-to-br ${wish.color} rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden group`}
            >
              {/* ব্যাকগ্রাউন্ড প্যাটার্ন */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 pattern-dots pattern-white pattern-size-4" />
              </div>
              
              <div className="relative z-10">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="mb-4"
                >
                  {wish.icon}
                </motion.div>
                
                <h3 className="text-2xl font-bold mb-3">{wish.title}</h3>
                <p className="text-white/90">{wish.description}</p>
                
                <motion.div
                  className="mt-6"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                    <div className="h-full bg-white animate-pulse" style={{ width: '70%' }} />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ইন্টারেক্টিভ শুভেচ্ছা কেক */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-2xl p-8 max-w-2xl mx-auto text-center"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6">একটি শুভেচ্ছা করুন!</h3>
          
          <div className="relative w-48 h-48 mx-auto mb-6">
            {/* কেক লেয়ার */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
              {/* কেক বেস */}
              <div className="w-32 h-8 bg-linear-to-r from-yellow-400 to-orange-400 rounded-t-lg" />
              <div className="w-36 h-10 bg-linear-to-r from-pink-400 to-rose-400 rounded-t-lg" />
              <div className="w-40 h-12 bg-linear-to-r from-white to-pink-100 rounded-t-lg" />
              
              {/* মোমবাতি */}
              <div className="flex justify-center gap-2 absolute -top-4 left-1/2 transform -translate-x-1/2">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
                    className="w-1 h-8 bg-linear-to-t from-red-500 to-yellow-500 rounded-t"
                  />
                ))}
              </div>
            </div>
          </div>
          
          <p className="text-gray-600 mb-4">মোমবাতি ফুঁক দিন এবং আপনার শুভেচ্ছা করুন!</p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 mx-auto"
          >
            <Heart size={20} />
            জন্মদিনের শুভেচ্ছা পাঠান
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}