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
  // Sports Cars
  { id: 1, name: "BMW M4 Competition", price: 75000, image: bmwM4, specs: "473 HP • 0-60 in 3.8s • Twin Turbo" },
  { id: 2, name: "Ferrari F8 Tributo", price: 280000, image: ferrari, specs: "710 HP • 0-60 in 2.9s • V8 Twin Turbo" },
  { id: 3, name: "Porsche 911 Turbo S", price: 220000, image: bmwM4, specs: "640 HP • 0-60 in 2.6s • AWD" },
  { id: 4, name: "McLaren 720S", price: 300000, image: ferrari, specs: "710 HP • 0-60 in 2.8s • Carbon Fiber" },
  { id: 5, name: "Lamborghini Huracán", price: 250000, image: bmwM4, specs: "630 HP • 0-60 in 2.9s • V10 Engine" },
  { id: 6, name: "Audi R8 V10", price: 180000, image: ferrari, specs: "562 HP • 0-60 in 3.2s • Quattro AWD" },
  { id: 7, name: "Mercedes AMG GT", price: 160000, image: bmwM4, specs: "523 HP • 0-60 in 3.5s • Biturbo V8" },
  { id: 8, name: "Corvette Z06", price: 110000, image: ferrari, specs: "670 HP • 0-60 in 2.6s • Supercharged" },
  { id: 9, name: "Nissan GT-R", price: 120000, image: bmwM4, specs: "565 HP • 0-60 in 2.9s • AWD Twin Turbo" },
  { id: 10, name: "Dodge Viper", price: 95000, image: ferrari, specs: "645 HP • 0-60 in 3.5s • V10 Engine" },
  
  // Luxury Cars
  { id: 11, name: "Rolls Royce Phantom", price: 460000, image: bmwM4, specs: "563 HP • Ultra Luxury • V12 Engine" },
  { id: 12, name: "Bentley Continental GT", price: 230000, image: ferrari, specs: "626 HP • Luxury Coupe • W12 Engine" },
  { id: 13, name: "Mercedes S-Class", price: 110000, image: bmwM4, specs: "429 HP • Executive • Air Suspension" },
  { id: 14, name: "BMW 7 Series", price: 95000, image: ferrari, specs: "523 HP • Technology • Comfort" },
  { id: 15, name: "Audi A8", price: 87000, image: bmwM4, specs: "453 HP • Quattro • Matrix LED" },
  { id: 16, name: "Lexus LS", price: 78000, image: ferrari, specs: "416 HP • Hybrid • Luxury" },
  { id: 17, name: "Genesis G90", price: 75000, image: bmwM4, specs: "420 HP • Value Luxury • V8" },
  { id: 18, name: "Cadillac CT6", price: 65000, image: ferrari, specs: "404 HP • American Luxury • V8" },
  { id: 19, name: "Jaguar XJ", price: 85000, image: bmwM4, specs: "470 HP • British Luxury • Supercharged" },
  { id: 20, name: "Maserati Quattroporte", price: 110000, image: ferrari, specs: "424 HP • Italian Style • V8" },
  
  // SUVs
  { id: 21, name: "Range Rover Sport", price: 85000, image: bmwM4, specs: "518 HP • Off-Road • Luxury" },
  { id: 22, name: "BMW X5 M", price: 110000, image: ferrari, specs: "617 HP • Performance SUV • Twin Turbo" },
  { id: 23, name: "Mercedes GLE 63 AMG", price: 120000, image: bmwM4, specs: "603 HP • Performance • Biturbo V8" },
  { id: 24, name: "Porsche Cayenne Turbo", price: 130000, image: ferrari, specs: "541 HP • Sports SUV • Twin Turbo" },
  { id: 25, name: "Audi SQ7", price: 90000, image: bmwM4, specs: "500 HP • Diesel • Electric Supercharger" },
  { id: 26, name: "Cadillac Escalade", price: 80000, image: ferrari, specs: "420 HP • Full Size • V8 Engine" },
  { id: 27, name: "Lincoln Navigator", price: 75000, image: bmwM4, specs: "450 HP • Luxury • Twin Turbo V6" },
  { id: 28, name: "Lexus LX", price: 95000, image: ferrari, specs: "383 HP • Off-Road • V8 Engine" },
  { id: 29, name: "Infiniti QX80", price: 70000, image: bmwM4, specs: "400 HP • Family Luxury • V8" },
  { id: 30, name: "Acura MDX", price: 55000, image: ferrari, specs: "321 HP • Reliability • V6 Engine" },
  
  // Hypercars
  { id: 31, name: "Bugatti Chiron", price: 3000000, image: bmwM4, specs: "1479 HP • 261 mph • Quad Turbo W16" },
  { id: 32, name: "Koenigsegg Regera", price: 2000000, image: ferrari, specs: "1500 HP • Hybrid • Carbon Fiber" },
  { id: 33, name: "McLaren P1", price: 1500000, image: bmwM4, specs: "903 HP • Hybrid • Track Focused" },
  { id: 34, name: "Ferrari LaFerrari", price: 1800000, image: ferrari, specs: "950 HP • Hybrid • Limited Edition" },
  { id: 35, name: "Porsche 918 Spyder", price: 1200000, image: bmwM4, specs: "887 HP • Hybrid • Weissach Package" },
  { id: 36, name: "Pagani Huayra", price: 2800000, image: ferrari, specs: "730 HP • Art on Wheels • AMG V12" },
  { id: 37, name: "Lamborghini Sián", price: 3600000, image: bmwM4, specs: "819 HP • Hybrid • Supercapacitor" },
  { id: 38, name: "Aston Martin Valkyrie", price: 3200000, image: ferrari, specs: "1160 HP • F1 Tech • Hybrid V12" },
  
  // Electric Cars
  { id: 39, name: "Tesla Model S Plaid", price: 130000, image: bmwM4, specs: "1020 HP • 0-60 in 1.9s • Electric" },
  { id: 40, name: "Porsche Taycan Turbo S", price: 185000, image: ferrari, specs: "750 HP • Electric • Track Ready" },
  { id: 41, name: "Lucid Air Dream", price: 170000, image: bmwM4, specs: "1111 HP • 516 mi Range • Luxury EV" },
  { id: 42, name: "BMW iX M60", price: 110000, image: ferrari, specs: "610 HP • Electric SUV • Technology" },
  { id: 43, name: "Mercedes EQS 53 AMG", price: 150000, image: bmwM4, specs: "751 HP • Electric Luxury • AMG" },
  { id: 44, name: "Audi e-tron GT", price: 140000, image: ferrari, specs: "637 HP • Electric Sports • Quattro" },
  
  // Motorcycles
  { id: 45, name: "Ducati Panigale V4", price: 25000, image: bmwM4, specs: "214 HP • 0-60 in 2.6s • Racing DNA" },
  { id: 46, name: "Kawasaki Ninja H2R", price: 55000, image: ferrari, specs: "310 HP • Supercharged • Track Only" },
  { id: 47, name: "BMW S1000RR", price: 18000, image: bmwM4, specs: "205 HP • Electronic Package • Sport" },
  { id: 48, name: "Yamaha R1M", price: 23000, image: ferrari, specs: "200 HP • MotoGP Tech • Carbon Fiber" },
  { id: 49, name: "Honda CBR1000RR-R", price: 28000, image: bmwM4, specs: "214 HP • Fireblade • Track Ready" },
  { id: 50, name: "Aprilia RSV4", price: 20000, image: ferrari, specs: "217 HP • V4 Engine • Racing Heritage" },
  
  // Aircraft
  { id: 51, name: "Luxury Helicopter", price: 2500000, image: helicopter, specs: "6 Passengers • 400 Mile Range • Premium Interior" },
  { id: 52, name: "Private Jet - Citation", price: 8000000, image: helicopter, specs: "8 Passengers • Transcontinental • Luxury" },
  { id: 53, name: "Bell 429 Helicopter", price: 3200000, image: helicopter, specs: "7 Passengers • Twin Engine • Medical" },
  { id: 54, name: "Gulfstream G650", price: 70000000, image: helicopter, specs: "18 Passengers • Global Range • Ultra Long" },
  { id: 55, name: "Boeing 747 Private", price: 400000000, image: helicopter, specs: "50+ Passengers • Flying Palace • Custom" },
  
  // Boats & Yachts
  { id: 56, name: "Formula 1 Boat", price: 800000, image: bmwM4, specs: "1350 HP • Racing • Carbon Fiber" },
  { id: 57, name: "Luxury Yacht 80ft", price: 5000000, image: ferrari, specs: "12 Guests • Ocean Cruiser • Full Crew" },
  { id: 58, name: "Speed Boat Cigarette", price: 600000, image: bmwM4, specs: "2700 HP • Twin Turbo • 180 mph" },
  { id: 59, name: "Mega Yacht 150ft", price: 25000000, image: ferrari, specs: "24 Guests • Helipad • Multiple Decks" },
  { id: 60, name: "Sailing Yacht", price: 3000000, image: bmwM4, specs: "Performance Cruiser • Carbon Mast • Luxury" },
  
  // Vintage/Classic
  { id: 61, name: "Ferrari 250 GTO", price: 50000000, image: ferrari, specs: "302 HP • 1962 Classic • Investment Grade" },
  { id: 62, name: "Shelby Cobra 427", price: 2000000, image: bmwM4, specs: "425 HP • American Icon • Rare" },
  { id: 63, name: "Porsche 917", price: 15000000, image: ferrari, specs: "580 HP • Le Mans Winner • Racing Legend" },
  { id: 64, name: "Mercedes 300SL Gullwing", price: 3000000, image: bmwM4, specs: "215 HP • 1954 Classic • Iconic Doors" },
  { id: 65, name: "Jaguar E-Type", price: 400000, image: ferrari, specs: "265 HP • British Icon • Stunning Design" },
  
  // Trucks
  { id: 66, name: "Ford F-150 Raptor", price: 70000, image: bmwM4, specs: "450 HP • Off-Road Beast • Twin Turbo V6" },
  { id: 67, name: "Ram TRX", price: 80000, image: ferrari, specs: "702 HP • Supercharged V8 • Desert Runner" },
  { id: 68, name: "Chevy Silverado ZR2", price: 65000, image: bmwM4, specs: "420 HP • Multimatic Dampers • Off-Road" },
  { id: 69, name: "Toyota Tundra TRD Pro", price: 60000, image: ferrari, specs: "389 HP • Reliability • Off-Road Package" },
  { id: 70, name: "GMC Sierra AT4X", price: 75000, image: bmwM4, specs: "420 HP • Extreme Off-Road • MultiPro" },
  
  // More Exotic Cars
  { id: 71, name: "McLaren 765LT", price: 400000, image: ferrari, specs: "754 HP • Track Focused • Long Tail" },
  { id: 72, name: "Lamborghini Aventador SVJ", price: 520000, image: bmwM4, specs: "759 HP • Aero Vectoring • Track Record" },
  { id: 73, name: "Ferrari SF90 Stradale", price: 625000, image: ferrari, specs: "986 HP • Hybrid • F1 Technology" },
  { id: 74, name: "Porsche GT2 RS", price: 350000, image: bmwM4, specs: "690 HP • Rear Wheel Drive • Track Weapon" },
  { id: 75, name: "Aston Martin DBS Superleggera", price: 320000, image: ferrari, specs: "715 HP • Grand Tourer • V12 Twin Turbo" }
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
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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