export interface ArrivalDetails {
  airport: 'CMB' | 'HRI' | '';
  date: Date | null;
  time: string;
  pickupType: 'none' | 'standard' | 'vip';
  flightNumber: string;
}

export interface Vehicle {
  id: string;
  name: string;
  type: 'sedan' | 'suv' | 'van';
  passengers: string;
  luggage: number;
  features: string[];
  pricePerDay: number;
  image: string;
}

export interface Destination {
  id: string;
  name: string;
  description: string;
  nights: number;
  image: string;
  region: 'cultural' | 'hill-country' | 'coastal' | 'wildlife' | 'northern';
}

export interface HotelCategory {
  id: string;
  name: string;
  stars: number;
  pricePerNight: number;
  features: string[];
}

export interface SelectedHotel {
  destinationId: string;
  category: string;
  pricePerNight: number;
}

export interface GuideOption {
  id: string;
  language: string;
  pricePerDay: number;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  category: 'adventure' | 'nature' | 'cultural' | 'wellness';
}

export interface ExtraService {
  id: string;
  name: string;
  description: string;
  price: number;
  priceType: 'one-time' | 'per-day';
}

export interface ContactInfo {
  name: string;
  email: string;
  whatsapp: string;
  country: string;
  specialRequests: string;
}

export interface BookingState {
  currentStep: number;
  arrival: ArrivalDetails;
  vehicle: Vehicle | null;
  destinations: Destination[];
  hotels: SelectedHotel[];
  guide: GuideOption | null;
  activities: Activity[];
  extras: ExtraService[];
  contact: ContactInfo;
  currency: 'USD' | 'EUR';
}
