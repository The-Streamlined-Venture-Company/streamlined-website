// Scroll-triggered animations
document.addEventListener('DOMContentLoaded', () => {
    // Create intersection observer for fade animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // Don't unobserve so animations can repeat if needed
            }
        });
    }, observerOptions);

    // Observe all elements with scroll animation classes
    const scrollElements = document.querySelectorAll('.scroll-fade-in, .scroll-fade-in-up');
    scrollElements.forEach(el => fadeObserver.observe(el));

    // Convert fade-in classes to scroll-triggered versions after initial load
    setTimeout(() => {
        document.querySelectorAll('.services-section .fade-in-up').forEach(el => {
            el.classList.remove('fade-in-up');
            el.classList.add('scroll-fade-in-up');
            fadeObserver.observe(el);
        });

        document.querySelectorAll('.consulting-section.fade-in, .contact-content.fade-in').forEach(el => {
            el.classList.remove('fade-in');
            el.classList.add('scroll-fade-in');
            fadeObserver.observe(el);
        });
    }, 1500); // After initial animations complete

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Parallax effect for hero section
    let ticking = false;
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);
});