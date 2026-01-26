import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useProviderRole } from '@/hooks/useProviderRole';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, ArrowLeft, Calendar, MapPin, Users, Phone, Mail } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { format } from 'date-fns';

interface Booking {
  id: string;
  booking_reference: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  start_date: string;
  end_date: string;
  destinations: string[];
  status: string;
  num_passengers: number;
  total_amount: number;
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  in_progress: 'bg-purple-100 text-purple-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function ProviderBookings() {
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  const { role, profile, loading: profileLoading } = useProviderRole();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth/provider?type=guide');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    async function fetchBookings() {
      if (!profile || !role) return;

      try {
        let query = supabase.from('tour_bookings').select('*');
        
        if (role === 'guide') {
          query = query.eq('guide_id', profile.id);
        } else if (role === 'driver') {
          query = query.eq('driver_id', profile.id);
        } else {
          // Hotels don't have direct booking assignments in current schema
          setBookings([]);
          setLoadingBookings(false);
          return;
        }

        const { data, error } = await query.order('start_date', { ascending: false });

        if (error) throw error;
        setBookings(data || []);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoadingBookings(false);
      }
    }

    if (profile && role) {
      fetchBookings();
    }
  }, [profile, role]);

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
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/provider')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold">My Bookings</h1>
              <p className="text-muted-foreground">View your assigned tours and bookings</p>
            </div>
          </div>

          {role === 'hotel' && (
            <Card>
              <CardContent className="py-8 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Hotel booking management is handled through the admin panel.
                  Contact support for booking inquiries.
                </p>
              </CardContent>
            </Card>
          )}

          {(role === 'guide' || role === 'driver') && (
            <>
              {loadingBookings ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : bookings.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="font-medium mb-2">No bookings yet</p>
                    <p className="text-sm text-muted-foreground">
                      You'll see your assigned tours here once you're booked by customers.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <Card key={booking.id}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">
                              Booking #{booking.booking_reference}
                            </CardTitle>
                            <CardDescription>
                              {format(new Date(booking.start_date), 'MMM d, yyyy')} - {format(new Date(booking.end_date), 'MMM d, yyyy')}
                            </CardDescription>
                          </div>
                          <Badge className={statusColors[booking.status] || 'bg-gray-100 text-gray-800'}>
                            {booking.status.replace('_', ' ')}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{booking.customer_name} ({booking.num_passengers} passengers)</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <a href={`tel:${booking.customer_phone}`} className="text-primary hover:underline">
                              {booking.customer_phone}
                            </a>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <a href={`mailto:${booking.customer_email}`} className="text-primary hover:underline">
                              {booking.customer_email}
                            </a>
                          </div>
                          {booking.destinations && booking.destinations.length > 0 && (
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span>{booking.destinations.join(', ')}</span>
                            </div>
                          )}
                        </div>
                        <div className="pt-3 border-t flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Total Amount</span>
                          <span className="font-semibold">${booking.total_amount}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
