import { useState } from 'react';
import { Plane, Clock, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { airports, pickupOptions } from '@/data/tourData';
import type { ArrivalDetails } from '@/types/booking';
import { cn } from '@/lib/utils';

interface StepArrivalProps {
  data: ArrivalDetails;
  onUpdate: (data: Partial<ArrivalDetails>) => void;
  onNext: () => void;
}

export function StepArrival({ data, onUpdate, onNext }: StepArrivalProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateAndNext = () => {
    const newErrors: Record<string, string> = {};
    if (!data.airport) newErrors.airport = 'Please select an airport';
    if (!data.date) newErrors.date = 'Please select arrival date';
    if (!data.time) newErrors.time = 'Please select arrival time';
    
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  return (
    <div className="animate-fade-in space-y-8">
      <div className="text-center mb-8">
        <h2 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-2">
          Welcome to Sri Lanka
        </h2>
        <p className="text-muted-foreground text-lg">
          Let's start by planning your arrival
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Airport Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Plane className="w-4 h-4 text-primary" />
            Arrival Airport
          </Label>
          <Select
            value={data.airport}
            onValueChange={(value) => onUpdate({ airport: value as 'CMB' | 'HRI' })}
          >
            <SelectTrigger className={cn(errors.airport && 'border-destructive')}>
              <SelectValue placeholder="Select airport" />
            </SelectTrigger>
            <SelectContent>
              {airports.map((airport) => (
                <SelectItem key={airport.code} value={airport.code}>
                  {airport.code} - {airport.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.airport && <p className="text-sm text-destructive">{errors.airport}</p>}
        </div>

        {/* Date Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            Arrival Date
          </Label>
          <Input
            type="date"
            value={data.date ? data.date.toISOString().split('T')[0] : ''}
            onChange={(e) => onUpdate({ date: e.target.value ? new Date(e.target.value) : null })}
            min={new Date().toISOString().split('T')[0]}
            className={cn(errors.date && 'border-destructive')}
          />
          {errors.date && <p className="text-sm text-destructive">{errors.date}</p>}
        </div>

        {/* Time Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            Estimated Arrival Time
          </Label>
          <Input
            type="time"
            value={data.time}
            onChange={(e) => onUpdate({ time: e.target.value })}
            className={cn(errors.time && 'border-destructive')}
          />
          {errors.time && <p className="text-sm text-destructive">{errors.time}</p>}
        </div>

        {/* Flight Number */}
        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            Flight Number (Optional)
          </Label>
          <Input
            placeholder="e.g., EK654"
            value={data.flightNumber}
            onChange={(e) => onUpdate({ flightNumber: e.target.value })}
          />
        </div>
      </div>

      {/* Pickup Options */}
      <div className="space-y-4">
        <Label className="text-sm font-medium">Airport Pickup Service</Label>
        <div className="grid md:grid-cols-3 gap-4">
          {pickupOptions.map((option) => (
            <Card
              key={option.id}
              className={cn(
                'p-4 cursor-pointer transition-all duration-200 hover:shadow-md selection-card',
                data.pickupType === option.id && 'selection-card-selected'
              )}
              onClick={() => onUpdate({ pickupType: option.id as 'none' | 'standard' | 'vip' })}
            >
              <div className="flex flex-col h-full">
                <h4 className="font-semibold text-foreground">{option.name}</h4>
                <p className="text-sm text-muted-foreground mt-1 flex-1">{option.description}</p>
                <p className="mt-3 font-semibold text-primary">
                  {option.price === 0 ? 'Free' : `$${option.price}`}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <Button variant="accent" size="lg" onClick={validateAndNext}>
          Continue to Vehicle Selection
        </Button>
      </div>
    </div>
  );
}
