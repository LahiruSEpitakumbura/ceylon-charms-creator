import { useState } from 'react';
import { ArrowDown, Sparkles, MapPin, Star, Users, Calendar, Clock, ChevronRight, Mountain, Waves, TreePine, Compass, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { TrustBadges } from '@/components/TrustBadges';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { BookingWizard } from '@/components/booking/BookingWizard';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-sigiriya-aerial.jpg';
import destSigiriya from '@/assets/dest-sigiriya.jpg';
import destKandy from '@/assets/dest-kandy.jpg';
import destElla from '@/assets/dest-ella.jpg';
import destGalle from '@/assets/dest-galle.jpg';
import expTrain from '@/assets/experience-train.jpg';
import expBeach from '@/assets/experience-beach.jpg';
import expSafari from '@/assets/experience-safari.jpg';
import expCulture from '@/assets/experience-culture.jpg';

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

  const featuredDestinations = [
    { name: 'Sigiriya', tagline: 'Ancient Rock Fortress', image: destSigiriya, nights: '1-2 nights', rating: 4.9 },
    { name: 'Kandy', tagline: 'Sacred Temple City', image: destKandy, nights: '2-3 nights', rating: 4.8 },
    { name: 'Ella', tagline: 'Misty Mountain Village', image: destElla, nights: '2-3 nights', rating: 4.9 },
    { name: 'Galle', tagline: 'Colonial Fort & Beaches', image: destGalle, nights: '1-2 nights', rating: 4.7 },
  ];

  const experiences = [
    { title: 'Scenic Train Journeys', description: 'Ride through emerald tea plantations on one of the world\'s most beautiful train routes from Kandy to Ella.', image: expTrain, tag: 'Most Popular' },
    { title: 'Golden Beach Sunsets', description: 'Walk pristine coastlines, surf world-class waves, and watch unforgettable sunsets along the southern coast.', image: expBeach, tag: 'Romantic' },
    { title: 'Wildlife Safaris', description: 'Track elusive leopards at Yala, witness the elephant gathering at Minneriya, and explore untamed wilderness.', image: expSafari, tag: 'Adventure' },
    { title: 'Ancient Heritage', description: 'Explore 2,500 years of Buddhist heritage, sacred temples, and UNESCO World Heritage sites across the island.', image: expCulture, tag: 'Cultural' },
  ];

  const testimonials = [
    { name: 'Sarah & James', location: 'London, UK', text: 'AO Travels made our honeymoon absolutely magical. Every detail was perfect — from the private chauffeur to the hidden waterfall they surprised us with. Sri Lanka is now our favorite place on Earth.', rating: 5 },
    { name: 'Marco Rossi', location: 'Milan, Italy', text: 'I\'ve traveled to 40+ countries and this was by far the best organized trip. The guide knew every secret spot and the driver was incredibly skilled on mountain roads. Bravo!', rating: 5 },
    { name: 'Yuki Tanaka', location: 'Tokyo, Japan', text: 'The Japanese-speaking guide made everything so comfortable. We felt like VIPs everywhere we went. The leopard safari and train ride were highlights we\'ll never forget.', rating: 5 },
  ];

  const stats = [
    { value: '2,500+', label: 'Happy Travelers' },
    { value: '10+', label: 'Years Experience' },
    { value: '30+', label: 'Destinations' },
    { value: '500+', label: '5-Star Reviews' },
  ];

  return (
    <div className="min-h-screen">
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="Aerial view of Sigiriya Rock Fortress surrounded by lush jungle at golden hour" className="w-full h-full object-cover scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(168_50%_12%/0.5)] via-[hsl(168_50%_15%/0.6)] to-[hsl(168_50%_10%/0.85)]" />
        </div>

        <Header onStartBooking={startBooking} />

        <div className="relative z-10 container text-center text-primary-foreground px-4">
          <div className="max-w-5xl mx-auto animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/20 rounded-full px-5 py-2.5 mb-8">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium tracking-wide">Luxury Sri Lanka Tours — Tailored For You</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl font-bold mb-6 leading-[1.1] tracking-tight">
              Discover the<br />
              <span className="text-accent">Pearl of the</span>{' '}
              <span className="italic font-medium">Indian Ocean</span>
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-primary-foreground/85 mb-10 max-w-3xl mx-auto leading-relaxed">
              Ancient ruins rising from misty jungles. Golden beaches kissed by turquoise waves. 
              Let us craft your perfect Sri Lanka adventure.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button variant="hero" size="xl" onClick={startBooking} className="group">
                Build Your Dream Trip
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <Link to="/tours">View Tour Packages</Link>
              </Button>
            </div>

            <TrustBadges />
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ArrowDown className="w-6 h-6 text-primary-foreground/50" />
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section className="relative z-20 -mt-16">
        <div className="container">
          <div className="bg-card rounded-2xl shadow-2xl border border-border/50 p-8 lg:p-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-3xl lg:text-4xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-muted-foreground text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURED DESTINATIONS ─── */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12">
            <div>
              <span className="text-accent font-semibold text-sm tracking-widest uppercase mb-3 block">Explore Sri Lanka</span>
              <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground leading-tight">
                Iconic Destinations<br />
                <span className="text-primary">Waiting For You</span>
              </h2>
            </div>
            <Link to="/destinations" className="mt-4 lg:mt-0 inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
              View All 30+ Destinations <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDestinations.map((dest, i) => (
              <div
                key={dest.name}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer card-premium ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
              >
                <div className={`${i === 0 ? 'aspect-square' : 'aspect-[4/5]'}`}>
                  <img
                    src={dest.image}
                    alt={`${dest.name} - ${dest.tagline}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(168_50%_8%/0.9)] via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="text-primary-foreground/90 text-sm font-medium">{dest.rating}</span>
                  </div>
                  <h3 className="font-display text-xl lg:text-2xl font-bold text-primary-foreground mb-1">{dest.name}</h3>
                  <p className="text-primary-foreground/70 text-sm">{dest.tagline}</p>
                  <div className="flex items-center gap-2 mt-3 text-primary-foreground/60 text-xs">
                    <Clock className="w-3 h-3" />
                    <span>Recommended: {dest.nights}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EXPERIENCES ─── */}
      <section className="py-20 lg:py-28 bg-secondary/30">
        <div className="container">
          <div className="text-center mb-14">
            <span className="text-accent font-semibold text-sm tracking-widest uppercase mb-3 block">Unforgettable Moments</span>
            <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-4">
              Experiences That Move You
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From adrenaline-pumping safaris to soul-stirring temple visits, every day brings a new story.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {experiences.map((exp) => (
              <div key={exp.title} className="group relative rounded-2xl overflow-hidden bg-card border border-border/50 card-premium">
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-2/5 aspect-[4/3] sm:aspect-auto overflow-hidden">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="sm:w-3/5 p-6 flex flex-col justify-center">
                    <span className="inline-block bg-accent/10 text-accent text-xs font-bold px-3 py-1 rounded-full w-fit mb-3">
                      {exp.tag}
                    </span>
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">{exp.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container">
          <div className="text-center mb-14">
            <span className="text-accent font-semibold text-sm tracking-widest uppercase mb-3 block">Simple & Seamless</span>
            <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-4">
              Plan Your Trip in Minutes
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our smart trip builder makes planning effortless. Just pick what you love.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-border" />

            {[
              { step: '01', icon: Calendar, title: 'Choose Dates', desc: 'Pick your arrival date and trip duration' },
              { step: '02', icon: MapPin, title: 'Select Destinations', desc: 'Choose from 30+ stunning locations' },
              { step: '03', icon: Compass, title: 'Pick Experiences', desc: 'Add safaris, hikes, surfing & more' },
              { step: '04', icon: Star, title: 'Confirm & Go!', desc: 'Review your itinerary and book instantly' },
            ].map((item) => (
              <div key={item.step} className="text-center relative">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5 relative z-10 border-4 border-background">
                  <item.icon className="w-10 h-10 text-primary" />
                </div>
                <span className="text-accent font-bold text-sm mb-1 block">Step {item.step}</span>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="default" size="xl" onClick={startBooking} className="group">
              Start Building Your Trip
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ─── */}
      <section className="py-20 lg:py-28 bg-primary text-primary-foreground">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent font-semibold text-sm tracking-widest uppercase mb-3 block">Why AO Travels?</span>
              <h2 className="font-display text-3xl lg:text-5xl font-bold mb-6 leading-tight">
                We Don't Just Plan Trips.<br />
                <span className="text-accent">We Craft Memories.</span>
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed">
                With over a decade of local expertise, a fleet of luxury vehicles, and hand-picked guides 
                who speak your language — we go beyond ordinary to deliver extraordinary.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { icon: Mountain, title: 'Custom Itineraries', desc: 'Every trip tailored to your pace and interests' },
                  { icon: Users, title: 'Expert Local Guides', desc: 'Guides in 10+ languages who know every secret spot' },
                  { icon: Waves, title: 'Luxury Fleet', desc: 'Modern AC vehicles with professional chauffeurs' },
                  { icon: TreePine, title: '24/7 Support', desc: 'We\'re always a call away, anytime you need us' },
                ].map((feature) => (
                  <div key={feature.title} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center shrink-0">
                      <feature.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{feature.title}</h4>
                      <p className="text-primary-foreground/65 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <img src={destSigiriya} alt="Sigiriya Rock" className="rounded-2xl object-cover w-full h-48 lg:h-64" />
              <img src={expTrain} alt="Train journey" className="rounded-2xl object-cover w-full h-48 lg:h-64 mt-8" />
              <img src={expBeach} alt="Beach sunset" className="rounded-2xl object-cover w-full h-48 lg:h-64 -mt-4" />
              <img src={destKandy} alt="Kandy temple" className="rounded-2xl object-cover w-full h-48 lg:h-64 mt-4" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container">
          <div className="text-center mb-14">
            <span className="text-accent font-semibold text-sm tracking-widest uppercase mb-3 block">Traveler Stories</span>
            <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-4">
              Words From Our Guests
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm hover:shadow-xl transition-shadow duration-300 relative">
                <Quote className="w-10 h-10 text-primary/15 absolute top-6 right-6" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground/80 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                <div>
                  <div className="font-display font-bold text-foreground">{t.name}</div>
                  <div className="text-muted-foreground text-sm">{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── POPULAR TOUR CATEGORIES ─── */}
      <section className="py-20 lg:py-28 bg-secondary/30">
        <div className="container">
          <div className="text-center mb-14">
            <span className="text-accent font-semibold text-sm tracking-widest uppercase mb-3 block">Curated Collections</span>
            <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-4">
              Find Your Perfect Journey
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Cultural Triangle', desc: 'Sigiriya, Dambulla, Polonnaruwa & ancient wonders', icon: '🏛️', days: '5-7 days', from: '$450' },
              { title: 'Beach & Coast', desc: 'Galle, Mirissa, Unawatuna & southern paradise', icon: '🏖️', days: '4-6 days', from: '$380' },
              { title: 'Hill Country', desc: 'Kandy, Ella, Nuwara Eliya & tea country magic', icon: '⛰️', days: '4-5 days', from: '$420' },
              { title: 'Wildlife Safari', desc: 'Yala, Udawalawe, Minneriya & untamed nature', icon: '🐆', days: '3-5 days', from: '$350' },
            ].map((tour) => (
              <div key={tour.title} className="bg-card rounded-2xl p-6 border border-border/50 card-premium group cursor-pointer" onClick={startBooking}>
                <div className="text-5xl mb-4">{tour.icon}</div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{tour.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{tour.desc}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{tour.days}</span>
                  <span className="font-bold text-primary">From {tour.from}</span>
                </div>
                <div className="mt-4 pt-4 border-t border-border flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                  Customize This Tour <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={expBeach} alt="Sri Lanka beach" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(168_50%_10%/0.92)] to-[hsl(168_50%_15%/0.85)]" />
        </div>
        <div className="container relative z-10 text-center text-primary-foreground">
          <h2 className="font-display text-3xl lg:text-5xl font-bold mb-4 leading-tight">
            Your Dream Sri Lanka Trip<br />
            <span className="text-accent">Starts Right Here</span>
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Join 2,500+ travelers who trusted us with their Sri Lanka adventure. 
            Build your custom itinerary in minutes — no commitment needed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" onClick={startBooking} className="group">
              Start Planning For Free
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <a href="https://wa.me/94771234567?text=Hi%20AO%20Travels!%20I'd%20like%20to%20plan%20a%20Sri%20Lanka%20trip." target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
