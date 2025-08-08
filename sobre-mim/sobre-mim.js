let swiperInstance;
let originalClasses = [];

function initCarousel() {
  const container = document.querySelector(".meu-carrossel");
  const slides = container ? container.children : [];

  if (window.innerWidth <= 768 && !swiperInstance) {
    originalClasses = Array.from(slides).map(slide => slide.className);

    container.classList.add("swiper-wrapper");
    Array.from(slides).forEach(slide => {
      slide.classList.add("swiper-slide");
    });

    if (!container.parentElement.classList.contains("swiper")) {
      const wrapper = document.createElement("div");
      wrapper.classList.add("swiper");
      container.parentNode.insertBefore(wrapper, container);
      wrapper.appendChild(container);

      const nextBtn = document.createElement("div");
      nextBtn.classList.add("swiper-button-next");
      const prevBtn = document.createElement("div");
      prevBtn.classList.add("swiper-button-prev");
      wrapper.appendChild(nextBtn);
      wrapper.appendChild(prevBtn);
    }

    const swiperInstance = new Swiper(".swiper", {
  slidesPerView: 1.2,
  spaceBetween: 16,
  grabCursor: true,
  centeredSlides: false,
  loop: true,
  // navigation opcional, se quiser manter as setas
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  touchStartPreventDefault: false,
});


  } else if (window.innerWidth > 768 && swiperInstance) {
    swiperInstance.destroy(true, true);
    swiperInstance = null;

    const wrapper = document.querySelector(".swiper");
    if (wrapper) {
      const parent = wrapper.parentNode;
      parent.insertBefore(wrapper.firstElementChild, wrapper);
      wrapper.remove();
    }

    container.classList.remove("swiper-wrapper");
    Array.from(slides).forEach((slide, i) => {
      slide.className = originalClasses[i];
    });
  }
}

window.addEventListener("resize", initCarousel);
window.addEventListener("load", initCarousel);
