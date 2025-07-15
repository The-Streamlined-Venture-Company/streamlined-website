document.addEventListener('DOMContentLoaded', () => {
    // Add breathing animation to logo after all animations complete
    setTimeout(() => {
        const logo = document.querySelector('.hero-content .logo');
        if (logo) {
            logo.classList.add('breathing');
        }
    }, 13500);
});