import { CreditCard, MoreHorizontal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const cards = [
  {
    id: 1,
    name: "Apple Pay Card 🍎",
    number: "**** **** **** 1847",
    type: "Digital",
    balance: "$25,000.00",
    color: "bg-gradient-to-br from-gray-900 via-black to-gray-800"
  },
  {
    id: 2,
    name: "Business Card 💼",
    number: "**** **** **** 5629",
    type: "Credit",
    balance: "$7,247.83",
    color: "bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800"
  },
  {
    id: 3,
    name: "Premium Card 💎",
    number: "**** **** **** 9384",
    type: "Debit",
    balance: "$8,000.00",
    color: "bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600"
  }
];

export const BankingCards = () => {
  return (
    <Card className="p-6 shadow-card bg-gradient-card animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">My Cards</h2>
        <Button variant="ghost" size="sm" className="text-banking-primary hover:scale-105 transition-transform">
          <MoreHorizontal size={16} />
        </Button>
      </div>
      
      <div className="space-y-4">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`${card.color} text-white p-4 rounded-xl relative overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-elevated cursor-pointer animate-fade-in`}
            style={{animationDelay: `${index * 150}ms`}}
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-white/80 text-sm">{card.name}</p>
                <p className="text-white/60 text-xs">{card.type}</p>
              </div>
              <CreditCard className="text-white/60 transition-transform hover:scale-110" size={24} />
            </div>
            
            <div className="flex justify-between items-end">
              <div>
                <p className="text-white/80 text-xs mb-1">Balance</p>
                <p className="text-xl font-bold">{card.balance}</p>
              </div>
              <div>
                <p className="text-white/60 text-xs">{card.number}</p>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -right-4 -top-4 w-16 h-16 bg-white/10 rounded-full blur-sm"></div>
            <div className="absolute -left-2 -bottom-2 w-8 h-8 bg-white/10 rounded-full blur-sm"></div>
          </div>
        ))}
      </div>
    </Card>
  );
};