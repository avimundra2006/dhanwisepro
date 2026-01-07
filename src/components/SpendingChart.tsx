import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface SpendingChartProps {
  data: Record<string, number>;
}

const COLORS: Record<string, string> = {
  Food: 'hsl(38, 92%, 50%)',
  Bills: 'hsl(200, 80%, 55%)',
  Salary: 'hsl(160, 84%, 45%)',
  Fun: 'hsl(280, 70%, 60%)',
};

export function SpendingChart({ data }: SpendingChartProps) {
  const chartData = Object.entries(data).map(([name, value]) => ({
    name,
    value,
  }));

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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  return (
    <div className="glass-card p-6 animate-fade-in">
      <h2 className="text-xl font-semibold mb-4">Spending by Category</h2>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={4}
            dataKey="value"
            strokeWidth={0}
          >
            {chartData.map((entry) => (
              <Cell key={entry.name} fill={COLORS[entry.name]} />
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
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value: string) => (
              <span className="text-sm text-foreground">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Category breakdown */}
      <div className="mt-4 space-y-2">
        {chartData.map((item) => (
          <div key={item.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[item.name] }}
              />
              <span className="text-muted-foreground">{item.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-foreground font-medium">{formatCurrency(item.value)}</span>
              <span className="text-muted-foreground text-xs w-12 text-right">
                {((item.value / total) * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
