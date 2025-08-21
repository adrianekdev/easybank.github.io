import { useState } from "react";
import { Car } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import bmwM4 from "@/assets/bmw-m4.jpg";
import ferrari from "@/assets/ferrari.jpg";
import helicopter from "@/assets/helicopter.jpg";

interface BuyCarModalProps {
  onPurchase: (amount: number) => void;
}

const vehicles = [
  {
    id: 1,
    name: "BMW M4 Competition",
    price: 75000,
    image: bmwM4,
    specs: "473 HP • 0-60 in 3.8s • Twin Turbo"
  },
  {
    id: 2,
    name: "Ferrari F8 Tributo",
    price: 280000,
    image: ferrari,
    specs: "710 HP • 0-60 in 2.9s • V8 Twin Turbo"
  },
  {
    id: 3,
    name: "Luxury Helicopter",
    price: 2500000,
    image: helicopter,
    specs: "6 Passengers • 400 Mile Range • Premium Interior"
  }
];

export const BuyCarModal = ({ onPurchase }: BuyCarModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handlePurchase = (vehicle: typeof vehicles[0]) => {
    onPurchase(vehicle.price);
    setIsOpen(false);
    toast({
      title: "Purchase Successful! 🎉",
      description: `Congratulations on your new ${vehicle.name}!`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-banking-primary/10 to-banking-primary/5 border border-banking-primary/20 hover:from-banking-primary/20 hover:to-banking-primary/10 transition-all duration-300 cursor-pointer group backdrop-blur-sm hover:scale-105">
          <div className="p-3 rounded-full bg-banking-primary/20 group-hover:bg-banking-primary/30 transition-colors duration-200 mb-2">
            <Car className="text-banking-primary group-hover:scale-110 transition-transform duration-200" size={20} />
          </div>
          <span className="text-sm font-medium text-foreground">Buy Vehicle</span>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-background to-background/95 backdrop-blur-xl border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Premium Vehicles
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle) => (
            <Card key={vehicle.id} className="overflow-hidden border-primary/20 bg-gradient-card backdrop-blur-sm hover:shadow-elevated transition-all duration-300 group">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={vehicle.image} 
                  alt={vehicle.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2 text-foreground">{vehicle.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{vehicle.specs}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-banking-primary">
                    ${vehicle.price.toLocaleString()}
                  </span>
                  <Button 
                    onClick={() => handlePurchase(vehicle)}
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