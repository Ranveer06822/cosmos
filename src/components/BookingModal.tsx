/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle2, LogIn } from 'lucide-react';
import { TicketTier } from '../types';
import { auth, db, signInWithGoogle, handleFirestoreError, OperationType } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface BookingModalProps {
  ticket: TicketTier | null;
  onClose: () => void;
}

export const BookingModal = ({ ticket, onClose }: BookingModalProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthLoading(false);
      if (currentUser && currentUser.displayName) {
        setFormData(prev => ({ ...prev, name: currentUser.displayName || '' }));
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      alert('Authentication failed. Please check your connection.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmitting(true);

    try {
      const bookingData = {
        userId: user.uid,
        userEmail: user.email,
        name: formData.name,
        phone: formData.phone,
        ticketTier: ticket?.name,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'bookings'), bookingData);
      setIsSuccess(true);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'bookings');
      alert('Transmission failed. Ensure your connection is stable.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!ticket && !isSuccess) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="p-8">
            {!isSuccess ? (
              <>
                <div className="mb-8">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Book Your Ticket</h3>
                  <p className="text-gray-400 text-sm italic">Reserve your spot for: <span className="text-orange-500 font-bold uppercase">{ticket?.name}</span></p>
                </div>

                {!user && !isAuthLoading ? (
                  <div className="space-y-6 text-center py-6">
                    <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                      <p className="text-gray-300 text-sm mb-6 leading-relaxed">Please sign in to proceed with your booking securely.</p>
                      <button 
                        onClick={handleSignIn}
                        className="w-full flex items-center justify-center gap-3 bg-white text-black py-4 rounded-xl font-bold hover:bg-gray-200 transition-all"
                      >
                        <LogIn className="w-5 h-5" /> Sign in with Google
                      </button>
                    </div>
                  </div>
                ) : isAuthLoading ? (
                  <div className="py-12 flex justify-center">
                    <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Operational Name</label>
                      <input 
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. John Doe"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Phone Transmission</label>
                      <input 
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 00000 00000"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-purple-500 transition-colors"
                      />
                    </div>

                    <button 
                      disabled={isSubmitting}
                      className="w-full bg-orange-500 text-white py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-orange-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Syncing...' : (
                        <>Initialize Booking <Send className="w-4 h-4" /></>
                      )}
                    </button>
                    
                    <p className="text-[10px] text-center text-gray-500 italic">Signed in as {user?.email}</p>
                  </form>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">Transmission Received!</h3>
                <p className="text-gray-400 mb-8 leading-relaxed">System admin has been notified. We will contact you shortly to confirm your booking and payment.</p>
                <button 
                  onClick={onClose}
                  className="px-8 py-3 bg-white/10 text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/20 transition-colors"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
