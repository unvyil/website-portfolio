/* ==========================================================================
   HERO TRANSITION MODULE (GSAP Parallax Collapse + Lenis)
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  if (
    typeof gsap === "undefined" ||
    typeof ScrollTrigger === "undefined" ||
    typeof Lenis === "undefined"
  ) {
    console.warn("GSAP, ScrollTrigger, or Lenis not loaded.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // 1. Initialize Lenis Smooth Scroll
  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  // Synchronize ScrollTrigger with Lenis raf
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0, 0);

  // 2. Parallax Collapse Timeline
  const heroTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#home",
      start: "top top",
      end: "bottom top",
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });

  heroTl
    // "NO VY" scales down and fades
    .to(
      ".hero-name-line-novy",
      {
        scale: 0.75,
        y: 120,
        opacity: 0,
        ease: "none",
      },
      0,
    )
    // "TAB LAC" shifts to the left (-15vw) like a logo while fading
    .to(
      ".hero-name-line",
      {
        scale: 0.75,
        x: "-15vw",
        y: 120,
        opacity: 0,
        ease: "none",
      },
      0,
    )
    // Portrait blurs heavily and pushes down faster
    .to(
      ".hero-portrait",
      {
        scale: 0.85,
        y: 160,
        opacity: 0,
        filter: "blur(15px)" /* Adds the blur effect on scroll */,
        ease: "none",
      },
      0,
    )
    // Anchors fade and sink
    .to(
      ".hero-anchor--left, .hero-anchor--right",
      {
        y: 40,
        opacity: 0,
        ease: "none",
      },
      0,
    )
    // Scroll button and ticker fade away
    .to(
      ".hero-scroll-wrap, .ticker-wrap",
      {
        y: 30,
        opacity: 0,
        ease: "none",
      },
      0,
    );
});
