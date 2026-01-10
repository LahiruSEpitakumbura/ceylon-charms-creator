import vehicleSedan from '@/assets/vehicle-sedan.jpg';
import vehicleSuv from '@/assets/vehicle-suv.jpg';
import vehicleVan from '@/assets/vehicle-van.jpg';
import destSigiriya from '@/assets/dest-sigiriya.jpg';
import destKandy from '@/assets/dest-kandy.jpg';
import destElla from '@/assets/dest-ella.jpg';
import destGalle from '@/assets/dest-galle.jpg';

import type { Vehicle, Destination, HotelCategory, GuideOption, Activity, ExtraService } from '@/types/booking';

export const vehicles: Vehicle[] = [
  {
    id: 'sedan',
    name: 'Luxury Sedan',
    type: 'sedan',
    passengers: '2-3',
    luggage: 3,
    features: ['Air Conditioning', 'Leather Seats', 'WiFi', 'Water & Snacks'],
    pricePerDay: 85,
    image: vehicleSedan,
  },
  {
    id: 'suv',
    name: 'Luxury SUV',
    type: 'suv',
    passengers: '3-4',
    luggage: 4,
    features: ['4x4 Capability', 'Air Conditioning', 'Leather Seats', 'Safari Ready', 'WiFi'],
    pricePerDay: 120,
    image: vehicleSuv,
  },
  {
    id: 'van',
    name: 'Luxury Van',
    type: 'van',
    passengers: '5-10',
    luggage: 8,
    features: ['Spacious Interior', 'Air Conditioning', 'Reclining Seats', 'Entertainment System', 'WiFi'],
    pricePerDay: 150,
    image: vehicleVan,
  },
];

export const destinations: Destination[] = [
  { id: 'kandy', name: 'Kandy', description: 'Sacred city with Temple of the Tooth', nights: 0, image: destKandy, region: 'cultural' },
  { id: 'nuwara-eliya', name: 'Nuwara Eliya', description: 'Cool climate tea country', nights: 0, image: destElla, region: 'hill-country' },
  { id: 'ella', name: 'Ella', description: 'Scenic mountain village', nights: 0, image: destElla, region: 'hill-country' },
  { id: 'sigiriya', name: 'Sigiriya', description: 'Ancient rock fortress', nights: 0, image: destSigiriya, region: 'cultural' },
  { id: 'dambulla', name: 'Dambulla', description: 'Cave temples & ancient art', nights: 0, image: destSigiriya, region: 'cultural' },
  { id: 'galle', name: 'Galle', description: 'Colonial fort & beaches', nights: 0, image: destGalle, region: 'coastal' },
  { id: 'mirissa', name: 'Mirissa', description: 'Whale watching & surfing', nights: 0, image: destGalle, region: 'coastal' },
  { id: 'bentota', name: 'Bentota', description: 'Beach resort paradise', nights: 0, image: destGalle, region: 'coastal' },
  { id: 'yala', name: 'Yala', description: 'Leopard safari destination', nights: 0, image: destSigiriya, region: 'wildlife' },
  { id: 'udawalawe', name: 'Udawalawe', description: 'Elephant sanctuary', nights: 0, image: destSigiriya, region: 'wildlife' },
  { id: 'trincomalee', name: 'Trincomalee', description: 'East coast beaches', nights: 0, image: destGalle, region: 'coastal' },
  { id: 'pasikudah', name: 'Pasikudah', description: 'Shallow beach paradise', nights: 0, image: destGalle, region: 'coastal' },
  { id: 'arugam-bay', name: 'Arugam Bay', description: 'Surfing capital', nights: 0, image: destGalle, region: 'coastal' },
  { id: 'kalpitiya', name: 'Kalpitiya', description: 'Dolphin watching & kite surfing', nights: 0, image: destGalle, region: 'coastal' },
  { id: 'colombo', name: 'Colombo', description: 'Vibrant capital city', nights: 0, image: destKandy, region: 'cultural' },
  { id: 'negombo', name: 'Negombo', description: 'Fishing village near airport', nights: 0, image: destGalle, region: 'coastal' },
  { id: 'jaffna', name: 'Jaffna', description: 'Tamil culture & temples', nights: 0, image: destKandy, region: 'northern' },
];

export const hotelCategories: HotelCategory[] = [
  { id: 'budget', name: 'Budget', stars: 2, pricePerNight: 35, features: ['Clean rooms', 'Fan/AC', 'WiFi'] },
  { id: '3-star', name: '3 Star', stars: 3, pricePerNight: 65, features: ['AC rooms', 'Restaurant', 'Pool', 'WiFi'] },
  { id: '4-star', name: '4 Star', stars: 4, pricePerNight: 120, features: ['Luxury rooms', 'Spa', 'Pool', 'Restaurant', 'WiFi'] },
  { id: '5-star', name: '5 Star / Boutique', stars: 5, pricePerNight: 250, features: ['Premium suites', 'Fine dining', 'Spa', 'Pool', 'Butler service'] },
];

export const guideOptions: GuideOption[] = [
  { id: 'none', language: 'No Guide', pricePerDay: 0 },
  { id: 'english', language: 'English Speaking Guide', pricePerDay: 50 },
  { id: 'german', language: 'German Speaking Guide', pricePerDay: 75 },
  { id: 'french', language: 'French Speaking Guide', pricePerDay: 75 },
  { id: 'russian', language: 'Russian Speaking Guide', pricePerDay: 80 },
  { id: 'arabic', language: 'Arabic Speaking Guide', pricePerDay: 80 },
];

export const activities: Activity[] = [
  { id: 'safari', name: 'Jeep Safari', description: 'Wildlife adventure in national parks', price: 65, duration: 'Half day', category: 'nature' },
  { id: 'whale', name: 'Whale Watching', description: 'Blue whale & dolphin spotting', price: 55, duration: 'Half day', category: 'nature' },
  { id: 'train', name: 'Scenic Train Journey', description: 'Kandy to Ella tea country ride', price: 25, duration: 'Full day', category: 'cultural' },
  { id: 'surfing', name: 'Surfing Lessons', description: 'Learn to surf with pros', price: 45, duration: '2 hours', category: 'adventure' },
  { id: 'snorkeling', name: 'Snorkeling', description: 'Coral reef exploration', price: 40, duration: 'Half day', category: 'adventure' },
  { id: 'rafting', name: 'White-water Rafting', description: 'Kitulgala river adventure', price: 55, duration: 'Half day', category: 'adventure' },
  { id: 'village', name: 'Village Tour', description: 'Traditional village experience', price: 35, duration: 'Half day', category: 'cultural' },
  { id: 'ayurveda', name: 'Ayurveda & Wellness', description: 'Traditional spa treatments', price: 80, duration: '2-3 hours', category: 'wellness' },
];

export const extraServices: ExtraService[] = [
  { id: 'sim', name: 'SIM Card & Internet', description: 'Tourist SIM with 10GB data', price: 15, priceType: 'one-time' },
  { id: 'child-seat', name: 'Child Seat', description: 'Baby/toddler car seat', price: 5, priceType: 'per-day' },
  { id: 'wheelchair', name: 'Wheelchair Support', description: 'Accessible travel assistance', price: 25, priceType: 'per-day' },
  { id: 'photographer', name: 'Professional Photographer', description: 'Capture your memories', price: 150, priceType: 'per-day' },
  { id: 'dining', name: 'Luxury Dining Experience', description: 'Private chef & fine dining', price: 120, priceType: 'one-time' },
  { id: 'celebration', name: 'Special Celebration', description: 'Birthday, anniversary setup', price: 100, priceType: 'one-time' },
];

export const airports = [
  { code: 'CMB', name: 'Bandaranaike International Airport', city: 'Colombo' },
  { code: 'HRI', name: 'Mattala Rajapaksa International Airport', city: 'Hambantota' },
];

export const pickupOptions = [
  { id: 'none', name: 'No Pickup', description: 'Arrange your own transport', price: 0 },
  { id: 'standard', name: 'Standard Pickup', description: 'Driver with name board at arrivals', price: 35 },
  { id: 'vip', name: 'VIP Meet & Greet', description: 'Fast-track immigration assistance, lounge access', price: 85 },
];
