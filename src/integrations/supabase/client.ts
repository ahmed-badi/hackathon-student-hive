
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://gibsyygowtzieicrnqyv.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpYnN5eWdvd3R6aWVpY3JucXl2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTU2OTY2NSwiZXhwIjoyMDY1MTQ1NjY1fQ.JH61xC_LJcxd2L0ayM3GjhjlE0VmGITWqm0spG24fbc";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(
  SUPABASE_URL, 
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      // Utiliser l'URL actuelle comme URL de redirection pour l'authentification
      // Cela garantit que l'URL de redirection est correcte dans tous les environnements
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
);

// Création du bucket de stockage pour les présentations si nécessaire
export const createStorageBucketIfNeeded = async () => {
  try {
    // Vérifier si le bucket existe déjà
    const { data, error } = await supabase.storage.getBucket('presentations');
    
    if (error && error.message.includes('does not exist')) {
      // Créer le bucket s'il n'existe pas
      const { data: newBucket, error: createError } = await supabase.storage.createBucket('presentations', {
        public: true,
        fileSizeLimit: 10485760, // 10MB
        allowedMimeTypes: [
          'application/pdf',
          'application/vnd.ms-powerpoint',
          'application/vnd.openxmlformats-officedocument.presentationml.presentation'
        ]
      });
      
      if (createError) {
        console.error("Erreur lors de la création du bucket:", createError);
      } else {
        console.log("Bucket de stockage 'presentations' créé avec succès");
      }
    }
  } catch (e) {
    console.error("Exception lors de la vérification du bucket de stockage:", e);
  }
};

// Fonction utilitaire pour vérifier la connexion à Supabase
export const checkSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('registrations').select('count').limit(1);
    
    if (error) {
      console.error("Erreur de connexion à Supabase:", error);
      return false;
    }
    
    console.log("Connexion à Supabase établie avec succès");

    // Après une connexion réussie, vérifier et créer le bucket de stockage si nécessaire
    await createStorageBucketIfNeeded();
    
    return true;
  } catch (e) {
    console.error("Exception lors de la tentative de connexion à Supabase:", e);
    return false;
  }
};
