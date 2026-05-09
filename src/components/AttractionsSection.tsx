import { motion } from 'motion/react';
import { ZONES } from '@/src/constants';
import { Sparkles, Trophy, Utensils } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const AttractionsSection = () => {
  return (
    <section id="attractions" className="py-24 px-4 container mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-4">
          Discovery <span className="text-orange-500">Zones</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 mx-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {ZONES.map((zone, index) => (
          <motion.div
            key={zone.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="group relative h-[600px] rounded-3xl overflow-hidden border border-white/10"
          >
            <img 
              src={zone.image} 
              alt={zone.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            
            <div className="absolute inset-x-0 bottom-0 p-10 transform translate-y-6 group-hover:translate-y-0 transition-transform">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-xl">
                  {zone.id === 'gaming' ? <Trophy className="w-6 h-6" /> : <Utensils className="w-6 h-6" />}
                </div>
                <h3 className="text-4xl font-black text-white uppercase tracking-tighter">{zone.name}</h3>
              </div>
              
              <p className="text-gray-300 text-lg mb-8 max-w-md">{zone.description}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {zone.highlights.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl border border-white/5">
                    <Sparkles className="w-4 h-4 text-orange-400" />
                    <span className="text-white font-bold text-sm uppercase tracking-wide">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
