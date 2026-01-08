import { TrendingDown, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { formatCurrency } from '@/lib/currency';

interface BudgetHealthProps {
  income: number;
  expenses: number;
}

export function BudgetHealth({ income, expenses }: BudgetHealthProps) {
  const percentage = income > 0 ? Math.min((expenses / income) * 100, 100) : 0;
  const isOverBudget = percentage > 80;
  const isCritical = percentage > 100;

  const getStatus = () => {
    if (isCritical) return { label: 'Over Budget', color: 'text-destructive', icon: AlertTriangle };
    if (isOverBudget) return { label: 'Caution', color: 'text-warning', icon: TrendingDown };
    return { label: 'Healthy', color: 'text-income', icon: CheckCircle2 };
  };

  const status = getStatus();
  const StatusIcon = status.icon;

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Budget Health</h3>
        <div className={`flex items-center gap-2 ${status.color}`}>
          <StatusIcon className="w-4 h-4" />
          <span className="text-sm font-medium">{status.label}</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Spending vs Income</span>
          <span className={`font-semibold ${status.color}`}>{percentage.toFixed(0)}%</span>
        </div>
        <div className="relative">
          <Progress
            value={Math.min(percentage, 100)}
            className={`h-3 ${
              isCritical
                ? '[&>div]:bg-destructive'
                : isOverBudget
                ? '[&>div]:bg-warning'
                : '[&>div]:bg-income'
            }`}
          />
          {/* 80% marker */}
          <div
            className="absolute top-0 h-3 w-0.5 bg-warning/50"
            style={{ left: '80%' }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border/30">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Income</p>
          <p className="text-lg font-semibold text-income">{formatCurrency(income)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Spent</p>
          <p className="text-lg font-semibold text-expense">{formatCurrency(expenses)}</p>
        </div>
      </div>

      {income > 0 && (
        <div className="mt-4 pt-4 border-t border-border/30">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Remaining</span>
            <span className={`text-lg font-bold ${income - expenses >= 0 ? 'text-income' : 'text-destructive'}`}>
              {formatCurrency(Math.max(income - expenses, 0))}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
