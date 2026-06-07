import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Layout';
import { CartCard } from '../components/Cards';
import { useApp } from '../components/AppContext';
import { restaurants } from '../data/mockData';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { state } = useApp();
  const restaurant = restaurants.find((item) => item.id === state.cart?.restaurantId);
  const originalTotal = (state.cart?.total ?? 0) + (state.cart?.savings ?? 0);

  return (
    <div className="page-stack">
      <Header title="Checkout" subtitle="Use familiar Zomato checkout patterns: address, payment, bill summary and one clear CTA." />

      {state.cart ? <CartCard cart={state.cart} /> : <div className="card">Your AI cart will appear here.</div>}

      <section className="card">
        <div className="list-item"><span>Delivering to</span><strong>Home · HSR Layout</strong></div>
        <div className="list-item"><span>ETA</span><strong>{restaurant?.eta ?? '20-25 min'}</strong></div>
        <div className="list-item"><span>Payment</span><strong>UPI · One tap</strong></div>
        <div className="list-item"><span>Offer</span><strong>{restaurant?.offer ?? 'Applied by Zero'}</strong></div>
      </section>

      {state.cart ? (
        <section className="card">
          <p className="eyebrow">Bill summary</p>
          <div className="bill-breakdown">
            <div className="list-item"><span>Item total</span><strong>₹{originalTotal}</strong></div>
            <div className="list-item"><span>Delivery fee</span><strong className="success-text">FREE</strong></div>
            <div className="list-item"><span>Zero savings</span><strong>-₹{state.cart.savings}</strong></div>
            <div className="list-item grand-total"><span>To pay</span><strong>₹{state.cart.total}</strong></div>
          </div>
        </section>
      ) : null}

      <button className="primary-btn big-btn" onClick={() => navigate('/confirmation')}>Place order</button>
    </div>
  );
};
