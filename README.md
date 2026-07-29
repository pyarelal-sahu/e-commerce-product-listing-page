# E-Commerce Product Listing Page

A high-performance, responsive e-commerce product listing page built with React, Vite, and Material UI. This project demonstrates advanced frontend patterns including infinite scrolling, pagination, staggered animations, and internationalization (i18n).

## 🚀 Features

- **Dynamic Product Grid**: Displays 200 items with staggered entry animations for a polished feel.
- **Adaptive Layout**: 
  - **Mobile**: Infinite scroll with `IntersectionObserver` for seamless browsing.
  - **Desktop**: Clean pagination for structured navigation.
- **Filtering & Sorting**: 
  - Filter by Category and Minimum Rating (0-5 stars).
  - Sort by Price (Low to High / High to Low).
  - "Show Favorites Only" toggle.
- **Persistent Favorites**: Save your favorite products; persistence is handled via Redux Toolkit and `localStorage`.
- **Performance Optimized**: 
  - Image lazy loading with MUI skeletons.
  - Optimized re-renders using centralized labels and decentralized i18n logic.
- **Refined UI/UX**: Built with Material UI (MUI) components and Tailwind CSS for utility styling.

## 🛠️ Tech Stack

- **Framework**: React 18 & Vite 4
- **State Management**: Redux Toolkit (RTK)
- **UI Components**: Material UI (MUI) v5
- **Styling**: Tailwind CSS
- **Animations**: CSS Motion Tokens & Framer-like transitions
- **Localization**: i18next & react-i18next

## 📦 Getting Started

### Prerequisites
- Node.js (v24.18.1 LTS recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/pyarelal-sahu/e-commerce-product-listing-page.git
   cd e-commerce-product-listing-page
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Building for Production
```bash
npm run build
```

## 📂 Project Structure

- `src/components/`: Reusable primitive components (ProductCard, LazyImage, etc.)
- `src/containers/`: Page-level components and features (ProductListingPage)
- `src/store/`: Redux slices and store configuration.
- `src/constants/`: Centralized labels and storage keys.
- `src/locale/`: JSON translation files.
- `src/utilities/`: Animation tokens and helper functions.


