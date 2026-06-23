/* ============================================================
   RUN WORLD — main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  updateCartUI();
  initScrollAnimations();
  initWishlist();
  initCarousels();
  initNewsletter();
  initShopPage();
});

/* ── Header scroll shadow ── */
function initHeader() {
  const h = document.querySelector('.site-header');
  if (!h) return;
  const onScroll = () => h.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ── Mobile hamburger ── */
function initMobileMenu() {
  const btn = document.querySelector('.hamburger');
  const nav = document.querySelector('.mobile-nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  nav.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      btn.classList.remove('open');
      document.body.style.overflow = '';
    })
  );
}

/* ── Cart ── */
function getCartCount() {
  return parseInt(localStorage.getItem('rw-cart') || '0', 10);
}
function setCartCount(n) {
  localStorage.setItem('rw-cart', n);
}
function updateCartUI() {
  const badges = document.querySelectorAll('.cart-count');
  const count = getCartCount();
  badges.forEach(b => { b.textContent = count; b.style.display = count > 0 ? 'flex' : 'none'; });
}
function addToCart(btn) {
  setCartCount(getCartCount() + 1);
  updateCartUI();
  const orig = btn.textContent;
  btn.textContent = '✓ Adicionado';
  btn.classList.add('added');
  setTimeout(() => { btn.textContent = orig; btn.classList.remove('added'); }, 1400);
}
document.addEventListener('click', e => {
  if (e.target.closest('.btn-add')) addToCart(e.target.closest('.btn-add'));
});

/* ── Wishlist ── */
function initWishlist() {
  document.addEventListener('click', e => {
    const btn = e.target.closest('.wishlist-btn');
    if (btn) btn.classList.toggle('active');
  });
}

/* ── Scroll fade-up animations ── */
function initScrollAnimations() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.fade-up').forEach(el => el.classList.add('visible'));
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 60);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
}

/* ── Carousels ── */
function initCarousels() {
  document.querySelectorAll('.race-carousel').forEach(wrap => initCarousel(wrap));
}

function initCarousel(wrap) {
  const track = wrap.querySelector('.carousel-track');
  const slides = wrap.querySelectorAll('.carousel-slide');
  const dotsWrap = wrap.querySelector('.carousel-dots');
  const prevBtn = wrap.querySelector('.carousel-btn.prev');
  const nextBtn = wrap.querySelector('.carousel-btn.next');
  if (!track || slides.length === 0) return;

  let current = 0;
  let timer;

  /* build dots */
  if (dotsWrap) {
    slides.forEach((_, i) => {
      const d = document.createElement('button');
      d.className = 'dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', `Slide ${i + 1}`);
      d.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(d);
    });
  }

  function goTo(idx) {
    current = (idx + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dotsWrap && dotsWrap.querySelectorAll('.dot').forEach((d, i) =>
      d.classList.toggle('active', i === current)
    );
  }

  function startTimer() { timer = setInterval(() => goTo(current + 1), 4500); }
  function stopTimer()  { clearInterval(timer); }

  prevBtn && prevBtn.addEventListener('click', () => { goTo(current - 1); stopTimer(); startTimer(); });
  nextBtn && nextBtn.addEventListener('click', () => { goTo(current + 1); stopTimer(); startTimer(); });
  wrap.addEventListener('mouseenter', stopTimer);
  wrap.addEventListener('mouseleave', startTimer);

  startTimer();
}

/* ── Newsletter ── */
function initNewsletter() {
  const form = document.querySelector('.newsletter-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const input = form.querySelector('input');
    const btn   = form.querySelector('button');
    if (!input.value.trim()) return;
    btn.textContent = '✓ Inscrito!';
    btn.style.background = '#16a34a';
    input.value = '';
    setTimeout(() => { btn.textContent = 'Inscrever-se'; btn.style.background = ''; }, 3000);
  });
}

/* ── Shop page filters + sort ── */
function initShopPage() {
  const grid = document.querySelector('.shop-grid');
  if (!grid) return;

  const sortSel = document.getElementById('sort-select');
  const countEl = document.querySelector('.shop-count');

  function getCards() { return Array.from(grid.querySelectorAll('.product-card')); }

  function applyFilters() {
    const checkedBrands = [...document.querySelectorAll('.filter-brand:checked')].map(c => c.value);
    const checkedTypes  = [...document.querySelectorAll('.filter-type:checked')].map(c => c.value);

    let visible = 0;
    getCards().forEach(card => {
      const brand = card.dataset.brand || '';
      const type  = card.dataset.type  || '';
      const showB = checkedBrands.length === 0 || checkedBrands.includes(brand);
      const showT = checkedTypes.length  === 0 || checkedTypes.includes(type);
      const show  = showB && showT;
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    if (countEl) countEl.textContent = `${visible} produto${visible !== 1 ? 's' : ''} encontrado${visible !== 1 ? 's' : ''}`;
  }

  function applySort() {
    if (!sortSel) return;
    const val = sortSel.value;
    const cards = getCards().filter(c => c.style.display !== 'none');
    cards.sort((a, b) => {
      const pa = parseFloat(a.dataset.price || 0);
      const pb = parseFloat(b.dataset.price || 0);
      if (val === 'price-asc')  return pa - pb;
      if (val === 'price-desc') return pb - pa;
      return 0;
    });
    cards.forEach(c => grid.appendChild(c));
  }

  document.querySelectorAll('.filter-brand, .filter-type').forEach(cb =>
    cb.addEventListener('change', () => { applyFilters(); applySort(); })
  );
  sortSel && sortSel.addEventListener('change', () => { applyFilters(); applySort(); });

  const clearBtn = document.querySelector('.btn-clear-filters');
  clearBtn && clearBtn.addEventListener('click', () => {
    document.querySelectorAll('.filter-brand, .filter-type').forEach(cb => cb.checked = false);
    applyFilters();
    applySort();
  });

  applyFilters();
}
