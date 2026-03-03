# SHOP.CO - E-Commerce Platform

A full-stack e-commerce clothing store built with Next.js 14, Sanity CMS, Stripe Payments, and ShipEngine shipping integration.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss)
![Sanity](https://img.shields.io/badge/Sanity-CMS-F03E2F?logo=sanity)
![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?logo=stripe)

## Features

- **Product Catalog** — Browse products by category, search, filter by price/color/size
- **Shopping Cart** — Add/remove items, adjust quantities, apply promo codes
- **User Authentication** — Sign up, login, and account management via Clerk
- **Checkout Flow** — Shipping form with validation, order creation in Sanity
- **Stripe Payments** — Secure payment processing with dynamic cart totals
- **Shipping Integration** — Real-time shipping rates and label creation via ShipEngine
- **Order Tracking** — Track shipments using label IDs
- **Product Reviews** — Star ratings, submit and manage reviews
- **Admin Dashboard** — View orders, sales analytics, revenue stats, live viewer charts
- **Responsive Design** — Mobile-first UI with Tailwind CSS and shadcn/ui

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS, shadcn/ui |
| State Management | Redux Toolkit + Redux Persist |
| CMS | Sanity (Headless) |
| Authentication | Clerk |
| Payments | Stripe |
| Shipping | ShipEngine |
| Forms | React Hook Form + Zod |
| Animations | Framer Motion |
| Charts | Chart.js + react-chartjs-2 |

## Project Structure

```
src/
├── app/
│   ├── api/                  # API routes (search, login, shipengine)
│   ├── cart/                 # Shopping cart pages
│   ├── casual/               # Product listing with filters
│   ├── checkout/             # Checkout with shipping form
│   ├── payment/              # Stripe payment integration
│   ├── payment-success/      # Payment confirmation
│   ├── product/              # Product detail & reviews
│   ├── search/               # Search results
│   ├── tracking/             # Shipment tracking
│   ├── generate-tracking/    # Shipping label creation
│   ├── (pages)/              # Admin dashboard (orders, sales, views)
│   ├── Redux/                # Store, hooks, cart slice
│   ├── sign-in/              # Clerk sign in
│   ├── sign-up/              # Clerk sign up
│   ├── studio/               # Sanity Studio
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Homepage
├── components/               # Reusable UI components
│   └── ui/                   # shadcn/ui primitives
├── sanity/
│   ├── lib/                  # Sanity client & image helpers
│   └── schemaTypes/          # Content schemas (product, order, review)
├── helper/                   # ShipEngine initialization
├── lib/                      # Utilities (cn helper)
├── type.ts                   # Shared TypeScript interfaces
└── middleware.ts              # Clerk route protection
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- Sanity account
- Stripe account
- Clerk account
- ShipEngine account (optional, for shipping features)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/shop-co.git
cd shop-co
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-23
SANITY_TOKEN=your_sanity_token

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key

# ShipEngine
SHIPENGINE_API_KEY=your_shipengine_api_key
SHIPENGINE_FIRST_COURIER=your_carrier_id
SHIPENGINE_SECOND_COURIER=your_carrier_id

# Admin Login
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_secure_password
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Access Sanity Studio

Navigate to [http://localhost:3000/studio](http://localhost:3000/studio) to manage content.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run migrate` | Run Sanity data migration |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com)
3. Add all environment variables in Vercel project settings
4. Deploy

### Other Platforms

```bash
npm run build
npm run start
```

Ensure all environment variables are configured on your hosting platform.

## License

This project is private and not licensed for public distribution.
