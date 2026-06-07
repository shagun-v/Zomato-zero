import { demoGroupMembers, recommendationMatrix, restaurants } from '../data/mockData';
import { AgentInsight, AppState, Cart, RecommendationPath } from '../types';

const detectMood = (prompt: string) => {
  const lower = prompt.toLowerCase();
  if (lower.includes('protein') || lower.includes('gym') || lower.includes('healthy')) return 'Healthy';
  if (lower.includes('friends') || lower.includes('party') || lower.includes('movie')) return 'Party';
  if (lower.includes('late') || lower.includes('midnight')) return 'Late Night';
  if (lower.includes('rain') || lower.includes('comfort')) return 'Comfort';
  return 'Comfort';
};

export const buildInsight = (state: AppState): AgentInsight => {
  const mood = state.mood || detectMood(state.prompt);
  const constraints = [
    `Under ₹${state.budget || 500}`,
    state.occasion || 'Fits the moment',
    state.healthGoal || 'Taste-first picks',
  ];

  const multimodalMap: Record<string, string> = {
    photo: 'Photo clues matched visible ingredients, cuisine style and portion expectations.',
    voice: 'Voice note cues suggested urgency, warmth and craving intensity.',
    reel: 'Reel clues pointed to a trending flavour profile and social context.',
    recipe: 'Recipe clues extracted ingredients and mapped them to nearby menus.',
  };

  return {
    summary: `I am prioritising ${mood.toLowerCase()} food, fast delivery and baskets that stay inside your budget without losing the vibe.`,
    detectedMood: mood,
    constraints,
    multimodalNote: state.uploadedType ? multimodalMap[state.uploadedType] : undefined,
  };
};

export const getRecommendationPaths = (state: AppState): RecommendationPath[] => {
  const key = state.selectedScenario?.id ?? 'rainy';
  return recommendationMatrix[key] ?? recommendationMatrix.rainy;
};

export const buildCartFromPath = (pathId: string): Cart => {
  const path = Object.values(recommendationMatrix).flat().find((item) => item.id === pathId) || recommendationMatrix.rainy[0];
  const restaurant = restaurants.find((item) => item.id === path.restaurantId) || restaurants[0];

  let items = restaurant.dishes.slice(0, 2).map((dish, index) => ({
    ...dish,
    quantity: path.focus === 'best' && index === 0 ? 2 : 1,
  }));

  if (path.focus === 'best' && restaurant.dishes[2]) {
    items = [...items, { ...restaurant.dishes[2], quantity: 1 }];
  }

  if (path.id === 'p4') {
    items = restaurant.dishes.map((dish, index) => ({ ...dish, quantity: index === 0 ? 2 : 1 }));
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return {
    restaurantId: restaurant.id,
    items,
    total,
    savings: Math.round(total * 0.14),
    rationale: [
      'Matched to mood, budget and ETA automatically',
      'Best available restaurant offer applied',
      path.focus === 'best' ? 'Portions auto-sized for the occasion' : 'Tuned for your chosen decision mode',
    ],
  };
};

export const optimizeCart = (cart: Cart, mode: 'save' | 'balance' | 'protein'): Cart => {
  const items = [...cart.items];
  let savings = cart.savings;
  let rationale = [...cart.rationale];

  if (mode === 'save') {
    const adjustedItems = items
      .map((item, index) => (index === items.length - 1 ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item))
      .filter((item) => item.quantity > 0);
    const total = adjustedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    savings += 110;
    rationale = ['Removed the least-essential indulgence', 'Unlocked a better basket-level offer', 'Protected the core craving experience'];
    return { ...cart, items: adjustedItems, total, savings, rationale };
  }

  if (mode === 'protein') {
    const upgraded = items.map((item) => (item.protein < 12 ? { ...item, quantity: 0 } : item)).filter((item) => item.quantity > 0);
    const restaurant = restaurants.find((rest) => rest.id === cart.restaurantId) || restaurants[0];
    const proteinAdd = restaurant.dishes.find((dish) => dish.protein > 30);
    const adjusted = proteinAdd && !upgraded.some((item) => item.id === proteinAdd.id)
      ? [...upgraded, { ...proteinAdd, quantity: 1 }]
      : upgraded;
    const total = adjusted.reduce((sum, item) => sum + item.price * item.quantity, 0);
    rationale = ['Dropped low-protein filler', 'Pushed the meal toward the fitness goal', 'Kept calories closer to the stated target'];
    return { ...cart, items: adjusted, total, savings, rationale };
  }

  rationale = ['Balanced comfort and value', 'Kept one indulgent element', 'Avoided slower restaurant swaps'];
  return { ...cart, rationale };
};

export const getAutopilotTimeline = () => [
  'Reading your craving signals',
  'Checking nearby restaurants and open kitchens',
  'Matching dishes to mood and health goal',
  'Applying offers and quantity logic',
  'Building a checkout-ready cart',
];

export const getGroupSummary = () => ({
  members: demoGroupMembers,
  note: 'Zero found one veg-safe base, one spicy branch and one dessert lane while keeping the basket inside the shared budget.',
});
