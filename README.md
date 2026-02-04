# Jeeto.pk - Lucky Draw Platform

A modern, premium lucky draw website built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Premium UI/UX**: Dark navy and Pakistani green theme with gold accents
- **Prize Cards**: Interactive cards for iPhone 17 Pro, Pro Max, iPad, Apple Watch, and Mercedes C-Class
- **Ticket Purchase**: Modal-based ticket purchase flow with payment method selection
- **Responsive Design**: Fully responsive from mobile to desktop
- **API Routes**: Next.js API routes for prizes and ticket purchases
- **TypeScript**: Fully typed for better development experience

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
jeeto.pk/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── PrizeCard.tsx
│   ├── TicketModal.tsx
│   └── Testimonial.tsx
├── lib/                   # Utilities and data
│   └── mockData.ts
├── types/                 # TypeScript types
│   └── index.ts
├── public/               # Static assets
│   └── images/
└── tailwind.config.ts    # Tailwind configuration
```

## Color Theme

- **Navy**: `#0a1628` (main background)
- **Pakistani Green**: `#01411C` (accents)
- **Gold**: `#D4AF37` (buttons, highlights)

## Products

1. **iPhone 17 Pro** - PKR 420,000 (Ticket: PKR 100)
2. **iPhone 17 Pro Max** - PKR 480,000 (Ticket: PKR 150)
3. **iPad** - PKR 220,000 (Ticket: PKR 80)
4. **Apple Watch** - PKR 150,000 (Ticket: PKR 50)
5. **Mercedes C-Class 2024** - PKR 30,000,000 (Ticket: PKR 1000)

## Next Steps

- [ ] Add real product images to `/public/images/`
- [ ] Integrate actual payment gateway (JazzCash, EasyPaisa)
- [ ] Add database integration (PostgreSQL/MongoDB)
- [ ] Implement user authentication
- [ ] Add admin panel for draw management
- [ ] Set up email notifications
- [ ] Add draw result announcement page

## Technologies

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React 19

## License

Proprietary - Jeeto.pk 2026
