"use client";
import React, { useState, useEffect } from "react";

export default function TransitionalText({
  TEXTS,
  className,
}: {
  TEXTS: string[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayedText, setDisplayedText] = useState(TEXTS[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsAnimating(true);
      
      // After the fade-out animation completes, change the text
      setTimeout(() => {
        const nextIndex = (index + 1) % TEXTS.length;
        setIndex(nextIndex);
        setDisplayedText(TEXTS[nextIndex]);
        setIsAnimating(false);
      }, 500); // Half of the animation duration
      
    }, 3000); // every 3 seconds
    
    return () => clearInterval(intervalId);
  }, [index, TEXTS]);

  return (
    <span className={className}>
      <span 
        className={`transition-opacity duration-1000 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
        style={{ 
          display: 'inline-block',
          transform: isAnimating ? 'translateY(10px)' : 'translateY(0)',
          transition: 'transform 1s ease, opacity 1s ease'
        }}
      >
        {displayedText}
      </span>
    </span>
  );
}