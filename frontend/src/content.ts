/**
 * Purva Ocean Adventures — Master Content & Integration Configuration
 * Verified details for Dr. Purva Thorat and the Maldives Scuba Diving Expedition.
 */

export const BRAND = {
  name: 'PURVA OCEAN ADVENTURES',
  shortName: 'Purva Ocean',
  tagline: 'Collecting shades of blue',
  description: 'Premium ocean-adventure and scuba-diving travel brand founded by Dr. Purva Thorat.',
};

/** Official Instagram Accounts */
export const INSTAGRAM_ACCOUNTS = {
  brand: {
    handle: '@purvaoceanadventures',
    url: 'https://www.instagram.com/purvaoceanadventures/',
    label: 'Brand Official Instagram',
  },
  host: {
    handle: '@dr.purvaa',
    url: 'https://www.instagram.com/dr.purvaa/',
    label: "Dr. Purva Thorat's Personal Profile",
  },
};

/** Primary profile URLs for backwards compatibility */
export const INSTAGRAM_URL = INSTAGRAM_ACCOUNTS.brand.url;
export const HOST_INSTAGRAM_URL = INSTAGRAM_ACCOUNTS.host.url;

/** Verified WhatsApp direct booking & inquiry line with pre-filled message */
export const WHATSAPP_RAW_NUMBER = '916262323232';
export const WHATSAPP_DISPLAY_NUMBER = '+91-6262323232';

export const WHATSAPP_MESSAGE =
  "Hello Purva Ocean Adventures! I'm interested in the Maldives Scuba Diving Trip from 22–27 November 2026. Please share the available packages, pricing, and booking details.";

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

/** Direct contact details */
export const CONTACT_INFO = {
  phone: '+91-6262323232',
  whatsapp: '+91-6262323232',
  email: 'purvaoceanadventures@gmail.com',
  location: 'Mumbai & Maafushi, Maldives',
};

/** Official Brochure Google Drive Link */
export const BROCHURE_URL =
  'https://drive.google.com/file/d/11J_x2Pb5RhOGKyvUK_aYSJfieT224Z53/view?usp=drivesdk';
export const BROCHURE_PREVIEW_URL =
  'https://drive.google.com/file/d/11J_x2Pb5RhOGKyvUK_aYSJfieT224Z53/preview';

/**
 * INTEGRATION POINT: inquiry / newsletter endpoint.
 */
export const INQUIRY_ENDPOINT = '/api/inquiry';

/**
 * Optional video film URL
 */
export const FILM_URL = '';

export const INTERESTS = [
  'Maldives Scuba Diving Trip (22–27 Nov 2026)',
  'PADI Open Water Certification (Beginners)',
  'PADI Advanced Open Water Certification',
  'Fun-Diving Packages (Certified Divers)',
  'Snorkelers & Non-Divers Ocean Experience',
  'General Expedition Inquiry',
] as const;

export const TRIP = {
  title: 'Maldives Scuba Diving Trip',
  expeditionTitle: 'Maldives Scuba Diving Expedition',
  destination: 'Maafushi, Maldives',
  island: 'Maafushi, Maldives',
  dates: '22–27 November 2026',
  duration: '5 Nights / 6 Days',
  groupSize: 'Maximum 10 participants',
  spots: 'Limited to 10 participants',
  hostName: 'Dr. Purva Thorat',
  hostRole: 'Physiotherapist and PADI Rescue Diver',
  description:
    'Experience turquoise Maldivian waters, vibrant coral pinnacles, and intimate ocean encounters in a small-group setting led by Dr. Purva Thorat.',
  heroSubtitle: '22–27 November 2026 | Maafushi, Maldives',

  overviewBlocks: [
    { label: 'Destination', value: 'Maafushi, Maldives', icon: 'MapPin' },
    { label: 'Duration', value: '5 Nights / 6 Days', icon: 'Clock' },
    { label: 'Dates', value: '22–27 November 2026', icon: 'Calendar' },
    { label: 'Group Size', value: 'Maximum 10 participants', icon: 'Users' },
  ],

  // 8 Confirmed Inclusions
  inclusions: [
    {
      label: 'Guided scuba-diving experiences',
      detail: 'Curated dives alongside certified dive professionals and Dr. Purva Thorat in South Malé atoll reefs.',
      icon: 'Waves',
    },
    {
      label: 'PADI Open Water certification option',
      detail: 'Beginner-friendly comprehensive certification track. No prior diving experience required to enroll.',
      icon: 'Award',
    },
    {
      label: 'PADI Advanced Open Water certification option',
      detail: 'Deep dive and navigation adventure dives to advance your skills and explore new underwater depths.',
      icon: 'Compass',
    },
    {
      label: 'Fun-diving packages for certified divers',
      detail: 'Tailored boat diving sessions visiting pinnacles, drift channels, and renowned marine cleaning stations.',
      icon: 'Sparkles',
    },
    {
      label: 'Five nights of accommodation',
      detail: '5 restful nights in comfortable beachside accommodation on the tranquil island of Maafushi.',
      icon: 'BedDouble',
    },
    {
      label: 'Airport speedboat transfers',
      detail: 'Scheduled roundtrip scenic speedboat transfers connecting Velana International Airport and Maafushi.',
      icon: 'Ship',
    },
    {
      label: 'Daily breakfast',
      detail: 'Nourishing daily breakfast prepared fresh each morning before heading out to the ocean.',
      icon: 'Coffee',
    },
    {
      label: 'Scuba-diving equipment',
      detail: 'High-standard scuba diving gear, tanks, and weights provided for scheduled expedition dives.',
      icon: 'Anchor',
    },
  ],

  beginnerNote:
    'Beginners can join the Open Water course without previous diving experience. Certification availability, prerequisites, medical fitness, and actual course arrangements must be confirmed with the organiser.',
  certifiedNote:
    'Certified divers can participate in guided fun-diving packages across world-class dive sites. Packages and prerequisites should be confirmed with the organiser.',

  itinerary: [
    {
      day: 'Day 1',
      title: 'Arrival & Scenic Speedboat Transfer',
      desc: 'Arrive at Velana International Airport (Malé). Board the scheduled speedboat transfer over azure waters to Maafushi. Check into accommodation, meet fellow expedition members, and attend the welcome orientation.',
    },
    {
      day: 'Day 2',
      title: 'Orientation & First Reef Dives',
      desc: 'Buoyancy alignment briefing with Dr. Purva. Orientation dive followed by afternoon reef exploration. Beginners commence initial skills practice while certified divers explore local coral pinnacles.',
    },
    {
      day: 'Day 3',
      title: 'Outer Reef & Marine Encounters',
      desc: 'Morning boat dives at top reef sites in South Malé atoll. Search for gliding sea turtles, reef fish colonies, and graceful pelagic life. Surface interval relaxation on tranquil Maldivian sands.',
    },
    {
      day: 'Day 4',
      title: 'Channel Drift Dives & Coral Walls',
      desc: 'Explore vibrant coral walls and gentle drift channels with certified dive guides. Mindful diving discussions with Dr. Purva focusing on aquatic wellness and marine conservation ethics.',
    },
    {
      day: 'Day 5',
      title: 'Deep Pinnacle Dives & Farewell Evening',
      desc: 'Final scheduled morning boat dives. Course completions, debriefs, and photo sharing. Gather for a memorable sunset beach dinner with the small group of ocean lovers.',
    },
    {
      day: 'Day 6',
      title: 'Farewell Breakfast & Return Transfer',
      desc: 'Enjoy daily breakfast overlooking the turquoise lagoon. Scheduled group speedboat transfer back to Velana International Airport with lasting memories and new dive friendships.',
    },
  ],

  pricingNotice:
    'Package pricing, room categories, and specific booking terms are provided in the official expedition brochure. Please consult the brochure or enquire on WhatsApp for up-to-date availability.',
};

export const HOST = {
  eyebrow: 'Meet Your Host',
  name: 'Dr. Purva Thorat',
  title: 'Physiotherapist | PADI Rescue Diver',
  role: 'Founder, Purva Ocean Adventures',
  quote:
    '“What started as a personal love for the ocean has grown into a space where I get to share my two biggest passions — diving and meaningful travel.\n\nThese trips are not just about ticking destinations, but about real experiences, like-minded people and a deeper connection with the ocean.”',
  bio: 'What started as a personal love for the ocean has grown into a space where Dr. Purva shares her two biggest passions — diving and meaningful travel. Combining her background as a licensed physiotherapist with PADI Rescue Diver certification, she approaches each expedition with a deep focus on diver comfort, aquatic ergonomics, mindfulness, and intimate small-group connection.',
  portrait: '/images/host-portrait.jpg',
  brandInstagram: INSTAGRAM_ACCOUNTS.brand.url,
  personalInstagram: INSTAGRAM_ACCOUNTS.host.url,
  verified: true,
};

export const EXPERIENCES = [
  {
    id: 'beginners',
    title: 'Beginners & Open Water',
    level: 'No Prior Experience Needed',
    text: 'Start your scuba journey with the PADI Open Water certification option. Gain underwater confidence with patient guidance, step-by-step briefings, and ergonomic buoyancy coaching from Dr. Purva.',
    image: '/images/coral-garden.jpg',
    interest: 'PADI Open Water Certification (Beginners)',
  },
  {
    id: 'certified',
    title: 'Certified Divers & Advanced',
    level: 'Fun-Dives & Advanced Certification',
    text: 'Explore South Malé atoll pinnacles, deep channels, and vibrant reefs with guided fun-diving packages or upgrade your skills with the PADI Advanced Open Water certification option.',
    image: '/images/diver-underwater.jpg',
    interest: 'Fun-Diving Packages (Certified Divers)',
  },
  {
    id: 'ocean-lovers',
    title: 'Ocean Explorers & Snorkelers',
    level: 'Mindful Ocean Travel',
    text: 'Experience the magic of the Maldives through warm turquoise lagoons, marine ecology workshops, vibrant sandbanks, and an intimate travel community capped at 10 participants.',
    image: '/images/maldives-aerial.jpg',
    interest: 'Snorkelers & Non-Divers Ocean Experience',
  },
];

export type GalleryCategory = 'All' | 'Underwater' | 'Corals' | 'Marine Life' | 'Divers';
export const GALLERY_CATEGORIES: GalleryCategory[] = ['All', 'Underwater', 'Corals', 'Marine Life', 'Divers'];

export const GALLERY = [
  {
    id: 'coral-garden',
    src: '/images/coral-garden.jpg',
    alt: 'Vibrant pristine coral reef garden in turquoise water, Maafushi Maldives',
    caption: 'Vibrant Coral Garden in South Malé Atoll',
    category: 'Corals' as GalleryCategory,
  },
  {
    id: 'manta',
    src: '/images/manta-ray.jpg',
    alt: 'Graceful manta ray swimming over reef formations in Maldives ocean',
    caption: 'Manta Ray Encounters in Clear Waters',
    category: 'Marine Life' as GalleryCategory,
  },
  {
    id: 'diver-underwater',
    src: '/images/diver-underwater.jpg',
    alt: 'Scuba diver exploring underwater marine life with calm buoyancy',
    caption: 'Mindful Diving & Buoyancy Exploration',
    category: 'Divers' as GalleryCategory,
  },
  {
    id: 'turtle',
    src: '/images/sea-turtle.jpg',
    alt: 'Sea turtle swimming peacefully in Maldivian waters',
    caption: 'Sea Turtle Encounter on the Outer Reef',
    category: 'Marine Life' as GalleryCategory,
  },
  {
    id: 'reef-fish',
    src: '/images/reef-fish.jpg',
    alt: 'Thriving reef fish swimming through corals',
    caption: 'Thriving Reef Formations & Marine Biodiversity',
    category: 'Corals' as GalleryCategory,
  },
  {
    id: 'divers-boat',
    src: '/images/divers-boat.jpg',
    alt: 'Divers preparing gear on speedboat in the Maldives',
    caption: 'Speedboat Journey to Island Dive Sites',
    category: 'Divers' as GalleryCategory,
  },
  {
    id: 'island-aerial',
    src: '/images/maldives-aerial.jpg',
    alt: 'Aerial photograph of Maafushi lagoon with turquoise water and tropical sands',
    caption: 'Maafushi Island & Surrounding Turquoise Atoll',
    category: 'Underwater' as GalleryCategory,
  },
];

export const ABOUT = {
  eyebrow: 'About Purva Ocean Adventures',
  title: 'Collecting Shades of Blue',
  lead: 'Purva Ocean Adventures was founded on a simple truth: the ocean heals us, and in return, we must honor and protect her.',
  mission:
    'Founded by Dr. Purva Thorat — a physiotherapist and PADI Rescue Diver — our trips are not about ticking off bucket lists. They are about real experiences, meaningful connections, respectful wildlife interactions, and sharing the quiet wonder of the ocean with an intimate group of like-minded travelers.',
  pillars: [
    {
      title: 'Ocean First & Reef Ethics',
      description: 'Zero-touch reef etiquette, respectful wildlife interaction distances, and marine ecology woven into every trip.',
      icon: 'Waves',
    },
    {
      title: 'Aquatic Ergonomics & Wellness',
      description: 'Drawing on Dr. Purva’s physiotherapy expertise for posture alignment, relaxed breathing, and mindful diving longevity.',
      icon: 'Heart',
    },
    {
      title: 'Maximum 10 Participants',
      description: 'Strictly limited group sizes to ensure safety, calm dive decks, personalized attention, and genuine lifelong friendships.',
      icon: 'Users',
    },
  ],
};

export const BENEFITS = [
  { title: 'Ocean First.', text: 'Respect for the reef and the animals we share it with.', icon: 'Waves' },
  { title: 'Curated Experiences.', text: 'Thoughtfully chosen dive sites and itineraries in Maafushi.', icon: 'Compass' },
  { title: 'Small Group Vibes.', text: 'Maximum 10 participants keeping every journey personal and safe.', icon: 'Users' },
  { title: 'Safety & Support.', text: 'Attentive guidance led by Dr. Purva Thorat (PADI Rescue Diver).', icon: 'LifeBuoy' },
  { title: 'More Than Just a Trip.', text: 'Stories, learning, and friendships that last far beyond the journey.', icon: 'Heart' },
] as const;

export const TESTIMONIALS = [
  {
    quote: 'An unforgettable experience! The dives, the people and the entire trip was so well organized. Can’t wait for the next one!',
    author: 'Aashna, Mumbai',
    initial: 'A',
  },
];

export const DESTINATIONS = ['Maldives (Maafushi)', 'Lakshadweep', 'Andaman', 'Indonesia', 'Bali', 'and more...'];
