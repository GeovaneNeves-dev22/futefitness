/* ============================================================
   FUT & FITNESS — main.js
   Nav scroll, mobile menu, scroll reveal
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Nav scroll shadow ── */
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 20);
  });

  /* ── Mobile burger ── */
  const burger = document.querySelector('.nav-burger');
  const drawer = document.querySelector('.nav-drawer');
  burger?.addEventListener('click', () => {
    drawer?.classList.toggle('open');
    const spans = burger.querySelectorAll('span');
    if (drawer?.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  /* ── Fechar drawer ao clicar em link ── */
  drawer?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      drawer.classList.remove('open');
      burger?.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });

  /* ── Scroll Reveal ── */
  const reveals = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => revealObs.observe(el));

  /* ── Marcar link ativo no nav ── */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a, .nav-drawer a').forEach(a => {
    if (a.getAttribute('href') === currentPage) a.classList.add('active');
  });

  /* ── Contador de stats animado ── */
  const counters = document.querySelectorAll('[data-count]');
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      let current = 0;
      const step = Math.ceil(target / 60);
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current + suffix;
        if (current >= target) clearInterval(timer);
      }, 20);
      countObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => countObs.observe(el));

});
