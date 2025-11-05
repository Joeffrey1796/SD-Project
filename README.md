# Sideway's Cafe — Website Overview

Sideway's Cafe is a small, visually-driven static site built to showcase a cozy coffee shop concept inspired by Starbrew. The site is intended as a polished demo of a local cafe's online presence: branding, menu, customer voices, and contact—presented with clean typography, warm imagery, and minimal JavaScript for interactive touches.

What this site communicates
- A friendly, artisanal cafe identity — hero imagery, core values, and a concise about section.
- A curated menu that emphasizes categories (coffee, tea, pastries) and highlights featured items.
- Realistic customer reviews showcased in a carousel to build trust.
- A simple contact/feedback experience for reservations, questions, or user comments.

Key pages and content
- Home (index.html): hero, highlights, and customer reviews.
- Menu (menu.html): data-driven menu with search, filters, and item detail modals.
- About (about.html): story, team, and brand tone.
- Contact (contact.html): feedback form and location/map.

Notable design & technical choices
- Static-first: plain HTML/CSS with small vanilla JS modules for interactivity — easy to inspect and adapt.
- Data separation: menu and reviews are JSON-driven (src/data/) so content edits don't require DOM hacking.
- Modular CSS: base, components, layout and page-specific styles split under src/css for maintainability.
- Progressive enhancement: core content is accessible without JS; scripts add enhancements (modals, carousel, sticky filters).

Who this is for
- Designers or developers building a small business landing site.
- Instructors or students using a compact static project as a learning example.
- Cafe owners who want a simple, maintainable portfolio-style web presence.

Where to edit content
- Menu items: src/data/menu.json
- Reviews: src/data/reviews.json
- Images and media: src/assets/

Extensibility
- Add pages or sections by following existing HTML structure and CSS conventions.
- Replace JSON data to change menu/reviews without touching UI scripts.
- Swap assets and adjust CSS variables to retheme quickly.


Credits
- Built as a static demo for a cafe concept; imagery and copy are placeholders and intended for demo use.