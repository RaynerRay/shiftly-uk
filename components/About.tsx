"use client";

import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section className="flex flex-col space-y-12 mt-8 mb-10 ">
      {/* Main Intro Section */}
      <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
        {/* Image with blue corner design */}
        <div className="relative w-full md:w-1/2">
          <div className="absolute inset-0 w-full h-full -z-10 border-t-[60px] border-l-[60px] border-transparent border-t-blue-500" />
          <Image
            src="/images/3.jpg" // Replace with your actual image path
            alt="Shiftly"
            className="w-full h-full object-cover rounded-lg shadow-lg"
            height={500}
            width={500}
          />
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Welcome to Shiftly - Instant Staffing for UK Healthcare Providers
          </h2>
          <p className="text-gray-600">
            Shiftly revolutionises healthcare staffing in the UK, offering instant connections between healthcare providers and qualified professionals. Our platform ensures you find the right shifts or staff seamlessly, anytime.
          </p>
          
          {/* Bullet Points */}
          <ul className="space-y-2">
            <li className="flex items-center space-x-2 text-gray-700">
              <Check className="text-blue-500 w-5 h-5" />
              <span>Quick access to qualified healthcare professionals</span>
            </li>
            <li className="flex items-center space-x-2 text-gray-700">
              <Check className="text-blue-500 w-5 h-5" />
              <span>Real-time shift matching and scheduling</span>
            </li>
            <li className="flex items-center space-x-2 text-gray-700">
              <Check className="text-blue-500 w-5 h-5" />
              <span>Seamless experience for both providers and professionals</span>
            </li>
          </ul>

          {/* Button */}
          <Link href="/join/professionals">
          <button className="mt-4 px-6 py-3 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition">
            Join Our Network
          </button>
          </Link>
        </div>
      </div>

      {/* Why Choose Shiftly Section */}
      <div className="bg-gray-50 p-8 rounded-lg shadow ">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Why Choose Shiftly?</h3>
        <p className="text-gray-600 mb-4">
          Shiftly simplifies staffing challenges with cutting-edge technology. Here is why Shiftly is the go-to platform for healthcare staffing in the UK:
        </p>
        <ul className="space-y-3">
          <li className="flex items-center space-x-2 text-gray-700">
            <Check className="text-blue-500 w-5 h-5" />
            <span>Verified Professionals: Every candidate is rigorously vetted.</span>
          </li>
          <li className="flex items-center space-x-2 text-gray-700">
            <Check className="text-blue-500 w-5 h-5" />
            <span>Instant Connections: Fill shifts or find work in minutes.</span>
          </li>
          <li className="flex items-center space-x-2 text-gray-700">
            <Check className="text-blue-500 w-5 h-5" />
            <span>Streamlined Platform: Designed for ease and efficiency.</span>
          </li>
        </ul>
      </div>

      {/* How It Works Section */}
      <div className="bg-white p-8 rounded-lg shadow">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">How It Works</h3>
        <p className="text-gray-600 mb-4">
          Start using Shiftly today with just a few simple steps:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Create an account and set up your profile.</li>
          <li>Healthcare providers can browse available professionals.</li>
          <li>Professionals can accept shifts that match their availability and skills.</li>
        </ol>
      </div>

      {/* Our Commitment Section */}
      <div className="bg-gray-50 p-8 rounded-lg shadow ">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Commitment</h3>
        <p className="text-gray-600 mb-4">
          At Shiftly, we are dedicated to transforming healthcare staffing by:
        </p>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center space-x-2">
            <Check className="text-blue-500 w-5 h-5" />
            <span>Providing verified, skilled professionals for every shift</span>
          </li>
          <li className="flex items-center space-x-2">
            <Check className="text-blue-500 w-5 h-5" />
            <span>Streamlining the hiring process to save time and resources</span>
          </li>
          <li className="flex items-center space-x-2">
            <Check className="text-blue-500 w-5 h-5" />
            <span>Fostering trust and reliability in healthcare staffing</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
