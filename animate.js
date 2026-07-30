// ============================================================
// animate.js
// Handles staggered slide-in animations for all pages.
// Uses IntersectionObserver to trigger animations both on
// page load and as elements scroll into view.
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // Select every element marked for animation
  const animatedElements = document.querySelectorAll('.animate');

  // --------------------------------------------------------
  // Assign stagger delays automatically based on DOM order
  // Each element gets a slightly later delay than the last
  // --------------------------------------------------------
  animatedElements.forEach((el, index) => {
    // 50ms stagger between each element, capped at 400ms
    const delay = Math.min(index * 0.05, 0.4);
    el.style.transitionDelay = `${delay}s`;
  });

  // --------------------------------------------------------
  // IntersectionObserver
  // Watches each element — when it enters the viewport,
  // adds .is-visible to trigger the CSS transition
  // --------------------------------------------------------
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');

          // Stop observing once visible — no need to re-trigger
          observer.unobserve(entry.target);
        }
      });
    },
    {
      // Trigger when at least 10% of the element is visible
      threshold: 0.1,

      // Start animating slightly before element enters viewport
      rootMargin: '0px 0px -20px 0px'
    }
  );

  // Attach observer to every animated element
  animatedElements.forEach((el) => observer.observe(el));

});