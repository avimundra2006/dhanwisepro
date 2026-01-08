import { useState } from 'react';
import { useTransactions } from '@/hooks/useTransactions';
import { useAuth } from '@/hooks/useAuth';
import { AuthPage } from '@/components/AuthPage';
import { Sidebar } from '@/components/Sidebar';
import { DashboardView } from '@/components/DashboardView';
import { TransactionsView } from '@/components/TransactionsView';
import { ReportsView } from '@/components/ReportsView';
import { SettingsView } from '@/components/SettingsView';

type View = 'dashboard' | 'transactions' | 'reports' | 'settings';

const Index = () => {
  const { user, isLoading, isAuthenticated, login, signUp, logout } = useAuth();
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const {
    transactions,
    addTransaction,
    deleteTransaction,
    totalIncome,
    totalExpenses,
    balance,
    categoryData,
    topExpense,
    topExpenseCategory,
    clearAllTransactions,
  } = useTransactions();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthPage onLogin={login} onSignUp={signUp} />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <DashboardView
            transactions={transactions}
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
            balance={balance}
            categoryData={categoryData}
            topExpense={topExpense}
            topExpenseCategory={topExpenseCategory}
            onAddTransaction={addTransaction}
            onDeleteTransaction={deleteTransaction}
            userName={user?.name || 'User'}
          />
        );
      case 'transactions':
        return (
          <TransactionsView
            transactions={transactions}
            onAddTransaction={addTransaction}
            onDeleteTransaction={deleteTransaction}
          />
        );
      case 'reports':
        return (
          <ReportsView
            transactions={transactions}
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
            categoryData={categoryData}
            topExpenseCategory={topExpenseCategory}
          />
        );
      case 'settings':
        return (
          <SettingsView
            userName={user?.name || 'User'}
            userEmail={user?.email || ''}
            onLogout={logout}
            onClearData={clearAllTransactions}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        onLogout={logout}
        userName={user?.name || 'User'}
      />
      
      {/* Main Content */}
      <main className="pl-20 lg:pl-64 min-h-screen transition-all duration-300">
        <div className="p-6 lg:p-8 max-w-7xl">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default Index;
