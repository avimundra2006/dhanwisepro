import { TransactionCategory } from '@/types/transaction';
import { 
  Utensils, 
  Car, 
  FileText, 
  ShoppingBag, 
  Gamepad2, 
  Heart, 
  MoreHorizontal, 
  Wallet 
} from 'lucide-react';

export interface CategoryConfig {
  label: string;
  icon: typeof Utensils;
  color: string;
  bgColor: string;
  textColor: string;
  chartColor: string;
}

export const categoryConfig: Record<TransactionCategory, CategoryConfig> = {
  'Food & Dining': {
    label: 'Food & Dining',
    icon: Utensils,
    color: 'hsl(38, 92%, 50%)',
    bgColor: 'bg-orange-500/20',
    textColor: 'text-orange-400',
    chartColor: 'hsl(38, 92%, 50%)',
  },
  'Transport': {
    label: 'Transport',
    icon: Car,
    color: 'hsl(200, 80%, 55%)',
    bgColor: 'bg-sky-500/20',
    textColor: 'text-sky-400',
    chartColor: 'hsl(200, 80%, 55%)',
  },
  'Bills & Utilities': {
    label: 'Bills & Utilities',
    icon: FileText,
    color: 'hsl(280, 70%, 60%)',
    bgColor: 'bg-purple-500/20',
    textColor: 'text-purple-400',
    chartColor: 'hsl(280, 70%, 60%)',
  },
  'Shopping': {
    label: 'Shopping',
    icon: ShoppingBag,
    color: 'hsl(340, 82%, 60%)',
    bgColor: 'bg-pink-500/20',
    textColor: 'text-pink-400',
    chartColor: 'hsl(340, 82%, 60%)',
  },
  'Entertainment': {
    label: 'Entertainment',
    icon: Gamepad2,
    color: 'hsl(45, 93%, 47%)',
    bgColor: 'bg-yellow-500/20',
    textColor: 'text-yellow-400',
    chartColor: 'hsl(45, 93%, 47%)',
  },
  'Health': {
    label: 'Health',
    icon: Heart,
    color: 'hsl(0, 72%, 60%)',
    bgColor: 'bg-red-500/20',
    textColor: 'text-red-400',
    chartColor: 'hsl(0, 72%, 60%)',
  },
  'Miscellaneous': {
    label: 'Miscellaneous',
    icon: MoreHorizontal,
    color: 'hsl(215, 20%, 55%)',
    bgColor: 'bg-slate-500/20',
    textColor: 'text-slate-400',
    chartColor: 'hsl(215, 20%, 55%)',
  },
  'Salary': {
    label: 'Salary',
    icon: Wallet,
    color: 'hsl(160, 84%, 45%)',
    bgColor: 'bg-emerald-500/20',
    textColor: 'text-emerald-400',
    chartColor: 'hsl(160, 84%, 45%)',
  },
};

export const categories: TransactionCategory[] = [
  'Food & Dining',
  'Transport',
  'Bills & Utilities',
  'Shopping',
  'Entertainment',
  'Health',
  'Miscellaneous',
  'Salary',
];
