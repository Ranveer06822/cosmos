/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Ticket, Clock, CheckCircle2, XCircle, ChevronRight, Download, QrCode, Rocket, X, CreditCard } from 'lucide-react';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';

export const MyBookings = () => {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewTicket, setViewTicket] = useState<any | null>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setBookings([]);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!user) return;

    setLoading(true);
    const q = query(
      collection(db, 'bookings'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribeBookings = onSnapshot(q, (snapshot) => {
      const bookingsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBookings(bookingsData);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'bookings');
      setLoading(false);
    });

    return () => unsubscribeBookings();
  }, [user]);

  if (!user) return null;

  return (
    <section className="py-24 px-4 container mx-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center">
            <Ticket className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">My Mission Log</h2>
            <p className="text-gray-400 text-sm">Your upcoming cosmic experiences</p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md">
            <Ticket className="w-16 h-16 text-gray-600 mx-auto mb-6 opacity-20" />
            <h3 className="text-xl font-bold text-gray-400 uppercase tracking-widest mb-2">No Clearances Found</h3>
            <p className="text-gray-500 mb-8 max-w-xs mx-auto">You haven't initialized any ticket transmissions yet. Go to the ticketing section to book your spot.</p>
            <a href="#tickets" className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-full font-bold uppercase tracking-widest text-[10px] transition-all">
              Initialize Mission
            </a>
          </div>
        ) : (
          <div className="grid gap-6">
            <AnimatePresence mode='popLayout'>
              {bookings.map((booking, idx) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-sm hover:border-purple-500/30 transition-all overflow-hidden"
                >
                  {/* Status Indicator */}
                  <div className="absolute top-0 right-0 p-1 px-4 text-[10px] font-black uppercase tracking-[0.2em] rounded-bl-2xl flex items-center gap-2">
                    {booking.status === 'pending' && (
                      <div className="flex items-center gap-2 text-orange-400">
                        <Clock className="w-3 h-3 animate-pulse" /> Pending Verification
                      </div>
                    )}
                    {booking.status === 'confirmed' && (
                      <div className="flex items-center gap-2 text-green-400">
                        <CheckCircle2 className="w-3 h-3" /> Mission Cleared
                      </div>
                    )}
                    {booking.status === 'rejected' && (
                      <div className="flex items-center gap-2 text-red-400">
                        <XCircle className="w-3 h-3" /> Aborted
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mt-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                         <span className="text-4xl font-black text-white italic uppercase tracking-tighter">{booking.ticketTier}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-gray-400 text-sm font-medium">Passenger: <span className="text-white">{booking.name}</span></p>
                        <p className="text-gray-400 text-[10px] font-mono opacity-50 underline decoration-purple-500/30">ID: {booking.id}</p>
                      </div>
                    </div>

                    <div className="w-full md:w-auto flex flex-col items-end gap-2">
                      <div className="text-right">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Initialized At</p>
                        <p className="text-xs font-bold text-gray-300">
                          {booking.createdAt?.toDate().toLocaleDateString('en-IN', { 
                            day: 'numeric', 
                            month: 'short', 
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      
                      {booking.status === 'confirmed' && (
                        <button 
                          onClick={() => setViewTicket(booking)}
                          className="mt-4 px-6 py-2 bg-green-500 text-black rounded-xl font-black uppercase tracking-tighter text-[10px] hover:scale-105 transition-transform flex items-center gap-2"
                        >
                          View Digital Ticket <ChevronRight className="w-3 h-3" />
                        </button>
                      )}
                      
                      {booking.status === 'pending' && (
                        <div className="flex flex-col items-end gap-2 mt-4">
                           {booking.paymentLink ? (
                             <a 
                               href={booking.paymentLink}
                               target="_blank"
                               rel="noopener noreferrer"
                               className="px-6 py-2 bg-orange-500 text-white rounded-xl font-black uppercase tracking-tighter text-[10px] hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_15px_rgba(249,115,22,0.4)]"
                             >
                               Complete Payment <CreditCard className="w-3 h-3" />
                             </a>
                           ) : (
                             <p className="text-[10px] text-orange-400 italic">Awaiting payment link from admin...</p>
                           )}
                           <p className="text-[10px] text-gray-500 italic">Tracking on phone: {booking.phone}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Ticket Modal */}
      <AnimatePresence>
        {viewTicket && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setViewTicket(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-sm bg-white text-black rounded-[2rem] overflow-hidden shadow-2xl"
            >
              <div className="bg-orange-500 p-8 text-black">
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-2">
                    <Rocket className="w-6 h-6" />
                    <span className="font-black uppercase italic text-xl">Cosmos</span>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Boarding Pass</p>
                    <p className="font-mono text-xs font-bold">#{viewTicket.id.slice(0, 8)}</p>
                  </div>
                </div>
                <h3 className="text-6xl font-black uppercase italic tracking-tighter leading-none mb-2">{viewTicket.ticketTier}</h3>
                <p className="text-sm font-bold uppercase tracking-widest opacity-80">Full Access Granted</p>
              </div>

              <div className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                   <div>
                     <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-1">Passenger</p>
                     <p className="font-bold uppercase text-sm truncate">{viewTicket.name}</p>
                   </div>
                   <div className="text-right">
                     <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-1">Sector</p>
                     <p className="font-bold uppercase text-sm italic">Galaxy Stage</p>
                   </div>
                </div>

                <div className="border-y border-dashed border-gray-200 py-6 flex flex-col items-center gap-4">
                   <div className="w-32 h-32 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100">
                     <QrCode className="w-24 h-24 text-black opacity-80" />
                   </div>
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Scan At Entry Point</p>
                </div>

                <button 
                  onClick={() => window.print()}
                  className="w-full py-4 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-orange-500 transition-colors"
                >
                  Download Pass <Download className="w-4 h-4" />
                </button>
              </div>
              
              <button 
                onClick={() => setViewTicket(null)}
                className="absolute top-4 right-4 p-2 bg-black/10 rounded-full hover:bg-black/20 transition-all"
              >
                <X className="w-4 h-4 text-black" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
