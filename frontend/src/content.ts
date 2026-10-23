/**
 * All editable copy, links, itinerary, gallery, and integration points live here.
 */

export const BRAND = {
  name: 'PURVA OCEAN ADVENTURES',
  shortName: 'Purva Ocean',
  tagline: 'Collecting shades of blue',
};

/** Public profile link (official Instagram). */
export const INSTAGRAM_URL = 'https://www.instagram.com/dr.purvaa/';

/** WhatsApp direct booking & inquiry line with pre-filled message. */
export const WHATSAPP_NUMBER = '+91 98765 43210';
export const WHATSAPP_URL = 'https://wa.me/919876543210?text=Hi%20Dr.%20Purva!%20I%20would%20like%20to%20inquire%20about%20the%20Maldives%20Maafushi%20expedition.';

/** Direct contact details. */
export const CONTACT_INFO = {
  phone: '+91 98765 43210',
  email: 'adventures@purvaocean.com',
  whatsapp: '+91 98765 43210',
  location: 'Mumbai & Maldives / Global Expeditions',
};

/**
 * INTEGRATION POINT: inquiry / newsletter endpoint (e.g. backend /api/inquiry, Formspree, or CRM webhook).
 * When empty, the form operates with local mock confirmation.
 */
export const INQUIRY_ENDPOINT = '/api/inquiry';

/**
 * INTEGRATION POINT: a short film for the "Watch film" button. Accepts an mp4/webm URL
 * or leave empty to show the placeholder state.
 */
export const FILM_URL = '';

export const INTERESTS = [
  'Maldives Maafushi Expedition (Nov 22–27, 2026)',
  'Beginner Diver Training',
  'Certified Diver Expeditions',
  'Snorkelers & Non-Divers Ocean Trip',
  'Upcoming Destinations',
  'General Inquiry',
] as const;

export const TRIP = {
  title: 'Maldives (Maafushi) Expedition',
  dates: 'Nov 22–27, 2026',
  duration: '5N / 6D',
  spots: '10 spots only',
  island: 'Maafushi, South Malé Atoll, Maldives',
  description: 'Crystal-clear turquoise waters, majestic manta rays, vibrant coral walls, and mindful dive experiences in the heart of the Maldives.',
  inclusions: [
    { label: 'Guided Scuba & Boat Dives', detail: 'Multiple boat dives with experienced local dive masters & Dr. Purva.', icon: 'Waves' },
    { label: 'Comfortable Stay', detail: '5 nights in a boutique beachside oceanfront hotel on Maafushi island.', icon: 'BedDouble' },
    { label: 'Speedboat Transfers', detail: 'Roundtrip airport speedboat transfers between Velana International and Maafushi.', icon: 'Ship' },
    { label: '10 Spots Only', detail: 'Strictly limited group size for personalized attention, safety, and camaraderie.', icon: 'Users' },
    { label: 'Tanks, Weights & Gear', detail: 'Full tanks, weight belts, and equipment assistance for every scheduled dive.', icon: 'Anchor' },
    { label: 'Marine Ecology Briefings', detail: 'Interactive ocean awareness and marine conservation workshops.', icon: 'Compass' },
  ] as const,
  itinerary: [
    {
      day: 'Day 1',
      title: 'Arrival in Paradise & Island Welcome',
      desc: 'Land at Velana International Airport (Malé). Board our private scenic speedboat to Maafushi. Settle into the beach hotel, unpack, enjoy sunset welcome mocktails by the shore, and join our welcome dinner & expedition orientation.',
    },
    {
      day: 'Day 2',
      title: 'House Reef Check & Morning Boat Dives',
      desc: 'Morning breathwork and buoyancy briefing. Ease in with a house reef orientation dive, followed by our first boat dive at a vibrant shallow pinnacle. Afternoon surface interval exploring Maafushi local cafes.',
    },
    {
      day: 'Day 3',
      title: 'Manta Point Expedition & Sandbank Lunch',
      desc: 'Early morning departure to South Malé’s legendary Manta cleaning stations. Watch graceful manta rays glide above the coral heads. Surface for an exclusive picnic lunch on a secluded virgin sandbank surrounded by turquoise lagoons.',
    },
    {
      day: 'Day 4',
      title: 'Deep Channel Drift Dives & Whale Shark Safari',
      desc: 'Thrilling channel drift dives along outer reef walls for pelagic encounters (eagle rays, reef sharks, tuna schools). Snorkel safari seeking gentle whale sharks in passing migratory channels.',
    },
    {
      day: 'Day 5',
      title: 'Coral Garden Dives & Sunset Farewell BBQ',
      desc: 'Two guided morning dives visiting protected coral gardens and anemone cities. Afternoon marine ecology talk with Dr. Purva on ocean preservation. Evening beachfront seafood barbecue with fellow expedition members.',
    },
    {
      day: 'Day 6',
      title: 'Sunrise Reflection & Malé Transfer',
      desc: 'Sunrise ocean meditation and farewell breakfast overlooking the lagoon. Group speedboat transfer back to Malé International Airport with full hearts, new lifelong friendships, and unforgettable memories.',
    },
  ],
  note: 'Only 10 spots available to maintain our intimate small-group philosophy. Reserve early to secure your spot.',
};

export const HOST = {
  eyebrow: 'Meet Dr. Purva',
  name: 'Dr. Purva',
  credentials: 'Physiotherapist | PADI Rescue Diver | Marine Expedition Leader',
  role: 'Founder & Expedition Leader, Purva Ocean Adventures',
  philosophy: '“The ocean is where science meets stillness. We don’t just visit the reef — we respect it, understand its delicate pulse, and build lifelong bonds beneath the surface.”',
  bio: 'What started as a deep personal love for the ocean has grown into an international space where Dr. Purva shares her two greatest passions: diving and mindful, meaningful travel. Combining her medical background in physiotherapy with rescue diver training, she brings unparalleled care, aquatic body awareness, and calm reassurance to every diver.',
  portrait: '/images/host-portrait.jpg',
  instagram: INSTAGRAM_URL,
  verified: true,
};

export const EXPERIENCES = [
  {
    id: 'beginners',
    title: 'Beginners',
    level: 'New to Scuba',
    text: 'Never breathed underwater before? Start your journey with gentle house reef sessions, Discover Scuba Diving, and supportive 1-on-1 guidance.',
    image: '/images/coral-garden.jpg',
    interest: 'Beginner Diver Training',
  },
  {
    id: 'certified',
    title: 'Certified Divers',
    level: 'Advanced & Guided Dives',
    text: 'Take your passion further with guided drift dives, thilas, channel explorations, manta cleaning stations, and advanced skill workshops.',
    image: '/images/diver-underwater.jpg',
    interest: 'Certified Diver Expeditions',
  },
  {
    id: 'non-divers',
    title: 'Snorkelers & Non-Divers',
    level: 'Reef Explorers & Travelers',
    text: 'Love the ocean without heavy tanks? Enjoy guided shallow snorkeling, pristine sandbank picnics, dolphin spotting, and mindful island retreats.',
    image: '/images/maldives-aerial.jpg',
    interest: 'Snorkelers & Non-Divers Ocean Trip',
  },
];

export type GalleryCategory = 'All' | 'Underwater' | 'Corals' | 'Marine Life' | 'Divers';
export const GALLERY_CATEGORIES: GalleryCategory[] = ['All', 'Underwater', 'Corals', 'Marine Life', 'Divers'];

export const GALLERY: {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: GalleryCategory;
  tags?: string[];
}[] = [
  {
    id: 'coral-garden',
    src: '/images/coral-garden.jpg',
    alt: 'Vibrant pristine coral reef garden with colorful soft corals and reef fish in turquoise water',
    caption: 'Vibrant Coral Garden Sanctuary',
    category: 'Corals',
    tags: ['Corals', 'Underwater'],
  },
  {
    id: 'manta',
    src: '/images/manta-ray.jpg',
    alt: 'A majestic manta ray gliding over a coral reef in crystal-clear blue ocean',
    caption: 'Manta Ray Gliding Over Reef',
    category: 'Marine Life',
    tags: ['Marine Life', 'Underwater'],
  },
  {
    id: 'diver-underwater',
    src: '/images/diver-underwater.jpg',
    alt: 'A diver hovering peacefully above a sunlit coral reef in crystal clear azure water',
    caption: 'Diver Hovering in Sunlit Blue',
    category: 'Divers',
    tags: ['Divers', 'Underwater'],
  },
  {
    id: 'turtle',
    src: '/images/sea-turtle.jpg',
    alt: 'A green sea turtle peacefully swimming in the open Maldives waters',
    caption: 'Green Sea Turtle Encounter',
    category: 'Marine Life',
    tags: ['Marine Life', 'Underwater'],
  },
  {
    id: 'reef-fish',
    src: '/images/reef-fish.jpg',
    alt: 'Schools of tropical fish darting across thriving coral formations',
    caption: 'Thriving Reef & Schooling Fish',
    category: 'Corals',
    tags: ['Corals', 'Underwater'],
  },
  {
    id: 'divers-boat',
    src: '/images/divers-boat.jpg',
    alt: 'Divers checking dive equipment and gearing up together on the safari boat deck',
    caption: 'Pre-Dive Boat Preparation',
    category: 'Divers',
    tags: ['Divers'],
  },
  {
    id: 'island-aerial',
    src: '/images/maldives-aerial.jpg',
    alt: 'Aerial perspective of Maafushi atoll with brilliant turquoise sandbanks and deep outer reef',
    caption: 'Maafushi Atoll from Above',
    category: 'Underwater',
    tags: ['Underwater'],
  },
];

export const ABOUT = {
  eyebrow: 'About Dr. Purva & Our Mission',
  title: 'Collecting Shades of Blue, Mindfully',
  lead: 'Purva Ocean Adventures was founded on a simple truth: the ocean heals us, and in return, we must honor and protect her.',
  mission:
    'Our mission is to create intimate, respectful dive expeditions where curiosity meets calm assurance. Guided by Dr. Purva Kuroa — a physiotherapist and PADI Rescue Diver — we replace hurry and crowd pressure with patience, proper buoyancy ergonomics, ocean literacy, and genuine community.',
  pillars: [
    {
      title: 'Ocean Conservation First',
      description: 'Zero-touch reef ethics, strict wildlife interaction distances, and reef awareness woven into every dive.',
      icon: 'Waves',
    },
    {
      title: 'Science & Aquatic Wellness',
      description: 'Drawing on Dr. Purva’s physiotherapy expertise for body alignment, breathing calmness, and diving longevity.',
      icon: 'Heart',
    },
    {
      title: 'Intimate Small Groups',
      description: 'Capped at 10 travelers per expedition so that every diver is seen, supported, and welcomed as a kindred spirit.',
      icon: 'Users',
    },
  ],
};

export const BENEFITS = [
  { title: 'Ocean First.', text: 'Respect for the reef and the animals we share it with.', icon: 'Waves' },
  { title: 'Curated Experiences.', text: 'Thoughtfully chosen dive sites and itineraries.', icon: 'Compass' },
  { title: 'Small Group Vibes.', text: 'Intimate groups that keep every journey personal.', icon: 'Users' },
  { title: 'Safety & Support.', text: 'Attentive guidance before, during and after each trip.', icon: 'LifeBuoy' },
  { title: 'More Than Just a Trip.', text: 'Stories, learning and friendships that last beyond the journey.', icon: 'Heart' },
] as const;

export const TESTIMONIALS = [
  {
    quote: 'An unforgettable experience! The dives, the people and the entire trip was so well organized. Can’t wait for the next one!',
    author: 'Aashna, Mumbai',
    initial: 'A',
  },
];

export const DESTINATIONS = ['Lakshadweep', 'Andaman', 'Indonesia', 'Bali', 'and more...'];
