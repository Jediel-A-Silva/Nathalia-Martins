// =====================
// INICIALIZAÇÃO GERAL
// =====================
document.addEventListener("DOMContentLoaded", () => {

  // =====================
  // HERO TEXT (ANIMAÇÃO)
  // =====================
 window.addEventListener("load", () => {
  const heroText = document.querySelector(".hero-text");
  if (!heroText) return;

  // força repaint antes da animação
  requestAnimationFrame(() => {
    heroText.classList.add("show");
  });
});


  // =====================
  // SWIPER
  // =====================
  if (typeof Swiper !== "undefined") {
    new Swiper(".my-carousel", {
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      spaceBetween: 16,
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }

  // =====================
  // MENU HAMBÚRGUER
  // =====================
  const menuBtn = document.querySelector(".menu-btn");
  const menu = document.getElementById("menu");
  const btnFechar = menu ? menu.querySelector(".fechar") : null;

  if (menu && menuBtn) {
    menu.setAttribute("aria-hidden", "true");
    menu.setAttribute("inert", "");

    function abrirMenu() {
      menu.classList.add("ativo");
      menuBtn.classList.add("ativo");
      menu.removeAttribute("inert");
      menu.setAttribute("aria-hidden", "false");

      const primeiroLink = menu.querySelector("a");
      if (primeiroLink) primeiroLink.focus();
    }

    function fecharMenu() {
      if (menu.contains(document.activeElement)) {
        document.activeElement.blur();
        menuBtn.focus();
      }

      menu.classList.remove("ativo");
      menuBtn.classList.remove("ativo");
      menu.setAttribute("aria-hidden", "true");
      menu.setAttribute("inert", "");
    }

    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      menu.classList.contains("ativo") ? fecharMenu() : abrirMenu();
    });

    if (btnFechar) {
      btnFechar.addEventListener("click", (e) => {
        e.stopPropagation();
        fecharMenu();
      });
    }

    document.addEventListener("click", (e) => {
      if (
        menu.classList.contains("ativo") &&
        !menu.contains(e.target) &&
        !menuBtn.contains(e.target)
      ) {
        fecharMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1024) {
        fecharMenu();
      }
    });
  }

  // =====================
  // FORM SUBMIT
  // =====================
  class FormSubmit {
    constructor(settings) {
      this.settings = settings;
      this.form = document.querySelector(settings.form);
      this.button = document.querySelector(settings.button);

      if (this.form && this.button) {
        this.url = this.form.getAttribute("action");
        this.button.addEventListener("click", this.sendForm.bind(this));
      }
    }

    displaySuccess() {
      this.form.innerHTML = this.settings.success;
    }

    displayError() {
      this.form.innerHTML = this.settings.error;
    }

    getFormObject() {
      const obj = {};
      this.form.querySelectorAll("[name]").forEach((field) => {
        obj[field.name] = field.value;
      });
      return obj;
    }

    onSubmission(event) {
      event.preventDefault();
      event.target.disabled = true;
      event.target.innerText = "Enviando...";
    }

    async sendForm(event) {
      try {
        this.onSubmission(event);
        await fetch(this.url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(this.getFormObject()),
        });
        this.displaySuccess();
      } catch {
        this.displayError();
      }
    }
  }

  new FormSubmit({
    form: "[data-form]",
    button: "[data-button]",
    success: "<h1 class='success'>Mensagem enviada com sucesso!</h1>",
    error: "<h1 class='error'>Ops! Algo deu errado.</h1>",
  });

  // =====================
  // CARROSSEL FINAL
  // =====================
  (function () {
    const slides = document.querySelectorAll("#carrosselFinal .slide-final");
    const prevBtn = document.querySelector("#carrosselFinal .prev-final");
    const nextBtn = document.querySelector("#carrosselFinal .next-final");

    if (!slides.length || !prevBtn || !nextBtn) return;

    let index = 0;

    function atualizar() {
      slides.forEach((slide, i) =>
        slide.classList.toggle("ativo-slide-final", i === index)
      );
    }

    nextBtn.addEventListener("click", () => {
      index = (index + 1) % slides.length;
      atualizar();
    });

    prevBtn.addEventListener("click", () => {
      index = (index - 1 + slides.length) % slides.length;
      atualizar();
    });

    atualizar();
  })();

  // =====================
  // GP CAROUSEL (SWIPE)
  // =====================
  (function () {
    const img = document.getElementById("gpCarouselImg");
    const title = document.getElementById("gpCarouselTitle");
    const description = document.getElementById("gpCarouselDescription");
    const prevBtn = document.querySelector(".gp-carousel-prev");
    const nextBtn = document.querySelector(".gp-carousel-next");
    const dotsContainer = document.querySelector(".gp-carousel-dots");
    const swipeArea = document.querySelector(".gp-carousel-image");

    if (!img || !title || !description || !dotsContainer || !swipeArea) return;

    const slides = [
      {
        image: "/img/imagem1.jpg",
        titulo: "Parto Humanizado com Respeito",
        descricao: "Cada detalhe é pensado para garantir acolhimento, conforto e segurança em um momento tão especial."
      },
      {
        image: "/img/Imagem-efeito-blur.png",
        titulo: "Gestante como Protagonista",
        descricao: "Você é o centro de todas as decisões. Vivencie o parto com autonomia, amor e apoio contínuo."
      },
      {
        image: "/img/imagem6.jpg",
        titulo: "Acolhimento e Confiança",
        descricao: "Uma jornada guiada pela empatia e pelo cuidado, onde cada gesto transmite tranquilidade."
      },
      {
        image: "/img/a01.jpg",
        titulo: "Cuidado Integral com a Gestante",
        descricao: "Acompanhamento físico e emocional em todas as fases da gestação."
      },
      {
        image: "/img/imagem4.jpg",
        titulo: "Experiência Única no Parto",
        descricao: "Transforme o nascimento em um momento inesquecível."
      },
      {
        image: "/img/imagem5.jpg",
        titulo: "Amor e Segurança no Nascer",
        descricao: "Um ambiente preparado com dedicação e carinho."
      }
    ];

    let index = 0;

    slides.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.className = "gp-carousel-dot";
      if (i === 0) dot.classList.add("active");
      dotsContainer.appendChild(dot);
    });

    function atualizarCarousel() {
      img.src = slides[index].image;
      title.textContent = slides[index].titulo;
      description.textContent = slides[index].descricao;

      dotsContainer.querySelectorAll(".gp-carousel-dot").forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });
    }

    let startX = 0;
    let endX = 0;
    const swipeLimit = 50;

    swipeArea.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    swipeArea.addEventListener("touchmove", (e) => {
      endX = e.touches[0].clientX;
    });

    swipeArea.addEventListener("touchend", () => {
      const diff = startX - endX;
      if (Math.abs(diff) > swipeLimit) {
        index = diff > 0
          ? (index + 1) % slides.length
          : (index - 1 + slides.length) % slides.length;
        atualizarCarousel();
      }
      startX = endX = 0;
    });

    atualizarCarousel();
  })();

});
