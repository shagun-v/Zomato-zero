import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Layout';
import { CartCard } from '../components/Cards';
import { useApp } from '../components/AppContext';
import { optimizeCart } from '../utils/ai';

export const BudgetOptimizerPage = () => {
  const navigate = useNavigate();
  const { state, updateCart } = useApp();
  const [mode, setMode] = useState<'save' | 'balance' | 'protein'>('balance');

  const optimized = useMemo(() => {
    if (!state.cart) return undefined;
    return optimizeCart(state.cart, mode);
  }, [state.cart, mode]);

  return (
    <div className="page-stack">
      <Header title="Budget Optimizer" subtitle="Zero proactively finds the best trade-off instead of asking you to compare line items." />
      <div className="chip-row wrap">
        <button className={`chip action-chip ${mode === 'balance' ? 'chip-selected' : ''}`} onClick={() => setMode('balance')}>Balanced</button>
        <button className={`chip action-chip ${mode === 'save' ? 'chip-selected' : ''}`} onClick={() => setMode('save')}>Save ₹</button>
        <button className={`chip action-chip ${mode === 'protein' ? 'chip-selected' : ''}`} onClick={() => setMode('protein')}>Protein goal</button>
      </div>
      {optimized ? <CartCard cart={optimized} /> : <div className="card">No cart to optimize yet.</div>}
      <div className="grid-two">
        <button className="secondary-btn" onClick={() => optimized && updateCart(optimized)}>Apply changes</button>
        <button className="primary-btn" onClick={() => { if (optimized) updateCart(optimized); navigate('/cart'); }}>Go to checkout</button>
      </div>
    </div>
  );
};
