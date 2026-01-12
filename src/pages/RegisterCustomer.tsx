import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ArrowLeft, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/Logo';

const travelPreferences = [
  'Adventure',
  'Cultural',
  'Wildlife',
  'Beach',
  'Historical',
  'Eco-Tourism',
  'Luxury',
  'Budget',
  'Photography',
  'Wellness',
];

const countries = [
  'United States', 'United Kingdom', 'Germany', 'France', 'Australia',
  'Canada', 'Netherlands', 'Switzerland', 'India', 'China', 'Japan',
  'Singapore', 'Malaysia', 'Thailand', 'Other'
];

export default function RegisterCustomer() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    preferred_language: 'English',
    travel_preferences: [] as string[],
  });

  const handlePreferenceToggle = (pref: string) => {
    setFormData(prev => ({
      ...prev,
      travel_preferences: prev.travel_preferences.includes(pref)
        ? prev.travel_preferences.filter(p => p !== pref)
        : [...prev.travel_preferences, pref]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('customer_profiles')
        .insert([formData]);

      if (error) throw error;

      toast.success('Profile created successfully! Welcome to AO Travels.');
      navigate('/');
    } catch (error: any) {
      console.error('Error creating profile:', error);
      if (error.code === '23505') {
        toast.error('An account with this email already exists.');
      } else {
        toast.error('Failed to create profile. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <User className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Create Your Travel Profile</CardTitle>
              <CardDescription>
                Join AO Travels to save your preferences and manage your bookings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+1 234 567 890"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select
                      value={formData.country}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, country: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map(country => (
                          <SelectItem key={country} value={country}>{country}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Preferred Language</Label>
                  <Select
                    value={formData.preferred_language}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, preferred_language: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="German">German</SelectItem>
                      <SelectItem value="French">French</SelectItem>
                      <SelectItem value="Spanish">Spanish</SelectItem>
                      <SelectItem value="Chinese">Chinese</SelectItem>
                      <SelectItem value="Japanese">Japanese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Travel Preferences</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {travelPreferences.map(pref => (
                      <div key={pref} className="flex items-center space-x-2">
                        <Checkbox
                          id={pref}
                          checked={formData.travel_preferences.includes(pref)}
                          onCheckedChange={() => handlePreferenceToggle(pref)}
                        />
                        <Label htmlFor={pref} className="text-sm font-normal cursor-pointer">
                          {pref}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? 'Creating Profile...' : 'Create Profile'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
