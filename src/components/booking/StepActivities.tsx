import { ArrowLeft, Check, Clock, Compass, TreePalm, Mountain, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { activities as allActivities } from '@/data/tourData';
import type { Activity } from '@/types/booking';
import { cn } from '@/lib/utils';

interface StepActivitiesProps {
  selected: Activity[];
  onUpdate: (activities: Activity[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const categoryIcons: Record<string, typeof Compass> = {
  adventure: Mountain,
  nature: TreePalm,
  cultural: Compass,
  wellness: Heart,
};

const categoryLabels: Record<string, string> = {
  adventure: 'Adventure',
  nature: 'Nature & Wildlife',
  cultural: 'Cultural',
  wellness: 'Wellness',
};

export function StepActivities({ selected, onUpdate, onNext, onBack }: StepActivitiesProps) {
  const toggleActivity = (activity: Activity) => {
    const isSelected = selected.some((a) => a.id === activity.id);
    if (isSelected) {
      onUpdate(selected.filter((a) => a.id !== activity.id));
    } else {
      onUpdate([...selected, activity]);
    }
  };

  const groupedActivities = allActivities.reduce((acc, activity) => {
    if (!acc[activity.category]) acc[activity.category] = [];
    acc[activity.category].push(activity);
    return acc;
  }, {} as Record<string, Activity[]>);

  return (
    <div className="animate-fade-in space-y-8">
      <div className="text-center mb-8">
        <h2 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-2">
          Activities & Experiences
        </h2>
        <p className="text-muted-foreground text-lg">
          Add memorable experiences to your journey
        </p>
        {selected.length > 0 && (
          <Badge variant="secondary" className="mt-3 text-base px-4 py-1">
            {selected.length} activities selected
          </Badge>
        )}
      </div>

      {Object.entries(groupedActivities).map(([category, acts]) => {
        const Icon = categoryIcons[category] || Compass;
        
        return (
          <div key={category} className="space-y-4">
            <h3 className="font-display text-xl font-semibold text-foreground border-b pb-2 flex items-center gap-2">
              <Icon className="w-5 h-5 text-primary" />
              {categoryLabels[category] || category}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {acts.map((activity) => {
                const isSelected = selected.some((a) => a.id === activity.id);
                
                return (
                  <Card
                    key={activity.id}
                    className={cn(
                      'p-4 cursor-pointer transition-all duration-200 selection-card hover:shadow-md',
                      isSelected && 'selection-card-selected'
                    )}
                    onClick={() => toggleActivity(activity)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-foreground">{activity.name}</h4>
                      {isSelected && (
                        <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {activity.description}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <Clock className="w-3 h-3" />
                      {activity.duration}
                    </div>

                    <p className="text-lg font-bold text-primary">
                      ${activity.price}
                      <span className="text-xs font-normal text-muted-foreground">/person</span>
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      })}

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
          Continue to Extras
        </Button>
      </div>
    </div>
  );
}
