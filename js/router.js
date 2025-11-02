// router.js
// mapping page name -> component file
const routes = {
    home: "./components/home.html",
    about: "./components/about.html",
    projects: "./components/projects.html",
    blogs: "./components/blogs.html",
    contact: "./components/contact.html"
};

function getPageFromHash() {
    const h = location.hash.replace(/^#/, '');
    return h || 'home';
}

async function loadPage(page) {
    const file = routes[page] || routes['home'];
    // show a loading placeholder (optional)
    const main = document.getElementById('main-placeholder');
    if (!main) return;
    main.innerHTML = '<div class="loading">Loading...</div>';
    try {
        await loadComponent('main-placeholder', file);
        // update active nav link
        setActiveLink(page);
        // update history (if called programmatically)
        if (location.hash.replace(/^#/, '') !== page) {
            history.pushState({ page }, '', `#${page}`);
        }
    } catch (err) {
        main.innerHTML = `<div class="error">Không tải được trang: ${err.message}</div>`;
    }
}

function routerInit() {
    // initial
    loadPage(getPageFromHash());

    // clicks on nav links with data-page attribute
    document.addEventListener('click', (e) => {
        const a = e.target.closest('[data-page]');
        if (!a) return;
        e.preventDefault();
        const page = a.getAttribute('data-page');
        loadPage(page);
    });

    // back/forward
    window.addEventListener('popstate', () => {
        loadPage(getPageFromHash());
    });
}

function setActiveLink(page) {
    document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.toggle('active', a.getAttribute('data-page') === page);
    });
}
