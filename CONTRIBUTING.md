# Contributing to FUOYE Hostels 🇳🇬

First off, thank you for considering contributing to **FUOYE Hostels**! It's people like you that make open source such an incredible tool for solving real-world African student challenges.

This project is dedicated to providing Federal University Oye-Ekiti (FUOYE) students with transparent, scam-free off-campus lodge discovery while giving honest local caretakers an easy, mobile-friendly platform to list and manage available rooms.

---

## Code of Conduct

By participating in this project, you agree to abide by the terms of our [Code of Conduct](CODE_OF_CONDUCT.md). Please treat all contributors, reviewers, and users with kindness and mutual respect.

---

## How Can I Contribute?

* **Bug Fixes**: Resolve broken links, layout overflow, or TypeScript type issues.
* **Feature Enhancements**: Help implement Supabase persistence, roommate split boards, PWA offline caching, or new campus mapping.
* **UI/UX Polish**: Improve accessibility, micro-animations, or mobile responsiveness per Apple HIG.
* **Data Curation**: Add accurate local knowledge of FUOYE student zones (Phase 1, Phase 2, Falagun, Ayegbaju, Ikole).
* **Documentation**: Improve README, add comments, or write setup guides.

---

## Local Development Setup

### 1. Prerequisites
* **Node.js**: v18.17.0 or later (v20+ recommended)
* **npm**: v9 or later (or `pnpm` / `yarn`)
* **Git**: Installed and configured

### 2. Fork and Clone
```bash
# 1. Fork the repository on GitHub, then clone your fork locally:
git clone https://github.com/YOUR_USERNAME/hostel-finder-ng.git

# 2. Navigate into the directory:
cd hostel-finder-ng

# 3. Create a feature branch:
git checkout -b feat/your-feature-name
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run the Dev Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser. (We recommend using Chrome/Edge DevTools in **Responsive/Mobile View** to test touch targets and mobile sheet behaviors).

---

## Design & Engineering Guidelines

When contributing code, please follow these core principles:

### 1. Mobile-First & Apple Human Interface Guidelines (HIG)
* **Touch Targets**: All interactive elements (buttons, pills, tabs) must have a minimum tap target of **44x44 pt** (`touch-target` / `min-h-[44px]`).
* **Visual Hierarchy**:
  * Headings, brand titles, and numerical prices: **Montserrat** (`font-display font-extrabold` / `font-bold`).
  * Body text, metadata, and labels: **Inter** (`font-sans`).
* **Clean Hairline Dividers**: Use `border border-line` (`#e6e9f0`) and the soft surface background (`#f6f8fc`). Avoid heavy dark drop shadows.
* **Active Feedback**: Use subtle micro-interactions (e.g. `active:scale-[0.98]` or `active:opacity-80`).

### 2. Iconography: Google Material Symbols Rounded
* Do not import arbitrary icon packages or raw SVGs.
* Use the centralized `<MaterialIcon name="..." size={...} fill={...} />` component located in [`app/components/MaterialIcon.tsx`](app/components/MaterialIcon.tsx).
* On hostel cards, facility items must remain **icons only** to preserve clean mobile screen density. Detailed descriptions belong in the modal sheet.

### 3. TypeScript Strictness
* Ensure all data models and props adhere to types defined in [`app/types.ts`](app/types.ts).
* Verify zero type errors before submitting:
  ```bash
  npx tsc --noEmit
  ```

---

## Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

* `feat:` A new user-facing feature (e.g. `feat(portal): add quick rent price edit`)
* `fix:` A bug fix (e.g. `fix(modal): resolve scroll cut off above action bar`)
* `docs:` Documentation only changes (e.g. `docs: update setup steps in readme`)
* `style:` Formatting, white-space, missing semi-colons (no code logic changes)
* `refactor:` Code restructuring without fixing a bug or adding a feature
* `test:` Adding missing tests or correcting existing tests
* `chore:` Updating build scripts, dependencies, or tool configurations

---

## Pull Request Process

1. **Verify the Production Build**:
   ```bash
   npm run build
   ```
   Ensure the Next.js production build exits with **code 0** and zero compilation or lint errors.

2. **Push to Your Fork**:
   ```bash
   git add .
   git commit -m "feat(scope): concise description of changes"
   git push origin feat/your-feature-name
   ```

3. **Open a Pull Request**:
   * Open a PR against the `main` branch.
   * Provide a clear description of the problem solved and test steps taken.
   * Attach mobile screenshots or recordings where visual UI changes are made.

---

## Questions or Need Help?

Join discussions on our GitHub Issues page. We welcome questions from developers of all skill levels!
