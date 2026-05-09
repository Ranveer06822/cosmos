import { Artist, ScheduleItem, TicketTier, Zone } from './types';

export const ARTISTS: Artist[] = [
  {
    id: '1',
    name: 'Jasmin Sandlas',
    role: 'The Gulabi Queen | Headliner',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0plrAHQfPOnX-eHQ0iTo3hfbmzGC4IErVRw&s',
    socials: { instagram: '#', spotify: '#' }
  },
  {
    id: '2',
    name: 'The Local Collective',
    role: 'Kanpur Talent Showcase',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800',
    socials: { instagram: '#' }
  },
  {
    id: '3',
    name: 'Cosmic DJ & Dance',
    role: 'Bass & Live Performance',
    image: 'https://djtechtools.com/wp-content/uploads/2013/05/creating-a-great-dj-show-header.jpg',
    socials: { instagram: '#' }
  }
];

export const SCHEDULE: ScheduleItem[] = [
  {
    id: '1',
    time: '16:00',
    title: 'Gates Opening',
    description: 'System initialization. Security checks & entry begins via Main Gate.',
    type: 'main'
  },
  {
    id: '2',
    time: '16:30',
    title: 'Open Gaming & Lifestyle',
    description: 'Quick-play games and lifestyle stalls open. Experience the vibe before the music.',
    type: 'gaming'
  },
  {
    id: '3',
    time: '18:00',
    title: 'Regional Starters',
    description: 'Fresh local talent takes the stage by storm.',
    type: 'music'
  },
  {
    id: '4',
    time: '???',
    title: 'Secret Transmission',
    description: 'The main cosmic act takes the stage. Time revealed at the venue.',
    type: 'main'
  },
  {
    id: '5',
    time: '22:00',
    title: 'Mission Close',
    description: 'Safe exit via designated gates. Peace out.',
    type: 'main'
  }
];

export const TICKET_TIERS: TicketTier[] = [
  {
    id: 'early',
    name: 'Early Bird',
    price: 999,
    features: ['Rear Zone Access', 'Basic Entry Guarantee', 'Lifestyle Zone Access'],
  },
  {
    id: 'general',
    name: 'General Admission',
    price: 1499,
    features: ['Middle Zone Access', 'Priority Entry', 'Gaming Area Access'],
    isPopular: true
  },
  {
    id: 'vip',
    name: 'VIP Galactic Pass',
    price: 2499,
    features: ['Front Row Zone (Crystal Clear View)', 'Express Entry via VVIP Gate', 'Exclusive Chill Zone Access']
  }
];

export const ZONES: Zone[] = [
  {
    id: 'gaming',
    name: 'Lifestyle & Fun',
    description: 'Quick-play games and lifestyle pop-ups for maximum engagement without the lag.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800',
    highlights: ['Quick Arcade', 'Lifestyle Hub', 'Cosmic Portraits']
  },
  {
    id: 'food',
    name: 'Food Galaxy',
    description: 'Curated local and global flavors to fuel your cosmic journey.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800',
    highlights: ['Kanpur Special', 'Star Fries', 'Neon Mocktails']
  }
];

