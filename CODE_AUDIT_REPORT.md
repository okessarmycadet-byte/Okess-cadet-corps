# OKESS CADET CORPS — CODE AUDIT

Files inspected: 59
Audit date: 2026-11-19T12:21:05.760Z

> Read-only audit. No source files were edited or deleted.

## 1. Exact duplicate files

No exact duplicate files detected.

## 2. Potentially similar source files

No high-similarity source file pairs detected.

> Similarity is a rough token comparison, not proof of duplicate functionality.

## 3. Repeated long lines

No repeated long lines found.

## 4. CSS selectors appearing in multiple files

### .hero
- src/App.css
- src/index.css

### a
- src/App.css
- src/index.css

### .admin-logout
- src/admin/pages/AdminDashboard.css
- src/index.css

### .admin-topbar
- src/admin/pages/AdminDashboard.css
- src/index.css

### .admin-content
- src/admin/pages/AdminDashboard.css
- src/index.css

### .admin-welcome
- src/admin/pages/AdminDashboard.css
- src/index.css

### .admin-module-grid
- src/admin/pages/AdminDashboard.css
- src/index.css

### .admin-login-page
- src/admin/pages/AdminLogin.css
- src/index.css


## 5. Backup or old-file candidates

- src/components/shared/PlaceholderPage.tsx

## 6. Project file inventory

- README.md
- eslint.config.js
- index.html
- package-lock.json
- package.json
- scripts/audit-duplicates.mjs
- src/App.css
- src/App.tsx
- src/admin/components/AdminContentModule.css
- src/admin/components/AdminContentModule.tsx
- src/admin/components/AdminGuard.tsx
- src/admin/components/adminModules.ts
- src/admin/hooks/useAdminRole.ts
- src/admin/pages/AdminDashboard.css
- src/admin/pages/AdminDashboard.tsx
- src/admin/pages/AdminLogin.css
- src/admin/pages/AdminLogin.tsx
- src/admin/services/auditService.ts
- src/admin/services/authService.ts
- src/admin/services/contactAdminService.ts
- src/admin/services/contentService.ts
- src/admin/services/dashboardService.ts
- src/admin/services/donationAdminService.ts
- src/admin/services/notificationService.ts
- src/admin/types/permissions.ts
- src/app/App.tsx
- src/app/SiteLayout.tsx
- src/app/layouts/AdminLayout.tsx
- src/app/layouts/DonationLayout.tsx
- src/app/layouts/PublicLayout.tsx
- src/components/layout/PublicFooter.tsx
- src/components/layout/PublicHeader.tsx
- src/components/shared/EmptyState.tsx
- src/components/shared/LoadingState.tsx
- src/components/shared/PlaceholderPage.tsx
- src/components/shared/SectionShell.tsx
- src/donation-portal/pages/DonationPage.tsx
- src/donation-portal/pages/DonationResultPage.tsx
- src/index.css
- src/lib/supabase.ts
- src/lib/utils.ts
- src/main.tsx
- src/public-site/home/HomePage.tsx
- src/public-site/pages/PublicSectionPage.tsx
- src/services/analyticsService.ts
- src/services/archiveSearchService.ts
- src/services/contactService.ts
- src/services/eventService.ts
- src/services/generationService.ts
- src/services/memoryService.ts
- src/services/payments/donationService.ts
- src/types/index.ts
- supabase/migrations/001_initial_schema.sql
- supabase/migrations/002_storage_policies.sql
- supabase/migrations/003_content_timestamps.sql
- tsconfig.app.json
- tsconfig.json
- tsconfig.node.json
- vite.config.ts

## Audit limitations

- Similarity scores do not prove duplication.
- CSS selector matching is approximate.
- This audit does not determine whether a component is unused.
- It does not check database migration or security-policy duplication.
- No files were removed, renamed, or rewritten.
