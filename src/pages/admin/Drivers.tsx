import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Check, X, Loader2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { Tables } from '@/integrations/supabase/types';

type Driver = Tables<'driver_profiles'>;

const vehicleTypes = ['Sedan', 'SUV', 'Van', 'Mini Bus', 'Luxury Car'];
const languages = ['English', 'German', 'French', 'Russian', 'Arabic', 'Sinhala', 'Tamil'];

export default function AdminDrivers() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    license_number: '',
    vehicle_type: '',
    languages: [] as string[],
    experience_years: 0,
    max_passengers: 4,
    price_per_day: 0,
    status: 'pending' as 'pending' | 'approved' | 'rejected'
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchDrivers();
  }, []);

  async function fetchDrivers() {
    try {
      const { data, error } = await supabase
        .from('driver_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDrivers(data || []);
    } catch (error) {
      console.error('Error fetching drivers:', error);
      toast({ title: 'Error', description: 'Failed to load drivers', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setFormData({
      name: '',
      phone: '',
      email: '',
      license_number: '',
      vehicle_type: '',
      languages: [],
      experience_years: 0,
      max_passengers: 4,
      price_per_day: 0,
      status: 'pending'
    });
    setEditingDriver(null);
  }

  function openEditDialog(driver: Driver) {
    setEditingDriver(driver);
    setFormData({
      name: driver.name,
      phone: driver.phone,
      email: driver.email,
      license_number: driver.license_number,
      vehicle_type: driver.vehicle_type,
      languages: driver.languages || [],
      experience_years: driver.experience_years,
      max_passengers: driver.max_passengers,
      price_per_day: Number(driver.price_per_day),
      status: driver.status
    });
    setDialogOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    try {
      if (editingDriver) {
        const { error } = await supabase
          .from('driver_profiles')
          .update({
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            license_number: formData.license_number,
            vehicle_type: formData.vehicle_type,
            languages: formData.languages,
            experience_years: formData.experience_years,
            max_passengers: formData.max_passengers,
            price_per_day: formData.price_per_day,
            status: formData.status
          })
          .eq('id', editingDriver.id);

        if (error) throw error;
        toast({ title: 'Success', description: 'Driver updated successfully' });
      } else {
        const { error } = await supabase
          .from('driver_profiles')
          .insert({
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            license_number: formData.license_number,
            vehicle_type: formData.vehicle_type,
            languages: formData.languages,
            experience_years: formData.experience_years,
            max_passengers: formData.max_passengers,
            price_per_day: formData.price_per_day,
            status: formData.status
          });

        if (error) throw error;
        toast({ title: 'Success', description: 'Driver added successfully' });
      }

      setDialogOpen(false);
      resetForm();
      fetchDrivers();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this driver?')) return;

    try {
      const { error } = await supabase.from('driver_profiles').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Success', description: 'Driver deleted successfully' });
      fetchDrivers();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  }

  async function updateStatus(id: string, status: 'approved' | 'rejected') {
    try {
      const { error } = await supabase
        .from('driver_profiles')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      toast({ title: 'Success', description: `Driver ${status}` });
      fetchDrivers();
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
          <h1 className="text-3xl font-bold tracking-tight">Drivers</h1>
          <p className="text-muted-foreground">Manage driver profiles and approvals</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Driver
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingDriver ? 'Edit Driver' : 'Add New Driver'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
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
                  <Label htmlFor="license">License Number</Label>
                  <Input
                    id="license"
                    value={formData.license_number}
                    onChange={(e) => setFormData({ ...formData, license_number: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicle_type">Vehicle Type</Label>
                  <Select
                    value={formData.vehicle_type}
                    onValueChange={(value) => setFormData({ ...formData, vehicle_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select vehicle type" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicleTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience (years)</Label>
                  <Input
                    id="experience"
                    type="number"
                    min="0"
                    value={formData.experience_years}
                    onChange={(e) => setFormData({ ...formData, experience_years: parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passengers">Max Passengers</Label>
                  <Input
                    id="passengers"
                    type="number"
                    min="1"
                    value={formData.max_passengers}
                    onChange={(e) => setFormData({ ...formData, max_passengers: parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price Per Day ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    value={formData.price_per_day}
                    onChange={(e) => setFormData({ ...formData, price_per_day: parseFloat(e.target.value) })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Languages</Label>
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang) => (
                    <Badge
                      key={lang}
                      variant={formData.languages.includes(lang) ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => {
                        const newLangs = formData.languages.includes(lang)
                          ? formData.languages.filter((l) => l !== lang)
                          : [...formData.languages, lang];
                        setFormData({ ...formData, languages: newLangs });
                      }}
                    >
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
              {editingDriver && (
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
                  {editingDriver ? 'Update' : 'Add'} Driver
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
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Languages</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {drivers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No drivers found
                  </TableCell>
                </TableRow>
              ) : (
                drivers.map((driver) => (
                  <TableRow key={driver.id}>
                    <TableCell className="font-medium">{driver.name}</TableCell>
                    <TableCell>
                      <div className="text-sm">{driver.email}</div>
                      <div className="text-sm text-muted-foreground">{driver.phone}</div>
                    </TableCell>
                    <TableCell>{driver.vehicle_type}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {driver.languages?.slice(0, 2).map((lang) => (
                          <Badge key={lang} variant="outline" className="text-xs">{lang}</Badge>
                        ))}
                        {(driver.languages?.length || 0) > 2 && (
                          <Badge variant="outline" className="text-xs">+{(driver.languages?.length || 0) - 2}</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(driver.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        {driver.status === 'pending' && (
                          <>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-green-600"
                              onClick={() => updateStatus(driver.id, 'approved')}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-red-600"
                              onClick={() => updateStatus(driver.id, 'rejected')}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() => openEditDialog(driver)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-destructive"
                          onClick={() => handleDelete(driver.id)}
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
