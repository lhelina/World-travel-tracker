-- Create database if not exists (optional)
-- CREATE DATABASE world;

-- Create countries table
CREATE TABLE IF NOT EXISTS countries (
    country_code CHAR(2) PRIMARY KEY,
    country_name VARCHAR(100) NOT NULL
);

-- Insert some sample countries
INSERT INTO countries (country_code, country_name) VALUES
('ET', 'Ethiopia'),
('IT', 'Italy'),
('US', 'United States');

-- Create visited_countries table
CREATE TABLE IF NOT EXISTS visited_countries (
    id SERIAL PRIMARY KEY,
    country_code CHAR(2) REFERENCES countries(country_code) UNIQUE
);
