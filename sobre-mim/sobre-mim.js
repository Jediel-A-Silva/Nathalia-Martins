let swiperInstance;

function initCarousel() {
  const container = document.querySelector(".my-carousel");
  if (!container) return;

  if (window.innerWidth <= 768 && !swiperInstance) {
    swiperInstance = new Swiper(".my-carousel", {
      slidesPerView: 1.2,
      spaceBetween: 16,
      grabCursor: true,
      loop: true,
      centeredSlides: false,
      freeMode: true,          // permite deslizar contínuo
      speed: 3000,             // velocidade da animação (ms)
      autoplay: {
        delay: 0,              // delay 0 para movimento contínuo
        disableOnInteraction: false,
      },
      allowTouchMove: true,    // ainda permite arrastar
    });
  } 
  else if (window.innerWidth > 768 && swiperInstance) {
    swiperInstance.destroy(true, true);
    swiperInstance = null;
  }
}

window.addEventListener("resize", initCarousel);
window.addEventListener("load", initCarousel);
