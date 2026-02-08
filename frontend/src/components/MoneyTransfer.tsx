'use client';

import React from "react"

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronRight, Check } from 'lucide-react';

export function MoneyTransfer() {
  const [step, setStep] = useState(1);
  const [transferType, setTransferType] = useState('internal');
  const [formData, setFormData] = useState({
    recipientName: '',
    amount: '',
    accountNumber: '',
    notes: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTransfer = () => {
    setStep(3);
  };

  const resetForm = () => {
    setStep(1);
    setTransferType('internal');
    setFormData({
      recipientName: '',
      amount: '',
      accountNumber: '',
      notes: '',
    });
  };

  return (
    <div className="p-8 bg-background min-h-screen">
      <h1 className="text-4xl font-bold text-foreground mb-8">Send Money</h1>

      <div className="max-w-2xl">
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  num <= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}
              >
                {num < step ? <Check size={20} /> : num}
              </div>
              {num < 3 && <ChevronRight className={num <= step ? 'text-primary' : 'text-muted-foreground'} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <Card className="bg-card p-8 rounded-2xl border">
            <h2 className="text-2xl font-bold text-foreground mb-6">Choose Transfer Type</h2>
            <div className="space-y-4">
              <button
                onClick={() => setTransferType('internal')}
                className={`w-full p-6 border-2 rounded-xl transition-all ${
                  transferType === 'internal'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <h3 className="text-lg font-bold text-foreground text-left mb-1">Internal Transfer</h3>
                <p className="text-sm text-muted-foreground text-left">Transfer between your own accounts (instant)</p>
              </button>

              <button
                onClick={() => setTransferType('external')}
                className={`w-full p-6 border-2 rounded-xl transition-all ${
                  transferType === 'external'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <h3 className="text-lg font-bold text-foreground text-left mb-1">Send to Other Bank</h3>
                <p className="text-sm text-muted-foreground text-left">Transfer to another person's bank account (1-3 business days)</p>
              </button>
            </div>

            <Button onClick={() => setStep(2)} className="w-full mt-8 bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg rounded-lg">
              Continue
            </Button>
          </Card>
        )}

        {step === 2 && (
          <Card className="bg-card p-8 rounded-2xl border">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {transferType === 'internal' ? 'Internal Transfer Details' : 'External Transfer Details'}
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Recipient Name</label>
                <Input
                  type="text"
                  name="recipientName"
                  value={formData.recipientName}
                  onChange={handleInputChange}
                  placeholder="Enter recipient name"
                  className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  {transferType === 'internal' ? 'Account Number' : 'Bank Account Number'}
                </label>
                <Input
                  type="text"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                  placeholder="Enter account number"
                  className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-xl font-bold text-foreground"></span>
                  <Input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    className="w-full pl-8 px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Notes (Optional)</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Add a note for this transfer"
                  rows={3}
                  className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              <div className="flex gap-4">
                <Button onClick={() => setStep(1)} variant="outline" className="flex-1 px-6 py-3 border border-input rounded-lg hover:bg-muted">
                  Back
                </Button>
                <Button onClick={handleTransfer} className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg">
                  Review & Send
                </Button>
              </div>
            </div>
          </Card>
        )}

        {step === 3 && (
          <Card className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl border border-green-200">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={40} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold text-green-900 mb-4">Transfer Complete!</h2>
              <p className="text-green-700 mb-8">Your money has been sent successfully.</p>

              <div className="bg-white rounded-lg p-6 mb-8 text-left space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Recipient:</span>
                  <span className="font-semibold text-foreground">{formData.recipientName}</span>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-bold text-lg text-green-600">${formData.amount}</span>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span className="text-muted-foreground">Type:</span>
                  <span className="font-semibold text-foreground">{transferType === 'internal' ? 'Internal Transfer' : 'External Transfer'}</span>
                </div>
              </div>

              <Button onClick={resetForm} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg rounded-lg">
                Send Another Transfer
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
