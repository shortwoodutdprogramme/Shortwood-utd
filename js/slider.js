document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider-btn.left");
  const btnRight = document.querySelector(".slider-btn.right");

  if (!slider || !slides.length || !btnLeft || !btnRight) {
    console.error("Slider: required elements not found.");
    return;
  }

  let current = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
    btnLeft.disabled = index === 0;
    btnRight.disabled = index === slides.length - 1;
  }

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

  let startX = 0;

  slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  slider.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const delta = endX - startX;

    if (delta < -50 && current < slides.length - 1) {
      current++;
      showSlide(current);
    } else if (delta > 50 && current > 0) {
      current--;
      showSlide(current);
    }
  });

  showSlide(current);
});