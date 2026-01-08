import { Transaction } from '@/types/transaction';
import { formatCurrency } from '@/lib/currency';
import { categoryConfig } from '@/lib/categoryConfig';
import { Trophy } from 'lucide-react';

interface TopExpenseCardProps {
  topExpense: Transaction | null;
}

export function TopExpenseCard({ topExpense }: TopExpenseCardProps) {
  if (!topExpense) {
    return (
      <div className="glass-card p-6 h-full flex flex-col justify-center items-center text-center">
        <Trophy className="w-10 h-10 text-muted-foreground mb-3" />
        <h3 className="text-lg font-semibold mb-1">Top Expense</h3>
        <p className="text-muted-foreground text-sm">No expenses recorded yet</p>
      </div>
    );
  }

  const config = categoryConfig[topExpense.category];
  const IconComponent = config.icon;
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="glass-card p-6 h-full">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-5 h-5 text-yellow-400" />
        <h3 className="text-lg font-semibold">Top Expense</h3>
      </div>
      
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl ${config.bgColor} flex items-center justify-center flex-shrink-0`}>
          <IconComponent className={`w-6 h-6 ${config.textColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-lg truncate">{topExpense.description}</p>
          <p className={`text-sm ${config.textColor}`}>{topExpense.category}</p>
          <p className="text-xs text-muted-foreground mt-1">{formatDate(topExpense.date || topExpense.createdAt)}</p>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-border/30">
        <p className="text-3xl font-bold text-expense">{formatCurrency(topExpense.amount)}</p>
      </div>
    </div>
  );
}
