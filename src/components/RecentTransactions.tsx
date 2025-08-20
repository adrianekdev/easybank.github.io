import { ArrowUpRight, ArrowDownLeft, MoreHorizontal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const transactions = [
  {
    id: 1,
    type: "income",
    description: "Lua Project",
    amount: "+$4,200.00",
    date: "Today",
    category: "Salary",
    icon: ArrowDownLeft
  },
  {
    id: 2,
    type: "expense",
    description: "Luarmor Obfuscator",
    amount: "-$127.50",
    date: "Yesterday",
    category: "Utilities",
    icon: ArrowUpRight
  },
  {
    id: 3,
    type: "expense",
    description: "Github Enterprise",
    amount: "-$89.20",
    date: "Dec 18",
    category: "Utilities",
    icon: ArrowUpRight
  },
  {
    id: 4,
    type: "CSrin",
    description: "Freelance Payment",
    amount: "+$850.00",
    date: "Dec 17",
    category: "Income",
    icon: ArrowDownLeft
  },
  {
    id: 5,
    type: "expense",
    description: "Biedronka",
    amount: "-$12.40",
    date: "Dec 17",
    category: "Food",
    icon: ArrowUpRight
  }
];

export const RecentTransactions = () => {
  return (
    <Card className="p-6 shadow-card bg-gradient-card animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
        <Button variant="ghost" size="sm" className="text-banking-primary hover:scale-105 transition-transform">
          View All
        </Button>
      </div>
      
      <div className="space-y-3">
        {transactions.map((transaction, index) => (
          <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-all duration-200 hover:scale-[1.02] group animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full transition-transform group-hover:scale-110 ${
                transaction.type === 'income' 
                  ? 'bg-banking-income/10 text-banking-income' 
                  : 'bg-banking-expense/10 text-banking-expense'
              }`}>
                <transaction.icon size={16} />
              </div>
              <div>
                <p className="font-medium text-sm">{transaction.description}</p>
                <p className="text-xs text-muted-foreground">{transaction.category} • {transaction.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-semibold ${
                transaction.type === 'income' 
                  ? 'text-banking-income' 
                  : 'text-banking-expense'
              }`}>
                {transaction.amount}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};