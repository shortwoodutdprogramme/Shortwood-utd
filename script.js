// Reports carousel
const reportSlides = document.querySelectorAll('.report-slide');
let reportIndex = 0;

document.querySelector('.report-prev').addEventListener('click', () => {
  reportSlides[reportIndex].classList.remove('active');
  reportIndex = (reportIndex - 1 + reportSlides.length) % reportSlides.length;
  reportSlides[reportIndex].classList.add('active');
});

document.querySelector('.report-next').addEventListener('click', () => {
  reportSlides[reportIndex].classList.remove('active');
  reportIndex = (reportIndex + 1) % reportSlides.length;
  reportSlides[reportIndex].classList.add('active');
});

// Sponsors auto-rotate
const sponsorLogos = document.querySelectorAll('.sponsor-logo');
let sponsorIndex = 0;

function rotateSponsors() {
  sponsorLogos[sponsorIndex].classList.remove('active');
  sponsorIndex = (sponsorIndex + 1) % sponsorLogos.length;
  sponsorLogos[sponsorIndex].classList.add('active');
}

setInterval(rotateSponsors, 3000); // change every 3 seconds