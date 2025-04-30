'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, Phone, Menu, X, LogIn, UserPlus, ChevronDown } from 'lucide-react';
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getInitials } from "@/utils/generateInitials";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Navbar = ({ session }: { session: Session | null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const user = session?.user;
  const initials = getInitials(user?.name);
  const router = useRouter();

  // Handle scroll effect for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  async function handleLogout() {
    await signOut();
    router.push("/login");
  }

  return (
    <>
      <div className="w-full fixed top-0 left-0 z-50">
      {/* Top bar */}
      <div className={`bg-gradient-to-r from-sky-600 to-blue-700 transition-all duration-300 ${scrolled ? 'opacity-95' : 'opacity-100'}`}>
        <div className="max-w-7xl mx-auto hidden md:flex w-full py-2 px-4 justify-between items-center">
          <div className="flex items-center">
            <Mail className="w-4 h-4 mr-2 text-white" />
            <span className="text-gray-50 text-sm">info@shiftly.uk</span>
            <div className="h-4 w-px bg-sky-400 mx-4" />
            <Phone className="w-4 h-4 mr-2 text-white" />
            <span className="text-gray-50 text-sm">+(44) 864 434 57</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/join/professionals" className="text-gray-50 text-sm hover:text-white transition-colors">
              Join as Professional
            </Link>
            <div className="h-4 w-px bg-sky-400" />
            <Link href="/help" className="text-gray-50 text-sm hover:text-white transition-colors">
              Help Center
            </Link>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav className={`bg-white transition-all duration-300 ${scrolled ? 'shadow-md py-2' : 'shadow-sm py-4'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center group">
                <div className="relative">
                  <div className="text-sky-800 text-3xl group-hover:text-blue-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                      <path d="M8 12h8" />
                      <path d="M12 8v8" />
                    </svg>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-600 rounded-full hidden group-hover:block" />
                </div>
                <span className="text-xl ml-2 text-sky-900 font-bold tracking-tight group-hover:text-blue-600 transition-colors">SHIFTLY</span>
              </Link>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-6 font-medium">
              <Link href="/" className="text-sky-950 hover:text-blue-600 transition-colors relative group py-2">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/about" className="text-sky-950 hover:text-blue-600 transition-colors relative group py-2">
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/howitworks" className="text-sky-950 hover:text-blue-600 transition-colors relative group py-2">
                How It Works
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/articles" className="text-sky-950 hover:text-blue-600 transition-colors relative group py-2">
                Articles
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/contact" className="text-sky-950 hover:text-blue-600 transition-colors relative group py-2">
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>

            {/* Right side - User Menu */}
            <div className="hidden md:flex items-center space-x-4">
              {session && session.user && user?.email ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors rounded-full pl-2 pr-4 py-1">
                      <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
                        {user.image ? (
                          <AvatarImage src={user.image} alt={user.name || ''} />
                        ) : (
                          <AvatarFallback className='bg-gradient-to-br from-blue-500 to-sky-500 text-white'>{initials}</AvatarFallback>
                        )}
                      </Avatar>
                      <span className="ml-2 font-medium text-gray-700">{user.name?.split(' ')[0]}</span>
                      <ChevronDown className="ml-1 w-4 h-4 text-gray-500" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 p-2">
                    <DropdownMenuLabel className="text-center border-b pb-2">
                      <p className="font-bold">{user.name}</p>
                      <p className="font-light text-sm text-gray-500">{user.email}</p>
                    </DropdownMenuLabel>
                    <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 rounded mt-2">
                      <Link href="/dashboard" className="flex items-center w-full py-1">
                        <span className="bg-blue-100 p-1 rounded mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><line x1="3" x2="21" y1="9" y2="9"></line><line x1="9" x2="9" y1="21" y2="9"></line></svg>
                        </span>
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 rounded">
                      <Link href="/profile" className="flex items-center w-full py-1">
                        <span className="bg-blue-100 p-1 rounded mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        </span>
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 rounded">
                      <Link href="/settings" className="flex items-center w-full py-1">
                        <span className="bg-blue-100 p-1 rounded mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        </span>
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer hover:bg-red-50 rounded text-red-600">
                      <div className="flex items-center py-1">
                        <span className="bg-red-100 p-1 rounded mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                        </span>
                        Logout
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link href="/login" className="bg-gray-100 text-sky-900 px-5 py-2 rounded-full hover:bg-gray-200 transition-colors flex items-center font-medium">
                    <LogIn className="mr-2 h-4 w-4" /> Login
                  </Link>
                  <Link href="/register" className="bg-gradient-to-r from-blue-600 to-sky-600 text-white px-5 py-2 rounded-full hover:from-blue-700 hover:to-sky-700 transition-colors flex items-center font-medium shadow-md hover:shadow-lg">
                    <UserPlus className="mr-2 h-4 w-4" /> Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-sky-900 hover:text-blue-600 focus:outline-none transition-colors"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

                      {/* Mobile menu */}
          {isOpen && (
            <div className="md:hidden bg-white rounded-lg shadow-lg mt-2 p-4 transition-all duration-300 border-t border-gray-100">
              <div className="space-y-2">
                <Link href="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sky-950 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors">
                  Home
                </Link>
                <Link href="/about" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sky-950 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors">
                  About
                </Link>
                <Link href="/howitworks" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sky-950 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors">
                  How It Works
                </Link>
                <Link href="/join/professionals" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sky-950 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors">
                  Join as Professional
                </Link>
                <Link href="/articles" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sky-950 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors">
                  Articles
                </Link>
                <Link href="/contact" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sky-950 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors">
                  Contact
                </Link>
                
                <div className="px-3 py-3 bg-gray-50 rounded-lg mt-2">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Phone className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <div className="text-xs text-gray-500">Call us:</div>
                      <div className="text-sm font-medium">+(44) 864 434 57</div>
                    </div>
                  </div>
                  
                  {session && session.user && user?.email ? (
                    <div className="mt-4 bg-white p-3 rounded-lg border">
                      <div className="flex items-center space-x-3 mb-3">
                        <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                          {user.image ? (
                            <AvatarImage src={user.image} alt={user.name || ''} />
                          ) : (
                            <AvatarFallback className='bg-gradient-to-br from-blue-500 to-sky-500 text-white'>{initials}</AvatarFallback>
                          )}
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-xs text-gray-500">{user.email}</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Link href="/dashboard" onClick={() => setIsOpen(false)} className="text-center bg-gray-100 text-gray-800 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors text-sm">
                          Dashboard
                        </Link>
                        <Link href="/profile" onClick={() => setIsOpen(false)} className="text-center bg-gray-100 text-gray-800 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors text-sm">
                          Profile
                        </Link>
                      </div>
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          handleLogout();
                        }}
                        className="w-full mt-2 bg-gradient-to-r from-blue-600 to-sky-600 text-white px-4 py-2 rounded-md hover:from-blue-700 hover:to-sky-700 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="mt-4 grid grid-cols-1 gap-2">
                      <Link href="/login" onClick={() => setIsOpen(false)} className="text-center bg-gray-100 text-sky-900 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center">
                        <LogIn className="mr-2 h-4 w-4" /> Login
                      </Link>
                      <Link href="/register" onClick={() => setIsOpen(false)} className="text-center bg-gradient-to-r from-blue-600 to-sky-600 text-white px-4 py-2 rounded-md hover:from-blue-700 hover:to-sky-700 transition-colors flex items-center justify-center">
                        <UserPlus className="mr-2 h-4 w-4" /> Sign Up
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
      
      </div>
      
      {/* Main page container with top margin to prevent content from being hidden under the navbar */}
      <div className="pt-16 md:pt-24">
        {/* This space intentionally left blank - it's just a spacer */}
      </div>
    </>
  );
};

export default Navbar;