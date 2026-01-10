import { Star, ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { hotelCategories } from '@/data/tourData';
import type { Destination, SelectedHotel } from '@/types/booking';
import { cn } from '@/lib/utils';

interface StepHotelsProps {
  destinations: Destination[];
  selected: SelectedHotel[];
  onUpdate: (hotels: SelectedHotel[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepHotels({ destinations, selected, onUpdate, onNext, onBack }: StepHotelsProps) {
  const selectHotel = (destId: string, categoryId: string, pricePerNight: number) => {
    const existing = selected.filter((h) => h.destinationId !== destId);
    onUpdate([...existing, { destinationId: destId, category: categoryId, pricePerNight }]);
  };

  const getSelectedCategory = (destId: string) => {
    return selected.find((h) => h.destinationId === destId)?.category;
  };

  const allSelected = destinations.every((d) => getSelectedCategory(d.id));

  return (
    <div className="animate-fade-in space-y-8">
      <div className="text-center mb-8">
        <h2 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-2">
          Select Your Accommodations
        </h2>
        <p className="text-muted-foreground text-lg">
          Choose hotel category for each destination
        </p>
      </div>

      <div className="space-y-8">
        {destinations.map((dest) => (
          <div key={dest.id} className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={dest.image}
                alt={dest.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {dest.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {dest.nights} night{dest.nights > 1 ? 's' : ''}
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {hotelCategories.map((category) => {
                const isSelected = getSelectedCategory(dest.id) === category.id;
                
                return (
                  <Card
                    key={category.id}
                    className={cn(
                      'p-4 cursor-pointer transition-all duration-200 selection-card hover:shadow-md',
                      isSelected && 'selection-card-selected'
                    )}
                    onClick={() => selectHotel(dest.id, category.id, category.pricePerNight)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-foreground">{category.name}</h4>
                      {isSelected && (
                        <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-0.5 mb-3">
                      {Array.from({ length: category.stars }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-gold text-gold"
                        />
                      ))}
                    </div>

                    <ul className="text-xs text-muted-foreground space-y-1 mb-3">
                      {category.features.slice(0, 3).map((feature) => (
                        <li key={feature} className="flex items-center gap-1">
                          <Check className="w-3 h-3 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <p className="text-lg font-bold text-primary">
                      ${category.pricePerNight}
                      <span className="text-xs font-normal text-muted-foreground">/night</span>
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
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
          disabled={!allSelected}
        >
          Continue to Guide
        </Button>
      </div>
    </div>
  );
}
