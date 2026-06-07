import { demoGroupMembers, recommendationMatrix, restaurants } from '../data/mockData';
import { AgentInsight, AppState, Cart, RecommendationPath } from '../types';

const detectMood = (prompt: string) => {
  const lower = prompt.toLowerCase();
  if (lower.includes('protein') || lower.includes('gym') || lower.includes('healthy')) return 'Healthy';
  if (lower.includes('friends') || lower.includes('party') || lower.includes('movie')) return 'Party';
  if (lower.includes('late') || lower.includes('midnight')) return 'Late Night';
  if (lower.includes('rain') || lower.includes('comfort')) return 'Rainy Day';
  return 'Comfort';
};

export const buildInsight = (state: AppState): AgentInsight => {
  const mood = state.mood || detectMood(state.prompt);
  const constraints = [
    `Budget cap: ₹${state.budget || 500}`,
    state.occasion || 'Personal meal context',
    state.healthGoal || 'Taste-first decision',
  ];

  const multimodalMap: Record<string, string> = {
    photo: 'Photo vision matched visible ingredients, texture and plating style.',
    voice: 'Voice tone analysis detected urgency and craving intensity.',
    reel: 'Reel understanding inferred trending flavor profile and social context.',
    recipe: 'Recipe screenshot parsing extracted dish type and probable ingredients.',
  };

  return {
    summary: `Zero inferred a ${mood.toLowerCase()} mission and compressed the search space into decision-ready order paths.`,
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
      'AI balanced mood, price and ETA automatically',
      'Offer stack applied without manual coupon hunting',
      path.focus === 'best' ? 'Quantities auto-sized for the occasion' : 'Optimized for the chosen decision mode',
    ],
  };
};

export const optimizeCart = (cart: Cart, mode: 'save' | 'balance' | 'protein'): Cart => {
  const items = [...cart.items];
  let savings = cart.savings;
  let rationale = [...cart.rationale];

  if (mode === 'save') {
    const adjustedItems = items.map((item, index) => index === items.length - 1 ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item).filter((item) => item.quantity > 0);
    const total = adjustedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    savings += 110;
    rationale = ['Removed lowest-priority indulgence', 'Applied better basket threshold offer', 'Kept the meal mood intact'];
    return { ...cart, items: adjustedItems, total, savings, rationale };
  }

  if (mode === 'protein') {
    const upgraded = items.map((item) => item.protein < 12 ? { ...item, quantity: 0 } : item).filter((item) => item.quantity > 0);
    const restaurant = restaurants.find((rest) => rest.id === cart.restaurantId) || restaurants[0];
    const proteinAdd = restaurant.dishes.find((dish) => dish.protein > 30);
    const adjusted = proteinAdd && !upgraded.some((item) => item.id === proteinAdd.id)
      ? [...upgraded, { ...proteinAdd, quantity: 1 }]
      : upgraded;
    const total = adjusted.reduce((sum, item) => sum + item.price * item.quantity, 0);
    rationale = ['Swapped low-protein filler', 'Locked meal above your recovery threshold', 'Calories stayed within the stated goal'];
    return { ...cart, items: adjusted, total, savings, rationale };
  }

  rationale = ['Balanced value and delight', 'Kept one indulgent element', 'Protected delivery speed'];
  return { ...cart, rationale };
};

export const getAutopilotTimeline = () => [
  'Reading your context',
  'Scanning restaurants and open kitchens',
  'Matching dishes to mood and health goal',
  'Applying offers and quantity logic',
  'Building a checkout-ready cart',
];

export const getGroupSummary = () => ({
  members: demoGroupMembers,
  note: 'Zero found one vegetarian-safe base, one spicy branch, one dessert close and kept everyone inside the group budget envelope.',
});
