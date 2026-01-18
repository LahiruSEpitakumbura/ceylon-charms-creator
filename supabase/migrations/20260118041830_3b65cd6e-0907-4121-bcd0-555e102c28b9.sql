-- Create destinations table
CREATE TABLE public.destinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  main_attractions TEXT[] DEFAULT '{}',
  best_season TEXT,
  image_urls TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on destinations
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;

-- Create vehicles table
CREATE TABLE public.vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_type TEXT NOT NULL,
  luxury_category TEXT DEFAULT 'Standard',
  passenger_capacity INTEGER NOT NULL DEFAULT 4,
  luggage_capacity INTEGER NOT NULL DEFAULT 2,
  price_per_day NUMERIC NOT NULL DEFAULT 0,
  driver_id UUID REFERENCES public.driver_profiles(id) ON DELETE SET NULL,
  availability_status TEXT NOT NULL DEFAULT 'available',
  image_urls TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on vehicles
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;

-- Link hotels to destinations
ALTER TABLE public.hotel_profiles ADD COLUMN destination_id UUID REFERENCES public.destinations(id) ON DELETE SET NULL;

-- RLS Policies for destinations

-- Anyone can view destinations
CREATE POLICY "Anyone can view destinations"
ON public.destinations FOR SELECT
USING (true);

-- Admins can manage destinations
CREATE POLICY "Admins can insert destinations"
ON public.destinations FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update destinations"
ON public.destinations FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete destinations"
ON public.destinations FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for vehicles

-- Anyone can view available vehicles
CREATE POLICY "Anyone can view vehicles"
ON public.vehicles FOR SELECT
USING (true);

-- Admins can manage vehicles
CREATE POLICY "Admins can insert vehicles"
ON public.vehicles FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update vehicles"
ON public.vehicles FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete vehicles"
ON public.vehicles FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Update RLS policies for existing tables to allow admin management

-- Admins can manage drivers
CREATE POLICY "Admins can insert drivers"
ON public.driver_profiles FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update drivers"
ON public.driver_profiles FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete drivers"
ON public.driver_profiles FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can manage guides
CREATE POLICY "Admins can insert guides"
ON public.guide_profiles FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update guides"
ON public.guide_profiles FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete guides"
ON public.guide_profiles FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can manage hotels
CREATE POLICY "Admins can insert hotels"
ON public.hotel_profiles FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update hotels"
ON public.hotel_profiles FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete hotels"
ON public.hotel_profiles FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Admin policies for user_roles
CREATE POLICY "Admins can view all roles"
ON public.user_roles FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can assign roles"
ON public.user_roles FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can remove roles"
ON public.user_roles FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can manage bookings
CREATE POLICY "Admins can update bookings"
ON public.tour_bookings FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete bookings"
ON public.tour_bookings FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Add triggers for updated_at on new tables
CREATE TRIGGER update_destinations_updated_at
BEFORE UPDATE ON public.destinations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_vehicles_updated_at
BEFORE UPDATE ON public.vehicles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();