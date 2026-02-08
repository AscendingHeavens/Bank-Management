'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Filter } from 'lucide-react';

export function DataTable() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const transactions = [
    { id: 1, name: 'Coffee Shop', amount: -5.50, date: 'Today', category: 'Dining' },
    { id: 2, name: 'Salary Deposit', amount: 3500.00, date: 'Yesterday', category: 'Income' },
    { id: 3, name: 'Netflix Subscription', amount: -15.99, date: '2 days ago', category: 'Entertainment' },
    { id: 4, name: 'Transfer from Savings', amount: 1000.00, date: '3 days ago', category: 'Transfer' },
    { id: 5, name: 'Gas Station', amount: -45.00, date: '1 week ago', category: 'Transportation' },
    { id: 6, name: 'Grocery Store', amount: -87.45, date: '1 week ago', category: 'Shopping' },
    { id: 7, name: 'Freelance Payment', amount: 500.00, date: '2 weeks ago', category: 'Income' },
    { id: 8, name: 'Electric Bill', amount: -125.50, date: '2 weeks ago', category: 'Utilities' },
  ];

  const filteredTransactions = transactions.filter((t) => {
    const matchesFilter = filter === 'all' || (filter === 'income' && t.amount > 0) || (filter === 'expense' && t.amount < 0);
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    totalIncome: transactions.filter((t) => t.amount > 0).reduce((sum, t) => sum + t.amount, 0),
    totalExpense: Math.abs(transactions.filter((t) => t.amount < 0).reduce((sum, t) => sum + t.amount, 0)),
  };

  return (
    <div className="p-8 bg-background min-h-screen">
      <h1 className="text-4xl font-bold text-foreground mb-8">Transaction History</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        
        <Card className="bg-card p-6 rounded-2xl border">
          <p className="text-sm text-muted-foreground mb-2">Total Expenses</p>
          <p className="text-3xl font-bold text-red-600">${stats.totalExpense.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
        </Card>
      </div>

      <div className="mb-8">
        <div className="flex flex-col gap-4 mb-6">
          <div className="relative">
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'all' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              All Transactions
            </Button>
            <Button
              onClick={() => setFilter('income')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'income' ? 'bg-green-600 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              Income
            </Button>
            <Button
              onClick={() => setFilter('expense')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'expense' ? 'bg-red-600 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              Expenses
            </Button>
          </div>
        </div>

        <Card className="bg-card rounded-2xl overflow-hidden border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Description</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Date</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 text-foreground font-medium">{transaction.name}</td>
                      <td className="px-6 py-4 text-muted-foreground">{transaction.category}</td>
                      <td className="px-6 py-4 text-muted-foreground">{transaction.date}</td>
                      <td className={`px-6 py-4 text-right font-bold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.amount > 0 ? '+' : '-'}${Math.abs(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                      No transactions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
