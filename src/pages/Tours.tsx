import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppButton, getWhatsAppLink } from '@/components/WhatsAppButton';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, DollarSign, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { tourPackages } from '@/data/tourData';
import heroImage from '@/assets/hero-sri-lanka.jpg';

const categoryLabels: Record<string, string> = {
  cultural: 'Cultural',
  beach: 'Beach & Sun',
  wildlife: 'Wildlife Safari',
  adventure: 'Adventure',
  luxury: 'Luxury',
  honeymoon: 'Honeymoon',
};

const Tours = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', ...Object.keys(categoryLabels)];

  const filteredTours = activeCategory === 'all'
    ? tourPackages
    : tourPackages.filter(t => t.category === activeCategory);

  return (
    <div className="min-h-screen">
      <SEO
        title="Sri Lanka Tour Packages | AO Travels - Curated Experiences"
        description="Choose from 10+ curated Sri Lanka tour packages. Cultural tours, beach holidays, wildlife safaris, honeymoons, and adventure trips. Book your dream vacation."
        keywords="Sri Lanka tours, tour packages, cultural tour, beach holiday, safari tour, honeymoon Sri Lanka, adventure travel"
      />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="Sri Lanka tours" className="w-full h-full object-cover" />
          <div className="hero-overlay absolute inset-0" />
        </div>
        <Header onStartBooking={() => {}} />
        <div className="relative z-10 container text-center text-primary-foreground">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Tour Packages
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Expertly curated journeys showcasing the best of Sri Lanka
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-background border-b sticky top-0 z-40">
        <div className="container">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(category)}
              >
                {category === 'all' ? 'All Tours' : categoryLabels[category]}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredTours.map((tour) => (
              <article
                key={tour.id}
                className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row"
              >
                <div className="relative md:w-2/5 h-64 md:h-auto overflow-hidden">
                  <img
                    src={tour.image}
                    alt={tour.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                    {categoryLabels[tour.category]}
                  </Badge>
                </div>
                <div className="p-6 md:w-3/5 flex flex-col">
                  <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
                    {tour.name}
                  </h3>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {tour.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {tour.destinations.length} destinations
                    </span>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4">{tour.description}</p>

                  <div className="mb-4 flex-grow">
                    <div className="text-xs font-medium text-foreground mb-2">Highlights:</div>
                    <div className="grid grid-cols-2 gap-1">
                      {tour.highlights.slice(0, 4).map((highlight) => (
                        <span key={highlight} className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Check className="w-3 h-3 text-primary" />
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <span className="text-muted-foreground text-sm">From</span>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-5 h-5 text-primary" />
                        <span className="font-display text-2xl font-bold text-foreground">{tour.price}</span>
                        <span className="text-muted-foreground text-sm">/person</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={getWhatsAppLink(`Hi! I'm interested in the ${tour.name} (${tour.duration}) tour package. Please share more details.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" size="sm">Inquire</Button>
                      </a>
                      <Link to="/">
                        <Button size="sm">Book Now</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Tour CTA */}
      <section className="py-16 lg:py-24 bg-secondary">
        <div className="container">
          <div className="bg-background rounded-2xl p-8 md:p-12 text-center shadow-lg">
            <h2 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-4">
              Want a Custom Tour?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Can't find the perfect package? Build your own itinerary step by step with our trip planner.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button variant="accent" size="xl">Build Custom Trip</Button>
              </Link>
              <a
                href={getWhatsAppLink("Hi! I'd like to discuss a custom tour package for my Sri Lanka trip.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="xl">Chat with Us</Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-4">
              What's Included
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Every AO Travels package comes with these premium inclusions
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🚗', title: 'Private Transport', desc: 'Air-conditioned vehicle with professional driver' },
              { icon: '🏨', title: 'Accommodation', desc: 'Quality hotels as per your chosen category' },
              { icon: '🍽️', title: 'Breakfast Daily', desc: 'Start each day with a full breakfast' },
              { icon: '📞', title: '24/7 Support', desc: 'Round-the-clock assistance throughout your trip' },
              { icon: '🎫', title: 'Entrance Fees', desc: 'All site entrance fees included' },
              { icon: '💧', title: 'Refreshments', desc: 'Water and snacks during travel' },
              { icon: '📍', title: 'Airport Transfers', desc: 'Pickup and drop-off included' },
              { icon: '🗺️', title: 'Expert Planning', desc: 'Optimized routes and local insights' },
            ].map((item) => (
              <div key={item.title} className="text-center p-4">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-display font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Tours;
