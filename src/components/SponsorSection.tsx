import { motion } from 'motion/react';

const SPONSORS = {
  title: { name: 'Monster Energy', logo: 'https://images.unsplash.com/photo-1605152276897-4f618f831968?auto=format&fit=crop&q=80&w=400' },
  platinum: [
    { name: 'Nvidia', logo: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=200' },
    { name: 'Red Bull', logo: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&q=80&w=200' }
  ],
  partners: ['Pepsi', 'BookMyShow', 'Uber', 'CSJMU Alumni', 'Radio Mirchi']
};

export const SponsorSection = () => {
  return (
    <section className="py-24 px-4 border-t border-white/10">
      <div className="container mx-auto">
        <h2 className="text-xs font-black text-gray-500 uppercase tracking-[0.5em] text-center mb-16">Supported by Giants</h2>
        
        {/* Title Sponsor */}
        <div className="flex flex-col items-center mb-20 text-center">
          <p className="text-orange-500 font-bold uppercase tracking-widest text-xs mb-8">Title Sponsor</p>
          <div className="w-64 h-32 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center p-8 grayscale hover:grayscale-0 transition-all cursor-pointer">
            <span className="text-white font-black text-4xl italic">{SPONSORS.title.name}</span>
          </div>
        </div>

        {/* Platinum/Gold */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-20">
          {SPONSORS.platinum.map((s, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8 flex items-center justify-center grayscale hover:grayscale-0 transition-all">
              <span className="text-white/60 font-bold text-xl uppercase tracking-widest">{s.name}</span>
            </div>
          ))}
        </div>

        {/* Partner Marquee */}
        <div className="overflow-hidden relative w-full pt-10">
          <motion.div 
            className="flex gap-20 whitespace-nowrap"
            animate={{ x: [0, -1000] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {[...SPONSORS.partners, ...SPONSORS.partners].map((p, i) => (
              <span key={i} className="text-3xl font-black text-white/20 uppercase italic tracking-tighter">{p}</span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
