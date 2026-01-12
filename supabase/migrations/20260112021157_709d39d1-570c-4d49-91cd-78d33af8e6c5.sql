-- Create service provider status enum
CREATE TYPE public.provider_status AS ENUM ('pending', 'approved', 'rejected');

-- Create booking status enum
CREATE TYPE public.booking_status AS ENUM ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled');

-- Create customer profiles table
CREATE TABLE public.customer_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  country TEXT,
  preferred_language TEXT DEFAULT 'English',
  travel_preferences TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create guide profiles table
CREATE TABLE public.guide_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  languages TEXT[] NOT NULL DEFAULT '{}',
  experience_years INTEGER NOT NULL DEFAULT 0,
  specializations TEXT[] DEFAULT '{}',
  bio TEXT,
  photo_url TEXT,
  license_number TEXT,
  price_per_day NUMERIC(10,2) NOT NULL DEFAULT 0,
  status provider_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create hotel profiles table
CREATE TABLE public.hotel_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  star_rating INTEGER NOT NULL DEFAULT 3 CHECK (star_rating >= 1 AND star_rating <= 5),
  description TEXT,
  amenities TEXT[] DEFAULT '{}',
  room_types TEXT[] DEFAULT '{}',
  price_range_min NUMERIC(10,2) NOT NULL DEFAULT 0,
  price_range_max NUMERIC(10,2) NOT NULL DEFAULT 0,
  photo_urls TEXT[] DEFAULT '{}',
  website TEXT,
  status provider_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create driver profiles table
CREATE TABLE public.driver_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  license_number TEXT NOT NULL,
  license_expiry DATE,
  vehicle_type TEXT NOT NULL,
  vehicle_model TEXT,
  vehicle_year INTEGER,
  vehicle_plate TEXT,
  max_passengers INTEGER NOT NULL DEFAULT 4,
  languages TEXT[] DEFAULT '{}',
  experience_years INTEGER NOT NULL DEFAULT 0,
  price_per_day NUMERIC(10,2) NOT NULL DEFAULT 0,
  photo_url TEXT,
  vehicle_photo_url TEXT,
  status provider_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bookings table
CREATE TABLE public.tour_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_reference TEXT NOT NULL UNIQUE,
  customer_id UUID REFERENCES public.customer_profiles(id),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  num_passengers INTEGER NOT NULL DEFAULT 1,
  destinations TEXT[] DEFAULT '{}',
  vehicle_type TEXT,
  driver_id UUID REFERENCES public.driver_profiles(id),
  guide_id UUID REFERENCES public.guide_profiles(id),
  total_amount NUMERIC(10,2) NOT NULL DEFAULT 0,
  payment_status TEXT DEFAULT 'pending',
  special_requests TEXT,
  status booking_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tour tracking table
CREATE TABLE public.tour_tracking (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID NOT NULL REFERENCES public.tour_bookings(id) ON DELETE CASCADE,
  current_location_lat NUMERIC(10,8),
  current_location_lng NUMERIC(11,8),
  current_location_name TEXT,
  last_location_update TIMESTAMP WITH TIME ZONE,
  current_day INTEGER DEFAULT 1,
  status TEXT DEFAULT 'not_started',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create payment info table
CREATE TABLE public.payment_info (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID NOT NULL REFERENCES public.tour_bookings(id) ON DELETE CASCADE,
  payment_method TEXT NOT NULL,
  bank_name TEXT,
  account_name TEXT,
  account_number TEXT,
  instructions TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.customer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guide_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hotel_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.driver_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tour_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tour_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_info ENABLE ROW LEVEL SECURITY;

-- RLS Policies for customer_profiles
CREATE POLICY "Anyone can create customer profile" ON public.customer_profiles
FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view customer profiles" ON public.customer_profiles
FOR SELECT USING (true);

-- RLS Policies for guide_profiles
CREATE POLICY "Anyone can view approved guides" ON public.guide_profiles
FOR SELECT USING (status = 'approved');

CREATE POLICY "Anyone can submit guide profile" ON public.guide_profiles
FOR INSERT WITH CHECK (status = 'pending');

-- RLS Policies for hotel_profiles
CREATE POLICY "Anyone can view approved hotels" ON public.hotel_profiles
FOR SELECT USING (status = 'approved');

CREATE POLICY "Anyone can submit hotel profile" ON public.hotel_profiles
FOR INSERT WITH CHECK (status = 'pending');

-- RLS Policies for driver_profiles
CREATE POLICY "Anyone can view approved drivers" ON public.driver_profiles
FOR SELECT USING (status = 'approved');

CREATE POLICY "Anyone can submit driver profile" ON public.driver_profiles
FOR INSERT WITH CHECK (status = 'pending');

-- RLS Policies for tour_bookings
CREATE POLICY "Anyone can create bookings" ON public.tour_bookings
FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view bookings" ON public.tour_bookings
FOR SELECT USING (true);

-- RLS Policies for tour_tracking
CREATE POLICY "Anyone can view tour tracking" ON public.tour_tracking
FOR SELECT USING (true);

CREATE POLICY "Anyone can update tour tracking" ON public.tour_tracking
FOR UPDATE USING (true);

CREATE POLICY "Anyone can insert tour tracking" ON public.tour_tracking
FOR INSERT WITH CHECK (true);

-- RLS Policies for payment_info
CREATE POLICY "Anyone can view payment info" ON public.payment_info
FOR SELECT USING (true);

-- Enable realtime for tracking
ALTER PUBLICATION supabase_realtime ADD TABLE public.tour_tracking;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add triggers
CREATE TRIGGER update_customer_profiles_updated_at
BEFORE UPDATE ON public.customer_profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_guide_profiles_updated_at
BEFORE UPDATE ON public.guide_profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_hotel_profiles_updated_at
BEFORE UPDATE ON public.hotel_profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_driver_profiles_updated_at
BEFORE UPDATE ON public.driver_profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tour_bookings_updated_at
BEFORE UPDATE ON public.tour_bookings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tour_tracking_updated_at
BEFORE UPDATE ON public.tour_tracking
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();