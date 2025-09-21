import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, sessionId } = await req.json();
    
    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Message is required' }), 
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const botpressApiKey = Deno.env.get('BOTPRESS_API_KEY');
    if (!botpressApiKey) {
      console.error('BOTPRESS_API_KEY not found');
      return new Response(
        JSON.stringify({ error: 'Botpress API key not configured' }), 
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Sending message to Botpress:', message, 'Session ID:', sessionId);

    // Prepare the request body with session support
    const requestBody: any = {
      type: 'text',
      payload: {
        text: message
      }
    };

    // Include sessionId if provided for conversation continuity
    if (sessionId) {
      requestBody.conversationId = sessionId;
    }

    // Make direct API call to Botpress
    const response = await fetch('https://api.botpress.cloud/v1/chat/messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${botpressApiKey}`,
        'Content-Type': 'application/json',
        'x-bot-id': 'your-bot-id' // You'll need to provide your actual bot ID
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      console.error('Botpress API error:', response.status, await response.text());
      return new Response(
        JSON.stringify({ error: 'Failed to send message to Botpress' }), 
        { 
          status: response.status, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const botpressResponse = await response.json();
    console.log('Botpress response:', botpressResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        response: botpressResponse 
      }), 
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in botpress-chat function:', error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});