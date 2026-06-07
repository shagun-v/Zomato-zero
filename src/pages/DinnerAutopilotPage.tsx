import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Layout';
import { CartCard } from '../components/Cards';
import { useApp } from '../components/AppContext';
import { getAutopilotTimeline } from '../utils/ai';

export const DinnerAutopilotPage = () => {
  const navigate = useNavigate();
  const { state } = useApp();
  const [step, setStep] = useState(0);
  const steps = getAutopilotTimeline();

  useEffect(() => {
    if (!state.cart) return;
    if (step >= steps.length - 1) return;
    const timer = setTimeout(() => setStep((prev) => prev + 1), 850);
    return () => clearTimeout(timer);
  }, [step, steps.length, state.cart]);

  return (
    <div className="page-stack">
      <Header title="Dinner Autopilot" subtitle="The killer feature: AI Meal Mission that acts without hand-holding." />
      <div className="card">
        <p className="eyebrow">Agent workflow</p>
        <div className="timeline">
          {steps.map((item, index) => (
            <div key={item} className={`timeline-item ${index <= step ? 'done' : ''}`}>
              <span className="timeline-dot" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
      {state.cart ? <CartCard cart={state.cart} /> : <div className="card">Select a recommendation path first.</div>}
      <div className="grid-two">
        <button className="secondary-btn" onClick={() => navigate('/group-ordering')}>Run GroupSync Agent</button>
        <button className="primary-btn" onClick={() => navigate('/budget-optimizer')}>Auto optimize cart</button>
      </div>
    </div>
  );
};
