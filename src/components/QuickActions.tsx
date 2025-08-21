import { CreditCard, PiggyBank } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SendMoneyModal } from "@/components/SendMoneyModal";
import { RequestMoneyModal } from "@/components/RequestMoneyModal";
import { CryptoInvestModal } from "@/components/CryptoInvestModal";
import { PayBillsModal } from "@/components/PayBillsModal";
import { BuyCarModal } from "@/components/BuyCarModal";
import { BuyHouseModal } from "@/components/BuyHouseModal";
import { GamblingModal } from "@/components/GamblingModal";

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
  onGamble: (betAmount: number, result: number) => void;
}

export const QuickActions = ({ onSendMoney, onCryptoInvest, onPayBill, onPurchase, onGamble }: QuickActionsProps) => {
  return (
    <Card className="p-8 shadow-2xl bg-white/10 backdrop-blur-xl animate-fade-in border border-white/20 hover:bg-white/15 transition-all duration-300">
      <h2 className="text-xl font-bold mb-8 text-white drop-shadow-lg">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6">
        <SendMoneyModal onSendMoney={onSendMoney} />
        <RequestMoneyModal />
        <CryptoInvestModal onInvest={onCryptoInvest} />
        <PayBillsModal onPayBill={onPayBill} />
        <BuyCarModal onPurchase={onPurchase} />
        <BuyHouseModal onPurchase={onPurchase} />
        <GamblingModal onGamble={onGamble} />
      </div>
    </Card>
  );
};