// main.js
document.addEventListener('DOMContentLoaded', () => {
    // place for small UI helpers
});

// optional: smooth scroll for anchor links
document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
    }
});
