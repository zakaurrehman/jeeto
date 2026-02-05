// Email notification service for Jeeto.pk
// This uses Resend API for sending emails

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  // Check if Resend API key is configured
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured. Email not sent.');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM || 'Jeeto.pk <noreply@jeeto.pk>',
        to,
        subject,
        html,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Failed to send email:', error);
      return { success: false, error };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Email template for winner notification
export function getWinnerEmailTemplate(
  userName: string,
  prizeName: string,
  ticketNumber: string,
  drawDate: string
) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Congratulations! You Won!</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #0a0f1e;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0f1e; padding: 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #1a2332; border-radius: 10px; overflow: hidden; border: 1px solid #d4af37;">
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #d4af37 0%, #0d8a4e 100%); padding: 40px 20px; text-align: center;">
                  <h1 style="margin: 0; color: #0a0f1e; font-size: 32px; font-weight: bold;">
                    🎉 CONGRATULATIONS! 🎉
                  </h1>
                  <p style="margin: 10px 0 0 0; color: #0a0f1e; font-size: 18px;">
                    You're a Winner!
                  </p>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding: 40px 30px;">
                  <p style="margin: 0 0 20px 0; color: #ffffff; font-size: 18px;">
                    Dear ${userName},
                  </p>

                  <p style="margin: 0 0 20px 0; color: #e5e5e5; font-size: 16px; line-height: 1.6;">
                    We are thrilled to announce that you are the <strong style="color: #d4af37;">WINNER</strong> of the lucky draw for:
                  </p>

                  <div style="background-color: #0a0f1e; border-left: 4px solid #d4af37; padding: 20px; margin: 20px 0; border-radius: 5px;">
                    <h2 style="margin: 0 0 10px 0; color: #d4af37; font-size: 24px;">
                      ${prizeName}
                    </h2>
                    <p style="margin: 5px 0; color: #a0a0a0; font-size: 14px;">
                      <strong>Winning Ticket:</strong> ${ticketNumber}
                    </p>
                    <p style="margin: 5px 0; color: #a0a0a0; font-size: 14px;">
                      <strong>Draw Date:</strong> ${drawDate}
                    </p>
                  </div>

                  <h3 style="color: #d4af37; font-size: 20px; margin: 30px 0 15px 0;">
                    Next Steps to Claim Your Prize:
                  </h3>

                  <ol style="color: #e5e5e5; font-size: 15px; line-height: 1.8; padding-left: 20px;">
                    <li>Verify your identity with a valid ID card (CNIC)</li>
                    <li>Contact us within 30 days to arrange prize collection</li>
                    <li>Visit our office or we'll arrange secure delivery</li>
                    <li>Sign the winner declaration form</li>
                  </ol>

                  <div style="background-color: #0d8a4e20; border: 1px solid #0d8a4e; padding: 15px; margin: 25px 0; border-radius: 5px;">
                    <p style="margin: 0; color: #0d8a4e; font-size: 14px;">
                      <strong>⚠️ Important:</strong> You must claim your prize within 30 days. Unclaimed prizes will be forfeited.
                    </p>
                  </div>

                  <p style="margin: 25px 0 10px 0; color: #e5e5e5; font-size: 16px;">
                    For immediate assistance, contact us:
                  </p>

                  <ul style="list-style: none; padding: 0; margin: 0; color: #e5e5e5; font-size: 15px;">
                    <li style="margin: 8px 0;">📧 Email: support@jeeto.pk</li>
                    <li style="margin: 8px 0;">📱 Phone: +92 300 1234567</li>
                    <li style="margin: 8px 0;">🕒 Hours: Mon-Sat, 9 AM - 6 PM</li>
                  </ul>

                  <p style="margin: 30px 0 0 0; color: #e5e5e5; font-size: 16px;">
                    Congratulations once again! We look forward to presenting you with your prize.
                  </p>

                  <p style="margin: 20px 0 0 0; color: #a0a0a0; font-size: 14px;">
                    Best regards,<br>
                    <strong style="color: #d4af37;">The Jeeto.pk Team</strong>
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #0a0f1e; padding: 20px; text-align: center; border-top: 1px solid #d4af37;">
                  <p style="margin: 0 0 10px 0; color: #a0a0a0; font-size: 12px;">
                    Jeeto.pk - Pakistan's Trusted Lucky Draw Platform
                  </p>
                  <p style="margin: 0; color: #666; font-size: 11px;">
                    This email was sent to you because you won a prize on Jeeto.pk
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

// Email template for ticket purchase confirmation
export function getTicketPurchaseEmailTemplate(
  userName: string,
  prizeName: string,
  ticketNumbers: string[],
  quantity: number,
  totalPrice: number,
  drawDate: string
) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Ticket Purchase Confirmation</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #0a0f1e;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0f1e; padding: 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #1a2332; border-radius: 10px; overflow: hidden; border: 1px solid #d4af37;">
              <tr>
                <td style="background: linear-gradient(135deg, #d4af37 0%, #0d8a4e 100%); padding: 30px 20px; text-align: center;">
                  <h1 style="margin: 0; color: #0a0f1e; font-size: 28px; font-weight: bold;">
                    ✅ Purchase Confirmed
                  </h1>
                </td>
              </tr>

              <tr>
                <td style="padding: 30px;">
                  <p style="margin: 0 0 20px 0; color: #ffffff; font-size: 16px;">
                    Dear ${userName},
                  </p>

                  <p style="margin: 0 0 20px 0; color: #e5e5e5; font-size: 15px;">
                    Thank you for your purchase! Your tickets have been confirmed for:
                  </p>

                  <div style="background-color: #0a0f1e; border-left: 4px solid #d4af37; padding: 15px; margin: 20px 0; border-radius: 5px;">
                    <h2 style="margin: 0 0 10px 0; color: #d4af37; font-size: 20px;">${prizeName}</h2>
                    <p style="margin: 5px 0; color: #a0a0a0; font-size: 14px;">Tickets: ${quantity}</p>
                    <p style="margin: 5px 0; color: #a0a0a0; font-size: 14px;">Total: PKR ${totalPrice.toLocaleString()}</p>
                    <p style="margin: 5px 0; color: #a0a0a0; font-size: 14px;">Draw Date: ${drawDate}</p>
                  </div>

                  <p style="margin: 20px 0 10px 0; color: #d4af37; font-size: 15px; font-weight: bold;">Your Ticket Numbers:</p>
                  <p style="margin: 0; color: #e5e5e5; font-size: 14px;">${ticketNumbers.join(', ')}</p>

                  <p style="margin: 25px 0 0 0; color: #e5e5e5; font-size: 15px;">
                    Good luck! We'll notify you immediately if you win.
                  </p>
                </td>
              </tr>

              <tr>
                <td style="background-color: #0a0f1e; padding: 15px; text-align: center; border-top: 1px solid #d4af37;">
                  <p style="margin: 0; color: #a0a0a0; font-size: 12px;">
                    Jeeto.pk - Pakistan's Trusted Lucky Draw Platform
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

// Send winner notification email
export async function sendWinnerNotification(
  email: string,
  userName: string,
  prizeName: string,
  ticketNumber: string,
  drawDate: Date
) {
  const formattedDate = drawDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return await sendEmail({
    to: email,
    subject: `🎉 Congratulations! You Won ${prizeName}!`,
    html: getWinnerEmailTemplate(userName, prizeName, ticketNumber, formattedDate),
  });
}

// Send ticket purchase confirmation email
export async function sendTicketPurchaseConfirmation(
  email: string,
  userName: string,
  prizeName: string,
  ticketNumbers: string[],
  quantity: number,
  totalPrice: number,
  drawDate: Date
) {
  const formattedDate = drawDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return await sendEmail({
    to: email,
    subject: `Ticket Purchase Confirmed - ${prizeName}`,
    html: getTicketPurchaseEmailTemplate(
      userName,
      prizeName,
      ticketNumbers,
      quantity,
      totalPrice,
      formattedDate
    ),
  });
}
