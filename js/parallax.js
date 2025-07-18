// Parallax scrolling effects
document.addEventListener('DOMContentLoaded', function() {
    const parallaxBgs = document.querySelectorAll('.parallax-bg');
    const revealElements = document.querySelectorAll('.reveal-text');
    
    // Parallax effect on scroll
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        parallaxBgs.forEach(bg => {
            const section = bg.closest('.parallax-section');
            if (!section) return;
            
            const rect = section.getBoundingClientRect();
            const speed = 0.5;
            
            // Only apply parallax when section is in viewport
            if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
                const yPos = -(scrolled - section.offsetTop) * speed;
                bg.style.transform = `translateY(${yPos}px)`;
            }
        });
    }
    
    // Reveal text on scroll with Intersection Observer
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add delay if specified
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('in-view');
                }, delay * 1000);
                
                // Stop observing once revealed
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all reveal elements
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
    
    // Throttle scroll events for performance
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
            setTimeout(() => { ticking = false; }, 16);
        }
    }
    
    // Listen for scroll events
    window.addEventListener('scroll', requestTick);
    window.addEventListener('resize', updateParallax);
    
    // Initial call
    updateParallax();
});