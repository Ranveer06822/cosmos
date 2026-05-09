/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GalaxyBackground } from './components/GalaxyBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ArtistSection } from './components/ArtistSection';
import { ScheduleSection } from './components/ScheduleSection';
import { TicketingSection } from './components/TicketingSection';
import { MyBookings } from './components/MyBookings';
import { AdminPanel } from './components/AdminPanel';
import { AttractionsSection } from './components/AttractionsSection';
import { SponsorSection } from './components/SponsorSection';
import { VenueMap } from './components/VenueMap';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen text-white selection:bg-orange-500/30 selection:text-orange-200 scroll-smooth">
      <GalaxyBackground />
      <Navbar />
      
      <main>
        <Hero />
        <ArtistSection />
        <ScheduleSection />
        <TicketingSection />
        <MyBookings />
        <AttractionsSection />
        <VenueMap />
        <FAQ />
        <AdminPanel />
        <SponsorSection />
      </main>

      <Footer />
    </div>
  );
}
