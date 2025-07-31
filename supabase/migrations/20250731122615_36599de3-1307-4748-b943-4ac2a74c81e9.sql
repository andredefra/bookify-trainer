-- Create storage bucket for user media
INSERT INTO storage.buckets (id, name, public) 
VALUES ('user-media', 'user-media', true);

-- Create policies for user media bucket
CREATE POLICY "Users can upload their own media files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'user-media');

CREATE POLICY "Users can view their own media files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'user-media');

CREATE POLICY "Users can update their own media files" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'user-media');

CREATE POLICY "Users can delete their own media files" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'user-media');