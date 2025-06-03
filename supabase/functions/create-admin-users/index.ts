
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  console.log('=== CREATE ADMIN USERS FUNCTION STARTED ===');
  
  try {
    const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');

    console.log('Environment check:', {
      hasServiceRoleKey: !!supabaseServiceRoleKey,
      supabaseUrl: supabaseUrl,
      serviceRoleKeyLength: supabaseServiceRoleKey ? supabaseServiceRoleKey.length : 0
    });

    if (!supabaseServiceRoleKey || !supabaseUrl) {
      throw new Error('Missing Supabase environment variables');
    }

    // Create Supabase client with service role key for admin operations
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    console.log('Supabase client created successfully');

    const adminUsers = [
      {
        email: 'klaus@strategiert.com',
        password: '!#W42kKpunktA1!#'
      },
      {
        email: 'nieke1989@gmail.com', 
        password: 'Omaundopa123!'
      }
    ];

    const results = [];

    // First, let's check if the trigger exists and is working
    console.log('=== CHECKING TRIGGER EXISTENCE ===');
    const { data: triggerCheck, error: triggerError } = await supabase
      .from('pg_trigger')
      .select('*')
      .eq('tgname', 'on_auth_user_created');
    
    console.log('Trigger check result:', { triggerCheck, triggerError });

    for (const adminUser of adminUsers) {
      console.log(`=== PROCESSING USER: ${adminUser.email} ===`);

      // First, check if user already exists in auth.users
      console.log('Checking existing users...');
      const { data: existingUsers, error: searchError } = await supabase.auth.admin.listUsers();
      
      if (searchError) {
        console.error('Error searching for existing users:', searchError);
        results.push({ email: adminUser.email, status: 'error', message: `Search error: ${searchError.message}` });
        continue;
      }

      console.log(`Found ${existingUsers.users.length} existing users`);
      const existingUser = existingUsers.users.find(user => user.email === adminUser.email);
      
      if (existingUser) {
        console.log(`User ${adminUser.email} already exists with ID: ${existingUser.id}`);
        
        // Check if profile exists
        const { data: existingProfile, error: profileSearchError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', existingUser.id)
          .single();

        console.log('Existing profile check:', { existingProfile, profileSearchError });

        if (profileSearchError && profileSearchError.code !== 'PGRST116') {
          console.error('Error checking existing profile:', profileSearchError);
          results.push({ email: adminUser.email, status: 'error', message: `Profile check error: ${profileSearchError.message}` });
          continue;
        }

        if (!existingProfile) {
          console.log('Profile does not exist, creating manually...');
          // Create profile manually if it doesn't exist
          const { error: profileCreateError } = await supabase
            .from('profiles')
            .insert({ 
              id: existingUser.id, 
              email: existingUser.email, 
              is_admin: true 
            });

          if (profileCreateError) {
            console.error('Error creating profile manually:', profileCreateError);
            results.push({ email: adminUser.email, status: 'error', message: `Profile creation error: ${profileCreateError.message}` });
            continue;
          } else {
            console.log('Profile created manually successfully');
            results.push({ email: adminUser.email, status: 'updated', message: 'User exists, profile created and admin status granted' });
          }
        } else {
          // Update existing profile to make them admin
          const { error: profileError } = await supabase
            .from('profiles')
            .update({ is_admin: true })
            .eq('id', existingUser.id);

          if (profileError) {
            console.error('Error updating profile:', profileError);
            results.push({ email: adminUser.email, status: 'error', message: `Profile update error: ${profileError.message}` });
          } else {
            console.log('Profile updated successfully');
            results.push({ email: adminUser.email, status: 'updated', message: 'Admin status granted to existing user' });
          }
        }
        continue;
      }

      // Create new user
      console.log(`Creating new user: ${adminUser.email}`);
      const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
        email: adminUser.email,
        password: adminUser.password,
        email_confirm: true // Auto-confirm email
      });

      if (createError) {
        console.error('Error creating user:', createError);
        results.push({ email: adminUser.email, status: 'error', message: `User creation error: ${createError.message}` });
        continue;
      }

      console.log(`User created successfully: ${adminUser.email} with ID: ${newUser.user.id}`);

      // Wait a moment for trigger to potentially fire
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if profile was created by trigger
      console.log('Checking if profile was created by trigger...');
      const { data: triggerProfile, error: triggerProfileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', newUser.user.id)
        .maybeSingle();

      console.log('Trigger profile check:', { triggerProfile, triggerProfileError });

      if (!triggerProfile) {
        console.log('Trigger did not create profile, creating manually...');
        // Create profile manually if trigger didn't work
        const { error: manualProfileError } = await supabase
          .from('profiles')
          .insert({ 
            id: newUser.user.id, 
            email: newUser.user.email, 
            is_admin: true 
          });

        if (manualProfileError) {
          console.error('Error creating profile manually:', manualProfileError);
          results.push({ email: adminUser.email, status: 'created_no_admin', message: `User created but profile creation failed: ${manualProfileError.message}` });
        } else {
          console.log('Profile created manually successfully');
          results.push({ email: adminUser.email, status: 'success', message: 'Admin user created successfully (manual profile creation)' });
        }
      } else {
        console.log('Profile exists from trigger, updating to admin...');
        // Update profile to make them admin
        const { error: adminUpdateError } = await supabase
          .from('profiles')
          .update({ is_admin: true })
          .eq('id', newUser.user.id);

        if (adminUpdateError) {
          console.error('Error updating to admin:', adminUpdateError);
          results.push({ email: adminUser.email, status: 'created_no_admin', message: `User created but admin update failed: ${adminUpdateError.message}` });
        } else {
          console.log('Admin status granted successfully');
          results.push({ email: adminUser.email, status: 'success', message: 'Admin user created successfully (trigger + admin update)' });
        }
      }
    }

    console.log('=== FINAL RESULTS ===', results);

    return new Response(
      JSON.stringify({ 
        success: true, 
        results: results,
        debug: {
          timestamp: new Date().toISOString(),
          totalUsers: results.length,
          triggerExists: !!triggerCheck
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('=== FUNCTION ERROR ===', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false,
        debug: {
          timestamp: new Date().toISOString(),
          errorType: error.constructor.name
        }
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
