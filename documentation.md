# Bewear - Complete Documentation

## 📋 Overview

Bewear is a modern e-commerce platform built with Next.js 15 and TypeScript, designed to provide a seamless online shopping experience for fashion products. The application leverages server-side rendering for optimal performance, integrates with Stripe for secure payment processing, and uses PostgreSQL with Drizzle ORM for robust data management. The platform features a complete shopping cart system, user authentication, order management, and a responsive design built with Tailwind CSS and shadcn/ui components.

---

## 🏗️ System Architecture

### Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Navigation:** Next.js App Router
- **State Management:** React Query (TanStack Query)
- **Forms & Validation:** React Hook Form + Zod
- **HTTP Client:** Next.js Server Actions
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** PostgreSQL with Drizzle ORM
- **Authentication:** BetterAuth
- **Payment Processing:** Stripe
- **Key Libraries/Services:** Lucide React, Sonner, React Number Format

<div align="center" style="display: inline_block justify-center"><br>
  <img src="https://skillicons.dev/icons?i=typescript,react,nextjs,tailwind,postgres,stripe" alt="icons" /> </div>

### Data Flow

1. User browses products → 2. Server-side data fetching → 3. Add to cart via Server Action → 4. Database update → 5. UI refresh via React Query → 6. Checkout process → 7. Stripe payment → 8. Webhook confirmation → 9. Order status update

---

## 🗂️ Project Structure

```
bewear/
  ├─ src/
  │  ├─ app/                    # Next.js App Router pages and API routes
  │  │  ├─ api/                 # API routes (auth, stripe webhooks)
  │  │  ├─ authentication/      # Sign in/up pages
  │  │  ├─ cart/                # Shopping cart flow
  │  │  ├─ category/            # Product category pages
  │  │  ├─ checkout/            # Payment success page
  │  │  ├─ my-orders/           # Order history
  │  │  └─ product-variant/     # Product detail pages
  │  ├─ actions/                # Server Actions for data mutations
  │  ├─ components/             # Reusable UI components
  │  │  ├─ common/              # Shared components (header, cart, etc.)
  │  │  └─ ui/                  # shadcn/ui components
  │  ├─ data/                   # Data fetching functions
  │  ├─ db/                     # Database schema and connection
  │  ├─ helpers/                # Utility functions
  │  ├─ hooks/                  # Custom React hooks
  │  │  ├─ mutations/           # React Query mutations
  │  │  └─ queries/             # React Query queries
  │  ├─ lib/                    # Library configurations
  │  └─ providers/              # React providers
  ├─ public/                    # Static assets
  └─ package.json
```

---

## 🔐 Authentication & Security

The application uses BetterAuth for authentication with the following flow:

- **Auth Flow:** Email/password registration and login, session management with secure tokens, protected routes, and automatic session validation
- **Key Auth Files:** `src/lib/auth.ts` (BetterAuth configuration), `src/app/api/auth/[...all]/route.ts` (auth API routes), `src/app/authentication/` (login/signup forms)
- **Security:** Server-side session validation, CSRF protection, secure password hashing, and environment variable management

---

## 🧑‍💻 Main Features & Flows

### 1. Product Browsing & Discovery

- Homepage displays featured products, categories, and promotional banners
- Category-based product filtering with dynamic routing
- Product variant selection (colors, sizes) with real-time price updates
- Responsive product grid with optimized images

### 2. Shopping Cart Management

- Add products to cart with quantity selection
- Real-time cart updates using React Query
- Persistent cart data across sessions
- Cart summary with subtotal calculations
- Remove items and quantity adjustments

### 3. User Authentication

- Email/password registration and login
- Form validation using Zod schemas
- Session persistence and automatic login
- Protected routes for authenticated users

### 4. Checkout Process

- Multi-step checkout flow (identification, shipping, payment)
- Address management with form validation
- Stripe integration for secure payment processing
- Order confirmation and status tracking

### 5. Order Management

- Complete order history for authenticated users
- Order status tracking (pending, paid, canceled)
- Order details with product information and shipping details

---

## 🧩 Components

- **Header:** Main navigation with cart, user menu, and search
- **Cart:** Slide-out cart with item management and checkout
- **ProductList:** Responsive grid of product cards
- **ProductItem:** Individual product display with variant selection
- **CategorySelector:** Category filtering component
- **Addresses:** Shipping address management forms
- **CartSummary:** Order summary with pricing calculations
- **SignInForm/SignUpForm:** Authentication forms with validation

---

## 🧮 Core Logic / Key Algorithms

### Cart Management System

The cart system implements a sophisticated state management approach:

1. **Server Actions** handle all cart mutations (add, remove, update quantities)
2. **React Query** provides optimistic updates and cache invalidation
3. **Database transactions** ensure data consistency
4. **Real-time calculations** for totals and shipping costs

### Payment Processing Flow

1. **Order Creation:** Server Action creates order with pending status
2. **Stripe Session:** Generates secure checkout session
3. **Webhook Processing:** Stripe webhook updates order status to paid
4. **Inventory Management:** Product quantities updated automatically

---

## 📦 Dependencies

### Production

- `next`: 15.4.1
- `react`: 19.1.0
- `react-dom`: 19.1.0
- `typescript`: ^5
- `tailwindcss`: ^4
- `@tanstack/react-query`: ^5.83.0
- `react-hook-form`: ^7.60.0
- `zod`: ^4.0.5
- `drizzle-orm`: ^0.44.2
- `better-auth`: ^1.2.12
- `stripe`: ^18.4.0
- `@stripe/stripe-js`: ^7.8.0
- `lucide-react`: ^0.525.0
- `sonner`: ^2.0.6
- `react-number-format`: ^5.4.4

### Development

- `@types/node`: ^20
- `@types/react`: ^19
- `@types/react-dom`: ^19
- `@types/pg`: ^8.15.4
- `drizzle-kit`: ^0.31.4
- `eslint`: ^9
- `eslint-config-next`: 15.4.1
- `prettier`: ^3.6.2
- `tsx`: ^4.20.3

---

## 🎨 Design & Styling

- **Colors:** Defined in Tailwind CSS configuration with custom color palette
- **Global Styles:** Tailwind CSS with custom utilities and responsive design
- **Fonts:** Geist Sans and Geist Mono from Google Fonts
- **Icons:** Lucide React icon library
- **Components:** shadcn/ui component library for consistent design system

---

## 🛠️ Utilities

- **formatCentsToBRL:** Formats currency values from cents to Brazilian Real
- **cn:** Utility for merging CSS classes with conditional logic
- **address helpers:** Utilities for address validation and formatting
- **money helpers:** Currency formatting and calculation utilities

---

## 🌟 Strengths

1. **Modern Tech Stack** - Built with Next.js 15, React 19, and TypeScript for optimal performance and developer experience
2. **Type Safety** - Comprehensive TypeScript implementation with strict type checking
3. **Server-Side Rendering** - SEO-optimized with Next.js App Router and server-side data fetching
4. **Scalable Architecture** - Modular component structure with clear separation of concerns
5. **Secure Payment Processing** - Stripe integration with webhook validation and secure checkout
6. **Real-time Updates** - React Query for optimistic updates and cache management
7. **Responsive Design** - Mobile-first approach with Tailwind CSS and shadcn/ui
8. **Database Efficiency** - PostgreSQL with Drizzle ORM for type-safe database operations

---

## 🔧 Suggested Improvements

### High Priority

1. Add comprehensive unit and integration tests using Jest and React Testing Library
2. Implement error boundaries and structured error logging
3. Add product search functionality with filters and sorting
4. Implement inventory management system

### Medium Priority

1. Add product reviews and ratings system
2. Implement wishlist functionality
3. Add email notifications for order updates
4. Create admin dashboard for product and order management

### Low Priority

1. Add CI/CD pipeline with GitHub Actions
2. Implement PWA features for mobile app-like experience
3. Add analytics and user behavior tracking
4. Create API documentation with OpenAPI/Swagger

---

## 🎯 Conclusion

Bewear is a robust, well-engineered e-commerce platform that demonstrates modern web development best practices. The application features a complete shopping experience with secure payment processing, real-time cart management, and a responsive design. The codebase is well-structured, type-safe, and follows clean architecture principles. The project is ready for production deployment and can easily scale to accommodate growing business needs. The next phase should focus on implementing comprehensive testing, monitoring, and additional features to enhance the user experience.
