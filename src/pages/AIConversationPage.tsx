import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Layout';
import { SkeletonCard } from '../components/Cards';
import { useApp } from '../components/AppContext';

export const AIConversationPage = () => {
  const navigate = useNavigate();
  const { state } = useApp();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="page-stack">
      <Header title="Zero is narrowing it down" subtitle="The AI layer now feels like restaurant discovery, not a chatbot detour." />

      {loading ? (
        <>
          <SkeletonCard label="Reading mood, budget and context" />
          <SkeletonCard label="Checking nearby kitchens, offers and delivery ETAs" />
        </>
      ) : (
        <>
          <section className="assistant-summary-card">
            <p className="eyebrow">Mission understood</p>
            <h3>{state.insight?.summary}</h3>
            <div className="quote-box">“{state.prompt}”</div>
            <div className="chip-row wrap top-gap-sm">
              {state.insight?.constraints.map((item) => (
                <span key={item} className="chip chip-glow">{item}</span>
              ))}
            </div>
          </section>

          <section className="card">
            <p className="eyebrow">What Zero picked up</p>
            <div className="activity-list">
              <div className="activity-item">
                <span className="activity-dot" />
                <div>
                  <strong>{state.insight?.detectedMood} intent detected</strong>
                  <p className="subtitle">The shortlist will prioritize places that match the exact vibe, not just cuisine keywords.</p>
                </div>
              </div>
              {state.insight?.multimodalNote ? (
                <div className="activity-item">
                  <span className="activity-dot" />
                  <div>
                    <strong>Multimodal clue translated</strong>
                    <p className="subtitle">{state.insight.multimodalNote}</p>
                  </div>
                </div>
              ) : null}
              <div className="activity-item">
                <span className="activity-dot" />
                <div>
                  <strong>Live restaurant scan in progress</strong>
                  <p className="subtitle">Zero is comparing open kitchens, pricing, offers and delivery speed before you see a shortlist.</p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      <button className="primary-btn big-btn" onClick={() => navigate('/craving-radar')}>Open Craving Radar</button>
    </div>
  );
};
