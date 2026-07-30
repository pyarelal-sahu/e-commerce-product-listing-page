# E-Commerce Product Listing Page

A responsive e-commerce product listing experience built with React, Vite, and Material UI. The app focuses on a polished browsing flow with mobile infinite scroll, desktop pagination, animated cards, and a clean configurable filter bar.

## Live Demo

https://e-commerce-product-listing-page-x.netlify.app/

## Features

- **Responsive product grid** with adaptive layouts for mobile, tablet, and desktop.
- **Mobile infinite scroll** with progressive loading, in-grid skeleton placeholders, and a loading spinner.
- **Desktop pagination** with numbered navigation.
- **Filtering and sorting** for category, minimum rating, and price order.
- **Wishlist support** with favorite toggling and a persistent favorites count.
- **Favorites-only view** from the top toolbar.
- **Light/Dark theme toggle** in the app bar with animated switching.
- **Sticky app header and filter bar** for quick access while scrolling.
- **Lazy-loaded product images** with skeleton fallback and error state.
- **Image fallback handling** that shows a visible placeholder message when a product image fails to load.
- **Image loading progress feel** with smooth fade-in as images resolve.
- **Product card animations** with subtle entry motion and hover polish.
- **Localized labels** with i18next and centralized label constants.
- **Redux Toolkit state management** for products, filters, pagination, and favorites.
- **Soft MUI-themed UI** with theme tokens, custom paper shadows, and consistent spacing.

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 8
- **State Management**: Redux Toolkit
- **UI Library**: Material UI 9
- **Styling**: MUI `sx` system and app theme tokens
- **Localization**: i18next and react-i18next
- **Icons**: MUI icons

## Getting Started

### Prerequisites

- Node.js 24.18.1 or newer
- npm

Optional (recommended):

- nvm (`nvm use` reads the included `.nvmrc`)

### Install

```bash
nvm use
npm install
```

### Run Locally

```bash
npm run dev
```



## Project Structure

- `src/components/` - Reusable UI components such as product cards, skeletons, and lazy images.
- `src/containers/` - Page-level features and product listing orchestration.
- `src/RTK/` - Redux store and slices.
- `src/constants/` - Shared label keys and storage keys.
- `src/locale/` - Translation JSON files.
- `src/utilities/` - Theme configuration and motion helpers.

## Notes

- Favorites are stored locally so they persist between reloads.
- Mobile loading is optimized to avoid blank gaps while more products are fetched.
- Theme colors and fallback states are driven by MUI theme tokens.
