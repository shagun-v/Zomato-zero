import { recommendationMatrix, restaurants } from '../data/mockData';
import { Cart, RecommendationPath, Restaurant, Scenario } from '../types';

const getScenarioRestaurant = (scenarioId: string) => {
  const topPath = recommendationMatrix[scenarioId]?.[0];
  return restaurants.find((restaurant) => restaurant.id === topPath?.restaurantId) ?? restaurants[0];
};

const focusLabels: Record<RecommendationPath['focus'], string> = {
  best: 'Best overall',
  value: 'Best value',
  speed: 'Fastest ETA',
};

export const ScenarioCard = ({ scenario, active, onClick }: { scenario: Scenario; active?: boolean; onClick: () => void }) => {
  const restaurant = getScenarioRestaurant(scenario.id);
  const image = restaurant.dishes[0]?.image ?? restaurant.image;

  return (
    <button className={`mission-card ${active ? 'is-active' : ''}`} onClick={onClick}>
      <img src={image} alt={scenario.title} className="mission-thumb" />
      <div className="mission-copy">
        <div className="row-between align-start">
          <div>
            <span className="tiny-label">Zero mission</span>
            <h4>{scenario.title}</h4>
          </div>
          <span className="budget-pill">₹{scenario.budget}</span>
        </div>
        <p>{scenario.prompt}</p>
        <div className="chip-row wrap">
          <span className="chip chip-soft">{scenario.mood}</span>
          <span className="chip chip-soft">{scenario.occasion}</span>
          <span className="chip chip-soft">{restaurant.name}</span>
        </div>
      </div>
    </button>
  );
};

export const RecommendationCard = ({ path, onSelect }: { path: RecommendationPath; onSelect: () => void }) => {
  const restaurant = restaurants.find((item) => item.id === path.restaurantId) ?? restaurants[0];
  const featuredDishes = restaurant.dishes.slice(0, 2);

  return (
    <button className="restaurant-card recommendation-card slide-up" onClick={onSelect}>
      <div className="restaurant-media-wrap">
        <img src={restaurant.image} alt={restaurant.name} className="restaurant-media" />
        <span className="offer-badge">{restaurant.offer}</span>
        <span className="fit-badge">{path.confidence}% fit</span>
      </div>

      <div className="restaurant-content">
        <div className="row-between align-start">
          <div>
            <div className="chip-row compact-row">
              <span className="smart-tag">{focusLabels[path.focus]}</span>
              <span className="tiny-muted">AI path</span>
            </div>
            <h3>{restaurant.name}</h3>
            <p className="restaurant-subtitle">{restaurant.cuisine}</p>
          </div>
          <span className="rating-badge">★ {restaurant.rating}</span>
        </div>

        <div className="chip-row wrap top-gap-sm">
          <span className="meta-chip">{restaurant.eta}</span>
          <span className="meta-chip">₹{restaurant.priceForTwo} for two</span>
          <span className="meta-chip">{path.label}</span>
        </div>

        <p className="reason-text">{path.reason}</p>

        <div className="dish-pill-row">
          {featuredDishes.map((dish) => (
            <div key={dish.id} className="dish-pill">
              <img src={dish.image} alt={dish.name} />
              <div>
                <strong>{dish.name}</strong>
                <small>₹{dish.price}</small>
              </div>
            </div>
          ))}
        </div>

        <div className="row-between total-row-lite">
          <div>
            <strong>₹{path.total}</strong>
            <span className="tiny-muted"> · {path.eta}</span>
          </div>
          <span className="select-link">Build cart →</span>
        </div>
      </div>
    </button>
  );
};

export const RestaurantFeedCard = ({
  restaurant,
  caption,
  onClick,
}: {
  restaurant: Restaurant;
  caption: string;
  onClick: () => void;
}) => (
  <button className="restaurant-card home-feed-card" onClick={onClick}>
    <div className="restaurant-media-wrap compact-media">
      <img src={restaurant.image} alt={restaurant.name} className="restaurant-media" />
      <span className="offer-badge">{restaurant.offer}</span>
    </div>
    <div className="restaurant-content">
      <div className="row-between align-start">
        <div>
          <h3>{restaurant.name}</h3>
          <p className="restaurant-subtitle">{restaurant.cuisine}</p>
        </div>
        <span className="rating-badge">★ {restaurant.rating}</span>
      </div>
      <div className="chip-row wrap top-gap-sm">
        <span className="meta-chip">{restaurant.eta}</span>
        <span className="meta-chip">₹{restaurant.priceForTwo} for two</span>
      </div>
      <p className="reason-text">{caption}</p>
      <div className="chip-row wrap top-gap-sm">
        {restaurant.vibe.map((vibe) => (
          <span key={vibe} className="chip chip-soft">{vibe}</span>
        ))}
      </div>
    </div>
  </button>
);

export const CartCard = ({ cart }: { cart: Cart }) => {
  const restaurant = restaurants.find((item) => item.id === cart.restaurantId) ?? restaurants[0];
  const itemTotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="order-card fade-in">
      <div className="order-head">
        <img src={restaurant.image} alt={restaurant.name} className="order-restaurant-thumb" />
        <div>
          <p className="eyebrow">Checkout-ready cart</p>
          <h3>{restaurant.name}</h3>
          <p className="restaurant-subtitle">{restaurant.cuisine} • {restaurant.eta}</p>
        </div>
        <span className="save-pill">Save ₹{cart.savings}</span>
      </div>

      <div className="order-items">
        {cart.items.map((item) => (
          <div key={item.id} className="order-item">
            <img src={item.image} alt={item.name} className="order-item-thumb" />
            <div className="order-item-copy">
              <div className="row-between align-start">
                <div>
                  <strong>{item.name}</strong>
                  <p className="tiny-muted">{item.tags.join(' • ')}</p>
                </div>
                <strong>₹{item.price * item.quantity}</strong>
              </div>
              <div className="chip-row wrap compact-row top-gap-sm">
                <span className="chip chip-soft">Qty {item.quantity}</span>
                <span className="chip chip-soft">{item.protein}g protein</span>
                <span className="chip chip-soft">{item.calories} kcal</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rationale-box">
        {cart.rationale.map((line) => (
          <span key={line} className="chip chip-glow">{line}</span>
        ))}
      </div>

      <div className="bill-breakdown top-gap-md">
        <div className="list-item"><span>Item total</span><strong>₹{itemTotal + cart.savings}</strong></div>
        <div className="list-item"><span>Offers applied by Zero</span><strong>-₹{cart.savings}</strong></div>
        <div className="list-item"><span>Delivery fee</span><strong className="success-text">FREE</strong></div>
        <div className="list-item grand-total"><span>To pay</span><strong>₹{cart.total}</strong></div>
      </div>
    </div>
  );
};

export const SkeletonCard = ({ label }: { label: string }) => (
  <div className="restaurant-card skeleton-card pulse">
    <div className="skeleton-media" />
    <div className="restaurant-content">
      <div className="skeleton-line large" />
      <div className="skeleton-line" />
      <div className="skeleton-line short" />
      <p className="tiny-muted">{label}</p>
    </div>
  </div>
);
