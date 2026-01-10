import { useState } from 'react';
import { ProgressIndicator } from './ProgressIndicator';
import { StepArrival } from './StepArrival';
import { StepVehicle } from './StepVehicle';
import { StepDestinations } from './StepDestinations';
import { StepHotels } from './StepHotels';
import { StepGuide } from './StepGuide';
import { StepActivities } from './StepActivities';
import { StepExtras } from './StepExtras';
import { StepReview } from './StepReview';
import { StepConfirm } from './StepConfirm';
import type { BookingState } from '@/types/booking';

const initialState: BookingState = {
  currentStep: 1,
  arrival: {
    airport: '',
    date: null,
    time: '',
    pickupType: 'standard',
    flightNumber: '',
  },
  vehicle: null,
  destinations: [],
  hotels: [],
  guide: null,
  activities: [],
  extras: [],
  contact: {
    name: '',
    email: '',
    whatsapp: '',
    country: '',
    specialRequests: '',
  },
  currency: 'USD',
};

export function BookingWizard() {
  const [booking, setBooking] = useState<BookingState>(initialState);

  const goToStep = (step: number) => {
    setBooking((prev) => ({ ...prev, currentStep: step }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextStep = () => goToStep(booking.currentStep + 1);
  const prevStep = () => goToStep(booking.currentStep - 1);

  const renderStep = () => {
    switch (booking.currentStep) {
      case 1:
        return (
          <StepArrival
            data={booking.arrival}
            onUpdate={(data) => setBooking((prev) => ({ ...prev, arrival: { ...prev.arrival, ...data } }))}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <StepVehicle
            selected={booking.vehicle}
            onSelect={(vehicle) => setBooking((prev) => ({ ...prev, vehicle }))}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <StepDestinations
            selected={booking.destinations}
            onUpdate={(destinations) => setBooking((prev) => ({ ...prev, destinations }))}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <StepHotels
            destinations={booking.destinations}
            selected={booking.hotels}
            onUpdate={(hotels) => setBooking((prev) => ({ ...prev, hotels }))}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 5:
        return (
          <StepGuide
            selected={booking.guide}
            onSelect={(guide) => setBooking((prev) => ({ ...prev, guide }))}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 6:
        return (
          <StepActivities
            selected={booking.activities}
            onUpdate={(activities) => setBooking((prev) => ({ ...prev, activities }))}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 7:
        return (
          <StepExtras
            selected={booking.extras}
            onUpdate={(extras) => setBooking((prev) => ({ ...prev, extras }))}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 8:
        return (
          <StepReview
            booking={booking}
            onEdit={goToStep}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 9:
        return (
          <StepConfirm
            data={booking.contact}
            onUpdate={(data) => setBooking((prev) => ({ ...prev, contact: { ...prev.contact, ...data } }))}
            onBack={prevStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b">
        <div className="container">
          <ProgressIndicator currentStep={booking.currentStep} />
        </div>
      </div>
      
      <div className="container py-8 lg:py-12">
        {renderStep()}
      </div>
    </div>
  );
}
