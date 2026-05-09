/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Shield, Check, X, RefreshCw } from 'lucide-react';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, onSnapshot, orderBy, doc, updateDoc, serverTimestamp } from 'firebase/firestore';

export const AdminPanel = () => {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const isAdmin = user?.email === 'erranveerranjan@gmail.com';

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!isAdmin) return;

    setLoading(true);
    const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));

    const unsubscribeBookings = onSnapshot(q, (snapshot) => {
      const bookingsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBookings(bookingsData);
      setLoading(false);
    }, (error) => {
      console.error("Admin real-time error:", error);
      setLoading(false);
    });

    return () => unsubscribeBookings();
  }, [isAdmin]);

  const updateStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const bookingRef = doc(db, 'bookings', id);
      await updateDoc(bookingRef, {
        status: newStatus,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `bookings/${id}`);
      alert('Failed to update status. Check permissions.');
    } finally {
      setUpdatingId(null);
    }
  };

  if (!isAdmin) return null;

  return (
    <section className="py-24 px-4 bg-zinc-950 border-y border-white/5">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-500/20 rounded-2xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Command Center</h2>
              <p className="text-red-500/60 text-xs font-bold uppercase tracking-widest">Admin Access Only</p>
            </div>
          </div>
          
          <div className="text-right hidden md:block">
            <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest">Active Admin</p>
            <p className="text-white font-mono text-xs">{user?.email}</p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
             <RefreshCw className="w-8 h-8 text-red-500 animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="p-6 text-[10px] font-black uppercase text-gray-500 tracking-widest">Booking ID</th>
                  <th className="p-6 text-[10px] font-black uppercase text-gray-500 tracking-widest">Customer</th>
                  <th className="p-6 text-[10px] font-black uppercase text-gray-500 tracking-widest">Contact</th>
                  <th className="p-6 text-[10px] font-black uppercase text-gray-500 tracking-widest">Tier</th>
                  <th className="p-6 text-[10px] font-black uppercase text-gray-500 tracking-widest">Status</th>
                  <th className="p-6 text-[10px] font-black uppercase text-gray-500 tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-6 font-mono text-[10px] text-gray-500">#{booking.id.slice(0, 8)}...</td>
                    <td className="p-6">
                      <p className="font-bold text-white text-sm">{booking.name}</p>
                      <p className="text-[10px] text-gray-500">{booking.userEmail}</p>
                    </td>
                    <td className="p-6 text-sm text-gray-300">{booking.phone}</td>
                    <td className="p-6">
                      <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-wider text-orange-500 border border-orange-500/20">
                        {booking.ticketTier}
                      </span>
                    </td>
                    <td className="p-6">
                      <span className={`text-[10px] font-black uppercase tracking-widest ${
                        booking.status === 'confirmed' ? 'text-green-500' : 
                        booking.status === 'pending' ? 'text-orange-500' : 'text-red-500'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="p-6">
                      <div className="flex gap-2">
                        <button 
                          disabled={updatingId === booking.id || booking.status === 'confirmed'}
                          onClick={() => updateStatus(booking.id, 'confirmed')}
                          className="p-2 bg-green-500/10 text-green-500 rounded-lg hover:bg-green-500 hover:text-black transition-all disabled:opacity-20"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button 
                          disabled={updatingId === booking.id || booking.status === 'rejected'}
                          onClick={() => updateStatus(booking.id, 'rejected')}
                          className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-black transition-all disabled:opacity-20"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {bookings.length === 0 && (
              <div className="p-12 text-center text-gray-500 italic uppercase text-xs tracking-widest">
                No transmissions found in the database.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
