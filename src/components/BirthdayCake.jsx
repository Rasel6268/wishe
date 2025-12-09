import React, { useState } from 'react';
import '../../src/Cake.css'

const BirthdayCake = () => {
  const [isCandleBlown, setIsCandleBlown] = useState(false);

  const blowCandle = () => {
    if (!isCandleBlown) {
      setIsCandleBlown(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-black p-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Happy Birthday! 🎂</h1>
        <p className="text-xl text-purple-200">Click the candle to blow it out</p>
      </div>

      {/* Birthday Cake Container */}
      <div className="relative w-80 h-96">
        
        {/* Cake Base */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-40">
          {/* Cake Layer 3 (Bottom) */}
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-r from-pink-300 via-pink-400 to-pink-300 rounded-t-lg shadow-lg"></div>
          
          {/* Cake Layer 2 (Middle) */}
          <div className="absolute bottom-16 left-2 w-60 h-14 bg-gradient-to-r from-purple-300 via-purple-400 to-purple-300 rounded-t-lg shadow-lg"></div>
          
          {/* Cake Layer 1 (Top) */}
          <div className="absolute bottom-28 left-4 w-56 h-12 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-300 rounded-t-lg shadow-lg"></div>
          
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
        </div>

        {/* Candle */}
        <div 
          className="absolute top-32 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={blowCandle}
        >
          {/* Candle Stick */}
          <div className="relative w-4 h-24 mx-auto">
            {/* Candle Body */}
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-100 via-yellow-200 to-yellow-100 rounded-t-lg"></div>
            
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
                <div className="text-white text-xs mt-2 text-center">Blown! 🎉</div>
              </div>
            )}
          </div>
        </div>

        {/* Cake Plate */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-72 h-6 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 rounded-full shadow-xl"></div>
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-76 h-2 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-400 rounded-full"></div>
      </div>

      {/* Controls */}
      <div className="mt-12 space-x-4">
        <button
          onClick={() => setIsCandleBlown(false)}
          className="px-6 py-3 bg-linear-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          🔥 Relight Candle
        </button>
        <button
          onClick={blowCandle}
          className="px-6 py-3 bg-linear-to-r from-red-500 to-pink-600 text-white font-semibold rounded-full hover:from-red-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          💨 Blow Candle
        </button>
      </div>

      {/* Instructions */}
      <div className="mt-8 text-center text-white/80">
        <p className="text-lg">✨ Click the candle flame to blow it out!</p>
        <p className="text-sm mt-2">The fire has realistic flickering animation</p>
      </div>
    </div>
  );
};

export default BirthdayCake;