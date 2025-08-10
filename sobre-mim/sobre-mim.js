let swiperInstance;

function initCarousel() {
  const container = document.querySelector(".my-carousel");
  if (!container) return;

  if (window.innerWidth <= 768 && !swiperInstance) {
    swiperInstance = new Swiper(".my-carousel", {
      slidesPerView: 1.2,
      spaceBetween: 16,
      grabCursor: true,
      centeredSlides: false,
      loop: true, // volta para o início automaticamente
      touchStartPreventDefault: false,
    });
  } 
  else if (window.innerWidth > 768 && swiperInstance) {
    swiperInstance.destroy(true, true);
    swiperInstance = null;
  }
}

window.addEventListener("resize", initCarousel);
window.addEventListener("load", initCarousel);
