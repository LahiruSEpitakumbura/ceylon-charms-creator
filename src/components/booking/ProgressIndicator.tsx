import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  { number: 1, title: 'Arrival' },
  { number: 2, title: 'Vehicle' },
  { number: 3, title: 'Destinations' },
  { number: 4, title: 'Hotels' },
  { number: 5, title: 'Guide' },
  { number: 6, title: 'Activities' },
  { number: 7, title: 'Extras' },
  { number: 8, title: 'Review' },
  { number: 9, title: 'Confirm' },
];

interface ProgressIndicatorProps {
  currentStep: number;
}

export function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  return (
    <div className="w-full py-4 px-2 overflow-x-auto">
      <div className="flex items-center justify-between min-w-[800px] lg:min-w-0">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.number;
          const isActive = currentStep === step.number;
          
          return (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300',
                    isCompleted && 'bg-primary text-primary-foreground',
                    isActive && 'bg-accent text-accent-foreground ring-4 ring-accent/20',
                    !isCompleted && !isActive && 'bg-muted text-muted-foreground'
                  )}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : step.number}
                </div>
                <span
                  className={cn(
                    'mt-2 text-xs font-medium transition-colors',
                    isActive && 'text-foreground',
                    !isActive && 'text-muted-foreground'
                  )}
                >
                  {step.title}
                </span>
              </div>
              
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'h-0.5 w-8 lg:w-12 mx-2 transition-colors',
                    currentStep > step.number ? 'bg-primary' : 'bg-muted'
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
