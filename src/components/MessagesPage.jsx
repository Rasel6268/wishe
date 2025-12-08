import { motion } from 'framer-motion'
import { useState } from 'react'
import { MessageCircle, Send, Heart, Smile } from 'lucide-react'

export default function MessagesPage() {
  const [messages, setMessages] = useState([
    { id: 1, text: "তানজিনা, শুভ জন্মদিন! 🎉", sender: "বন্ধু" },
    { id: 2, text: "জীবনের সকল সুখ তোমার জন্য কামনা!", sender: "পরিবার" },
    { id: 3, text: "তোমার সব স্বপ্ন পূরণ হোক!", sender: "শুভাকাঙ্ক্ষী" },
  ])
  const [newMessage, setNewMessage] = useState('')

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, text: newMessage, sender: "আপনি" }
      ])
      setNewMessage('')
    }
  }

  return (
    <div className="min-h-screen p-4 pt-20 pb-32">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto"
      >
        {/* হেডার */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <MessageCircle className="text-pink-500" size={32} />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              জন্মদিনের বার্তা
            </h1>
            <Heart className="text-rose-500" size={32} />
          </motion.div>
          <p className="text-gray-600 text-lg">তানজিনার জন্য আপনার শুভেচ্ছা পাঠান!</p>
        </div>

        {/* বার্তা কন্টেইনার */}
        <div className="glass-card rounded-2xl p-6 mb-8 h-[500px] overflow-y-auto">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex ${msg.sender === "আপনি" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-xs md:max-w-md rounded-2xl p-4 ${
                  msg.sender === "আপনি" 
                    ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white" 
                    : "bg-white/30 backdrop-blur-sm"
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold">{msg.sender}</span>
                    <Smile size={16} />
                  </div>
                  <p>{msg.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* বার্তা ইনপুট */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex gap-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="তানজিনার জন্য জন্মদিনের শুভেচ্ছা লিখুন..."
              className="flex-1 bg-white/30 backdrop-blur-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={sendMessage}
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl px-6 flex items-center gap-2"
            >
              <Send size={20} />
              পাঠান
            </motion.button>
          </div>
          
          {/* দ্রুত প্রতিক্রিয়া */}
          <div className="flex gap-3 mt-4 justify-center">
            {['🎉', '🎂', '🥳', '🎁', '❤️', '✨'].map((emoji, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setNewMessage(prev => prev + emoji)}
                className="text-2xl bg-white/20 p-2 rounded-lg hover:bg-white/30"
              >
                {emoji}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}