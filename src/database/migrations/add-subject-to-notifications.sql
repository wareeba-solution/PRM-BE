-- Add subject column to notifications table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'notifications' AND column_name = 'subject'
  ) THEN
    ALTER TABLE notifications ADD COLUMN "subject" VARCHAR(255);
  END IF;
END$$;
