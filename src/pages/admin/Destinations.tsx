import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { Tables } from '@/integrations/supabase/types';

type Destination = Tables<'destinations'>;

export default function AdminDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingDestination, setEditingDestination] = useState<Destination | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    main_attractions: [] as string[],
    best_season: '',
    attractionInput: ''
  });
  const { toast } = useToast();

  useEffect(() => { fetchDestinations(); }, []);

  async function fetchDestinations() {
    try {
      const { data, error } = await supabase.from('destinations').select('*').order('name');
      if (error) throw error;
      setDestinations(data || []);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to load destinations', variant: 'destructive' });
    } finally { setLoading(false); }
  }

  function resetForm() {
    setFormData({ name: '', description: '', main_attractions: [], best_season: '', attractionInput: '' });
    setEditingDestination(null);
  }

  function openEditDialog(dest: Destination) {
    setEditingDestination(dest);
    setFormData({
      name: dest.name,
      description: dest.description || '',
      main_attractions: dest.main_attractions || [],
      best_season: dest.best_season || '',
      attractionInput: ''
    });
    setDialogOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const payload = { name: formData.name, description: formData.description, main_attractions: formData.main_attractions, best_season: formData.best_season };
      if (editingDestination) {
        const { error } = await supabase.from('destinations').update(payload).eq('id', editingDestination.id);
        if (error) throw error;
        toast({ title: 'Success', description: 'Destination updated' });
      } else {
        const { error } = await supabase.from('destinations').insert(payload);
        if (error) throw error;
        toast({ title: 'Success', description: 'Destination added' });
      }
      setDialogOpen(false); resetForm(); fetchDestinations();
    } catch (error: any) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this destination?')) return;
    try {
      const { error } = await supabase.from('destinations').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Success', description: 'Destination deleted' }); fetchDestinations();
    } catch (error: any) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); }
  }

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-3xl font-bold">Destinations</h1><p className="text-muted-foreground">Manage tour destinations</p></div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild><Button><Plus className="mr-2 h-4 w-4" />Add Destination</Button></DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>{editingDestination ? 'Edit' : 'Add'} Destination</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2"><Label>Name</Label><Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required /></div>
              <div className="space-y-2"><Label>Description</Label><Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} /></div>
              <div className="space-y-2"><Label>Best Season</Label><Input value={formData.best_season} onChange={(e) => setFormData({ ...formData, best_season: e.target.value })} placeholder="e.g., December - March" /></div>
              <div className="space-y-2">
                <Label>Main Attractions</Label>
                <div className="flex gap-2"><Input value={formData.attractionInput} onChange={(e) => setFormData({ ...formData, attractionInput: e.target.value })} placeholder="Add attraction" /><Button type="button" onClick={() => { if (formData.attractionInput.trim()) { setFormData({ ...formData, main_attractions: [...formData.main_attractions, formData.attractionInput.trim()], attractionInput: '' }); } }}>Add</Button></div>
                <div className="flex flex-wrap gap-1 mt-2">{formData.main_attractions.map((attr, i) => (<Badge key={i} variant="secondary" className="cursor-pointer" onClick={() => setFormData({ ...formData, main_attractions: formData.main_attractions.filter((_, idx) => idx !== i) })}>{attr} ×</Badge>))}</div>
              </div>
              <div className="flex justify-end gap-2"><Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button><Button type="submit">{editingDestination ? 'Update' : 'Add'}</Button></div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Card><CardContent className="p-0">
        <Table>
          <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Best Season</TableHead><TableHead>Attractions</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {destinations.length === 0 ? <TableRow><TableCell colSpan={4} className="text-center py-8 text-muted-foreground">No destinations</TableCell></TableRow> :
            destinations.map((dest) => (<TableRow key={dest.id}><TableCell className="font-medium">{dest.name}</TableCell><TableCell>{dest.best_season || '-'}</TableCell><TableCell><div className="flex flex-wrap gap-1">{dest.main_attractions?.slice(0, 2).map((a, i) => <Badge key={i} variant="outline" className="text-xs">{a}</Badge>)}{(dest.main_attractions?.length || 0) > 2 && <Badge variant="outline" className="text-xs">+{(dest.main_attractions?.length || 0) - 2}</Badge>}</div></TableCell><TableCell className="text-right"><Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => openEditDialog(dest)}><Pencil className="h-4 w-4" /></Button><Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => handleDelete(dest.id)}><Trash2 className="h-4 w-4" /></Button></TableCell></TableRow>))}
          </TableBody>
        </Table>
      </CardContent></Card>
    </div>
  );
}
