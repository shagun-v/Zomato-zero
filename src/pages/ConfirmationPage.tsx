import { Link } from 'react-router-dom';
import { Header } from '../components/Layout';
import { useApp } from '../components/AppContext';
import { restaurants } from '../data/mockData';

export const ConfirmationPage = () => {
  const { state, resetFlow } = useApp();
  const restaurant = restaurants.find((item) => item.id === state.cart?.restaurantId);

  return (
    <div className="page-stack">
      <Header title="Order placed" subtitle="The win is that it now feels like Zomato placed a smart order for you, not like a separate AI product demo." />

      <section className="card confirmation-card success-card">
        <div className="checkmark">✓</div>
        <h2>{restaurant?.name ?? 'Your restaurant'} is preparing the order</h2>
        <p>Your {state.selectedScenario?.title?.toLowerCase() ?? 'meal'} is confirmed. Zero already handled the shortlist, basket logic and savings before checkout.</p>
        <div className="chip-row wrap center top-gap-sm">
          <span className="chip chip-glow">ETA {restaurant?.eta ?? '20-25 min'}</span>
          <span className="chip chip-glow">Delivery to Home</span>
          <span className="chip chip-glow">Paid via UPI</span>
        </div>
      </section>

      <section className="card">
        <p className="eyebrow">Live order status</p>
        <div className="timeline">
          <div className="timeline-item done"><span className="timeline-dot" /><span>Order confirmed</span></div>
          <div className="timeline-item done"><span className="timeline-dot" /><span>Restaurant accepted the order</span></div>
          <div className="timeline-item"><span className="timeline-dot" /><span>Food is being prepared</span></div>
          <div className="timeline-item"><span className="timeline-dot" /><span>Delivery partner will be assigned soon</span></div>
        </div>
      </section>

      <Link className="primary-btn center-btn" to="/" onClick={resetFlow}>Run another demo</Link>
    </div>
  );
};
