import { RecommendationPath, Restaurant, Scenario, GroupMember } from '../types';

export const scenarios: Scenario[] = [
  {
    id: 'rainy',
    title: 'Rainy day comfort food',
    mood: 'Comfort',
    budget: 450,
    occasion: 'Solo cozy evening',
    healthGoal: 'Warm and satisfying',
    prompt: 'It is raining, I want something warm, comforting and slightly indulgent under ₹450.',
    mediaType: 'voice',
  },
  {
    id: 'movie-night',
    title: 'Movie night for 5 friends',
    mood: 'Party',
    budget: 1400,
    occasion: 'House party',
    healthGoal: 'Shareable variety',
    prompt: 'Movie night for 5 friends. One vegetarian, one wants spicy food, keep it fun and under ₹1400.',
    mediaType: 'reel',
  },
  {
    id: 'gym',
    title: 'Gym recovery meal',
    mood: 'Healthy',
    budget: 550,
    occasion: 'Post workout dinner',
    healthGoal: 'High protein under 750 kcal',
    prompt: 'Need a post workout meal with high protein, not boring, under ₹550.',
    mediaType: 'photo',
  },
  {
    id: 'late-night',
    title: 'Late-night craving',
    mood: 'Late Night',
    budget: 320,
    occasion: 'After midnight hunger',
    healthGoal: 'Fast arrival',
    prompt: 'Late-night craving. Something satisfying within 25 minutes and under ₹320.',
    mediaType: 'voice',
  },
  {
    id: 'instagram',
    title: 'Food from Instagram reel',
    mood: 'Comfort',
    budget: 700,
    occasion: 'Trend chase',
    healthGoal: 'Closest match to reel',
    prompt: 'I saw a cheesy spicy Korean bowl on Instagram. Find the closest thing and build a full order.',
    mediaType: 'reel',
  },
];

export const restaurants: Restaurant[] = [
  {
    id: 'rest1',
    name: 'Bowl Theory',
    cuisine: 'Healthy Bowls, Asian Fusion',
    eta: '22-28 min',
    rating: 4.6,
    priceForTwo: 650,
    offer: '20% OFF + free delivery',
    vibe: ['Healthy', 'Protein', 'Customisable'],
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
    dishes: [
      { id: 'd1', name: 'Korean Chicken Power Bowl', price: 289, calories: 540, protein: 38, tags: ['High Protein', 'Spicy'], image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80' },
      { id: 'd2', name: 'Tofu Kimchi Rice Bowl', price: 259, calories: 490, protein: 24, tags: ['Veg', 'Balanced'], image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80' },
      { id: 'd3', name: 'Protein Miso Soup', price: 139, calories: 120, protein: 10, tags: ['Add-on'], image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=80' },
    ],
  },
  {
    id: 'rest2',
    name: 'Monsoon Masala',
    cuisine: 'North Indian, Snacks',
    eta: '25-32 min',
    rating: 4.5,
    priceForTwo: 500,
    offer: 'Flat ₹125 OFF above ₹499',
    vibe: ['Comfort', 'Rainy Day', 'Soul Food'],
    image: 'https://images.unsplash.com/photo-1505253716362-afaea6c55e16?auto=format&fit=crop&w=900&q=80',
    dishes: [
      { id: 'd4', name: 'Butter Paneer Kulcha Combo', price: 249, calories: 620, protein: 21, tags: ['Comfort', 'Veg'], image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=80' },
      { id: 'd5', name: 'Chicken Keema Maggi Pot', price: 219, calories: 560, protein: 27, tags: ['Rainy Day', 'Spicy'], image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=900&q=80' },
      { id: 'd6', name: 'Masala Chai Flask', price: 99, calories: 110, protein: 3, tags: ['Add-on'], image: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?auto=format&fit=crop&w=900&q=80' },
    ],
  },
  {
    id: 'rest3',
    name: 'Night Owl Express',
    cuisine: 'Burgers, Wraps, Desserts',
    eta: '18-24 min',
    rating: 4.3,
    priceForTwo: 420,
    offer: 'Buy 1 Get 1 wraps',
    vibe: ['Late Night', 'Fast', 'Budget'],
    image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=900&q=80',
    dishes: [
      { id: 'd7', name: 'Smoky Chicken Wrap', price: 179, calories: 420, protein: 23, tags: ['Fast', 'Late Night'], image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=900&q=80' },
      { id: 'd8', name: 'Loaded Peri Peri Fries', price: 149, calories: 390, protein: 6, tags: ['Shareable'], image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=900&q=80' },
      { id: 'd9', name: 'Choco Lava Duo', price: 119, calories: 310, protein: 4, tags: ['Dessert'], image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=80' },
    ],
  },
  {
    id: 'rest4',
    name: 'Scene & Slice',
    cuisine: 'Pizza, Appetizers, Desserts',
    eta: '30-36 min',
    rating: 4.7,
    priceForTwo: 900,
    offer: 'Party combo at ₹1299',
    vibe: ['Group', 'Party', 'Movie Night'],
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80',
    dishes: [
      { id: 'd10', name: 'Half & Half Party Pizza', price: 499, calories: 980, protein: 32, tags: ['Shareable'], image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80' },
      { id: 'd11', name: 'Volcano Garlic Bread', price: 199, calories: 410, protein: 11, tags: ['Shareable', 'Veg'], image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=900&q=80' },
      { id: 'd12', name: 'Cocoa Brownie Tub', price: 229, calories: 520, protein: 7, tags: ['Dessert'], image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80' },
    ],
  },
];

export const recommendationMatrix: Record<string, RecommendationPath[]> = {
  rainy: [
    { id: 'p1', label: 'Best comfort fit', subtitle: 'Warm, cozy, monsoon-perfect', restaurantId: 'rest2', reason: 'Zero detected rainy weather comfort intent and picked warm mains with chai pairing.', total: 468, eta: '27 min', confidence: 96, focus: 'best' },
    { id: 'p2', label: 'Best value comfort', subtitle: 'Maximum warmth per rupee', restaurantId: 'rest3', reason: 'Fast wraps + fries deliver comfort while staying below budget.', total: 327, eta: '21 min', confidence: 88, focus: 'value' },
    { id: 'p3', label: 'Fastest cozy option', subtitle: 'Late-evening rescue', restaurantId: 'rest1', reason: 'Hot soup and spicy bowl arrive fastest without feeling heavy.', total: 428, eta: '22 min', confidence: 84, focus: 'speed' },
  ],
  'movie-night': [
    { id: 'p4', label: 'Best party spread', subtitle: 'Built for 5 people', restaurantId: 'rest4', reason: 'AI balanced one veg-friendly half, one spicy half, sides and dessert for a movie-night mood.', total: 1329, eta: '34 min', confidence: 97, focus: 'best' },
    { id: 'p5', label: 'Best value party', subtitle: 'Keeps energy high', restaurantId: 'rest3', reason: 'Wrap bundles and shareables keep the group under budget.', total: 1149, eta: '24 min', confidence: 87, focus: 'value' },
    { id: 'p6', label: 'Fastest group win', subtitle: 'Party starts now', restaurantId: 'rest2', reason: 'Crowd-pleasing comfort plates with lower prep complexity.', total: 1219, eta: '28 min', confidence: 82, focus: 'speed' },
  ],
  gym: [
    { id: 'p7', label: 'Best macro fit', subtitle: 'High protein, still fun', restaurantId: 'rest1', reason: 'AI matched your recovery goal to high-protein bowls and broth add-ons.', total: 428, eta: '23 min', confidence: 98, focus: 'best' },
    { id: 'p8', label: 'Best value protein', subtitle: 'Protein rupee winner', restaurantId: 'rest2', reason: 'Keema comfort with strong protein value, slightly heavier.', total: 318, eta: '29 min', confidence: 79, focus: 'value' },
    { id: 'p9', label: 'Fastest recovery', subtitle: 'Quick refuel', restaurantId: 'rest3', reason: 'Fast wrap route for when recovery and speed both matter.', total: 328, eta: '19 min', confidence: 76, focus: 'speed' },
  ],
  'late-night': [
    { id: 'p10', label: 'Best late-night fit', subtitle: 'Open now, hits the spot', restaurantId: 'rest3', reason: 'AI prioritized open kitchens, short ETA and craveable late-night items.', total: 298, eta: '20 min', confidence: 95, focus: 'best' },
    { id: 'p11', label: 'Best value at night', subtitle: 'Smartest under ₹320', restaurantId: 'rest2', reason: 'Single hot main + chai is cheapest satisfying combo.', total: 318, eta: '30 min', confidence: 80, focus: 'value' },
    { id: 'p12', label: 'Fastest warm meal', subtitle: 'For urgent hunger', restaurantId: 'rest1', reason: 'Soup-first route lands quickly and feels lighter post-midnight.', total: 398, eta: '22 min', confidence: 73, focus: 'speed' },
  ],
  instagram: [
    { id: 'p13', label: 'Closest reel match', subtitle: 'Trend reconstructed by AI', restaurantId: 'rest1', reason: 'Multimodal matching found the closest Korean-style bowl profile and recreated the full meal.', total: 528, eta: '24 min', confidence: 97, focus: 'best' },
    { id: 'p14', label: 'Best value reel dupe', subtitle: 'Same vibe, lower cost', restaurantId: 'rest3', reason: 'Spicy wrap stack delivers a similar cheesy-spicy payoff for less.', total: 357, eta: '21 min', confidence: 82, focus: 'value' },
    { id: 'p15', label: 'Fastest trend fix', subtitle: 'Quickest similar hit', restaurantId: 'rest2', reason: 'Closest warm spicy comfort interpretation with faster prep than pizza routes.', total: 448, eta: '27 min', confidence: 76, focus: 'speed' },
  ],
};

export const demoGroupMembers: GroupMember[] = [
  { id: 'g1', name: 'Ava', preference: 'Vegetarian, cheesy, no mushrooms', budget: 300, emoji: '🧀' },
  { id: 'g2', name: 'Kabir', preference: 'Extra spicy, wants chicken', budget: 350, emoji: '🌶️' },
  { id: 'g3', name: 'Riya', preference: 'Needs dessert', budget: 250, emoji: '🍫' },
  { id: 'g4', name: 'Neil', preference: 'Budget-conscious, wants filling', budget: 220, emoji: '💸' },
];
