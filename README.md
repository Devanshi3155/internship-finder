# Responsive Internship Board

A fresher-friendly internship listing page built with plain HTML, CSS and JavaScript (no framework).

**Live preview:** _add your deployed URL here_

## Screenshots
Add three screenshots to a `screenshots/` folder and link them here:

| Mobile | Tablet | Desktop |
|---|---|---|
| ![Mobile](screenshots/mobile.png) | ![Tablet](screenshots/tablet.png) | ![Desktop](screenshots/desktop.png) |

## Features
- Search by role, company, city or skill
- Filter by domain and work mode, plus "Show saved only"
- Save internships (kept in `localStorage`)
- Empty state with a Clear filters button
- Error state with Try again (open the page with `?error=1` to preview it)
- Job-board style list that adapts from mobile to desktop; filters stack on mobile and sit in one row on desktop

## Accessibility
- Semantic landmarks: `header`, `main`, `footer`, `form role="search"`, `article` per card
- Every input has a visible `<label>`
- Skip link and visible focus outline
- `aria-live` result count, `aria-expanded` on details, `aria-pressed` on Save
- Respects `prefers-reduced-motion`

## Files
| File | Purpose |
|---|---|
| `index.html` | Page structure |
| `style.css` | Tokens, layout, responsive rules |
| `app.js` | Data, filtering, rendering, states |

## Run it
Open `index.html` in a browser. To deploy: push to GitHub, then Settings > Pages > Deploy from branch `main`.
