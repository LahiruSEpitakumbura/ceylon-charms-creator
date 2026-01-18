import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Check, X, Loader2, Star } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { Tables } from '@/integrations/supabase/types';

type Hotel = Tables<'hotel_profiles'>;

const amenitiesList = ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Bar', 'Gym', 'Parking', 'Room Service', 'AC', 'Laundry'];
const roomTypes = ['Standard', 'Deluxe', 'Suite', 'Family Room', 'Villa', 'Bungalow'];

export default function AdminHotels() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    star_rating: 3,
    room_types: [] as string[],
    amenities: [] as string[],
    price_range_min: 0,
    price_range_max: 0,
    description: '',
    website: '',
    status: 'pending' as 'pending' | 'approved' | 'rejected'
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchHotels();
  }, []);

  async function fetchHotels() {
    try {
      const { data, error } = await supabase
        .from('hotel_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setHotels(data || []);
    } catch (error) {
      console.error('Error fetching hotels:', error);
      toast({ title: 'Error', description: 'Failed to load hotels', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setFormData({
      name: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      star_rating: 3,
      room_types: [],
      amenities: [],
      price_range_min: 0,
      price_range_max: 0,
      description: '',
      website: '',
      status: 'pending'
    });
    setEditingHotel(null);
  }

  function openEditDialog(hotel: Hotel) {
    setEditingHotel(hotel);
    setFormData({
      name: hotel.name,
      phone: hotel.phone,
      email: hotel.email,
      address: hotel.address,
      city: hotel.city,
      star_rating: hotel.star_rating,
      room_types: hotel.room_types || [],
      amenities: hotel.amenities || [],
      price_range_min: Number(hotel.price_range_min),
      price_range_max: Number(hotel.price_range_max),
      description: hotel.description || '',
      website: hotel.website || '',
      status: hotel.status
    });
    setDialogOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    try {
      if (editingHotel) {
        const { error } = await supabase
          .from('hotel_profiles')
          .update({
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            address: formData.address,
            city: formData.city,
            star_rating: formData.star_rating,
            room_types: formData.room_types,
            amenities: formData.amenities,
            price_range_min: formData.price_range_min,
            price_range_max: formData.price_range_max,
            description: formData.description,
            website: formData.website,
            status: formData.status
          })
          .eq('id', editingHotel.id);

        if (error) throw error;
        toast({ title: 'Success', description: 'Hotel updated successfully' });
      } else {
        const { error } = await supabase
          .from('hotel_profiles')
          .insert({
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            address: formData.address,
            city: formData.city,
            star_rating: formData.star_rating,
            room_types: formData.room_types,
            amenities: formData.amenities,
            price_range_min: formData.price_range_min,
            price_range_max: formData.price_range_max,
            description: formData.description,
            website: formData.website,
            status: formData.status
          });

        if (error) throw error;
        toast({ title: 'Success', description: 'Hotel added successfully' });
      }

      setDialogOpen(false);
      resetForm();
      fetchHotels();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this hotel?')) return;

    try {
      const { error } = await supabase.from('hotel_profiles').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Success', description: 'Hotel deleted successfully' });
      fetchHotels();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  }

  async function updateStatus(id: string, status: 'approved' | 'rejected') {
    try {
      const { error } = await supabase
        .from('hotel_profiles')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      toast({ title: 'Success', description: `Hotel ${status}` });
      fetchHotels();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: rating }).map((_, i) => (
      <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Hotels</h1>
          <p className="text-muted-foreground">Manage hotel listings and approvals</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Hotel
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingHotel ? 'Edit Hotel' : 'Add New Hotel'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Hotel Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="star_rating">Star Rating</Label>
                  <Select
                    value={formData.star_rating.toString()}
                    onValueChange={(value) => setFormData({ ...formData, star_rating: parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <SelectItem key={rating} value={rating.toString()}>{rating} Star</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price_min">Min Price/Night ($)</Label>
                  <Input
                    id="price_min"
                    type="number"
                    min="0"
                    value={formData.price_range_min}
                    onChange={(e) => setFormData({ ...formData, price_range_min: parseFloat(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price_max">Max Price/Night ($)</Label>
                  <Input
                    id="price_max"
                    type="number"
                    min="0"
                    value={formData.price_range_max}
                    onChange={(e) => setFormData({ ...formData, price_range_max: parseFloat(e.target.value) })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Room Types</Label>
                <div className="flex flex-wrap gap-2">
                  {roomTypes.map((type) => (
                    <Badge
                      key={type}
                      variant={formData.room_types.includes(type) ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => {
                        const newTypes = formData.room_types.includes(type)
                          ? formData.room_types.filter((t) => t !== type)
                          : [...formData.room_types, type];
                        setFormData({ ...formData, room_types: newTypes });
                      }}
                    >
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Amenities</Label>
                <div className="flex flex-wrap gap-2">
                  {amenitiesList.map((amenity) => (
                    <Badge
                      key={amenity}
                      variant={formData.amenities.includes(amenity) ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => {
                        const newAmenities = formData.amenities.includes(amenity)
                          ? formData.amenities.filter((a) => a !== amenity)
                          : [...formData.amenities, amenity];
                        setFormData({ ...formData, amenities: newAmenities });
                      }}
                    >
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              {editingHotel && (
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: 'pending' | 'approved' | 'rejected') => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingHotel ? 'Update' : 'Add'} Hotel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hotel</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Price Range</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hotels.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No hotels found
                  </TableCell>
                </TableRow>
              ) : (
                hotels.map((hotel) => (
                  <TableRow key={hotel.id}>
                    <TableCell>
                      <div className="font-medium">{hotel.name}</div>
                      <div className="text-sm text-muted-foreground">{hotel.email}</div>
                    </TableCell>
                    <TableCell>{hotel.city}</TableCell>
                    <TableCell>
                      <div className="flex">{renderStars(hotel.star_rating)}</div>
                    </TableCell>
                    <TableCell>
                      ${Number(hotel.price_range_min)} - ${Number(hotel.price_range_max)}
                    </TableCell>
                    <TableCell>{getStatusBadge(hotel.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        {hotel.status === 'pending' && (
                          <>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-green-600"
                              onClick={() => updateStatus(hotel.id, 'approved')}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-red-600"
                              onClick={() => updateStatus(hotel.id, 'rejected')}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() => openEditDialog(hotel)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-destructive"
                          onClick={() => handleDelete(hotel.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
