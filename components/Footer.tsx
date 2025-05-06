'use client';
import React, { useEffect, useState } from 'react';
import {
  MapPin, Phone, Mail, Twitter, Facebook,
  Youtube, Linkedin, ArrowUp
} from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // We are now safely in the browser
    setIsClient(true);
  }, []);

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-sky-950 text-gray-300 py-16 px-4 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Get In Touch Section */}
        <div className="space-y-6">
          <h3 className="text-2xl text-white font-semibold">Get In Touch</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <span>Flat 55 Poole BH14 0HW, United Kingdom</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <span>+44 794 763 7714</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <span>+44 790 802 9287</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <span>info@shiftly.uk</span>
            </div>
          </div>
          <div className="flex space-x-4">
            {[
              { Icon: Twitter, href: '#' },
              { Icon: Facebook, href: '#' },
              { Icon: Youtube, href: '#' },
              { Icon: Linkedin, href: '#' }
            ].map(({ Icon, href }, index) => (
              <a
                key={index}
                href={href}
                className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:bg-blue-500 hover:border-blue-500 transition-colors duration-300"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="space-y-6">
          <h3 className="text-2xl text-white font-semibold">Quick Links</h3>
          <div className="grid grid-cols-2 gap-6">
            <Link href="/" className="text-blue-500 text-sm font-medium hover:text-blue-500 transition-colors">HOME</Link>
            <Link href="/about" className="text-gray-50 text-sm font-medium hover:text-blue-500 transition-colors">ABOUT</Link>
            <Link href="/services" className="text-gray-50 text-sm font-medium hover:text-blue-500 transition-colors">Services</Link>
            <Link href="/register" className="text-gray-50 text-sm font-medium hover:text-blue-500 transition-colors">JOIN</Link>
            <Link href="/articles" className="text-gray-50 text-sm font-medium hover:text-blue-500 transition-colors">ARTICLES</Link>
            <Link href="/contact" className="text-gray-50 text-sm font-medium hover:text-blue-500 transition-colors">CONTACT</Link>
           
          </div>
        </div>

        {/* Photo Gallery Section */}
        <div className="space-y-6">
          {/* <h3 className="text-2xl text-white font-semibold">Photo Gallery</h3>
          <div className="grid grid-cols-3 gap-2">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="aspect-square relative overflow-hidden rounded-lg">
                <img
                  src={`/api/placeholder/150/150`}
                  alt={`Gallery image ${index + 1}`}
                  className="object-cover w-full h-full hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div> */}
        </div>

        {/* Newsletter Section */}
        <div className="space-y-6">
          <h3 className="text-2xl text-white font-semibold">Join Shiftly</h3>
          <p>Connect With Clients</p>
          <div className="flex">
            {/* <input
              type="email"
              placeholder="Your email"
              className="flex-1 bg-white/10 px-4 py-2 rounded-l outline-none focus:ring-2 focus:ring-blue-500"
            /> */}
            <Link  href="/join/professionals" className="bg-blue-500 text-white px-6 py-2 rounded-r hover:bg-blue-500 transition-colors duration-300">
              Join 
              </Link>
             
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-16 pt-8 border-t border-gray-700">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p>
            © <a href="#" className="text-white hover:text-blue-500">Shiftly</a>, All Right Reserved. 
             {" "}Made by <Link href="https://www.linkedin.com/in/godfrey-rayner-96b81965/" target="_blank" className="text-blue-500 hover:text-blue-500"> {" "} {" "} Godfrey Rayner</Link>
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
          <Link href="/terms-and-conditions" className="text-gray-50 text-sm font-medium hover:text-blue-500 transition-colors">Terms & Conditions</Link>
            <Link href="/cookies" className="text-gray-50 text-sm font-medium hover:text-blue-500 transition-colors">Cookies</Link>
            <Link href="/privacy-policy" className="text-gray-50 text-sm font-medium hover:text-blue-500 transition-colors">Privacy Policy</Link>
           
          </div>
        </div>
      </div>

     {/* Scroll to Top Button */}
     {isClient && (
        <button
          onClick={scrollToTop}
          className="absolute right-6 bottom-6 bg-blue-500 p-3 rounded-full hover:bg-blue-500 transition-colors duration-300"
        >
          <ArrowUp className="w-6 h-6 text-white" />
        </button>
      )}
    </footer>
  );
};

export default Footer;