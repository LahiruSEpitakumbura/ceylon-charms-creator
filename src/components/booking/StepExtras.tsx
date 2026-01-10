import { ArrowLeft, Check, Wifi, Baby, Accessibility, Camera, UtensilsCrossed, PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { extraServices } from '@/data/tourData';
import type { ExtraService } from '@/types/booking';
import { cn } from '@/lib/utils';

interface StepExtrasProps {
  selected: ExtraService[];
  onUpdate: (extras: ExtraService[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const serviceIcons: Record<string, typeof Wifi> = {
  sim: Wifi,
  'child-seat': Baby,
  wheelchair: Accessibility,
  photographer: Camera,
  dining: UtensilsCrossed,
  celebration: PartyPopper,
};

export function StepExtras({ selected, onUpdate, onNext, onBack }: StepExtrasProps) {
  const toggleExtra = (extra: ExtraService) => {
    const isSelected = selected.some((e) => e.id === extra.id);
    if (isSelected) {
      onUpdate(selected.filter((e) => e.id !== extra.id));
    } else {
      onUpdate([...selected, extra]);
    }
  };

  return (
    <div className="animate-fade-in space-y-8">
      <div className="text-center mb-8">
        <h2 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-2">
          Extra Services
        </h2>
        <p className="text-muted-foreground text-lg">
          Add special services to enhance your trip
        </p>
        {selected.length > 0 && (
          <Badge variant="secondary" className="mt-3 text-base px-4 py-1">
            {selected.length} extras selected
          </Badge>
        )}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {extraServices.map((service) => {
          const isSelected = selected.some((e) => e.id === service.id);
          const Icon = serviceIcons[service.id] || Wifi;
          
          return (
            <Card
              key={service.id}
              className={cn(
                'p-5 cursor-pointer transition-all duration-200 selection-card hover:shadow-md',
                isSelected && 'selection-card-selected'
              )}
              onClick={() => toggleExtra(service)}
            >
              <div className="flex items-start gap-4">
                <div className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors',
                  isSelected ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
                )}>
                  <Icon className="w-6 h-6" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-foreground">{service.name}</h4>
                    {isSelected && (
                      <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">
                    {service.description}
                  </p>

                  <p className="text-lg font-bold text-primary">
                    ${service.price}
                    <span className="text-xs font-normal text-muted-foreground">
                      /{service.priceType === 'one-time' ? 'trip' : 'day'}
                    </span>
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
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
        >
          Review Your Trip
        </Button>
      </div>
    </div>
  );
}
