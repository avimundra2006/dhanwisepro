export type TransactionCategory = 
  | 'Food & Dining' 
  | 'Transport' 
  | 'Bills & Utilities' 
  | 'Shopping' 
  | 'Entertainment' 
  | 'Health' 
  | 'Miscellaneous' 
  | 'Salary';

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: TransactionCategory;
  type: TransactionType;
  date: string;
  createdAt: string;
}
