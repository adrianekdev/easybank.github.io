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

  const handlePayBill = (amount: number) => {
    subtractFromBalance(amount);
  };

  const handlePurchase = (amount: number) => {
    subtractFromBalance(amount);
  };

  const handleGamble = (betAmount: number, result: number) => {
    subtractFromBalance(betAmount);
    if (result > 0) {
      addToBalance(result);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Mountain Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{
          backgroundImage: `url('/src/assets/mountain-bg.jpg')`
        }}
      />
      
      {/* Glassmorphism Overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10 backdrop-blur-[1px]" />
      
      <Toaster />
      {/* Header */}
      <header className="relative bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-white drop-shadow-lg animate-scale-in">NextBank</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 transition-colors" size={16} />
                <Input 
                  placeholder="Search transactions..." 
                  className="pl-10 w-64 bg-white/10 border-white/20 text-white placeholder:text-white/60 backdrop-blur-sm transition-all duration-200 focus:w-72 focus:bg-white/15"
                />
              </div>
              
              <Button variant="ghost" size="sm" className="hover:scale-110 transition-transform text-white/80 hover:text-white hover:bg-white/10">
                <Bell size={20} />
              </Button>
              
              <ThemeToggle />
              
              <Button variant="ghost" size="sm" className="hover:scale-110 transition-transform text-white/80 hover:text-white hover:bg-white/10">
                <User size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-fade-in">
          <h2 className="text-2xl font-bold mb-2 text-white drop-shadow-lg">Good morning, Adrian! ☀️</h2>
          <p className="text-white/80 drop-shadow-sm">Here's your financial overview for today.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <AccountBalance balance={balance} formatBalance={formatBalance} />
            <QuickActions onSendMoney={handleSendMoney} onCryptoInvest={handleCryptoInvest} onPayBill={handlePayBill} onPurchase={handlePurchase} onGamble={handleGamble} />
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
