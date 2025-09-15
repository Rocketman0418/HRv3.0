/*
  # Add RLS policy for user profile creation

  1. Security
    - Add policy to allow authenticated users to insert their own profile data
    - Ensures users can only create profiles for themselves (auth.uid() = id)
    - Fixes "new row violates row-level security policy" error during signup

  This policy is essential for the signup process to work properly, as it allows
  the application to create user profiles in the public.users table when new
  users register.
*/

-- Add policy to allow authenticated users to insert their own profile
CREATE POLICY "Users can insert own profile"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);