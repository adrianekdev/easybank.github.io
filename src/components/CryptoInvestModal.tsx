import { useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const cryptos = [
  { name: "Bitcoin", symbol: "BTC", price: 67840.23, change: "+2.4%" },
  { name: "Ethereum", symbol: "ETH", price: 3421.67, change: "-1.2%" },
  { name: "Solana", symbol: "SOL", price: 145.89, change: "+5.7%" },
  { name: "Cardano", symbol: "ADA", price: 0.89, change: "+3.1%" }
];

interface CryptoInvestModalProps {
  onInvest: (amount: number, result: number) => void;
}

export const CryptoInvestModal = ({ onInvest }: CryptoInvestModalProps) => {
  const [amount, setAmount] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState(cryptos[0]);
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

    // More realistic crypto simulation - 55% gain, 45% loss
    const marketMovement = Math.random();
    let result = 0;
    let message = "";
    
    if (marketMovement > 0.45) {
      // Gain between 1.1x to 2.5x
      const multiplier = 1.1 + (Math.random() * 1.4);
      result = investAmount * multiplier;
      message = `${selectedCrypto.symbol} surged! Your $${investAmount} became $${result.toFixed(2)}`;
    } else {
      // Loss between 0.1x to 0.8x
      const multiplier = 0.1 + (Math.random() * 0.7);
      result = investAmount * multiplier;
      message = `${selectedCrypto.symbol} crashed! Your $${investAmount} is now worth $${result.toFixed(2)}`;
    }
    
    onInvest(investAmount, result);
    
    toast({
      title: marketMovement > 0.45 ? "🚀 Portfolio Up!" : "📉 Market Dip",
      description: message,
      variant: marketMovement > 0.45 ? "default" : "destructive"
    });

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
      
      <DialogContent className="sm:max-w-lg animate-scale-in">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-banking-primary/10">
              <TrendingUp className="w-4 h-4 text-banking-primary" />
            </div>
            Crypto Trading
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 animate-fade-in">
          {/* Market Overview */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <h3 className="font-medium mb-3">Live Market</h3>
            <div className="grid grid-cols-2 gap-2">
              {cryptos.map((crypto) => (
                <div 
                  key={crypto.symbol}
                  className={`p-2 rounded cursor-pointer transition-all ${
                    selectedCrypto.symbol === crypto.symbol 
                      ? 'bg-banking-primary/20 border border-banking-primary/40' 
                      : 'bg-card hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedCrypto(crypto)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">{crypto.symbol}</span>
                    <div className={`flex items-center gap-1 text-xs ${
                      crypto.change.startsWith('+') ? 'text-banking-income' : 'text-banking-expense'
                    }`}>
                      {crypto.change.startsWith('+') ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                      {crypto.change}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">${crypto.price.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
          
          
          {/* Investment Amount */}
          <div className="space-y-2">
            <Label htmlFor="crypto-amount">Investment Amount (USD)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="crypto-amount"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-8"
                type="number"
              />
            </div>
            {amount && (
              <div className="text-xs text-muted-foreground">
                ≈ {(parseFloat(amount) / selectedCrypto.price).toFixed(6)} {selectedCrypto.symbol}
              </div>
            )}
          </div>
          
          {/* Risk Warning */}
          <div className="bg-banking-expense/10 border border-banking-expense/20 p-3 rounded-lg">
            <p className="text-xs text-banking-expense">
              ⚠️ Cryptocurrency trading involves substantial risk. Market prices are volatile and unpredictable.
            </p>
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
              Buy {selectedCrypto.symbol}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};