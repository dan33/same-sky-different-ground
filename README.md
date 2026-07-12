# Same Sky, Different Ground — companion website

A self-contained static website for the book. No build step, no framework — plain
HTML/CSS/JS, so it can be hosted anywhere that serves static files.

## Structure (key pages)
```
website/
├── index.html         Home — hero + scrollytelling gradient + method + ecosystems
├── ecosystems.html    The six habitat cards (recognise / why / who / where)
├── explore-map.html   The maps — showcase of the book's map figures, tap-to-enlarge lightbox
├── the-book.html      What's inside + buy (EPUB)
├── app.html           The coming "Reading the Country" app
├── join.html          Email capture
├── about.html         About + "how it was made" note
└── assets/
    ├── style.css      Design system (matches the book cover/figures)
    ├── app.js         Scrollytelling + reveal-on-scroll
    ├── relief.webp    The canonical shaded relief (same master as book + app)
    └── figures/       The book's maps and diagrams (synced from ../assets/figures/)
```
(Plus field-guide, forces, wonders, this-month, in-flower, read-the-country, prints and 404/thanks pages — all the same plain-HTML pattern.)

**The maps:** `explore-map.html` showcases the canonical map figures — locality, ecological zones, geology, the gradient cross-section — each openable full-screen via a dependency-free in-page lightbox. The site shares the **one** canonical relief and palette with the book and the apps (`../assets/figures/MAP-STYLE.md`); re-copy the figures from `../assets/figures/` whenever they are regenerated.

## Preview locally
```bash
cd website && python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy (free options)
- **Cloudflare Pages** or **Netlify**: drag-and-drop the `website/` folder, or point it at this repo with the publish directory set to `website`.
- **GitHub Pages**: serve the `website/` folder.

## Before going live — two things to wire up
1. **Buy button** (`the-book.html`, the `#buy` section): replace the placeholder link with your
   real product link from **Gumroad**, **Payhip** or **Ko-fi** (all deliver an EPUB and take payment
   with no publisher cut). Set the price in the `.price` element.
2. **Sample chapter** and **contact/email** links (marked `href="#"`): point them at your free
   sample (e.g. a hosted PDF/EPUB of Chapter 7) and an email or newsletter signup.

## Notes
- Fonts load from Google Fonts; everything else is local, so the site works offline once fonts are cached.
- The figures are copied from `../assets/figures/`. Re-copy if you regenerate them.
