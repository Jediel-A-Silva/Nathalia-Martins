// =====================
// INICIALIZAÇÃO GERAL
// =====================
document.addEventListener("DOMContentLoaded", () => {

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
  // MENU HAMBÚRGUER (ACESSÍVEL)
  // =====================
  const menuBtn = document.querySelector(".menu-btn");
  const menu = document.getElementById("menu");
  const btnFechar = menu ? menu.querySelector(".fechar") : null;

  if (menu && menuBtn) {

    // Estado inicial correto
    menu.setAttribute("aria-hidden", "true");
    menu.setAttribute("inert", "");

    function abrirMenu() {
      menu.classList.add("ativo");
      menuBtn.classList.add("ativo");

      menu.removeAttribute("inert");
      menu.setAttribute("aria-hidden", "false");

      // foco no primeiro link do menu
      const primeiroLink = menu.querySelector("a");
      if (primeiroLink) primeiroLink.focus();
    }

    function fecharMenu() {
      // devolve foco para o botão do menu
      if (menu.contains(document.activeElement)) {
        document.activeElement.blur();
        menuBtn.focus();
      }

      menu.classList.remove("ativo");
      menuBtn.classList.remove("ativo");

      menu.setAttribute("aria-hidden", "true");
      menu.setAttribute("inert", "");
    }

    // Abrir / fechar no botão hambúrguer
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      menu.classList.contains("ativo") ? fecharMenu() : abrirMenu();
    });

    // Botão X
    if (btnFechar) {
      btnFechar.addEventListener("click", (e) => {
        e.stopPropagation();
        fecharMenu();
      });
    }

    // Fechar ao clicar fora
    document.addEventListener("click", (e) => {
      if (
        menu.classList.contains("ativo") &&
        !menu.contains(e.target) &&
        !menuBtn.contains(e.target)
      ) {
        fecharMenu();
      }
    });

    // Fechar ao redimensionar (ex: girar celular)
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
});

(function () {

  const img = document.getElementById("gpCarouselImg");
  const title = document.getElementById("gpCarouselTitle");
  const description = document.getElementById("gpCarouselDescription");

  const prevBtn = document.querySelector(".gp-carousel-prev");
  const nextBtn = document.querySelector(".gp-carousel-next");
  const dotsContainer = document.querySelector(".gp-carousel-dots");
  const swipeArea = document.querySelector(".gp-carousel-image");

  if (!img || !title || !description || !prevBtn || !nextBtn || !dotsContainer || !swipeArea) return;

  const slides = [
    {
      image: "../assets/img/img-principal/imagem1.jpg",
      titulo: "Parto Humanizado com Respeito",
      descricao: "Cada detalhe é pensado para que você viva esse momento tão especial com acolhimento, conforto e segurança. Tudo é preparado para que você se sinta cuidada e confiante durante toda a experiência."
    },
    {
      image: "../assets/img/img-principal/Imagem-efeito-blur.png",
      titulo: "Gestante como Protagonista",
      descricao: "Você é o centro das decisões e vive cada etapa do seu jeito. Aqui, o parto é conduzido com autonomia, cuidado e apoio contínuo para que você se sinta segura, informada e protagonista da sua própria experiência."
    },
    {
      image: "../assets/img/img-principal/imagem6.jpg",
      titulo: "Acolhimento e Confiança",
      descricao: "Uma jornada construída com carinho, empatia e atenção em cada detalhe. O cuidado vai além da técnica, acolhendo medos, dúvidas e sentimentos para que você se sinta confiante do início ao fim."
    },
    {
      image: "../assets/img/img-principal/a01.jpg",
      titulo: "Cuidado Integral com a Gestante",
      descricao: "Acompanhamento completo durante toda a gestação, envolvendo aspectos físicos, emocionais e informativos. Tudo para promover bem-estar, segurança e uma experiência mais leve e tranquila."
    },
    {
      image: "../assets/img/img-principal/imagem4.jpg",
      titulo: "Experiência Única no Parto",
      descricao: "O nascimento é mais do que um evento — é um momento único, cheio de significado. Aqui, cada escolha é respeitada para tornar o parto inesquecível, sensível e repleto de carinho e presença."
    },
    {
      image: "../assets/img/img-principal/imagem5.jpg",
      titulo: "Amor e Segurança no Nascer",
      descricao: "Um ambiente preparado com atenção, acolhimento e respeito, onde cada detalhe é pensado para receber sua história com amor, tranquilidade e segurança desde os primeiros instantes de vida."
    }
  ];

  let index = 0;

  // cria bolinhas (somente indicador)
  slides.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.classList.add("gp-carousel-dot");
    if (i === 0) dot.classList.add("active");
    dotsContainer.appendChild(dot);
  });

  function atualizarCarousel() {
    img.src = slides[index].image;
    title.textContent = slides[index].titulo;
    description.textContent = slides[index].descricao;

    document.querySelectorAll(".gp-carousel-dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  nextBtn.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    atualizarCarousel();
  });

  prevBtn.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    atualizarCarousel();
  });

  /* ======================
     SWIPE (TOQUE NO MOBILE)
  ====================== */
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
      if (diff > 0) {
        index = (index + 1) % slides.length;
      } else {
        index = (index - 1 + slides.length) % slides.length;
      }
      atualizarCarousel();
    }

    startX = 0;
    endX = 0;
  });

  atualizarCarousel();

})();
window.addEventListener("load", () => {
  const heroText = document.querySelector(".hero-text");
  if (heroText) {
    heroText.classList.add("show");
  }
}, 900);

window.addEventListener("load", () => {
  const heroText = document.querySelector(".hero-text");

  if (heroText) {
    setTimeout(() => {
      heroText.classList.add("show");
    }, 500);
  }
});
