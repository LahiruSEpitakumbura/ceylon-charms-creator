import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { ArrowLeft, MapPin, Loader2, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/Logo';

const languages = ['English', 'Sinhala', 'Tamil', 'German', 'French', 'Spanish', 'Chinese', 'Japanese', 'Italian', 'Russian'];
const specializations = ['Cultural Tours', 'Wildlife Safari', 'Adventure Tours', 'Historical Sites', 'Religious Tours', 'Eco-Tourism', 'Photography Tours', 'Culinary Tours'];

export default function RegisterGuide() {
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasExistingProfile, setHasExistingProfile] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    languages: [] as string[],
    experience_years: 0,
    specializations: [] as string[],
    bio: '',
    license_number: '',
    price_per_day: 0,
  });

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth/provider?type=guide');
    }
  }, [user, loading, navigate]);

  // Check for existing profile and pre-fill email
  useEffect(() => {
    if (user) {
      setFormData(prev => ({ ...prev, email: user.email || '' }));
      
      // Check if user already has a guide profile
      const checkProfile = async () => {
        const { data } = await supabase
          .from('guide_profiles')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();
        
        if (data) {
          setHasExistingProfile(true);
          setFormData({
            name: data.name,
            email: data.email,
            phone: data.phone,
            languages: data.languages || [],
            experience_years: data.experience_years,
            specializations: data.specializations || [],
            bio: data.bio || '',
            license_number: data.license_number || '',
            price_per_day: Number(data.price_per_day),
          });
        }
      };
      checkProfile();
    }
  }, [user]);

  const handleArrayToggle = (field: 'languages' | 'specializations', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please login to continue');
      return;
    }

    if (!formData.name || !formData.email || !formData.phone || formData.languages.length === 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      if (hasExistingProfile) {
        const { error } = await supabase
          .from('guide_profiles')
          .update({ ...formData })
          .eq('user_id', user.id);

        if (error) throw error;
        toast.success('Profile updated successfully!');
      } else {
        const { error } = await supabase
          .from('guide_profiles')
          .insert([{ ...formData, user_id: user.id, status: 'pending' }]);

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
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">
                {hasExistingProfile ? 'Update Your Guide Profile' : 'Register as a Tour Guide'}
              </CardTitle>
              <CardDescription>
                {hasExistingProfile 
                  ? 'Update your profile information below'
                  : 'Join our network of professional tour guides in Sri Lanka'
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
                    <Label htmlFor="license">License Number</Label>
                    <Input
                      id="license"
                      value={formData.license_number}
                      onChange={(e) => setFormData(prev => ({ ...prev, license_number: e.target.value }))}
                      placeholder="Tourism license number"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
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
                </div>

                <div className="space-y-3">
                  <Label>Languages Spoken *</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {languages.map(lang => (
                      <div key={lang} className="flex items-center space-x-2">
                        <Checkbox
                          id={`lang-${lang}`}
                          checked={formData.languages.includes(lang)}
                          onCheckedChange={() => handleArrayToggle('languages', lang)}
                        />
                        <Label htmlFor={`lang-${lang}`} className="text-sm font-normal cursor-pointer">
                          {lang}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Specializations</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {specializations.map(spec => (
                      <div key={spec} className="flex items-center space-x-2">
                        <Checkbox
                          id={`spec-${spec}`}
                          checked={formData.specializations.includes(spec)}
                          onCheckedChange={() => handleArrayToggle('specializations', spec)}
                        />
                        <Label htmlFor={`spec-${spec}`} className="text-sm font-normal cursor-pointer">
                          {spec}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">About You</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Tell us about yourself and your experience..."
                    rows={4}
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
