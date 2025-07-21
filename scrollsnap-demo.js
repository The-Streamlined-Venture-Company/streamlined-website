// Update active navigation indicator
function updateActiveNav() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.indicator a');
    
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLinks[index]) {
                navLinks[index].classList.add('active');
            }
        }
    });
}

// Smooth scroll to section on nav click
document.querySelectorAll('.indicator a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Update on scroll
window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

// Check if scroll-driven animations are supported
if (!CSS.supports('animation-timeline', '--section')) {
    console.log('Scroll-driven animations not supported, using polyfill');
}