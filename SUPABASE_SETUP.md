# Supabase Setup Guide

This guide will help you connect your API Keys dashboard to Supabase.

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in your project details:
   - Name: Choose a name for your project
   - Database Password: Set a strong password (save this!)
   - Region: Choose the closest region to your users
4. Click "Create new project" and wait for it to be set up

## Step 2: Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. You'll find:
   - **Project URL** (under "Project URL")
   - **anon/public key** (under "Project API keys")

## Step 3: Set Up Environment Variables

1. Create a `.env.local` file in the root of your project (if it doesn't exist)
2. Add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

Replace `your_project_url_here` and `your_anon_key_here` with the values from Step 2.

## Step 4: Create the Database Table

1. In your Supabase project, go to **SQL Editor**
2. Click "New query"
3. Copy and paste the contents of `supabase-schema.sql` into the editor
4. Click "Run" to execute the SQL

This will create:
- The `api_keys` table with all necessary columns
- Indexes for better performance
- Row Level Security (RLS) policies
- A trigger to automatically update the `updated_at` timestamp

## Step 5: Verify the Setup

1. Restart your Next.js development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/dashboards` in your application
3. You should see the API Keys dashboard
4. Try creating a new API key - it should be saved to Supabase!

## Troubleshooting

### Error: "Missing Supabase environment variables"
- Make sure your `.env.local` file exists in the project root
- Verify the variable names are exactly: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Restart your development server after adding environment variables

### Error: "relation 'api_keys' does not exist"
- Make sure you've run the SQL schema from `supabase-schema.sql` in the Supabase SQL Editor
- Check that the table was created in the **Table Editor** in your Supabase dashboard

### Error: "new row violates row-level security policy"
- The RLS policy in the schema allows all operations by default
- If you're getting this error, check your RLS policies in Supabase
- You may need to adjust the policy based on your authentication setup

## Security Notes

⚠️ **Important**: The current RLS policy allows all operations. For production:

1. Set up proper authentication (Supabase Auth)
2. Update the RLS policies to restrict access based on user authentication
3. Consider using service role keys for server-side operations only
4. Never commit your `.env.local` file to version control

## Next Steps

- Set up Supabase Authentication for user-specific API keys
- Add usage tracking and analytics
- Implement rate limiting based on `monthly_usage_limit`
- Add API key validation and rotation features

