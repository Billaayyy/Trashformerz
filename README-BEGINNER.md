# TRASHFORMERS — Beginner Guide

Welcome! This short guide shows where to edit CONTENT, DESIGN, and FUNCTIONALITY in this project.

- Tech stack: React + TypeScript + Vite + Tailwind (UI components from shadcn).
- You can mostly treat TS like JS: if types confuse you, just write normal code — it will still work here.

## What to edit

1) Page content (headings, texts, sections)
- File: src/pages/Index.tsx
- Sections: Hero, About, Our Vision, People, Join Us
- Change copy directly in the JSX strings.

2) Event cards (image, location, deadline, details text, join link)
- File: src/components/EventCard.tsx
- Props used in Index.tsx when placing cards. Duplicate a card to add a new event.

3) Registration page (after clicking Join)
- File: src/pages/events/Register.tsx
- Currently a simple placeholder. Replace with your form when ready.

4) Routes (URLs)
- File: src/App.tsx
- Add new pages by adding a new <Route path="..." element={<YourPage />} />.

5) Design and theme (colors, spacing, fonts)
- Tailwind tokens: src/index.css (CSS variables) and tailwind.config.ts (theme setup)
- Buttons and UI variants: src/components/ui/button.tsx and other files in src/components/ui
- Edit classes in components to change layout and spacing.

6) Navbar links
- File: src/components/Navbar.tsx
- Anchors navigate to sections on the home page.

## How to add a new event (quick steps)
1. Open src/pages/Index.tsx, find the Join Us section.
2. Add another <EventCard ... /> with your values:
   - slug: used in the URL after /register/
   - title, imageSrc, location, deadline, description
3. Start dev server: npm run dev
4. Visit /#join. The Join button goes to /register/your-slug.

## Build & run
- Install: npm i
- Dev server: npm run dev
- Publish: use the Publish button in Lovable.

Tip: If a component import looks scary with types, ignore types and focus on the JSX (HTML-like code) and Tailwind classes.
