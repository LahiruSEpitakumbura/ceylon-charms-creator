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
import { Plus, Pencil, Trash2, Check, X, Loader2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { Tables } from '@/integrations/supabase/types';

type Guide = Tables<'guide_profiles'>;

const languages = ['English', 'German', 'French', 'Russian', 'Arabic', 'Sinhala', 'Tamil', 'Chinese', 'Japanese'];
const specializations = ['Wildlife', 'History', 'Culture', 'Adventure', 'Photography', 'Trekking', 'Beach', 'Ayurveda'];

export default function AdminGuides() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingGuide, setEditingGuide] = useState<Guide | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    license_number: '',
    languages: [] as string[],
    specializations: [] as string[],
    experience_years: 0,
    price_per_day: 0,
    bio: '',
    status: 'pending' as 'pending' | 'approved' | 'rejected'
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchGuides();
  }, []);

  async function fetchGuides() {
    try {
      const { data, error } = await supabase
        .from('guide_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGuides(data || []);
    } catch (error) {
      console.error('Error fetching guides:', error);
      toast({ title: 'Error', description: 'Failed to load guides', variant: 'destructive' });
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
      languages: [],
      specializations: [],
      experience_years: 0,
      price_per_day: 0,
      bio: '',
      status: 'pending'
    });
    setEditingGuide(null);
  }

  function openEditDialog(guide: Guide) {
    setEditingGuide(guide);
    setFormData({
      name: guide.name,
      phone: guide.phone,
      email: guide.email,
      license_number: guide.license_number || '',
      languages: guide.languages || [],
      specializations: guide.specializations || [],
      experience_years: guide.experience_years,
      price_per_day: Number(guide.price_per_day),
      bio: guide.bio || '',
      status: guide.status
    });
    setDialogOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    try {
      if (editingGuide) {
        const { error } = await supabase
          .from('guide_profiles')
          .update({
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            license_number: formData.license_number,
            languages: formData.languages,
            specializations: formData.specializations,
            experience_years: formData.experience_years,
            price_per_day: formData.price_per_day,
            bio: formData.bio,
            status: formData.status
          })
          .eq('id', editingGuide.id);

        if (error) throw error;
        toast({ title: 'Success', description: 'Guide updated successfully' });
      } else {
        const { error } = await supabase
          .from('guide_profiles')
          .insert({
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            license_number: formData.license_number,
            languages: formData.languages,
            specializations: formData.specializations,
            experience_years: formData.experience_years,
            price_per_day: formData.price_per_day,
            bio: formData.bio,
            status: formData.status
          });

        if (error) throw error;
        toast({ title: 'Success', description: 'Guide added successfully' });
      }

      setDialogOpen(false);
      resetForm();
      fetchGuides();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this guide?')) return;

    try {
      const { error } = await supabase.from('guide_profiles').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Success', description: 'Guide deleted successfully' });
      fetchGuides();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  }

  async function updateStatus(id: string, status: 'approved' | 'rejected') {
    try {
      const { error } = await supabase
        .from('guide_profiles')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      toast({ title: 'Success', description: `Guide ${status}` });
      fetchGuides();
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
          <h1 className="text-3xl font-bold tracking-tight">Guides</h1>
          <p className="text-muted-foreground">Manage tour guide profiles</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Guide
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingGuide ? 'Edit Guide' : 'Add New Guide'}</DialogTitle>
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
                  />
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
              <div className="space-y-2">
                <Label>Specializations</Label>
                <div className="flex flex-wrap gap-2">
                  {specializations.map((spec) => (
                    <Badge
                      key={spec}
                      variant={formData.specializations.includes(spec) ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => {
                        const newSpecs = formData.specializations.includes(spec)
                          ? formData.specializations.filter((s) => s !== spec)
                          : [...formData.specializations, spec];
                        setFormData({ ...formData, specializations: newSpecs });
                      }}
                    >
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={3}
                />
              </div>
              {editingGuide && (
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
                  {editingGuide ? 'Update' : 'Add'} Guide
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
                <TableHead>Languages</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Price/Day</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {guides.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                    No guides found
                  </TableCell>
                </TableRow>
              ) : (
                guides.map((guide) => (
                  <TableRow key={guide.id}>
                    <TableCell className="font-medium">{guide.name}</TableCell>
                    <TableCell>
                      <div className="text-sm">{guide.email}</div>
                      <div className="text-sm text-muted-foreground">{guide.phone}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {guide.languages?.slice(0, 2).map((lang) => (
                          <Badge key={lang} variant="outline" className="text-xs">{lang}</Badge>
                        ))}
                        {(guide.languages?.length || 0) > 2 && (
                          <Badge variant="outline" className="text-xs">+{(guide.languages?.length || 0) - 2}</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{guide.experience_years} yrs</TableCell>
                    <TableCell>${Number(guide.price_per_day)}</TableCell>
                    <TableCell>{getStatusBadge(guide.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        {guide.status === 'pending' && (
                          <>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-green-600"
                              onClick={() => updateStatus(guide.id, 'approved')}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-red-600"
                              onClick={() => updateStatus(guide.id, 'rejected')}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() => openEditDialog(guide)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-destructive"
                          onClick={() => handleDelete(guide.id)}
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
