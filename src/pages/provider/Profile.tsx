import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useProviderRole } from '@/hooks/useProviderRole';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, ArrowLeft, Save } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { toast } from 'sonner';

export default function ProviderProfile() {
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  const { role, profile, loading: profileLoading, refetchProfile } = useProviderRole();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth/provider?type=guide');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: string, value: string) => {
    const array = value.split(',').map(item => item.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, [field]: array }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role || !profile) return;

    setIsSubmitting(true);

    try {
      const tableName = role === 'guide' ? 'guide_profiles' : role === 'hotel' ? 'hotel_profiles' : 'driver_profiles';
      
      // Remove non-editable fields
      const { id, user_id, status, created_at, updated_at, ...editableData } = formData;

      const { error } = await supabase
        .from(tableName)
        .update(editableData)
        .eq('id', profile.id);

      if (error) throw error;

      toast.success('Profile updated successfully!');
      await refetchProfile();
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !role || !profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <Link to="/">
            <Logo size="sm" />
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">{user.email}</span>
            <Button variant="outline" onClick={() => signOut()}>Sign Out</Button>
          </div>
        </div>
      </header>

      <main className="container py-8 lg:py-12">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/provider')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold">Edit Profile</h1>
              <p className="text-muted-foreground">Update your information</p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Keep your profile up to date to attract more customers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Common Fields */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name || ''}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email || ''}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone || ''}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Guide-specific fields */}
                {role === 'guide' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={formData.bio || ''}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        placeholder="Tell customers about yourself..."
                        rows={4}
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="languages">Languages (comma separated)</Label>
                        <Input
                          id="languages"
                          value={formData.languages?.join(', ') || ''}
                          onChange={(e) => handleArrayChange('languages', e.target.value)}
                          placeholder="English, Sinhala, Tamil"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="specializations">Specializations (comma separated)</Label>
                        <Input
                          id="specializations"
                          value={formData.specializations?.join(', ') || ''}
                          onChange={(e) => handleArrayChange('specializations', e.target.value)}
                          placeholder="Wildlife, History, Adventure"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="experience_years">Years of Experience</Label>
                        <Input
                          id="experience_years"
                          type="number"
                          min="0"
                          value={formData.experience_years || 0}
                          onChange={(e) => handleInputChange('experience_years', parseInt(e.target.value))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="price_per_day">Price per Day ($)</Label>
                        <Input
                          id="price_per_day"
                          type="number"
                          min="0"
                          value={formData.price_per_day || 0}
                          onChange={(e) => handleInputChange('price_per_day', parseFloat(e.target.value))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="license_number">License Number</Label>
                        <Input
                          id="license_number"
                          value={formData.license_number || ''}
                          onChange={(e) => handleInputChange('license_number', e.target.value)}
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Hotel-specific fields */}
                {role === 'hotel' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description || ''}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Describe your hotel..."
                        rows={4}
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          value={formData.address || ''}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={formData.city || ''}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="star_rating">Star Rating</Label>
                        <Input
                          id="star_rating"
                          type="number"
                          min="1"
                          max="5"
                          value={formData.star_rating || 3}
                          onChange={(e) => handleInputChange('star_rating', parseInt(e.target.value))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          type="url"
                          value={formData.website || ''}
                          onChange={(e) => handleInputChange('website', e.target.value)}
                          placeholder="https://..."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="price_range_min">Min Price ($)</Label>
                        <Input
                          id="price_range_min"
                          type="number"
                          min="0"
                          value={formData.price_range_min || 0}
                          onChange={(e) => handleInputChange('price_range_min', parseFloat(e.target.value))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="price_range_max">Max Price ($)</Label>
                        <Input
                          id="price_range_max"
                          type="number"
                          min="0"
                          value={formData.price_range_max || 0}
                          onChange={(e) => handleInputChange('price_range_max', parseFloat(e.target.value))}
                        />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="amenities">Amenities (comma separated)</Label>
                        <Input
                          id="amenities"
                          value={formData.amenities?.join(', ') || ''}
                          onChange={(e) => handleArrayChange('amenities', e.target.value)}
                          placeholder="WiFi, Pool, Spa, Restaurant"
                        />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="room_types">Room Types (comma separated)</Label>
                        <Input
                          id="room_types"
                          value={formData.room_types?.join(', ') || ''}
                          onChange={(e) => handleArrayChange('room_types', e.target.value)}
                          placeholder="Standard, Deluxe, Suite"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Driver-specific fields */}
                {role === 'driver' && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="license_number">License Number</Label>
                      <Input
                        id="license_number"
                        value={formData.license_number || ''}
                        onChange={(e) => handleInputChange('license_number', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="license_expiry">License Expiry</Label>
                      <Input
                        id="license_expiry"
                        type="date"
                        value={formData.license_expiry || ''}
                        onChange={(e) => handleInputChange('license_expiry', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vehicle_type">Vehicle Type</Label>
                      <Input
                        id="vehicle_type"
                        value={formData.vehicle_type || ''}
                        onChange={(e) => handleInputChange('vehicle_type', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vehicle_model">Vehicle Model</Label>
                      <Input
                        id="vehicle_model"
                        value={formData.vehicle_model || ''}
                        onChange={(e) => handleInputChange('vehicle_model', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vehicle_plate">Vehicle Plate</Label>
                      <Input
                        id="vehicle_plate"
                        value={formData.vehicle_plate || ''}
                        onChange={(e) => handleInputChange('vehicle_plate', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vehicle_year">Vehicle Year</Label>
                      <Input
                        id="vehicle_year"
                        type="number"
                        min="1990"
                        max={new Date().getFullYear() + 1}
                        value={formData.vehicle_year || ''}
                        onChange={(e) => handleInputChange('vehicle_year', parseInt(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="max_passengers">Max Passengers</Label>
                      <Input
                        id="max_passengers"
                        type="number"
                        min="1"
                        max="50"
                        value={formData.max_passengers || 4}
                        onChange={(e) => handleInputChange('max_passengers', parseInt(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience_years">Years of Experience</Label>
                      <Input
                        id="experience_years"
                        type="number"
                        min="0"
                        value={formData.experience_years || 0}
                        onChange={(e) => handleInputChange('experience_years', parseInt(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price_per_day">Price per Day ($)</Label>
                      <Input
                        id="price_per_day"
                        type="number"
                        min="0"
                        value={formData.price_per_day || 0}
                        onChange={(e) => handleInputChange('price_per_day', parseFloat(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="languages">Languages (comma separated)</Label>
                      <Input
                        id="languages"
                        value={formData.languages?.join(', ') || ''}
                        onChange={(e) => handleArrayChange('languages', e.target.value)}
                        placeholder="English, Sinhala, Tamil"
                      />
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => navigate('/provider')}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
