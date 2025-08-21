import { useState } from "react";
import { TrendingUp, X, DollarSign } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface CryptoInvestModalProps {
  onInvest: (amount: number, result: number) => void;
}

export const CryptoInvestModal = ({ onInvest }: CryptoInvestModalProps) => {
  const [amount, setAmount] = useState("");
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleInvest = () => {
    const investAmount = parseFloat(amount);
    
    if (!amount || investAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid investment amount",
        variant: "destructive"
      });
      return;
    }

    // Random chance: 60% to double, 40% to lose everything
    const success = Math.random() > 0.4;
    const result = success ? investAmount * 2 : 0;
    
    onInvest(investAmount, result);
    
    if (success) {
      toast({
        title: "🚀 Crypto Success!",
        description: `Your $${investAmount} investment doubled to $${result}!`,
      });
    } else {
      toast({
        title: "💸 Market Crash!",
        description: `Your $${investAmount} investment was lost to market volatility`,
        variant: "destructive"
      });
    }

    setAmount("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted/50 transition-all duration-200 hover:scale-105 group">
          <div className="p-3 rounded-full bg-banking-primary/10 group-hover:animate-pulse-glow">
            <TrendingUp className="w-5 h-5 text-banking-primary" />
          </div>
          <span className="text-sm font-medium">Crypto Invest</span>
        </button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md animate-scale-in">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-banking-primary/10">
              <TrendingUp className="w-4 h-4 text-banking-primary" />
            </div>
            Crypto Investment
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 animate-fade-in">
          <div className="bg-muted/30 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              ⚠️ High Risk Investment: 60% chance to double your money, 40% chance to lose it all!
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="crypto-amount">Investment Amount</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                id="crypto-amount"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-10"
                type="number"
              />
            </div>
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleInvest}
              className="flex-1 bg-gradient-primary hover:opacity-90 transition-opacity"
            >
              Invest ${amount || "0.00"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};