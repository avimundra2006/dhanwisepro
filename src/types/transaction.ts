export type TransactionCategory = 'Food' | 'Bills' | 'Salary' | 'Fun';
export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: TransactionCategory;
  type: TransactionType;
  createdAt: string;
}
