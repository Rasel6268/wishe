import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";

const BirthdayGallery = () => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [releasedCards, setReleasedCards] = useState([]);
  const [isBoxVisible, setIsBoxVisible] = useState(true);
  const [openNextBtn,setOpenNextBtn] = useState(false)
  const neviagate = useNavigate()

  // তানজিনা রিপার জন্মদিনের ছবি
  const birthdayPhotos = [
    {
      id: 1,
      frontImage:
        "https://i.ibb.co.com/HLpNhGWG/474129728-1127587152433395-7534263163797870131-n.jpg",
      backMessage:
        "শুভ জন্মদিন! আপনার দিনটি আনন্দ, হাসি এবং চমৎকার বিস্ময়ে পরিপূর্ণ হোক! 🎂",
      title: "জন্মদিনের কেক",
      color: "from-pink-500 to-rose-500",
    },
    {
      id: 2,
      frontImage:
        "https://i.ibb.co.com/VcPYZJVj/481099275-1155271662998277-6080231371123247470-n.jpg",
      backMessage: "আপনার জন্য অসীম সুখ এবং সাফল্য কামনা! ✨",
      title: "বেলুন উদযাপন",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 3,
      frontImage:
        "https://i.ibb.co.com/fdtfdx67/482044962-1156963322829111-6069047737790081898-n.jpg",
      backMessage:
        "এই বছর আপনাকে আপনার স্বপ্ন এবং আকাঙ্ক্ষার কাছাকাছি নিয়ে আসুক! 🌟",
      title: "উপহার বক্স",
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: 4,
      frontImage:
        "https://i.ibb.co.com/zVQXBJGh/481231811-1156963306162446-3239089265638964953-n.jpg",
      backMessage:
        "আরেক বছরের আশ্চর্যজনক অ্যাডভেঞ্চার এবং স্মৃতির জন্য চিয়ার্স! 🥂",
      title: "উদযাপন",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 5,
      frontImage:
        "https://i.ibb.co.com/fGNLqqKR/486469917-1173763044482472-7288194406050436565-n.jpg",
      backMessage: "আপনার জন্মদিনটি আপনার মতোই বিশেষ এবং চমৎকার হোক! 🎈",
      title: "পার্টি টাইম",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: 6,
      frontImage:
        "https://i.ibb.co.com/xtNY99qP/486124404-1173762851149158-8337524529395968051-n.jpg",
      backMessage: "সারা জীবন স্থায়ী সুন্দর স্মৃতি তৈরির জন্য এখানে! 📸",
      title: "বিশেষ মুহূর্ত",
      color: "from-red-500 to-pink-500",
    },
    {
      id: 7,
      frontImage:
        "https://i.ibb.co.com/m57t1GDX/486185645-1174633461062097-5106493753291045205-n.jpg",
      backMessage: "সারা জীবন স্থায়ী সুন্দর স্মৃতি তৈরির জন্য এখানে! 📸",
      title: "বিশেষ মুহূর্ত",
      color: "from-red-500 to-pink-500",
    },
    {
      id: 8,
      frontImage:
        "https://i.ibb.co.com/LDYxP4Pz/481079867-1155528276305949-5233794373492214713-n.jpg",
      backMessage: "সারা জীবন স্থায়ী সুন্দর স্মৃতি তৈরির জন্য এখানে! 📸",
      title: "বিশেষ মুহূর্ত",
      color: "from-red-500 to-pink-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      scale: 0,
      rotate: -180,
      opacity: 0,
    },
    visible: (i) => ({
      scale: 1,
      rotate: 0,
      opacity: 1,
      x: getCardPosition(i).x,
      y: getCardPosition(i).y,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
        delay: i * 0.2 + 0.5,
      },
    }),
    hover: {
      scale: 1.1,
      rotate: 0,
      zIndex: 50,
      transition: {
        duration: 0.3,
      },
    },
  };

  const flipVariants = {
    front: {
      rotateY: 0,
      transition: { duration: 0.6 },
    },
    back: {
      rotateY: 180,
      transition: { duration: 0.6 },
    },
  };

  const boxLidVariants = {
    closed: {
      rotateX: 0,
      y: 0,
    },
    opening: {
      rotateX: -90,
      y: -40,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  // কার্ডগুলির অবস্থান গণনা করুন
  function getCardPosition(index) {
    const angle = (index * 2 * Math.PI) / birthdayPhotos.length;
    const radius = 300;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  }

  const handleOpenGallery = async () => {
    setIsBoxVisible(false);

    // বক্স খুলুন
    await new Promise((resolve) => setTimeout(resolve, 300));

    // একে একে কার্ড ছেড়ে দিন
    for (let i = 0; i < birthdayPhotos.length; i++) {
      setReleasedCards((prev) => [...prev, birthdayPhotos[i].id]);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    // সব কার্ড বের হওয়ার পরে বক্স লুকান
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsGalleryOpen(true);
  };
  const nextPageHandler = () => {
      neviagate('/messages')
  }

  const handleCloseGallery = () => {
    setIsGalleryOpen(false);
    setActiveCard(null);
    setReleasedCards([]);
    setIsBoxVisible(true);
    setOpenNextBtn(true)
  };

  const handleCardClick = (id) => {
    setActiveCard(activeCard === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-purple-50 to-blue-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* ব্যাকগ্রাউন্ড ডেকোরেটিভ এলিমেন্টস */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-pink-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-200 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>

      {/* বন্ধ উপহার বক্স - শুধুমাত্র শুরুতে দৃশ্যমান */}
      <AnimatePresence>
        {isBoxVisible && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            className="relative z-10"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenGallery}
              className="relative cursor-pointer group"
            >
              {/* উপহার বক্স */}
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                {/* বক্সের নিচের অংশ */}
                <div className="absolute inset-0 bg-linear-to-br from-pink-500 to-purple-600 rounded-lg shadow-2xl">
                  <div className="absolute inset-2 bg-linear-to-br from-pink-400 to-purple-500 rounded-md"></div>

                  {/* বক্সের ভিতরে উদ্বোধনী ইফেক্ট */}
                  <div className="absolute inset-4 bg-linear-to-b from-pink-300 to-purple-400 rounded opacity-80">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 2,
                        }}
                        className="text-white text-4xl"
                      >
                        🎁
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* খোলার অ্যানিমেশন সহ বক্সের ঢাকনা */}
                <motion.div
                  variants={boxLidVariants}
                  initial="closed"
                  animate={releasedCards.length > 0 ? "opening" : "closed"}
                  className="absolute inset-0 bg-linear-to-br from-red-500 to-pink-600 rounded-lg shadow-2xl -top-4"
                >
                  <div className="absolute inset-2 bg-linear-to-br from-red-400 to-pink-500 rounded-md"></div>

                  {/* ফিতা */}
                  <div className="absolute top-1/2 left-0 w-full h-12 bg-linear-to-r from-yellow-400 to-yellow-300 transform -translate-y-1/2 shadow-lg"></div>
                  <div className="absolute left-1/2 top-0 w-12 h-full bg-linear-to-b from-yellow-400 to-yellow-300 transform -translate-x-1/2 shadow-lg"></div>

                  {/* ফিতার বাউ */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      <div className="w-16 h-16 bg-linear-to-br from-yellow-400 to-yellow-500 rounded-full shadow-lg"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-linear-to-br from-yellow-300 to-yellow-400 rounded-full"></div>
                    </div>
                  </div>
                </motion.div>

                {/* উজ্জ্বলতা ইফেক্ট */}
                <div className="absolute top-2 left-2 w-16 h-16 bg-white opacity-20 rounded-full blur-lg"></div>
              </div>

              {/* নির্দেশনা টেক্সট */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-center"
              >
                <h2 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  জন্মদিনের চমক! 🎁
                </h2>
                <p className="text-gray-600 text-lg">
                  জন্মদিনের কার্ড প্রকাশ করতে উপহার বক্সে ক্লিক করুন!
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
        {
          openNextBtn && <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.4)",
          }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 my-5 bg-linear-to-r from-pink-600 to-purple-600 text-white font-bold rounded-lg shadow-lg cursor-pointer"
        >
          Next
        </motion.button>
        }
        
      </AnimatePresence>

      {/* বক্স থেকে বের হওয়া কার্ড */}
      <div className="relative z-20">
        {birthdayPhotos.map((photo, index) => (
          <motion.div
            key={photo.id}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate={releasedCards.includes(photo.id) ? "visible" : "hidden"}
            whileHover="hover"
            className={`absolute left-1/2 top-1/2 w-48 h-56 md:w-56 md:h-64 cursor-pointer ${photo.color}`}
            style={{
              marginLeft: "-7rem",
              marginTop: "-8rem",
            }}
            onClick={() => handleCardClick(photo.id)}
          >
            {/* উল্টানো কার্ড কন্টেইনার */}
            <div className="relative w-full h-full perspective-1000">
              <motion.div
                className="absolute w-full h-full rounded-xl shadow-2xl"
                style={{
                  transformStyle: "preserve-3d",
                  transform:
                    activeCard === photo.id
                      ? "rotateY(180deg)"
                      : "rotateY(0deg)",
                }}
                variants={flipVariants}
                animate={activeCard === photo.id ? "back" : "front"}
              >
                {/* কার্ডের সামনের দিক - ছবি */}
                <div
                  className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden border-4 border-white"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <img
                    src={photo.frontImage}
                    alt={photo.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-xl font-bold text-white mb-1">
                        {photo.title}
                      </h3>
                      <p className="text-gray-200 text-sm">
                        বার্তা পড়তে ক্লিক করুন
                      </p>
                    </div>
                  </div>
                  {/* গ্লো ইফেক্ট */}
                  <div className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent"></div>

                  {/* কার্ডের কোণ ডেকোরেশন */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-white/50 rounded-tl-lg"></div>
                  <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-white/50 rounded-tr-lg"></div>
                </div>

                {/* কার্ডের পিছনের দিক - বার্তা */}
                <div
                  className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden border-4 border-white"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <div className="absolute inset-0 bg-linear-to-br from-pink-500 to-purple-600 p-4 flex items-center justify-center">
                    <div className="text-center p-2">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-xl">🎂</span>
                      </div>
                      <p className="text-white text-sm leading-relaxed font-medium">
                        {photo.backMessage}
                      </p>
                      <div className="mt-3">
                        <span className="inline-block px-3 py-1 bg-white/20 text-white rounded-full text-xs">
                          💝 জন্মদিনের শুভেচ্ছা
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ডেকোরেটিভ কোণ */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-white/50 rounded-tl-lg"></div>
                  <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-white/50 rounded-tr-lg"></div>
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-white/50 rounded-bl-lg"></div>
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-white/50 rounded-br-lg"></div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* গ্যালারি ভিউ - সব কার্ড প্রকাশিত হওয়ার পরে */}
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            class="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 py-8 overflow-y-auto"
          >
            <div className="container mx-auto px-4">
              {/* গ্যালারি হেডার */}
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center mb-12"
              >
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                  তানজিনা রিপা - শুভ জন্মদিন! 🎉
                </h1>
                <p className="text-xl text-gray-300 mb-6">
                  বিশেষ জন্মদিনের বার্তা পড়তে যেকোনো কার্ডে ক্লিক করুন
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCloseGallery}
                  className="px-6 py-3 bg-linear-to-r from-pink-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition-shadow cursor-pointer mr-2"
                >
                  গ্যালারি বন্ধ করুন
                </motion.button>
                 <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextPageHandler}
                  className="px-6 py-3 bg-linear-to-r from-pink-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition-shadow cursor-pointer"
                >
                  Next
                </motion.button>
              </motion.div>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
              >
                {birthdayPhotos.map((photo) => (
                  <motion.div
                    key={photo.id}
                    variants={{
                      hidden: { y: 50, opacity: 0 },
                      visible: {
                        y: 0,
                        opacity: 1,
                        transition: {
                          type: "spring",
                          stiffness: 100,
                          damping: 12,
                        },
                      },
                    }}
                    whileHover={{ scale: 1.05 }}
                    className="relative h-80 cursor-pointer"
                    onClick={() => handleCardClick(photo.id)}
                  >
                    {/* উল্টানো কার্ড কন্টেইনার */}
                    <div className="relative w-full h-full perspective-1000">
                      <motion.div
                        className="absolute w-full h-full rounded-2xl shadow-2xl"
                        style={{
                          transformStyle: "preserve-3d",
                          transform:
                            activeCard === photo.id
                              ? "rotateY(180deg)"
                              : "rotateY(0deg)",
                        }}
                        variants={flipVariants}
                        animate={activeCard === photo.id ? "back" : "front"}
                      >
                        {/* কার্ডের সামনের দিক - ছবি */}
                        <div
                          className="absolute w-full h-full backface-hidden rounded-2xl overflow-hidden border-4 border-white"
                          style={{ backfaceVisibility: "hidden" }}
                        >
                          <img
                            src={photo.frontImage}
                            alt={photo.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent">
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                              <h3 className="text-2xl font-bold text-white mb-2">
                                {photo.title}
                              </h3>
                              <p className="text-gray-200">
                                বার্তা পড়তে ক্লিক করুন
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* কার্ডের পিছনের দিক - বার্তা */}
                        <div
                          className="absolute w-full h-full backface-hidden rounded-2xl overflow-hidden border-4 border-white"
                          style={{
                            backfaceVisibility: "hidden",
                            transform: "rotateY(180deg)",
                          }}
                        >
                          <div className="absolute inset-0 bg-linear-to-br from-pink-500 to-purple-600 p-6 flex items-center justify-center">
                            <div className="text-center">
                              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-3xl">🎂</span>
                              </div>
                              <p className="text-white text-lg md:text-xl leading-relaxed">
                                {photo.backMessage}
                              </p>
                              <div className="mt-6">
                                <span className="inline-block px-4 py-2 bg-white/20 text-white rounded-full text-sm">
                                  💝 জন্মদিনের শুভেচ্ছা
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* ফুটার বার্তা */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center mt-12"
              >
                <p className="text-gray-300 text-xl italic">
                  "আপনার জন্মদিনটি আপনার মতোই আশ্চর্যজনক হোক!"
                </p>
                <div className="mt-4 flex justify-center space-x-4 text-2xl">
                  <span>🎈</span>
                  <span>🎂</span>
                  <span>🎁</span>
                  <span>✨</span>
                  <span>🥳</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* কার্ড প্রকাশিত হলে স্পার্কল ইফেক্ট */}
      <AnimatePresence>
        {releasedCards.length > 0 && !isGalleryOpen && (
          <>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  scale: 0,
                  opacity: 1,
                  x: 0,
                  y: 0,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [1, 1, 0],
                  x: Math.random() * 400 - 200,
                  y: Math.random() * 400 - 200,
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.05,
                }}
                className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-400 rounded-full pointer-events-none"
                style={{
                  boxShadow: "0 0 10px 2px yellow",
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BirthdayGallery;
