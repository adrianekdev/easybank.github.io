import { ArrowUpRight, ArrowDownLeft, MoreHorizontal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const transactions = [
  // Today - 3 income transactions
  {
    id: 1,
    type: "income",
    description: "Lua Script Commission",
    amount: "+$4,200.00",
    date: "Today",
    category: "Development",
    icon: ArrowDownLeft
  },
  {
    id: 2,
    type: "income",
    description: "C# Automation Tool Sale",
    amount: "+$1,850.00",
    date: "Today",
    category: "Software Sales",
    icon: ArrowDownLeft
  },
  {
    id: 3,
    type: "income",
    description: "API Integration Service",
    amount: "+$950.00",
    date: "Today",
    category: "Development",
    icon: ArrowDownLeft
  },
  {
    id: 4,
    type: "expense",
    description: "Luarmor Obfuscator Pro",
    amount: "-$127.50",
    date: "Yesterday",
    category: "Dev Tools",
    icon: ArrowUpRight
  },
  // Yesterday - 3 income transactions
  {
    id: 5,
    type: "income",
    description: "Python Bot Framework",
    amount: "+$2,100.00",
    date: "Yesterday",
    category: "Development",
    icon: ArrowDownLeft
  },
  {
    id: 6,
    type: "income",
    description: "Roblox Script Hub Revenue",
    amount: "+$1,650.00",
    date: "Yesterday",
    category: "Scripts",
    icon: ArrowDownLeft
  },
  {
    id: 7,
    type: "income",
    description: "Discord Bot Commission",
    amount: "+$750.00",
    date: "Yesterday",
    category: "Development",
    icon: ArrowDownLeft
  },
  {
    id: 8,
    type: "expense",
    description: "GitHub Copilot Enterprise",
    amount: "-$89.20",
    date: "Dec 18",
    category: "AI Tools",
    icon: ArrowUpRight
  },
  // Dec 18 - 3 income transactions
  {
    id: 9,
    type: "income",
    description: "C++ Performance Optimization",
    amount: "+$3,200.00",
    date: "Dec 18",
    category: "Freelance",
    icon: ArrowDownLeft
  },
  {
    id: 10,
    type: "income",
    description: "React Dashboard Template",
    amount: "+$890.00",
    date: "Dec 18",
    category: "Frontend",
    icon: ArrowDownLeft
  },
  {
    id: 11,
    type: "income",
    description: "Minecraft Plugin Sales",
    amount: "+$1,250.00",
    date: "Dec 18",
    category: "Game Development",
    icon: ArrowDownLeft
  },
  {
    id: 12,
    type: "expense",
    description: "C# Advanced Decompiler",
    amount: "-$245.30",
    date: "Dec 17",
    category: "Dev Tools",
    icon: ArrowUpRight
  },
  // Dec 17 - 3 income transactions
  {
    id: 13,
    type: "income",
    description: "Web Scraping Service",
    amount: "+$1,800.00",
    date: "Dec 17",
    category: "Development",
    icon: ArrowDownLeft
  },
  {
    id: 14,
    type: "income",
    description: "Node.js Microservice",
    amount: "+$2,400.00",
    date: "Dec 17",
    category: "Backend",
    icon: ArrowDownLeft
  },
  {
    id: 15,
    type: "income",
    description: "Trading Bot Algorithm",
    amount: "+$5,500.00",
    date: "Dec 17",
    category: "FinTech",
    icon: ArrowDownLeft
  }
];

export const RecentTransactions = () => {
  return (
    <Card className="p-6 shadow-card bg-gradient-card animate-fade-in border-0 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-6">
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