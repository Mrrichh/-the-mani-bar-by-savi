// The Mani Bar by Savi website settings
// Edit these values when Savina gives you her real details.
const CONFIG = {
  instagram: "",       // Example: "themanibarbysavi"
  tiktok: "",          // Example: "themanibarbysavi"
  phone: "",           // Example: "+233 24 000 0000"
  whatsappNumber: "",  // Example: "233240000000" - no plus sign or spaces
  location: "Accra / Ghana",
  bookingMessage: "Hello Savina, I want to book a nail appointment.",
  // Leave siteUrl empty to make the QR code use the live URL after you deploy.
  // If you already know the final link, paste it here, e.g. "https://richie0987612345.github.io/the-mani-bar-by-savi/"
  siteUrl: ""
};

const navButtons = document.querySelectorAll('[data-page-target]');
const pages = document.querySelectorAll('.page');
const nav = document.querySelector('.site-nav');
const menuToggle = document.querySelector('.menu-toggle');

function showPage(pageId, push = true) {
  pages.forEach(page => page.classList.toggle('active', page.dataset.page === pageId));
  document.querySelectorAll('.nav-link').forEach(btn => btn.classList.toggle('active', btn.dataset.pageTarget === pageId));
  if (push) history.replaceState(null, '', `#${pageId}`);
  nav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  revealVisible();
}

navButtons.forEach(button => {
  button.addEventListener('click', event => {
    const pageId = button.dataset.pageTarget;
    if (!pageId) return;
    event.preventDefault();
    showPage(pageId);
  });
});

menuToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

window.addEventListener('hashchange', () => {
  const pageId = location.hash.replace('#', '') || 'home';
  if (document.querySelector(`[data-page="${pageId}"]`)) showPage(pageId, false);
});

const startingPage = location.hash.replace('#', '') || 'home';
if (document.querySelector(`[data-page="${startingPage}"]`)) showPage(startingPage, false);

// Contact details
const instagramLink = document.getElementById('instagramLink');
const tiktokLink = document.getElementById('tiktokLink');
const phoneLink = document.getElementById('phoneLink');
const bookingLink = document.getElementById('bookingLink');

if (CONFIG.instagram) {
  instagramLink.href = `https://instagram.com/${CONFIG.instagram.replace('@', '')}`;
  instagramLink.querySelector('span').textContent = `@${CONFIG.instagram.replace('@', '')}`;
}
if (CONFIG.tiktok) {
  tiktokLink.href = `https://www.tiktok.com/@${CONFIG.tiktok.replace('@', '')}`;
  tiktokLink.querySelector('span').textContent = `@${CONFIG.tiktok.replace('@', '')}`;
}
if (CONFIG.phone) {
  phoneLink.href = `tel:${CONFIG.phone.replace(/\s/g, '')}`;
  phoneLink.querySelector('span').textContent = CONFIG.phone;
}
if (CONFIG.whatsappNumber) {
  bookingLink.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.bookingMessage)}`;
} else {
  bookingLink.href = '#';
  bookingLink.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Add Savina’s WhatsApp number in script.js first.');
  });
}

document.querySelectorAll('.contact-lines span strong').forEach(el => el.textContent = CONFIG.location);

// QR code for the live portfolio link. The local fallback image is assets/qr-portfolio.png
function getPortfolioUrl() {
  if (CONFIG.siteUrl.trim()) return CONFIG.siteUrl.trim();
  if (location.protocol.startsWith('http')) return location.href.split('#')[0];
  return 'https://your-portfolio-link.com';
}
const portfolioUrl = getPortfolioUrl();
document.getElementById('siteUrlText').textContent = portfolioUrl.replace(/^https?:\/\//, '');
document.querySelectorAll('[data-qr]').forEach(img => {
  const liveQr = `https://api.qrserver.com/v1/create-qr-code/?size=420x420&margin=14&color=8f4c43&bgcolor=fffaf7&data=${encodeURIComponent(portfolioUrl)}`;
  const fallback = img.getAttribute('src');
  img.src = liveQr;
  img.onerror = () => { img.src = fallback; };
});

// Reveal animations
const reveals = document.querySelectorAll('.reveal');
function revealVisible() {
  const activePage = document.querySelector('.page.active');
  activePage?.querySelectorAll('.reveal').forEach(item => item.classList.add('visible'));
}
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: .12 });
reveals.forEach(el => observer.observe(el));
revealVisible();

// Gallery lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
document.querySelectorAll('[data-lightbox]').forEach(button => {
  button.addEventListener('click', () => {
    lightboxImg.src = button.dataset.lightbox;
    lightbox.hidden = false;
  });
});
lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.hidden = true);
lightbox.addEventListener('click', event => {
  if (event.target === lightbox) lightbox.hidden = true;
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') lightbox.hidden = true;
});

document.getElementById('year').textContent = new Date().getFullYear();
