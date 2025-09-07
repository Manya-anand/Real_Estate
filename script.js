// section navigation & UI enhancements
document.addEventListener('DOMContentLoaded', () => {
  const sections = Array.from(document.querySelectorAll('.section'));
  const targets = document.querySelectorAll('[data-target]');
  const form = document.getElementById('enquiryForm');
  const formStatus = document.getElementById('formStatus');

  function hideAll() {
    sections.forEach(s => {
      s.style.display = 'none';
      s.classList.remove('fade-in');
    });
  }

  function showSection(id) {
    const target = document.getElementById(id);
    if (!target) return;
    hideAll();
    target.style.display = 'block';
    target.classList.add('fade-in');
    // scroll to top of section smoothly
    window.scrollTo({ top: target.offsetTop - 16, behavior: 'smooth' });

    // move keyboard focus to first focusable element in section for accessibility
    const focusable = target.querySelector('button, a, input, textarea, [tabindex]');
    if (focusable) focusable.focus();
  }

  // attach click handlers for data-target controls (buttons, cards, links)
  targets.forEach(el => {
    el.addEventListener('click', (e) => {
      const id = el.getAttribute('data-target');
      if (id) showSection(id);
    });
    // allow keyboard Enter/Space on cards with tabindex
    el.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && el.getAttribute('data-target')) {
        e.preventDefault();
        showSection(el.getAttribute('data-target'));
      }
    });
  });

  // initial show
  showSection('sectionhome');

  // simple form simulation
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Sending...';
      formStatus.textContent = '';
      // fake network delay
      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = 'Send enquiry';
        formStatus.textContent = 'Thank you — we received your enquiry. Our sales team will contact you within 24 hours.';
        form.reset();
      }, 900);
    });
  }

  // allow Escape to go back to list/home
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // if any details page visible, go back to list
      const detailIds = ['section3bhk','section2bhk','section4bhk'];
      const visibleDetail = detailIds.find(id => document.getElementById(id).style.display === 'block');
      if (visibleDetail) showSection('sectionlist');
    }
  });

  // improve image loading experience (optional)
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => img.classList.add('broken'));
  });
});
