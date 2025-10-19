// UI interactions for dark mode and mobile menu

// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeIcon = document.getElementById('darkModeIcon');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// Initialize dark mode based on saved preference or system preference
function initDarkMode() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark.matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (darkModeIcon) darkModeIcon.textContent = '☀️';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        if (darkModeIcon) darkModeIcon.textContent = '🌙';
    }
}

// Toggle dark mode
function toggleDarkMode() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (darkModeIcon) {
        darkModeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    }
}

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
    if (mainNav && window.innerWidth <= 768) {
        mainNav.classList.remove('active');
    }
}

// Event listeners
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', toggleDarkMode);
}

if (menuToggle) {
    menuToggle.addEventListener('click', toggleMobileMenu);
}

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

// Initialize on page load
initDarkMode();
