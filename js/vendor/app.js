// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

if (cursor && follower) {
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();
}

// ===== SCROLL PROGRESS =====
const progress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (progress) progress.style.width = pct + '%';
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
});

// ===== ACTIVE NAV LINKS ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  const scrollY = window.scrollY + 100;
  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + id) {
          link.classList.add('active');
        }
      });
    }
  });
}
window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// ===== MOBILE MENU =====
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ===== TYPING EFFECT (HERO SUBTITLE) =====
const typedEl = document.getElementById('typed-text');
const phrases = [
  'Orienté Big Data',
  'Étudiant BUT Informatique',
  'Passionné par la donnée',
  'En recherche d\'alternance · Sept 2026',
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeDelay = 80;

function type() {
  if (!typedEl) return;
  const current = phrases[phraseIndex];

  if (isDeleting) {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    typeDelay = 40;
  } else {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    typeDelay = 80;
  }

  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    typeDelay = 1800;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typeDelay = 400;
  }

  setTimeout(type, typeDelay);
}
setTimeout(type, 1000);

// ===== TERMINAL CODE ANIMATION =====
const terminalCode = document.querySelector('#terminal-code code');
const codeLines = [
  '<span class="t-comment">// portfolio.js — Dorian Loeb</span>',
  '',
  '<span class="t-green-text">const</span> developer = {',
  '  <span class="t-cyan">name</span>: <span class="t-string">"Dorian Loeb"</span>,',
  '  <span class="t-cyan">age</span>: <span class="t-neon">22</span>,',
  '  <span class="t-cyan">location</span>: <span class="t-string">"Eyguières, PACA"</span>,',
  '  <span class="t-cyan">skills</span>: [',
  '    <span class="t-string">"PHP"</span>, <span class="t-string">"JavaScript"</span>,',
  '    <span class="t-string">"SQL"</span>, <span class="t-string">"Angular"</span>,',
  '    <span class="t-string">"Java"</span>, <span class="t-string">"C++"</span>',
  '  ],',
  '  <span class="t-cyan">available</span>: <span class="t-neon">true</span>,',
  '  <span class="t-cyan">openToWork</span>: <span class="t-neon">true</span>,',
  '};',
  '',
  '<span class="t-comment">// Prêt pour votre équipe !</span>',
  '<span class="t-green-text">export default</span> developer;',
];

let lineIndex = 0;
let charIdx = 0;
let codeContent = '';

function typeCode() {
  if (!terminalCode || lineIndex >= codeLines.length) return;

  const currentLine = codeLines[lineIndex];

  if (charIdx < currentLine.length) {
    // Check if we're entering an HTML tag — add instantly
    if (currentLine[charIdx] === '<') {
      const closeIdx = currentLine.indexOf('>', charIdx);
      if (closeIdx !== -1) {
        codeContent += currentLine.slice(charIdx, closeIdx + 1);
        charIdx = closeIdx + 1;
        terminalCode.innerHTML = codeContent;
        setTimeout(typeCode, 0);
        return;
      }
    }
    codeContent += currentLine[charIdx];
    charIdx++;
    terminalCode.innerHTML = codeContent;
    setTimeout(typeCode, 25);
  } else {
    codeContent += '\n';
    charIdx = 0;
    lineIndex++;
    terminalCode.innerHTML = codeContent;
    setTimeout(typeCode, lineIndex >= codeLines.length ? 0 : 80);
  }
}
setTimeout(typeCode, 1400);

// ===== REVEAL ON SCROLL =====
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger delay based on index within parent
      const siblings = entry.target.parentElement.querySelectorAll('.reveal');
      let delay = 0;
      siblings.forEach((sib, idx) => {
        if (sib === entry.target) delay = idx * 80;
      });
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

if (contactForm && submitBtn) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const original = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Message envoyé !';
      submitBtn.style.background = '#27c93f';
      submitBtn.style.color = '#050510';

      setTimeout(() => {
        submitBtn.innerHTML = original;
        submitBtn.style.background = '';
        submitBtn.style.color = '';
        submitBtn.disabled = false;
        contactForm.reset();
      }, 3000);
    }, 1500);
  });
}

// ===== FOOTER YEAR =====
const yearEl = document.getElementById('footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== TILT EFFECT ON PROJECT CARDS =====
if (window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('.project-card, .edu-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
      card.style.transform = `translateY(-6px) rotateX(${y}deg) rotateY(${x}deg)`;
      card.style.transition = 'transform 0.1s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  });
}
