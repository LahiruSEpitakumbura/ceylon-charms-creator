import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Building2, Star, Loader2, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/Logo';

const amenities = ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Bar', 'Gym', 'Parking', 'Room Service', 'AC', 'Beach Access', 'Garden', 'Airport Shuttle'];
const roomTypes = ['Standard', 'Deluxe', 'Suite', 'Family Room', 'Villa', 'Bungalow', 'Cottage'];
const cities = ['Colombo', 'Kandy', 'Galle', 'Ella', 'Sigiriya', 'Nuwara Eliya', 'Anuradhapura', 'Trincomalee', 'Mirissa', 'Unawatuna', 'Bentota', 'Dambulla'];

export default function RegisterHotel() {
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasExistingProfile, setHasExistingProfile] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    star_rating: 3,
    description: '',
    amenities: [] as string[],
    room_types: [] as string[],
    price_range_min: 0,
    price_range_max: 0,
    website: '',
  });

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth/provider?type=hotel');
    }
  }, [user, loading, navigate]);

  // Check for existing profile and pre-fill email
  useEffect(() => {
    if (user) {
      setFormData(prev => ({ ...prev, email: user.email || '' }));
      
      const checkProfile = async () => {
        const { data } = await supabase
          .from('hotel_profiles')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();
        
        if (data) {
          setHasExistingProfile(true);
          setFormData({
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            city: data.city,
            star_rating: data.star_rating,
            description: data.description || '',
            amenities: data.amenities || [],
            room_types: data.room_types || [],
            price_range_min: Number(data.price_range_min),
            price_range_max: Number(data.price_range_max),
            website: data.website || '',
          });
        }
      };
      checkProfile();
    }
  }, [user]);

  const handleArrayToggle = (field: 'amenities' | 'room_types', value: string) => {
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

    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.city) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      if (hasExistingProfile) {
        const { error } = await supabase
          .from('hotel_profiles')
          .update({ ...formData })
          .eq('user_id', user.id);

        if (error) throw error;
        toast.success('Hotel profile updated successfully!');
      } else {
        const { error } = await supabase
          .from('hotel_profiles')
          .insert([{ ...formData, user_id: user.id, status: 'pending' }]);

        if (error) throw error;
        toast.success('Hotel submitted! We will review and contact you soon.');
      }
      navigate('/');
    } catch (error: any) {
      console.error('Error submitting hotel:', error);
      toast.error('Failed to submit hotel profile. Please try again.');
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
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">
                {hasExistingProfile ? 'Update Your Hotel' : 'Register Your Hotel'}
              </CardTitle>
              <CardDescription>
                {hasExistingProfile 
                  ? 'Update your hotel information below'
                  : 'Partner with AO Travels to welcome tourists from around the world'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Hotel Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Grand Hotel"
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
                      placeholder="info@hotel.com"
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
                      placeholder="+94 11 234 5678"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Select
                      value={formData.city}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, city: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map(city => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Full Address *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="123 Beach Road, Colombo 03"
                    required
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Star Rating</Label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, star_rating: star }))}
                          className="p-1"
                        >
                          <Star
                            className={`h-6 w-6 ${star <= formData.star_rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                      placeholder="https://www.hotel.com"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="price_min">Min Price/Night (USD)</Label>
                    <Input
                      id="price_min"
                      type="number"
                      min="0"
                      value={formData.price_range_min}
                      onChange={(e) => setFormData(prev => ({ ...prev, price_range_min: parseFloat(e.target.value) || 0 }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price_max">Max Price/Night (USD)</Label>
                    <Input
                      id="price_max"
                      type="number"
                      min="0"
                      value={formData.price_range_max}
                      onChange={(e) => setFormData(prev => ({ ...prev, price_range_max: parseFloat(e.target.value) || 0 }))}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Amenities</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {amenities.map(amenity => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox
                          id={`amenity-${amenity}`}
                          checked={formData.amenities.includes(amenity)}
                          onCheckedChange={() => handleArrayToggle('amenities', amenity)}
                        />
                        <Label htmlFor={`amenity-${amenity}`} className="text-sm font-normal cursor-pointer">
                          {amenity}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Room Types Available</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {roomTypes.map(room => (
                      <div key={room} className="flex items-center space-x-2">
                        <Checkbox
                          id={`room-${room}`}
                          checked={formData.room_types.includes(room)}
                          onCheckedChange={() => handleArrayToggle('room_types', room)}
                        />
                        <Label htmlFor={`room-${room}`} className="text-sm font-normal cursor-pointer">
                          {room}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Hotel Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your hotel, its unique features, and what guests can expect..."
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
                    hasExistingProfile ? 'Update Hotel' : 'Submit Application'
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
