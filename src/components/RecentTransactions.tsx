import { ArrowUpRight, ArrowDownLeft, MoreHorizontal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const transactions = [
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
    type: "expense",
    description: "Luarmor Obfuscator Pro",
    amount: "-$127.50",
    date: "Yesterday",
    category: "Dev Tools",
    icon: ArrowUpRight
  },
  {
    id: 3,
    type: "expense",
    description: "GitHub Copilot Enterprise",
    amount: "-$89.20",
    date: "Dec 18",
    category: "AI Tools",
    icon: ArrowUpRight
  },
  {
    id: 4,
    type: "income",
    description: "C++ Performance Optimization",
    amount: "+$850.00",
    date: "Dec 17",
    category: "Freelance",
    icon: ArrowDownLeft
  },
  {
    id: 5,
    type: "expense",
    description: "C# Advanced Decompiler",
    amount: "-$245.30",
    date: "Dec 16",
    category: "Dev Tools",
    icon: ArrowUpRight
  },
  {
    id: 6,
    type: "income",
    description: "Roblox Script Hub Sale",
    amount: "+$1,250.00",
    date: "Dec 15",
    category: "Scripts",
    icon: ArrowDownLeft
  },
  {
    id: 7,
    type: "expense",
    description: "JetBrains All Products Pack",
    amount: "-$649.00",
    date: "Dec 14",
    category: "IDE",
    icon: ArrowUpRight
  },
  {
    id: 8,
    type: "income",
    description: "Python Automation Bot",
    amount: "+$2,100.00",
    date: "Dec 13",
    category: "Development",
    icon: ArrowDownLeft
  },
  {
    id: 9,
    type: "expense",
    description: "VMware Workstation Pro",
    amount: "-$199.99",
    date: "Dec 12",
    category: "Virtualization",
    icon: ArrowUpRight
  },
  {
    id: 10,
    type: "income",
    description: "Discord Bot Framework",
    amount: "+$750.00",
    date: "Dec 11",
    category: "Development",
    icon: ArrowDownLeft
  },
  {
    id: 11,
    type: "expense",
    description: "Malware Analysis Sandbox",
    amount: "-$299.99",
    date: "Dec 10",
    category: "Security Tools",
    icon: ArrowUpRight
  },
  {
    id: 12,
    type: "income",
    description: "React Component Library",
    amount: "+$1,800.00",
    date: "Dec 9",
    category: "Frontend",
    icon: ArrowDownLeft
  },
  {
    id: 13,
    type: "expense",
    description: "Burp Suite Professional",
    amount: "-$399.00",
    date: "Dec 8",
    category: "Penetration Testing",
    icon: ArrowUpRight
  },
  {
    id: 14,
    type: "income",
    description: "Minecraft Plugin Development",
    amount: "+$950.00",
    date: "Dec 7",
    category: "Game Development",
    icon: ArrowDownLeft
  },
  {
    id: 15,
    type: "expense",
    description: "IDA Pro License",
    amount: "-$1,879.00",
    date: "Dec 6",
    category: "Reverse Engineering",
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