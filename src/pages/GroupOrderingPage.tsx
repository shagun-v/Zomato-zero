import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Layout';
import { useApp } from '../components/AppContext';
import { getGroupSummary } from '../utils/ai';

export const GroupOrderingPage = () => {
  const navigate = useNavigate();
  const { state } = useApp();
  const summary = getGroupSummary();

  return (
    <div className="page-stack">
      <Header title="GroupSync Agent" subtitle="Future state: AI coordinates the group automatically instead of passing a phone around." />
      <div className="card">
        <p className="eyebrow">Resolved automatically</p>
        <div className="vertical-list compact">
          {summary.members.map((member) => (
            <div key={member.id} className="list-item avatar-item">
              <div className="avatar">{member.emoji}</div>
              <div>
                <strong>{member.name}</strong>
                <p className="muted">{member.preference}</p>
              </div>
              <span className="pill pill-soft">₹{member.budget}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="card success-card">
        <h3>Consensus achieved</h3>
        <p>{summary.note}</p>
        <div className="chip-row wrap">
          <span className="chip chip-glow">Auto split budget envelope</span>
          <span className="chip chip-glow">Veg-safe branch detected</span>
          <span className="chip chip-glow">Dessert included</span>
        </div>
      </div>
      <button className="primary-btn" onClick={() => navigate('/budget-optimizer')}>Continue to Budget Optimizer</button>
    </div>
  );
};
