
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Créer un client Supabase avec les permissions de service
const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { action, token, password } = await req.json()
    
    // Récupérer le mot de passe admin depuis les secrets
    const adminPassword = Deno.env.get('ADMIN_PASSWORD')
    
    if (!adminPassword) {
      console.error('ADMIN_PASSWORD not configured')
      return new Response(
        JSON.stringify({ error: 'Configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (action === 'login') {
      // Vérifier le mot de passe
      if (password !== adminPassword) {
        return new Response(
          JSON.stringify({ success: false, error: 'Mot de passe incorrect' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // Créer un token sécurisé et une session
      const sessionToken = crypto.randomUUID()
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 heures
      
      // Pour cette démo, nous utilisons un user_id fictif pour l'admin
      // Dans un vrai système, vous auriez un utilisateur admin authentifié
      const adminUserId = '00000000-0000-0000-0000-000000000000'
      
      // Stocker la session dans la base de données
      const { error: insertError } = await supabaseAdmin
        .from('admin_sessions')
        .insert({
          user_id: adminUserId,
          token: sessionToken,
          expires_at: expiresAt.toISOString()
        })

      if (insertError) {
        console.error('Error creating admin session:', insertError)
        return new Response(
          JSON.stringify({ error: 'Erreur lors de la création de la session' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          token: sessionToken,
          expiresAt: expiresAt.toISOString(),
          message: 'Connexion réussie' 
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (action === 'validate') {
      // Valider un token existant
      if (!token) {
        return new Response(
          JSON.stringify({ valid: false, error: 'Token manquant' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // Vérifier le token dans la base de données
      const { data: session, error } = await supabaseAdmin
        .from('admin_sessions')
        .select('*')
        .eq('token', token)
        .gt('expires_at', new Date().toISOString())
        .single()

      if (error || !session) {
        return new Response(
          JSON.stringify({ valid: false, error: 'Token invalide ou expiré' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // Mettre à jour last_used_at
      await supabaseAdmin
        .from('admin_sessions')
        .update({ last_used_at: new Date().toISOString() })
        .eq('token', token)

      return new Response(
        JSON.stringify({ 
          valid: true, 
          expiresAt: session.expires_at,
          message: 'Token valide' 
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (action === 'logout') {
      // Invalider le token
      if (!token) {
        return new Response(
          JSON.stringify({ success: false, error: 'Token manquant' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // Supprimer la session de la base de données
      const { error } = await supabaseAdmin
        .from('admin_sessions')
        .delete()
        .eq('token', token)

      if (error) {
        console.error('Error deleting admin session:', error)
        return new Response(
          JSON.stringify({ error: 'Erreur lors de la déconnexion' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Déconnexion réussie' 
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ error: 'Action non reconnue' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Erreur dans admin-session:', error)
    return new Response(
      JSON.stringify({ error: 'Erreur serveur' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
