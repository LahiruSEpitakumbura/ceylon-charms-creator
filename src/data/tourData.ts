import vehicleSedan from '@/assets/vehicle-sedan.jpg';
import vehicleSuv from '@/assets/vehicle-suv.jpg';
import vehicleVan from '@/assets/vehicle-van.jpg';
import destSigiriya from '@/assets/dest-sigiriya.jpg';
import destKandy from '@/assets/dest-kandy.jpg';
import destElla from '@/assets/dest-ella.jpg';
import destGalle from '@/assets/dest-galle.jpg';

import type { Vehicle, Destination, HotelCategory, GuideOption, Activity, ExtraService, TourPackage } from '@/types/booking';

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
    description: 'Perfect for couples or small groups seeking comfort and style.',
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
    description: 'Ideal for wildlife safaris and rugged terrain adventures.',
  },
  {
    id: 'van',
    name: 'Luxury Van',
    type: 'van',
    passengers: '5-7',
    luggage: 8,
    features: ['Spacious Interior', 'Air Conditioning', 'Reclining Seats', 'Entertainment System', 'WiFi'],
    pricePerDay: 150,
    image: vehicleVan,
    description: 'Perfect for families and medium-sized groups.',
  },
  {
    id: 'minibus',
    name: 'Premium Minibus',
    type: 'minibus',
    passengers: '8-14',
    luggage: 14,
    features: ['Extra Legroom', 'Air Conditioning', 'PA System', 'USB Charging', 'Luggage Compartment'],
    pricePerDay: 200,
    image: vehicleVan,
    description: 'Great for large groups and corporate travel.',
  },
  {
    id: 'luxury-coach',
    name: 'Luxury Coach',
    type: 'luxury',
    passengers: '15-30',
    luggage: 30,
    features: ['Premium Seating', 'Onboard Restroom', 'Entertainment System', 'Mini Bar', 'WiFi', 'AC'],
    pricePerDay: 350,
    image: vehicleVan,
    description: 'Ultimate luxury for large tour groups and VIP travel.',
  },
];

export const destinations: Destination[] = [
  { 
    id: 'kandy', 
    name: 'Kandy', 
    description: 'Sacred city with Temple of the Tooth', 
    nights: 0, 
    image: destKandy, 
    region: 'cultural',
    highlights: ['Temple of the Tooth', 'Kandy Lake', 'Royal Botanical Gardens', 'Cultural Dance Show'],
    bestTime: 'Year-round, festivals in July/August'
  },
  { 
    id: 'nuwara-eliya', 
    name: 'Nuwara Eliya', 
    description: 'Cool climate tea country', 
    nights: 0, 
    image: destElla, 
    region: 'hill-country',
    highlights: ['Tea Plantations', 'Gregory Lake', 'Horton Plains', 'Victoria Park'],
    bestTime: 'March to May'
  },
  { 
    id: 'ella', 
    name: 'Ella', 
    description: 'Scenic mountain village', 
    nights: 0, 
    image: destElla, 
    region: 'hill-country',
    highlights: ['Nine Arches Bridge', 'Little Adam\'s Peak', 'Ella Rock', 'Ravana Falls'],
    bestTime: 'January to March'
  },
  { 
    id: 'sigiriya', 
    name: 'Sigiriya', 
    description: 'Ancient rock fortress', 
    nights: 0, 
    image: destSigiriya, 
    region: 'cultural',
    highlights: ['Lion Rock', 'Frescoes', 'Mirror Wall', 'Royal Gardens'],
    bestTime: 'January to April'
  },
  { 
    id: 'dambulla', 
    name: 'Dambulla', 
    description: 'Cave temples & ancient art', 
    nights: 0, 
    image: destSigiriya, 
    region: 'cultural',
    highlights: ['Cave Temple', 'Golden Temple', 'Buddha Statues', 'Ancient Frescoes'],
    bestTime: 'January to April'
  },
  { 
    id: 'polonnaruwa', 
    name: 'Polonnaruwa', 
    description: 'Medieval capital ruins', 
    nights: 0, 
    image: destSigiriya, 
    region: 'cultural',
    highlights: ['Gal Vihara', 'Royal Palace', 'Lotus Pond', 'Ancient Ruins'],
    bestTime: 'May to September'
  },
  { 
    id: 'anuradhapura', 
    name: 'Anuradhapura', 
    description: 'Ancient sacred city', 
    nights: 0, 
    image: destSigiriya, 
    region: 'cultural',
    highlights: ['Sri Maha Bodhi', 'Ruwanwelisaya', 'Jetavanarama', 'Abhayagiri'],
    bestTime: 'May to September'
  },
  { 
    id: 'galle', 
    name: 'Galle', 
    description: 'Colonial fort & beaches', 
    nights: 0, 
    image: destGalle, 
    region: 'coastal',
    highlights: ['Dutch Fort', 'Lighthouse', 'Beach Walks', 'Art Galleries'],
    bestTime: 'December to March'
  },
  { 
    id: 'mirissa', 
    name: 'Mirissa', 
    description: 'Whale watching & surfing', 
    nights: 0, 
    image: destGalle, 
    region: 'coastal',
    highlights: ['Whale Watching', 'Surfing', 'Beach Parties', 'Coconut Tree Hill'],
    bestTime: 'November to April'
  },
  { 
    id: 'bentota', 
    name: 'Bentota', 
    description: 'Beach resort paradise', 
    nights: 0, 
    image: destGalle, 
    region: 'coastal',
    highlights: ['Water Sports', 'River Safari', 'Turtle Hatchery', 'Beach Resorts'],
    bestTime: 'November to April'
  },
  { 
    id: 'hikkaduwa', 
    name: 'Hikkaduwa', 
    description: 'Coral reefs & nightlife', 
    nights: 0, 
    image: destGalle, 
    region: 'coastal',
    highlights: ['Coral Sanctuary', 'Snorkeling', 'Beach Nightlife', 'Turtle Beach'],
    bestTime: 'November to April'
  },
  { 
    id: 'unawatuna', 
    name: 'Unawatuna', 
    description: 'Beautiful bay beach', 
    nights: 0, 
    image: destGalle, 
    region: 'coastal',
    highlights: ['Jungle Beach', 'Japanese Peace Pagoda', 'Diving', 'Yoga Retreats'],
    bestTime: 'November to April'
  },
  { 
    id: 'tangalle', 
    name: 'Tangalle', 
    description: 'Secluded beach paradise', 
    nights: 0, 
    image: destGalle, 
    region: 'coastal',
    highlights: ['Pristine Beaches', 'Turtle Nesting', 'Hummanaya Blowhole', 'Mulkirigala Temple'],
    bestTime: 'November to April'
  },
  { 
    id: 'yala', 
    name: 'Yala', 
    description: 'Leopard safari destination', 
    nights: 0, 
    image: destSigiriya, 
    region: 'wildlife',
    highlights: ['Leopard Spotting', 'Elephant Herds', 'Bird Watching', 'Safari Camps'],
    bestTime: 'February to July'
  },
  { 
    id: 'udawalawe', 
    name: 'Udawalawe', 
    description: 'Elephant sanctuary', 
    nights: 0, 
    image: destSigiriya, 
    region: 'wildlife',
    highlights: ['Elephant Orphanage', 'Safari', 'Reservoir Views', 'Bird Watching'],
    bestTime: 'Year-round'
  },
  { 
    id: 'wilpattu', 
    name: 'Wilpattu', 
    description: 'Largest national park', 
    nights: 0, 
    image: destSigiriya, 
    region: 'wildlife',
    highlights: ['Leopards', 'Sloth Bears', 'Natural Lakes', 'Dense Jungle'],
    bestTime: 'February to October'
  },
  { 
    id: 'minneriya', 
    name: 'Minneriya', 
    description: 'The Gathering of elephants', 
    nights: 0, 
    image: destSigiriya, 
    region: 'wildlife',
    highlights: ['Elephant Gathering', 'Bird Sanctuary', 'Ancient Reservoir', 'Safari'],
    bestTime: 'June to September'
  },
  { 
    id: 'trincomalee', 
    name: 'Trincomalee', 
    description: 'East coast beaches', 
    nights: 0, 
    image: destGalle, 
    region: 'eastern',
    highlights: ['Nilaveli Beach', 'Pigeon Island', 'Koneswaram Temple', 'Whale Watching'],
    bestTime: 'April to September'
  },
  { 
    id: 'pasikudah', 
    name: 'Pasikudah', 
    description: 'Shallow beach paradise', 
    nights: 0, 
    image: destGalle, 
    region: 'eastern',
    highlights: ['Shallow Waters', 'Luxury Resorts', 'Water Sports', 'Sunbathing'],
    bestTime: 'April to September'
  },
  { 
    id: 'arugam-bay', 
    name: 'Arugam Bay', 
    description: 'Surfing capital', 
    nights: 0, 
    image: destGalle, 
    region: 'eastern',
    highlights: ['World-class Surfing', 'Lagoon Safari', 'Elephant Rock', 'Beach Vibes'],
    bestTime: 'April to October'
  },
  { 
    id: 'batticaloa', 
    name: 'Batticaloa', 
    description: 'Singing fish lagoon', 
    nights: 0, 
    image: destGalle, 
    region: 'eastern',
    highlights: ['Singing Fish', 'Dutch Fort', 'Kallady Beach', 'Lagoon'],
    bestTime: 'April to September'
  },
  { 
    id: 'kalpitiya', 
    name: 'Kalpitiya', 
    description: 'Dolphin watching & kite surfing', 
    nights: 0, 
    image: destGalle, 
    region: 'coastal',
    highlights: ['Dolphin Watching', 'Kite Surfing', 'Bar Reef', 'Dutch Church'],
    bestTime: 'May to October'
  },
  { 
    id: 'colombo', 
    name: 'Colombo', 
    description: 'Vibrant capital city', 
    nights: 0, 
    image: destKandy, 
    region: 'cultural',
    highlights: ['Gangaramaya Temple', 'Galle Face Green', 'Shopping', 'Nightlife'],
    bestTime: 'Year-round'
  },
  { 
    id: 'negombo', 
    name: 'Negombo', 
    description: 'Fishing village near airport', 
    nights: 0, 
    image: destGalle, 
    region: 'coastal',
    highlights: ['Fish Market', 'Dutch Canal', 'Beach Resorts', 'Churches'],
    bestTime: 'November to April'
  },
  { 
    id: 'jaffna', 
    name: 'Jaffna', 
    description: 'Tamil culture & temples', 
    nights: 0, 
    image: destKandy, 
    region: 'northern',
    highlights: ['Nallur Temple', 'Jaffna Fort', 'Islands', 'Cuisine'],
    bestTime: 'March to September'
  },
  { 
    id: 'mannar', 
    name: 'Mannar', 
    description: 'Adam\'s Bridge island', 
    nights: 0, 
    image: destGalle, 
    region: 'northern',
    highlights: ['Baobab Trees', 'Flamingos', 'Adam\'s Bridge', 'Fort'],
    bestTime: 'February to September'
  },
  { 
    id: 'habarana', 
    name: 'Habarana', 
    description: 'Safari base camp', 
    nights: 0, 
    image: destSigiriya, 
    region: 'cultural',
    highlights: ['Elephant Rides', 'Village Tours', 'Safari Base', 'Nature Walks'],
    bestTime: 'January to September'
  },
  { 
    id: 'kitulgala', 
    name: 'Kitulgala', 
    description: 'Adventure sports hub', 
    nights: 0, 
    image: destElla, 
    region: 'hill-country',
    highlights: ['White Water Rafting', 'Jungle Trekking', 'Bird Watching', 'Waterfalls'],
    bestTime: 'December to April'
  },
  { 
    id: 'adams-peak', 
    name: 'Adam\'s Peak', 
    description: 'Sacred pilgrimage mountain', 
    nights: 0, 
    image: destElla, 
    region: 'hill-country',
    highlights: ['Sunrise Trek', 'Sacred Footprint', 'Pilgrimage', 'Stunning Views'],
    bestTime: 'December to May'
  },
  { 
    id: 'knuckles', 
    name: 'Knuckles Range', 
    description: 'UNESCO mountain range', 
    nights: 0, 
    image: destElla, 
    region: 'hill-country',
    highlights: ['Hiking', 'Biodiversity', 'Waterfalls', 'Village Culture'],
    bestTime: 'January to April'
  },
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
  { id: 'spanish', language: 'Spanish Speaking Guide', pricePerDay: 75 },
  { id: 'italian', language: 'Italian Speaking Guide', pricePerDay: 75 },
  { id: 'russian', language: 'Russian Speaking Guide', pricePerDay: 80 },
  { id: 'arabic', language: 'Arabic Speaking Guide', pricePerDay: 80 },
  { id: 'chinese', language: 'Chinese Speaking Guide', pricePerDay: 85 },
  { id: 'japanese', language: 'Japanese Speaking Guide', pricePerDay: 85 },
];

export const activities: Activity[] = [
  { id: 'yala-safari', name: 'Yala Safari', description: 'Leopard spotting in Sri Lanka\'s premier national park', price: 75, duration: 'Half day', category: 'nature', location: 'Yala' },
  { id: 'udawalawe-safari', name: 'Udawalawe Safari', description: 'Elephant herds and wildlife adventure', price: 65, duration: 'Half day', category: 'nature', location: 'Udawalawe' },
  { id: 'minneriya-safari', name: 'Minneriya Safari', description: 'Famous elephant gathering experience', price: 65, duration: 'Half day', category: 'nature', location: 'Minneriya' },
  { id: 'wilpattu-safari', name: 'Wilpattu Safari', description: 'Explore the largest national park', price: 70, duration: 'Full day', category: 'nature', location: 'Wilpattu' },
  { id: 'whale-mirissa', name: 'Whale Watching Mirissa', description: 'Blue whale & dolphin spotting', price: 55, duration: 'Half day', category: 'nature', location: 'Mirissa' },
  { id: 'whale-trinco', name: 'Whale Watching Trincomalee', description: 'East coast whale watching', price: 55, duration: 'Half day', category: 'nature', location: 'Trincomalee' },
  { id: 'dolphin-kalpitiya', name: 'Dolphin Watching', description: 'Spinner dolphins at sunrise', price: 45, duration: '3 hours', category: 'nature', location: 'Kalpitiya' },
  { id: 'train', name: 'Scenic Train Journey', description: 'Kandy to Ella tea country ride', price: 25, duration: 'Full day', category: 'cultural', location: 'Hill Country' },
  { id: 'surfing-arugam', name: 'Surfing Arugam Bay', description: 'World-class waves for all levels', price: 45, duration: '2 hours', category: 'adventure', location: 'Arugam Bay' },
  { id: 'surfing-hikka', name: 'Surfing Hikkaduwa', description: 'Learn to surf with pros', price: 45, duration: '2 hours', category: 'adventure', location: 'Hikkaduwa' },
  { id: 'kitesurfing', name: 'Kite Surfing', description: 'Kite surfing lessons and sessions', price: 85, duration: '3 hours', category: 'adventure', location: 'Kalpitiya' },
  { id: 'snorkeling-pigeon', name: 'Snorkeling Pigeon Island', description: 'Crystal clear waters & coral reefs', price: 45, duration: 'Half day', category: 'adventure', location: 'Trincomalee' },
  { id: 'snorkeling-hikka', name: 'Snorkeling Hikkaduwa', description: 'Coral sanctuary exploration', price: 40, duration: 'Half day', category: 'adventure', location: 'Hikkaduwa' },
  { id: 'diving', name: 'Scuba Diving', description: 'Explore shipwrecks and reefs', price: 75, duration: 'Half day', category: 'adventure', location: 'Various' },
  { id: 'rafting', name: 'White-water Rafting', description: 'Kitulgala river adventure', price: 55, duration: 'Half day', category: 'adventure', location: 'Kitulgala' },
  { id: 'canyoning', name: 'Canyoning', description: 'Waterfalls, abseiling and adventure', price: 65, duration: 'Half day', category: 'adventure', location: 'Kitulgala' },
  { id: 'hiking-ella', name: 'Ella Rock Hike', description: 'Scenic mountain trek', price: 30, duration: 'Half day', category: 'adventure', location: 'Ella' },
  { id: 'hiking-knuckles', name: 'Knuckles Trekking', description: 'UNESCO heritage mountain trails', price: 45, duration: 'Full day', category: 'adventure', location: 'Knuckles' },
  { id: 'adams-peak', name: 'Adam\'s Peak Sunrise', description: 'Sacred mountain pilgrimage', price: 40, duration: 'Overnight', category: 'cultural', location: 'Ratnapura' },
  { id: 'cooking', name: 'Cooking Class', description: 'Learn authentic Sri Lankan cuisine', price: 45, duration: '3 hours', category: 'cultural', location: 'Various' },
  { id: 'village', name: 'Village Tour', description: 'Traditional village experience with ox cart', price: 35, duration: 'Half day', category: 'cultural', location: 'Habarana' },
  { id: 'tea-factory', name: 'Tea Factory Visit', description: 'Learn tea production and tasting', price: 25, duration: '2 hours', category: 'cultural', location: 'Hill Country' },
  { id: 'gem-tour', name: 'Gem Mining Tour', description: 'Visit gem mines and museums', price: 40, duration: 'Half day', category: 'cultural', location: 'Ratnapura' },
  { id: 'cultural-show', name: 'Cultural Dance Show', description: 'Traditional Kandyan dance performance', price: 20, duration: '2 hours', category: 'cultural', location: 'Kandy' },
  { id: 'ayurveda', name: 'Ayurveda & Wellness', description: 'Traditional spa treatments', price: 80, duration: '2-3 hours', category: 'wellness', location: 'Various' },
  { id: 'yoga', name: 'Yoga Retreat', description: 'Beachside yoga and meditation', price: 50, duration: 'Half day', category: 'wellness', location: 'Various' },
  { id: 'hot-springs', name: 'Hot Springs Visit', description: 'Natural thermal springs', price: 15, duration: '2 hours', category: 'wellness', location: 'Mahapelessa' },
];

export const extraServices: ExtraService[] = [
  { id: 'sim', name: 'SIM Card & Internet', description: 'Tourist SIM with 10GB data', price: 15, priceType: 'one-time' },
  { id: 'child-seat', name: 'Child Seat', description: 'Baby/toddler car seat', price: 5, priceType: 'per-day' },
  { id: 'booster', name: 'Booster Seat', description: 'For older children', price: 3, priceType: 'per-day' },
  { id: 'wheelchair', name: 'Wheelchair Support', description: 'Accessible travel assistance', price: 25, priceType: 'per-day' },
  { id: 'photographer', name: 'Professional Photographer', description: 'Capture your memories', price: 150, priceType: 'per-day' },
  { id: 'videographer', name: 'Videographer', description: 'Professional video documentation', price: 200, priceType: 'per-day' },
  { id: 'drone', name: 'Drone Photography', description: 'Aerial shots of your journey', price: 100, priceType: 'one-time' },
  { id: 'dining', name: 'Luxury Dining Experience', description: 'Private chef & fine dining', price: 120, priceType: 'one-time' },
  { id: 'celebration', name: 'Special Celebration', description: 'Birthday, anniversary setup', price: 100, priceType: 'one-time' },
  { id: 'honeymoon', name: 'Honeymoon Package', description: 'Romantic setups and surprises', price: 150, priceType: 'one-time' },
  { id: 'airport-lounge', name: 'Airport Lounge Access', description: 'Premium lounge before departure', price: 50, priceType: 'one-time' },
  { id: 'travel-insurance', name: 'Travel Insurance', description: 'Comprehensive coverage', price: 10, priceType: 'per-day' },
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

export const tourPackages: TourPackage[] = [
  {
    id: 'cultural-triangle',
    name: 'Cultural Triangle Explorer',
    duration: '7 Days / 6 Nights',
    description: 'Discover the ancient wonders of Sri Lanka including UNESCO World Heritage sites.',
    highlights: ['Sigiriya Rock Fortress', 'Dambulla Cave Temple', 'Temple of the Tooth', 'Polonnaruwa Ruins', 'Anuradhapura'],
    destinations: ['Colombo', 'Sigiriya', 'Polonnaruwa', 'Dambulla', 'Kandy'],
    price: 899,
    image: destSigiriya,
    category: 'cultural',
  },
  {
    id: 'beach-paradise',
    name: 'Beach Paradise Escape',
    duration: '8 Days / 7 Nights',
    description: 'Relax on pristine beaches along the southern coast of Sri Lanka.',
    highlights: ['Galle Fort', 'Whale Watching', 'Beach Relaxation', 'Surfing', 'Turtle Hatchery'],
    destinations: ['Colombo', 'Bentota', 'Hikkaduwa', 'Galle', 'Mirissa'],
    price: 1099,
    image: destGalle,
    category: 'beach',
  },
  {
    id: 'wildlife-adventure',
    name: 'Wildlife Safari Adventure',
    duration: '6 Days / 5 Nights',
    description: 'Experience incredible wildlife encounters in Sri Lanka\'s national parks.',
    highlights: ['Yala Leopard Safari', 'Udawalawe Elephants', 'Minneriya Gathering', 'Bird Watching'],
    destinations: ['Colombo', 'Udawalawe', 'Yala', 'Ella'],
    price: 799,
    image: destSigiriya,
    category: 'wildlife',
  },
  {
    id: 'hill-country',
    name: 'Hill Country Retreat',
    duration: '6 Days / 5 Nights',
    description: 'Escape to the misty mountains, tea plantations, and scenic train journeys.',
    highlights: ['Scenic Train Ride', 'Tea Plantations', 'Ella Nine Arches Bridge', 'Horton Plains', 'Waterfalls'],
    destinations: ['Colombo', 'Kandy', 'Nuwara Eliya', 'Ella'],
    price: 749,
    image: destElla,
    category: 'cultural',
  },
  {
    id: 'honeymoon-bliss',
    name: 'Romantic Honeymoon',
    duration: '10 Days / 9 Nights',
    description: 'A romantic journey through Sri Lanka\'s most enchanting destinations.',
    highlights: ['Private Dinners', 'Spa Treatments', 'Beach Sunsets', 'Luxury Stays', 'Hot Air Balloon'],
    destinations: ['Colombo', 'Sigiriya', 'Kandy', 'Ella', 'Bentota'],
    price: 2499,
    image: destKandy,
    category: 'honeymoon',
  },
  {
    id: 'adventure-seeker',
    name: 'Adventure Seeker',
    duration: '9 Days / 8 Nights',
    description: 'Adrenaline-pumping activities across Sri Lanka\'s diverse landscapes.',
    highlights: ['White Water Rafting', 'Surfing', 'Hiking', 'Kite Surfing', 'Scuba Diving'],
    destinations: ['Colombo', 'Kitulgala', 'Ella', 'Arugam Bay', 'Kalpitiya'],
    price: 1299,
    image: destElla,
    category: 'adventure',
  },
  {
    id: 'complete-sri-lanka',
    name: 'Complete Sri Lanka',
    duration: '14 Days / 13 Nights',
    description: 'The ultimate Sri Lanka experience covering culture, beaches, wildlife, and mountains.',
    highlights: ['All Major Sites', 'Safari', 'Beaches', 'Tea Country', 'Train Ride', 'Whale Watching'],
    destinations: ['Colombo', 'Sigiriya', 'Kandy', 'Nuwara Eliya', 'Ella', 'Yala', 'Galle', 'Bentota'],
    price: 1999,
    image: destSigiriya,
    category: 'luxury',
  },
  {
    id: 'east-coast',
    name: 'East Coast Explorer',
    duration: '7 Days / 6 Nights',
    description: 'Discover the unspoiled beauty of Sri Lanka\'s eastern coast.',
    highlights: ['Trincomalee Beaches', 'Pigeon Island', 'Surfing', 'Batticaloa Lagoon', 'Ancient Temples'],
    destinations: ['Colombo', 'Trincomalee', 'Pasikudah', 'Batticaloa', 'Arugam Bay'],
    price: 849,
    image: destGalle,
    category: 'beach',
  },
  {
    id: 'photography-tour',
    name: 'Photography Tour',
    duration: '10 Days / 9 Nights',
    description: 'Capture Sri Lanka\'s most photogenic locations with a professional guide.',
    highlights: ['Sunrise Shots', 'Wildlife Photography', 'Cultural Sites', 'Landscapes', 'Drone Permitted Areas'],
    destinations: ['Colombo', 'Sigiriya', 'Kandy', 'Ella', 'Yala', 'Galle'],
    price: 1599,
    image: destKandy,
    category: 'luxury',
  },
  {
    id: 'ayurveda-wellness',
    name: 'Ayurveda & Wellness',
    duration: '7 Days / 6 Nights',
    description: 'Rejuvenate your body and mind with traditional Ayurvedic treatments.',
    highlights: ['Ayurveda Spa', 'Yoga Sessions', 'Meditation', 'Healthy Cuisine', 'Nature Walks'],
    destinations: ['Colombo', 'Bentota', 'Kandy'],
    price: 1199,
    image: destKandy,
    category: 'luxury',
  },
];

export const WHATSAPP_NUMBER = '+94771234567';
export const WHATSAPP_MESSAGE = 'Hello AO Travels! I am interested in booking a tour to Sri Lanka.';
