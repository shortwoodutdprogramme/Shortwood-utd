// Slider logic with fade transitions + swipe
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('report-slider');
  const slides = Array.from(slider.querySelectorAll('.slide'));
  const prevBtn = document.querySelector('.slider-btn.left');
  const nextBtn = document.querySelector('.slider-btn.right');

  let currentIndex = 0;

  function updateSlides() {
    slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === currentIndex);
    });

    // Optional: disable buttons at ends
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === slides.length - 1;
  }

  function goTo(index) {
    if (index < 0 || index >= slides.length) return;
    currentIndex = index;
    updateSlides();
  }

  prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
  nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

  // Touch swipe support
  let startX = null;

  slider.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      startX = e.touches[0].clientX;
    }
  });

  slider.addEventListener('touchend', (e) => {
    if (startX === null) return;
    const endX = e.changedTouches[0].clientX;
    const deltaX = endX - startX;

    const threshold = 50; // minimum swipe distance in px
    if (deltaX > threshold) {
      // swipe right -> previous slide
      goTo(currentIndex - 1);
    } else if (deltaX < -threshold) {
      // swipe left -> next slide
      goTo(currentIndex + 1);
    }

    startX = null;
  });

  updateSlides();

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const haloNav = document.querySelector('.halo-nav');

  if (menuToggle && haloNav) {
    menuToggle.addEventListener('click', () => {
      document.body.classList.toggle('nav-open');
    });

    // Close menu on nav link click (mobile)
    haloNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
      });
    });
  }
});