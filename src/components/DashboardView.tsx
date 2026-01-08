import { Transaction, TransactionCategory, TransactionType } from '@/types/transaction';
import { StatCard } from '@/components/StatCard';
import { SpendingChart } from '@/components/SpendingChart';
import { CashFlowChart } from '@/components/CashFlowChart';
import { BudgetHealth } from '@/components/BudgetHealth';
import { TopExpenseCard } from '@/components/TopExpenseCard';
import { AddTransactionModal } from '@/components/AddTransactionModal';
import { formatCurrency } from '@/lib/currency';
import { categoryConfig } from '@/lib/categoryConfig';
import { Wallet, TrendingUp, TrendingDown, Sparkles } from 'lucide-react';

interface DashboardViewProps {
  transactions: Transaction[];
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  categoryData: Record<string, number>;
  topExpense: Transaction | null;
  topExpenseCategory: { category: TransactionCategory; amount: number } | null;
  onAddTransaction: (transaction: {
    amount: number;
    description: string;
    category: TransactionCategory;
    type: TransactionType;
    date: string;
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
  topExpense,
  topExpenseCategory,
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
        <div className="grid grid-cols-1 gap-6">
          <TopExpenseCard topExpense={topExpense} />
        </div>
      </div>

      {/* Spending Chart & Budget Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SpendingChart data={categoryData} topExpenseCategory={topExpenseCategory} />
        <BudgetHealth income={totalIncome} expenses={totalExpenses} />
      </div>

      {/* Recent Transactions */}
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
  );
}

function TransactionRow({
  transaction,
  onDelete,
}: {
  transaction: Transaction;
  onDelete: (id: string) => void;
}) {
  const config = categoryConfig[transaction.category];
  const IconComponent = config?.icon || TrendingDown;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors">
      <div className="flex items-center gap-4">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            transaction.type === 'income' ? 'bg-income/20' : config?.bgColor || 'bg-expense/20'
          }`}
        >
          {transaction.type === 'income' ? (
            <TrendingUp className="w-5 h-5 text-income" />
          ) : (
            <IconComponent className={`w-5 h-5 ${config?.textColor || 'text-expense'}`} />
          )}
        </div>
        <div>
          <p className="font-medium">{transaction.description}</p>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`text-xs px-2 py-0.5 rounded-full border ${config?.bgColor || 'bg-muted'} ${config?.textColor || 'text-muted-foreground'}`}
            >
              {transaction.category}
            </span>
            <span className="text-xs text-muted-foreground">{formatDate(transaction.date || transaction.createdAt)}</span>
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
