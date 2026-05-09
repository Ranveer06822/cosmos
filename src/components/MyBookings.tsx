/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Ticket, Clock, CheckCircle2, XCircle, ChevronRight } from 'lucide-react';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';

export const MyBookings = () => {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
                        <button className="mt-4 px-6 py-2 bg-green-500 text-black rounded-xl font-black uppercase tracking-tighter text-[10px] hover:scale-105 transition-transform flex items-center gap-2">
                          View Digital Ticket <ChevronRight className="w-3 h-3" />
                        </button>
                      )}
                      
                      {booking.status === 'pending' && (
                        <p className="text-[10px] text-orange-400 italic">Please complete payment via link sent to your phone <span className="not-italic font-bold">({booking.phone})</span></p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};
