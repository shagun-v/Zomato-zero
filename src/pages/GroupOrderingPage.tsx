import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Layout';
import { useApp } from '../components/AppContext';
import { getGroupSummary } from '../utils/ai';

export const GroupOrderingPage = () => {
  const navigate = useNavigate();
  const { state } = useApp();
  const summary = getGroupSummary();
  const members = state.groupMembers.length ? state.groupMembers : summary.members;

  return (
    <div className="page-stack">
      <Header title="GroupSync Agent" subtitle="Keep the collaborative feature, but make it feel like a shared Zomato order instead of a systems demo." />

      <section className="friend-grid">
        {members.map((member) => (
          <article key={member.id} className="friend-card">
            <div className="friend-avatar">{member.emoji}</div>
            <div>
              <h4>{member.name}</h4>
              <p className="subtitle small-copy">{member.preference}</p>
            </div>
            <span className="budget-pill">₹{member.budget}</span>
          </article>
        ))}
      </section>

      <section className="card">
        <p className="eyebrow">Preference signals resolved</p>
        <div className="chip-row wrap">
          <span className="chip chip-glow">Vegetarian-safe branch</span>
          <span className="chip chip-glow">Spicy option preserved</span>
          <span className="chip chip-glow">Dessert lane included</span>
          <span className="chip chip-glow">Shared budget protected</span>
        </div>
        <p className="subtitle top-gap-sm">{summary.note}</p>
      </section>

      <section className="card success-card">
        <p className="eyebrow">How it feels in the product</p>
        <div className="activity-list compact-list">
          <div className="activity-item">
            <span className="activity-dot" />
            <div>
              <strong>Friend cards replace long text explanations</strong>
              <p className="subtitle">Avatars, budgets and conflict signals are visible at a glance.</p>
            </div>
          </div>
          <div className="activity-item">
            <span className="activity-dot" />
            <div>
              <strong>Consensus happens before checkout</strong>
              <p className="subtitle">Zero resolves trade-offs first, then hands over one shared basket.</p>
            </div>
          </div>
        </div>
      </section>

      <button className="primary-btn big-btn" onClick={() => navigate('/budget-optimizer')}>Continue to Budget Optimizer</button>
    </div>
  );
};
