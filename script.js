const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  body.classList.add('light-theme');
}

if (themeToggle) {
  const icon = themeToggle.querySelector('.theme-toggle-icon');
  if (body.classList.contains('light-theme')) {
    icon.textContent = '🌙';
  }

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const isLight = body.classList.contains('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    icon.textContent = isLight ? '🌙' : '☀️';
  });
}

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => observer.observe(item));

const form = document.getElementById('lead-form');
const note = document.getElementById('form-note');
const agreement = document.getElementById('agreement');
const personalData = document.getElementById('personal-data');

if (form && note) {
  const resetNote = () => {
    note.textContent = 'Мы ответим в течение рабочего дня.';
    note.style.color = '';
  };

  [agreement, personalData].forEach((checkbox) => {
    checkbox?.addEventListener('change', resetNote);
  });

  form.addEventListener('submit', (event) => {
    if (!agreement?.checked || !personalData?.checked) {
      event.preventDefault();
      note.textContent = 'Пожалуйста, отметьте оба согласия, чтобы отправить заявку.';
      note.style.color = '#ffb4b4';
      return;
    }

    event.preventDefault();
    note.textContent = 'Спасибо! Мы скоро свяжемся с вами.';
    note.style.color = '';
    form.reset();
    resetNote();
  });
}

document.getElementById('year').textContent = new Date().getFullYear();
