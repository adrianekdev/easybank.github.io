import { useState } from "react";
import { Home } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import luxuryHouse from "@/assets/luxury-house.jpg";
import penthouse from "@/assets/penthouse.jpg";

interface BuyHouseModalProps {
  onPurchase: (amount: number) => void;
}

const properties = [
  {
    id: 1,
    name: "Luxury Mansion",
    price: 2500000,
    image: luxuryHouse,
    specs: "6 Bed • 8 Bath • 12,000 sq ft • Pool & Spa"
  },
  {
    id: 2,
    name: "Manhattan Penthouse",
    price: 8500000,
    image: penthouse,
    specs: "4 Bed • 5 Bath • 4,500 sq ft • City Views"
  },
  {
    id: 3,
    name: "Beachfront Villa",
    price: 3200000,
    image: luxuryHouse,
    specs: "5 Bed • 6 Bath • 8,000 sq ft • Private Beach"
  }
];

export const BuyHouseModal = ({ onPurchase }: BuyHouseModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handlePurchase = (property: typeof properties[0]) => {
    onPurchase(property.price);
    setIsOpen(false);
    toast({
      title: "Property Purchase Successful! 🏡",
      description: `Welcome to your new ${property.name}!`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-banking-income/10 to-banking-income/5 border border-banking-income/20 hover:from-banking-income/20 hover:to-banking-income/10 transition-all duration-300 cursor-pointer group backdrop-blur-sm hover:scale-105">
          <div className="p-3 rounded-full bg-banking-income/20 group-hover:bg-banking-income/30 transition-colors duration-200 mb-2">
            <Home className="text-banking-income group-hover:scale-110 transition-transform duration-200" size={20} />
          </div>
          <span className="text-sm font-medium text-foreground">Buy Property</span>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-background to-background/95 backdrop-blur-xl border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Luxury Real Estate
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <Card key={property.id} className="overflow-hidden border-primary/20 bg-gradient-card backdrop-blur-sm hover:shadow-elevated transition-all duration-300 group">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={property.image} 
                  alt={property.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2 text-foreground">{property.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{property.specs}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-banking-income">
                    ${property.price.toLocaleString()}
                  </span>
                  <Button 
                    onClick={() => handlePurchase(property)}
                    className="bg-gradient-primary hover:shadow-glow transition-all duration-300 hover:scale-105"
                  >
                    Buy Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};