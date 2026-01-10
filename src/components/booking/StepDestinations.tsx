import { MapPin, Minus, Plus, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { destinations as allDestinations } from '@/data/tourData';
import type { Destination } from '@/types/booking';
import { cn } from '@/lib/utils';

interface StepDestinationsProps {
  selected: Destination[];
  onUpdate: (destinations: Destination[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const regionLabels: Record<string, string> = {
  'cultural': 'Cultural Triangle',
  'hill-country': 'Hill Country',
  'coastal': 'Coastal',
  'wildlife': 'Wildlife',
  'northern': 'Northern',
};

export function StepDestinations({ selected, onUpdate, onNext, onBack }: StepDestinationsProps) {
  const updateNights = (destId: string, nights: number) => {
    const existingDest = allDestinations.find((d) => d.id === destId);
    if (!existingDest) return;

    const currentSelected = selected.find((d) => d.id === destId);
    
    if (nights <= 0) {
      onUpdate(selected.filter((d) => d.id !== destId));
    } else if (currentSelected) {
      onUpdate(selected.map((d) => (d.id === destId ? { ...d, nights } : d)));
    } else {
      onUpdate([...selected, { ...existingDest, nights }]);
    }
  };

  const getNights = (destId: string) => {
    return selected.find((d) => d.id === destId)?.nights || 0;
  };

  const totalNights = selected.reduce((sum, d) => sum + d.nights, 0);

  const groupedDestinations = allDestinations.reduce((acc, dest) => {
    if (!acc[dest.region]) acc[dest.region] = [];
    acc[dest.region].push(dest);
    return acc;
  }, {} as Record<string, Destination[]>);

  return (
    <div className="animate-fade-in space-y-8">
      <div className="text-center mb-8">
        <h2 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-2">
          Select Your Destinations
        </h2>
        <p className="text-muted-foreground text-lg">
          Choose where you want to explore and how many nights at each location
        </p>
        {totalNights > 0 && (
          <Badge variant="secondary" className="mt-3 text-base px-4 py-1">
            <MapPin className="w-4 h-4 mr-2" />
            {selected.length} destinations • {totalNights} nights total
          </Badge>
        )}
      </div>

      {Object.entries(groupedDestinations).map(([region, dests]) => (
        <div key={region} className="space-y-4">
          <h3 className="font-display text-xl font-semibold text-foreground border-b pb-2">
            {regionLabels[region] || region}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {dests.map((dest) => {
              const nights = getNights(dest.id);
              const isSelected = nights > 0;
              
              return (
                <Card
                  key={dest.id}
                  className={cn(
                    'overflow-hidden transition-all duration-200 selection-card',
                    isSelected && 'selection-card-selected'
                  )}
                >
                  <div className="aspect-[3/2] overflow-hidden relative">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover"
                    />
                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs font-semibold">
                        {nights} night{nights > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-foreground">{dest.name}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{dest.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Nights:</span>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateNights(dest.id, nights - 1)}
                          disabled={nights === 0}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center font-semibold">{nights}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateNights(dest.id, nights + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      ))}

      <div className="flex justify-between pt-6">
        <Button variant="outline" size="lg" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button 
          variant="accent" 
          size="lg" 
          onClick={onNext}
          disabled={selected.length === 0}
        >
          Continue to Hotels
        </Button>
      </div>
    </div>
  );
}
