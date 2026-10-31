<div align="center">

# 🏡 FUOYE Hostels (Open Source)
### Transparent Student Accommodation & Caretaker Portal for Federal University Oye-Ekiti 🇳🇬

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Apple HIG](https://img.shields.io/badge/Apple_HIG-Mobile_First-000000?style=for-the-badge&logo=apple)](https://developer.apple.com/design/human-interface-guidelines/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](LICENSE.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](CONTRIBUTING.md)

<p align="center">
  <b>Eliminating agent exploitation, opaque "inspection form fees", and utility surprises for FUOYE students across Oye Main Campus & Ikole Campus.</b>
</p>

[Quickstart](#-quickstart) •
[Features](#-key-features) •
[Agent Portal](#-agent--caretaker-management-portal) •
[Architecture](#-project-structure) •
[Contributing](#-contributing) •
[Roadmap](#-open-source-roadmap)

</div>

---

## 📖 About The Project

Off-campus lodge hunting in Nigerian universities—especially at the **Federal University Oye-Ekiti (FUOYE)**—is notorious for hidden exploitation. Students face arbitrary "non-refundable inspection forms", surprise legal fees, and misleading claims about electricity and borehole water.

**FUOYE Hostels** is the open-source version of our student housing startup. It provides a community-driven, transparent platform where:
1. **Students** discover verified lodges around **Phase 1 Gate**, **Phase 2 Gate**, **Falagun**, **Ayegbaju Road**, **Ilupeju Road**, and **Ikole Campus** with upfront Total Package calculations.
2. **Caretakers & Agents** list available rooms with real device photos, manage availability (`Available` vs `Taken`), and receive direct, pre-formatted inspection inquiries on WhatsApp.

---

## ✨ Key Features

### 📱 1. Mobile-First Apple Human Interface Guidelines (HIG)
* **Touch-Friendly Navigation**: Strictly built with minimum 44x44pt tap targets (`min-h-[44px] touch-target`).
* **iOS Segmented Campus Control**: Switch between **Oye Main Campus** and **Ikole Campus** with native feel.
* **Translucent Materials**: `backdrop-blur-xl bg-white/90` navigation bar and iOS modal sheet design with pull indicators.
* **Typography**: **Montserrat** (`font-display`) for bold titles, logo, and price figures; **Inter** (`font-sans`) for body copy and metadata.

### 🏷️ 2. Icon-Only Facility Representation on Cards
* **Clean Density**: On hostel cards, facility amenities (24/7 Solar, Deep Borehole, Personal Prepaid Meter, Security Guard, Balcony, Kitchen) are represented **strictly by Google Material Symbols Rounded**.
* **Full Detailed Breakdown**: Opening the lodge sheet expands each facility into a detailed description explaining exactly how power and water operate in that compound.

### 💰 3. "Total Package" Transparent Calculator
* Removes Nigerian rental fee surprises by calculating:
  $$\text{Total Move-In Package} = \text{Annual Rent} + \text{Refundable Caution Fee} + \text{Legal \& Agency Fee} + \text{Service Charge}$$
* Displays year 2 renewal savings (no second-time agency or contract fees).

### 📸 4. Native Device Photo Upload
* Caretakers and agents can upload pictures directly from their mobile camera or photo gallery.
* Real-time image previews with a "Cover Photo" indicator and individual remove buttons.

### 🛡️ 5. Agent & Caretaker Management Portal
* Switch between **Student Discovery** and **Agent Portal** with one tap in the navbar.
* **One-Tap Availability Toggle**: Switch lodges between `🟢 Available` and `🔴 Taken / Occupied`. Marked lodges update immediately across the app so students aren't calling for filled rooms.
* **Inline Price Editing**: Update rent prices on the fly without deleting listings.
* **Metrics Overview**: Track total listings, vacant count, occupied count, and student WhatsApp clicks.

### 💬 6. Direct WhatsApp Inspection Scheduling
* One-click WhatsApp link generates pre-formatted inspection messages with property title, campus zone, rent, and student inquiry.
* Direct phone call button for urgent reach.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router, React 18) |
| **Styling** | [Tailwind CSS 3.4](https://tailwindcss.com/) with custom semantic tokens (`surface`, `ink`, `muted`, `line`, `brand`) |
| **Icons** | [Google Material Symbols Rounded](https://fonts.google.com/icons) |
| **Typography** | [Montserrat](https://fonts.google.com/specimen/Montserrat) (Display) & [Inter](https://fonts.google.com/specimen/Inter) (Body) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) (Strict Mode) |
| **Design Standard** | [Apple Human Interface Guidelines (HIG)](https://developer.apple.com/design/human-interface-guidelines/) |

---

## 🚀 Quickstart

### Prerequisites
* [Node.js](https://nodejs.org/) (v18.17.0+ or v20+)
* npm (v9+) or pnpm / yarn

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/hostel-finder-ng.git

# 2. Enter project folder
cd hostel-finder-ng

# 3. Install dependencies
npm install

# 4. Copy environment configuration
cp .env.example .env.local

# 5. Start development server
npm run dev
```

Visit **[http://localhost:3000](http://localhost:3000)** in your browser.

> [!TIP]
> Open your browser's Developer Tools (`F12`) and switch to **Responsive / Mobile Device View** (iPhone / Galaxy) to experience the mobile-first sheet interactions and bottom action bar.

### Production Build
```bash
npm run build
npm run start
```

---

## 📂 Project Structure

```text
hostel-finder-ng/
├── .github/                      # GitHub issue and PR templates
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   └── pull_request_template.md
├── app/                          # Next.js App Router
│   ├── components/               # Modular UI Components
│   │   ├── AddListingModal.tsx   # Device photo upload & lodge listing form
│   │   ├── AgentDashboard.tsx    # Caretaker management & availability portal
│   │   ├── HeroSearch.tsx        # iOS segmented campus search & filters
│   │   ├── HostelCard.tsx        # Mobile-first card with icon-only facilities
│   │   ├── HostelDetailModal.tsx # Full facility sheet with sticky action footer
│   │   ├── MaterialIcon.tsx      # Google Material Symbols helper component
│   │   ├── Navbar.tsx            # Apple HIG header with mode switcher
│   │   ├── SafetyBanner.tsx      # Student anti-scam inspection warning
│   │   └── TotalPackageCalculatorModal.tsx # Grouped fee breakdown modal
│   ├── data/
│   │   ├── campuses.ts           # FUOYE Oye & Ikole campus and area definitions
│   │   ├── facilities.ts         # Material Symbol facility definitions
│   │   └── hostels.ts            # Realistic seed lodges across Phase 1, Phase 2, etc.
│   ├── globals.css               # Apple HIG touch utilities & font assignments
│   ├── layout.tsx                # Google Fonts & Material Symbols imports
│   ├── page.tsx                  # Core application orchestration & state
│   └── types.ts                  # TypeScript interface definitions
├── .env.example                  # Environment template
├── .gitignore                    # Git ignore file
├── CONTRIBUTING.md               # Open source contribution guidelines
├── CODE_OF_CONDUCT.md            # Contributor Covenant Code of Conduct
├── LICENSE.md                    # MIT License
├── package.json                  # Dependencies and scripts
└── tailwind.config.js            # Design tokens & color scale
```

---

## 🗺️ Open Source Roadmap

- [x] Mobile-first Apple HIG responsive architecture
- [x] Specific campus mapping for FUOYE (Oye Main & Ikole)
- [x] Google Material Symbols Rounded integration
- [x] Icon-only card facilities with full detailed modal sheet
- [x] Caretaker portal with availability toggle (`Available` vs `Taken`)
- [x] Native device photo upload (Camera & Gallery)
- [ ] **Phase 2: Backend Persistence**:
  - [ ] Connect Supabase PostgreSQL database tables
  - [ ] Cloudinary / Supabase Storage image CDN upload
- [ ] **Phase 3: Student Features**:
  - [ ] Roommate / Bedspace split board ("Find a coursemate to split rent")
  - [ ] Crowdsourced Light & Water report card
  - [ ] Faculty proximity calculator (distance from Faculty of Science/Law/Engineering)
- [ ] **Phase 4: Progressive Web App (PWA)**:
  - [ ] Offline caching for poor campus gate connectivity
  - [ ] Install to home screen prompt on iOS/Android

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Please review our [Contributing Guidelines](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) before opening a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feat/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: add some amazing feature'`)
4. Push to the Branch (`git push origin feat/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE.md`](LICENSE.md) for more information.

---

<p align="center">
  Built with ❤️ for <b>Federal University Oye-Ekiti (FUOYE)</b> students & caretakers.
</p>
