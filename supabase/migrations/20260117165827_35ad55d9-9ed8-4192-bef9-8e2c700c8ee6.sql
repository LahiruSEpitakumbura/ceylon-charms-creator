-- Create app_role enum for service providers
CREATE TYPE public.app_role AS ENUM ('admin', 'guide', 'hotel', 'driver');

-- Create user_roles table for role management
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policy for user_roles - users can view their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

-- Add user_id column to provider profiles
ALTER TABLE public.guide_profiles ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;
ALTER TABLE public.hotel_profiles ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;
ALTER TABLE public.driver_profiles ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- Create unique constraints for one profile per user
CREATE UNIQUE INDEX idx_guide_profiles_user_id ON public.guide_profiles(user_id) WHERE user_id IS NOT NULL;
CREATE UNIQUE INDEX idx_hotel_profiles_user_id ON public.hotel_profiles(user_id) WHERE user_id IS NOT NULL;
CREATE UNIQUE INDEX idx_driver_profiles_user_id ON public.driver_profiles(user_id) WHERE user_id IS NOT NULL;

-- Update RLS policies for guide_profiles
DROP POLICY IF EXISTS "Anyone can view approved guides" ON public.guide_profiles;
DROP POLICY IF EXISTS "Anyone can submit guide profile" ON public.guide_profiles;

CREATE POLICY "Anyone can view approved guides" ON public.guide_profiles
FOR SELECT USING (status = 'approved' OR auth.uid() = user_id);

CREATE POLICY "Authenticated users can create guide profile" ON public.guide_profiles
FOR INSERT WITH CHECK (auth.uid() = user_id AND status = 'pending');

CREATE POLICY "Users can update their own guide profile" ON public.guide_profiles
FOR UPDATE USING (auth.uid() = user_id);

-- Update RLS policies for hotel_profiles
DROP POLICY IF EXISTS "Anyone can view approved hotels" ON public.hotel_profiles;
DROP POLICY IF EXISTS "Anyone can submit hotel profile" ON public.hotel_profiles;

CREATE POLICY "Anyone can view approved hotels" ON public.hotel_profiles
FOR SELECT USING (status = 'approved' OR auth.uid() = user_id);

CREATE POLICY "Authenticated users can create hotel profile" ON public.hotel_profiles
FOR INSERT WITH CHECK (auth.uid() = user_id AND status = 'pending');

CREATE POLICY "Users can update their own hotel profile" ON public.hotel_profiles
FOR UPDATE USING (auth.uid() = user_id);

-- Update RLS policies for driver_profiles
DROP POLICY IF EXISTS "Anyone can view approved drivers" ON public.driver_profiles;
DROP POLICY IF EXISTS "Anyone can submit driver profile" ON public.driver_profiles;

CREATE POLICY "Anyone can view approved drivers" ON public.driver_profiles
FOR SELECT USING (status = 'approved' OR auth.uid() = user_id);

CREATE POLICY "Authenticated users can create driver profile" ON public.driver_profiles
FOR INSERT WITH CHECK (auth.uid() = user_id AND status = 'pending');

CREATE POLICY "Users can update their own driver profile" ON public.driver_profiles
FOR UPDATE USING (auth.uid() = user_id);

-- Function to automatically add role when profile is created
CREATE OR REPLACE FUNCTION public.add_provider_role()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_TABLE_NAME = 'guide_profiles' AND NEW.user_id IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.user_id, 'guide')
    ON CONFLICT (user_id, role) DO NOTHING;
  ELSIF TG_TABLE_NAME = 'hotel_profiles' AND NEW.user_id IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.user_id, 'hotel')
    ON CONFLICT (user_id, role) DO NOTHING;
  ELSIF TG_TABLE_NAME = 'driver_profiles' AND NEW.user_id IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.user_id, 'driver')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create triggers to add roles automatically
CREATE TRIGGER add_guide_role_trigger
AFTER INSERT ON public.guide_profiles
FOR EACH ROW EXECUTE FUNCTION public.add_provider_role();

CREATE TRIGGER add_hotel_role_trigger
AFTER INSERT ON public.hotel_profiles
FOR EACH ROW EXECUTE FUNCTION public.add_provider_role();

CREATE TRIGGER add_driver_role_trigger
AFTER INSERT ON public.driver_profiles
FOR EACH ROW EXECUTE FUNCTION public.add_provider_role();