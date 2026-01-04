# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 e-commerce website for a Chinese footwear manufacturer (鞋材工厂). It provides product catalog browsing, contact forms, and an admin dashboard for managing products and messages. The application uses:

- **Next.js 16** with App Router (server components)
- **React 19** with TypeScript
- **Prisma** with SQLite for database
- **Tailwind CSS v4** for styling
- **Radix UI** components (via shadcn/ui patterns)

## Common Commands

```bash
# Start development server (runs on port 10101)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Seed database with sample products
npm run seed

# Database migrations
npx prisma generate   # Regenerate Prisma client after schema changes
npx prisma db push    # Push schema changes to database
npx prisma db pull    # Pull database schema to Prisma schema
```

## Architecture

### Database (Prisma + SQLite)

- **Database file**: `prisma/dev.db`
- **Schema**: `prisma/schema.prisma`
- **Prisma client**: `lib/prisma.ts` (singleton pattern for dev hot-reload)

**Models**:
- `Product`: id, name, description, price, imageUrl, category, subCategory, featured, timestamps
- `Message`: id, name, email, phone, company, message, status (new/contacted/completed), timestamps
- `Settings`: id (always 'settings'), heroBackgroundImage, timestamps

**Important**: After any Prisma schema changes, run `npx prisma generate` to regenerate the client.

### File Structure

```
app/
├── page.tsx              # Home page (server component, fetches products/settings)
├── layout.tsx            # Root layout
├── aboutus/page.tsx      # About us page (static)
├── admin/
│   ├── page.tsx          # Admin dashboard (client component)
│   ├── products/[id]/page.tsx  # Product edit page
│   ├── products/new/page.tsx   # Product creation page
│   ├── messages/page.tsx       # Message management
│   └── settings/page.tsx       # Hero background settings
└── api/
    ├── products/route.ts       # GET list, POST create
    ├── products/[id]/route.ts  # GET, PUT update, DELETE
    ├── messages/route.ts       # GET list, POST create
    ├── messages/[id]/route.ts  # PUT update status, DELETE
    ├── upload/route.ts         # Image upload (formidable)
    └── settings/route.ts       # GET, PUT update

components/
├── ui/                    # Radix UI primitives (button, dialog, input, etc.)
├── product-card.tsx       # Product display card
├── product-form.tsx       # Product creation/edit form
├── contact-form.tsx       # Contact form component
├── product-inquiry-modal.tsx  # Product inquiry modal
├── image-upload.tsx       # Image upload component
└── catalog-section.tsx    # Product catalog with category filtering

lib/
├── prisma.ts              # Prisma client singleton
├── utils.ts               # Utility functions (cn for class merging)
└── categories.ts          # Product category definitions
```

### Product Categories

Categories are defined in `lib/categories.ts`:

- **men-boots**: Men Snow Boots, Men Hiking Boots, Men Work Boots
- **women-boots**: Women Chelsea Boots, Women Snow Boots
- **tactical-boots**: (no subcategories)

When adding new categories, update `PRODUCT_CATEGORIES` in `lib/categories.ts`.

### Client vs Server Components

- **Server components**: Home page (`app/page.tsx`), About Us page
- **Client components**: Admin dashboard (`'use client'` directive), forms, modals

Admin pages use client-side data fetching with `useEffect` and `useState`. Public pages use server-side Prisma queries directly.

### Styling Conventions

- Uses Tailwind CSS v4
- Custom colors: `amber-500` primary, `gray-900` dark
- Utilities from `lib/utils.ts`: `cn()` for merging `clsx` and `tailwind-merge`
- Radix UI components in `components/ui/` follow shadcn/ui patterns

### Image Upload

- Images are uploaded via `app/api/upload/route.ts` using `formidable`
- Saved to `public/uploads/` directory
- Filenames use UUID to avoid collisions
- Delete old images when updating products

### Environment Variables

Required in `.env` (not tracked in git):
```
DATABASE_URL="file:./dev.db"
```

The `.env` file should exist in the project root. Without it, Prisma will fail with validation errors.

## Key Patterns

### Adding a New Product Field

1. Update `prisma/schema.prisma`
2. Run `npx prisma generate`
3. Run `npx prisma db push`
4. Update `components/product-form.tsx` to include the field
5. Update `app/api/products/route.ts` and `app/api/products/[id]/route.ts`

### Admin Page Pattern

Admin pages follow this pattern:
- `'use client'` directive at top
- State management with `useState`
- `useEffect` for initial data fetch
- Client-side API calls to `/api/*` routes
- Dialog/Modal for confirmations (using Radix UI)

### API Route Pattern

```typescript
export async function GET() {
  try {
    const data = await prisma.model.findMany()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Message' }, { status: 500 })
  }
}
```

### Product Filtering on Home Page

The `CatalogSection` component filters products by category on the client side. Products are fetched server-side and passed as props, then filtered in the browser when users select a category tab.
