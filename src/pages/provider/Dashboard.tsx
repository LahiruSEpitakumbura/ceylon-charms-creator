import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useProviderRole } from '@/hooks/useProviderRole';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, User, Calendar, MapPin, Building2, Car, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Logo } from '@/components/Logo';

const statusConfig = {
  pending: { label: 'Pending Approval', icon: Clock, color: 'bg-yellow-100 text-yellow-800' },
  approved: { label: 'Approved', icon: CheckCircle, color: 'bg-green-100 text-green-800' },
  rejected: { label: 'Rejected', icon: XCircle, color: 'bg-red-100 text-red-800' },
};

const roleConfig = {
  guide: { title: 'Tour Guide', icon: MapPin, color: 'text-green-600' },
  hotel: { title: 'Hotel Partner', icon: Building2, color: 'text-blue-600' },
  driver: { title: 'Driver', icon: Car, color: 'text-orange-600' },
};

export default function ProviderDashboard() {
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  const { role, profile, loading: profileLoading } = useProviderRole();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth/provider?type=guide');
    }
  }, [user, authLoading, navigate]);

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (!role || !profile) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-background/95 backdrop-blur-sm sticky top-0 z-50">
          <div className="container flex items-center justify-between h-16">
            <Link to="/">
              <Logo size="sm" />
            </Link>
            <Button variant="outline" onClick={() => signOut()}>Sign Out</Button>
          </div>
        </header>
        <main className="container py-12">
          <Card className="max-w-md mx-auto text-center">
            <CardHeader>
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <CardTitle>No Provider Profile Found</CardTitle>
              <CardDescription>
                You haven't registered as a service provider yet.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Register as a guide, hotel partner, or driver to access the provider dashboard.
              </p>
              <div className="flex flex-col gap-2">
                <Button asChild>
                  <Link to="/register">Register as Provider</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/">Go to Homepage</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const RoleIcon = roleConfig[role].icon;
  const StatusIcon = statusConfig[profile.status].icon;

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <Link to="/">
            <Logo size="sm" />
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">{user.email}</span>
            <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
          </div>
        </div>
      </header>

      <main className="container py-8 lg:py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <RoleIcon className={`h-6 w-6 ${roleConfig[role].color}`} />
                <h1 className="text-2xl lg:text-3xl font-bold">{roleConfig[role].title} Dashboard</h1>
              </div>
              <p className="text-muted-foreground">Manage your profile and view your bookings</p>
            </div>
            <Badge className={statusConfig[profile.status].color}>
              <StatusIcon className="h-3 w-3 mr-1" />
              {statusConfig[profile.status].label}
            </Badge>
          </div>

          {/* Status Notice */}
          {profile.status === 'pending' && (
            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="flex items-start gap-4 py-4">
                <Clock className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-yellow-800">Your profile is pending approval</p>
                  <p className="text-sm text-yellow-700">Our team is reviewing your registration. You'll be notified once approved.</p>
                </div>
              </CardContent>
            </Card>
          )}

          {profile.status === 'rejected' && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="flex items-start gap-4 py-4">
                <XCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-red-800">Your profile was not approved</p>
                  <p className="text-sm text-red-700">Please contact support for more information.</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/provider/profile')}>
              <CardContent className="flex items-center gap-4 py-6">
                <div className="p-3 rounded-lg bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">My Profile</p>
                  <p className="text-sm text-muted-foreground">View & edit your profile</p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/provider/bookings')}>
              <CardContent className="flex items-center gap-4 py-6">
                <div className="p-3 rounded-lg bg-blue-100">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold">My Bookings</p>
                  <p className="text-sm text-muted-foreground">View assigned tours</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Summary</CardTitle>
              <CardDescription>Your current profile information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{profile.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{profile.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{profile.phone}</p>
                </div>
                {role === 'guide' && (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground">Languages</p>
                      <p className="font-medium">{profile.languages?.join(', ') || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Experience</p>
                      <p className="font-medium">{profile.experience_years} years</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Price per Day</p>
                      <p className="font-medium">${profile.price_per_day}</p>
                    </div>
                  </>
                )}
                {role === 'hotel' && (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground">City</p>
                      <p className="font-medium">{profile.city}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Star Rating</p>
                      <p className="font-medium">{profile.star_rating} Stars</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Price Range</p>
                      <p className="font-medium">${profile.price_range_min} - ${profile.price_range_max}</p>
                    </div>
                  </>
                )}
                {role === 'driver' && (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground">Vehicle Type</p>
                      <p className="font-medium">{profile.vehicle_type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Max Passengers</p>
                      <p className="font-medium">{profile.max_passengers}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Price per Day</p>
                      <p className="font-medium">${profile.price_per_day}</p>
                    </div>
                  </>
                )}
              </div>
              <div className="mt-6">
                <Button asChild>
                  <Link to="/provider/profile">Edit Profile</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
