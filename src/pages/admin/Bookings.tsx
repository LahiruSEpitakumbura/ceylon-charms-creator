import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Eye } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { Tables } from '@/integrations/supabase/types';
import { format } from 'date-fns';

type Booking = Tables<'tour_bookings'>;

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const { toast } = useToast();

  useEffect(() => { fetchBookings(); }, []);

  async function fetchBookings() {
    try {
      const { data, error } = await supabase.from('tour_bookings').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setBookings(data || []);
    } catch (error) { toast({ title: 'Error', description: 'Failed to load bookings', variant: 'destructive' }); }
    finally { setLoading(false); }
  }

  async function updateStatus(id: string, status: string) {
    try {
      const { error } = await supabase.from('tour_bookings').update({ status: status as any }).eq('id', id);
      if (error) throw error;
      toast({ title: 'Success', description: 'Status updated' }); fetchBookings();
    } catch (error: any) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); }
  }

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = { pending: 'bg-yellow-500', confirmed: 'bg-blue-500', in_progress: 'bg-purple-500', completed: 'bg-green-500', cancelled: 'bg-red-500' };
    return <Badge className={colors[status] || 'bg-gray-500'}>{status.replace('_', ' ')}</Badge>;
  };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold">Bookings</h1><p className="text-muted-foreground">Manage tour bookings</p></div>
      <Card><CardContent className="p-0">
        <Table>
          <TableHeader><TableRow><TableHead>Reference</TableHead><TableHead>Customer</TableHead><TableHead>Dates</TableHead><TableHead>Total</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {bookings.length === 0 ? <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No bookings</TableCell></TableRow> :
            bookings.map((b) => (<TableRow key={b.id}><TableCell className="font-medium">{b.booking_reference}</TableCell><TableCell><div>{b.customer_name}</div><div className="text-sm text-muted-foreground">{b.customer_email}</div></TableCell><TableCell className="text-sm">{format(new Date(b.start_date), 'MMM d')} - {format(new Date(b.end_date), 'MMM d, yyyy')}</TableCell><TableCell>${Number(b.total_amount)}</TableCell><TableCell>{getStatusBadge(b.status)}</TableCell><TableCell className="text-right flex justify-end gap-1">
              <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setSelectedBooking(b)}><Eye className="h-4 w-4" /></Button>
              <Select value={b.status} onValueChange={(v) => updateStatus(b.id, v)}><SelectTrigger className="w-28 h-8"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="pending">Pending</SelectItem><SelectItem value="confirmed">Confirmed</SelectItem><SelectItem value="in_progress">In Progress</SelectItem><SelectItem value="completed">Completed</SelectItem><SelectItem value="cancelled">Cancelled</SelectItem></SelectContent></Select>
            </TableCell></TableRow>))}
          </TableBody>
        </Table>
      </CardContent></Card>

      <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Booking Details</DialogTitle></DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-muted-foreground">Reference:</span><p className="font-medium">{selectedBooking.booking_reference}</p></div>
                <div><span className="text-muted-foreground">Status:</span><p>{getStatusBadge(selectedBooking.status)}</p></div>
                <div><span className="text-muted-foreground">Customer:</span><p className="font-medium">{selectedBooking.customer_name}</p></div>
                <div><span className="text-muted-foreground">Contact:</span><p>{selectedBooking.customer_phone}</p></div>
                <div><span className="text-muted-foreground">Email:</span><p>{selectedBooking.customer_email}</p></div>
                <div><span className="text-muted-foreground">Passengers:</span><p>{selectedBooking.num_passengers}</p></div>
                <div><span className="text-muted-foreground">Dates:</span><p>{format(new Date(selectedBooking.start_date), 'MMM d')} - {format(new Date(selectedBooking.end_date), 'MMM d, yyyy')}</p></div>
                <div><span className="text-muted-foreground">Vehicle:</span><p>{selectedBooking.vehicle_type || '-'}</p></div>
                <div className="col-span-2"><span className="text-muted-foreground">Destinations:</span><div className="flex flex-wrap gap-1 mt-1">{selectedBooking.destinations?.map((d, i) => <Badge key={i} variant="outline">{d}</Badge>)}</div></div>
                <div className="col-span-2"><span className="text-muted-foreground">Special Requests:</span><p>{selectedBooking.special_requests || 'None'}</p></div>
                <div><span className="text-muted-foreground">Total:</span><p className="text-lg font-bold">${Number(selectedBooking.total_amount)}</p></div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
