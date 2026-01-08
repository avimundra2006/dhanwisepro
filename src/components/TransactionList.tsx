import { useState, useMemo } from 'react';
import { Transaction } from '@/types/transaction';
import { formatCurrency } from '@/lib/currency';
import { categoryConfig } from '@/lib/categoryConfig';
import { Trash2, TrendingUp, TrendingDown, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export function TransactionList({ transactions, onDelete }: TransactionListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTransactions = useMemo(() => {
    if (!searchQuery.trim()) return transactions;
    const query = searchQuery.toLowerCase();
    return transactions.filter((t) =>
      t.description.toLowerCase().includes(query) ||
      t.category.toLowerCase().includes(query)
    );
  }, [transactions, searchQuery]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
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
      <div className="p-4 border-b border-border/50 space-y-3">
        <h2 className="text-xl font-semibold">All Transactions</h2>
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-secondary/50 border-border/50 h-10"
          />
        </div>
      </div>
      <div className="divide-y divide-border/30 max-h-[500px] overflow-y-auto">
        {filteredTransactions.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-muted-foreground text-sm">No matching transactions found</p>
          </div>
        ) : (
          filteredTransactions.map((transaction, index) => {
            const config = categoryConfig[transaction.category];
            const IconComponent = config?.icon || TrendingDown;
            
            return (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
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
                      <span className={`text-xs px-2 py-0.5 rounded-full ${config?.bgColor || 'bg-muted'} ${config?.textColor || 'text-muted-foreground'}`}>
                        {transaction.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(transaction.date || transaction.createdAt)}
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
            );
          })
        )}
      </div>
    </div>
  );
}
