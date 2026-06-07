import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { AskZeroPage } from './pages/AskZeroPage';
import { AIConversationPage } from './pages/AIConversationPage';
import { CravingRadarPage } from './pages/CravingRadarPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { DinnerAutopilotPage } from './pages/DinnerAutopilotPage';
import { GroupOrderingPage } from './pages/GroupOrderingPage';
import { BudgetOptimizerPage } from './pages/BudgetOptimizerPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ConfirmationPage } from './pages/ConfirmationPage';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ask-zero" element={<AskZeroPage />} />
        <Route path="/conversation" element={<AIConversationPage />} />
        <Route path="/craving-radar" element={<CravingRadarPage />} />
        <Route path="/recommendations" element={<RecommendationsPage />} />
        <Route path="/autopilot" element={<DinnerAutopilotPage />} />
        <Route path="/group-ordering" element={<GroupOrderingPage />} />
        <Route path="/budget-optimizer" element={<BudgetOptimizerPage />} />
        <Route path="/cart" element={<CheckoutPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/profile" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
