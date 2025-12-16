-- ============================================
-- Database Schema untuk AquaBiodiversa (PostgreSQL)
-- ============================================
-- Database ini kompatibel dengan Supabase (PostgreSQL gratis)
-- Jalankan script ini di Supabase SQL Editor atau psql

-- ============================================
-- Tabel Users
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trigger untuk update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Tabel Biota (Ikan Air)
-- ============================================
CREATE TABLE IF NOT EXISTS biota (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    location VARCHAR(100) NOT NULL,
    category VARCHAR(100) DEFAULT 'Ikan Air Tawar',
    description TEXT,
    image VARCHAR(500),
    photographer VARCHAR(100),
    user_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TRIGGER update_biota_updated_at BEFORE UPDATE ON biota
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Insert Data Demo Users
-- ============================================
-- Password di-hash dengan bcrypt: demo123, kurniawan123, telecomadmin
-- Hash di-generate dengan: node generate-password-hash.js
INSERT INTO users (username, email, password, full_name, is_admin) VALUES
('demo', 'demo@aquabiodiversa.com', '$2a$10$KfNfxEyZemZPmvnBTN9R1etmfg8lwgpcMgr/qMQDCOJbZSIrrETnO', 'Demo User', FALSE),
('kurniawan', 'kurniawan@aquabiodiversa.com', '$2a$10$VCncGrnFfjF5obOFGZNBEOd51FgNF.2TWgr/gVCDwv2/bbAiC31ZW', 'Kurniawan', FALSE),
('Adminaquabio77', 'admin@aquabiodiversa.com', '$2a$10$tAcTXg/iFDYM6VGyG8HvDubE.5S9YF9C7Gujob1Nbdm9d9LqF4IpG', 'Admin AquaBiodiversa', TRUE)
ON CONFLICT (username) DO NOTHING;

-- Catatan: 
-- Password yang benar:
-- demo / demo123
-- kurniawan / kurniawan123
-- Adminaquabio77 / telecomadmin
