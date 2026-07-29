# Project Overview

This is a React application using JavaScript, Redux Toolkit, Tailwind CSS, and Material UI.

# Agent Instruction Loading

- Before making code changes in this repository, read this file and keep it in context for the working session
- Follow higher-priority system/developer/user instructions first, then this project guidance

# Core Principles

- Follow the existing project structure and patterns
- Keep components simple, readable, and reusable
- Separate service/data logic from UI rendering where the existing feature structure supports it
- Prefer consistency with the current codebase over introducing new patterns

# Component Guidelines

- Use functional components only
- Keep components small and focused
- Extract reusable components when duplication appears
- After refactors or shared-component extraction, remove unused imports, props, pass-through wrappers, and files instead of leaving redundant code behind
- Use PropTypes for component validation where appropriate
- Do not define unstable nested React components inside render paths; extract them to the file scope or a separate component file
- Keep component files readable: move complex mapping, formatting, validation, and transformation logic into colocated utility files or hooks
- Keep new or substantially changed source files to 300 lines or fewer; split code into focused components, hooks, services, or utilities when a file would exceed that limit. For legacy files already over 300 lines, avoid increasing them and extract touched logic when practical.
- Keep nested functions and control-flow blocks to 4 levels or fewer; extract helpers, guard clauses, or smaller components/hooks when logic would nest deeper.
- Add concise JSDoc to every function, React component, hook, and exported symbol; keep descriptions useful and update existing JSDoc when signatures or behavior change.
- Use `React.memo`, `useMemo`, and `useCallback` only when they solve a real rendering or dependency-stability issue in the surrounding code
- Prefer explicit prop contracts and sensible defaults over defensive optional chaining throughout JSX

# Component Structure

- Put page-level and feature-owned components under `src/containers/<feature>`
- Put shared, reusable, cross-feature components under `src/components`
- Keep feature-specific sub-components close to the screen that owns them, usually in a `components`, `hooks`, `utils`, `config`, or `service` subfolder
- Split large screens into a controller hook plus presentational components when state/actions and rendering are both growing
- Keep popup, drawer, table, form, and toolbar content as separate components when they are reused or when the parent screen becomes hard to scan
- Use existing component names and suffixes in the area being edited, such as `*Step`, `*Content`, `*Toolbar`, `*Popup`, `*Drawer`, `*Card`, `*Row`, `*Field`, `use*`, and `*Utils`

# State Management

- Redux is used primarily for backend-derived, session, and workflow state
- Most transient UI state should remain in local component state or Context
- Do NOT introduce Redux for ordinary UI state such as modal toggles, input values, filters, loaders, or temporary interaction state unless an existing pattern already does so
- When working with existing Redux-backed flows, preserve the current architecture instead of refactoring state ownership unless explicitly asked

# Existing State Patterns

- Redux store and slices live under `src/RTK`
- Backend/session/workflow data is commonly written into Redux slices
- Local `useState` and `useReducer` are used for component-level interaction state
- React Context is used for shared app/UI concerns such as modal, snackbar, loader, sidebar, and route-related state
- Data-fetching hooks often combine local loading state with Redux updates

# Styling

- Use Tailwind CSS primarily for layout, spacing, alignment, sizing, and utility classes
- Use Material UI as the main component system for UI primitives and structured components
- Prefer Tailwind for layout even when using Material UI components
- Follow the existing hybrid Tailwind + MUI approach already used in the codebase
- Do NOT try to force a Tailwind-only or MUI-only styling approach
- Prefer `rem` units for component sizing, spacing, sticky offsets, and responsive UI dimensions so the interface scales with the project root font-size rules
- Keep repeated `sx` objects as named constants outside the component when they are non-trivial or reused
- Use theme palette keys such as `primary.main`, `border.main`, `surface.main`, `text.light`, `error.main`, and existing local tokens instead of raw hex/rgb values
- Avoid one-off font sizing, weight, and color when an existing Typography variant communicates the same intent
- Use MUI icons from `@mui/icons-material` for actions when available
- Preserve existing hover, focus, disabled, loading, empty, and error states when changing visual components

# Material UI Usage

- Use Material UI for components such as typography, dialogs, drawers, buttons, icons, date pickers, accordions, and other structured UI elements
- Use Material UI form components only when explicitly required or when the surrounding feature already uses them
- Respect the existing MUI theme and shared theme utilities
- Follow existing usage of `sx`, `styled`, and theme-based variants where already established
- Refer to `src/utilities/muiTheme.js` to select the right typography variant based on font size, weight, and color
- Use theme palette tokens for colors; avoid hardcoded color values unless matching an established local pattern that cannot use a theme token
- Use existing MUI theme typography variants and button variants instead of one-off font/color/button styling whenever possible

# Tailwind Usage

- Use Tailwind for flex/grid layout, spacing, widths, positioning, and simple visual utilities
- Keep Tailwind usage aligned with the current codebase style
- Do not replace existing MUI styling patterns unless explicitly asked

# Responsive Behavior

- Be aware that Tailwind and MUI breakpoints are configured in a non-standard way in this project
- Do not introduce standard responsive assumptions without checking the current implementation first
- The root `html` font-size changes in `src/index.css`; use `rem`-based dimensions and offsets for UI that must scale consistently across screen sizes
- Prefer natural wrapping, min/max constraints, and existing responsive patterns before adding fixed breakpoints
- For toolbars and dense controls, prefer `flex-wrap`, grid minmax tracks, stable min/max widths, and natural wrapping over hard-coded viewport breakpoints
- For sticky elements, keep the sticky `top` value in the same unit system as the header it sits below
- Verify responsive changes at the widths where `src/index.css` changes root font-size: `1550px`, `1400px`, and `990px`

# Folder Structure

- `src/components` → reusable UI components and shared behaviors
- `src/containers` → feature/module screens and page-level flows
- `src/services` → shared API/service-layer wrappers used across features where applicable
- `src/RTK` → Redux store and slices
- `src/hooks` and `src/common-hooks` → custom hooks and shared logic
- `src/contexts` → app-level non-Redux context state
- `src/routing` → route composition and shells
- `src/constants` and `src/config` → static config and request mappings
- `src/assets` and `src/locale` → media and translations

# Feature-Level Pattern

- Follow the existing feature-level folder pattern already used in `src/containers`
- Keep feature-specific files grouped together when that matches the surrounding code
- Feature folders may contain the main screen/component, feature-specific service files, and utility files
- Prefer colocated files when editing an existing feature that already follows this pattern
- Use shared folders only when logic is clearly reused across multiple features
- When adding new files to a feature, mirror the naming pattern already used in that feature folder
- Keep config arrays, table columns, form field definitions, and popup config in colocated config files when the feature already has them
- Keep API adapters and backend mapping logic separate from display components
- Keep utility functions pure where possible and give them narrow inputs/outputs so they are easy to test and reuse

# Implementation Guidance

- Feature screens should generally live under `containers`
- Shared reusable building blocks should generally live under `components`
- Keep API and request logic where the existing feature pattern puts it: feature-local when scoped to one feature, shared services when reused
- Reusable async/data logic should go into hooks when that matches existing patterns
- Preserve the current flow where server data is fetched through hooks, feature services, or shared services and often stored in Redux
- Preserve local naming and colocation patterns used by the feature you are editing

- Hardcoded user-facing strings must come from the respective locale JSON file for i18n
- Use existing Typography variants from `src/utilities/muiTheme.js`
- Use existing form wrappers, modal/popup components, table components, snackbar/context utilities, and API utilities before creating new primitives
- Keep unrelated refactors out of task changes, especially in shared components, theme files, routing, and Redux slices
- When changing a shared component, inspect at least a couple of existing call sites to avoid regressions
- Preserve accessibility attributes and keyboard behavior for buttons, menus, dialogs, forms, tabs, accordions, and tooltips
- Use `console.warn` or `console.error` only when the ESLint configuration permits it and the message is genuinely useful

# Do Not

- Do NOT introduce new state management libraries
- Do NOT move existing patterns to a new architecture unless explicitly asked
- Do NOT assume Redux is strictly server-state-only
- Do NOT assume all shared state belongs in Redux
- Do NOT redesign styling architecture away from the existing Tailwind + MUI hybrid approach
- Do NOT move feature-local request logic into `src/services` unless there is a clear reuse case or explicit instruction
- Do NOT add hardcoded user-facing strings in JSX or config
- Do NOT add hardcoded colors or fixed pixel dimensions for scalable UI unless the surrounding code already requires that exact value
- Do NOT bypass ESLint warnings by disabling rules unless the reason is narrow, documented, and there is no cleaner local fix
- Do NOT run broad formatting over unrelated files

# ESLint And Formatting

- ESLint uses `eslint.config.js` with React, hooks, jsx-a11y, import, sonarjs, security, no-secrets, prettier, and unused-imports plugins
- Prettier uses `.prettierrc.js`: double quotes, semicolons, `printWidth: 100`, and sorted imports
- Run targeted lint for changed JS/JSX files when practical: `npx eslint path/to/file.jsx`
- Use `npm run lint` only when a broad repository check is needed
- Keep imports clean and sorted by Prettier; remove unused imports instead of leaving them for lint-staged
- Watch common enforced rules: `react/prop-types`, `react-hooks/rules-of-hooks`, `react-hooks/exhaustive-deps`, `no-console`, `eqeqeq`, `prefer-const`, `no-var`, `unused-imports/no-unused-imports`, `react/no-unstable-nested-components`, complexity, and cognitive-complexity

# Validation

- Follow the existing ESLint and Prettier configuration
- Keep changes minimal and consistent with surrounding code
- Do not modify files unless explicitly asked
- Run targeted ESLint for changed JavaScript/JSX files when practical
- For UI changes, validate the affected screen manually or with a focused browser/screenshot check when practical
- For responsive UI changes, verify the smallest relevant viewport and at least one width near the root font-size breakpoints
- For logic changes, add or update focused tests when there is existing nearby test coverage or meaningful regression risk
