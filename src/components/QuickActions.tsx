import { CreditCard, PiggyBank } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SendMoneyModal } from "@/components/SendMoneyModal";
import { RequestMoneyModal } from "@/components/RequestMoneyModal";

const staticActions = [
  {
    icon: CreditCard,
    label: "Pay Bills",
    color: "text-banking-expense",
    bg: "bg-banking-expense/10"
  },
  {
    icon: PiggyBank,
    label: "Save",
    color: "text-banking-income",
    bg: "bg-banking-income/10"
  }
];

export const QuickActions = () => {
  return (
    <Card className="p-6 shadow-card bg-gradient-card animate-fade-in">
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SendMoneyModal />
        <RequestMoneyModal />
        {staticActions.map((action, index) => (
          <button
            key={index}
            className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted/50 transition-all duration-200 hover:scale-105 group"
          >
            <div className={`p-3 rounded-full ${action.bg} group-hover:animate-pulse-glow`}>
              <action.icon className={`w-5 h-5 ${action.color}`} />
            </div>
            <span className="text-sm font-medium">{action.label}</span>
          </button>
        ))}
      </div>
    </Card>
  );
};