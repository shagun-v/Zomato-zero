import React, { createContext, useContext, useMemo, useState } from 'react';
import { AppState, Cart, GroupMember, Scenario } from '../types';
import { demoGroupMembers, scenarios } from '../data/mockData';
import { buildCartFromPath, buildInsight } from '../utils/ai';

interface AppContextValue {
  state: AppState;
  updateState: (patch: Partial<AppState>) => void;
  chooseScenario: (scenario: Scenario) => void;
  buildInsightNow: () => void;
  choosePath: (pathId: string) => void;
  updateCart: (cart: Cart) => void;
  setGroupMembers: (members: GroupMember[]) => void;
  resetFlow: () => void;
}

const defaultScenario = scenarios[0];

const initialState: AppState = {
  prompt: defaultScenario.prompt,
  mood: defaultScenario.mood,
  budget: defaultScenario.budget,
  occasion: defaultScenario.occasion,
  healthGoal: defaultScenario.healthGoal,
  uploadedType: defaultScenario.mediaType,
  selectedScenario: defaultScenario,
  groupMembers: demoGroupMembers,
};

const AppContext = createContext<AppContextValue | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AppState>(initialState);

  const updateState = (patch: Partial<AppState>) => setState((prev) => ({ ...prev, ...patch }));

  const chooseScenario = (scenario: Scenario) => {
    setState((prev) => ({
      ...prev,
      selectedScenario: scenario,
      prompt: scenario.prompt,
      mood: scenario.mood,
      budget: scenario.budget,
      occasion: scenario.occasion,
      healthGoal: scenario.healthGoal,
      uploadedType: scenario.mediaType,
      uploadedAsset: scenario.title,
      insight: undefined,
      selectedPathId: undefined,
      cart: undefined,
    }));
  };

  const buildInsightNow = () => {
    setState((prev) => ({ ...prev, insight: buildInsight(prev) }));
  };

  const choosePath = (pathId: string) => {
    setState((prev) => ({
      ...prev,
      selectedPathId: pathId,
      cart: buildCartFromPath(pathId),
    }));
  };

  const updateCart = (cart: Cart) => setState((prev) => ({ ...prev, cart }));
  const setGroupMembers = (members: GroupMember[]) => setState((prev) => ({ ...prev, groupMembers: members }));

  const resetFlow = () => setState(initialState);

  const value = useMemo(() => ({ state, updateState, chooseScenario, buildInsightNow, choosePath, updateCart, setGroupMembers, resetFlow }), [state]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
};
