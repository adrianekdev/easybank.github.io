import { CreditCard, PiggyBank } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SendMoneyModal } from "@/components/SendMoneyModal";
import { RequestMoneyModal } from "@/components/RequestMoneyModal";
import { CryptoInvestModal } from "@/components/CryptoInvestModal";
import { PayBillsModal } from "@/components/PayBillsModal";
import { BuyCarModal } from "@/components/BuyCarModal";
import { BuyHouseModal } from "@/components/BuyHouseModal";

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
  onPurchase: (amount: number) => void;
}

export const QuickActions = ({ onSendMoney, onCryptoInvest, onPayBill, onPurchase }: QuickActionsProps) => {
  return (
    <Card className="p-8 shadow-elevated bg-gradient-card animate-fade-in border-primary/20 backdrop-blur-xl">
      <h2 className="text-xl font-bold mb-8 text-foreground bg-gradient-primary bg-clip-text text-transparent">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <SendMoneyModal onSendMoney={onSendMoney} />
        <RequestMoneyModal />
        <CryptoInvestModal onInvest={onCryptoInvest} />
        <PayBillsModal onPayBill={onPayBill} />
        <BuyCarModal onPurchase={onPurchase} />
        <BuyHouseModal onPurchase={onPurchase} />
      </div>
    </Card>
  );
};