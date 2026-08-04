const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const themeToggle = document.getElementById('theme-toggle');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

function setTheme(mode) {
  document.documentElement.dataset.theme = mode;
  localStorage.setItem('site-theme', mode);
  if (themeToggle) {
    themeToggle.textContent = mode === 'light' ? '🌙' : '☀️';
    themeToggle.setAttribute('aria-label', mode === 'light' ? 'Переключить тёмную тему' : 'Переключить светлую тему');
  }
}

function initTheme() {
  const saved = localStorage.getItem('site-theme');
  const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  setTheme(saved || prefers);
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.dataset.theme || 'dark';
    setTheme(current === 'dark' ? 'light' : 'dark');
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

function sanitizeInput(value) {
  return String(value || '')
    .trim()
    .replace(/[<>]/g, '')
    .slice(0, 600);
}

function setNote(message, isError = false) {
  if (!note) return;
  note.textContent = message;
  note.classList.toggle('error', isError);
}

if (form && note) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const botField = form.querySelector('input[name="company"]');
    if (botField && botField.value.trim() !== '') {
      setNote('Сообщение не отправлено. Попробуйте ещё раз.', true);
      return;
    }

    const nameInput = form.querySelector('input[name="name"]');
    const phoneInput = form.querySelector('input[name="phone"]');
    const messageInput = form.querySelector('textarea[name="message"]');

    const name = sanitizeInput(nameInput?.value || '');
    const phone = sanitizeInput(phoneInput?.value || '');
    const message = sanitizeInput(messageInput?.value || '');

    if (!name || !phone) {
      setNote('Пожалуйста, заполните имя и телефон.', true);
      return;
    }

    if (!/^\+?[0-9\s\-()]{7,20}$/.test(phone)) {
      setNote('Пожалуйста, проверьте номер телефона.', true);
      return;
    }

    if (message.length > 600) {
      setNote('Слишком длинное сообщение.', true);
      return;
    }

    setNote('Спасибо! Мы скоро свяжемся с вами.');
    form.submit();
  });
}

initTheme();
document.getElementById('year').textContent = new Date().getFullYear();
