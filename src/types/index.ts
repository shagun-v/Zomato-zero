export type Mood = 'Comfort' | 'Party' | 'Healthy' | 'Late Night' | 'Budget' | 'Rainy Day';

export interface Dish {
  id: string;
  name: string;
  price: number;
  calories: number;
  protein: number;
  tags: string[];
  image: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  eta: string;
  rating: number;
  priceForTwo: number;
  offer: string;
  vibe: string[];
  image: string;
  dishes: Dish[];
}

export interface RecommendationPath {
  id: string;
  label: string;
  subtitle: string;
  restaurantId: string;
  reason: string;
  total: number;
  eta: string;
  confidence: number;
  focus: 'best' | 'value' | 'speed';
}

export interface CartItem extends Dish {
  quantity: number;
}

export interface Cart {
  restaurantId: string;
  items: CartItem[];
  total: number;
  savings: number;
  rationale: string[];
}

export interface Scenario {
  id: string;
  title: string;
  mood: string;
  budget: number;
  occasion: string;
  healthGoal: string;
  prompt: string;
  mediaType?: 'photo' | 'voice' | 'reel' | 'recipe';
}

export interface AgentInsight {
  summary: string;
  detectedMood: string;
  constraints: string[];
  multimodalNote?: string;
}

export interface GroupMember {
  id: string;
  name: string;
  preference: string;
  budget: number;
  emoji: string;
}

export interface AppState {
  prompt: string;
  mood: string;
  budget: number;
  occasion: string;
  healthGoal: string;
  uploadedAsset?: string;
  uploadedType?: 'photo' | 'voice' | 'reel' | 'recipe';
  selectedScenario?: Scenario;
  insight?: AgentInsight;
  selectedPathId?: string;
  cart?: Cart;
  groupMembers: GroupMember[];
}
