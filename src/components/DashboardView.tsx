import { Transaction } from '@/types/transaction';
import { StatCard } from '@/components/StatCard';
import { SpendingChart } from '@/components/SpendingChart';
import { CashFlowChart } from '@/components/CashFlowChart';
import { BudgetHealth } from '@/components/BudgetHealth';
import { TransactionList } from '@/components/TransactionList';
import { AddTransactionModal } from '@/components/AddTransactionModal';
import { TransactionCategory, TransactionType } from '@/types/transaction';
import { Wallet, TrendingUp, TrendingDown, Sparkles } from 'lucide-react';

interface DashboardViewProps {
  transactions: Transaction[];
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  categoryData: Record<string, number>;
  onAddTransaction: (transaction: {
    amount: number;
    description: string;
    category: TransactionCategory;
    type: TransactionType;
  }) => void;
  onDeleteTransaction: (id: string) => void;
  userName: string;
}

export function DashboardView({
  transactions,
  totalIncome,
  totalExpenses,
  balance,
  categoryData,
  onAddTransaction,
  onDeleteTransaction,
  userName,
}: DashboardViewProps) {
  // Get recent transactions (last 5)
  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-primary mb-1">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Welcome back</span>
          </div>
          <h1 className="text-2xl font-bold">{userName}</h1>
          <p className="text-muted-foreground text-sm mt-1">Here's your financial overview</p>
        </div>
        <AddTransactionModal onSubmit={onAddTransaction} />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Available Balance"
          value={balance}
          icon={<Wallet className="w-6 h-6" />}
          variant="default"
        />
        <StatCard
          title="Monthly Income"
          value={totalIncome}
          icon={<TrendingUp className="w-6 h-6" />}
          variant="income"
        />
        <StatCard
          title="Total Spending"
          value={totalExpenses}
          icon={<TrendingDown className="w-6 h-6" />}
          variant="expense"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CashFlowChart transactions={transactions} />
        <SpendingChart data={categoryData} />
      </div>

      {/* Budget Health & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <BudgetHealth income={totalIncome} expenses={totalExpenses} />
        </div>
        <div className="lg:col-span-2">
          <div className="glass-card">
            <div className="p-4 border-b border-border/50 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Recent Activity</h2>
              <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                Last 5
              </span>
            </div>
            {recentTransactions.length > 0 ? (
              <div className="divide-y divide-border/30">
                {recentTransactions.map((transaction) => (
                  <TransactionRow
                    key={transaction.id}
                    transaction={transaction}
                    onDelete={onDeleteTransaction}
                  />
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-muted-foreground text-sm">No transactions yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function TransactionRow({
  transaction,
  onDelete,
}: {
  transaction: Transaction;
  onDelete: (id: string) => void;
}) {
  const categoryColors: Record<string, string> = {
    Food: 'bg-chart-food/20 text-chart-food border-chart-food/30',
    Bills: 'bg-chart-bills/20 text-chart-bills border-chart-bills/30',
    Salary: 'bg-chart-salary/20 text-chart-salary border-chart-salary/30',
    Fun: 'bg-chart-fun/20 text-chart-fun border-chart-fun/30',
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors">
      <div className="flex items-center gap-4">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            transaction.type === 'income' ? 'bg-income/20' : 'bg-expense/20'
          }`}
        >
          {transaction.type === 'income' ? (
            <TrendingUp className="w-5 h-5 text-income" />
          ) : (
            <TrendingDown className="w-5 h-5 text-expense" />
          )}
        </div>
        <div>
          <p className="font-medium">{transaction.description}</p>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`text-xs px-2 py-0.5 rounded-full border ${categoryColors[transaction.category]}`}
            >
              {transaction.category}
            </span>
            <span className="text-xs text-muted-foreground">{formatDate(transaction.createdAt)}</span>
          </div>
        </div>
      </div>
      <span
        className={`font-semibold ${transaction.type === 'income' ? 'text-income' : 'text-expense'}`}
      >
        {transaction.type === 'income' ? '+' : '-'}
        {formatCurrency(transaction.amount)}
      </span>
    </div>
  );
}
