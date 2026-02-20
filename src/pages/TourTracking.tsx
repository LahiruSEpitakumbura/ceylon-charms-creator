import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  MapPin, Search, Calendar, Clock, Users, Car, Navigation,
  CheckCircle2, Circle, Loader2, AlertCircle, Phone, Mail,
  Compass, Sunset, Mountain, TreePine
} from 'lucide-react';

interface BookingData {
  id: string;
  booking_reference: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  start_date: string;
  end_date: string;
  destinations: string[] | null;
  vehicle_type: string | null;
  num_passengers: number;
  status: string;
  total_amount: number;
  special_requests: string | null;
}

interface TrackingData {
  id: string;
  status: string | null;
  current_day: number | null;
  current_location_name: string | null;
  current_location_lat: number | null;
  current_location_lng: number | null;
  last_location_update: string | null;
  notes: string | null;
}

const statusConfig: Record<string, { label: string; color: string; icon: typeof CheckCircle2 }> = {
  pending: { label: 'Pending', color: 'bg-muted text-muted-foreground', icon: Clock },
  confirmed: { label: 'Confirmed', color: 'bg-primary/10 text-primary', icon: CheckCircle2 },
  in_progress: { label: 'In Progress', color: 'bg-accent/15 text-accent', icon: Navigation },
  completed: { label: 'Completed', color: 'bg-primary/20 text-primary', icon: CheckCircle2 },
  cancelled: { label: 'Cancelled', color: 'bg-destructive/10 text-destructive', icon: AlertCircle },
};

const destinationIcons = [Mountain, TreePine, Sunset, Compass, MapPin];

export default function TourTracking() {
  const [searchParams] = useSearchParams();
  const [refInput, setRefInput] = useState(searchParams.get('ref') || '');
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [tracking, setTracking] = useState<TrackingData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const lookupBooking = async () => {
    if (!refInput.trim()) return;
    setLoading(true);
    setError('');
    setSearched(true);

    const { data: bookingData, error: bookingErr } = await supabase
      .from('tour_bookings')
      .select('*')
      .eq('booking_reference', refInput.trim().toUpperCase())
      .maybeSingle();

    if (bookingErr || !bookingData) {
      setError('No booking found with that reference. Please check and try again.');
      setBooking(null);
      setTracking(null);
      setLoading(false);
      return;
    }

    setBooking(bookingData as BookingData);

    const { data: trackingData } = await supabase
      .from('tour_tracking')
      .select('*')
      .eq('booking_id', bookingData.id)
      .maybeSingle();

    setTracking((trackingData as TrackingData) || null);
    setLoading(false);
  };

  const totalDays = booking
    ? Math.max(1, Math.ceil((new Date(booking.end_date).getTime() - new Date(booking.start_date).getTime()) / 86400000))
    : 0;
  const currentDay = tracking?.current_day || 0;
  const progressPercent = totalDays > 0 ? Math.min(100, (currentDay / totalDays) * 100) : 0;

  const status = statusConfig[booking?.status || 'pending'] || statusConfig.pending;
  const StatusIcon = status.icon;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero banner */}
      <section className="relative bg-primary pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--teal-light)/0.4),transparent_70%)]" />
        </div>
        <div className="container relative z-10 text-center text-primary-foreground">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-5 py-2 mb-6">
            <Navigation className="w-4 h-4" />
            <span className="text-sm font-medium">Live Tour Tracking</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Track Your Adventure
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">
            Enter your booking reference to see real-time updates on your Sri Lanka tour.
          </p>
        </div>
      </section>

      {/* Search bar */}
      <section className="container -mt-8 relative z-20 mb-12">
        <Card className="max-w-2xl mx-auto shadow-xl border-border/50">
          <CardContent className="p-6">
            <form
              onSubmit={(e) => { e.preventDefault(); lookupBooking(); }}
              className="flex gap-3"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Enter booking reference (e.g. AO-2025-001)"
                  value={refInput}
                  onChange={(e) => setRefInput(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>
              <Button type="submit" size="lg" disabled={loading || !refInput.trim()} className="h-12 px-6">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Track'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      <main className="container pb-20">
        {/* Error state */}
        {error && searched && (
          <Card className="max-w-2xl mx-auto border-destructive/30 bg-destructive/5">
            <CardContent className="flex items-center gap-4 py-6">
              <AlertCircle className="w-6 h-6 text-destructive shrink-0" />
              <div>
                <p className="font-semibold text-foreground">{error}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Need help? <a href="https://wa.me/94771234567" className="text-primary underline">Contact us on WhatsApp</a>
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty state */}
        {!booking && !error && searched && !loading && (
          <p className="text-center text-muted-foreground">No results. Try a different reference.</p>
        )}

        {/* Booking found */}
        {booking && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">

            {/* Status overview */}
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-accent/5 p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Booking Reference</p>
                    <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
                      {booking.booking_reference}
                    </h2>
                  </div>
                  <Badge className={`${status.color} text-sm px-4 py-2 gap-1.5`}>
                    <StatusIcon className="w-4 h-4" />
                    {status.label}
                  </Badge>
                </div>

                {/* Progress bar for active tours */}
                {(booking.status === 'in_progress' || booking.status === 'confirmed') && totalDays > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Day {currentDay} of {totalDays}
                      </span>
                      <span className="font-semibold text-primary">
                        {Math.round(progressPercent)}% complete
                      </span>
                    </div>
                    <Progress value={progressPercent} className="h-3" />
                  </div>
                )}
              </div>

              {/* Key info grid */}
              <CardContent className="p-6 lg:p-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  <InfoItem icon={Calendar} label="Start Date" value={new Date(booking.start_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} />
                  <InfoItem icon={Calendar} label="End Date" value={new Date(booking.end_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} />
                  <InfoItem icon={Users} label="Passengers" value={String(booking.num_passengers)} />
                  <InfoItem icon={Car} label="Vehicle" value={booking.vehicle_type || 'Not assigned'} />
                </div>
              </CardContent>
            </Card>

            {/* Live location card (only for in_progress) */}
            {booking.status === 'in_progress' && tracking && (
              <Card className="border-accent/30 shadow-lg">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-accent" />
                    </span>
                    <CardTitle className="text-lg">Live Location</CardTitle>
                  </div>
                  <CardDescription>
                    Last updated: {tracking.last_location_update
                      ? new Date(tracking.last_location_update).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })
                      : 'Awaiting update'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-xl font-display font-bold text-foreground">
                        {tracking.current_location_name || 'Location updating…'}
                      </p>
                      {tracking.current_location_lat && tracking.current_location_lng && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {tracking.current_location_lat.toFixed(4)}°N, {tracking.current_location_lng.toFixed(4)}°E
                        </p>
                      )}
                      {tracking.notes && (
                        <p className="text-sm text-muted-foreground mt-2 bg-muted/50 rounded-lg px-3 py-2">
                          📝 {tracking.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Day-by-day itinerary / destinations timeline */}
            {booking.destinations && booking.destinations.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Itinerary</CardTitle>
                  <CardDescription>Day-by-day destination plan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative pl-8">
                    {/* Vertical line */}
                    <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-border" />

                    <div className="space-y-6">
                      {booking.destinations.map((dest, i) => {
                        const isCurrentDay = currentDay === i + 1 && booking.status === 'in_progress';
                        const isPast = currentDay > i + 1 || booking.status === 'completed';
                        const Icon = destinationIcons[i % destinationIcons.length];

                        return (
                          <div key={i} className="relative flex items-start gap-4">
                            {/* Timeline dot */}
                            <div className={`absolute -left-8 top-1 w-[30px] h-[30px] rounded-full flex items-center justify-center border-2 transition-all ${
                              isCurrentDay
                                ? 'bg-accent border-accent text-accent-foreground shadow-lg shadow-accent/30 scale-110'
                                : isPast
                                  ? 'bg-primary border-primary text-primary-foreground'
                                  : 'bg-background border-border text-muted-foreground'
                            }`}>
                              {isPast ? (
                                <CheckCircle2 className="w-4 h-4" />
                              ) : isCurrentDay ? (
                                <Navigation className="w-4 h-4" />
                              ) : (
                                <Circle className="w-3 h-3" />
                              )}
                            </div>

                            <div className={`flex-1 rounded-xl p-4 transition-all ${
                              isCurrentDay
                                ? 'bg-accent/10 border border-accent/20 shadow-sm'
                                : isPast
                                  ? 'bg-primary/5 border border-primary/10'
                                  : 'bg-muted/40 border border-transparent'
                            }`}>
                              <div className="flex items-center gap-3">
                                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                                  isCurrentDay ? 'bg-accent/20' : isPast ? 'bg-primary/15' : 'bg-muted'
                                }`}>
                                  <Icon className={`w-4 h-4 ${
                                    isCurrentDay ? 'text-accent' : isPast ? 'text-primary' : 'text-muted-foreground'
                                  }`} />
                                </div>
                                <div>
                                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                    Day {i + 1}
                                    {isCurrentDay && <span className="ml-2 text-accent">● Now</span>}
                                  </p>
                                  <p className="font-display text-lg font-bold text-foreground">{dest}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Contact & extras */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Guest Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{booking.customer_name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{booking.customer_email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{booking.customer_phone}</span>
                  </div>
                </CardContent>
              </Card>

              {booking.special_requests && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Special Requests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{booking.special_requests}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}

        {/* Default state before search */}
        {!searched && !loading && (
          <div className="max-w-2xl mx-auto text-center space-y-6 mt-4">
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: Search, title: 'Enter Reference', desc: 'Use the code from your confirmation email' },
                { icon: MapPin, title: 'View Live Location', desc: 'See where your tour is right now' },
                { icon: Calendar, title: 'Track Progress', desc: 'Day-by-day itinerary timeline' },
              ].map((item) => (
                <Card key={item.title} className="text-center">
                  <CardContent className="pt-6 pb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <p className="font-semibold text-foreground text-sm">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

function InfoItem({ icon: Icon, label, value }: { icon: typeof Calendar; label: string; value: string }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
        <Icon className="w-3.5 h-3.5" />
        <span className="text-xs">{label}</span>
      </div>
      <p className="font-semibold text-foreground">{value}</p>
    </div>
  );
}
