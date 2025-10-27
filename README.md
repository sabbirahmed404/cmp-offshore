# Offshore-CMP

A modern, responsive landing page for **CodeMyPixel's** offshore team services. This project showcases turnkey offshore teams for AI, SaaS, and ERP solutions with an emphasis on effortless contract management and seamless integration.

## 🚀 Features

- **Modern Landing Page** - Beautiful, responsive design built with Next.js and Tailwind CSS
- **Interactive Dashboard Preview** - Animated showcase of product features
- **Cal.com Integration** - Embedded booking system for consultations
- **Comprehensive Sections**:
  - Hero section with compelling CTA
  - Feature showcase (Smart. Simple. Brilliant)
  - Integration demonstrations (Notion, Figma, Slack, etc.)
  - Pricing plans
  - Customer testimonials
  - FAQ section
  - Documentation section
  - Social proof

## 🛠️ Tech Stack

### Core
- **Next.js 14** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first styling

### UI Components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **Motion** - Animations and transitions
- **Tailwind Animate** - Animation utilities

### Additional Libraries
- **@calcom/embed-react** - Calendar booking integration
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Recharts** - Data visualization
- **Sonner** - Toast notifications
- **Geist Font** - Modern typeface

## 📁 Project Structure

```
Offshore-CMP/
├── app/
│   ├── layout.tsx          # Root layout with fonts and metadata
│   ├── page.tsx            # Main landing page
│   └── globals.css         # Global styles
├── components/
│   ├── animated-beam-demo.tsx
│   ├── booking-button.tsx
│   ├── cal-embed.tsx
│   ├── cta-section.tsx
│   ├── dashboard-preview.tsx
│   ├── documentation-section.tsx
│   ├── effortless-integration.tsx
│   ├── faq-section.tsx
│   ├── feature-cards.tsx
│   ├── footer-section.tsx
│   ├── header.tsx
│   ├── hero-section.tsx
│   ├── numbers-that-speak.tsx
│   ├── pricing-section.tsx
│   ├── smart-simple-brilliant.tsx
│   ├── testimonials-section.tsx
│   ├── theme-provider.tsx
│   ├── your-work-in-sync.tsx
│   └── magicui/
│       └── animated-beam.tsx
├── lib/
│   └── utils.ts            # Utility functions
├── public/
│   └── images/             # Static assets
└── styles/
    └── globals.css
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ (or latest)
- pnpm (recommended) or npm/yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Offshore-CMP
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Run the development server:
```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Create production build
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 🎨 Styling

This project uses **Tailwind CSS 4** with a custom design system:
- Color palette centered around warm beiges and browns
- Typography: Inter (sans-serif) and Instrument Serif (headings)
- Consistent spacing and border radius
- Custom shadows and gradients

## 🔗 Integrations

- **Cal.com** - Booking calendar integration
- **CodeMyPixel Portfolio** - Links to company portfolio
- **CodeMyPixel Blog** - Links to company blog

## 🌐 Deployment

The project is optimized for deployment on platforms like:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Self-hosted**

### Environment Variables
No environment variables are currently required, but you may want to add:
- `NEXT_PUBLIC_CALCOM_EMBED_URL` (if custom domain)
- `NEXT_PUBLIC_GA_ID` (for analytics)

## 📝 Key Features Explained

### Dashboard Preview
Interactive carousel showcasing three key features:
1. **Plan your schedules** - Subscription management
2. **Analytics & insights** - Real-time data visualization
3. **Collaborate seamlessly** - Team workflows

### Bento Grid
Modern layout showcasing:
- Smart organization tools
- Real-time synchronization
- Effortless integrations
- Data visualization capabilities

### Responsive Design
Fully responsive across all devices:
- Mobile-first approach
- Adaptive layouts
- Touch-friendly interactions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

Private - All Rights Reserved © CodeMyPixel

## 👥 Company

Built by [CodeMyPixel](https://codemypixel.com)
- Portfolio: [codemypixel.com/portfolio](https://codemypixel.com/portfolio)
- Blog: [codemypixel.com/blog](https://codemypixel.com/blog)

---

For more information, visit [codemypixel.com](https://codemypixel.com)
