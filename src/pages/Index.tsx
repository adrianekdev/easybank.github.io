import { AccountBalance } from "@/components/AccountBalance";
import { QuickActions } from "@/components/QuickActions";
import { RecentTransactions } from "@/components/RecentTransactions";
import { BankingCards } from "@/components/BankingCards";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useBalance } from "@/hooks/useBalance";
import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  const { balance, formatBalance, subtractFromBalance, addToBalance } = useBalance();

  const handleSendMoney = (amount: number) => {
    subtractFromBalance(amount);
  };

  const handleCryptoInvest = (investAmount: number, result: number) => {
    subtractFromBalance(investAmount);
    if (result > 0) {
      addToBalance(result);
    }
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Toaster />
      {/* Header */}
      <header className="bg-card shadow-card border-b backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-banking-primary animate-scale-in">NextBank</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground transition-colors" size={16} />
                <Input 
                  placeholder="Search transactions..." 
                  className="pl-10 w-64 transition-all duration-200 focus:w-72"
                />
              </div>
              
              <Button variant="ghost" size="sm" className="hover:scale-110 transition-transform">
                <Bell size={20} />
              </Button>
              
              <ThemeToggle />
              
              <Button variant="ghost" size="sm" className="hover:scale-110 transition-transform">
                <User size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-fade-in">
          <h2 className="text-2xl font-bold mb-2">Good morning, Adrian! ☀️</h2>
          <p className="text-muted-foreground">Here's your financial overview for today.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <AccountBalance balance={balance} formatBalance={formatBalance} />
            <QuickActions onSendMoney={handleSendMoney} onCryptoInvest={handleCryptoInvest} />
            <RecentTransactions />
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            <BankingCards />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
