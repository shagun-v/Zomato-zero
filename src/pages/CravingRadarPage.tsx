import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Layout';
import { useApp } from '../components/AppContext';
import { getRecommendationPaths } from '../utils/ai';
import { restaurants } from '../data/mockData';

const multimodalExperiences = [
  'Food photo → identifies dish texture, cuisine and likely craving twin',
  'Instagram reel → picks up trend cues, sauce profile and social context',
  'Recipe screenshot → extracts ingredients and maps them to nearby menus',
  'Voice note → understands urgency, emotion and energy level',
];

export const CravingRadarPage = () => {
  const navigate = useNavigate();
  const { state } = useApp();
  const paths = getRecommendationPaths(state);

  return (
    <div className="page-stack">
      <Header title="Craving Radar" subtitle="Turn the AI reasoning into a discovery layer with live restaurant cards, not a dashboard." />

      <section className="radar-discovery-card">
        <div className="radar-map">
          <div className="map-core-label">{state.mood}</div>
          {paths.slice(0, 3).map((path, index) => {
            const restaurant = restaurants.find((item) => item.id === path.restaurantId) ?? restaurants[0];
            return (
              <div key={path.id} className={`map-spot spot-${index + 1}`}>
                <img src={restaurant.dishes[0]?.image ?? restaurant.image} alt={restaurant.name} />
                <div>
                  <strong>{restaurant.name}</strong>
                  <small>{path.confidence}% fit</small>
                </div>
              </div>
            );
          })}
        </div>
        <p className="subtitle top-gap-md">Zero combined context, restaurant availability, delivery speed and your clue type to light up the best matching places nearby.</p>
      </section>

      <section className="card">
        <p className="eyebrow">Why these places are showing up</p>
        <div className="signal-grid">
          {paths.map((path) => (
            <div key={path.id} className="signal-card">
              <strong>{path.label}</strong>
              <p>{path.reason}</p>
              <span className="smart-tag">{path.eta} · ₹{path.total}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <p className="eyebrow">Multimodal inputs Zero understands</p>
        <div className="list-stack compact-list">
          {multimodalExperiences.map((item) => (
            <div key={item} className="list-item stacked-item">
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <button className="primary-btn big-btn" onClick={() => navigate('/recommendations')}>See decision paths</button>
    </div>
  );
};
