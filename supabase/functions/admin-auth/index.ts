
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { password } = await req.json()
    
    // Récupérer le mot de passe admin depuis les secrets Supabase
    const adminPassword = Deno.env.get('ADMIN_PASSWORD')
    
    if (!adminPassword) {
      console.error('ADMIN_PASSWORD not configured in Supabase secrets')
      return new Response(
        JSON.stringify({ error: 'Configuration error' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Vérifier le mot de passe
    if (password === adminPassword) {
      // Générer un token temporaire (JWT simple ou UUID)
      const token = crypto.randomUUID()
      
      // Dans un vrai système, vous stockeriez ce token avec une expiration
      // Pour cette démo, nous retournons juste un token valide
      return new Response(
        JSON.stringify({ 
          success: true, 
          token: token,
          message: 'Authentification réussie' 
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    } else {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Mot de passe incorrect' 
        }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }
  } catch (error) {
    console.error('Erreur dans admin-auth:', error)
    return new Response(
      JSON.stringify({ error: 'Erreur serveur' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
