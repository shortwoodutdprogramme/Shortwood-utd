document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  const leftBtn = document.querySelector('.slider-btn.left');
  const rightBtn = document.querySelector('.slider-btn.right');
  let current = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    leftBtn.disabled = (index === 0);
    rightBtn.disabled = (index === slides.length - 1);
  }

  leftBtn.addEventListener('click', () => {
    if (current > 0) {
      current--;
      showSlide(current);
    }
  });

  rightBtn.addEventListener('click', () => {
    if (current < slides.length - 1) {
      current++;
      showSlide(current);
    }
  });

  // Swipe support
  let startX = 0;
  document.querySelector('.slider').addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });

  document.querySelector('.slider').addEventListener('touchend', e => {
    let endX = e.changedTouches[0].clientX;
    if (endX < startX - 50 && current < slides.length - 1) {
      current++;
      showSlide(current);
    }
    if (endX > start