import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { destinations } from '@/data/tourData';
import heroImage from '@/assets/hero-sri-lanka.jpg';

const regionLabels: Record<string, string> = {
  cultural: 'Cultural Triangle',
  'hill-country': 'Hill Country',
  coastal: 'Coastal',
  wildlife: 'Wildlife & Safari',
  northern: 'Northern Region',
  eastern: 'East Coast',
};

const Destinations = () => {
  const [activeRegion, setActiveRegion] = useState<string>('all');

  const regions = ['all', ...Object.keys(regionLabels)];

  const filteredDestinations = activeRegion === 'all'
    ? destinations
    : destinations.filter(d => d.region === activeRegion);

  return (
    <div className="min-h-screen">
      <SEO
        title="Sri Lanka Destinations | AO Travels - Explore Paradise Island"
        description="Discover 30+ stunning destinations in Sri Lanka. From ancient temples to pristine beaches, misty mountains to wildlife safaris. Plan your perfect itinerary."
        keywords="Sri Lanka destinations, Sigiriya, Kandy, Ella, Galle, Yala safari, Sri Lanka beaches, tea country, cultural triangle"
      />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="Sri Lanka destinations" className="w-full h-full object-cover" />
          <div className="hero-overlay absolute inset-0" />
        </div>
        <Header onStartBooking={() => {}} />
        <div className="relative z-10 container text-center text-primary-foreground">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Explore Sri Lanka
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            From ancient wonders to tropical beaches - discover the diversity of the Pearl of the Indian Ocean
          </p>
        </div>
      </section>

      {/* Region Filter */}
      <section className="py-8 bg-background border-b sticky top-0 z-40">
        <div className="container">
          <div className="flex flex-wrap gap-2 justify-center">
            {regions.map((region) => (
              <Button
                key={region}
                variant={activeRegion === region ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveRegion(region)}
              >
                {region === 'all' ? 'All Regions' : regionLabels[region]}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination) => (
              <article
                key={destination.id}
                className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={`${destination.name} - ${destination.description}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary/90">
                    {regionLabels[destination.region]}
                  </Badge>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
                    {destination.name}
                  </h3>
                  <p className="text-muted-foreground mb-4">{destination.description}</p>
                  
                  {destination.highlights && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {destination.highlights.slice(0, 3).map((highlight) => (
                          <span key={highlight} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    {destination.bestTime && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {destination.bestTime}
                      </span>
                    )}
                  </div>

                  <Link to="/">
                    <Button variant="outline" className="w-full">
                      <MapPin className="w-4 h-4 mr-2" />
                      Add to Trip
                    </Button>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-16 lg:py-24 bg-secondary">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-4">
              Popular Routes
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Recommended destination combinations for the best experience
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Cultural Triangle',
                route: 'Colombo → Sigiriya → Polonnaruwa → Kandy',
                duration: '5-7 days',
                highlights: ['Ancient ruins', 'UNESCO sites', 'Temple visits'],
              },
              {
                name: 'Southern Coast',
                route: 'Colombo → Bentota → Galle → Mirissa',
                duration: '6-8 days',
                highlights: ['Beaches', 'Whale watching', 'Colonial fort'],
              },
              {
                name: 'Hill Country',
                route: 'Kandy → Nuwara Eliya → Ella',
                duration: '4-5 days',
                highlights: ['Tea plantations', 'Train ride', 'Hiking'],
              },
            ].map((route) => (
              <div key={route.name} className="bg-background p-6 rounded-xl shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-accent fill-accent" />
                  <h3 className="font-display text-xl font-semibold text-foreground">{route.name}</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-2">{route.route}</p>
                <p className="text-primary font-medium mb-4">{route.duration}</p>
                <ul className="space-y-1">
                  {route.highlights.map((h) => (
                    <li key={h} className="text-sm text-muted-foreground">• {h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-primary">
        <div className="container text-center">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
            Create Your Perfect Itinerary
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Mix and match destinations to build your dream Sri Lanka adventure
          </p>
          <Link to="/">
            <Button variant="accent" size="xl">Start Planning</Button>
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Destinations;
