import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export type ProviderRole = 'guide' | 'hotel' | 'driver' | null;

interface ProviderProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'pending' | 'approved' | 'rejected';
  [key: string]: any;
}

interface UseProviderRoleReturn {
  role: ProviderRole;
  profile: ProviderProfile | null;
  loading: boolean;
  refetchProfile: () => Promise<void>;
}

export function useProviderRole(): UseProviderRoleReturn {
  const { user, loading: authLoading } = useAuth();
  const [role, setRole] = useState<ProviderRole>(null);
  const [profile, setProfile] = useState<ProviderProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    if (!user) {
      setRole(null);
      setProfile(null);
      setLoading(false);
      return;
    }

    try {
      // Check for guide role
      const { data: guideData } = await supabase
        .from('guide_profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (guideData) {
        setRole('guide');
        setProfile(guideData);
        setLoading(false);
        return;
      }

      // Check for hotel role
      const { data: hotelData } = await supabase
        .from('hotel_profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (hotelData) {
        setRole('hotel');
        setProfile(hotelData);
        setLoading(false);
        return;
      }

      // Check for driver role
      const { data: driverData } = await supabase
        .from('driver_profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (driverData) {
        setRole('driver');
        setProfile(driverData);
        setLoading(false);
        return;
      }

      // No provider profile found
      setRole(null);
      setProfile(null);
    } catch (err) {
      console.error('Error fetching provider profile:', err);
      setRole(null);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      fetchProfile();
    }
  }, [user, authLoading]);

  return { role, profile, loading: authLoading || loading, refetchProfile: fetchProfile };
}
