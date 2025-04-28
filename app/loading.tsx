"use client";
import React from "react";
import dynamic from "next/dynamic";

// Import the animation data directly
import animationData from "../public/animations/heartbeat.json";

// Dynamically import Lottie with SSR disabled
const Lottie = dynamic(() => import("lottie-react"), { 
  ssr: false,
  loading: () => <div className="w-[400px] h-[300px] bg-gray-100" /> // Optional loading placeholder
});

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-[400px]">
        <Lottie animationData={animationData} loop={true} />
      </div>
    </div>
  );
}