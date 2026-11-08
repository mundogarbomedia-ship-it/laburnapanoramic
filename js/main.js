// Hotel La Burna Panoràmic – JS comú (CA / ES / EN / FR)

document.addEventListener('DOMContentLoaded', () => {
  // Menú mòbil
  const toggle = document.querySelector('.header__toggle');
  const nav = document.getElementById('menu');

  if (toggle && nav) {
    const setOpen = (open) => {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    };
    toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
    nav.querySelectorAll('a[href^="#"]').forEach((link) => link.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  }

  // Any del peu
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

  // Vídeo del hero: només si l'usuari no demana menys moviment ni estalvi de dades.
  // Si no es pot reproduir, queda la foto.
  const video = document.querySelector('.hero__media video');
  if (video) {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = navigator.connection && navigator.connection.saveData;
    if (!reduce && !saveData) {
      const small = window.matchMedia('(max-width: 699px)').matches;
      video.src = small ? video.dataset.srcSmall : video.dataset.srcLarge;
      video.addEventListener('playing', () => video.classList.add('is-playing'), { once: true });
      const p = video.play();
      if (p && p.catch) p.catch(() => {});
    }
  }

  // Galeria amb visor (teclat: fletxes i Esc)
  const gallery = document.querySelector('[data-gallery]');
  const box = document.querySelector('.lightbox');
  if (gallery && box && typeof box.showModal === 'function') {
    const items = [...gallery.querySelectorAll('button[data-full]')];
    const img = box.querySelector('img');
    const caption = box.querySelector('p');
    let current = 0;
    let opener = null;

    const show = (i) => {
      current = (i + items.length) % items.length;
      const thumb = items[current].querySelector('img');
      img.src = items[current].dataset.full;
      img.alt = thumb.alt;
      caption.textContent = `${thumb.alt} · ${current + 1}/${items.length}`;
    };

    items.forEach((btn, i) => btn.addEventListener('click', () => {
      opener = btn;
      show(i);
      box.showModal();
    }));
    box.querySelector('.lightbox__close').addEventListener('click', () => box.close());
    box.querySelector('.lightbox__prev').addEventListener('click', () => show(current - 1));
    box.querySelector('.lightbox__next').addEventListener('click', () => show(current + 1));
    box.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
    box.addEventListener('click', (e) => { if (e.target === box || e.target.classList.contains('lightbox__inner')) box.close(); });
    box.addEventListener('close', () => { if (opener) opener.focus(); });

    // Lliscar al mòbil
    let x0 = null;
    box.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) show(current + (dx < 0 ? 1 : -1));
      x0 = null;
    });
  }
});
