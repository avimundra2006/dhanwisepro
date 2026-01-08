import { useState } from 'react';
import { Target, Plus, Trash2, TrendingUp, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { formatCurrency } from '@/lib/currency';
import { SavingsGoal } from '@/hooks/useSavingsGoals';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface SavingsGoalsProps {
  goals: SavingsGoal[];
  balance: number;
  onAddGoal: (goal: { name: string; targetAmount: number }) => void;
  onDeleteGoal: (id: string) => void;
}

export function SavingsGoals({ goals, balance, onAddGoal, onDeleteGoal }: SavingsGoalsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalName.trim() || !targetAmount) return;

    onAddGoal({
      name: goalName.trim(),
      targetAmount: parseFloat(targetAmount),
    });

    setGoalName('');
    setTargetAmount('');
    setIsOpen(false);
  };

  const getProgressInfo = (target: number) => {
    const percentage = balance > 0 ? Math.min((balance / target) * 100, 100) : 0;
    const isAchieved = percentage >= 100;
    return { percentage, isAchieved };
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Savings Goals
        </h3>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline" className="gap-1.5">
              <Plus className="w-4 h-4" />
              Add Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-card border-border/50">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                New Savings Goal
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Goal Name</label>
                <Input
                  placeholder="e.g., New Phone, Vacation"
                  value={goalName}
                  onChange={(e) => setGoalName(e.target.value)}
                  className="bg-secondary/50 border-border/50"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Target Amount (₹)</label>
                <Input
                  type="number"
                  placeholder="20000"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                  min="1"
                  className="bg-secondary/50 border-border/50"
                />
              </div>
              <Button type="submit" className="w-full">
                Create Goal
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {goals.length === 0 ? (
        <div className="py-8 text-center">
          <Target className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">No savings goals yet</p>
          <p className="text-muted-foreground/60 text-xs mt-1">Add a goal to start tracking</p>
        </div>
      ) : (
        <div className="space-y-4">
          {goals.map((goal) => {
            const { percentage, isAchieved } = getProgressInfo(goal.targetAmount);
            return (
              <div
                key={goal.id}
                className="p-4 rounded-xl bg-secondary/30 border border-border/30 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {isAchieved ? (
                      <Sparkles className="w-4 h-4 text-income" />
                    ) : (
                      <TrendingUp className="w-4 h-4 text-primary" />
                    )}
                    <span className="font-medium">{goal.name}</span>
                  </div>
                  <button
                    onClick={() => onDeleteGoal(goal.id)}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-expense hover:bg-expense/10 transition-colors opacity-0 group-hover:opacity-100"
                    aria-label="Delete goal"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="mb-2">
                  <Progress
                    value={percentage}
                    className={`h-2 ${
                      isAchieved ? '[&>div]:bg-income' : '[&>div]:bg-primary'
                    }`}
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {formatCurrency(Math.min(balance, goal.targetAmount))} of {formatCurrency(goal.targetAmount)}
                  </span>
                  <span
                    className={`font-semibold ${
                      isAchieved ? 'text-income' : 'text-primary'
                    }`}
                  >
                    {percentage.toFixed(0)}%
                  </span>
                </div>

                <p className={`text-xs mt-2 ${isAchieved ? 'text-income' : 'text-muted-foreground'}`}>
                  {isAchieved ? '🎉 Goal Achieved!' : percentage >= 80 ? '💪 Almost there!' : '📈 Keep going!'}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
