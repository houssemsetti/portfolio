# Houssem Setti — portfolio

Static portfolio site, second iteration. No framework, no dependencies, no build
toolchain beyond Node.

## Structure

```
content/site.mjs     All copy lives here — profile, nav, projects, career, contact.
build.mjs            Generates index.html and work/*.html from that content.
assets/styles.css    Design system (tokens at the top of the file).
assets/main.js       Progressive enhancement: press states, scrolling, reveals.
assets/img/          Avatar and project thumbnails, exported from Figma.
assets/svg/          Stickers, doodles, badges and the hand-drawn frame.
index.html           Generated — do not edit by hand.
work/*.html          Generated — do not edit by hand.
```

## Editing content

1. Edit `content/site.mjs`.
2. Run `node build.mjs`.
3. Refresh.

Adding a project is a new object in the `projects` array. The `slug` becomes the
URL (`work/<slug>.html`), the card in the grid and the prev/next links are wired
automatically. Each project takes `sections`, where a section has either `body`
(paragraphs) or `list` (arrow bullets), plus a `thumb` pointing at a file in
`assets/img/`.

Setting `draft: true` on a project adds a "Write-up coming" flag to its card and
a note at the top of its page.

A project can also take a `gallery` — `{ layout: "wide" | "phone", items: [{ src, caption }] }` —
rendered as a Screens section. `stats` and `timeframe` are optional.

## Previewing locally

Open `index.html` directly, or serve it:

```bash
npx serve .
# or
python -m http.server 4173
```

## Design notes

Taken from the Figma file (`Portfolio design V2`, node `46-590`). The web frame
is the source of truth for copy; the mobile frame only informs how things stack.

| Token | Value |
| --- | --- |
| Typeface | Space Grotesk (Google Fonts, 300–700) |
| Paper | `#fefff0` |
| Ink | `#000000` |
| Highlight | `#ffdc58` |
| Button | `#bae6ff` |
| Badges | `#ffdc58` `#c5a1ff` `#ff6258` `#61bcff` |

Everything scales fluidly — type, stroke weights and the gaps between them are
`clamp()`ed against the viewport, and the square project cards use container
queries so their text tracks the card rather than the page. There is no fixed
breakpoint soup: the layout collapses to one column at 860px (hero, career) and
760px (project grid), and the nav becomes a menu at 800px.

**Hand-drawn frames.** `assets/svg/frame-border.svg` is the sketchy outline that
overhangs the hero photo and each project card. It is positioned by the `.sketch`
class as a percentage overhang, so it stays in register at any size. It is only
used on square boxes — case-study hero shots use a plain heavy border instead,
because stretching the sketch to 16:9 distorts the strokes.

## Interaction model

Hover and press behaviour is modelled on the iOS kit:

- **Press.** Controls shrink under the pointer (`scale(0.94)` on buttons,
  `0.972` on cards) and spring back on release. A press is cancelled when the
  pointer leaves the control, the way UIKit cancels a touch.
- **Easing.** `--ease-ios` is the standard iOS transition curve;
  `--ease-spring` overshoots on release.
- **Scrolling.** "See Portfolio" scrolls to the project grid using an
  `easeOutExpo` tween that approximates `UIScrollView` deceleration, offset for
  the sticky nav. Longer trips take longer, capped at 1.1s.
- **Nav marker.** The yellow bar glides between nav items like a segmented
  control, driven by an `IntersectionObserver` on the sections.
- **Mobile menu.** Springs open from its top edge like a sheet.

All of it is gated behind `prefers-reduced-motion`. The scroll reveals are
scoped to a `.js-reveal` class that `main.js` only sets once the observer is
live, so a script failure leaves the page visible rather than blank.

## Deploying

The repository root is the site root — any static host works.

- **GitHub Pages:** push, then set Pages to serve from the branch root.
- **Netlify / Vercel:** build command `node build.mjs`, publish directory `.`.
- **Any host:** upload `index.html`, `work/` and `assets/`.
