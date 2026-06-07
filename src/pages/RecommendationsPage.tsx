import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Layout';
import { RecommendationCard } from '../components/Cards';
import { useApp } from '../components/AppContext';
import { getRecommendationPaths } from '../utils/ai';

export const RecommendationsPage = () => {
  const navigate = useNavigate();
  const { state, choosePath } = useApp();
  const paths = getRecommendationPaths(state);

  return (
    <div className="page-stack">
      <Header title="Top picks for this craving" subtitle="Three ranked restaurants, each with a different trade-off. The UI now feels like ordering, not presenting." />

      <section className="constraint-strip">
        <span className="chip chip-soft">{state.mood}</span>
        <span className="chip chip-soft">Under ₹{state.budget}</span>
        <span className="chip chip-soft">{state.occasion}</span>
        <span className="chip chip-soft">{state.healthGoal}</span>
      </section>

      <div className="vertical-list">
        {paths.map((path) => (
          <RecommendationCard
            key={path.id}
            path={path}
            onSelect={() => {
              choosePath(path.id);
              navigate('/autopilot');
            }}
          />
        ))}
      </div>
    </div>
  );
};
