import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { formatCurrency } from '@/lib/currency';
import { categoryConfig } from '@/lib/categoryConfig';
import { TransactionCategory } from '@/types/transaction';

interface SpendingChartProps {
  data: Record<string, number>;
  topExpenseCategory: { category: TransactionCategory; amount: number } | null;
}

export function SpendingChart({ data, topExpenseCategory }: SpendingChartProps) {
  const chartData = useMemo(() => {
    return Object.entries(data).map(([name, value]) => ({
      name,
      value,
      color: categoryConfig[name as TransactionCategory]?.chartColor || 'hsl(215, 20%, 55%)',
    }));
  }, [data]);

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  if (chartData.length === 0) {
    return (
      <div className="glass-card p-6 h-full animate-fade-in">
        <h2 className="text-xl font-semibold mb-4">Spending by Category</h2>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground text-sm">Add expenses to see breakdown</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 animate-fade-in">
      <h2 className="text-xl font-semibold mb-4">Spending by Category</h2>
      <div className="relative">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={3}
              dataKey="value"
              strokeWidth={0}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(222, 47%, 10%)',
                border: '1px solid hsl(222, 30%, 18%)',
                borderRadius: '8px',
                padding: '8px 12px',
              }}
              formatter={(value: number) => [formatCurrency(value), '']}
              labelStyle={{ color: 'hsl(210, 40%, 98%)' }}
            />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center Text showing Top Category */}
        {topExpenseCategory && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              {topExpenseCategory.category}
            </span>
            <span className="text-2xl font-bold text-foreground">
              {formatCurrency(topExpenseCategory.amount)}
            </span>
          </div>
        )}
      </div>
      
      {/* Category breakdown */}
      <div className="mt-4 space-y-2">
        {chartData.map((item) => {
          const config = categoryConfig[item.name as TransactionCategory];
          const IconComponent = config?.icon;
          return (
            <div key={item.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                {IconComponent && <IconComponent className="w-3.5 h-3.5 text-muted-foreground" />}
                <span className="text-muted-foreground">{item.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-foreground font-medium">{formatCurrency(item.value)}</span>
                <span className="text-muted-foreground text-xs w-12 text-right">
                  {((item.value / total) * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
