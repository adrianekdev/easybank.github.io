import { useState } from "react";
import { Dices } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import plinkoImage from "@/assets/plinko.jpg";
import diceImage from "@/assets/dice.jpg";
import chickenImage from "@/assets/chicken.jpg";

interface GamblingModalProps {
  onGamble: (betAmount: number, result: number) => void;
}

export const GamblingModal = ({ onGamble }: GamblingModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [betAmount, setBetAmount] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  const games = [
    {
      id: "plinko",
      name: "Plinko",
      image: plinkoImage,
      description: "Drop the ball and watch it bounce!"
    },
    {
      id: "dice",
      name: "Dice Roll",
      image: diceImage,
      description: "Roll the dice for 2x or lose it all!"
    },
    {
      id: "chicken",
      name: "Chicken Cross",
      image: chickenImage,
      description: "Help the chicken cross safely!"
    }
  ];

  const playGame = async (gameId: string) => {
    const bet = parseFloat(betAmount);
    if (!bet || bet <= 0) {
      toast({
        title: "Invalid Bet",
        description: "Please enter a valid bet amount.",
        variant: "destructive"
      });
      return;
    }

    setIsPlaying(true);
    
    // Simulate game delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    let multiplier = 0;
    let resultMessage = "";
    
    switch (gameId) {
      case "plinko":
        const plinkoMultipliers = [0, 0.5, 1, 1.5, 2, 5, 10, 5, 2, 1.5, 1, 0.5, 0];
        multiplier = plinkoMultipliers[Math.floor(Math.random() * plinkoMultipliers.length)];
        resultMessage = `Ball landed in ${multiplier}x slot!`;
        break;
      case "dice":
        const diceRoll = Math.floor(Math.random() * 6) + 1;
        multiplier = diceRoll >= 4 ? 2 : 0;
        resultMessage = `You rolled a ${diceRoll}! ${multiplier > 0 ? "You win!" : "You lose!"}`;
        break;
      case "chicken":
        const crossSuccess = Math.random() > 0.4;
        multiplier = crossSuccess ? 1.8 : 0;
        resultMessage = crossSuccess ? "Chicken crossed safely!" : "Chicken got caught!";
        break;
    }
    
    const winnings = bet * multiplier;
    const netResult = winnings - bet;
    
    onGamble(bet, winnings);
    setIsPlaying(false);
    
    toast({
      title: netResult > 0 ? "🎉 You Won!" : "💸 You Lost!",
      description: `${resultMessage} ${netResult > 0 ? `+$${netResult.toFixed(2)}` : `-$${bet.toFixed(2)}`}`,
      variant: netResult > 0 ? "default" : "destructive"
    });
    
    setBetAmount("");
    setSelectedGame(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-destructive/10 to-destructive/5 border border-destructive/20 hover:from-destructive/20 hover:to-destructive/10 transition-all duration-300 cursor-pointer group backdrop-blur-sm hover:scale-105">
          <div className="p-3 rounded-full bg-destructive/20 group-hover:bg-destructive/30 transition-colors duration-200 mb-2">
            <Dices className="text-destructive group-hover:scale-110 transition-transform duration-200" size={20} />
          </div>
          <span className="text-sm font-medium text-foreground">Casino</span>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-background to-background/95 backdrop-blur-xl border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-destructive to-primary bg-clip-text text-transparent">
            🎰 Casino Games
          </DialogTitle>
        </DialogHeader>
        
        {!selectedGame ? (
          <div className="grid gap-6 md:grid-cols-3">
            {games.map((game) => (
              <Card key={game.id} className="overflow-hidden border-primary/20 bg-gradient-card backdrop-blur-sm hover:shadow-elevated transition-all duration-300 group cursor-pointer"
                    onClick={() => setSelectedGame(game.id)}>
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={game.image} 
                    alt={game.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-2 text-foreground">{game.name}</h3>
                  <p className="text-sm text-muted-foreground">{game.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => setSelectedGame(null)}>
                ← Back to Games
              </Button>
              <h3 className="text-xl font-bold">
                {games.find(g => g.id === selectedGame)?.name}
              </h3>
            </div>
            
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Bet Amount ($)</label>
                <Input
                  type="number"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                  placeholder="Enter bet amount..."
                  min="1"
                />
              </div>
              <Button 
                onClick={() => playGame(selectedGame)}
                disabled={isPlaying || !betAmount}
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
              >
                {isPlaying ? "Playing..." : "Place Bet"}
              </Button>
            </div>
            
            {isPlaying && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Game in progress...</p>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};