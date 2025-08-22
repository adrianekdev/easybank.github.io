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
    <Card className="bg-gradient-primary text-white p-6 shadow-elevated border-0 animate-fade-in">
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
              className="text-white/80 hover:text-white hover:bg-white/10 p-1 h-auto transition-all duration-200 hover:scale-110"
            >
              {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="text-center">
          <p className="text-white/80 text-xs">This Month</p>
          <p className="text-lg font-semibold text-banking-income">+$3,240</p>
        </div>
        <div className="text-center">
          <p className="text-white/80 text-xs">Expenses</p>
          <p className="text-lg font-semibold text-banking-expense">-$1,890</p>
        </div>
      </div>
    </Card>
  );
};