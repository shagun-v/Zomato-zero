import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Layout';
import { ScenarioCard } from '../components/Cards';
import { scenarios } from '../data/mockData';
import { useApp } from '../components/AppContext';

export const HomePage = () => {
  const navigate = useNavigate();
  const { state, chooseScenario } = useApp();

  return (
    <div className="page-stack">
      <Header title="From craving to cart in 30 seconds" subtitle="An agentic, Doraemon-style version of Zomato that acts before you browse." />

      <section className="hero-card glass-card slide-up">
        <div>
          <p className="eyebrow">Winner version</p>
          <h2>Dinner Autopilot</h2>
          <p>Zero no longer suggests. It decides, builds, optimizes, and coordinates automatically.</p>
        </div>
        <button className="primary-btn" onClick={() => navigate('/ask-zero')}>Launch Zero</button>
      </section>

      <section>
        <div className="row-between section-title">
          <h3>Demo missions</h3>
          <span className="muted">5 Doraemon moments</span>
        </div>
        <div className="vertical-list">
          {scenarios.map((scenario) => (
            <ScenarioCard
              key={scenario.id}
              scenario={scenario}
              active={state.selectedScenario?.id === scenario.id}
              onClick={() => chooseScenario(scenario)}
            />
          ))}
        </div>
      </section>

      <section className="grid-two">
        <div className="card stat-card">
          <p className="eyebrow">Judge-ready critique</p>
          <h3>Why old Zero loses points</h3>
          <ul>
            <li>Too assistant-like</li>
            <li>Not enough proactive action</li>
            <li>Weak multimodal magic</li>
            <li>Low signature memorability</li>
          </ul>
        </div>
        <div className="card stat-card">
          <p className="eyebrow">What wins now</p>
          <h3>What upgraded Zero does</h3>
          <ul>
            <li>Acts on intent automatically</li>
            <li>Uses photo, reel, recipe and voice inputs</li>
            <li>Builds carts and group consensus</li>
            <li>Feels magical, still feasible</li>
          </ul>
        </div>
      </section>
    </div>
  );
};
