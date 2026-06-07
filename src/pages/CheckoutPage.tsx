import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Layout';
import { CartCard } from '../components/Cards';
import { useApp } from '../components/AppContext';
import { restaurants } from '../data/mockData';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { state } = useApp();
  const restaurant = restaurants.find((item) => item.id === state.cart?.restaurantId);

  return (
    <div className="page-stack">
      <Header title="Checkout" subtitle="Zero already handled selection, quantity logic, offers and conflict resolution." />
      {state.cart ? <CartCard cart={state.cart} /> : <div className="card">Your AI cart will appear here.</div>}
      <div className="card">
        <div className="list-item">
          <span>Delivery to</span>
          <strong>Home • 20 mins away</strong>
        </div>
        <div className="list-item">
          <span>Payment</span>
          <strong>UPI • one tap</strong>
        </div>
        <div className="list-item">
          <span>Offer engine</span>
          <strong>{restaurant?.offer ?? 'Auto-applied by Zero'}</strong>
        </div>
      </div>
      <button className="primary-btn big-btn" onClick={() => navigate('/confirmation')}>Place order</button>
    </div>
  );
};
