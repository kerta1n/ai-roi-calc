# AI Phone Agent ROI Calculator

## Overview

This is a single-page web application (SPA) that implements a "Problem-Agitation-Solution" marketing framework to demonstrate the ROI of AI phone agents for service-based businesses. The application features two sequential calculator sections: a Missed Revenue Calculator that quantifies financial losses from missed calls, and an ROI Calculator that demonstrates the potential return on investment from implementing an AI phone agent solution.

The application is built as a sales demonstration tool designed to guide users through a narrative journey from identifying their current revenue loss to understanding the financial benefits of the proposed AI solution.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool

**Rationale**: Vite provides fast development experience with hot module replacement. React with TypeScript ensures type safety and component-based architecture suitable for interactive calculators.

**UI Library**: Shadcn UI components built on Radix UI primitives

**Design System**: Material Design principles adapted for B2B sales tools, using the "new-york" style variant. The design emphasizes clarity, trust, and professionalism over visual flair.

**Styling**: Tailwind CSS with custom design tokens for colors, spacing, and typography

**Key Design Decisions**:
- Typography uses Inter for primary text and JetBrains Mono for numerical displays to ensure tabular alignment and readability
- Two-column grid layout (inputs on left, metrics on right) on desktop with single-column stack on mobile
- Sticky positioning for metrics display on desktop to keep results visible during input
- Custom color system with HSL values and CSS variables for theme consistency

**State Management**: 
- Local component state using React hooks
- React Query for server state management and data fetching
- Prop drilling for parent-child component communication (recovery potential flows from MissedRevenueSection to ROISection)

**Routing**: Wouter for lightweight client-side routing (single route application)

**Data Visualization**: Recharts library for pie charts and bar charts displaying ROI metrics

### Backend Architecture

**Framework**: Express.js with TypeScript

**Server Setup**: 
- Custom Vite middleware integration for development
- Static file serving for production builds
- HTTP server using Node's built-in `http` module

**API Structure**: RESTful API with three endpoints:
- `POST /api/calculations` - Create new calculation
- `GET /api/calculations/:id` - Retrieve specific calculation
- `GET /api/calculations` - List all calculations

**Request Processing**:
- JSON body parsing with raw body preservation for webhook verification
- Request logging middleware that captures duration and response data
- Error handling with appropriate HTTP status codes

### Data Storage Solutions

**Current Implementation**: In-memory storage using `MemStorage` class

**Structure**:
- Map-based storage indexed by UUID
- Calculations stored with full snapshot of input and computed values
- Sorted by creation timestamp for listing

**Database Schema Design** (PostgreSQL via Drizzle ORM):
- Single `calculations` table with columns for:
  - Industry selection (nullable text)
  - Input metrics: missed calls, customer value, conversion rate
  - Calculated outputs: annual savings, additional revenue, annual cost
  - Metadata: UUID primary key, creation timestamp

**Rationale**: Schema stores both inputs and pre-computed values to enable historical tracking and avoid recalculation. Text fields used for numeric values to preserve exact user input without floating-point precision issues.

**Data Persistence**: Currently non-persistent (memory-only). Database configuration exists but storage implementation uses in-memory fallback, likely for development/demo purposes.

### Form Validation

**Library**: Zod for runtime schema validation

**Implementation**: Drizzle-Zod integration generates Zod schemas from database table definitions, ensuring consistency between API validation and database constraints.

### Component Architecture

**Atomic Design Pattern**:
- UI primitives (shadcn components in `/components/ui/`)
- Composite components (`InputGroup`, `MetricCard`, `HeroMetric`)
- Section components (`MissedRevenueSection`, `ROISection`)
- Page component (`ROICalculator`)

**Props Pattern**: Parent component manages shared state and passes data down:
- `ROICalculator` page orchestrates state flow between sections
- `MissedRevenueSection` calculates recovery potential and passes up via callback
- `ROISection` receives initial values and manages ROI calculations independently

**Industry-Specific Features**: 
- Industry selection triggers customized benefit lists
- Pre-defined benefit arrays for healthcare, legal, real estate, and home services
- Conditional rendering based on industry selection

### Build Configuration

**Development**:
- Vite dev server with HMR
- Replit-specific plugins for error overlay, cartographer, and dev banner
- Express server runs concurrently

**Production**:
- Vite builds client to `dist/public`
- esbuild bundles server code to `dist`
- Platform: Node.js with ES modules
- External packages not bundled (packages=external)

**Path Aliases**:
- `@/` → `client/src/`
- `@shared/` → `shared/`
- `@assets/` → `attached_assets/`

## External Dependencies

### Database

**Provider**: Neon (serverless PostgreSQL)
- Connection: `@neondatabase/serverless` package
- ORM: Drizzle ORM with PostgreSQL dialect
- Migrations: Drizzle Kit manages schema migrations in `./migrations`
- Connection string: Environment variable `DATABASE_URL`

**Note**: Database is provisioned but application currently uses in-memory storage implementation

### UI Component Library

**Radix UI**: Comprehensive set of unstyled, accessible component primitives
- 25+ component primitives (dialogs, dropdowns, tooltips, etc.)
- Built-in accessibility (ARIA attributes, keyboard navigation)
- Headless components allowing full styling control

**Shadcn UI**: Pre-styled Radix components following design system
- Configuration in `components.json`
- Components copied into project for full customization
- Tailwind-based styling with CSS variables for theming

### Visualization

**Recharts**: Chart library built on D3
- Used for pie charts (benefit breakdown) and bar charts (ROI comparison)
- Responsive containers for mobile compatibility
- Custom tooltips and legends

### Form Management

**React Hook Form**: Form state management
- `@hookform/resolvers` for Zod schema integration
- Reduces re-renders and improves performance

### Date Utilities

**date-fns**: Date manipulation and formatting
- Lightweight alternative to Moment.js
- Used for timestamp handling and display

### Development Tools

**Replit Integration**:
- `@replit/vite-plugin-runtime-error-modal` - Enhanced error display
- `@replit/vite-plugin-cartographer` - Code navigation
- `@replit/vite-plugin-dev-banner` - Development environment indicator

### Fonts

**Google Fonts CDN**:
- Inter: Primary UI font (weights 400-900)
- JetBrains Mono: Monospace font for numerical displays (weights 400-700)
- Preconnect optimization for faster loading

### Session Management

**connect-pg-simple**: PostgreSQL session store for Express
- Enables persistent sessions across server restarts
- Integrates with PostgreSQL database