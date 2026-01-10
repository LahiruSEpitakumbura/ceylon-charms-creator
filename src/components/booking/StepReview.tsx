import { ArrowLeft, Plane, Car, MapPin, Hotel, User, Compass, Gift, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { airports, pickupOptions } from '@/data/tourData';
import type { BookingState } from '@/types/booking';

interface StepReviewProps {
  booking: BookingState;
  onEdit: (step: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepReview({ booking, onEdit, onNext, onBack }: StepReviewProps) {
  const totalNights = booking.destinations.reduce((sum, d) => sum + d.nights, 0);
  
  const calculateTotal = () => {
    let total = 0;
    
    // Pickup
    const pickup = pickupOptions.find((p) => p.id === booking.arrival.pickupType);
    total += pickup?.price || 0;
    
    // Vehicle
    if (booking.vehicle) {
      total += booking.vehicle.pricePerDay * (totalNights + 1);
    }
    
    // Hotels
    booking.hotels.forEach((hotel) => {
      const dest = booking.destinations.find((d) => d.id === hotel.destinationId);
      if (dest) {
        total += hotel.pricePerNight * dest.nights;
      }
    });
    
    // Guide
    if (booking.guide && booking.guide.pricePerDay > 0) {
      total += booking.guide.pricePerDay * (totalNights + 1);
    }
    
    // Activities
    booking.activities.forEach((a) => {
      total += a.price;
    });
    
    // Extras
    booking.extras.forEach((e) => {
      if (e.priceType === 'one-time') {
        total += e.price;
      } else {
        total += e.price * (totalNights + 1);
      }
    });
    
    return total;
  };

  const totalUSD = calculateTotal();
  const totalEUR = Math.round(totalUSD * 0.92);

  const airport = airports.find((a) => a.code === booking.arrival.airport);

  return (
    <div className="animate-fade-in space-y-8">
      <div className="text-center mb-8">
        <h2 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-2">
          Review Your Trip
        </h2>
        <p className="text-muted-foreground text-lg">
          Check all details before confirming your booking
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Arrival */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-semibold flex items-center gap-2">
              <Plane className="w-5 h-5 text-primary" />
              Arrival Details
            </h3>
            <Button variant="ghost" size="sm" onClick={() => onEdit(1)}>
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-muted-foreground">Airport:</span>{' '}
              <span className="font-medium">{airport?.code} - {airport?.city}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Date:</span>{' '}
              <span className="font-medium">
                {booking.arrival.date?.toLocaleDateString('en-US', { dateStyle: 'medium' })}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Time:</span>{' '}
              <span className="font-medium">{booking.arrival.time}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Pickup:</span>{' '}
              <span className="font-medium">
                {pickupOptions.find((p) => p.id === booking.arrival.pickupType)?.name}
              </span>
            </div>
          </div>
        </Card>

        {/* Vehicle */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-semibold flex items-center gap-2">
              <Car className="w-5 h-5 text-primary" />
              Vehicle
            </h3>
            <Button variant="ghost" size="sm" onClick={() => onEdit(2)}>
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <img
              src={booking.vehicle?.image}
              alt={booking.vehicle?.name}
              className="w-24 h-16 object-cover rounded-lg"
            />
            <div>
              <p className="font-medium">{booking.vehicle?.name}</p>
              <p className="text-sm text-muted-foreground">
                ${booking.vehicle?.pricePerDay}/day × {totalNights + 1} days
              </p>
            </div>
          </div>
        </Card>

        {/* Destinations */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-semibold flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Destinations ({totalNights} nights)
            </h3>
            <Button variant="ghost" size="sm" onClick={() => onEdit(3)}>
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </div>
          <div className="space-y-2">
            {booking.destinations.map((dest) => (
              <div key={dest.id} className="flex items-center justify-between text-sm">
                <span className="font-medium">{dest.name}</span>
                <span className="text-muted-foreground">{dest.nights} night{dest.nights > 1 ? 's' : ''}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Hotels */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-semibold flex items-center gap-2">
              <Hotel className="w-5 h-5 text-primary" />
              Accommodations
            </h3>
            <Button variant="ghost" size="sm" onClick={() => onEdit(4)}>
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </div>
          <div className="space-y-2">
            {booking.hotels.map((hotel) => {
              const dest = booking.destinations.find((d) => d.id === hotel.destinationId);
              return (
                <div key={hotel.destinationId} className="flex items-center justify-between text-sm">
                  <span>
                    <span className="font-medium">{dest?.name}</span> - {hotel.category}
                  </span>
                  <span className="text-muted-foreground">
                    ${hotel.pricePerNight}/night
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Guide */}
        {booking.guide && (
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-semibold flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Tour Guide
              </h3>
              <Button variant="ghost" size="sm" onClick={() => onEdit(5)}>
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </div>
            <p className="text-sm">
              <span className="font-medium">{booking.guide.language}</span>
              {booking.guide.pricePerDay > 0 && (
                <span className="text-muted-foreground"> - ${booking.guide.pricePerDay}/day</span>
              )}
            </p>
          </Card>
        )}

        {/* Activities */}
        {booking.activities.length > 0 && (
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-semibold flex items-center gap-2">
                <Compass className="w-5 h-5 text-primary" />
                Activities
              </h3>
              <Button variant="ghost" size="sm" onClick={() => onEdit(6)}>
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </div>
            <div className="space-y-2">
              {booking.activities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between text-sm">
                  <span className="font-medium">{activity.name}</span>
                  <span className="text-muted-foreground">${activity.price}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Extras */}
        {booking.extras.length > 0 && (
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-semibold flex items-center gap-2">
                <Gift className="w-5 h-5 text-primary" />
                Extra Services
              </h3>
              <Button variant="ghost" size="sm" onClick={() => onEdit(7)}>
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </div>
            <div className="space-y-2">
              {booking.extras.map((extra) => (
                <div key={extra.id} className="flex items-center justify-between text-sm">
                  <span className="font-medium">{extra.name}</span>
                  <span className="text-muted-foreground">
                    ${extra.price}/{extra.priceType === 'one-time' ? 'trip' : 'day'}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Total */}
        <Card className="p-6 bg-primary text-primary-foreground">
          <h3 className="font-display text-xl font-semibold mb-4">Estimated Total</h3>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="text-4xl font-bold">
              ${totalUSD.toLocaleString()}
              <span className="text-lg font-normal opacity-80 ml-2">USD</span>
            </div>
            <Separator orientation="vertical" className="hidden sm:block h-10 bg-primary-foreground/30" />
            <div className="text-2xl font-semibold opacity-90">
              €{totalEUR.toLocaleString()}
              <span className="text-base font-normal opacity-70 ml-2">EUR</span>
            </div>
          </div>
          <p className="text-sm mt-4 opacity-80">
            * Final price may vary based on exact dates and availability
          </p>
        </Card>
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="outline" size="lg" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button 
          variant="accent" 
          size="xl" 
          onClick={onNext}
        >
          Confirm & Book
        </Button>
      </div>
    </div>
  );
}
