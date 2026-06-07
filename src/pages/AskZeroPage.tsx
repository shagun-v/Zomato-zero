import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Layout';
import { useApp } from '../components/AppContext';
import { scenarios } from '../data/mockData';

const inputTypes: Array<'photo' | 'reel' | 'recipe' | 'voice'> = ['photo', 'reel', 'recipe', 'voice'];

export const AskZeroPage = () => {
  const navigate = useNavigate();
  const { state, updateState, buildInsightNow, chooseScenario } = useApp();

  const runZero = () => {
    buildInsightNow();
    navigate('/conversation');
  };

  return (
    <div className="page-stack">
      <Header title="Ask Zero" subtitle="Describe the craving once. Zero fills the blanks, reads the clues and narrows live options nearby." />

      <section className="smart-sheet">
        <p className="tiny-muted uppercase">Your order mission</p>
        <textarea
          className="input mission-input"
          value={state.prompt}
          onChange={(e) => updateState({ prompt: e.target.value })}
          placeholder="It is raining, I want something warm and comforting under ₹450"
        />

        <div className="grid-two top-gap-md">
          <div className="field-card">
            <label className="label">Mood</label>
            <input className="input compact-input" value={state.mood} onChange={(e) => updateState({ mood: e.target.value })} />
          </div>
          <div className="field-card">
            <label className="label">Budget</label>
            <input className="input compact-input" type="number" value={state.budget} onChange={(e) => updateState({ budget: Number(e.target.value) })} />
          </div>
          <div className="field-card">
            <label className="label">Occasion</label>
            <input className="input compact-input" value={state.occasion} onChange={(e) => updateState({ occasion: e.target.value })} />
          </div>
          <div className="field-card">
            <label className="label">Health goal</label>
            <input className="input compact-input" value={state.healthGoal} onChange={(e) => updateState({ healthGoal: e.target.value })} />
          </div>
        </div>
      </section>

      <section className="card">
        <div className="section-row no-margin">
          <div>
            <p className="eyebrow">Multimodal clues</p>
            <h3 className="tight-title">Start from a photo, reel, recipe or voice note</h3>
          </div>
        </div>
        <div className="media-grid">
          {inputTypes.map((type) => (
            <button
              key={type}
              className={`media-option ${state.uploadedType === type ? 'is-selected' : ''}`}
              onClick={() => updateState({ uploadedType: type, uploadedAsset: `${type} uploaded` })}
            >
              <strong>{type[0].toUpperCase() + type.slice(1)}</strong>
              <span>{type === 'photo' ? 'Food photo' : type === 'reel' ? 'Instagram reel' : type === 'recipe' ? 'Recipe image' : 'Voice note'}</span>
            </button>
          ))}
        </div>
        <p className="subtitle top-gap-sm">Zero reads dish cues, urgency, ingredients and trend signals without making users fill a long filter flow.</p>
      </section>

      <section>
        <div className="section-row">
          <h3>Quick missions</h3>
          <span className="tiny-muted">Tap to load a demo</span>
        </div>
        <div className="horizontal-scroll mission-pill-row">
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              className={`mission-pill ${state.selectedScenario?.id === scenario.id ? 'is-active' : ''}`}
              onClick={() => chooseScenario(scenario)}
            >
              <strong>{scenario.title}</strong>
              <small>{scenario.mood} · ₹{scenario.budget}</small>
            </button>
          ))}
        </div>
      </section>

      <button className="primary-btn big-btn" onClick={runZero}>Let Zero shortlist restaurants</button>
    </div>
  );
};
