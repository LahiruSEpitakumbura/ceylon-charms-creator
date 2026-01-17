import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Car, Loader2, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/Logo';

const languages = ['English', 'Sinhala', 'Tamil', 'German', 'French', 'Hindi'];
const vehicleTypes = ['Sedan', 'SUV', 'Van', 'Mini Bus', 'Luxury Car', 'TukTuk'];

export default function RegisterDriver() {
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasExistingProfile, setHasExistingProfile] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    license_number: '',
    license_expiry: '',
    vehicle_type: '',
    vehicle_model: '',
    vehicle_year: new Date().getFullYear(),
    vehicle_plate: '',
    max_passengers: 4,
    languages: [] as string[],
    experience_years: 0,
    price_per_day: 0,
  });

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth/provider?type=driver');
    }
  }, [user, loading, navigate]);

  // Check for existing profile and pre-fill email
  useEffect(() => {
    if (user) {
      setFormData(prev => ({ ...prev, email: user.email || '' }));
      
      const checkProfile = async () => {
        const { data } = await supabase
          .from('driver_profiles')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();
        
        if (data) {
          setHasExistingProfile(true);
          setFormData({
            name: data.name,
            email: data.email,
            phone: data.phone,
            license_number: data.license_number,
            license_expiry: data.license_expiry || '',
            vehicle_type: data.vehicle_type,
            vehicle_model: data.vehicle_model || '',
            vehicle_year: data.vehicle_year || new Date().getFullYear(),
            vehicle_plate: data.vehicle_plate || '',
            max_passengers: data.max_passengers,
            languages: data.languages || [],
            experience_years: data.experience_years,
            price_per_day: Number(data.price_per_day),
          });
        }
      };
      checkProfile();
    }
  }, [user]);

  const handleLanguageToggle = (lang: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(lang)
        ? prev.languages.filter(l => l !== lang)
        : [...prev.languages, lang]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please login to continue');
      return;
    }

    if (!formData.name || !formData.email || !formData.phone || !formData.license_number || !formData.vehicle_type) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      if (hasExistingProfile) {
        const { error } = await supabase
          .from('driver_profiles')
          .update({ 
            ...formData, 
            license_expiry: formData.license_expiry || null 
          })
          .eq('user_id', user.id);

        if (error) throw error;
        toast.success('Driver profile updated successfully!');
      } else {
        const { error } = await supabase
          .from('driver_profiles')
          .insert([{ 
            ...formData, 
            user_id: user.id,
            license_expiry: formData.license_expiry || null,
            status: 'pending' 
          }]);

        if (error) throw error;
        toast.success('Profile submitted! We will review and contact you soon.');
      }
      navigate('/');
    } catch (error: any) {
      console.error('Error submitting profile:', error);
      toast.error('Failed to submit profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/register');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <Link to="/">
            <Logo className="h-10" />
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">{user.email}</span>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-12">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Car className="h-8 w-8 text-orange-600" />
              </div>
              <CardTitle className="text-2xl">
                {hasExistingProfile ? 'Update Your Driver Profile' : 'Register as a Driver'}
              </CardTitle>
              <CardDescription>
                {hasExistingProfile 
                  ? 'Update your driver information below'
                  : 'Join our fleet of professional drivers for tourist transportation'
                }
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
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+94 77 123 4567"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input
                      id="experience"
                      type="number"
                      min="0"
                      value={formData.experience_years}
                      onChange={(e) => setFormData(prev => ({ ...prev, experience_years: parseInt(e.target.value) || 0 }))}
                    />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4">License Information</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="license">License Number *</Label>
                      <Input
                        id="license"
                        value={formData.license_number}
                        onChange={(e) => setFormData(prev => ({ ...prev, license_number: e.target.value }))}
                        placeholder="DL-123456789"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="license_expiry">License Expiry Date</Label>
                      <Input
                        id="license_expiry"
                        type="date"
                        value={formData.license_expiry}
                        onChange={(e) => setFormData(prev => ({ ...prev, license_expiry: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4">Vehicle Information</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="vehicle_type">Vehicle Type *</Label>
                      <Select
                        value={formData.vehicle_type}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, vehicle_type: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select vehicle type" />
                        </SelectTrigger>
                        <SelectContent>
                          {vehicleTypes.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vehicle_model">Vehicle Model</Label>
                      <Input
                        id="vehicle_model"
                        value={formData.vehicle_model}
                        onChange={(e) => setFormData(prev => ({ ...prev, vehicle_model: e.target.value }))}
                        placeholder="Toyota Prius"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="vehicle_year">Year</Label>
                      <Input
                        id="vehicle_year"
                        type="number"
                        min="2000"
                        max={new Date().getFullYear()}
                        value={formData.vehicle_year}
                        onChange={(e) => setFormData(prev => ({ ...prev, vehicle_year: parseInt(e.target.value) || 2020 }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vehicle_plate">Plate Number</Label>
                      <Input
                        id="vehicle_plate"
                        value={formData.vehicle_plate}
                        onChange={(e) => setFormData(prev => ({ ...prev, vehicle_plate: e.target.value }))}
                        placeholder="ABC-1234"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="max_passengers">Max Passengers</Label>
                      <Input
                        id="max_passengers"
                        type="number"
                        min="1"
                        max="50"
                        value={formData.max_passengers}
                        onChange={(e) => setFormData(prev => ({ ...prev, max_passengers: parseInt(e.target.value) || 4 }))}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Languages Spoken</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {languages.map(lang => (
                      <div key={lang} className="flex items-center space-x-2">
                        <Checkbox
                          id={`lang-${lang}`}
                          checked={formData.languages.includes(lang)}
                          onCheckedChange={() => handleLanguageToggle(lang)}
                        />
                        <Label htmlFor={`lang-${lang}`} className="text-sm font-normal cursor-pointer">
                          {lang}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Daily Rate (USD)</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    value={formData.price_per_day}
                    onChange={(e) => setFormData(prev => ({ ...prev, price_per_day: parseFloat(e.target.value) || 0 }))}
                  />
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {hasExistingProfile ? 'Updating...' : 'Submitting...'}
                    </>
                  ) : (
                    hasExistingProfile ? 'Update Profile' : 'Submit Application'
                  )}
                </Button>

                {!hasExistingProfile && (
                  <p className="text-sm text-muted-foreground text-center">
                    Your application will be reviewed by our team. We'll contact you within 2-3 business days.
                  </p>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
