-- Add height and gender columns to user_profiles table
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS height INTEGER;

ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS gender TEXT CHECK (gender IN ('male', 'female'));

-- Add comments for documentation
COMMENT ON COLUMN user_profiles.height IS 'User height in centimeters';
COMMENT ON COLUMN user_profiles.gender IS 'User gender for body composition calculations';