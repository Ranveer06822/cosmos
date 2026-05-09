import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ChevronDown, ShieldCheck, Siren, Phone } from 'lucide-react';

const FAQS = [
  {
    question: "What is the security arrangement?",
    answer: "We have a multi-tier security system including Kanpur Police, private bouncers, and student volunteers. Entry is strictly by valid pass and ID proof."
  },
  {
    question: "Are there medical facilities?",
    answer: "Yes, a dedicated ambulance and medical team will be stationed at the venue (near Food Galaxy) for any emergencies."
  },
  {
    question: "How do I enter if I have a VIP pass?",
    answer: "VVIP/VIP pass holders can use the dedicated Back Gate for express entry. General and Early Bird entries are via the Main Gate."
  },
  {
    question: "What kind of games are in the Gaming Zone?",
    answer: "We have 'Quick-play' open games including VR experiences, arcade setups, and mobile stations (BGMI/Valorant quick matches) that you can enjoy alongside the concert."
  }
];

const TERMS = [
  "Entry strictly on valid physical/digital pass and matching ID card.",
  "Security checks are mandatory. Prohibited items (liquids, sharp objects, lasers) will be confiscated.",
  "Zero tolerance policy towards harassment or disruptive behavior.",
  "The organizers reserve the right to deny entry for security reasons.",
  "Standard event rules apply regarding recording and commercial usage."
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-4 container mx-auto max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* FAQ Area */}
        <div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-8 flex items-center gap-3">
            Questions <span className="text-orange-500">& Answers</span>
          </h2>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-white/10 rounded-2xl overflow-hidden bg-white/5">
                <button 
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-white font-bold">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 text-gray-400 text-sm leading-relaxed"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Features & T&C Area */}
        <div className="space-y-12">
          {/* Security & Emergency */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-3xl bg-blue-500/10 border border-blue-500/20">
              <ShieldCheck className="w-8 h-8 text-blue-500 mb-4" />
              <h4 className="text-white font-black uppercase text-sm mb-2">High Security</h4>
              <p className="text-xs text-gray-400 italic">Police + Bouncers + Volunteers</p>
            </div>
            <div className="p-6 rounded-3xl bg-red-500/10 border border-red-500/20">
              <Siren className="w-8 h-8 text-red-500 mb-4" />
              <h4 className="text-white font-black uppercase text-sm mb-2">Health First</h4>
              <p className="text-xs text-gray-400 italic">24/7 Ambulance on Standby</p>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
            <h3 className="text-xl font-black text-white uppercase tracking-widest mb-6 border-b border-white/10 pb-4">
              Terms & <span className="text-purple-500">Conditions</span>
            </h3>
            <ul className="space-y-4">
              {TERMS.map((term, i) => (
                <li key={i} className="flex gap-3 text-xs text-gray-500 leading-normal">
                  <span className="text-purple-500 font-bold">0{i+1}.</span>
                  {term}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
