import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Transaction } from '@/types/transaction';
import { formatCurrency } from '@/lib/currency';
import { format, parseISO, subDays, startOfDay } from 'date-fns';

interface CashFlowChartProps {
  transactions: Transaction[];
}

export function CashFlowChart({ transactions }: CashFlowChartProps) {
  // Aggregate daily spending data
  const chartData = useMemo(() => {
    const today = startOfDay(new Date());
    const days = 14; // Show last 14 days
    
    // Create a map of date -> total spending
    const dailySpending: Record<string, number> = {};
    
    // Initialize all days with 0
    for (let i = days - 1; i >= 0; i--) {
      const date = subDays(today, i);
      const dateKey = format(date, 'yyyy-MM-dd');
      dailySpending[dateKey] = 0;
    }
    
    // Aggregate expenses by date
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        const transactionDate = t.date || t.createdAt;
        const dateKey = format(parseISO(transactionDate), 'yyyy-MM-dd');
        if (dailySpending.hasOwnProperty(dateKey)) {
          dailySpending[dateKey] += t.amount;
        }
      });
    
    // Convert to array format for chart
    return Object.entries(dailySpending).map(([date, amount]) => ({
      date,
      displayDate: format(parseISO(date), 'MMM dd'),
      spending: amount,
    }));
  }, [transactions]);

  return (
    <div className="glass-card p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Daily Spending Trend</h2>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 rounded-full bg-expense" />
          <span className="text-muted-foreground">Spending</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(0, 72%, 60%)" stopOpacity={0.5} />
              <stop offset="95%" stopColor="hsl(0, 72%, 60%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" vertical={false} />
          <XAxis
            dataKey="displayDate"
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 11 }}
            interval="preserveStartEnd"
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 11 }}
            tickFormatter={(value) => `₹${value}`}
            width={60}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(222, 47%, 10%)',
              border: '1px solid hsl(222, 30%, 18%)',
              borderRadius: '12px',
              padding: '12px',
            }}
            formatter={(value: number) => [formatCurrency(value), 'Spending']}
            labelFormatter={(label) => label}
            labelStyle={{ color: 'hsl(210, 40%, 98%)', marginBottom: '4px' }}
          />
          <Area
            type="monotone"
            dataKey="spending"
            stroke="hsl(0, 72%, 60%)"
            strokeWidth={2.5}
            fill="url(#spendingGradient)"
            dot={false}
            activeDot={{ r: 6, fill: 'hsl(0, 72%, 60%)', strokeWidth: 2, stroke: 'white' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
