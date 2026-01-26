import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { useProviderRole } from '@/hooks/useProviderRole';
import { toast } from 'sonner';
import { ArrowLeft, MapPin, Building2, Car, Loader2 } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { z } from 'zod';

const authSchema = z.object({
  email: z.string().trim().email('Please enter a valid email address').max(255, 'Email is too long'),
  password: z.string().min(6, 'Password must be at least 6 characters').max(72, 'Password is too long'),
});

type ProviderType = 'guide' | 'hotel' | 'driver';

const providerConfig: Record<ProviderType, { title: string; description: string; icon: React.ReactNode; color: string }> = {
  guide: {
    title: 'Tour Guide Portal',
    description: 'Register or login to manage your guide profile',
    icon: <MapPin className="h-8 w-8 text-green-600" />,
    color: 'bg-green-100',
  },
  hotel: {
    title: 'Hotel Partner Portal',
    description: 'Register or login to manage your hotel listing',
    icon: <Building2 className="h-8 w-8 text-blue-600" />,
    color: 'bg-blue-100',
  },
  driver: {
    title: 'Driver Portal',
    description: 'Register or login to manage your driver profile',
    icon: <Car className="h-8 w-8 text-orange-600" />,
    color: 'bg-orange-100',
  },
};

export default function ProviderAuth() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const providerType = (searchParams.get('type') as ProviderType) || 'guide';
  const { user, loading: authLoading, signUp, signIn } = useAuth();
  const { role, profile, loading: profileLoading } = useProviderRole();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string }>({});

  const config = providerConfig[providerType] || providerConfig.guide;

  useEffect(() => {
    if (!authLoading && !profileLoading && user) {
      // If user has a profile, redirect to provider dashboard
      if (profile && role) {
        navigate('/provider');
      } else {
        // Otherwise redirect to profile creation
        navigate(`/register/${providerType}`);
      }
    }
  }, [user, authLoading, profileLoading, profile, role, navigate, providerType]);

  const validateForm = () => {
    try {
      authSchema.parse({ email: formData.email, password: formData.password });
      if (activeTab === 'signup' && formData.password !== formData.confirmPassword) {
        setErrors({ confirmPassword: 'Passwords do not match' });
        return false;
      }
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { email?: string; password?: string } = {};
        error.errors.forEach((err) => {
          if (err.path[0] === 'email') fieldErrors.email = err.message;
          if (err.path[0] === 'password') fieldErrors.password = err.message;
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (activeTab === 'signup') {
        const { error } = await signUp(formData.email, formData.password);
        if (error) {
          if (error.message.includes('already registered')) {
            toast.error('This email is already registered. Please login instead.');
            setActiveTab('login');
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success('Account created! Redirecting to profile setup...');
        }
      } else {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          if (error.message.includes('Invalid login')) {
            toast.error('Invalid email or password. Please try again.');
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success('Welcome back!');
        }
      }
    } catch (error: any) {
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <Link to="/">
            <Logo className="h-10" />
          </Link>
          <Link to="/register" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </div>
      </header>

      <main className="container py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className={`mx-auto w-16 h-16 ${config.color} rounded-full flex items-center justify-center mb-4`}>
                {config.icon}
              </div>
              <CardTitle className="text-2xl">{config.title}</CardTitle>
              <CardDescription>{config.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'login' | 'signup')}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="your@email.com"
                      required
                      autoComplete="email"
                    />
                    {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="••••••••"
                      required
                      autoComplete={activeTab === 'signup' ? 'new-password' : 'current-password'}
                    />
                    {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                  </div>

                  <TabsContent value="signup" className="mt-0 space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      placeholder="••••••••"
                      autoComplete="new-password"
                    />
                    {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
                  </TabsContent>

                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {activeTab === 'signup' ? 'Creating Account...' : 'Signing In...'}
                      </>
                    ) : (
                      activeTab === 'signup' ? 'Create Account' : 'Sign In'
                    )}
                  </Button>
                </form>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 text-center text-sm text-muted-foreground">
              <p>
                {activeTab === 'login' ? (
                  <>Don't have an account? <button type="button" className="text-primary hover:underline" onClick={() => setActiveTab('signup')}>Sign up</button></>
                ) : (
                  <>Already have an account? <button type="button" className="text-primary hover:underline" onClick={() => setActiveTab('login')}>Login</button></>
                )}
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
