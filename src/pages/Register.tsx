import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, MapPin, Building2, Car } from 'lucide-react';
import { Logo } from '@/components/Logo';

const registrationOptions = [
  {
    title: 'Customer Profile',
    description: 'Create your travel profile to save preferences and manage bookings',
    icon: User,
    href: '/register/customer',
    color: 'bg-primary/10 text-primary',
    requiresAuth: false,
  },
  {
    title: 'Tour Guide',
    description: 'Join our network of professional tour guides in Sri Lanka',
    icon: MapPin,
    href: '/auth/provider?type=guide',
    color: 'bg-green-100 text-green-600',
    requiresAuth: true,
  },
  {
    title: 'Hotel Partner',
    description: 'Partner with us to welcome tourists from around the world',
    icon: Building2,
    href: '/auth/provider?type=hotel',
    color: 'bg-blue-100 text-blue-600',
    requiresAuth: true,
  },
  {
    title: 'Driver Services',
    description: 'Register as a driver for tourist transportation services',
    icon: Car,
    href: '/auth/provider?type=driver',
    color: 'bg-orange-100 text-orange-600',
    requiresAuth: true,
  },
];

export default function Register() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <Link to="/">
            <Logo className="h-10" />
          </Link>
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Join AO Travels</h1>
            <p className="text-lg text-muted-foreground">
              Choose how you'd like to be part of our travel community
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {registrationOptions.map((option) => (
              <Link key={option.title} to={option.href}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:border-primary/50 cursor-pointer group">
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-xl ${option.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <option.icon className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-xl">{option.title}</CardTitle>
                    <CardDescription className="text-base">
                      {option.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {option.requiresAuth ? 'Login / Sign Up' : 'Get Started'}
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center space-y-2">
            <p className="text-muted-foreground">
              Already registered as a service provider?{' '}
              <Link to="/auth/provider?type=guide" className="text-primary hover:underline font-medium">
                Sign in here
              </Link>
            </p>
            <p className="text-muted-foreground">
              Or access your{' '}
              <Link to="/provider" className="text-primary hover:underline font-medium">
                Provider Dashboard
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
