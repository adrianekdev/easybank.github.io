import { ArrowUpRight, ArrowDownLeft, CreditCard, PiggyBank } from "lucide-react";
import { Card } from "@/components/ui/card";

const actions = [
  {
    icon: ArrowUpRight,
    label: "Send Money",
    color: "text-banking-primary",
    bg: "bg-banking-primary/10"
  },
  {
    icon: ArrowDownLeft,
    label: "Request",
    color: "text-banking-secondary",
    bg: "bg-banking-secondary/10"
  },
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
    <Card className="p-6 shadow-card bg-gradient-card">
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className={`p-3 rounded-full ${action.bg}`}>
              <action.icon className={`w-5 h-5 ${action.color}`} />
            </div>
            <span className="text-sm font-medium">{action.label}</span>
          </button>
        ))}
      </div>
    </Card>
  );
};