
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

  try {
    const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');

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

    for (const adminUser of adminUsers) {
      console.log(`Creating admin user: ${adminUser.email}`);

      // First, check if user already exists
      const { data: existingUsers, error: searchError } = await supabase.auth.admin.listUsers();
      
      if (searchError) {
        console.error('Error searching for existing users:', searchError);
        results.push({ email: adminUser.email, status: 'error', message: searchError.message });
        continue;
      }

      const existingUser = existingUsers.users.find(user => user.email === adminUser.email);
      
      if (existingUser) {
        console.log(`User ${adminUser.email} already exists`);
        
        // Update profile to make them admin
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({ 
            id: existingUser.id, 
            email: existingUser.email, 
            is_admin: true 
          });

        if (profileError) {
          console.error('Error updating profile:', profileError);
          results.push({ email: adminUser.email, status: 'error', message: profileError.message });
        } else {
          results.push({ email: adminUser.email, status: 'updated', message: 'Admin status granted' });
        }
        continue;
      }

      // Create new user
      const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
        email: adminUser.email,
        password: adminUser.password,
        email_confirm: true // Auto-confirm email
      });

      if (createError) {
        console.error('Error creating user:', createError);
        results.push({ email: adminUser.email, status: 'error', message: createError.message });
        continue;
      }

      console.log(`User created successfully: ${adminUser.email}`);

      // Update their profile to make them admin (the trigger should have created the profile)
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ is_admin: true })
        .eq('id', newUser.user.id);

      if (profileError) {
        console.error('Error updating profile to admin:', profileError);
        results.push({ email: adminUser.email, status: 'created_no_admin', message: 'User created but admin status failed' });
      } else {
        results.push({ email: adminUser.email, status: 'success', message: 'Admin user created successfully' });
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        results: results 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in create-admin-users function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
