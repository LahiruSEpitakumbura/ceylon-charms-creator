import { useState } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { TrustBadges } from '@/components/TrustBadges';
import { BookingWizard } from '@/components/booking/BookingWizard';
import heroImage from '@/assets/hero-sri-lanka.jpg';

const Index = () => {
  const [showBooking, setShowBooking] = useState(false);

  const startBooking = () => {
    setShowBooking(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (showBooking) {
    return (
      <>
        <div className="fixed top-0 left-0 right-0 z-50 bg-primary">
          <div className="container py-3 flex items-center justify-between">
            <button
              onClick={() => setShowBooking(false)}
              className="flex items-center gap-2 text-primary-foreground hover:text-primary-foreground/80 transition-colors"
            >
              <span className="font-display text-lg font-bold">AO Travels</span>
            </button>
            <span className="text-primary-foreground/80 text-sm hidden sm:block">
              Build Your Dream Sri Lanka Trip
            </span>
          </div>
        </div>
        <div className="pt-14">
          <BookingWizard />
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Beautiful Sri Lanka coastline with turquoise waters and palm trees"
            className="w-full h-full object-cover"
          />
          <div className="hero-overlay absolute inset-0" />
        </div>

        {/* Header */}
        <Header onStartBooking={startBooking} />

        {/* Hero Content */}
        <div className="relative z-10 container text-center text-primary-foreground px-4">
          <div className="max-w-4xl mx-auto animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Luxury Sri Lanka Tours</span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Experience the Soul of{' '}
              <span className="text-accent">Sri Lanka</span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              From misty hilltops to golden beaches, discover authentic luxury travel with AO Travels.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button variant="hero" size="xl" onClick={startBooking}>
                Build Your Dream Trip
              </Button>
              <Button variant="hero-outline" size="xl">
                View Tour Packages
              </Button>
            </div>

            <TrustBadges />
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ArrowDown className="w-6 h-6 text-primary-foreground/60" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-4">
              Why Choose AO Travels?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We craft personalized journeys that showcase the best of Sri Lanka
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Custom Itineraries',
                description: 'Every trip is tailored to your preferences, pace, and interests. No cookie-cutter tours.',
                icon: '🗺️',
              },
              {
                title: 'Luxury Fleet',
                description: 'Travel in comfort with our modern, air-conditioned vehicles and professional chauffeurs.',
                icon: '🚗',
              },
              {
                title: 'Local Expertise',
                description: '10+ years of experience and deep local knowledge to show you hidden gems.',
                icon: '💎',
              },
            ].map((feature) => (
              <div key={feature.title} className="text-center p-6">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-primary">
        <div className="container text-center">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Explore Sri Lanka?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Build your perfect itinerary step by step. Choose your destinations, hotels, activities and more.
          </p>
          <Button variant="accent" size="xl" onClick={startBooking}>
            Start Planning Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
