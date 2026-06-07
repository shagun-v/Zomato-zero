import { useNavigate } from 'react-router-dom';
import { RestaurantFeedCard, ScenarioCard } from '../components/Cards';
import { useApp } from '../components/AppContext';
import { recommendationMatrix, restaurants, scenarios } from '../data/mockData';

const cuisines = ['Pizza', 'Biryani', 'North Indian', 'Burgers', 'Healthy', 'Desserts', 'Asian'];

export const HomePage = () => {
  const navigate = useNavigate();
  const { state, chooseScenario } = useApp();

  const selectedScenario = state.selectedScenario ?? scenarios[0];
  const selectedRestaurantId = recommendationMatrix[selectedScenario.id]?.[0]?.restaurantId;
  const selectedRestaurant = restaurants.find((restaurant) => restaurant.id === selectedRestaurantId) ?? restaurants[0];

  const collections = [
    {
      title: 'Rainy day comfort',
      subtitle: 'Warm bowls, Maggi pots, chai add-ons',
      image: restaurants[1].dishes[1].image,
    },
    {
      title: 'Trending on reels',
      subtitle: 'Cheesy Korean bowls and spicy hits',
      image: restaurants[0].dishes[0].image,
    },
    {
      title: 'Late-night winners',
      subtitle: 'Fast delivery after 11 PM',
      image: restaurants[2].dishes[0].image,
    },
  ];

  return (
    <div className="page-stack home-page">
      <section className="topbar-card">
        <div>
          <p className="tiny-muted uppercase">Delivering to</p>
          <h2 className="location-title">Home ▾</h2>
          <p className="subtitle">17th Main, HSR Layout, Bengaluru</p>
        </div>
        <button className="profile-dot" aria-label="Profile">N</button>
      </section>

      <button className="search-surface" onClick={() => navigate('/ask-zero')}>
        <span>🔍</span>
        <span>Search for biryani, pizza, dessert or ask Zero</span>
      </button>

      <div className="horizontal-scroll chip-scroll">
        {cuisines.map((cuisine) => (
          <span key={cuisine} className="chip cuisine-chip">{cuisine}</span>
        ))}
      </div>

      <section className="promo-banner">
        <div>
          <p className="eyebrow">New inside Zomato</p>
          <h3>Ask Zero, don’t browse forever</h3>
          <p>Tell Zero the mood once. It narrows restaurants, builds the basket and applies offers automatically.</p>
          <div className="chip-row wrap top-gap-sm">
            <span className="chip chip-soft">{selectedScenario.mood}</span>
            <span className="chip chip-soft">Under ₹{selectedScenario.budget}</span>
            <span className="chip chip-soft">{selectedRestaurant.name}</span>
          </div>
        </div>
        <button className="primary-btn" onClick={() => navigate('/ask-zero')}>Try Zero</button>
      </section>

      <section>
        <div className="section-row">
          <h3>Collections</h3>
          <span className="tiny-muted">Built for tonight</span>
        </div>
        <div className="horizontal-scroll collections-row">
          {collections.map((collection) => (
            <article key={collection.title} className="collection-card">
              <img src={collection.image} alt={collection.title} className="collection-image" />
              <div className="collection-copy">
                <h4>{collection.title}</h4>
                <p>{collection.subtitle}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="section-row">
          <h3>Zero missions</h3>
          <span className="tiny-muted">5 demo scenarios</span>
        </div>
        <div className="vertical-list">
          {scenarios.map((scenario) => (
            <ScenarioCard
              key={scenario.id}
              scenario={scenario}
              active={selectedScenario.id === scenario.id}
              onClick={() => chooseScenario(scenario)}
            />
          ))}
        </div>
      </section>

      <section>
        <div className="section-row">
          <h3>Restaurants to order from</h3>
          <span className="tiny-muted">Ratings, offers and food-first cards</span>
        </div>
        <div className="vertical-list">
          {restaurants.map((restaurant, index) => (
            <RestaurantFeedCard
              key={restaurant.id}
              restaurant={restaurant}
              caption={index === 0 ? 'Popular for healthy bowls, Korean flavours and quick weekday dinners.' : index === 1 ? 'Comfort-heavy picks that feel made for rain, chai and cozy evenings.' : index === 2 ? 'Late-night wraps, fries and dessert under budget with quick ETAs.' : 'Group-friendly pizzas and shareables for movie nights.'}
              onClick={() => {
                chooseScenario(scenarios[index] ?? scenarios[0]);
                navigate('/ask-zero');
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
