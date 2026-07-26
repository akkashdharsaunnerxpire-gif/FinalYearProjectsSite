/*
  # Final Year Project Marketplace Schema

  ## Overview
  This migration creates the database schema for a project marketplace platform where users can browse and purchase final year projects.

  ## New Tables
  
  ### categories
  - `id` (uuid, primary key) - Unique identifier for each category
  - `name` (text, unique) - Category name (e.g., "AI Projects", "Web Development")
  - `description` (text) - Brief description of the category
  - `icon` (text) - Icon identifier for the category
  - `created_at` (timestamptz) - Timestamp when category was created
  
  ### projects
  - `id` (uuid, primary key) - Unique identifier for each project
  - `title` (text) - Project title
  - `short_description` (text) - Brief description for cards
  - `full_description` (text) - Detailed project description
  - `category_id` (uuid, foreign key) - Reference to categories table
  - `tech_stack` (jsonb) - Array of technologies used (stored as JSON)
  - `features` (jsonb) - Array of project features (stored as JSON)
  - `price` (numeric) - Project price in INR
  - `download_links` (jsonb) - Object containing PPT, Report, Source Code, Paper links
  - `image_url` (text) - Project thumbnail image URL
  - `created_at` (timestamptz) - Timestamp when project was created
  - `updated_at` (timestamptz) - Timestamp when project was last updated
  
  ## Security
  - Enable RLS on all tables
  - Allow public read access to categories and projects (marketplace is public)
  - Future: Can add policies for authenticated users to manage projects
  
  ## Notes
  - Using JSONB for flexible arrays and objects (tech_stack, features, download_links)
  - Prices stored as numeric for precise financial calculations
  - All timestamps use timestamptz for timezone awareness
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  short_description text NOT NULL,
  full_description text NOT NULL,
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  tech_stack jsonb DEFAULT '[]'::jsonb,
  features jsonb DEFAULT '[]'::jsonb,
  price numeric(10, 2) NOT NULL DEFAULT 0,
  download_links jsonb DEFAULT '{}'::jsonb,
  image_url text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (marketplace is publicly viewable)
CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can view projects"
  ON projects FOR SELECT
  TO anon
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS projects_category_id_idx ON projects(category_id);
CREATE INDEX IF NOT EXISTS projects_created_at_idx ON projects(created_at DESC);