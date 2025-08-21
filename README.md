# PNK Trading Website

A responsive website for PNK Trading featuring a v0-style chat interface and Supabase integration.

## Features

- **Responsive Design** - Dark/light theme toggle with smooth transitions
- **V0-Style Chat Interface** - Clean, modern chat UI similar to v0.dev
- **Custom Stair Railings Focus** - Specialized for building materials sourcing
- **Newsletter Signup** - Theme-aware styling with proper contrast
- **Supabase Integration** - Ready for chat messages and lead management
- **Static HTML** - No build process required, deploy anywhere

## Quick Deploy

### Deploy to Vercel
1. Fork this repository
2. Connect to Vercel
3. Deploy instantly

### Manual Setup
1. Clone the repository
2. Serve the files from any web server
3. Configure Supabase credentials in `script.js`

## Files

- `index.html` - Main website file
- `styles.css` - All styling with theme support
- `script.js` - JavaScript functionality and chat interface
- `supabase-schema.sql` - Database schema for Supabase

## Configuration

To enable chat functionality:
1. Create a Supabase project
2. Run the SQL schema from `supabase-schema.sql`
3. Update credentials in `script.js`:
   ```javascript
   const SUPABASE_URL = 'your-project-url';
   const SUPABASE_ANON_KEY = 'your-anon-key';
   ```

## Tech Stack

- Vanilla HTML/CSS/JavaScript
- Supabase for backend
- No frameworks or build process
- Fully static and portable

---

🤖 Built by Unified AI
Built for efficient deployment and maximum compatibility.