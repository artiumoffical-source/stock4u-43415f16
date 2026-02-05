import React, { useEffect, useState } from 'react';
import loaderCoins from '@/assets/loader-coins.png';

interface GlobalLoaderProps {
  isLoading: boolean;
}

export const GlobalLoader: React.FC<GlobalLoaderProps> = ({ isLoading }) => {
  const [shouldRender, setShouldRender] = useState(isLoading);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setShouldRender(false), 500);
      return () => clearTimeout(timer);
    }
    setShouldRender(true);
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#E0E7F5] flex flex-col items-center justify-center transition-opacity duration-500 ${
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* The Bouncing Coins */}
      <div className="relative flex flex-col items-center">
        <img
          src={loaderCoins}
          alt="Loading..."
          className="w-48 md:w-64 h-auto animate-[float_2s_ease-in-out_infinite] drop-shadow-lg"
        />
        
        {/* Shadow underneath that pulses */}
        <div className="w-32 h-4 bg-black/10 rounded-full blur-md mt-4 animate-[shadow-pulse_2s_ease-in-out_infinite]" />
      </div>

      {/* Loading Text */}
      <p className="mt-8 text-lg md:text-xl font-bold text-stock4u-dark-grey animate-pulse">
        מכינים את המתנה...
      </p>
    </div>
  );
};

export default GlobalLoader;
