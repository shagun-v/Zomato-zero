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
      <Header title="Zero understands the mission" subtitle="Minimal chat. Maximum action." />
      {loading ? (
        <>
          <SkeletonCard label="Parsing craving signals" />
          <SkeletonCard label="Combining context and memory" />
        </>
      ) : (
        <div className="card chat-card fade-in">
          <div className="message assistant">I detected a {state.insight?.detectedMood.toLowerCase()} mission. I will handle search, pricing, quantities and trade-offs.</div>
          <div className="message user">{state.prompt}</div>
          <div className="message assistant">{state.insight?.summary}</div>
          {state.insight?.multimodalNote ? <div className="message assistant">{state.insight.multimodalNote}</div> : null}
          <div className="chip-row wrap">
            {state.insight?.constraints.map((item) => <span key={item} className="chip chip-glow">{item}</span>)}
          </div>
        </div>
      )}
      <button className="primary-btn" onClick={() => navigate('/craving-radar')}>Open Craving Radar</button>
    </div>
  );
};
