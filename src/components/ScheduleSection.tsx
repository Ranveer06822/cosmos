import { motion } from 'motion/react';
import { SCHEDULE } from '@/src/constants';
import { Music, Gamepad2, Sparkles, Circle } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const ScheduleSection = () => {
  return (
    <section id="schedule" className="py-24 px-4 bg-white/5 backdrop-blur-sm">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-4">
            Event <span className="text-purple-500">Timeline</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto" />
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/20 -translate-x-1/2 hidden md:block" />
          
          <div className="space-y-12 relative">
            {SCHEDULE.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={cn(
                  "flex flex-col md:flex-row items-center gap-8",
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                )}
              >
                <div className="flex-1 w-full text-center md:text-left">
                  <div className={cn(
                    "bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md hover:border-white/30 transition-colors",
                    index % 2 === 0 ? "md:text-right" : "md:text-left text-left"
                  )}>
                    <div className={cn(
                      "flex items-center gap-2 mb-2 justify-center",
                      index % 2 === 0 ? "md:justify-end" : "md:justify-start"
                    )}>
                      <span className="text-purple-400 font-mono text-lg font-bold">{item.time}</span>
                      <div className="w-8 h-[1px] bg-white/20" />
                      {item.type === 'music' && <Music className="w-4 h-4 text-orange-500" />}
                      {item.type === 'gaming' && <Gamepad2 className="w-4 h-4 text-blue-500" />}
                      {item.type === 'main' && <Sparkles className="w-4 h-4 text-yellow-500" />}
                    </div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </div>

                <div className="hidden md:flex items-center justify-center z-10">
                  <motion.div 
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-4 h-4 rounded-full bg-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.8)] border-4 border-black" 
                  />
                </div>

                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
