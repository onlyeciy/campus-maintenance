-- Migration: seed_users
-- Created: 2026-07-02

INSERT INTO users (name, email, password_hash, role, created_at)
VALUES
  ('Budi Santoso (Pelapor)', 'reporter@kampus.ac.id', '$2b$08$LCapdT1t2NYedCgjjadhzOgY2M/CqBisxMC2Ww1.lX/WgAbFxXvJq', 'reporter', '2026-07-02T00:00:00Z'),
  ('Admin Sisfo (Administrator)', 'admin@kampus.ac.id', '$2b$08$LCapdT1t2NYedCgjjadhzOgY2M/CqBisxMC2Ww1.lX/WgAbFxXvJq', 'admin', '2026-07-02T00:00:00Z'),
  ('Roni Wijaya (Teknisi)', 'technician@kampus.ac.id', '$2b$08$LCapdT1t2NYedCgjjadhzOgY2M/CqBisxMC2Ww1.lX/WgAbFxXvJq', 'technician', '2026-07-02T00:00:00Z'),
  ('Hendra Kusuma (Manajer)', 'manager@kampus.ac.id', '$2b$08$LCapdT1t2NYedCgjjadhzOgY2M/CqBisxMC2Ww1.lX/WgAbFxXvJq', 'manager', '2026-07-02T00:00:00Z');
