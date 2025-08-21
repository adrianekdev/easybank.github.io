import { CreditCard, PiggyBank } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SendMoneyModal } from "@/components/SendMoneyModal";
import { RequestMoneyModal } from "@/components/RequestMoneyModal";
import { CryptoInvestModal } from "@/components/CryptoInvestModal";
import { PayBillsModal } from "@/components/PayBillsModal";

const staticActions = [
  {
    icon: CreditCard,
    label: "Pay Bills",
    color: "text-banking-expense",
    bg: "bg-banking-expense/10"
  }
];

interface QuickActionsProps {
  onSendMoney: (amount: number) => void;
  onCryptoInvest: (investAmount: number, result: number) => void;
  onPayBill: (amount: number) => void;
}

export const QuickActions = ({ onSendMoney, onCryptoInvest, onPayBill }: QuickActionsProps) => {
  return (
    <Card className="p-6 shadow-card bg-gradient-card animate-fade-in border-0 backdrop-blur-sm">
      <h2 className="text-lg font-semibold mb-6 text-foreground">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SendMoneyModal onSendMoney={onSendMoney} />
        <RequestMoneyModal />
        <CryptoInvestModal onInvest={onCryptoInvest} />
        <PayBillsModal onPayBill={onPayBill} />
      </div>
    </Card>
  );
};