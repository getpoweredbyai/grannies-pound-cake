-- ============================================================================
-- PNK Trading Database Schema for Supabase
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- Chat Messages Table
-- ============================================================================
CREATE TABLE IF NOT EXISTS chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    message TEXT NOT NULL,
    user_email TEXT,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    user_agent TEXT,
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_chat_messages_timestamp ON chat_messages(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_chat_messages_email ON chat_messages(user_email);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at DESC);

-- ============================================================================
-- Newsletter Subscribers Table
-- ============================================================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    subscribed_at TIMESTAMPTZ DEFAULT NOW(),
    unsubscribed_at TIMESTAMPTZ NULL,
    ip_address TEXT,
    user_agent TEXT,
    source TEXT DEFAULT 'website_newsletter',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_active ON newsletter_subscribers(is_active);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribed_at ON newsletter_subscribers(subscribed_at DESC);

-- ============================================================================
-- Contact Form Submissions Table
-- ============================================================================
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    phone TEXT,
    message TEXT NOT NULL,
    project_type TEXT,
    budget_range TEXT,
    timeline TEXT,
    ip_address TEXT,
    user_agent TEXT,
    status TEXT DEFAULT 'new', -- new, contacted, qualified, closed
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_contact_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_created_at ON contact_submissions(created_at DESC);

-- ============================================================================
-- China Tour Registrations Table
-- ============================================================================
CREATE TABLE IF NOT EXISTS tour_registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    phone TEXT,
    industry TEXT,
    experience_level TEXT, -- beginner, intermediate, experienced
    specific_interests TEXT[], -- array of interests
    dietary_restrictions TEXT,
    emergency_contact_name TEXT,
    emergency_contact_phone TEXT,
    deposit_paid BOOLEAN DEFAULT FALSE,
    payment_amount DECIMAL(10,2),
    payment_method TEXT,
    payment_date TIMESTAMPTZ,
    status TEXT DEFAULT 'pending', -- pending, confirmed, cancelled, waitlist
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_tour_email ON tour_registrations(email);
CREATE INDEX IF NOT EXISTS idx_tour_status ON tour_registrations(status);
CREATE INDEX IF NOT EXISTS idx_tour_created_at ON tour_registrations(created_at DESC);

-- ============================================================================
-- Lead Scoring Table (for marketing automation)
-- ============================================================================
CREATE TABLE IF NOT EXISTS lead_scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    score INTEGER DEFAULT 0,
    last_activity TIMESTAMPTZ DEFAULT NOW(),
    activities JSONB DEFAULT '[]'::jsonb, -- track various activities
    tags TEXT[] DEFAULT '{}', -- marketing tags
    source TEXT, -- where they came from
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_lead_email ON lead_scores(email);
CREATE INDEX IF NOT EXISTS idx_lead_score ON lead_scores(score DESC);
CREATE INDEX IF NOT EXISTS idx_lead_last_activity ON lead_scores(last_activity DESC);

-- ============================================================================
-- Row Level Security (RLS) Policies
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tour_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_scores ENABLE ROW LEVEL SECURITY;

-- Create policies (allow service role to do everything, public users can only insert)
CREATE POLICY "Allow public to insert chat messages" ON chat_messages
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow public to insert newsletter subscriptions" ON newsletter_subscribers
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow public to insert contact submissions" ON contact_submissions
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow public to insert tour registrations" ON tour_registrations
    FOR INSERT TO anon WITH CHECK (true);

-- Service role can do everything
CREATE POLICY "Service role can do everything" ON chat_messages
    FOR ALL TO service_role USING (true);

CREATE POLICY "Service role can do everything" ON newsletter_subscribers
    FOR ALL TO service_role USING (true);

CREATE POLICY "Service role can do everything" ON contact_submissions
    FOR ALL TO service_role USING (true);

CREATE POLICY "Service role can do everything" ON tour_registrations
    FOR ALL TO service_role USING (true);

CREATE POLICY "Service role can do everything" ON lead_scores
    FOR ALL TO service_role USING (true);

-- ============================================================================
-- Functions for automatic timestamps
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_chat_messages_updated_at 
    BEFORE UPDATE ON chat_messages 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_newsletter_subscribers_updated_at 
    BEFORE UPDATE ON newsletter_subscribers 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_submissions_updated_at 
    BEFORE UPDATE ON contact_submissions 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tour_registrations_updated_at 
    BEFORE UPDATE ON tour_registrations 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lead_scores_updated_at 
    BEFORE UPDATE ON lead_scores 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();