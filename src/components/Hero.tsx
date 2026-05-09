import { motion } from 'motion/react';
import { Rocket, MapPin, Calendar, Clock } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-4 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 max-w-4xl"
      >
        <span className="inline-block px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
          CSJMU Ground, Kanpur
        </span>
        
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter mb-8 leading-[0.85] uppercase">
          Cosmos: <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500">
            The Universe <br /> of Sound
          </span>
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed uppercase font-bold tracking-widest text-sm">
          A Celestial Fusion of Bass & Gaming <br />
          <span className="text-white">4:00 PM — 10:00 PM</span>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button className="group relative px-8 py-4 bg-orange-500 text-white font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(249,115,22,0.4)]">
            <span className="relative z-10 flex items-center gap-2 uppercase tracking-wide">
              Book Your Tickets Now <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </span>
          </button>
          <button className="px-8 py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-colors uppercase tracking-wide backdrop-blur-md">
            View Schedule
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-white py-10 border-y border-white/10 backdrop-blur-sm px-6">
          <div className="flex items-center gap-4 justify-center sm:justify-start">
            <Calendar className="w-6 h-6 text-orange-500" />
            <div className="text-left">
              <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Date</p>
              <p className="font-bold">May 24-25, 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center sm:justify-start border-white/10 sm:border-x px-0 sm:px-8">
            <MapPin className="w-6 h-6 text-purple-500" />
            <div className="text-left">
              <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Venue</p>
              <p className="font-bold">CSJMU Stadium</p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center sm:justify-start">
            <Clock className="w-6 h-6 text-blue-500" />
            <div className="text-left">
              <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Time</p>
              <p className="font-bold">Starts 2:00 PM</p>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-orange-600/20 blur-[100px] rounded-full -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full translate-x-1/2 pointer-events-none" />
    </section>
  );
};
