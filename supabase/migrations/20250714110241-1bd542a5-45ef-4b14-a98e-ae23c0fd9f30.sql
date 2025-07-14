-- Insert missing client profiles for gym transactions
INSERT INTO public.profiles (id, email, full_name, user_type, created_at, updated_at)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'marco.rossi@email.com', 'Marco Rossi', 'client', now(), now()),
  ('22222222-2222-2222-2222-222222222222', 'giulia.bianchi@email.com', 'Giulia Bianchi', 'client', now(), now()),
  ('33333333-3333-3333-3333-333333333333', 'andrea.verdi@email.com', 'Andrea Verdi', 'client', now(), now()),
  ('44444444-4444-4444-4444-444444444444', 'sara.ferrari@email.com', 'Sara Ferrari', 'client', now(), now())
ON CONFLICT (id) DO NOTHING;