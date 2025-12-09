import React, { useState, useEffect, useRef } from "react";
import AudioFile from "../assets/Audio.mp3";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

const DynamicTimeBirthdayWish = () => {
  const [activeScene, setActiveScene] = useState(0);
  const [petals, setPetals] = useState([]);
  const [stars, setStars] = useState([]);
  const [candleFlames, setCandleFlames] = useState([]);
  const [showSecretMessage, setShowSecretMessage] = useState(false);
  const [moonPhase, setMoonPhase] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(true); // Changed to true for auto-play
  const [giftModal, setGiftModal] = useState({ show: false, giftId: null });
  const navigate = useNavigate();

  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const nextPage = () => [navigate("/wishes")];

  // সময় ভিত্তিক সিন
  const scenes = [
    {
      title: "ভোরের আলো",
      bg: "from-blue-50 via-cyan-50 to-emerald-50",
      time: "সকাল ৬:০০",
      emoji: "🌅",
      message:
        "ভোরের প্রথম আলোয় যেমন নতুন আশার সূচনা, তেমনি আজকের দিনটি তোর জীবনে নতুন সম্ভাবনার দুয়ার খুলে দিক।",
    },
    {
      title: "সূর্যোদয়",
      bg: "from-orange-50 via-amber-50 to-yellow-50",
      time: "সকাল ৮:০০",
      emoji: "☀️",
      message:
        "সূর্য উঠার সাথে সাথে যেভাবে পৃথিবী আলোকিত হয়, তেমনি তোর হাসি যেন চারপাশ আলোকিত করে দেয়।",
    },
    {
      title: "দুপুর",
      bg: "from-sky-50 via-blue-50 to-indigo-50",
      time: "দুপুর ১২:০০",
      emoji: "⛅",
      message:
        "দুপুরের সূর্যের মতই উজ্জ্বল হোক তোর প্রতিটি মুহূর্ত, তীব্র কিন্তু স্নেহময় তোর আগামীর পথচলা।",
    },
    {
      title: "সন্ধ্যা",
      bg: "from-pink-50 via-rose-50 to-purple-50",
      time: "সন্ধ্যা ৬:০০",
      emoji: "🌆",
      message:
        "সন্ধ্যার রাঙা আভা যেভাবে আকাশ রাঙিয়ে দেয়, তেমনি তোর জীবন যেন রঙিন হয়ে উঠে স্নেহ-ভালোবাসায়।",
    },
    {
      title: "রাত",
      bg: "from-indigo-50 via-purple-900 to-gray-900",
      time: "রাত ৯:০০",
      emoji: "🌙",
      message:
        "রাতের তারার মতই ঝলমল করুক তোর প্রতিটি স্বপ্ন, চাঁদের আলোয় যেন আলোকিত হয় তোর পথচলা।",
    },
  ];

  // গোপন উপহারের তথ্য
  const secretGifts = [
    {
      id: 1,
      emoji: "📝",
      title: "ডাউটের আলো",
      message:
        "মাঝে মাঝে আমি কিছু বিষয় নিয়ে ডাউট থাকি, সেই ডাউট গুলো তোর সাথে শেয়ার করলে তুই খুবই সুন্দর করে বিষয়টা বুঝিয়ে দিস, খুবই ক্রিটিকাল বিষয়গুলো তুলে ধরিস যেটা আমি ধরতে পারি না।",
      color: "from-red-100 to-pink-100",
    },
    {
      id: 2,
      emoji: "🌸",
      title: "শান্ত লক্ষ্মী মেয়ের জন্য",
      message:
        "তুই খুবই লক্ষ্মী একটা মেয়ে। তোর মতো স্বাধীনচেতা মেয়ে আমি খুবই কম দেখেছি।\nতুই যেরকম আছিস, সারা জীবন যেন এরকম শান্ত, লক্ষ্মী মেয়ের মতোই থাকিস।",
      color: "from-white to-rose-100",
    },
    {
      id: 9,
      emoji: "💡",
      title: "ইউনিক চিন্তাভাবনা",
      message:
        "তোর চিন্তাভাবনাগুলো খুবই ইউনিক। বাস্তববাদী যেখানে ইমোশন থাকলেও সেটা বাস্তবতার সাথে সুন্দরভাবে সামঞ্জস্যপূর্ণ থাকে।",
      color: "from-yellow-100 to-amber-100",
    },
    {
      id: 4,
      emoji: "🎊",
      title: "বিশ্বাস ও সৌম্যতা",
      message:
        "ছেলেদের প্রতি কিছুটা বিশ্বাস বাড়িয়ে দেখতে পারোস । তোর সাথে কথা বলে জানি না কেন, ছেলেদের প্রতি আলাদা পূর্ব শত্রুতা আছে। আমি জানি না।",
      color: "from-green-100 to-emerald-100",
    },
    {
      id: 5,
      emoji: "🧿",
      title: "শুভকামনা",
      message:
        "আমার প্রার্থনা, তোর জীবন যেন সুখে ভরে থাকে। বন্ধু হিসেবে তোর হাসি সবসময় পাশে থাকুক।",
      color: "from-purple-100 to-violet-100",
    }
    
  ];

  // পাপড়ি তৈরি
  const createPetals = () => {
    const newPetals = [];
    for (let i = 0; i < 30; i++) {
      newPetals.push({
        id: i,
        x: Math.random() * 100,
        y: -10,
        size: Math.random() * 20 + 5,
        speed: Math.random() * 2 + 1,
        delay: Math.random() * 5,
        type: i % 5,
        color: [
          "text-pink-300",
          "text-rose-300",
          "text-purple-300",
          "text-red-300",
          "text-fuchsia-300",
        ][i % 5],
      });
    }
    setPetals(newPetals);
  };

  // তারা তৈরি
  const createStars = () => {
    const newStars = [];
    for (let i = 0; i < 80; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 3 + 2,
      });
    }
    setStars(newStars);
  };

  // মোমবাতির শিখা তৈরি
  const createCandleFlames = () => {
    const flames = [];
    for (let i = 0; i < 7; i++) {
      flames.push({
        id: i,
        height: Math.random() * 15 + 10,
        flickerSpeed: Math.random() * 0.5 + 0.3,
      });
    }
    setCandleFlames(flames);
  };

  useEffect(() => {
    createPetals();
    createStars();
    createCandleFlames();

    // স্বয়ংক্রিয় দৃশ্য পরিবর্তন
    const sceneInterval = setInterval(() => {
      setActiveScene((prev) => (prev + 1) % scenes.length);
    }, 8000);

    // মুন ফেজ পরিবর্তন
    const moonInterval = setInterval(() => {
      setMoonPhase((prev) => (prev + 1) % 8);
    }, 2000);

    // ক্যানভাস এনিমেশন
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      let animationId;

      const drawWaves = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const time = Date.now() * 0.001;
        const width = canvas.width;
        const height = canvas.height;

        // সময় ভিত্তিক গ্রেডিয়েন্ট
        let gradient;
        if (activeScene === 0) {
          // ভোর
          gradient = ctx.createLinearGradient(0, 0, width, height);
          gradient.addColorStop(0, "rgba(173, 216, 230, 0.2)");
          gradient.addColorStop(0.5, "rgba(135, 206, 250, 0.2)");
          gradient.addColorStop(1, "rgba(240, 248, 255, 0.2)");
        } else if (activeScene === 2) {
          // দুপুর
          gradient = ctx.createLinearGradient(0, 0, width, height);
          gradient.addColorStop(0, "rgba(255, 255, 224, 0.2)");
          gradient.addColorStop(0.5, "rgba(255, 250, 205, 0.2)");
          gradient.addColorStop(1, "rgba(240, 230, 140, 0.2)");
        } else if (activeScene === 3) {
          // সন্ধ্যা
          gradient = ctx.createLinearGradient(0, 0, width, height);
          gradient.addColorStop(0, "rgba(255, 192, 203, 0.2)");
          gradient.addColorStop(0.5, "rgba(221, 160, 221, 0.2)");
          gradient.addColorStop(1, "rgba(186, 85, 211, 0.2)");
        } else {
          // অন্যান্য সময়
          gradient = ctx.createLinearGradient(0, 0, width, height);
          gradient.addColorStop(0, "rgba(255, 182, 193, 0.2)");
          gradient.addColorStop(0.5, "rgba(221, 160, 221, 0.2)");
          gradient.addColorStop(1, "rgba(173, 216, 230, 0.2)");
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // ওয়েভ আঁকা
        ctx.beginPath();
        ctx.moveTo(0, height / 2);

        for (let x = 0; x < width; x++) {
          const y =
            height / 2 +
            Math.sin(x * 0.01 + time) * 20 +
            Math.sin(x * 0.02 + time * 0.7) * 10;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        const waveGradient = ctx.createLinearGradient(0, height / 2, 0, height);
        waveGradient.addColorStop(
          0,
          `rgba(${activeScene === 3 ? "255,105,180" : "138,43,226"}, 0.3)`
        );
        waveGradient.addColorStop(
          1,
          `rgba(${activeScene === 3 ? "186,85,211" : "75,0,130"}, 0.1)`
        );

        ctx.fillStyle = waveGradient;
        ctx.fill();

        animationId = requestAnimationFrame(drawWaves);
      };

      drawWaves();

      return () => {
        cancelAnimationFrame(animationId);
        clearInterval(sceneInterval);
        clearInterval(moonInterval);
      };
    }
  }, [activeScene]);

  // Auto-play audio on component mount
  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.7; // Set volume to 70%
        audioRef.current
          .play()
          .then(() => {
            setAudioPlaying(true);
            console.log("Audio started playing automatically");
          })
          .catch((error) => {
            console.log("Auto-play failed:", error);
            // If autoplay fails, show the muted button
            setAudioPlaying(false);
          });
      }
    };

    // Try to play immediately
    playAudio();

    // If autoplay fails, try again after user interaction
    const handleUserInteraction = () => {
      if (!audioPlaying && audioRef.current) {
        audioRef.current
          .play()
          .then(() => {
            setAudioPlaying(true);
          })
          .catch((error) => {
            console.log("Play after interaction failed:", error);
          });
      }
    };

    // Add event listeners for user interaction
    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("keydown", handleUserInteraction);
    document.addEventListener("touchstart", handleUserInteraction);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
    };
  }, []);

  // গোপন উপহার ক্লিক হ্যান্ডলার
  const handleGiftClick = (giftId) => {
    setGiftModal({
      show: true,
      giftId: giftId,
    });
  };

  // বর্তমান উপহারের তথ্য পাওয়া
  const currentGift = secretGifts.find((gift) => gift.id === giftModal.giftId);

  // মুন ফেজ আইকন
  const moonPhases = ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"];

  // বিশেষ এফেক্ট - ম্যাজিক্যাল অবজেক্ট
  const MagicalObject = ({ type, delay }) => {
    const [position, setPosition] = useState({ x: 50, y: 50 });
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setPosition({
          x: 50 + Math.sin(Date.now() * 0.001 + delay) * 40,
          y: 50 + Math.cos(Date.now() * 0.001 + delay) * 20,
        });
        setRotation((prev) => prev + 1);
      }, 16);

      return () => clearInterval(interval);
    }, [delay]);

    const objects = {
      crystal: "🔮",
      star: "🌟",
      sparkle: "✨",
      galaxy: "🌌",
      comet: "☄️",
    };

    return (
      <div
        className="absolute text-4xl"
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: `rotate(${rotation}deg)`,
          filter: "drop-shadow(0 0 10px rgba(255,255,255,0.5))",
        }}
      >
        {objects[type]}
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className={`min-h-screen bg-linear-to-br ${scenes[activeScene].bg} transition-all duration-2000 p-4 md:p-8 font-['Noto_Sans_Bengali','Kalpurush','sans-serif'] overflow-hidden relative`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        width={typeof window !== "undefined" ? window.innerWidth : 1000}
        height={typeof window !== "undefined" ? window.innerHeight : 800}
      />

      {/* ভাসমান পাপড়ি */}
      {petals.map((petal) => (
        <div
          key={petal.id}
          className={`absolute ${petal.color} pointer-events-none`}
          style={{
            left: `${petal.x}%`,
            top: `${petal.y}%`,
            fontSize: `${petal.size}px`,
            animation: `fall ${petal.speed + 5}s linear ${
              petal.delay
            }s infinite`,
            opacity: 0.8,
          }}
        >
          {["🌸", "💮", "🏵️", "🌺", "🌼"][petal.type]}
        </div>
      ))}

      {/* তারা (রাতের দৃশ্যে) */}
      {activeScene === 4 &&
        stars.map((star) => (
          <div
            key={star.id}
            className="absolute text-yellow-200 pointer-events-none"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animation: `pulse ${star.twinkleSpeed}s ease-in-out infinite alternate`,
              borderRadius: "50%",
              boxShadow: `0 0 ${star.size * 2}px ${
                star.size
              }px rgba(255, 255, 200, 0.3)`,
            }}
          />
        ))}

      {/* ম্যাজিক্যাল অবজেক্ট */}
      {[0, 1, 2, 3, 4].map((i) => (
        <MagicalObject
          key={i}
          type={["crystal", "star", "sparkle", "galaxy", "comet"][i]}
          delay={i}
        />
      ))}

      {/* অডিও কন্ট্রোল */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={() => {
            if (audioRef.current) {
              if (audioPlaying) {
                audioRef.current.pause();
                setAudioPlaying(false);
              } else {
                audioRef.current
                  .play()
                  .then(() => {
                    setAudioPlaying(true);
                  })
                  .catch((error) => {
                    console.log("Play failed:", error);
                  });
              }
            }
          }}
          className={`
            glass-card rounded-full p-3 hover:scale-110 transition-all duration-300
            backdrop-blur-sm cursor-pointer relative
            ${!audioPlaying ? "animate-bounce" : ""}
          `}
        >
          {audioPlaying ? "🎵" : "🔇"}

          {/* Optional: Add a glowing dot when not playing */}
          {!audioPlaying && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          )}
        </button>
        <audio ref={audioRef} loop autoPlay>
          <source src={AudioFile} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* টাইমলাইন কন্ট্রোল */}
        <div className="flex justify-center mb-8">
          <div className="backdrop-blur-sm bg-white/20 rounded-full p-2 flex items-center space-x-2 overflow-x-auto max-w-full">
            {scenes.map((scene, index) => (
              <button
                key={index}
                onClick={() => setActiveScene(index)}
                className={`px-4 py-2 rounded-full transition-all whitespace-nowrap cursor-pointer ${
                  activeScene === index
                    ? "bg-linear-to-r from-pink-500 to-rose-500 text-white shadow-lg"
                    : "hover:bg-white/30"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span>{scene.emoji}</span>
                  <span className="text-sm md:text-base">
                    {scene.title}
                    <span className="hidden md:inline ml-1">
                      • {scene.time}
                    </span>
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* মেইন কন্টেন্ট */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* বাম কলাম - প্রধান বার্তা */}
          <div className="lg:col-span-2">
            <div className="perspective-1000">
              <div className="relative preserve-3d group hover:rotate-y-10 transition-transform duration-1000">
                <div className="backdrop-blur-md bg-white/30 rounded-3xl p-6 md:p-8 shadow-2xl border border-white/40">
                  <div className="text-center mb-8">
                    <div className="inline-block relative">
                      <div className="text-6xl md:text-8xl mb-4 heartbeat">
                        {activeScene === 0
                          ? "🌅"
                          : activeScene === 1
                          ? "☀️"
                          : activeScene === 2
                          ? "⛅"
                          : activeScene === 3
                          ? "🌆"
                          : "🌙"}
                      </div>
                      <div className="absolute -top-2 -right-2 text-3xl bg-white/30 rounded-full p-2">
                        {moonPhases[moonPhase]}
                      </div>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-linear-to-r from-pink-600 via-rose-600 to-purple-600 bg-clip-text text-transparent">
                      {scenes[activeScene].title}
                    </h1>

                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-linear-to-r from-white/30 to-transparent rounded-full">
                      <span className="text-xl">
                        {scenes[activeScene].emoji}
                      </span>
                      <span className="text-lg font-medium">
                        {scenes[activeScene].time}
                      </span>
                    </div>
                  </div>

                  {/* সময় ভিত্তিক বার্তা */}
                  <div className="relative h-64 overflow-hidden rounded-2xl bg-linear-to-br from-white/20 to-transparent p-6 border border-white/30">
                    <div className="absolute inset-0 pattern-dots pattern-size-4 opacity-10"></div>

                    <div className="h-full flex flex-col justify-center relative z-10">
                      <p className="bengali-text text-xl md:text-2xl text-center leading-relaxed text-gray-800">
                        {scenes[activeScene].message}
                      </p>

                      <div className="mt-8 flex justify-center space-x-4">
                        {candleFlames.map((flame) => (
                          <div key={flame.id} className="relative">
                            <div
                              className={`w-3 md:w-4 h-10 md:h-12 bg-linear-to-t ${
                                activeScene === 3
                                  ? "from-amber-900 to-amber-800"
                                  : "from-amber-800 to-amber-700"
                              } rounded-full`}
                            ></div>
                            <div
                              className="absolute -top-3 md:-top-4 left-1/2 transform -translate-x-1/2 w-4 md:w-6 h-6 md:h-8 bg-gradient-to-t from-yellow-300 via-orange-400 to-red-500 rounded-full blur-sm"
                              style={{
                                height: `${flame.height}px`,
                                animation: `flicker ${flame.flickerSpeed}s ease-in-out infinite alternate`,
                              }}
                            ></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* সময় ভিত্তিক বিশেষ মেসেজ */}
                  <div className="mt-6 p-4 bg-linear-to-r from-white/20 to-transparent rounded-xl">
                    <p className="bengali-text text-center text-gray-700">
                      {activeScene === 0 &&
                        "ভোরের শিশিরের মতই স্বচ্ছ হোক তোর মন, সকালের আলোর মতই উজ্জ্বল হোক তোর ভবিষ্যৎ।"}
                      {activeScene === 1 &&
                        "সূর্যের কিরণ যেভাবে জাগিয়ে তোলে প্রকৃতিকে, তোর উপস্থিতি যেন তেমনই আনন্দ দেয় সবার মনে।"}
                      {activeScene === 2 &&
                        "দুপুরের নিস্তব্ধতা যেভাবে শান্তি বয়ে আনে, তেমনি তোর জীবন যেন শান্তি ও সমৃদ্ধিতে ভরে উঠে।"}
                      {activeScene === 3 &&
                        "সন্ধ্যার লালিমা যেভাবে আকাশকে করে রূপালী, তেমনি তোর বয়সের সাথে সাথে যেন বৃদ্ধি পায় প্রজ্ঞা।"}
                      {activeScene === 4 &&
                        "রাতের তারা যেভাবে পথ দেখায়, তেমনি তোর আদর্শ যেন পথ দেখায় অনেকে।"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ডান কলাম - ইন্টারেক্টিভ প্যানেল */}
          <div className="space-y-6">
            {/* টাইম কন্ট্রোল প্যানেল */}
            <div className="backdrop-blur-md bg-white/30 rounded-2xl p-6 border border-white/30">
              <h3 className="text-xl font-bold mb-4 text-center text-gray-800">
                সময়ের যাত্রা
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="bengali-text text-gray-700">
                    বর্তমান সময়
                  </span>
                  <div className="px-3 py-1 bg-linear-to-r from-rose-100 to-pink-100 rounded-full">
                    <span className="font-bold text-rose-600">
                      {scenes[activeScene].time}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/30">
                  <div className="flex justify-between mb-2">
                    <span className="bengali-text text-sm text-gray-600">
                      ভোর
                    </span>
                    <span className="bengali-text text-sm text-gray-600">
                      রাত
                    </span>
                  </div>
                  <div className="w-full h-2 bg-linear-to-r from-blue-300 via-yellow-300 to-purple-300 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-rose-500 to-pink-500 rounded-full transition-all duration-500"
                      style={{ width: `${(activeScene + 1) * 20}%` }}
                    ></div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={createPetals}
                    className="w-full py-3 bg-linear-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-medium hover:shadow-lg transition-all hover:scale-105 cursor-pointer"
                  >
                    {activeScene === 0
                      ? "🌅 ভোরের শুভেচ্ছা"
                      : activeScene === 1
                      ? "☀️ সকালের আলো"
                      : activeScene === 2
                      ? "⛅ দুপুরের শান্তি"
                      : activeScene === 3
                      ? "🌆 সন্ধ্যার রঙ"
                      : "🌙 রাতের তারা"}
                  </button>
                </div>
              </div>
            </div>

            {/* গোপন উপহার গ্যালারি */}
            <div className="backdrop-blur-md bg-white/30 rounded-2xl p-6 border border-white/30">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">🎁</div>
                <h4 className="font-bold text-lg text-gray-800">
                  তোকে আমার কিছু অবজারবেশন
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  ক্লিক করে দেখ আমর কিছু অবজারবেশন
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {secretGifts.map((gift) => (
                  <button
                    key={gift.id}
                    className="aspect-square rounded-xl bg-linear-to-br from-white/40 to-transparent flex flex-col items-center justify-center text-2xl hover:scale-110 transition-transform border border-white/30 hover:border-white/60 cursor-pointer"
                    onClick={() => handleGiftClick(gift.id)}
                  >
                    <div
                      className={`text-3xl mb-1 ${
                        gift.id === giftModal.giftId ? "animate-bounce" : ""
                      }`}
                    >
                      {gift.emoji}
                    </div> 
                    <div className="text-xs text-gray-700 mt-1">
                      {gift.title}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* গোপন উপহার মড্যাল */}
        {giftModal.show && currentGift && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="backdrop-blur-xl bg-white/20 rounded-3xl p-8 max-w-md w-full border border-white/40 animate-scaleIn shadow-2xl">
              <div className="text-center relative">
                <button
                  onClick={() => setGiftModal({ show: false, giftId: null })}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-white/30 rounded-full flex items-center justify-center hover:bg-white/50 cursor-pointer"
                >
                  ✕
                </button>

                <div
                  className={`text-6xl mb-4 p-4 rounded-full bg-linear-to-br ${currentGift.color} inline-block`}
                >
                  {currentGift.emoji}
                </div>

                <h3 className="text-2xl font-bold mb-2 text-white">
                  {currentGift.title}
                </h3>
                <div className="w-16 h-1 bg-linear-to-r from-rose-500 to-pink-500 mx-auto mb-4 rounded-full"></div>

                <div className="bengali-text text-lg mb-6 p-4 bg-gray-100 rounded-xl border border-white/30">
                  {currentGift.message}
                </div>

                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => {
                      createPetals();
                      setGiftModal({ show: false, giftId: null });
                    }}
                    className="px-6 py-3 bg-linear-to-r from-rose-500 to-pink-500 text-white rounded-full font-medium hover:shadow-lg transition-all hover:scale-105 cursor-pointer"
                  >
                    ধন্যবাদ 💝
                  </button>
                  <button
                    onClick={() => setGiftModal({ show: false, giftId: null })}
                    className="px-6 py-3 bg-linear-to-r from-gray-400 to-gray-600 text-white rounded-full font-medium hover:shadow-lg transition-all cursor-pointer"
                  >
                    বন্ধ করুন
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* কবিতার সেকশন */}
        <div className="backdrop-blur-md bg-white/30 rounded-3xl p-6 md:p-8 mb-12 border border-white/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-center mb-6">
              <div className="text-4xl mr-3">✍️</div>
              <h2 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                সময়ের কবিতা
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "ভোরের কবিতা",
                  content:
                    "ভোরের শিশির স্নিগ্ধ চোখে,\nনতুন সূর্যের আলোয় লোকে,\nজীবন শুরু নতুন করে,\nস্বপ্ন দেখি দূরের পথে।",
                  time: "সকাল ৬:০০",
                  icon: "🌅",
                },
                {
                  title: "দুপুরের গান",
                  content:
                    "দুপুরের রোদ মাথার উপর,\nশান্তির ছায়া মন ভরপুর,\nজীবনের মাঝে ক্ষণিক বিরতি,\nসুখের অনুভূতি অমৃত সুধা।",
                  time: "দুপুর ১২:০০",
                  icon: "⛅",
                },
                {
                  title: "সন্ধ্যার সুর",
                  content:
                    "সন্ধ্যার আলো লালচে আভা,\nদিনের শেষে প্রার্থনা যাহা,\nশান্তি চাই মনের ভিতর,\nসুখের আশায় চোখ আমার।",
                  time: "সন্ধ্যা ৬:০০",
                  icon: "🌆",
                },
                {
                  title: "রাতের স্বপ্ন",
                  content:
                    "রাতের তারা টুটি টুটি,\nস্বপ্ন দেখি দূরে উটি,\nচাঁদের আলো পথ দেখায়,নতুন দিনের আশা নিয়ে যায়।",
                  time: "রাত ৯:০০",
                  icon: "🌙",
                },
              ].map((poem, index) => (
                <div
                  key={index}
                  className="p-5 rounded-2xl bg-linear-to-br from-white/20 to-transparent hover:transform hover:scale-[1.02] transition-all duration-300 border border-white/30"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-gray-800">{poem.title}</h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{poem.icon}</span>
                      <span className="text-sm text-gray-600">{poem.time}</span>
                    </div>
                  </div>
                  <p className="bengali-text whitespace-pre-line leading-relaxed text-gray-700">
                    {poem.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ফুটার */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-4 px-6 py-4 backdrop-blur-md bg-white/20 rounded-full border border-white/30">
            <div className="text-2xl animate-pulse">✨</div>
            <div>
              <p className="bengali-text text-lg text-gray-800">
                প্রতিটি সময়ে শুভকামনা তোমার জন্য
              </p>
              <p className="text-rose-600 font-bold text-xl">
                শুভ জন্মদিন! 🎉🎂
              </p>
            </div>
            <div className="text-2xl animate-bounce">🎉</div>
          </div>
        </div>
        <div className="fixed bottom-8 left-5/6 transform -translate-x-1/2 z-50">
          <button onClick={nextPage} className="cursor-pointer">
            <div className="glass-card rounded-full px-6 py-3 flex items-center gap-2 shadow-2xl text-pink-700 hover:text-rose-600 transition-colors">
              <span className="text-sm font-medium">Next</span>
              <div className="p-2 rounded-full hover:bg-white/30">
                <ArrowRight size={20} />
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* কাস্টম সিএসএস */}
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes flicker {
          0%,
          100% {
            transform: translateX(-50%) scale(1);
            opacity: 0.8;
          }
          50% {
            transform: translateX(-50%) scale(1.1);
            opacity: 1;
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.5);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-shimmer {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          background-size: 1000px 100%;
          animation: shimmer 2s infinite linear;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }

        .group:hover .group-hover\\:rotate-y-10 {
          transform: rotateY(10deg);
        }

        .backdrop-blur-sm {
          backdrop-filter: blur(8px);
        }

        .backdrop-blur-md {
          backdrop-filter: blur(12px);
        }

        .backdrop-blur-xl {
          backdrop-filter: blur(24px);
        }

        .glass-card {
          backdrop-filter: blur(8px);
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
};

export default DynamicTimeBirthdayWish;
