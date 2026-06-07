import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Layout';
import { CartCard } from '../components/Cards';
import { useApp } from '../components/AppContext';
import { restaurants } from '../data/mockData';
import { getAutopilotTimeline } from '../utils/ai';

export const DinnerAutopilotPage = () => {
  const navigate = useNavigate();
  const { state } = useApp();
  const [step, setStep] = useState(0);
  const steps = getAutopilotTimeline();
  const restaurant = restaurants.find((item) => item.id === state.cart?.restaurantId);

  useEffect(() => {
    if (!state.cart) return;
    if (step >= steps.length - 1) return;
    const timer = setTimeout(() => setStep((prev) => prev + 1), 750);
    return () => clearTimeout(timer);
  }, [state.cart, step, steps.length]);

  return (
    <div className="page-stack">
      <Header title="Dinner Autopilot" subtitle="A real Zomato-style order flow where the AI layer decides, sizes and optimizes in the background." />

      {restaurant ? (
        <section className="autopilot-hero">
          <img src={restaurant.image} alt={restaurant.name} className="autopilot-hero-image" />
          <div className="autopilot-hero-copy">
            <div className="row-between align-start">
              <div>
                <p className="eyebrow">Zero selected</p>
                <h3>{restaurant.name}</h3>
                <p className="restaurant-subtitle">{restaurant.cuisine}</p>
              </div>
              <span className="rating-badge">★ {restaurant.rating}</span>
            </div>
            <div className="chip-row wrap top-gap-sm">
              <span className="meta-chip">{restaurant.eta}</span>
              <span className="meta-chip">{restaurant.offer}</span>
              <span className="meta-chip">₹{restaurant.priceForTwo} for two</span>
            </div>
          </div>
        </section>
      ) : null}

      <section className="card">
        <p className="eyebrow">Autopilot progress</p>
        <div className="timeline">
          {steps.map((item, index) => (
            <div key={item} className={`timeline-item ${index <= step ? 'done' : ''}`}>
              <span className="timeline-dot" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {state.cart ? <CartCard cart={state.cart} /> : <div className="card">Select a recommendation path first.</div>}

      <div className="grid-two">
        <button className="secondary-btn" onClick={() => navigate('/group-ordering')}>Open GroupSync</button>
        <button className="primary-btn" onClick={() => navigate('/budget-optimizer')}>Auto optimise</button>
      </div>
    </div>
  );
};
