import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export const GalaxyBackground = () => {
  const [stars, setStars] = useState<{ x: number; y: number; size: number }[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 100 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] bg-black overflow-hidden">
      {/* Video Background Layer - Optimized for Landscape Cover */}
      <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-10" />
        <iframe
          className="absolute top-1/2 left-1/2 w-[100vw] h-[100vh] -translate-x-1/2 -translate-y-1/2 min-w-[177.77vh] min-h-[56.25vw] pointer-events-none scale-110"
          src="https://www.youtube.com/embed/ztVV54sPOns?autoplay=1&mute=1&loop=1&playlist=ztVV54sPOns&controls=0&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&enablejsapi=1"
          allow="autoplay; encrypted-media"
          frameBorder="0"
        />
      </div>

      {/* Atmospheric Color Glows */}
      <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-purple-600/20 blur-[150px] rounded-full z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-blue-600/20 blur-[150px] rounded-full z-10 animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[40%] bg-orange-500/10 blur-[120px] rounded-full z-10" />

      {/* Deep Space Foundation */}
      <div className="absolute inset-0 bg-black z-0" />
      
      {/* Stars Layer */}
      <div className="relative z-20">
        {stars.map((star, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/40"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size / 1.5,
              height: star.size / 1.5,
            }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: Math.random() * 3 + 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};
