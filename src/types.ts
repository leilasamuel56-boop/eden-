/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  durationMin: number;
  priceFCFA: number;
  imageSrc: string;
}

export interface WellnessPackage {
  id: string;
  name: string;
  description: string;
  originalPrice: number;
  packagePrice: number;
  durationMin: number;
  includesList: string[];
  imageSrc: string;
  popular?: boolean;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  source: "Google" | "Facebook" | "Instagram";
}

export interface BookingDetails {
  serviceId?: string;
  serviceName?: string;
  priceFCFA?: number;
  packageId?: string;
  packageName?: string;
  clientName: string;
  preferredDate: string;
  preferredTime: string;
  peopleCount: number;
  notes: string;
}

export interface BridalPackage {
  id: string;
  name: string;
  description: string;
  images: string[];
  includesList: string[];
  priceText: string;
}
