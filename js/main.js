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


  // Panoràmica: arrossegar amb el ratolí (al mòbil ja es llisca amb el dit)
  document.querySelectorAll('[data-pano] .pano__track').forEach((track) => {
    let startX = 0; let startScroll = 0; let down = false;
    const img = track.querySelector('img');
    const center = () => { track.scrollLeft = 0; };
    if (img && img.complete) center(); else if (img) img.addEventListener('load', center, { once: true });
    track.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse') return;
      down = true; startX = e.clientX; startScroll = track.scrollLeft;
      track.classList.add('is-dragging'); track.setPointerCapture(e.pointerId);
    });
    track.addEventListener('pointermove', (e) => { if (down) track.scrollLeft = startScroll - (e.clientX - startX); });
    const stop = () => { down = false; track.classList.remove('is-dragging'); };
    track.addEventListener('pointerup', stop);
    track.addEventListener('pointercancel', stop);
  });


  // Mapa: es carrega només si l'usuari el demana (Google Maps instal·la galetes)
  document.querySelectorAll('[data-map-src]').forEach((box) => {
    const btn = box.querySelector('[data-map-load]');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const frame = document.createElement('iframe');
      frame.src = box.dataset.mapSrc;
      frame.title = box.dataset.mapTitle || 'Mapa';
      frame.loading = 'lazy';
      frame.referrerPolicy = 'no-referrer-when-downgrade';
      box.replaceChildren(frame);
      frame.focus();
    });
  });

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
    // Mosaic: només es veuen les 3 primeres fotos; «Veure totes les fotos» obre el visor amb totes
    const allBtn = document.querySelector('[data-gallery-all]');
    items.forEach((b, i) => { b.hidden = i >= 3; });
    // Si només hi ha les 3 fotos del mosaic, el botó no cal
    if (allBtn && items.length <= 3) allBtn.parentElement.hidden = true;
    if (allBtn) allBtn.addEventListener('click', () => {
      opener = allBtn;
      show(0);
      box.showModal();
    });
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
