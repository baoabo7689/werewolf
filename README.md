# Werewolf

## Summary

Werewolf is a web application built with Next.js and Tailwind CSS, designed to provide an interactive experience for the classic party game Werewolf. The app features card galleries, language support, and user authentication, making it easy to play and manage games online.

## Details

- **Framework:** Next.js (TypeScript)
- **Styling:** Tailwind CSS
- **Authentication:** Google OAuth (see `src/utilities/googleAuth.ts`)
- **Internationalization:** English and Vietnamese support (see `src/i18n/`)
- **Components:**
  - Card gallery and popup (`src/components/CardsGallery.tsx`, `CardImagePopup.tsx`)
  - Header, language switcher, help, and signup buttons
- **Configuration:**
  - Top menu configuration (`src/configs/topMenusConfig.ts`)
  - Card images and assets in `public/images/cards/`
- **Getting Started:**

1.  Install dependencies: `npm install`
2.  Run the development server: `npm run dev`
3.  Build for production: `npm run build`
4.  Visit the app at `http://localhost:3000`
