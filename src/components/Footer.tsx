import { Rocket, Instagram, Twitter, Music, Mail, MapPin, Phone } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-black pt-24 pb-12 px-6 border-t border-white/10 overflow-hidden relative">
      {/* Decorative Blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
      
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white">
                <Rocket className="w-6 h-6" />
              </div>
              <span className="text-3xl font-black text-white italic tracking-tighter uppercase">Cosmos</span>
            </div>
            <p className="text-gray-500 leading-relaxed max-w-xs">
              Kanpur&apos;s biggest music and gaming odyssey. Experience the universe of sound at CSJMU Grounds.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-orange-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-blue-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-green-500 transition-colors">
                <Music className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-8">Odyssey</h4>
            <ul className="space-y-4">
              <li><a href="#lineup" className="text-gray-500 hover:text-white transition-colors">Artist Lineup</a></li>
              <li><a href="#schedule" className="text-gray-500 hover:text-white transition-colors">Timeline</a></li>
              <li><a href="#tickets" className="text-gray-500 hover:text-white transition-colors">Ticketing</a></li>
              <li><a href="#attractions" className="text-gray-500 hover:text-white transition-colors">Attractions</a></li>
              <li><a href="#map" className="text-gray-500 hover:text-white transition-colors">Venue Map</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-8">Contact Control</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-500">
                <Mail className="w-4 h-4 text-orange-500" />
                <span>hello@cosmoskanpur.com</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500">
                <Phone className="w-4 h-4 text-purple-500" />
                <span>+91 9452401131</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500">
                <Phone className="w-4 h-4 text-blue-500" />
                <span>+91 9719108429</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-8">Newsletter</h4>
            <p className="text-gray-500 mb-6 text-sm italic">Get a transmission every time we announce a new artist.</p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Starship Email" 
                className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                required
              />
              <button className="bg-orange-500 text-white px-4 py-3 rounded-xl hover:bg-orange-600 transition-colors">
                <Rocket className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-600 text-xs font-bold uppercase tracking-widest">
            © 2026 COSMOS FESTIVAL. ALL SYSTEMS GO.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-gray-600 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">Privacy Policy</a>
            <a href="#" className="text-gray-600 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
