// ========== تثبيت الهيدر عند التمرير ==========
const header = document.querySelector('.site-header');
const onScroll = () => {
  if (window.scrollY > 40) header.classList.add('is-scrolled');
  else header.classList.remove('is-scrolled');
};
window.addEventListener('scroll', onScroll);
onScroll();

// ========== قائمة الجوال ==========
const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileClose = document.querySelector('.mobile-menu-close');
if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => mobileMenu.classList.add('is-open'));
  mobileClose.addEventListener('click', () => mobileMenu.classList.remove('is-open'));
  mobileMenu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => mobileMenu.classList.remove('is-open'))
  );
}

// ========== أيقونة تبديل اللغة ==========
// النسخة الإنجليزية الكاملة قيد الإعداد — الأولوية حالياً للعربي (بحسب الاتفاق)
document.querySelectorAll('.lang-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const tooltip = btn.querySelector('.lang-tooltip');
    tooltip.classList.add('show');
    setTimeout(() => tooltip.classList.remove('show'), 2000);
  });
});

// ========== حجوزات / روابط مؤقتة ==========
// placeholder مؤقت لحين ربط نظام الحجز والدفع الفعلي (Cal.com + Stripe)
document.querySelectorAll('[data-booking-placeholder]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    alert('سيتم تفعيل نظام الحجز والدفع الإلكتروني قريباً. للحجز الآن تواصل عبر واتساب.');
  });
});

// ========== ظهور العناصر عند التمرير (Scroll Reveal) ==========
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// ========== تحديد الرابط النشط حسب القسم الظاهر ==========
const sections = document.querySelectorAll('main section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"], .mobile-menu a[href^="#"]');
if (sections.length && navAnchors.length) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(sec => navObserver.observe(sec));
}