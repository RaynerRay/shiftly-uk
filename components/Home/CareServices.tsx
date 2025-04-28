import React from "react";
import { ChevronRight, Heart, Users, Home, BookOpen, Star } from "lucide-react";

const CareServices = () => {
  return (
    <div className="w-full bg-gradient-to-br from-sky-50 to-sky-100 py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <div className="h-1 w-12 bg-orange-500 rounded-full mr-3"></div>
            <Star className="text-orange-500 h-6 w-6" />
            <div className="h-1 w-12 bg-orange-500 rounded-full ml-3"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-sky-600 mb-6">
            Care services and
            <br /> staffing solutions
          </h1>
          <p className="text-sky-700 max-w-4xl mx-auto text-lg">
            At the heart of what we do is a commitment to people. We partner
            with care providers by supplying experienced carers, nurses, and
            social workers who enhance and uphold the quality of care in every
            setting. We also offer home care
            services&mdash;empowering individuals to live with dignity,
            independence, and comfort in their own homes. Whether in a care
            facility or at home, our focus remains the same: dependable,
            compassionate care designed around each person&rsquo;s unique needs.
          </p>
        </div>

        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {/* Card 1 - Why Choose Shiftly? */}
  <div className="bg-sky-900 rounded-2xl overflow-hidden shadow-xl transform transition-all hover:scale-105 border-t-4 border-orange-500">
    <div className="p-8">
      <div className="flex items-center mb-4">
        <Users className="text-sky-300 mr-3 h-6 w-6" />
        <h2 className="text-3xl font-bold text-sky-300">Why Choose Shiftly?</h2>
      </div>
      <h3 className="text-2xl font-semibold text-white mb-6">
        Simplifying Healthcare Staffing
      </h3>
      <ul className="space-y-4 text-sky-100 mb-8">
        <li>✅ Verified professionals rigorously vetted for quality</li>
        <li>⚡ Instant connections between shifts and workers</li>
        <li>🛠️ A streamlined platform built for speed and ease</li>
      </ul>
      <a
        href="#"
        className="inline-flex items-center text-orange-400 hover:text-orange-300 transition-colors font-medium"
      >
        Find out more <ChevronRight className="ml-1 h-5 w-5" />
      </a>
    </div>
  </div>

  {/* Card 2 - How It Works */}
  <div className="bg-white rounded-2xl overflow-hidden shadow-xl transform transition-all hover:scale-105 relative">
    <div className="absolute top-0 right-0 bg-orange-500 text-white py-1 px-4 rounded-bl-lg text-sm font-medium">
      Quick Start
    </div>
    <div className="p-8">
      <div className="flex items-center mb-4">
        <Home className="text-sky-500 mr-3 h-6 w-6" />
        <h2 className="text-3xl font-bold text-sky-500">How It Works</h2>
      </div>
      <p className="text-sky-700 mb-6">
        Getting started on Shiftly is fast and effortless:
      </p>
      <ul className="space-y-2 mb-8">
        <li className="flex items-start">
          <span className="ml-3 text-sky-700">
            1. Create an account and complete your profile
          </span>
        </li>
        <li className="flex items-start">
          <span className="ml-3 text-sky-700">
            2. Providers search for professionals
          </span>
        </li>
        <li className="flex items-start">
          <span className="ml-3 text-sky-700">
            3. Professionals can accept shifts matching their availability
          </span>
        </li>
      </ul>
      <a
        href="#"
        className="inline-flex items-center text-sky-500 hover:text-sky-600 bg-orange-100 py-2 px-4 rounded-lg transition-colors font-medium"
      >
        Get Started <ChevronRight className="ml-1 h-5 w-5" />
      </a>
    </div>
  </div>

  {/* Card 3 - Our Commitment */}
  <div className="bg-sky-800 rounded-2xl overflow-hidden shadow-xl transform transition-all hover:scale-105 border-b-4 border-orange-500">
    <div className="p-8">
      <div className="flex items-center mb-4">
        <BookOpen className="text-sky-300 mr-3 h-6 w-6" />
        <h2 className="text-3xl font-bold text-sky-300">Our Commitment</h2>
      </div>
      <h3 className="text-2xl font-semibold text-white mb-6">
        Trust. Quality. Efficiency.
      </h3>
      <ul className="space-y-4 mb-8">
        <li className="flex items-start">
          <Heart className="h-6 w-6 text-orange-400 mr-3 flex-shrink-0 mt-1" />
          <span className="text-sky-100">
            Consistently provide verified, skilled professionals for every shift
          </span>
        </li>
        <li className="flex items-start">
          <Heart className="h-6 w-6 text-orange-400 mr-3 flex-shrink-0 mt-1" />
          <span className="text-sky-100">
            Save valuable time and resources through smart hiring tools
          </span>
        </li>
        <li className="flex items-start">
          <Heart className="h-6 w-6 text-orange-400 mr-3 flex-shrink-0 mt-1" />
          <span className="text-sky-100">
            Foster long-term trust between providers and professionals
          </span>
        </li>
      </ul>
      <a
        href="#"
        className="inline-flex items-center bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors font-medium"
      >
        Learn More <ChevronRight className="ml-1 h-5 w-5" />
      </a>
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default CareServices;
