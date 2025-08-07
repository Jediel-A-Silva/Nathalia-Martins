window.addEventListener('DOMContentLoaded', () => {
  const carrossel = document.getElementById("carrossel");
  const anterior = document.getElementById("anterior");
  const proximo = document.getElementById("proximo");
  const itemWidth = carrossel.querySelector(".item-imagem").offsetWidth + 16;
const swiper = new Swiper('.my-carousel', {
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  spaceBetween: 16,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

const swiper = new Swiper('.my-carousel', {
  slidesPerView: 'auto',
  spaceBetween: 16,
  grabCursor: true,
});

  let isUserInteracting = false;

  carrossel.addEventListener('mouseenter', () => isUserInteracting = true);
  carrossel.addEventListener('mouseleave', () => isUserInteracting = false);

  function autoScroll() {
    if (!isUserInteracting) {
      carrossel.scrollLeft += 1;
      if (carrossel.scrollLeft + carrossel.offsetWidth >= carrossel.scrollWidth - 5) {
        carrossel.scrollLeft = 0;
      }
    }
    requestAnimationFrame(autoScroll);
  }

  proximo?.addEventListener("click", () => {
    if (carrossel.scrollLeft + itemWidth >= carrossel.scrollWidth - carrossel.offsetWidth) {
      carrossel.scrollLeft = 0;
    } else {
      carrossel.scrollLeft += itemWidth;
    }
  });

  anterior?.addEventListener("click", () => {
    if (carrossel.scrollLeft <= 0) {
      carrossel.scrollLeft = carrossel.scrollWidth;
    } else {
      carrossel.scrollLeft -= itemWidth;
    }
  });

  autoScroll();
});
