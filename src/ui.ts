// UI interactions for mobile menu

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

function toggleMobileMenu() {
    if (mainNav) {
        mainNav.classList.toggle('active');
    }
}

// Close mobile menu when clicking a nav link
function closeMobileMenu() {
    if (mainNav) {
        mainNav.classList.remove('active');
    }
}

// Event listeners
if (menuToggle) {
    menuToggle.addEventListener('click', toggleMobileMenu);
}

// Use event delegation for close button to ensure it works
document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target && target.id === 'navClose') {
        e.preventDefault();
        closeMobileMenu();
    }
});

// Close mobile menu when clicking nav links
if (mainNav) {
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}

// Close mobile menu when window is resized to desktop size
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mainNav) {
        mainNav.classList.remove('active');
    }
});
