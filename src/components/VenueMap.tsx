import { motion } from 'motion/react';
import { MapPin, Info, AlertTriangle } from 'lucide-react';

export const VenueMap = () => {
  return (
    <section id="map" className="py-24 px-4 bg-black/40 backdrop-blur-sm">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-8 leading-none">
              The Cosmic <span className="text-blue-500">Arena</span>
            </h2>
            <p className="text-gray-400 mb-8 text-lg">Navigate the festival grounds with ease. Our venue is optimized for sound isolation between zones and high-speed network for the Gaming Arena.</p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <MapPin className="w-6 h-6 text-orange-500 shrink-0" />
                <div>
                  <h4 className="text-white font-bold uppercase tracking-wide">Nexus Stage (Jasmin Live)</h4>
                  <p className="text-sm text-gray-500">Center of the stadium. Experience the Gulabi Queen here.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <Info className="w-6 h-6 text-blue-500 shrink-0" />
                <div>
                  <h4 className="text-white font-bold uppercase tracking-wide">Access Gates</h4>
                  <p className="text-sm text-gray-500">Main Gate: All entries. Back Gate: Strictly VVIP only.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <AlertTriangle className="w-6 h-6 text-yellow-500 shrink-0" />
                <div>
                  <h4 className="text-white font-bold uppercase tracking-wide">Emergency Services</h4>
                  <p className="text-sm text-gray-500">High-tier security & 24/7 Ambulance stationed at East Zone.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 w-full aspect-square md:aspect-video lg:aspect-square relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 p-4 flex items-center justify-center">
            {/* Simple SVG/CSS Map Placeholder or Styled Graphic */}
            <div className="relative w-full h-full bg-slate-900 rounded-2xl border border-white/5 overflow-hidden">
               {/* Grid */}
               <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
               
               {/* Zones */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-orange-500/50 rounded-full flex items-center justify-center bg-orange-500/10 backdrop-blur-md">
                 <span className="text-orange-500 font-black uppercase text-[10px] tracking-widest">Nexus Stage</span>
               </div>
               
               <div className="absolute top-10 right-10 w-32 h-32 border border-blue-500/30 rounded-2xl bg-blue-500/5 rotate-12 flex items-center justify-center">
                 <span className="text-blue-400 font-bold text-[8px] uppercase tracking-widest text-center">Gaming<br/>Arena</span>
               </div>
               
               <div className="absolute bottom-10 left-10 w-32 h-32 border border-green-500/30 rounded-2xl bg-green-500/5 -rotate-6 flex items-center justify-center">
                 <span className="text-green-400 font-bold text-[8px] uppercase tracking-widest text-center">Food<br/>Galaxy</span>
               </div>

               <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center animate-pulse">
                <span className="text-[10px] font-bold text-white">i</span>
               </div>
               
               <div className="absolute top-4 left-4 text-[10px] font-mono text-white/20 uppercase">Venue Map v1.0.4</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
