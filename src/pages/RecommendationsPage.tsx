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
      <Header title="Three decision paths. No browsing wall." subtitle="Weak features removed: static collections, long comparison grids, chat-heavy loops." />
      <div className="score-strip">
        <div className="score-card"><small>Problem clarity</small><strong>9.5/10</strong></div>
        <div className="score-card"><small>GenAI suitability</small><strong>9.8/10</strong></div>
        <div className="score-card"><small>Wow factor</small><strong>9.2/10</strong></div>
      </div>
      <div className="vertical-list">
        {paths.map((path) => (
          <RecommendationCard key={path.id} path={path} onSelect={() => { choosePath(path.id); navigate('/autopilot'); }} />
        ))}
      </div>
    </div>
  );
};
