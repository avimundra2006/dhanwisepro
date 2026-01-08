import { Transaction, TransactionCategory } from '@/types/transaction';
import { SpendingChart } from '@/components/SpendingChart';
import { CashFlowChart } from '@/components/CashFlowChart';
import { BudgetHealth } from '@/components/BudgetHealth';
import { formatCurrency } from '@/lib/currency';
import { BarChart3, Wallet, TrendingUp, TrendingDown } from 'lucide-react';

interface ReportsViewProps {
  transactions: Transaction[];
  totalIncome: number;
  totalExpenses: number;
  categoryData: Record<string, number>;
  topExpenseCategory: { category: TransactionCategory; amount: number } | null;
}

export function ReportsView({
  transactions,
  totalIncome,
  totalExpenses,
  categoryData,
  topExpenseCategory,
}: ReportsViewProps) {
  const balance = totalIncome - totalExpenses;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-primary mb-1">
          <BarChart3 className="w-4 h-4" />
          <span className="text-sm font-medium">Analytics</span>
        </div>
        <h1 className="text-2xl font-bold">Financial Reports</h1>
        <p className="text-muted-foreground text-sm mt-1">Insights into your spending habits</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Wallet className="w-4 h-4 text-primary" />
            </div>
            <span className="text-muted-foreground text-sm">Net Balance</span>
          </div>
          <p className="text-2xl font-bold">{formatCurrency(balance)}</p>
        </div>
        <div className="glass-card p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-income/20 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-income" />
            </div>
            <span className="text-muted-foreground text-sm">Total Income</span>
          </div>
          <p className="text-2xl font-bold text-income">{formatCurrency(totalIncome)}</p>
        </div>
        <div className="glass-card p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-expense/20 flex items-center justify-center">
              <TrendingDown className="w-4 h-4 text-expense" />
            </div>
            <span className="text-muted-foreground text-sm">Total Expenses</span>
          </div>
          <p className="text-2xl font-bold text-expense">{formatCurrency(totalExpenses)}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CashFlowChart transactions={transactions} />
        <SpendingChart data={categoryData} topExpenseCategory={topExpenseCategory} />
      </div>

      {/* Budget Health */}
      <BudgetHealth income={totalIncome} expenses={totalExpenses} />
    </div>
  );
}
