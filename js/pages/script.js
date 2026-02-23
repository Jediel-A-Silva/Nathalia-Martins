/* =====================================================
   MOBILE NAVIGATION TOGGLE
===================================================== */
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

/* =====================================================
   NAVBAR BACKGROUND ON SCROLL
===================================================== */
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  navbar.style.backgroundColor =
    window.scrollY > 50
      ? 'rgba(255, 255, 255, 0.98)'
      : 'rgba(255, 255, 255, 0.95)';
});

/* =====================================================
   SMOOTH SCROLLING
===================================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);

    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

/* =====================================================
   PARTICLES.JS BACKGROUND
===================================================== */
if (typeof particlesJS !== 'undefined') {
  particlesJS('particles-js', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: '#ffffff' },
      shape: { type: 'circle' },
      opacity: { value: 0.1 },
      size: { value: 3, random: true },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#ffffff',
        opacity: 0.1,
        width: 1
      },
      move: { enable: true, speed: 1 }
    },
    interactivity: {
      events: {
        onhover: { enable: true, mode: 'grab' },
        onclick: { enable: true, mode: 'push' }
      },
      modes: {
        grab: { distance: 140, line_linked: { opacity: 0.2 } },
        push: { particles_nb: 4 }
      }
    },
    retina_detect: true
  });
}

/* =====================================================
   NETLIFY FORM SUBMISSION (SEM NOVA ABA)
===================================================== */
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    fetch(this.getAttribute('action') || '/', {
      method: 'POST',
      body: formData
    })
      .then(() => {
        alert('Mensagem enviada com sucesso!');
        this.reset();
      })
      .catch(() => {
        alert('Erro ao enviar. Tente novamente.');
      });
  });
}

/* =====================================================
   SCROLL ANIMATIONS (INTERSECTION OBSERVER)
===================================================== */
const observerOptions = {
  root: null,
  threshold: 0.1
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
    }
  });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
  observer.observe(section);
});

/* =====================================================
   HERO LOAD ANIMATION
===================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    setTimeout(() => {
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }, 300);
  }
});
