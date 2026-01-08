import { useState, useEffect, useMemo } from 'react';
import { Transaction, TransactionCategory } from '@/types/transaction';

const STORAGE_KEY = 'finance-transactions';

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setTransactions(JSON.parse(stored));
    }
  }, []);

  const saveToStorage = (items: Transaction[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  };

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'createdAt'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    const updated = [newTransaction, ...transactions];
    setTransactions(updated);
    saveToStorage(updated);
  };

  const deleteTransaction = (id: string) => {
    const updated = transactions.filter((t) => t.id !== id);
    setTransactions(updated);
    saveToStorage(updated);
  };

  // Sort transactions by date (newest first)
  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => {
      const dateA = new Date(a.date || a.createdAt).getTime();
      const dateB = new Date(b.date || b.createdAt).getTime();
      return dateB - dateA;
    });
  }, [transactions]);

  const totals = transactions.reduce(
    (acc, t) => {
      if (t.type === 'income') {
        acc.income += t.amount;
      } else {
        acc.expenses += t.amount;
      }
      return acc;
    },
    { income: 0, expenses: 0 }
  );

  const categoryData = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  // Find top expense (single most expensive item)
  const topExpense = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === 'expense');
    if (expenses.length === 0) return null;
    return expenses.reduce((max, t) => (t.amount > max.amount ? t : max), expenses[0]);
  }, [transactions]);

  // Find top expense category
  const topExpenseCategory = useMemo(() => {
    if (Object.keys(categoryData).length === 0) return null;
    const sorted = Object.entries(categoryData).sort(([, a], [, b]) => b - a);
    return { category: sorted[0][0] as TransactionCategory, amount: sorted[0][1] };
  }, [categoryData]);

  const clearAllTransactions = () => {
    setTransactions([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    transactions: sortedTransactions,
    addTransaction,
    deleteTransaction,
    clearAllTransactions,
    totalIncome: totals.income,
    totalExpenses: totals.expenses,
    balance: totals.income - totals.expenses,
    categoryData,
    topExpense,
    topExpenseCategory,
  };
}
