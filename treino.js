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

  if (!img || !title || !description || !prevBtn || !nextBtn) return;

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
      descricao: "Acompanhamento físico e emocional em todas as fases da gestação, garantindo bem-estar completo."
    },
    {
      image: "/img/imagem4.jpg",
      titulo: "Experiência Única no Parto",
      descricao: "Transforme o nascimento em um momento inesquecível, cheio de significado e carinho."
    },
    {
      image: "/img/imagem5.jpg",
      titulo: "Amor e Segurança no Nascer",
      descricao: "Um ambiente preparado com dedicação para receber sua história com amor e serenidade."
    }
  ];

  let index = 0;

  function atualizarCarousel() {
    img.src = slides[index].image;
    title.textContent = slides[index].titulo;
    description.textContent = slides[index].descricao;
  }

  nextBtn.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    atualizarCarousel();
  });

  prevBtn.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    atualizarCarousel();
  });

  atualizarCarousel();

})();
