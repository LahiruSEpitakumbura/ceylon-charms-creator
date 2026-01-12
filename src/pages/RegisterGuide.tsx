import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/Logo';

const languages = ['English', 'Sinhala', 'Tamil', 'German', 'French', 'Spanish', 'Chinese', 'Japanese', 'Italian', 'Russian'];
const specializations = ['Cultural Tours', 'Wildlife Safari', 'Adventure Tours', 'Historical Sites', 'Religious Tours', 'Eco-Tourism', 'Photography Tours', 'Culinary Tours'];

export default function RegisterGuide() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    
    if (!formData.name || !formData.email || !formData.phone || formData.languages.length === 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('guide_profiles')
        .insert([{ ...formData, status: 'pending' }]);

      if (error) throw error;

      toast.success('Application submitted! We will review and contact you soon.');
      navigate('/');
    } catch (error: any) {
      console.error('Error submitting application:', error);
      toast.error('Failed to submit application. Please try again.');
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
          <Link to="/register" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </div>
      </header>

      <main className="container py-12">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Register as a Tour Guide</CardTitle>
              <CardDescription>
                Join our network of professional tour guides in Sri Lanka
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
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  Your application will be reviewed by our team. We'll contact you within 2-3 business days.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
