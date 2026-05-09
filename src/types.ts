/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Artist {
  id: string;
  name: string;
  role: string;
  image: string;
  socials: {
    instagram?: string;
    twitter?: string;
    spotify?: string;
  };
}

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  description: string;
  type: 'music' | 'gaming' | 'main';
}

export interface TicketTier {
  id: string;
  name: string;
  price: number;
  features: string[];
  isPopular?: boolean;
  limit?: number;
}

export interface Zone {
  id: string;
  name: string;
  description: string;
  image: string;
  highlights: string[];
}
