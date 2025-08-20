import { CreditCard, MoreHorizontal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const cards = [
  {
    id: 1,
    name: "Premium Card",
    number: "**** **** **** 3521",
    type: "Debit",
    balance: "$8,430.00",
    color: "bg-gradient-primary"
  },
  {
    id: 2,
    name: "Business Card",
    number: "**** **** **** 7892",
    type: "Credit",
    balance: "$2,150.00",
    color: "bg-gradient-success"
  }
];

export const BankingCards = () => {
  return (
    <Card className="p-6 shadow-card bg-gradient-card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">My Cards</h2>
        <Button variant="ghost" size="sm" className="text-banking-primary">
          <MoreHorizontal size={16} />
        </Button>
      </div>
      
      <div className="space-y-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`${card.color} text-white p-4 rounded-xl relative overflow-hidden`}
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-white/80 text-sm">{card.name}</p>
                <p className="text-white/60 text-xs">{card.type}</p>
              </div>
              <CreditCard className="text-white/60" size={24} />
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