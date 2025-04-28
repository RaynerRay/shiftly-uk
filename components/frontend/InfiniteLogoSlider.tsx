"use client"
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

// Define the Logo type
interface Logo {
  id: number;
  name: string;
  imageUrl: string;
}

// Define the component props
interface InfiniteLogoSliderProps {
  logos: Logo[];
  speed?: number;
}

const InfiniteLogoSlider = ({ logos, speed = 30 }: InfiniteLogoSliderProps) => {
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const duplicatedLogos: Logo[] = [...logos, ...logos]; // Duplicate logos for seamless loop
  
  // Control animation with CSS variables
  useEffect(() => {
    if (!sliderRef.current) return;
    
    // Set CSS variable for animation speed
    sliderRef.current.style.setProperty('--animation-speed', `${speed}s`);
    
    // Toggle animation pause state based on hover
    sliderRef.current.style.animationPlayState = isPaused ? 'paused' : 'running';
  }, [isPaused, speed]);

  return (
    <div className="w-full overflow-hidden py-8 relative">
      <div
        ref={sliderRef}
        className="flex items-center transition-all ease-in-out duration-300"
        style={{
          animation: `scroll var(--animation-speed) linear infinite`,
          animationPlayState: isPaused ? 'paused' : 'running'
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {duplicatedLogos.map((logo, index) => (
          <div 
            key={`${logo.id}-${index}`}
            className="mx-8 flex-shrink-0 transition-transform duration-300 hover:scale-110 cursor-pointer"
            style={{ 
              opacity: isPaused ? 1 : 0.9,
              filter: isPaused ? 'none' : 'grayscale(20%)'
            }}
          >
            <div className="h-16 md:h-20 w-auto flex items-center justify-center">
              <Image
                src={logo.imageUrl}
                alt={logo.name}
                width={100}
                height={100}
                className="max-h-full max-w-full object-contain"
                style={{
                  transition: 'all 0.3s ease'
                }}
              />
            </div>
            {/* <p className="text-xs text-center mt-2 text-gray-600">{logo.name}</p> */}
          </div>
        ))}
      </div>
    
      {/* Add CSS animation keyframes */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default InfiniteLogoSlider;