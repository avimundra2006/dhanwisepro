import { useState } from 'react';
import { format } from 'date-fns';
import { TransactionCategory, TransactionType } from '@/types/transaction';
import { categories, categoryConfig } from '@/lib/categoryConfig';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, FileText, Tag, CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AddTransactionModalProps {
  onSubmit: (transaction: {
    amount: number;
    description: string;
    category: TransactionCategory;
    type: TransactionType;
    date: string;
  }) => void;
}

export function AddTransactionModal({ onSubmit }: AddTransactionModalProps) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<TransactionCategory>('Food & Dining');
  const [type, setType] = useState<TransactionType>('expense');
  const [date, setDate] = useState<Date>(new Date());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description) return;

    onSubmit({
      amount: parseFloat(amount),
      description: description.trim(),
      category,
      type,
      date: date.toISOString(),
    });

    resetForm();
    setOpen(false);
  };

  const resetForm = () => {
    setAmount('');
    setDescription('');
    setCategory('Food & Dining');
    setType('expense');
    setDate(new Date());
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) resetForm();
    }}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/25 font-semibold h-11 px-5">
          <Plus className="w-5 h-5 mr-2" />
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-card border-border/50 max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Plus className="w-4 h-4 text-primary" />
            </div>
            New Transaction
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          {/* Type Toggle */}
          <div className="flex gap-2 p-1 bg-secondary rounded-xl">
            <button
              type="button"
              onClick={() => setType('expense')}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                type === 'expense'
                  ? 'bg-expense/20 text-expense shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => setType('income')}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                type === 'income'
                  ? 'bg-income/20 text-income shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Income
            </button>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="modal-amount" className="text-muted-foreground flex items-center gap-2">
              <span className="text-lg">₹</span>
              Amount
            </Label>
            <Input
              id="modal-amount"
              type="number"
              step="1"
              min="0"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-secondary/50 border-border/50 text-2xl h-14 font-semibold"
              required
            />
          </div>

          {/* Date Picker */}
          <div className="space-y-2">
            <Label className="text-muted-foreground flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal h-12 bg-secondary/50 border-border/50",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => d && setDate(d)}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="modal-description" className="text-muted-foreground flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Description
            </Label>
            <Input
              id="modal-description"
              type="text"
              placeholder="What was this transaction for?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-secondary/50 border-border/50 h-12"
              maxLength={100}
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label className="text-muted-foreground flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Category
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => {
                const config = categoryConfig[cat];
                const IconComponent = config.icon;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`py-3 px-3 rounded-xl text-sm font-medium transition-all duration-200 border flex items-center gap-2 ${
                      category === cat
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border/50 bg-secondary/50 text-muted-foreground hover:border-primary/50 hover:text-foreground'
                    }`}
                  >
                    <IconComponent className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{config.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1 h-12 border-border/50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 font-semibold"
            >
              Add Transaction
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
