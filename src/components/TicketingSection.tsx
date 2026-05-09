import { motion } from 'motion/react';
import { TICKET_TIERS } from '@/src/constants';
import { Check, Zap } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useState } from 'react';
import { BookingModal } from './BookingModal';
import { TicketTier } from '../types';

export const TicketingSection = () => {
  const [selectedTicket, setSelectedTicket] = useState<TicketTier | null>(null);

  return (
    <section id="tickets" className="py-24 px-4 container mx-auto">
      {/* Booking Modal */}
      <BookingModal 
        ticket={selectedTicket} 
        onClose={() => setSelectedTicket(null)} 
      />
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-4">
          Reserve Your <span className="text-blue-500">Space</span>
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto">Choose your level of immersion. Student discounts available on-campus with ID.</p>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-6" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {TICKET_TIERS.map((tier, index) => (
          <motion.div
            key={tier.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "relative flex flex-col p-8 rounded-3xl border border-white/10 backdrop-blur-md overflow-hidden",
              tier.isPopular ? "bg-white/10 ring-2 ring-blue-500/50 scale-105 z-10" : "bg-black/40"
            )}
          >
            {tier.isPopular && (
              <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-bl-xl">
                Most Popular
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">{tier.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black text-white leading-none">₹{tier.price}</span>
                <span className="text-gray-500 text-sm">/ person</span>
              </div>
              {tier.limit && (
                <p className="text-orange-500 text-xs font-bold mt-2 flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-orange-500" /> Only {tier.limit} spots left!
                </p>
              )}
            </div>

            <ul className="space-y-4 mb-10 flex-grow">
              {tier.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <button 
              onClick={() => setSelectedTicket(tier)}
              className={cn(
                "w-full py-4 rounded-xl font-black uppercase tracking-widest text-sm transition-all hover:scale-[1.02] active:scale-95",
                tier.isPopular 
                  ? "bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]" 
                  : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
              )}
            >
              Select Tier
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
