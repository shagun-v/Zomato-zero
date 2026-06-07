import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Layout';
import { useApp } from '../components/AppContext';

export const AskZeroPage = () => {
  const navigate = useNavigate();
  const { state, updateState, buildInsightNow } = useApp();

  const runZero = () => {
    buildInsightNow();
    navigate('/conversation');
  };

  return (
    <div className="page-stack">
      <Header title="Ask Zero" subtitle="Feed the agent mood, budget, occasion, health goal or multimodal clues." />

      <div className="card">
        <label className="label">Mood or craving</label>
        <input className="input" value={state.mood} onChange={(e) => updateState({ mood: e.target.value })} />
        <label className="label">Budget</label>
        <input className="input" type="number" value={state.budget} onChange={(e) => updateState({ budget: Number(e.target.value) })} />
        <label className="label">Occasion</label>
        <input className="input" value={state.occasion} onChange={(e) => updateState({ occasion: e.target.value })} />
        <label className="label">Health goal</label>
        <input className="input" value={state.healthGoal} onChange={(e) => updateState({ healthGoal: e.target.value })} />
        <label className="label">Prompt</label>
        <textarea className="input textarea" value={state.prompt} onChange={(e) => updateState({ prompt: e.target.value })} />
      </div>

      <div className="card">
        <p className="eyebrow">Multimodal inputs</p>
        <div className="chip-row wrap">
          {['photo', 'reel', 'recipe', 'voice'].map((type) => (
            <button key={type} className={`chip action-chip ${state.uploadedType === type ? 'chip-selected' : ''}`} onClick={() => updateState({ uploadedType: type as 'photo' | 'reel' | 'recipe' | 'voice', uploadedAsset: `${type} uploaded` })}>
              Upload {type}
            </button>
          ))}
        </div>
        <p className="muted">Zero can understand food photos, Instagram reel screenshots, recipe images and voice craving notes.</p>
      </div>

      <button className="primary-btn big-btn" onClick={runZero}>Start agent mission</button>
    </div>
  );
};
