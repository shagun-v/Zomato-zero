import { restaurants } from '../data/mockData';
import { Cart, RecommendationPath, Scenario } from '../types';

export const ScenarioCard = ({ scenario, active, onClick }: { scenario: Scenario; active?: boolean; onClick: () => void }) => (
  <button className={`card scenario-card ${active ? 'card-active' : ''}`} onClick={onClick}>
    <div className="row-between">
      <strong>{scenario.title}</strong>
      <span className="pill pill-soft">₹{scenario.budget}</span>
    </div>
    <p>{scenario.prompt}</p>
    <div className="chip-row">
      <span className="chip">{scenario.mood}</span>
      <span className="chip">{scenario.occasion}</span>
    </div>
  </button>
);

export const RecommendationCard = ({ path, onSelect }: { path: RecommendationPath; onSelect: () => void }) => {
  const restaurant = restaurants.find((item) => item.id === path.restaurantId)!;
  return (
    <button className="card path-card slide-up" onClick={onSelect}>
      <img src={restaurant.image} alt={restaurant.name} className="path-image" />
      <div className="path-body">
        <div className="row-between">
          <span className={`pill ${path.focus === 'best' ? 'pill-primary' : ''}`}>{path.label}</span>
          <span className="confidence">{path.confidence}% fit</span>
        </div>
        <h3>{restaurant.name}</h3>
        <p className="muted">{path.subtitle}</p>
        <p>{path.reason}</p>
        <div className="metric-grid">
          <div><small>ETA</small><strong>{path.eta}</strong></div>
          <div><small>Total</small><strong>₹{path.total}</strong></div>
          <div><small>Offer</small><strong>{restaurant.offer}</strong></div>
        </div>
      </div>
    </button>
  );
};

export const CartCard = ({ cart }: { cart: Cart }) => {
  const restaurant = restaurants.find((item) => item.id === cart.restaurantId)!;
  return (
    <div className="card cart-card fade-in">
      <div className="row-between">
        <div>
          <p className="eyebrow">Checkout-ready cart</p>
          <h3>{restaurant.name}</h3>
        </div>
        <span className="pill pill-primary">Save ₹{cart.savings}</span>
      </div>
      <div className="list-stack">
        {cart.items.map((item) => (
          <div key={item.id} className="list-item">
            <div>
              <strong>{item.quantity}× {item.name}</strong>
              <p className="muted">{item.tags.join(' • ')}</p>
            </div>
            <strong>₹{item.price * item.quantity}</strong>
          </div>
        ))}
      </div>
      <div className="rationale-box">
        {cart.rationale.map((line) => <span key={line} className="chip chip-glow">{line}</span>)}
      </div>
      <div className="row-between total-row"><span>Total</span><strong>₹{cart.total}</strong></div>
    </div>
  );
};

export const SkeletonCard = ({ label }: { label: string }) => (
  <div className="card skeleton-card pulse">
    <div className="skeleton-line large" />
    <div className="skeleton-line" />
    <div className="skeleton-line short" />
    <p className="muted">{label}</p>
  </div>
);
