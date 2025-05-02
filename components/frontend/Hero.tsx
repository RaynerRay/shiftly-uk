import React from "react";
import { HeartPulse, Users, Stethoscope } from "lucide-react";
import Image from "next/image";
import TransitionalText from "./TransitionalText";
import SearchBar from "./SearchBar";

const Hero = () => {
  const TEXTS = ["Nurses", "Carers", "Social Workers"];

  return (
    <section
      className="bg-gradient-to-br from-sky-50 to-sky-100 text-gray-800 min-h-screen"
      aria-labelledby="shiftly-hero-heading"
    >
      <div className="max-w-7xl mx-auto px-4 py-2 md:py-12">
        <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12">
          {/* Text Content */}
          <div className="md:w-1/2 text-center md:text-left">
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center mb-4">
                <div className="h-1 w-10 bg-orange-500 rounded-full mr-3"></div>
                <p className="text-sky-600 text-sm font-semibold tracking-wider uppercase">
                  Healthcare Professionals
                </p>
              </div>

              <h1
                id="shiftly-hero-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight md:mb-6 mb-2"
              >
                <span className="flex flex-wrap md:flex-row items-center justify-center md:justify-start">
                  <span className="text-sky-600 md:mr-2">Find</span>
                  <TransitionalText className="text-orange-500 mx-2" TEXTS={TEXTS} />
                </span>
                <span className="md:block hidden text-sky-600 mt-2">across the UK</span>
              </h1>

              <p className="text-sm text-sky-800 md:text-lg md:mb-8 mb-2">
              Shiftly connects qualified, vetted, UK-based healthcare workers with private clients, care homes, clinics, the NHS, and local council healthcare services.
              Find extra shifts or hire trusted  staff easily.
              </p>

              {/* Feature Icons */}
              <ul className="flex justify-center md:justify-start space-x-8 mb-8" aria-label="Key qualities">
                <li className="flex flex-col items-center">
                  <div className="bg-sky-100 p-3 rounded-full mb-2 shadow-md border border-sky-200">
                    <HeartPulse className="text-orange-500 md:w-6 md:h-6 w-5 h-5" />
                  </div>
                  <span className="text-sm text-sky-800 font-medium">Caring</span>
                </li>
                <li className="flex flex-col items-center">
                  <div className="bg-sky-100 p-3 rounded-full mb-2 shadow-md border border-sky-200">
                    <Users className="text-orange-500 md:w-6 md:h-6 w-5 h-5" />
                  </div>
                  <span className="text-sm text-sky-800 font-medium">Professional</span>
                </li>
                <li className="flex flex-col items-center">
                  <div className="bg-sky-100 p-3 rounded-full mb-2 shadow-md border border-sky-200">
                    <Stethoscope className="text-orange-500 md:w-6 md:h-6 w-5 h-5" />
                  </div>
                  <span className="text-sm text-sky-800 font-medium">Trusted</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Image Content */}
          <div className="md:w-1/2 relative">
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-sky-400 rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-orange-400 rounded-full opacity-20 blur-xl"></div>

              {/* Main Image */}
              <div className="rounded-2xl overflow-hidden shadow-2xl transform transition-transform hover:scale-102 relative z-10 border-4 border-white">
                <div className="relative aspect-w-1 aspect-h-1">
                  <Image
                    className="w-full h-full object-cover"
                    height={500}
                    width={500}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    src="/hero.jpg"
                    alt="UK healthcare professionals including nurses and carers working with patients"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-sky-900/20 to-transparent"></div>
                </div>
              </div>

              {/* Testimonial Badge */}
              <div className="absolute -bottom-5 -right-5 bg-white p-3 rounded-lg shadow-lg border-l-4 border-orange-500 z-20 max-w-xs">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center">
                      <HeartPulse className="w-6 h-6 text-orange-500" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sky-800 font-medium text-sm">5000+ professionals</p>
                    <p className="text-sky-600 text-xs">Ready to help you</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="mt-12">
          <SearchBar />
        </div>
      </div>
    </section>
  );
};

export default Hero;
