// Generates index.html and work/*.html from content/site.mjs.
// Run with `node build.mjs`. Nothing else is needed — no deps, no toolchain.

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  profile,
  nav,
  toolbelt,
  projects,
  career,
  careerStats,
  contact,
} from "./content/site.mjs";

const root = dirname(fileURLToPath(import.meta.url));

/* ------------------------------------------------------------------ helpers */

const esc = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/* Social glyphs, drawn in the same outlined style as the Figma icon row. */
const socialIcon = {
  mail: '<path d="M2.6 4.9h18.8v14.2H2.6z" /><path d="m3.2 6 7.9 5.4a1.6 1.6 0 0 0 1.8 0L20.8 6" />',
  linkedin:
    '<rect x="2.6" y="2.6" width="18.8" height="18.8" rx="3" /><path d="M7 10.4v7.1M7 6.9v.2M11.6 17.5v-4.1a2.7 2.7 0 0 1 5.4 0v4.1M11.6 10.4v7.1" />',
  behance:
    '<path d="M2.6 5.9h5a2.9 2.9 0 0 1 0 5.9h-5zM2.6 11.8h5.5a3 3 0 0 1 0 6.1H2.6zM14.3 14.5h7a3.5 3.5 0 1 0-7 0c0 2 1.4 3.4 3.5 3.4 1.3 0 2.3-.4 2.9-1.3M15.4 6.6h4.8" />',
};

const social = (link) => `
          <a class="social" href="${esc(link.href)}"${
  link.href.startsWith("http") ? ' target="_blank" rel="noreferrer noopener"' : ""
}>
            <span class="visually-hidden">${esc(link.label)}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${
              socialIcon[link.icon] || ""
            }</svg>
          </a>`;

/* --------------------------------------------------------------- chrome bits */

const navBar = (base, { brandHref, home }) => `
      <nav class="nav" data-open="false">
        <span class="nav__corner nav__corner--tl" aria-hidden="true"></span>
        <span class="nav__corner nav__corner--tr" aria-hidden="true"></span>
        <span class="nav__corner nav__corner--bl" aria-hidden="true"></span>
        <span class="nav__corner nav__corner--br" aria-hidden="true"></span>

        <a class="nav__brand" href="${esc(brandHref)}">
          <img src="${base}assets/svg/logo-sparkle.svg" alt="" width="49" height="49" />
          Houssem
        </a>

        <button class="nav__toggle" type="button" aria-expanded="false" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>

        <ul class="nav__list">${nav
          .map(
            (item) => `
          <li><a class="nav__link" href="${esc(home + item.href)}"><span>${esc(item.label)}</span></a></li>`
          )
          .join("")}
          <span class="nav__marker" aria-hidden="true"></span>
        </ul>
      </nav>`;

const footer = (base, brandHref) => `
    <footer class="footer">
      <div class="shell footer__row">
        <a class="nav__brand" href="${esc(brandHref)}" style="padding:0">
          <img src="${base}assets/svg/logo-sparkle.svg" alt="" width="49" height="49" />
          Houssem
        </a>
        <p class="footer__line">${esc(profile.footerLine)}</p>
        <div class="footer__social">${profile.links.map(social).join("")}
        </div>
      </div>
    </footer>`;

const layout = ({ title, description, body, base = "", brandHref, home = "", bodyClass = "" }) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}" />
    <meta name="theme-color" content="#fefff0" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:type" content="website" />
    <link rel="icon" href="${base}assets/svg/logo-sparkle.svg" type="image/svg+xml" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="${base}assets/styles.css" />
  </head>
  <body${bodyClass ? ` class="${bodyClass}"` : ""}>
    <a class="skip" href="#main">Skip to content</a>

    <header class="nav-wrap">${navBar(base, { brandHref, home })}
    </header>

    <main id="main">
${body}
    </main>
${footer(base, brandHref)}

    <script src="${base}assets/main.js" defer></script>
  </body>
</html>
`;

/* ----------------------------------------------------------------- the index */

const decoration = (variant) =>
  `<img class="deco deco--${variant}" src="assets/svg/flower-pink.svg" alt="" aria-hidden="true" />`;

const heroSection = () => `
      <section class="section hero shell" id="about">
        ${decoration("a")}
        ${decoration("b")}
        <div class="hero__copy reveal">
          <img class="hero__sticker" src="assets/svg/sticker-sun-pink.svg" alt="" aria-hidden="true" />
          <h1 class="hero__title">${esc(profile.heroLead)} <mark>${esc(profile.heroHighlight)}</mark></h1>
          <p class="cta-group">
            <a class="btn" href="#work">See Portfolio</a>
            <img class="cta-group__spark" src="assets/svg/scribble-button.svg" alt="" aria-hidden="true" />
          </p>
        </div>

        <div class="hero__media reveal">
          <figure class="frame">
            <span class="frame__dot frame__dot--a" aria-hidden="true"></span>
            <span class="frame__dot frame__dot--b" aria-hidden="true"></span>
            <img
              class="frame__img"
              src="assets/img/avatar.png"
              alt="${esc(profile.name)}"
              width="420"
              height="404"
            />
            <img class="sketch" src="assets/svg/frame-border.svg" alt="" aria-hidden="true" />
            <span class="frame__badge" aria-hidden="true">
              <img src="assets/svg/badge-bulb.svg" alt="" />
            </span>
            <img class="frame__arc" src="assets/svg/squiggle-arc.svg" alt="" aria-hidden="true" />
            <img class="frame__star" src="assets/svg/star-red.svg" alt="" aria-hidden="true" />
          </figure>
        </div>
      </section>`;

const bandSection = () => {
  const group = `<div class="band__group">${toolbelt
    .map((tool) => `<span>${esc(tool)}</span>`)
    .join("")}</div>`;

  return `
      <div class="band" aria-label="Tools I work with">
        <div class="band__track">${group}${group}</div>
      </div>`;
};

const projectCard = (project) => `
          <a class="card reveal" href="work/${esc(project.slug)}.html">
            <span class="card__media">
              <img src="${esc(project.thumb)}" alt="${esc(`${project.name} — ${project.tagline}`)}" loading="lazy" width="464" height="293" />
            </span>${
              project.draft
                ? `
            <span class="card__flag">Write-up coming</span>`
                : ""
            }
            <span class="card__foot">
              <span class="card__text">
                <strong class="card__name">${esc(project.name)}</strong>
                <span class="card__tagline">${esc(project.tagline)}</span>
              </span>
              <span class="card__arrow" aria-hidden="true">
                <img src="assets/svg/arrow-ne.svg" alt="" />
              </span>
            </span>
            <img class="sketch" src="assets/svg/frame-border.svg" alt="" aria-hidden="true" />
          </a>`;

const workSection = () => `
      <section class="section shell" id="work">
        ${decoration("d")}
        <div class="head head--center reveal">
          <h2 class="head__title">
            My Portfolio
            <img class="head__underline" src="assets/svg/underline.svg" alt="" aria-hidden="true" />
          </h2>
          <img class="head__sticker" src="assets/svg/sticker-sun-blue.svg" alt="" aria-hidden="true" />
        </div>

        <div class="work__grid">${projects.map(projectCard).join("")}
        </div>
      </section>`;

const careerSection = () => `
      <section class="section shell" id="career">
        ${decoration("c")}
        <div class="head reveal">
          <h2 class="head__title head__title--sm">Career</h2>
          <img class="head__smiley" src="assets/svg/smiley.svg" alt="" aria-hidden="true" />
        </div>

        <div class="career__grid reveal">
          <div class="career__stats">${careerStats
            .map(
              (stat) => `
            <div class="cell">
              <strong class="stat__value">${esc(stat.value)}</strong>
              <span class="stat__label">${esc(stat.label)}</span>
            </div>`
            )
            .join("")}
          </div>

          <div class="career__roles">${career
            .map(
              (role) => `
            <article class="cell">
              <span class="role__badge role__badge--${esc(role.tint)}" aria-hidden="true">
                <img src="assets/svg/icon-${esc(role.icon)}.svg" alt="" />
              </span>
              <h3 class="role__title">${esc(role.role)} @${esc(role.company)}</h3>
              <p class="role__meta">${esc(role.period)}</p>
              <p class="role__note">${esc(role.note)}</p>
            </article>`
            )
            .join("")}
          </div>
        </div>
      </section>`;

const contactSection = () => `
      <section class="section shell contact" id="contact">
        <div class="contact__box reveal">
          <h2 class="contact__title">${esc(contact.heading)}</h2>
          <p class="contact__body">${esc(contact.body)}</p>
          <p class="cta-group">
            <a class="btn" href="mailto:${esc(profile.email)}">${esc(contact.cta)}</a>
            <img class="cta-group__spark" src="assets/svg/scribble-button.svg" alt="" aria-hidden="true" />
          </p>
        </div>
      </section>`;

const indexPage = () =>
  layout({
    title: `${profile.name} — ${profile.role}`,
    description: profile.intro,
    brandHref: "#about",
    body: [heroSection(), bandSection(), workSection(), careerSection(), contactSection()].join("\n"),
  });

/* ------------------------------------------------------------- case studies */

const workSectionBlock = (section) => `
          <section class="work-section reveal">
            <h2 class="work-section__heading">${esc(section.heading)}</h2>
            ${
              section.body
                ? section.body.map((paragraph) => `<p>${esc(paragraph)}</p>`).join("\n            ")
                : ""
            }${
  section.list
    ? `<ul>
              ${section.list.map((item) => `<li>${esc(item)}</li>`).join("\n              ")}
            </ul>`
    : ""
}
          </section>`;

/* Screens from the project. `layout` is "wide" for desktop shots (two up) or
   "phone" for mobile screens (four up). */
const gallery = (project) => `

          <section class="work-section reveal">
            <h2 class="work-section__heading">Screens</h2>
            <div class="gallery gallery--${esc(project.gallery.layout)}">${project.gallery.items
              .map(
                (item) => `
              <figure class="gallery__item">
                <img src="../${esc(item.src)}" alt="${esc(item.caption)}" loading="lazy" />
                <figcaption>${esc(item.caption)}</figcaption>
              </figure>`
              )
              .join("")}
            </div>
          </section>`;

const workPage = (project, index) => {
  const previous = projects[index - 1];
  const next = projects[index + 1];

  const body = `
      <div class="section work-page shell">
        <a class="back" href="../index.html#work">All projects</a>

        <header class="work-hero">
          <p class="work-hero__eyebrow">${[project.role, project.timeframe].filter(Boolean).map(esc).join(" · ")}</p>
          <h1 class="work-hero__title">${esc(project.name)} — <mark>${esc(project.tagline)}</mark></h1>
          <p class="work-hero__summary">${esc(project.summary)}</p>
        </header>

        <figure class="work-shot reveal">
          <img src="../${esc(project.thumb)}" alt="${esc(`${project.name} — ${project.tagline}`)}" width="464" height="293" />
        </figure>
${
  project.draft
    ? `
        <p class="draft-note">
          This write-up is still a placeholder. The structure below matches the other case
          studies — replace the TODO copy in <code>content/site.mjs</code> and re-run
          <code>node build.mjs</code>.
        </p>`
    : ""
}
${
  project.stats
    ? `
        <div class="work-stats reveal">${project.stats
          .map(
            (stat) => `
          <div class="cell">
            <strong class="stat__value">${esc(stat.value)}</strong>
            <span class="stat__label">${esc(stat.label)}</span>
          </div>`
          )
          .join("")}
        </div>`
    : ""
}
        <div class="work-body">${project.sections.map(workSectionBlock).join("")}${
  project.gallery ? gallery(project) : ""
}

          <section class="work-section reveal">
            <h2 class="work-section__heading">Stack</h2>
            <ul class="chips">
              ${project.stack.map((item) => `<li class="chip">${esc(item)}</li>`).join("\n              ")}
            </ul>
          </section>${
  project.link
    ? `

          <p class="work-link reveal">
            <a class="btn" href="${esc(project.link.href)}" target="_blank" rel="noreferrer noopener">${esc(project.link.label)}</a>
          </p>`
    : ""
}
        </div>

        <nav class="work-nav">
          ${
            previous
              ? `<a class="work-nav__link" href="${esc(previous.slug)}.html"><small>Previous</small>${esc(
                  previous.name
                )} — ${esc(previous.tagline)}</a>`
              : "<span></span>"
          }
          ${
            next
              ? `<a class="work-nav__link" href="${esc(next.slug)}.html"><small>Next</small>${esc(
                  next.name
                )} — ${esc(next.tagline)}</a>`
              : "<span></span>"
          }
        </nav>
      </div>`;

  return layout({
    title: `${project.name} — ${project.tagline} · ${profile.name}`,
    description: project.summary,
    base: "../",
    brandHref: "../index.html",
    home: "../index.html",
    body,
  });
};

/* ---------------------------------------------------------------------- run */

const write = async (path, contents) => {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, contents, "utf8");
  console.log(`  ${path.replace(root, ".").replace(/\\/g, "/")}`);
};

console.log("Building…");
await write(join(root, "index.html"), indexPage());
await Promise.all(
  projects.map((project, index) =>
    write(join(root, "work", `${project.slug}.html`), workPage(project, index))
  )
);
console.log(`Done — 1 index + ${projects.length} case studies.`);
