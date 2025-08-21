import { useState } from "react";
import { CreditCard, Building, Zap, Wifi, Phone, Car } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const billCategories = [
  { name: "Electricity", icon: Zap, amount: "$89.50", company: "PowerGrid Corp", color: "text-yellow-500" },
  { name: "Internet", icon: Wifi, amount: "$65.99", company: "FastNet ISP", color: "text-blue-500" },
  { name: "Phone", icon: Phone, amount: "$45.00", company: "MobileTech", color: "text-green-500" },
  { name: "Insurance", icon: Car, amount: "$124.75", company: "SafeDrive Insurance", color: "text-purple-500" },
];

interface PayBillsModalProps {
  onPayBill: (amount: number) => void;
}

export const PayBillsModal = ({ onPayBill }: PayBillsModalProps) => {
  const [selectedBill, setSelectedBill] = useState(billCategories[0]);
  const [customAmount, setCustomAmount] = useState("");
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handlePayBill = () => {
    const amount = customAmount ? parseFloat(customAmount) : parseFloat(selectedBill.amount.replace('$', ''));
    
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid payment amount",
        variant: "destructive"
      });
      return;
    }

    onPayBill(amount);
    
    toast({
      title: "Bill Paid! 💳",
      description: `$${amount.toFixed(2)} paid to ${selectedBill.company}`,
    });

    setCustomAmount("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted/50 transition-all duration-200 hover:scale-105 group">
          <div className="p-3 rounded-full bg-banking-expense/10 group-hover:animate-pulse-glow">
            <CreditCard className="w-5 h-5 text-banking-expense" />
          </div>
          <span className="text-sm font-medium">Pay Bills</span>
        </button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-lg animate-scale-in">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-banking-expense/10">
              <CreditCard className="w-4 h-4 text-banking-expense" />
            </div>
            Pay Bills
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 animate-fade-in">
          {/* Bill Categories */}
          <div className="space-y-2">
            <Label>Select Bill</Label>
            <div className="grid grid-cols-2 gap-2">
              {billCategories.map((bill) => (
                <div 
                  key={bill.name}
                  className={`p-3 rounded-lg cursor-pointer transition-all border ${
                    selectedBill.name === bill.name 
                      ? 'bg-banking-expense/10 border-banking-expense/40' 
                      : 'bg-card hover:bg-muted/50 border-border'
                  }`}
                  onClick={() => setSelectedBill(bill)}
                >
                  <div className="flex items-center gap-2">
                    <bill.icon className={`w-4 h-4 ${bill.color}`} />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{bill.name}</div>
                      <div className="text-xs text-muted-foreground">{bill.company}</div>
                    </div>
                  </div>
                  <div className="text-right text-sm font-medium mt-1">{bill.amount}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Custom Amount */}
          <div className="space-y-2">
            <Label htmlFor="custom-amount">Custom Amount (Optional)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="custom-amount"
                placeholder={selectedBill.amount.replace('$', '')}
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="pl-8"
                type="number"
              />
            </div>
          </div>
          
          {/* Selected Bill Summary */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <selectedBill.icon className={`w-4 h-4 ${selectedBill.color}`} />
                <div>
                  <div className="font-medium">{selectedBill.name}</div>
                  <div className="text-sm text-muted-foreground">{selectedBill.company}</div>
                </div>
              </div>
              <div className="text-lg font-bold">
                ${customAmount || selectedBill.amount.replace('$', '')}
              </div>
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
              onClick={handlePayBill}
              className="flex-1 bg-banking-expense hover:opacity-90 transition-opacity"
            >
              Pay Bill
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};