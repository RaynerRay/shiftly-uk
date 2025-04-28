'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, Menu, X, Cross, LogIn } from 'lucide-react';
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
// import { PersonIcon } from '@radix-ui/react-icons';

const Navbar = ({ session }: { session: Session | null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = session?.user;
  const initials = getInitials(user?.name);
  const router = useRouter();

  async function handleLogout() {
    await signOut();
    router.push("/login");
  }

  return (
    <div className="w-full">
      {/* Top bar */}
      <div className="max-w-7xl mx-auto bg-gradient-to-r from-sky-500 to-sky-600">
        <div className="hidden md:flex w-full py-2 px-4 justify-between items-center border-b">
          <div className="flex items-center">
            <Mail className="w-4 h-4 mr-2 text-white" />
            <span className="text-gray-50 text-sm">info@shiftly.uk</span>
          </div>
          {/* <div className="flex gap-4">
            <Facebook className="w-4 h-4 text-gray-50 hover:text-blue-500 cursor-pointer" />
            <Twitter className="w-4 h-4 text-gray-50 hover:text-blue-500 cursor-pointer" />
            <Instagram className="w-4 h-4 text-gray-50 hover:text-blue-500 cursor-pointer" />
            <Linkedin className="w-4 h-4 text-gray-50 hover:text-blue-500 cursor-pointer" />
          </div> */}
        </div>
      </div>

      {/* Main navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="text-sky-900 text-3xl mr-2"><Cross /></div>
                <span className="text-xl  text-sky-900 font-bold">SHIFTLY</span>
              </Link>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-8 font-bold">
              <Link href="/" className="text-sky-950 hover:text-blue-500">Home</Link>
              <Link href="/about" className="text-sky-950 hover:text-blue-500">About</Link>
              <Link href="/howitworks" className="text-sky-950 hover:text-blue-500">How It Works</Link>
              <Link href="/join/professionals" className="text-sky-950 hover:text-blue-500">Join</Link>
              <Link href="/articles" className="text-sky-950 hover:text-blue-500">Articles</Link>
              <Link href="/contact" className="text-sky-950 hover:text-blue-500">Contact</Link>
            </div>

            {/* Right side - Phone and User Menu */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center">
                <Phone className="w-4 h-4 text-blue-500 mr-2" />
                <div>
                  <div className="text-xs text-gray-500">Phone:</div>
                  <div className="text-sm font-medium">+(44) 864 434 57</div>
                </div>
              </div>
              
              {session && session.user && user?.email ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild >
                    <Avatar className="cursor-pointer">
                      {user.image ? (
                        <AvatarImage src={user.image} alt={user.name || ''} />
                      ) : (
                        <AvatarFallback className='bg-gray-200'>{initials}</AvatarFallback>
                      )}
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel className="text-center">
                      {user.name}
                    </DropdownMenuLabel>
                    <DropdownMenuLabel className="text-center font-light text-sm">
                      {user.email}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/login" className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 flex items-center">
                  <LogIn className="mr-2 h-4 w-4" /> Login
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
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
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link href="/" className="block px-3 py-2 text-sky-950 hover:text-blue-500">Home</Link>
                <Link href="/about" className="block px-3 py-2 text-sky-950 hover:text-blue-500">About</Link>
                <Link href="/howitworks" className="block px-3 py-2 text-sky-950 hover:text-blue-500">How It Works</Link>
                <Link href="/join/professionals" className="block px-3 py-2 text-sky-950 hover:text-blue-500">Join</Link>
                <Link href="/articles" className="block px-3 py-2 text-sky-950 hover:text-blue-500">Articles</Link>
                <Link href="/contact" className="block px-3 py-2 text-sky-950 hover:text-blue-500">Contact</Link>
                
                <div className="px-3 py-2">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-blue-500 mr-2" />
                    <div>
                      <div className="text-xs text-gray-500">Hotline:</div>
                      <div className="text-sm font-medium">+(44) 864 434 57</div>
                    </div>
                  </div>
                  
                  {session && session.user && user?.email ? (
                    <div className="mt-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Avatar>
                          {user.image ? (
                            <AvatarImage src={user.image} alt={user.name || ''} />
                          ) : (
                            <AvatarFallback>{initials}</AvatarFallback>
                          )}
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                      <Link href="/dashboard" className="block w-full text-center bg-gray-100 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-200 mb-2">
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <Link href="/login" className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 flex items-center justify-center">
                      <LogIn className="mr-2 h-4 w-4" /> Login
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;