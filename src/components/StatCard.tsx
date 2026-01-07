import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  variant?: 'default' | 'income' | 'expense';
}

export function StatCard({ title, value, icon, variant = 'default' }: StatCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const variantClasses = {
    default: 'text-foreground',
    income: 'text-income',
    expense: 'text-expense',
  };

  return (
    <div className="stat-card animate-fade-in">
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-muted-foreground text-sm font-medium uppercase tracking-wider">
            {title}
          </span>
          <div className={`${variantClasses[variant]} opacity-80`}>
            {icon}
          </div>
        </div>
        <p className={`text-3xl font-bold tracking-tight ${variantClasses[variant]}`}>
          {formatCurrency(value)}
        </p>
      </div>
    </div>
  );
}
