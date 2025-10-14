// =====================
// INICIALIZAÇÃO GERAL
// =====================
document.addEventListener("DOMContentLoaded", () => {

  // =====================
  // Swiper
  // =====================
  if (typeof Swiper !== "undefined") {
    new Swiper(".my-carousel", {
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      spaceBetween: 16,
      loop: true,
      navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
    });
  }

  // =====================
  // MENU HAMBÚRGUER
  // =====================
  const menuBtn = document.querySelector(".menu-btn");
  const menu = document.getElementById("menu");
  const btnFechar = menu?.querySelector(".fechar");

  if (menuBtn && menu) {
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      menu.classList.toggle("ativo");
      menuBtn.classList.toggle("ativo");
    });

    if (btnFechar) {
      btnFechar.addEventListener("click", () => {
        menu.classList.remove("ativo");
        menuBtn.classList.remove("ativo");
      });
    }
  }

  // =====================
  // FECHAR AO CLICAR FORA (menu)
  // =====================
  document.addEventListener("click", (e) => {
    const clicouForaMenu = menu && menu.classList.contains("ativo") &&
      !menu.contains(e.target) && !menuBtn.contains(e.target);

    if (clicouForaMenu) {
      menu.classList.remove("ativo");
      menuBtn.classList.remove("ativo");
    }
  });

  // =====================
  // FormSubmit
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

    displaySuccess() { this.form.innerHTML = this.settings.success; }
    displayError() { this.form.innerHTML = this.settings.error; }

    getFormObject() {
      const obj = {};
      this.form.querySelectorAll("[name]").forEach(f => obj[f.name] = f.value);
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
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(this.getFormObject())
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
    error: "<h1 class='error'>Ops! Algo deu errado.</h1>"
  });

  // =====================
  // CARROSSEL PRINCIPAL
  // =====================
  (function () {
    const slides = document.querySelectorAll(".slide-item");
    const prevBtn = document.querySelector(".prev-custom");
    const nextBtn = document.querySelector(".next-custom");
    const textoBox = document.querySelector(".descricao-carrossel");

    if (!slides.length || !prevBtn || !nextBtn || !textoBox) return;

    const textos = [
      { titulo: "Parto Humanizado com Respeito", descricao: "Acolhimento em cada etapa..." },
      { titulo: "Gestante como Protagonista", descricao: "Você no centro das decisões..." },
      { titulo: "Acolhimento e Confiança", descricao: "Um ambiente seguro e acolhedor..." },
      { titulo: "Cuidado Integral com a Gestante", descricao: "Assistência completa..." },
      { titulo: "Experiência Única no Parto", descricao: "Vivencie o nascimento..." },
      { titulo: "Amor e Segurança no Nascer", descricao: "Cada momento do parto é pensado..." }
    ];

    let index = 0;
    function atualizar() {
      slides.forEach((slide, i) => slide.classList.toggle("ativo-slide", i === index));
      textoBox.querySelector("h2").innerText = textos[index].titulo;
      textoBox.querySelector("p").innerText = textos[index].descricao;
    }

    nextBtn.addEventListener("click", () => { index = (index + 1) % slides.length; atualizar(); });
    prevBtn.addEventListener("click", () => { index = (index - 1 + slides.length) % slides.length; atualizar(); });
    atualizar();
  })();

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
      slides.forEach((slide, i) => slide.classList.toggle("ativo-slide-final", i === index));
    }

    nextBtn.addEventListener("click", () => { index = (index + 1) % slides.length; atualizar(); });
    prevBtn.addEventListener("click", () => { index = (index - 1 + slides.length) % slides.length; atualizar(); });
    atualizar();
  })();
});
