document.addEventListener('DOMContentLoaded', () => {
  // Slider logic: horizontal translateX with swipe
  const slider = document.getElementById('report-slider');
  const track = slider.querySelector('.slider-track');
  const slides = Array.from(track.querySelectorAll('.slide'));
  const prevBtn = document.querySelector('.slider-btn.left');
  const nextBtn = document.querySelector('.slider-btn.right');

  let currentIndex = 0;

  function updateSlider() {
    const offset = -currentIndex * 100;
    track.style.transform = `translateX(${offset}%)`;

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === slides.length - 1;
  }

  function goTo(index) {
    if (index < 0 || index >= slides.length) return;
    currentIndex = index;
    updateSlider();
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

    const threshold = 50; // px
    if (deltaX > threshold) {
      // swipe right -> previous
      goTo(currentIndex - 1);
    } else if (deltaX < -threshold) {
      // swipe left -> next
      goTo(currentIndex + 1);
    }

    startX = null;
  });

  updateSlider();

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const haloNav = document.querySelector('.halo-nav');

  if (menuToggle && haloNav) {
    menuToggle.addEventListener('click', () => {
      document.body.classList.toggle('nav-open');
    });

    haloNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
      });
    });
  }
});