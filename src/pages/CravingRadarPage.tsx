import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Layout';
import { useApp } from '../components/AppContext';

const multimodalExperiences = [
  'Food photo → identifies dish, texture, cuisine and likely craving twin',
  'Instagram reel screenshot → detects trend, sauce profile and social occasion',
  'Recipe screenshot → extracts ingredients, maps to nearby menus and builds equivalent order',
  'Voice craving note → interprets urgency, emotion and energy level',
];

export const CravingRadarPage = () => {
  const navigate = useNavigate();
  const { state } = useApp();

  return (
    <div className="page-stack">
      <Header title="Craving Radar" subtitle="The memorable, judge-friendly signature layer." />
      <section className="card radar-card">
        <div className="radar-ring radar-1" />
        <div className="radar-ring radar-2" />
        <div className="radar-core">{state.mood}</div>
        <p className="radar-text">Zero triangulated your craving from context, media input and live restaurant availability. It now knows what “right” feels like.</p>
      </section>
      <section className="card">
        <p className="eyebrow">3 multimodal experiences</p>
        <div className="list-stack">
          {multimodalExperiences.map((item) => <div key={item} className="list-item"><span>{item}</span></div>)}
        </div>
      </section>
      <section className="card">
        <p className="eyebrow">Doraemon moment</p>
        <h3>How did the app know exactly what I wanted?</h3>
        <ul>
          <li>Rain outside + chai order history + warm food voice note</li>
          <li>Gym photo + protein target + lower calorie meal assembly</li>
          <li>Movie-night reel + 5 friend constraints + party-sized cart</li>
          <li>Late-night voice urgency + open kitchens + shortest ETA</li>
          <li>Recipe screenshot + ingredient match + closest restaurant version</li>
        </ul>
      </section>
      <button className="primary-btn" onClick={() => navigate('/recommendations')}>See decision paths</button>
    </div>
  );
};
