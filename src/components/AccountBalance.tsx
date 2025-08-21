import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AccountBalanceProps {
  balance: number;
  formatBalance: (amount: number) => string;
}

export const AccountBalance = ({ balance, formatBalance }: AccountBalanceProps) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <Card className="bg-white/10 backdrop-blur-xl text-white p-6 shadow-2xl border border-white/20 animate-fade-in hover:bg-white/15 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-white/80 text-sm">Total Balance</p>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold animate-scale-in">
              {isVisible ? formatBalance(balance) : "••••••"}
            </h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(!isVisible)}
              className="text-white/80 hover:text-white hover:bg-white/20 p-1 h-auto transition-all duration-200 hover:scale-110 backdrop-blur-sm"
            >
              {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="text-center">
          <p className="text-white/80 text-xs">This Month</p>
          <p className="text-lg font-semibold text-banking-income">+$32,512</p>
        </div>
        <div className="text-center">
          <p className="text-white/80 text-xs">Expenses</p>
          <p className="text-lg font-semibold text-banking-expense">-$4,150</p>
        </div>
      </div>
    </Card>
  );
};