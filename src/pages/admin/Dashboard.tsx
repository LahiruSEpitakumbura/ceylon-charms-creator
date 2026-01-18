import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Car, Compass, Hotel, MapPin, Truck, CalendarCheck, Users, TrendingUp } from 'lucide-react';

interface Stats {
  drivers: number;
  guides: number;
  hotels: number;
  destinations: number;
  vehicles: number;
  bookings: number;
  pendingDrivers: number;
  pendingGuides: number;
  pendingHotels: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    drivers: 0,
    guides: 0,
    hotels: 0,
    destinations: 0,
    vehicles: 0,
    bookings: 0,
    pendingDrivers: 0,
    pendingGuides: 0,
    pendingHotels: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [
          driversRes,
          guidesRes,
          hotelsRes,
          destinationsRes,
          vehiclesRes,
          bookingsRes,
          pendingDriversRes,
          pendingGuidesRes,
          pendingHotelsRes
        ] = await Promise.all([
          supabase.from('driver_profiles').select('id', { count: 'exact', head: true }),
          supabase.from('guide_profiles').select('id', { count: 'exact', head: true }),
          supabase.from('hotel_profiles').select('id', { count: 'exact', head: true }),
          supabase.from('destinations').select('id', { count: 'exact', head: true }),
          supabase.from('vehicles').select('id', { count: 'exact', head: true }),
          supabase.from('tour_bookings').select('id', { count: 'exact', head: true }),
          supabase.from('driver_profiles').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
          supabase.from('guide_profiles').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
          supabase.from('hotel_profiles').select('id', { count: 'exact', head: true }).eq('status', 'pending')
        ]);

        setStats({
          drivers: driversRes.count || 0,
          guides: guidesRes.count || 0,
          hotels: hotelsRes.count || 0,
          destinations: destinationsRes.count || 0,
          vehicles: vehiclesRes.count || 0,
          bookings: bookingsRes.count || 0,
          pendingDrivers: pendingDriversRes.count || 0,
          pendingGuides: pendingGuidesRes.count || 0,
          pendingHotels: pendingHotelsRes.count || 0
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Drivers', value: stats.drivers, icon: Car, color: 'text-blue-500', pending: stats.pendingDrivers },
    { label: 'Total Guides', value: stats.guides, icon: Compass, color: 'text-green-500', pending: stats.pendingGuides },
    { label: 'Total Hotels', value: stats.hotels, icon: Hotel, color: 'text-purple-500', pending: stats.pendingHotels },
    { label: 'Destinations', value: stats.destinations, icon: MapPin, color: 'text-orange-500' },
    { label: 'Vehicles', value: stats.vehicles, icon: Truck, color: 'text-cyan-500' },
    { label: 'Bookings', value: stats.bookings, icon: CalendarCheck, color: 'text-pink-500' },
  ];

  const totalPending = stats.pendingDrivers + stats.pendingGuides + stats.pendingHotels;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to AO Travels Admin Dashboard</p>
      </div>

      {/* Alert for pending approvals */}
      {totalPending > 0 && (
        <Card className="border-accent bg-accent/10">
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-accent" />
              <span className="font-medium">
                {totalPending} pending registration{totalPending > 1 ? 's' : ''} awaiting approval
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat) => (
          <Card key={stat.label} className="card-premium">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? '...' : stat.value}
              </div>
              {stat.pending !== undefined && stat.pending > 0 && (
                <p className="text-xs text-accent mt-1">
                  {stat.pending} pending approval
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Activity feed coming soon...
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Drivers</span>
              <span className="bg-secondary px-2 py-1 rounded text-sm font-medium">
                {stats.pendingDrivers}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Guides</span>
              <span className="bg-secondary px-2 py-1 rounded text-sm font-medium">
                {stats.pendingGuides}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Hotels</span>
              <span className="bg-secondary px-2 py-1 rounded text-sm font-medium">
                {stats.pendingHotels}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
