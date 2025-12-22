# App Theme and Style Documentation

This document provides a detailed overview of the theme and styling architecture used in the **CoreUI Free React Admin Template** currently implemented in this project. You can use this guide to replicate the UI/UX in another TypeScript React project.

## 1. Overview
The application uses **CoreUI for React v5**, a comprehensive UI component library based on Bootstrap but optimized for React. It provides a modern, responsive admin dashboard layout with a clean aesthetic.

*   **Framework**: [CoreUI for React](https://coreui.io/react/)
*   **Version**: v5.x
*   **Build Tool**: Vite
*   **Styling Engine**: SCSS (Sass) + CSS Variables

## 2. Styling Architecture

The project primarily uses **SCSS** (Sass) for styling, leveraging CoreUI's built-in styles and variables.

### Entry Point
The main style entry point is `src/scss/style.scss`. This file imports the core library styles:

```scss
// src/scss/style.scss
@use "@coreui/coreui/scss/coreui" as * with (
  $enable-deprecation-messages: false,
);
@use "@coreui/chartjs/scss/coreui-chartjs";
@use "vendors/simplebar";

// Custom overrides likely follow here
```

### CSS Variables (Theming)
CoreUI v5 relies heavily on **CSS Custom Properties (Variables)** for theming (Colors, Spacing, Typography). This allows for dynamic runtime theme switching (Light/Dark mode).

**Common Variables:**
*   `--cui-body-bg`: Background color of the page.
*   `--cui-text-color`: Main text color.
*   `--cui-primary`: Primary theme color.
*   `--cui-secondary`: Secondary theme color.

### Dark Mode
Dark mode is implemented using the `color-mode` mixin or by overriding variables under a `[data-coreui-theme="dark"]` selector.

```scss
@include color-mode(dark) {
  body {
    background-color: var(--cui-dark-bg-subtle);
  }
}
```

### Tailwind CSS (Current State)
*   **Status**: Mixed/Partial.
*   **Observation**: `tailwindcss` is installed and imported in `App.js` (`import './tailwind.css'`), but a `tailwind.config.js` file is missing from the project root.
*   **Recommendation**: If you want to use Tailwind in your new project *alongside* CoreUI, ensure you configure `prefix` (e.g., `tw-`) in Tailwind to avoid class name conflicts with CoreUI/Bootstrap.

## 3. Component Usage (CoreUI)

The UI is built using pre-styled React components prefixed with `C`.

**Example: Navigation Item**
```jsx
import { CNavItem } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSpeedometer } from '@coreui/icons'

<CNavItem>
  <CIcon icon={cilSpeedometer} customClassName="nav-icon" />
  Dashboard
</CNavItem>
```

**Example: Layout**
The app uses a wrapper structure:
*   `AppSidebar`: The side navigation.
*   `AppHeader`: The top navigation bar.
*   `AppContent`: The main router view.
*   `AppFooter`: The footer area.

## 4. How to Replicate in a New TypeScript Project

To use this theme in a new TypeScript React project, follow these steps:

### Step 1: Install Dependencies
```bash
npm install @coreui/react @coreui/coreui @coreui/icons @coreui/icons-react @coreui/utils chart.js @coreui/chartjs react-router-dom sass
```

### Step 2: Copy SCSS Structure
Copy the `src/scss` folder from this project to your new project's `src` folder.
*   Ensure `style.scss` imports `@coreui/coreui/scss/coreui`.

### Step 3: Setup Global Styles
In your main entry file (`main.tsx` or `App.tsx`):
```tsx
import '@coreui/coreui/dist/css/coreui.min.css' // Optional if not using SCSS
import './scss/style.scss' // If using SCSS (Recommended for customization)
```

### Step 4: Use Components
Import components from `@coreui/react` and icons from `@coreui/icons-react`.

```tsx
import { CButton } from '@coreui/react'

const MyComponent = () => {
  return <CButton color="primary">Click Me</CButton>
}
```

## 5. File Structure Reference
*   `src/layout/DefaultLayout.js`: Main layout wrapper.
*   `src/routes.js`: Route definitions.
*   `src/_nav.js`: Navigation menu configuration.
*   `src/scss/`: Custom styles and overrides.
