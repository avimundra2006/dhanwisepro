import { useState } from 'react';
import { TransactionCategory, TransactionType } from '@/types/transaction';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';

interface TransactionFormProps {
  onSubmit: (transaction: {
    amount: number;
    description: string;
    category: TransactionCategory;
    type: TransactionType;
  }) => void;
}

const categories: TransactionCategory[] = ['Food', 'Bills', 'Salary', 'Fun'];

export function TransactionForm({ onSubmit }: TransactionFormProps) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<TransactionCategory>('Food');
  const [type, setType] = useState<TransactionType>('expense');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description) return;

    onSubmit({
      amount: parseFloat(amount),
      description: description.trim(),
      category,
      type,
    });

    setAmount('');
    setDescription('');
    setCategory('Food');
    setType('expense');
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 space-y-5 animate-slide-up">
      <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>
      
      {/* Type Toggle */}
      <div className="flex gap-2 p-1 bg-secondary rounded-lg">
        <button
          type="button"
          onClick={() => setType('expense')}
          className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
            type === 'expense'
              ? 'bg-expense/20 text-expense'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Expense
        </button>
        <button
          type="button"
          onClick={() => setType('income')}
          className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
            type === 'income'
              ? 'bg-income/20 text-income'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Income
        </button>
      </div>

      {/* Amount */}
      <div className="space-y-2">
        <Label htmlFor="amount" className="text-muted-foreground">Amount</Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="bg-secondary border-border/50 text-lg h-12"
          required
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-muted-foreground">Description</Label>
        <Input
          id="description"
          type="text"
          placeholder="What was it for?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-secondary border-border/50 h-12"
          maxLength={100}
          required
        />
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label className="text-muted-foreground">Category</Label>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 border ${
                category === cat
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border/50 bg-secondary text-muted-foreground hover:border-primary/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold glow-accent"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add Transaction
      </Button>
    </form>
  );
}
