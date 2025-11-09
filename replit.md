# ETKİNİUM - Music & Event Platform

## Overview

ETKİNİUM is a Turkish music and event platform that provides users with access to premium music content, live events, and ticket purchasing capabilities. The application features a modern dark-themed interface with a Spotify-inspired design, offering HD quality music streaming, live broadcasts, and secure ticket purchasing functionality. The platform includes an email subscription system for user engagement and notifications.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent, accessible design
- **Styling**: Tailwind CSS with custom color variables and dark theme support
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Forms**: React Hook Form with Zod validation for robust form handling
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework for RESTful API endpoints
- **Language**: TypeScript for type safety across the entire codebase
- **API Design**: RESTful architecture with structured error handling and request logging
- **Authentication**: Replit Auth (OpenID Connect) supporting Google, Apple, GitHub, X, Email/Password
- **Session Management**: PostgreSQL session store with 7-day cookie persistence, secure in production

### Database Schema
- **ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Schema Definition**: Shared schema definitions between client and server
- **Tables**:
  - `sessions`: Replit Auth session storage (sid, sess JSONB, expire timestamp)
  - `users`: User profiles from Replit Auth (id, email, firstName, lastName, profileImageUrl, points, timestamps)
  - `email_subscriptions`: Email subscription management with active status tracking
  - `contact_messages`: Contact form submissions
  - `partnership_applications`: Business partnership requests
  - `advertising_applications`: Advertising inquiries and applications
- **Validation**: Zod schemas for runtime type validation and error messages

### External Dependencies
- **Database**: Neon Database (PostgreSQL) for production data storage
- **UI Icons**: Lucide React for consistent iconography
- **Image Assets**: Unsplash integration for high-quality event and music imagery
- **Development Tools**: 
  - Replit-specific plugins for development environment integration
  - ESBuild for server-side bundling in production
  - PostCSS with Autoprefixer for CSS processing

### Recent Changes
- **Nov 09, 2025**: CUSTOM EMAIL/PASSWORD AUTHENTICATION COMPLETED
  - Full migration from Replit Auth to custom email/password system with bcrypt hashing
  - Created login page: email, password, "beni hatırla" checkbox, Enter key support, session 7-day max age
  - Created signup page: firstName, lastName, email, password with auto-login after registration
  - Updated database schema: password (hashed with bcrypt), phone, smsNotifications, emailNotifications fields added
  - Created profile page: displays points (read-only), email update form, phone number management
  - Created settings page: SMS/email notification preferences (checkboxes), contact info (iletisim@etkinium.com)
  - Header updated: User initials displayed (firstName[0] + lastName[0]) with dropdown menu
  - Dropdown structure: Profilim → Ayarlar → Contact info → Çıkış Yap
  - API endpoints: POST /api/register, POST /api/login, POST /api/logout, PATCH /api/user/profile
  - Created useAuth hook for consistent authentication state management across application
  - Removed "Reklam Alanı" badge from Konaklama/Seyahat sliders for cleaner professional appearance
- **Nov 09, 2025**: HEADER OPTIMIZATION & BANNER CLEANUP
  - Reorganized header layout: Logo+name (left) → Search bar (center, w-96) → All nav buttons (right)
  - Fixed duplicate X close button in advertising application dialog (reduced from 2 to 1)
  - Header now uses three-section layout: flex-shrink-0 (logo), flex-1 justify-center (search), flex-shrink-0 (buttons)
  - Wider search input (w-96) positioned centrally for better discoverability
  - Navigation buttons now properly grouped on right side of header
  - All banner sliders maintain consistent black/gold theme without distracting badges
  - E2E tests confirm single close button, centered search, clean banner design
- **Nov 09, 2025**: UNIFIED SLIDER STYLING & IMPROVED HEADER UX
  - Unified all sliders (Homepage, Konaklama, Seyahat) with consistent black/gold premium theme
  - Slider updates: bg-gradient-to-r from-black via-gray-900, border-4 border-accent-amber/60, golden glow effects
  - Fixed logo taşma (overflow) on Konaklama/Seyahat: reduced logo from w-32/w-40 to w-16 h-16 matching homepage
  - Enhanced header navigation: buttons right-aligned with flex-1 justify-end for clean layout
  - Expanded search input: w-56 → w-72 for better usability
  - Updated search placeholder: "Ara..." → "Keşfetmeye başla..." for engaging UX
  - Logo and brand name remain left-aligned, all navigation buttons clustered right
  - All sliders feature identical styling: rounded-xl, thick amber borders, drop-shadow effects on logos/text
- **Nov 09, 2025**: BANNER REDESIGN & HEADER NAVIGATION RESTRUCTURING
  - Redesigned homepage vertical slider with pure black/gold theme (removed red/orange gradients)
  - Removed logo frame/border - clean logo presentation with golden drop-shadow effects
  - Enhanced banner quality: border-4 thick amber border, golden glow effects (shadow-[0_0_30px])
  - Hover effects on banner for interactive premium feel
  - Restructured header navigation order: Arama → Konaklama → Seyahat → "Bizimle İletişime Geçin" dropdown → Üye Ol → Giriş Yap
  - Created "Bizimle İletişime Geçin" dropdown menu containing Hakkımızda and İletişim links
  - Updated both desktop and mobile navigation with consistent structure
  - Mobile navigation shows grouped section for contact dropdown items
- **Nov 09, 2025**: REPLIT AUTH MIGRATION & GOOGLE/APPLE LOGIN
  - Migrated from custom email/password to Replit Auth for multi-provider authentication
  - Now supports Google, Apple, GitHub, X, and Email/Password login through Replit OIDC
  - Added sessions table for PostgreSQL session storage with 7-day persistence
  - Updated users table schema: removed password/name, added firstName/lastName/profileImageUrl
  - Created server/replitAuth.ts with full OpenID Connect integration
  - Updated authentication endpoints: /api/login, /api/logout, /api/callback, /api/auth/user
  - Simplified login/signup pages to redirect to Replit Auth UI
  - Fixed secure cookie handling for development (HTTP) and production (HTTPS)
  - Public /api/auth/user endpoint returns null when not authenticated (no 401 errors)
  - Remember Me functionality built-in via 7-day session cookie maxAge
  - Header navigation updated: query key changed from /api/user to /api/auth/user
  - Created useAuth hook for consistent authentication state management
- **Nov 09, 2025**: ADVERTISING SYSTEM & VERTICAL SLIDER IMPLEMENTATION
  - Converted homepage slider back to vertical (up-down) transitions with compact 220px height
  - Reduced logo and text sizes for better visual balance (w-16 h-16 mobile, w-20 h-20 desktop)
  - Created AdvertisingButton reusable component with dialog form system
  - Implemented advertising application system: database table, API endpoint, form validation
  - Added "Reklam Vermek İçin Başvuru" button below sliders on Homepage, Konaklama, and Seyahat pages
  - Dialog features: X button for closing, form fields (name, email, company, message), gradient design
  - Database: advertising_applications table with PostgreSQL storage
  - API: POST /api/advertising endpoint with Zod validation
  - Button standardization: black background with amber hover effect maintained across platform
  - All features tested with E2E playwright: vertical slider animation, dialog functionality, form submission, multi-page integration
- **Nov 09, 2025**: UX IMPROVEMENTS & CONTENT ENHANCEMENT
  - Converted Seyahat page to Apple-style tab system with interactive content switching (Uçak, Otobüs, Deniz, Demir Yolları)
  - Updated Footer with "Bizi Takip Edin" social media section (X and Instagram links)
  - Enhanced legal pages (KVKK, Gizlilik Politikası, Kullanım Koşulları) to match detailed Çerez Politikası format
  - Updated SSS content: revised ETKİNİUM definition to emphasize AI-powered ecosystem, added blockchain/dynamic QR security question
  - All features tested and architect-approved with premium black/gold theme consistency
- **Nov 09, 2025**: PLATFORM EXPANSION COMPLETED
  - Added Seyahat (Travel) page with 8-second auto-rotating slider and four transportation modes (Uçak, Otobüs, Deniz Yolları, Demir Yolları)
  - Enhanced Konaklama slider with advertising slide featuring ETKİNİUM logo and partnership contact (iletisim@etkinium.com)
  - Reorganized Footer into 4-column layout with new "Destek & Yasal" section
  - Created Çerez Politikası (Cookie Policy) page with detailed information categories
  - Created SSS (FAQ) page with accordion-style interface covering 5 major categories
  - Added Seyahat navigation link to both desktop and mobile header menus
- **Oct 18, 2025**: SEO OPTIMIZATION COMPLETED
  - Added comprehensive meta tags (title, description, keywords) to index.html
  - Implemented Schema.org Organization JSON-LD markup with logo for Google search results
  - Added Open Graph and Twitter Card tags for social media sharing
  - Configured favicon and Apple touch icon
  - Enhanced About page with "Yönetim & CEO" section for keyword optimization
  - Integrated SEO keywords: etkinlik biletleri, konser biletleri, tiyatro biletleri, CEO, dijital biletleme
  - Meta description: "Tek Platform, Sonsuz Sanat – Türkiye'nin Yeni Nesil Dijital Biletleme Ekosistemi"
- **Aug 13, 2025**: PRODUCTION DEPLOYMENT COMPLETED - Site live on etkinium.com
- **Deployment Type Fixed**: Changed from STATIC to AUTOSCALE - server now running properly
- **Custom Domain**: DNS verification in progress for etkinium.com with GoDaddy integration
- **API Resolution**: 404 errors fixed - all endpoints returning 201/409 status codes correctly
- **Database**: PostgreSQL production database connected and storing form submissions
- **Performance**: 1vCPU/2GB RAM configuration optimized for cost efficiency
- **DNS Status**: A record (34.111.179.208) and TXT record configured, awaiting propagation
- **FINAL STATUS**: All critical issues resolved, site fully functional on Autoscale deployment

### Key Design Decisions
- **Monorepo Structure**: Client, server, and shared code in unified TypeScript project
- **Type Safety**: End-to-end TypeScript with shared schema definitions
- **Component System**: Modular UI components with variant-based styling using class-variance-authority
- **Responsive Design**: Mobile-first approach with Tailwind CSS breakpoints
- **Error Handling**: Centralized error handling with user-friendly Turkish language messages
- **Performance**: Optimized bundle splitting and lazy loading capabilities through Vite
- **SEO Strategy**: Comprehensive search engine optimization with Schema.org structured data, meta tags, and keyword-rich content for improved Google visibility and traffic growth
- **Authentication Strategy**: Replit Auth for simplified multi-provider OAuth integration, automatic token refresh, and secure session management with PostgreSQL persistence