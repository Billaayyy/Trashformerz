-- Create events table for Join Us section
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  time TEXT NOT NULL,
  image_url TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  is_locked BOOLEAN DEFAULT false,
  unlock_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Public can view all events
CREATE POLICY "Anyone can view events"
ON public.events
FOR SELECT
USING (true);

-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
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
LANGUAGE SQL
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

-- Admins can manage events
CREATE POLICY "Admins can insert events"
ON public.events
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update events"
ON public.events
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete events"
ON public.events
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to events table
CREATE TRIGGER update_events_updated_at
BEFORE UPDATE ON public.events
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial events
INSERT INTO public.events (title, description, location, time, image_url, slug, is_locked, unlock_date) VALUES
('Education', 'Akses tips berkelanjutan gratis untuk mendukung gaya hidup ramah lingkungan Anda setiap hari.', 'Online', 'Forever', 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&auto=format&fit=crop', 'education', false, NULL),
('PPM Peduli Lingkungan', 'Acara spesial yang akan segera hadir. Nantikan kejutan dari kami!', 'Kampus PPM', '24 November 2025', 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop', 'ppm-peduli-lingkungan', true, '2025-11-01T00:00:00+07:00');