import { motion } from 'motion/react';
import { ARTISTS } from '@/src/constants';
import { Instagram, Music, Twitter } from 'lucide-react';

export const ArtistSection = () => {
  return (
    <section id="lineup" className="py-24 px-4 container mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-4">
          Stellar <span className="text-orange-500">Lineup</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-purple-500 mx-auto" />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {ARTISTS.map((artist, index) => (
          <motion.div
            key={artist.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative h-[450px] overflow-hidden rounded-2xl border border-white/10"
          >
            <img 
              src={artist.image} 
              alt={artist.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent group-hover:via-black/40 transition-all" />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform">
              <p className="text-orange-500 text-xs font-black uppercase tracking-[0.2em] mb-1">{artist.role}</p>
              <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none mb-4">{artist.name}</h3>
              
              <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                {artist.socials.instagram && (
                  <a href={artist.socials.instagram} className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors">
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                {artist.socials.twitter && (
                  <a href={artist.socials.twitter} className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors">
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
                {artist.socials.spotify && (
                  <a href={artist.socials.spotify} className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors">
                    <Music className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
