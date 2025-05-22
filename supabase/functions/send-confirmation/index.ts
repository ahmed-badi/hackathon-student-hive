
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ConfirmationEmailRequest {
  firstName: string;
  lastName: string;
  email: string;
  registrationDate: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { firstName, lastName, email, registrationDate }: ConfirmationEmailRequest = await req.json();

    // Vérifier que l'email est bien défini
    if (!email) {
      throw new Error("L'adresse email est requise pour envoyer la confirmation");
    }

    console.log(`Tentative d'envoi d'email à: ${email}`);

    const emailResponse = await resend.emails.send({
      from: "Hackathon Student Hive <onboarding@resend.dev>",
      to: [email], // Utiliser l'email de l'utilisateur qui s'inscrit
      subject: "Confirmation d'inscription au Hackathon",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333; text-align: center; padding-bottom: 10px; border-bottom: 2px solid #f3f4f6;">Confirmation d'Inscription</h1>
          
          <p>Bonjour <strong>${firstName} ${lastName}</strong>,</p>
          
          <p>Nous vous confirmons votre inscription au HackathonZZ.</p>
          
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Date d'inscription:</strong> ${registrationDate}</p>
          </div>
          
          <p>Nous vous tiendrons informé des prochaines étapes et vous enverrons toutes les informations nécessaires concernant l'événement.</p>
          
          <p>Pour toute question, n'hésitez pas à nous contacter.</p>
          
          <p style="margin-top: 30px;">Cordialement,</p>
          <p><strong>L'équipe Hackathon :</strong></p>
          <p><strong>BADI Ahmed</strong></p>
          <p><strong>BAHEND Ayoub</strong></p>
          <p><strong>AMALLAH Aymane</strong></p>
          <p><strong>BARY Hiba</strong></p>
        </div>
      `,
    });

    console.log("Email de confirmation envoyé avec succès:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Erreur dans la fonction send-confirmation:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
