import { useTransactions } from '@/hooks/useTransactions';
import { StatCard } from '@/components/StatCard';
import { TransactionForm } from '@/components/TransactionForm';
import { TransactionList } from '@/components/TransactionList';
import { SpendingChart } from '@/components/SpendingChart';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

const Index = () => {
  const {
    transactions,
    addTransaction,
    deleteTransaction,
    totalIncome,
    totalExpenses,
    balance,
    categoryData,
  } = useTransactions();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">FinanceFlow</h1>
              <p className="text-xs text-muted-foreground">Personal Finance Manager</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatCard
            title="Total Balance"
            value={balance}
            icon={<Wallet className="w-6 h-6" />}
            variant="default"
          />
          <StatCard
            title="Total Income"
            value={totalIncome}
            icon={<TrendingUp className="w-6 h-6" />}
            variant="income"
          />
          <StatCard
            title="Total Expenses"
            value={totalExpenses}
            icon={<TrendingDown className="w-6 h-6" />}
            variant="expense"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Form & Chart */}
          <div className="space-y-6">
            <TransactionForm onSubmit={addTransaction} />
            <SpendingChart data={categoryData} />
          </div>

          {/* Right Column - Transaction List */}
          <div className="lg:col-span-2">
            <TransactionList
              transactions={transactions}
              onDelete={deleteTransaction}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          Your data is stored locally in your browser
        </div>
      </footer>
    </div>
  );
};

export default Index;
