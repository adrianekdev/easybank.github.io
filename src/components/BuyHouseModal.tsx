import { useState } from "react";
import { Home } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import luxuryHouse from "@/assets/luxury-house.jpg";
import penthouse from "@/assets/penthouse.jpg";
import beachVilla from "@/assets/beach-villa.jpg";
import skiChalet from "@/assets/ski-chalet.jpg";
import castle from "@/assets/castle.jpg";

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
    image: beachVilla,
    specs: "5 Bed • 6 Bath • 8,000 sq ft • Private Beach"
  },
  {
    id: 4,
    name: "Swiss Ski Chalet",
    price: 4500000,
    image: skiChalet,
    specs: "7 Bed • 9 Bath • 10,000 sq ft • Mountain Views"
  },
  {
    id: 5,
    name: "Modern Castle Estate",
    price: 15000000,
    image: castle,
    specs: "12 Bed • 15 Bath • 25,000 sq ft • Historic"
  },
  {
    id: 6,
    name: "Malibu Beach House",
    price: 7800000,
    image: beachVilla,
    specs: "4 Bed • 6 Bath • 6,500 sq ft • Ocean Front"
  },
  {
    id: 7,
    name: "Aspen Mountain Lodge",
    price: 6200000,
    image: skiChalet,
    specs: "6 Bed • 8 Bath • 9,500 sq ft • Ski Access"
  },
  {
    id: 8,
    name: "French Château",
    price: 12000000,
    image: castle,
    specs: "10 Bed • 12 Bath • 20,000 sq ft • Vineyard"
  },
  {
    id: 9,
    name: "Tokyo Penthouse",
    price: 5400000,
    image: penthouse,
    specs: "3 Bed • 4 Bath • 3,200 sq ft • City Center"
  },
  {
    id: 10,
    name: "Beverly Hills Mansion",
    price: 18500000,
    image: luxuryHouse,
    specs: "8 Bed • 12 Bath • 15,000 sq ft • Celebrity Area"
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
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-background via-background/98 to-background/95 backdrop-blur-xl border-primary/30 shadow-2xl">
        <DialogHeader className="border-b border-primary/20 pb-6 mb-6">
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-banking-income via-primary to-secondary bg-clip-text text-transparent">
            🏡 Luxury Real Estate Portfolio
          </DialogTitle>
          <p className="text-muted-foreground mt-2">Exclusive properties and premium real estate investments</p>
        </DialogHeader>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {properties.map((property) => (
            <Card key={property.id} className="overflow-hidden border-primary/30 bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-sm hover:shadow-2xl hover:shadow-banking-income/20 transition-all duration-500 group hover:scale-105 hover:border-banking-income/50">
              <div className="aspect-video overflow-hidden relative">
                <img 
                  src={property.image} 
                  alt={property.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-banking-income transition-colors duration-300">{property.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{property.specs}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold bg-gradient-to-r from-banking-income to-primary bg-clip-text text-transparent">
                    ${property.price.toLocaleString()}
                  </span>
                  <Button 
                    onClick={() => handlePurchase(property)}
                    className="bg-gradient-to-r from-banking-income to-banking-income/80 hover:from-banking-income/90 hover:to-banking-income/70 hover:shadow-lg hover:shadow-banking-income/30 transition-all duration-300 hover:scale-105 text-white font-semibold"
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