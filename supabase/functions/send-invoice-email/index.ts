// supabase/functions/send-invoice-email/index.ts

import { serve } from "https://deno.land/std@0.190.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'apikey, X-Client-Info, Content-Type, Authorization, Accept, Accept-Language, X-Authorization',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
    })
  }

  try {
    const { to, guestName, bookingId, pdfData, filename } = await req.json()

    if (!to || !guestName || !bookingId || !pdfData) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        }
      )
    }

    // Send email using Resend
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Acme <onboarding@resend.dev>',
        to: [to],
        subject: `Invoice for Booking #${bookingId}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2f5417;">Thank you for your stay!</h2>
            <p>Dear ${guestName},</p>
            <p>Thank you for choosing our hotel. Please find attached your invoice for booking #${bookingId}.</p>
            <p>We hope you enjoyed your stay and look forward to welcoming you again soon.</p>
            <br>
            <p>Best regards,<br>
            <strong>The Wild Oasis Hotel Team</strong></p>
          </div>
        `,
        attachments: [
          {
            filename: filename,
            content: pdfData,
            type: 'application/pdf',
          },
        ],
      }),
    })

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text()
      console.error('Resend API error:', errorText)
      throw new Error('Failed to send email via Resend')
    }

    const result = await emailResponse.json()
    
    return new Response(
      JSON.stringify({ success: true, messageId: result.id }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  }
})