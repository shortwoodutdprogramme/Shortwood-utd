document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider-btn.left");
  const btnRight = document.querySelector(".slider-btn.right");
  let current = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });

    // Disable buttons at ends
    btnLeft.disabled = index === 0;
    btnRight.disabled = index === slides.length - 1;
  }

  // Button controls
  btnLeft.addEventListener("click", () => {
    if (current > 0) {
      current--;
      showSlide(current);
    }
  });

  btnRight.addEventListener("click", () => {
    if (current < slides.length - 1) {
      current++;
      showSlide(current);
    }
  });

  // Touch swipe support
  let startX = 0;

  document.querySelector(".slider").addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  document.querySelector(".slider").addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;

    if (endX < startX - 50 && current < slides.length - 1) {
      current++;
      showSlide(current);
    }

    if (endX > startX + 50 && current > 0) {
      current--;
      showSlide(current);
    }
  });

  // Initialise
  showSlide(current);
});