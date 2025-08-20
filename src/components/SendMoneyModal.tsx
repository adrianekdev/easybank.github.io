import { useState } from "react";
import { ArrowUpRight, X, User } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export const SendMoneyModal = () => {
  const [username, setUsername] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleSend = () => {
    if (!username || !amount) {
      toast({
        title: "Missing Information",
        description: "Please enter both username and amount",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Money Sent! 💰",
      description: `$${amount} sent to @${username}`,
    });

    setUsername("");
    setAmount("");
    setNote("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted/50 transition-all duration-200 hover:scale-105 group">
          <div className="p-3 rounded-full bg-banking-primary/10 group-hover:animate-pulse-glow">
            <ArrowUpRight className="w-5 h-5 text-banking-primary" />
          </div>
          <span className="text-sm font-medium">Send Money</span>
        </button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md animate-scale-in">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-banking-primary/10">
              <ArrowUpRight className="w-4 h-4 text-banking-primary" />
            </div>
            Send Money
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 animate-fade-in">
          <div className="space-y-2">
            <Label htmlFor="username">To Username</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                id="username"
                placeholder="@username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="amount"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-8"
                type="number"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="note">Note (optional)</Label>
            <Input
              id="note"
              placeholder="What's this for?"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
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
              onClick={handleSend}
              className="flex-1 bg-gradient-primary hover:opacity-90 transition-opacity"
            >
              Send ${amount || "0.00"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};