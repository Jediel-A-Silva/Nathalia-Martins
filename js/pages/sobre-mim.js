/* =============================
   SWIPER MOBILE (DIFERENCIAIS)
============================= */

let swiperInstance = null;

function initCarousel() {
  const container = document.querySelector(".my-carousel");
  if (!container) return;

  if (window.innerWidth <= 768 && !swiperInstance) {
    swiperInstance = new Swiper(".my-carousel", {
      slidesPerView: 1.2,
      spaceBetween: 16,
      grabCursor: true,
      loop: true,
      freeMode: true,
      speed: 3000,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
      allowTouchMove: true,
    });
  }

  if (window.innerWidth > 768 && swiperInstance) {
    swiperInstance.destroy(true, true);
    swiperInstance = null;
  }
}

window.addEventListener("load", initCarousel);
window.addEventListener("resize", initCarousel);

/* =============================
   ANIMAÇÕES AO ROLAR A TELA
============================= */

document.addEventListener("DOMContentLoaded", () => {
  const animatedItems = document.querySelectorAll(".animate");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.dataset.delay || 0;

          setTimeout(() => {
            el.classList.add("visible");
          }, delay);

          observer.unobserve(el);
        }
      });
    },
    {
      threshold: 0.25
    }
  );

  animatedItems.forEach((item, index) => {
    item.dataset.delay = index * 150; // 150ms entre elementos
    observer.observe(item);
  });
});

