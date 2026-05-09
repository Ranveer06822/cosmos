/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Rocket, Menu, X, User as UserIcon, LogOut, Ticket } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { auth, signInWithGoogle } from '../lib/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']
  );
  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(12px)']
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setShowUserMenu(false);
    } catch (error) {
      console.error(error);
    }
  };

  const navLinks = [
    { name: 'Lineup', href: '#lineup' },
    { name: 'Schedule', href: '#schedule' },
    { name: 'Tickets', href: '#tickets' },
    { name: 'Attractions', href: '#attractions' },
  ];

  return (
    <motion.nav 
      style={{ backgroundColor, backdropFilter: backdropBlur }}
      className="fixed top-0 inset-x-0 z-50 py-4 px-6 transition-all duration-300 border-b border-white/5"
    >
      <div className="container mx-auto flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white transform group-hover:rotate-12 transition-transform">
            <Rocket className="w-6 h-6" />
          </div>
          <span className="text-2xl font-black text-white italic tracking-tighter uppercase">Cosmos</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-gray-400 hover:text-white font-bold text-xs uppercase tracking-widest transition-colors"
            >
              {link.name}
            </a>
          ))}
          
          <div className="h-6 w-px bg-white/10 mx-2" />

          {user ? (
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 p-1 pr-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all"
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || 'User'} className="w-8 h-8 rounded-full" />
                ) : (
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <UserIcon className="w-4 h-4 text-white" />
                  </div>
                )}
                <span className="text-xs font-black text-white uppercase tracking-wider">{user.displayName?.split(' ')[0]}</span>
              </button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-4 w-48 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-2"
                  >
                    <button 
                      onClick={() => { setShowUserMenu(false); window.location.hash = '#tickets'; }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                    >
                      <Ticket className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-widest">My Missions</span>
                    </button>
                    <button 
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-500 hover:bg-red-500/5 rounded-xl transition-all mt-1"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-widest">Abort Session</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button 
              onClick={handleSignIn}
              className="bg-white text-black px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all transform active:scale-95"
            >
              Sign In
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full inset-x-0 bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-6 overflow-hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white font-bold text-lg uppercase tracking-widest border-b border-white/5 pb-2"
              >
                {link.name}
              </a>
            ))}
            
            {user ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl">
                   <img src={user.photoURL || ''} className="w-12 h-12 rounded-full" />
                   <div className="flex flex-col">
                     <span className="font-black uppercase italic">{user.displayName}</span>
                     <span className="text-xs text-gray-400">{user.email}</span>
                   </div>
                </div>
                <button onClick={handleSignOut} className="w-full bg-red-500/10 text-red-500 py-4 rounded-xl font-black uppercase tracking-widest text-sm">
                  Log Out
                </button>
              </div>
            ) : (
              <button onClick={handleSignIn} className="w-full bg-orange-500 text-white py-4 rounded-xl font-black uppercase tracking-widest">
                Sign In Now
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
