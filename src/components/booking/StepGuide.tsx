import { Languages, ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { guideOptions } from '@/data/tourData';
import type { GuideOption } from '@/types/booking';
import { cn } from '@/lib/utils';

interface StepGuideProps {
  selected: GuideOption | null;
  onSelect: (guide: GuideOption) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepGuide({ selected, onSelect, onNext, onBack }: StepGuideProps) {
  return (
    <div className="animate-fade-in space-y-8">
      <div className="text-center mb-8">
        <h2 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-2">
          Add a Tour Guide
        </h2>
        <p className="text-muted-foreground text-lg">
          Enhance your experience with a professional multilingual guide
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {guideOptions.map((option) => {
          const isSelected = selected?.id === option.id;
          
          return (
            <Card
              key={option.id}
              className={cn(
                'p-6 cursor-pointer transition-all duration-200 selection-card hover:shadow-md text-center',
                isSelected && 'selection-card-selected'
              )}
              onClick={() => onSelect(option)}
            >
              <div className="flex flex-col items-center">
                <div className={cn(
                  'w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-colors',
                  isSelected ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
                )}>
                  <Languages className="w-7 h-7" />
                </div>
                
                <h4 className="font-semibold text-foreground mb-2">{option.language}</h4>
                
                <p className="text-2xl font-bold text-primary">
                  {option.pricePerDay === 0 ? (
                    'Free'
                  ) : (
                    <>
                      ${option.pricePerDay}
                      <span className="text-sm font-normal text-muted-foreground">/day</span>
                    </>
                  )}
                </p>

                {isSelected && (
                  <div className="mt-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
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
          disabled={!selected}
        >
          Continue to Activities
        </Button>
      </div>
    </div>
  );
}
