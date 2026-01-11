import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Award, Users, Clock, Shield, Heart, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-sri-lanka.jpg';

const About = () => {
  const stats = [
    { number: '10+', label: 'Years Experience' },
    { number: '5000+', label: 'Happy Travelers' },
    { number: '50+', label: 'Destinations' },
    { number: '100%', label: 'Satisfaction Rate' },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion for Travel',
      description: 'We love what we do and it shows in every trip we plan. Our passion for Sri Lanka shines through in every detail.',
    },
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Your safety is our priority. All our vehicles are regularly maintained and our drivers are professionally trained.',
    },
    {
      icon: Users,
      title: 'Personal Touch',
      description: 'Every traveler is unique. We take time to understand your preferences and create personalized itineraries.',
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'From the moment you land to when you depart, our team is available around the clock for any assistance.',
    },
    {
      icon: Globe,
      title: 'Local Expertise',
      description: 'Our guides are locals who share authentic stories, hidden gems, and genuine hospitality.',
    },
    {
      icon: Award,
      title: 'Award Winning',
      description: 'Recognized by Sri Lanka Tourism for excellence in service and customer satisfaction.',
    },
  ];

  const team = [
    { name: 'Amal Fernando', role: 'Founder & CEO', description: 'With 15 years in tourism, Amal founded AO Travels to share authentic Sri Lankan experiences.' },
    { name: 'Priya Jayawardena', role: 'Operations Manager', description: 'Priya ensures every tour runs smoothly with meticulous attention to detail.' },
    { name: 'Nuwan Silva', role: 'Head Guide', description: 'Nuwan\'s knowledge of Sri Lankan history and culture is unmatched.' },
    { name: 'Sarah Chen', role: 'Customer Relations', description: 'Sarah speaks 5 languages and helps international guests feel at home.' },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="About AO Travels | Premium Sri Lanka Tour Operator"
        description="Discover why AO Travels is Sri Lanka's trusted luxury tour operator. 10+ years of experience, 5000+ happy travelers, and 100% satisfaction guaranteed."
        keywords="Sri Lanka tour operator, luxury travel Sri Lanka, about AO Travels, Sri Lanka travel company"
      />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="AO Travels team" className="w-full h-full object-cover" />
          <div className="hero-overlay absolute inset-0" />
        </div>
        <Header onStartBooking={() => {}} />
        <div className="relative z-10 container text-center text-primary-foreground">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">About AO Travels</h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Your trusted partner for authentic Sri Lankan experiences since 2014
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2014, AO Travels began with a simple dream: to share the beauty and warmth of Sri Lanka with the world. What started as a small family operation has grown into one of the island's most trusted tour operators.
                </p>
                <p>
                  Our founder, Amal Fernando, grew up in a village near Sigiriya, surrounded by ancient ruins and lush landscapes. His childhood adventures exploring temples, wildlife parks, and hidden waterfalls inspired him to share these experiences with travelers from around the globe.
                </p>
                <p>
                  Today, AO Travels combines that authentic local knowledge with modern luxury service. We believe every journey should be transformative, every destination should tell a story, and every guest should feel like family.
                </p>
              </div>
              <div className="mt-8">
                <Link to="/">
                  <Button variant="accent" size="lg">Start Your Journey</Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src={heroImage}
                alt="Sri Lanka landscape"
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground p-6 rounded-xl shadow-lg">
                <div className="font-display text-3xl font-bold">10+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 lg:py-24 bg-secondary">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-background p-6 rounded-xl shadow-sm">
                <value.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-4">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The passionate people behind your unforgettable journey
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-32 h-32 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-16 h-16 text-primary/50" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">{member.name}</h3>
                <p className="text-accent text-sm mb-2">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.description}</p>
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
            Let us help you create memories that will last a lifetime
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button variant="accent" size="xl">Plan Your Trip</Button>
            </Link>
            <Link to="/tours">
              <Button variant="hero-outline" size="xl">View Tour Packages</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default About;
