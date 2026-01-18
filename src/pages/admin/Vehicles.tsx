import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { Tables } from '@/integrations/supabase/types';

type Vehicle = Tables<'vehicles'>;

const vehicleTypes = ['Sedan', 'SUV', 'Van', 'Mini Bus', 'Luxury Car'];
const luxuryCategories = ['Standard', 'Premium', 'Luxury', 'VIP'];

export default function AdminVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [formData, setFormData] = useState({ vehicle_type: '', luxury_category: 'Standard', passenger_capacity: 4, luggage_capacity: 2, price_per_day: 0, availability_status: 'available' });
  const { toast } = useToast();

  useEffect(() => { fetchVehicles(); }, []);

  async function fetchVehicles() {
    try {
      const { data, error } = await supabase.from('vehicles').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setVehicles(data || []);
    } catch (error) { toast({ title: 'Error', description: 'Failed to load vehicles', variant: 'destructive' }); }
    finally { setLoading(false); }
  }

  function resetForm() { setFormData({ vehicle_type: '', luxury_category: 'Standard', passenger_capacity: 4, luggage_capacity: 2, price_per_day: 0, availability_status: 'available' }); setEditingVehicle(null); }

  function openEditDialog(v: Vehicle) {
    setEditingVehicle(v);
    setFormData({ vehicle_type: v.vehicle_type, luxury_category: v.luxury_category || 'Standard', passenger_capacity: v.passenger_capacity, luggage_capacity: v.luggage_capacity, price_per_day: Number(v.price_per_day), availability_status: v.availability_status });
    setDialogOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (editingVehicle) {
        const { error } = await supabase.from('vehicles').update(formData).eq('id', editingVehicle.id);
        if (error) throw error;
        toast({ title: 'Success', description: 'Vehicle updated' });
      } else {
        const { error } = await supabase.from('vehicles').insert(formData);
        if (error) throw error;
        toast({ title: 'Success', description: 'Vehicle added' });
      }
      setDialogOpen(false); resetForm(); fetchVehicles();
    } catch (error: any) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this vehicle?')) return;
    try { const { error } = await supabase.from('vehicles').delete().eq('id', id); if (error) throw error; toast({ title: 'Success', description: 'Vehicle deleted' }); fetchVehicles(); }
    catch (error: any) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); }
  }

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-3xl font-bold">Vehicles</h1><p className="text-muted-foreground">Manage fleet vehicles</p></div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild><Button><Plus className="mr-2 h-4 w-4" />Add Vehicle</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editingVehicle ? 'Edit' : 'Add'} Vehicle</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Type</Label><Select value={formData.vehicle_type} onValueChange={(v) => setFormData({ ...formData, vehicle_type: v })}><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger><SelectContent>{vehicleTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select></div>
                <div className="space-y-2"><Label>Category</Label><Select value={formData.luxury_category} onValueChange={(v) => setFormData({ ...formData, luxury_category: v })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{luxuryCategories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></div>
                <div className="space-y-2"><Label>Passengers</Label><Input type="number" min="1" value={formData.passenger_capacity} onChange={(e) => setFormData({ ...formData, passenger_capacity: parseInt(e.target.value) })} /></div>
                <div className="space-y-2"><Label>Luggage</Label><Input type="number" min="0" value={formData.luggage_capacity} onChange={(e) => setFormData({ ...formData, luggage_capacity: parseInt(e.target.value) })} /></div>
                <div className="space-y-2"><Label>Price/Day ($)</Label><Input type="number" min="0" value={formData.price_per_day} onChange={(e) => setFormData({ ...formData, price_per_day: parseFloat(e.target.value) })} /></div>
                <div className="space-y-2"><Label>Status</Label><Select value={formData.availability_status} onValueChange={(v) => setFormData({ ...formData, availability_status: v })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="available">Available</SelectItem><SelectItem value="busy">Busy</SelectItem><SelectItem value="maintenance">Maintenance</SelectItem></SelectContent></Select></div>
              </div>
              <div className="flex justify-end gap-2"><Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button><Button type="submit">{editingVehicle ? 'Update' : 'Add'}</Button></div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Card><CardContent className="p-0">
        <Table>
          <TableHeader><TableRow><TableHead>Type</TableHead><TableHead>Category</TableHead><TableHead>Capacity</TableHead><TableHead>Price/Day</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {vehicles.length === 0 ? <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No vehicles</TableCell></TableRow> :
            vehicles.map((v) => (<TableRow key={v.id}><TableCell className="font-medium">{v.vehicle_type}</TableCell><TableCell>{v.luxury_category}</TableCell><TableCell>{v.passenger_capacity} pax / {v.luggage_capacity} bags</TableCell><TableCell>${Number(v.price_per_day)}</TableCell><TableCell><Badge variant={v.availability_status === 'available' ? 'default' : 'secondary'}>{v.availability_status}</Badge></TableCell><TableCell className="text-right"><Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => openEditDialog(v)}><Pencil className="h-4 w-4" /></Button><Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => handleDelete(v.id)}><Trash2 className="h-4 w-4" /></Button></TableCell></TableRow>))}
          </TableBody>
        </Table>
      </CardContent></Card>
    </div>
  );
}
