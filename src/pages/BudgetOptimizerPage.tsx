import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Layout';
import { CartCard } from '../components/Cards';
import { useApp } from '../components/AppContext';
import { optimizeCart } from '../utils/ai';

const optimizerNotes = {
  balance: 'Keep the comfort hit while trimming unnecessary comparison work.',
  save: 'Find the cheapest version that still feels like the same craving.',
  protein: 'Push the basket toward protein density without redesigning the whole meal.',
};

export const BudgetOptimizerPage = () => {
  const navigate = useNavigate();
  const { state, updateCart } = useApp();
  const [mode, setMode] = useState<'save' | 'balance' | 'protein'>('balance');

  const optimized = useMemo(() => {
    if (!state.cart) return undefined;
    return optimizeCart(state.cart, mode);
  }, [mode, state.cart]);

  return (
    <div className="page-stack">
      <Header title="Budget Optimizer" subtitle="A Zomato-like cart step where Zero suggests the best trade-off instead of making users compare line by line." />

      <section className="card">
        <div className="chip-row wrap">
          <button className={`chip action-chip ${mode === 'balance' ? 'chip-selected' : ''}`} onClick={() => setMode('balance')}>Balanced</button>
          <button className={`chip action-chip ${mode === 'save' ? 'chip-selected' : ''}`} onClick={() => setMode('save')}>Save more</button>
          <button className={`chip action-chip ${mode === 'protein' ? 'chip-selected' : ''}`} onClick={() => setMode('protein')}>Protein goal</button>
        </div>
        <p className="subtitle top-gap-sm">{optimizerNotes[mode]}</p>
      </section>

      {optimized ? <CartCard cart={optimized} /> : <div className="card">No cart to optimize yet.</div>}

      <div className="grid-two">
        <button className="secondary-btn" onClick={() => optimized && updateCart(optimized)}>Apply changes</button>
        <button
          className="primary-btn"
          onClick={() => {
            if (optimized) updateCart(optimized);
            navigate('/cart');
          }}
        >
          Go to checkout
        </button>
      </div>
    </div>
  );
};
