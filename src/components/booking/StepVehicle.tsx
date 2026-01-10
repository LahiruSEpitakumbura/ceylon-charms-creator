import { Users, Briefcase, Wifi, Check, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { vehicles } from '@/data/tourData';
import type { Vehicle } from '@/types/booking';
import { cn } from '@/lib/utils';

interface StepVehicleProps {
  selected: Vehicle | null;
  onSelect: (vehicle: Vehicle) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepVehicle({ selected, onSelect, onNext, onBack }: StepVehicleProps) {
  return (
    <div className="animate-fade-in space-y-8">
      <div className="text-center mb-8">
        <h2 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-2">
          Choose Your Vehicle
        </h2>
        <p className="text-muted-foreground text-lg">
          All vehicles come with professional chauffeur-guide
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <Card
            key={vehicle.id}
            className={cn(
              'overflow-hidden cursor-pointer card-premium selection-card',
              selected?.id === vehicle.id && 'selection-card-selected'
            )}
            onClick={() => onSelect(vehicle)}
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display text-xl font-semibold">{vehicle.name}</h3>
                {selected?.id === vehicle.id && (
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {vehicle.passengers} passengers
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-4 h-4" />
                  {vehicle.luggage} bags
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {vehicle.features.slice(0, 3).map((feature) => (
                  <Badge key={feature} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
                {vehicle.features.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{vehicle.features.length - 3} more
                  </Badge>
                )}
              </div>

              <div className="pt-3 border-t">
                <p className="text-2xl font-bold text-primary">
                  ${vehicle.pricePerDay}
                  <span className="text-sm font-normal text-muted-foreground">/day</span>
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="outline" size="lg" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button 
          variant="accent" 
          size="lg" 
          onClick={onNext}
          disabled={!selected}
        >
          Continue to Destinations
        </Button>
      </div>
    </div>
  );
}
