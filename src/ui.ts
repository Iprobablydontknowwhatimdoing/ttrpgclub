// UI interactions for mobile menu (no includes)

function bindNav() {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    const toggleMobileMenu = () => {
        if (mainNav) {
            mainNav.classList.toggle('active');
            document.body.classList.toggle('no-scroll', mainNav.classList.contains('active'));
        }
    };

    const closeMobileMenu = () => {
        if (mainNav) {
            mainNav.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    };

    if (menuToggle) menuToggle.addEventListener('click', toggleMobileMenu);

    document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target && target.id === 'navClose') {
            e.preventDefault();
            closeMobileMenu();
        }
    });

    if (mainNav) {
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => link.addEventListener('click', closeMobileMenu));
    }

    window.addEventListener('resize', () => {
        const nav = document.getElementById('mainNav');
        if (window.innerWidth > 768 && nav) nav.classList.remove('active');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if ('customElements' in window && (customElements as any).whenDefined) {
        // Ensure header web component is defined and connected, then bind
        (customElements as any).whenDefined('site-header')
            .then(() => requestAnimationFrame(bindNav))
            .catch(() => bindNav());
    } else {
        bindNav();
    }
});
