# Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open in Browser
Visit [http://localhost:3000](http://localhost:3000)

---

## 📁 Adding Product Images

To display actual product images instead of placeholders:

1. Add high-quality PNG images to `public/images/` with these exact names:
   - `iphone-17-pro.png`
   - `iphone-17-pro-max.png`
   - `ipad.png`
   - `apple-watch.png`
   - `mercedes-c-class.png`

2. Recommended image specs:
   - Format: PNG with transparent background
   - Size: 800x800px minimum
   - Optimized for web

---

## 🎨 Customizing Colors

Edit `tailwind.config.ts` to change theme colors:

```typescript
colors: {
  navy: {
    DEFAULT: '#0a1628',  // Main background
  },
  pakistan: {
    green: '#01411C',    // Accents
  },
  gold: {
    DEFAULT: '#D4AF37',  // Buttons
  },
}
```

---

## 🔧 Modifying Products

Edit `lib/mockData.ts` to change prizes, prices, or add new products.

---

## 📦 Build for Production

```bash
npm run build
npm start
```

---

## 🌐 Deploy

Deploy to Vercel with one click:
```bash
vercel
```

Or deploy to any hosting platform that supports Next.js.

---

## 📝 Next Steps

1. Add real product images
2. Set up payment gateway integration
3. Add database for tickets
4. Implement user authentication
5. Create admin panel

Check [tasks/todo.md](tasks/todo.md) for detailed implementation plan.
