import { Transaction, TransactionCategory, TransactionType } from '@/types/transaction';
import { TransactionList } from '@/components/TransactionList';
import { AddTransactionModal } from '@/components/AddTransactionModal';
import { ArrowLeftRight } from 'lucide-react';

interface TransactionsViewProps {
  transactions: Transaction[];
  onAddTransaction: (transaction: {
    amount: number;
    description: string;
    category: TransactionCategory;
    type: TransactionType;
  }) => void;
  onDeleteTransaction: (id: string) => void;
}

export function TransactionsView({
  transactions,
  onAddTransaction,
  onDeleteTransaction,
}: TransactionsViewProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-primary mb-1">
            <ArrowLeftRight className="w-4 h-4" />
            <span className="text-sm font-medium">Transaction History</span>
          </div>
          <h1 className="text-2xl font-bold">All Transactions</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {transactions.length} total transaction{transactions.length !== 1 ? 's' : ''}
          </p>
        </div>
        <AddTransactionModal onSubmit={onAddTransaction} />
      </div>

      {/* Transaction List */}
      <TransactionList transactions={transactions} onDelete={onDeleteTransaction} />
    </div>
  );
}
