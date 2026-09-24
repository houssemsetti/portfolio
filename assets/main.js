/* Progressive enhancement only — the page is complete without this file.
 *
 * The interaction model is lifted from the iOS Design Kit:
 *  - controls shrink under the finger and spring back when released
 *  - a press is cancelled if the finger slides off the control
 *  - the nav marker glides between items like a segmented control
 *  - scrolling uses the iOS deceleration curve rather than a linear tween
 */
(() => {
  "use strict";

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------------------------------------------------------------- press */

  /* iOS treats a touch as "cancelled" the moment it leaves the control, so
     the pressed state is dropped on leave / cancel as well as on release. */
  const PRESSABLE =
    ".btn, .card, .nav__link, .nav__brand, .nav__toggle, .social, .back, .work-nav__link, .peek-toggle";

  /* `pointerleave` also fires with the document itself as its target, which
     has no `closest`. */
  const pressableFrom = (event) =>
    event.target instanceof Element ? event.target.closest(PRESSABLE) : null;

  const press = (el) => el.classList.add("is-pressed");
  const release = (el) => el.classList.remove("is-pressed");

  document.addEventListener(
    "pointerdown",
    (event) => {
      const target = pressableFrom(event);
      if (target) press(target);
    },
    { passive: true }
  );

  ["pointerup", "pointercancel", "pointerleave", "dragstart"].forEach((type) => {
    document.addEventListener(
      type,
      (event) => {
        const target = pressableFrom(event);
        if (target) release(target);
      },
      { passive: true }
    );
  });

  /* A pointerup outside the document never bubbles to the element, so sweep
     anything still stuck in the pressed state. */
  window.addEventListener("blur", () => {
    document.querySelectorAll(".is-pressed").forEach(release);
  });

  /* Keyboard activation gets the same spring, briefly. */
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const target = pressableFrom(event);
    if (target) press(target);
  });
  document.addEventListener("keyup", (event) => {
    const target = pressableFrom(event);
    if (target) release(target);
  });

  /* -------------------------------------------------------------- scroll */

  /* Approximates the UIScrollView deceleration curve: fast start, long settle. */
  const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

  const navHeight = () => {
    const nav = document.querySelector(".nav");
    if (!nav) return 0;
    return nav.getBoundingClientRect().height + 48;
  };

  const scrollToEl = (el) => {
    const top = el.getBoundingClientRect().top + window.scrollY - navHeight();
    const destination = Math.max(0, Math.min(top, document.documentElement.scrollHeight - window.innerHeight));

    if (reduced.matches) {
      window.scrollTo(0, destination);
      return;
    }

    const start = window.scrollY;
    const distance = destination - start;
    if (Math.abs(distance) < 2) return;

    /* Longer trips decelerate for longer, capped so it never feels sluggish. */
    const duration = Math.min(1100, 420 + Math.abs(distance) * 0.28);
    const t0 = performance.now();

    const step = (now) => {
      const progress = Math.min(1, (now - t0) / duration);
      window.scrollTo(0, start + distance * easeOutExpo(progress));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;

    const id = link.getAttribute("href");
    if (!id || id === "#") return;

    const target = document.querySelector(id);
    if (!target) return;

    event.preventDefault();
    closeMenu();
    scrollToEl(target);

    /* Keep the URL and the focus ring in step with the jump. */
    history.replaceState(null, "", id);
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  });

  /* ------------------------------------------------------------ nav menu */

  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav__toggle");

  const closeMenu = () => {
    if (!nav || nav.dataset.open !== "true") return;
    nav.dataset.open = "false";
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  };

  if (nav && toggle) {
    toggle.addEventListener("click", () => {
      const open = nav.dataset.open !== "true";
      nav.dataset.open = String(open);
      toggle.setAttribute("aria-expanded", String(open));
    });

    document.addEventListener("click", (event) => {
      if (!nav.contains(event.target)) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  /* --------------------------------------------------------- sticky nav */

  /* Past the first few pixels of scroll the boxed nav grows into a thin
     full-width bar. The wrapper's height is pinned to its resting size first,
     so the bar slimming down never nudges the page under it. */
  const navWrap = document.querySelector(".nav-wrap");

  if (navWrap) {
    const lockHeight = () => {
      const stuck = navWrap.classList.contains("is-stuck");
      navWrap.classList.add("is-measuring");
      navWrap.classList.remove("is-stuck");
      navWrap.style.height = "";
      navWrap.style.height = `${navWrap.offsetHeight}px`;
      navWrap.classList.toggle("is-stuck", stuck);
      void navWrap.offsetHeight; // settle styles before transitions come back
      navWrap.classList.remove("is-measuring");
    };

    let ticking = false;
    const update = () => {
      ticking = false;
      navWrap.classList.toggle("is-stuck", window.scrollY > 8);
    };

    lockHeight();
    update();
    window.addEventListener(
      "scroll",
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(update);
      },
      { passive: true }
    );
    window.addEventListener("resize", lockHeight, { passive: true });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(lockHeight);
  }

  /* ---------------------------------------------------------- hero flip */

  /* Two seconds in, "Product manager" rolls over to "Product builder". */
  const flip = document.querySelector("[data-flip]");

  if (flip) {
    window.setTimeout(() => {
      flip.classList.add("is-flipped");
      const [front, bottom] = flip.querySelectorAll(".flip__face");
      front.setAttribute("aria-hidden", "true");
      bottom.removeAttribute("aria-hidden");
    }, 2000);
  }

  /* --------------------------------------------------------- project peek */

  /* Hover shows the sneak peek on desktop. Touch screens get a "Quick look"
     button instead; only one card peeks at a time, and tapping anywhere else
     puts it away. Tapping the card itself still opens the case study. */
  const peekToggles = Array.from(document.querySelectorAll(".peek-toggle"));

  const setPeek = (toggle, open) => {
    toggle.parentElement.classList.toggle("is-peeking", open);
    toggle.setAttribute("aria-expanded", String(open));
  };

  peekToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") !== "true";
      peekToggles.forEach((other) => setPeek(other, false));
      setPeek(toggle, open);
    });
  });

  if (peekToggles.length) {
    document.addEventListener("click", (event) => {
      if (event.target.closest(".card-wrap")) return;
      peekToggles.forEach((toggle) => setPeek(toggle, false));
    });
  }

  /* --------------------------------------------------------- nav marker */

  const marker = document.querySelector(".nav__marker");
  const navLinks = Array.from(document.querySelectorAll(".nav__link"));

  const moveMarker = (link) => {
    if (!marker || !link) return;
    const label = link.querySelector("span") || link;
    const box = label.getBoundingClientRect();
    const origin = marker.parentElement.getBoundingClientRect();

    /* Driving width through scaleX keeps the slide on the compositor. */
    marker.style.setProperty("--marker-x", `${box.left - origin.left}px`);
    marker.style.setProperty("--marker-sx", String(box.width));
    marker.classList.add("is-on");
  };

  let current = null;

  const setCurrent = (link) => {
    if (!link || link === current) return;
    current = link;
    navLinks.forEach((item) => item.removeAttribute("aria-current"));
    link.setAttribute("aria-current", "true");
    moveMarker(link);
  };

  /* Case-study pages point the nav back at `../index.html#about`, which is not a
     selector — only same-page anchors get an observed section. */
  const watched = new Map();

  navLinks.forEach((link) => {
    const href = link.getAttribute("href") || "";
    if (!href.startsWith("#") || href === "#") return;
    const section = document.querySelector(href);
    if (section) watched.set(section, link);
  });

  if (watched.size && "IntersectionObserver" in window) {
    const seen = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => seen.set(entry.target, entry.intersectionRatio));

        let best = null;
        let bestRatio = 0;
        seen.forEach((ratio, section) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = section;
          }
        });

        if (best) setCurrent(watched.get(best));
      },
      { threshold: [0, 0.15, 0.4, 0.75, 1], rootMargin: "-20% 0px -45% 0px" }
    );

    watched.forEach((_link, section) => observer.observe(section));
  }

  window.addEventListener("resize", () => moveMarker(current), { passive: true });
  /* Web fonts land after first paint and shift the labels — remeasure then. */
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => moveMarker(current));
  }

  /* ------------------------------------------------------------- reveal */

  const revealables = document.querySelectorAll(".reveal");

  if (!revealables.length) return;

  if (!("IntersectionObserver" in window) || reduced.matches) return;

  /* `.reveal` only starts hidden once this class is on <html>, which happens
     here and nowhere else. If anything above threw, the content stays visible
     rather than fading in never. */
  document.documentElement.classList.add("js-reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        revealObserver.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
  );

  revealables.forEach((el, index) => {
    /* A short stagger so a row of cards arrives one after another. */
    el.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
    revealObserver.observe(el);
  });
})();
