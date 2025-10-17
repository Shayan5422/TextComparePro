# TextDiff - Professional Text Comparison Tool

## Overview

TextDiff is a client-side text comparison application that provides word-level and character-level diff analysis with visual highlighting. The application is designed as a productivity tool for comparing two text documents, highlighting additions, deletions, modifications, and matches with semantic color coding. Built with React, TypeScript, and shadcn/ui components, it offers both dark and light themes with a focus on developer-tool aesthetics inspired by VS Code and GitHub Diff interfaces.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server with Hot Module Replacement (HMR)
- Client-side only application with no server-side rendering

**UI Component System:**
- shadcn/ui component library (New York style variant) for consistent, accessible UI primitives
- Radix UI primitives for headless, accessible component foundations
- Tailwind CSS for utility-first styling with custom design tokens
- CSS variables for theme management supporting dark/light modes

**Routing & State:**
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for data fetching and cache management
- Local React state for text comparison workflow
- localStorage for theme persistence

**Design System:**
- Custom color palette with semantic diff colors (match/green, addition/dark green, deletion/red, modification/amber)
- Typography stack: Inter for UI text, JetBrains Mono for monospace content
- Responsive design with mobile-first approach
- Dark mode as default theme

### Backend Architecture

**Server Framework:**
- Express.js server with TypeScript
- Development mode uses Vite middleware for SPA serving
- Production mode serves static built assets
- Minimal API surface (currently a stub for future expansion)

**Storage Layer:**
- In-memory storage implementation (MemStorage) as the current persistence layer
- Interface-based design (IStorage) allows for future database integration
- User schema defined but not actively used in current implementation
- Drizzle ORM configured for PostgreSQL (prepared for future database migration)

**Rationale for Current Architecture:**
The application is intentionally client-side focused because text comparison is a stateless operation that doesn't require server processing or data persistence. The backend infrastructure exists to support future features like user accounts, saved comparisons, or comparison history, but the core functionality runs entirely in the browser for privacy and performance.

### Core Text Comparison Algorithm

**Implementation Location:** `client/src/lib/text-comparison.ts`

**Algorithm Design:**
- Token-based comparison supporting both word and character modes
- Normalization pipeline for case-insensitive and punctuation-agnostic comparisons
- Segments text into TokenUnits containing original, normalized, whitespace, and punctuation metadata
- Longest Common Subsequence (LCS) algorithm for diff generation
- Type classification: match, addition, deletion, modification

**Comparison Options:**
- Mode: word vs character comparison
- Case sensitivity toggle
- Punctuation consideration toggle

**Output:**
- Segmented text with diff type annotations for visual rendering
- Statistical metrics: word counts, character counts, match counts, difference counts, similarity percentage

### External Dependencies

**UI & Component Libraries:**
- Radix UI (20+ component primitives): Accessible, unstyled components for dialogs, dropdowns, popovers, tooltips, etc.
- shadcn/ui: Pre-styled Radix components following design system
- Lucide React: Icon library
- Tailwind CSS: Utility-first CSS framework
- class-variance-authority & clsx: Dynamic className generation

**Development & Build:**
- Vite: Build tool with plugins for React, error overlays, Replit integration
- TypeScript: Type system
- PostCSS with Autoprefixer: CSS processing

**Backend Stack:**
- Express.js: Web server
- Drizzle ORM: Type-safe ORM for PostgreSQL (configured but not actively used)
- @neondatabase/serverless: PostgreSQL driver for Neon database
- connect-pg-simple: PostgreSQL session store (prepared for future auth)

**State Management & Data Fetching:**
- TanStack Query: Async state management and caching
- React Hook Form: Form state management (installed but not actively used)
- Zod: Schema validation (used for type definitions)

**Google Fonts:**
- Inter: Primary UI font
- JetBrains Mono: Monospace font for text comparison areas

**Database (Configured but Inactive):**
- PostgreSQL via Neon serverless driver
- Drizzle ORM with schema defined in `shared/schema.ts`
- Migration configuration in `drizzle.config.ts`
- Environment variable `DATABASE_URL` required for database connectivity

**Future Integration Points:**
- Database can be activated by provisioning PostgreSQL and running `npm run db:push`
- User authentication system (schema exists, implementation pending)
- Session management via connect-pg-simple
- API routes currently stubbed in `server/routes.ts`