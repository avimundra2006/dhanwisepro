import { Transaction } from '@/types/transaction';
import { Trash2, TrendingUp, TrendingDown } from 'lucide-react';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

const categoryColors: Record<string, string> = {
  Food: 'bg-chart-food/20 text-chart-food',
  Bills: 'bg-chart-bills/20 text-chart-bills',
  Salary: 'bg-chart-salary/20 text-chart-salary',
  Fun: 'bg-chart-fun/20 text-chart-fun',
};

export function TransactionList({ transactions, onDelete }: TransactionListProps) {
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

  if (transactions.length === 0) {
    return (
      <div className="glass-card p-8 text-center animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
          <TrendingUp className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-2">No transactions yet</h3>
        <p className="text-muted-foreground text-sm">Add your first transaction to get started</p>
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden animate-slide-up">
      <div className="p-4 border-b border-border/50">
        <h2 className="text-xl font-semibold">Recent Transactions</h2>
      </div>
      <div className="divide-y divide-border/30">
        {transactions.map((transaction, index) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors group"
            style={{ animationDelay: `${index * 50}ms` }}
          >
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
                  <span className={`text-xs px-2 py-0.5 rounded-full ${categoryColors[transaction.category]}`}>
                    {transaction.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(transaction.createdAt)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span
                className={`font-semibold ${
                  transaction.type === 'income' ? 'text-income' : 'text-expense'
                }`}
              >
                {transaction.type === 'income' ? '+' : '-'}
                {formatCurrency(transaction.amount)}
              </span>
              <button
                onClick={() => onDelete(transaction.id)}
                className="p-2 rounded-lg text-muted-foreground hover:text-expense hover:bg-expense/10 transition-colors opacity-0 group-hover:opacity-100"
                aria-label="Delete transaction"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
