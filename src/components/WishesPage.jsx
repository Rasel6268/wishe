import React, { useState, useEffect, useRef } from 'react';
import '../../src/Cake.css';
import AudioFile from "../assets/many.MP3";

const EnhancedBirthdayCake = () => {
  const [isCandleBlown, setIsCandleBlown] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [floatingEmojis, setFloatingEmojis] = useState([]);
  const [audioPlaying, setAudioPlaying] = useState(false);
  
  const audioRef = useRef(null);
  const celebrationSoundRef = useRef(null);

  // ইমোজি সংগ্রহ
  const celebrationEmojis = ['🎉', '🎊', '✨', '🌟', '🎈', '🎁', '🎂', '🍰', '🧁', '🎀', '💝', '💖', '💕', '🎇', '🎆', '🥳', '👏', '👍'];

  const blowCandle = () => {
  if (!isCandleBlown) {
    setIsCandleBlown(true);
    
    // সেলিব্রেশন শুরু
    startCelebration();
    
    // সেলিব্রেশন সাউন্ড প্লে
    if (celebrationSoundRef.current) {
      celebrationSoundRef.current.currentTime = 0;
      celebrationSoundRef.current.play();
    }
    
    // ব্যাকগ্রাউন্ড মিউজিক প্লে (নতুন অংশ)
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setAudioPlaying(true);
    }
    
    // 6 সেকেন্ড পর ফায়ারওয়ার্কস বন্ধ
    setTimeout(() => {
      setShowFireworks(false);
    }, 6000);
  }
};

  const startCelebration = () => {
    // ফায়ারওয়ার্কস দেখান
    setShowFireworks(true);
    setAudioPlaying(true)
    // ভাসমান ইমোজি তৈরি
    createFloatingEmojis();
  };

  const createFloatingEmojis = () => {
    const newEmojis = [];
    for (let i = 0; i < 25; i++) {
      newEmojis.push({
        id: i,
        emoji: celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)],
        x: Math.random() * 100,
        y: 110, // নিচ থেকে শুরু
        speed: Math.random() * 2 + 1,
        delay: Math.random() * 2,
        size: Math.random() * 30 + 20,
        rotation: Math.random() * 360
      });
    }
    setFloatingEmojis(newEmojis);
  };

  const relightCandle = () => {
    setIsCandleBlown(false);
    setShowFireworks(false);
    setFloatingEmojis([]);
  };

  const toggleAudio = () => {
    setAudioPlaying(!audioPlaying);
    if (audioRef.current) {
      if (audioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  // ভাসমান ইমোজি অ্যানিমেশন
  useEffect(() => {
    if (floatingEmojis.length > 0) {
      const interval = setInterval(() => {
        setFloatingEmojis(prev => 
          prev.map(emoji => ({
            ...emoji,
            y: emoji.y > -20 ? emoji.y - emoji.speed : 110,
            rotation: emoji.rotation + 1
          }))
        );
      }, 50);

      return () => clearInterval(interval);
    }
  }, [floatingEmojis]);

  // ফায়ারওয়ার্কস পার্টিকেল
  const Fireworks = () => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
      if (showFireworks) {
        const colors = [
          ['#FF6B6B', '#FFE66D'], // Red/Yellow
          ['#4ECDC4', '#45B7D1'], // Cyan/Blue
          ['#96CEB4', '#FFEAA7'], // Green/Yellow
          ['#FFAAA5', '#FF8B94'], // Pink
          ['#A8E6CF', '#DCEDC1']  // Mint/Green
        ];

        const newParticles = [];
        for (let i = 0; i < 50; i++) {
          const colorPair = colors[Math.floor(Math.random() * colors.length)];
          newParticles.push({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 8 + 4,
            color1: colorPair[0],
            color2: colorPair[1],
            duration: Math.random() * 2 + 1,
            delay: Math.random() * 1
          });
        }
        setParticles(newParticles);

        // প্রতি 1.5 সেকেন্ডে নতুন ফায়ারওয়ার্কস
        const interval = setInterval(() => {
          const colorPair = colors[Math.floor(Math.random() * colors.length)];
          const burstParticles = [];
          
          for (let i = 0; i < 30; i++) {
            burstParticles.push({
              id: Date.now() + i,
              x: Math.random() * 100,
              y: Math.random() * 100,
              size: Math.random() * 6 + 3,
              color1: colorPair[0],
              color2: colorPair[1],
              duration: Math.random() * 2 + 1,
              delay: 0
            });
          }
          setParticles(prev => [...prev, ...burstParticles]);
        }, 1500);

        // পুরানো পার্টিকেল রিমুভ
        const cleanupInterval = setInterval(() => {
          setParticles(prev => prev.filter(p => p.id > Date.now() - 3000));
        }, 1000);

        return () => {
          clearInterval(interval);
          clearInterval(cleanupInterval);
        };
      }
    }, [showFireworks]);

    return (
      <>
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute pointer-events-none"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: `radial-gradient(circle, ${particle.color1}, ${particle.color2})`,
              borderRadius: '50%',
              animation: `particle-explode ${particle.duration}s ease-out ${particle.delay}s forwards`,
              boxShadow: `0 0 ${particle.size}px ${particle.color1}`
            }}
          />
        ))}
      </>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-b from-purple-900 via-purple-800 to-black p-4 relative overflow-hidden">
      {/* ফায়ারওয়ার্কস ব্যাকগ্রাউন্ড */}
      {showFireworks && <Fireworks />}

      {/* ভাসমান ইমোজি */}
      {floatingEmojis.map(emoji => (
        <div
          key={emoji.id}
          className="absolute pointer-events-none"
          style={{
            left: `${emoji.x}%`,
            top: `${emoji.y}%`,
            fontSize: `${emoji.size}px`,
            transform: `rotate(${emoji.rotation}deg)`,
            animation: `float-up ${emoji.speed + 3}s ease-in ${emoji.delay}s infinite`,
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))'
          }}
        >
          {emoji.emoji}
        </div>
      ))}

      {/* অডিও কন্ট্রোল */}
      <div className="absolute top-4 right-4 z-50">
        {/* <button
          onClick={toggleAudio}
          className="bg-linear-to-r from-pink-500 to-purple-600 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform disabled:cursor-not-allowed"
        >
          {audioPlaying ? '🔇' : '🎵'}
        </button> */}
        <audio ref={audioRef} loop>
          <source src={AudioFile} type="audio/mpeg" />
        </audio>
        <audio ref={celebrationSoundRef}>
          <source src="https://assets.mixkit.co/sfx/preview/mixkit-party-horn-sound-2927.mp3" type="audio/mpeg" />
        </audio>
      </div>

      <div className="mb-8 text-center z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 animate-pulse">
          Happy Birthday! 🎂
        </h1>
        <p className="text-xl text-purple-200">Click the candle to blow it out and start celebration!</p>
        
        {isCandleBlown && (
          <div className="mt-4 animate-bounce">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-linear-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-full">
              <span className="text-2xl">🎉</span>
              <span className="text-white font-bold">Celebration Time!</span>
              <span className="text-2xl">🎊</span>
            </div>
          </div>
        )}
      </div>

      {/* Birthday Cake Container */}
      <div className="relative w-80 h-96 z-10">
        {/* Cake Base */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-40">
          {/* Cake Layer 3 (Bottom) */}
          <div className="absolute bottom-0 left-0 w-full h-16 bg-linear-to-r from-pink-300 via-pink-400 to-pink-300 rounded-t-lg shadow-lg"></div>
          
          {/* Cake Layer 2 (Middle) */}
          <div className="absolute bottom-16 left-2 w-60 h-14 bg-linear-to-r from-purple-300 via-purple-400 to-purple-300 rounded-t-lg shadow-lg"></div>
          
          {/* Cake Layer 1 (Top) */}
          <div className="absolute bottom-28 left-4 w-56 h-12 bg-linear-to-r from-blue-300 via-blue-400 to-blue-300 rounded-t-lg shadow-lg"></div>
          
          {/* Cake Topping - Cream */}
          <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 w-48 h-4 bg-white rounded-full opacity-90"></div>
          
          {/* Cake Topping - Drips */}
          <div className="absolute bottom-40 left-8 w-3 h-6 bg-white rounded-b-full"></div>
          <div className="absolute bottom-40 right-8 w-3 h-6 bg-white rounded-b-full"></div>
          <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 w-3 h-8 bg-white rounded-b-full"></div>
          
          {/* Sprinkles */}
          <div className="absolute bottom-44 left-12 w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-44 right-16 w-2 h-2 bg-red-400 rounded-full"></div>
          <div className="absolute bottom-44 left-1/2 w-2 h-2 bg-green-400 rounded-full"></div>
          <div className="absolute bottom-44 left-20 w-2 h-2 bg-blue-400 rounded-full"></div>
          <div className="absolute bottom-44 right-24 w-2 h-2 bg-pink-400 rounded-full"></div>
          
          {/* আইসক্রিম টপিং */}
          <div className="absolute bottom-36 left-1/4 transform -translate-x-1/2">
            <div className="w-8 h-12 bg-linear-to-b from-pink-200 to-pink-300 rounded-full"></div>
            <div className="w-6 h-4 bg-linear-to-b from-yellow-200 to-yellow-300 rounded-full -mt-1 ml-1"></div>
          </div>
          
          <div className="absolute bottom-36 right-1/4 transform translate-x-1/2">
            <div className="w-8 h-12 bg-linear-to-b from-blue-200 to-blue-300 rounded-full"></div>
            <div className="w-6 h-4 bg-linear-to-b from-green-200 to-green-300 rounded-full -mt-1 mr-1"></div>
          </div>
        </div>

        {/* Candle */}
        <div 
          className="absolute top-32 left-1/2 transform -translate-x-1/2 cursor-pointer hover:scale-105 transition-transform"
          onClick={blowCandle}
        >
          {/* Candle Stick */}
          <div className="relative w-4 h-24 mx-auto">
            {/* Candle Body */}
            <div className="absolute inset-0 bg-linear-to-b from-yellow-100 via-yellow-200 to-yellow-100 rounded-t-lg"></div>
            
            {/* Candle Stripes */}
            <div className="absolute top-4 left-0 w-full h-1 bg-red-400"></div>
            <div className="absolute top-12 left-0 w-full h-1 bg-red-400"></div>
            <div className="absolute top-20 left-0 w-full h-1 bg-red-400"></div>
            
            {/* Candle Tip (Melted wax) */}
            <div className="absolute -top-2 left-0 w-6 h-4 bg-yellow-300 rounded-full transform -translate-x-1"></div>
            <div className="absolute -top-1 right-0 w-5 h-3 bg-yellow-300 rounded-full"></div>
            
            {/* Candle Flame */}
            {!isCandleBlown ? (
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                {/* Flame Core */}
                <div className="flame-core"></div>
                
                {/* Main Flame */}
                <div className="flame-main"></div>
                
                {/* Flame Glow Effect */}
                <div className="flame-glow"></div>
                
                {/* Sparks */}
                <div className="spark spark-1"></div>
                <div className="spark spark-2"></div>
                <div className="spark spark-3"></div>
              </div>
            ) : (
              /* Smoke after blowing */
              <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
                <div className="smoke smoke-1"></div>
                <div className="smoke smoke-2"></div>
                <div className="smoke smoke-3"></div>
                <div className="text-white text-xs mt-2 text-center animate-pulse">🎉 Blown! 🎉</div>
              </div>
            )}
          </div>
        </div>

        {/* Cake Plate */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-72 h-6 bg-linear-to-r from-gray-300 via-gray-400 to-gray-300 rounded-full shadow-xl"></div>
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-76 h-2 bg-linear-to-r from-gray-400 via-gray-500 to-gray-400 rounded-full"></div>
      </div>

      {/* Controls */}
      <div className="mt-12 space-x-4 space-y-4 md:space-y-0 flex flex-col md:flex-row z-10">
        <button
          onClick={relightCandle}
          className="px-6 py-3 bg-linear-to-r from-blue-500 to-cyan-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center space-x-2 cursor-pointer"
        >
          <span className="text-xl">🔥</span>
          <span>Relight Candle</span>
        </button>
        <button
          onClick={blowCandle}
          disabled={isCandleBlown}
          className={`px-6 py-3 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center space-x-2 cursor-pointer ${
            isCandleBlown 
              ? 'bg-linear-to-r from-gray-500 to-gray-600 cursor-not-allowed' 
              : 'bg-linear-to-r from-red-500 to-pink-600'
          }`}
        >
          <span className="text-xl">💨</span>
          <span>{isCandleBlown ? 'Candle Blown!' : 'Blow Candle'}</span>
        </button>
        <button
          onClick={startCelebration}
          className="px-6 py-3 bg-linear-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-full hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center space-x-2 cursor-pointer"
        >
          <span className="text-xl">🎆</span>
          <span>Start Fireworks</span>
        </button>
      </div>

      {/* Instructions */}
      <div className="mt-8 text-center text-white/80 z-10">
        <p className="text-lg">✨ Click the candle flame to blow it out and start the celebration!</p>
        <p className="text-sm mt-2">Fireworks, floating emojis, and celebration sounds will play</p>
        
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {['🎂', '🎁', '🎈', '🎊', '🎉', '✨', '🌟', '🎆'].map((emoji, index) => (
            <span key={index} className="text-2xl animate-bounce" style={{animationDelay: `${index * 0.1}s`}}>
              {emoji}
            </span>
          ))}
        </div>
      </div>

      {/* Celebration Info */}
      {showFireworks && (
        <div className="mt-6 p-4 bg-linear-to-r from-pink-500/20 to-purple-500/20 rounded-2xl backdrop-blur-sm z-10 animate-pulse">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-2xl">🥳</span>
            <span className="text-white font-bold">Celebration in Progress!</span>
            <span className="text-2xl">🎊</span>
          </div>
          <p className="text-sm text-center text-gray-200 mt-1">Enjoy the fireworks and floating emojis!</p>
        </div>
      )}

      {/* CSS এনিমেশন */}
      <style jsx>{`
        @keyframes particle-explode {
          0% {
            opacity: 1;
            transform: scale(0.5) translate(0, 0);
          }
          100% {
            opacity: 0;
            transform: scale(1.5) translate(var(--tx, 0), var(--ty, 0));
          }
        }
        
        @keyframes float-up {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-bounce {
          animation: bounce 1s infinite;
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        .backdrop-blur-sm {
          backdrop-filter: blur(8px);
        }
      `}</style>
    </div>
  );
};

export default EnhancedBirthdayCake;