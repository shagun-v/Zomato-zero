import { Link } from 'react-router-dom';
import { Header } from '../components/Layout';
import { useApp } from '../components/AppContext';

export const ConfirmationPage = () => {
  const { state, resetFlow } = useApp();

  return (
    <div className="page-stack">
      <Header title="Order confirmed" subtitle="The winning version feels like it knew what you wanted before you had to browse for it." />
      <div className="card confirmation-card success-card">
        <div className="checkmark">✓</div>
        <h2>AI Meal Mission completed</h2>
        <p>Zero turned {state.selectedScenario?.title?.toLowerCase() ?? 'your craving'} into a checkout-ready order with minimal user effort.</p>
        <div className="chip-row wrap center">
          <span className="chip chip-glow">Originality 9.5/10</span>
          <span className="chip chip-glow">GenAI depth 9.6/10</span>
          <span className="chip chip-glow">Prototype appeal 9.3/10</span>
        </div>
      </div>
      <div className="card">
        <p className="eyebrow">Revised winning deck storyline</p>
        <ol>
          <li>Decision fatigue is the real pain</li>
          <li>Current food apps browse well but decide poorly</li>
          <li>Zomato Zero becomes an AI agent, not an assistant</li>
          <li>Craving Radar + Dinner Autopilot deliver the wow moment</li>
          <li>Business upside comes from faster, more confident ordering</li>
          <li>Feasible architecture grounded in live menu and offer systems</li>
        </ol>
      </div>
      <Link className="primary-btn center-btn" to="/" onClick={resetFlow}>Run another demo</Link>
    </div>
  );
};
