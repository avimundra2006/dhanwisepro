import { useState, useEffect } from 'react';

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  createdAt: string;
}

const STORAGE_KEY = 'finance-savings-goals';

export function useSavingsGoals() {
  const [goals, setGoals] = useState<SavingsGoal[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setGoals(JSON.parse(stored));
    }
  }, []);

  const saveToStorage = (items: SavingsGoal[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  };

  const addGoal = (goal: Omit<SavingsGoal, 'id' | 'createdAt'>) => {
    const newGoal: SavingsGoal = {
      ...goal,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    const updated = [newGoal, ...goals];
    setGoals(updated);
    saveToStorage(updated);
  };

  const deleteGoal = (id: string) => {
    const updated = goals.filter((g) => g.id !== id);
    setGoals(updated);
    saveToStorage(updated);
  };

  const clearAllGoals = () => {
    setGoals([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    goals,
    addGoal,
    deleteGoal,
    clearAllGoals,
  };
}
