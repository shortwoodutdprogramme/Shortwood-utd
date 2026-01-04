document.addEventListener('DOMContentLoaded', async () => {

  // 1. Load reports.json
  const response = await fetch('./js/reports.json');
  const reports = await response.json();

  // 2. Build slider dynamically
  const slider = document.getElementById('report-slider');
  const track = slider.querySelector('.slider-track');

  track.innerHTML = ''; // clear any existing slides

  reports.forEach(report => {
    const slide = document.createElement('div');
    slide.className = 'slide';

    slide.innerHTML = `
      <article class="report-card">
        <h3>${report.title}</h3>
        <p class="report-subtitle">${report.subtitle}</p>
        <p>${report.preview}</p>
        <p class="report-link">
          <a href="../reports/${report.file}" target="_blank">Read full report →</a>
        </p>
      </article>
    `;

    track.appendChild(slide);
  });

  // 3. Slider logic
  const slides = Array.from(track.querySelectorAll('.slide'));
  const prevBtn = document.querySelector('.slider-btn.left');
  const nextBtn = document.querySelector('.slider-btn.right');

  // Start at newest report (index 0)
  let currentIndex = 0;

  function updateSlider() {
    const offset = -currentIndex * 100;
    track.style.transform = `translateX(${offset}%)`;

    // Right = newer (index 0)
    nextBtn.disabled = currentIndex === 0;

    // Left = older (last index)
    prevBtn.disabled = currentIndex === slides.length - 1;
  }

  function goTo(index) {
    if (index < 0 || index >= slides.length) return;
    currentIndex = index;
    updateSlider();
  }

  // Button navigation
  prevBtn.addEventListener('click', () => goTo(currentIndex + 1)); // older
  nextBtn.addEventListener('click', () => goTo(currentIndex - 1)); // newer

  // 4. Swipe support
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

    const threshold = 50;

    if (deltaX > threshold) goTo(currentIndex + 1); // older
    if (deltaX < -threshold) goTo(currentIndex - 1); // newer

    startX = null;
  });

  updateSlider();

  // 5. Mobile menu toggle
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