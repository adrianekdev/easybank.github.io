import { useState } from "react";

export const useBalance = () => {
  const [balance, setBalance] = useState(40247.83);

  const subtractFromBalance = (amount: number) => {
    setBalance(prev => Math.max(0, prev - amount));
  };

  const addToBalance = (amount: number) => {
    setBalance(prev => prev + amount);
  };

  const formatBalance = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return {
    balance,
    formatBalance,
    subtractFromBalance,
    addToBalance
  };
};