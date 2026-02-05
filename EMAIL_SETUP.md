# Email Notifications Setup Guide

This guide explains how to set up email notifications for Jeeto.pk using Resend.

## Why Resend?

Resend is a modern email API service that offers:
- Free tier: 3,000 emails/month
- Simple API integration
- No credit card required for free tier
- Excellent deliverability
- Built-in email templates support

## Setup Steps

### 1. Create a Resend Account

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

### 2. Get Your API Key

1. After logging in, go to **API Keys** in the dashboard
2. Click **Create API Key**
3. Give it a name (e.g., "Jeeto.pk Production")
4. Select **Full Access** permission
5. Click **Create**
6. Copy the API key (it starts with `re_`)

### 3. Add Environment Variables

Add these environment variables to your Vercel project:

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=Jeeto.pk <noreply@yourdomain.com>
```

**To add in Vercel:**
1. Go to your project settings
2. Navigate to **Environment Variables**
3. Add `RESEND_API_KEY` with your API key
4. Add `EMAIL_FROM` with your sender email
5. Redeploy your application

**For local development**, add to your `.env` file:
```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=Jeeto.pk <noreply@yourdomain.com>
```

### 4. Domain Verification (Optional but Recommended)

For better deliverability, verify your domain:

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `jeeto.pk`)
4. Add the DNS records provided by Resend to your domain's DNS settings
5. Wait for verification (usually takes a few minutes)

Once verified, update `EMAIL_FROM` to use your domain:
```bash
EMAIL_FROM=Jeeto.pk <noreply@jeeto.pk>
```

## Email Notifications

The following emails are automatically sent:

### 1. Winner Notification
- **Trigger:** When an admin executes a draw and a winner is selected
- **Recipient:** Winner's email address
- **Content:** Congratulations message, prize details, claim instructions
- **Subject:** "🎉 Congratulations! You Won {Prize Name}!"

### 2. Ticket Purchase Confirmation (Optional - Not Yet Implemented)
- **Trigger:** When a user successfully purchases tickets
- **Recipient:** Buyer's email address
- **Content:** Purchase confirmation, ticket numbers, draw date
- **Subject:** "Ticket Purchase Confirmed - {Prize Name}"

## Testing

To test if emails are working:

1. Make sure environment variables are set
2. Create a test user with your email
3. Purchase tickets for a prize
4. Execute the draw as admin
5. Check your inbox for the winner notification email

## Troubleshooting

### Emails not sending?

1. **Check API key:** Make sure `RESEND_API_KEY` is set correctly in Vercel
2. **Check logs:** Look at Vercel function logs for email errors
3. **Verify email:** If using a verified domain, make sure DNS is configured
4. **Check spam:** Winner emails might end up in spam folder initially

### Rate limits

- Free tier: 3,000 emails/month, 100 emails/day
- If you exceed limits, upgrade to a paid plan or use a different email service

## Alternative Email Services

If you prefer a different service, you can modify `lib/email.ts` to use:

- **SendGrid:** Popular, generous free tier (100 emails/day)
- **Mailgun:** Good for transactional emails
- **AWS SES:** Very cheap for high volume
- **Postmark:** Excellent deliverability

The `sendEmail()` function in `lib/email.ts` is designed to be easily swappable.

## Email Templates

Email templates are defined in `lib/email.ts`:

- `getWinnerEmailTemplate()` - Winner notification
- `getTicketPurchaseEmailTemplate()` - Purchase confirmation

Templates use HTML with inline styles for maximum compatibility across email clients.

## Production Checklist

Before going live:

- [ ] Verify your domain in Resend
- [ ] Set up proper `EMAIL_FROM` address
- [ ] Test emails from production environment
- [ ] Monitor email delivery rates in Resend dashboard
- [ ] Set up email alerts for failed deliveries
- [ ] Consider adding email preferences for users

## Support

For issues with Resend, check their documentation:
- [Resend Docs](https://resend.com/docs)
- [Resend API Reference](https://resend.com/docs/api-reference)

For issues with Jeeto.pk email implementation, check the code in `lib/email.ts`.
