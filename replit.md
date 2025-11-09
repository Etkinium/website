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
- **Data Storage**: In-memory storage implementation with interface for future database integration
- **Session Management**: Express sessions with PostgreSQL session store configuration

### Database Schema
- **ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Schema Definition**: Shared schema definitions between client and server
- **Tables**:
  - `users`: User authentication with username/password
  - `email_subscriptions`: Email subscription management with active status tracking
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
- **Nov 09, 2025**: PLATFORM EXPANSION COMPLETED
  - Added Seyahat (Travel) page with 8-second auto-rotating slider and four transportation modes (Uçak, Otobüs, Deniz Yolları, Demir Yolları)
  - Enhanced Konaklama slider with advertising slide featuring ETKİNİUM logo and partnership contact (iletisim@etkinium.com)
  - Reorganized Footer into 4-column layout with new "Destek & Yasal" section
  - Created Çerez Politikası (Cookie Policy) page with detailed information categories
  - Created SSS (FAQ) page with accordion-style interface covering 5 major categories
  - Added Seyahat navigation link to both desktop and mobile header menus
  - All features tested and architect-approved with premium black/gold theme consistency
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