// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Smooth scroll implementation using Lenis
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

// Update ScrollTrigger on Lenis scroll
lenis.on('scroll', ScrollTrigger.update);

// GSAP ticker for Lenis
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Navigation active state
const updateActiveNav = () => {
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
};

// Update navigation on scroll
window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

// Smooth scroll to sections on nav click
document.querySelectorAll('.indicator a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            lenis.scrollTo(target);
        }
    });
});

// Horizontal scroll section
window.addEventListener('load', function () {
    const pinWrap = document.querySelector('.pin-wrap');
    const pinItems = document.querySelectorAll('.pin-wrap > *');
    
    if (pinWrap && pinItems.length > 0) {
        const pinWrapWidth = pinWrap.scrollWidth;
        const horizontalScrollLength = pinWrapWidth - window.innerWidth;

        // Create horizontal scroll effect
        gsap.to('.pin-wrap', {
            x: -horizontalScrollLength,
            ease: 'none',
            scrollTrigger: {
                trigger: '#sectionPin',
                start: 'top top',
                end: () => `+=${pinWrapWidth}`,
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
            }
        });

        // Animate individual items
        pinItems.forEach((item, index) => {
            gsap.from(item, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: '#sectionPin',
                    start: () => `top+=${index * (window.innerWidth * 0.3)} top`,
                    toggleActions: 'play none none reverse',
                }
            });
        });
    }

    // Refresh ScrollTrigger
    ScrollTrigger.refresh();
});

// Parallax effects for images
gsap.utils.toArray('.icon-placeholder, .intro-logo, .about-image').forEach(img => {
    gsap.to(img, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
            trigger: img.closest('.section'),
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
        }
    });
});

// Text reveal animations
gsap.utils.toArray('.text p').forEach((p, index) => {
    gsap.from(p, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: index * 0.2,
        scrollTrigger: {
            trigger: p.closest('.section'),
            start: 'top 80%',
            toggleActions: 'play none none reverse',
        }
    });
});

// Color theme changes based on section
const sections = gsap.utils.toArray('.section');
sections.forEach((section, index) => {
    const colors = [
        { bg: '#f8f7f5', text: '#111' },
        { bg: '#e6f2ff', text: '#0066FF' },
        { bg: '#fff9e6', text: '#997a00' },
        { bg: '#ffe6e6', text: '#cc0000' },
        { bg: '#f0f0f0', text: '#333' }
    ];
    
    ScrollTrigger.create({
        trigger: section,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => {
            gsap.to('body', {
                backgroundColor: colors[index % colors.length].bg,
                color: colors[index % colors.length].text,
                duration: 0.6,
            });
        },
        onEnterBack: () => {
            gsap.to('body', {
                backgroundColor: colors[index % colors.length].bg,
                color: colors[index % colors.length].text,
                duration: 0.6,
            });
        }
    });
});

// Add polyfill message for Firefox
if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
    console.log('Note: Scroll-driven animations are not natively supported in Firefox. Using ScrollTrigger for animation effects.');
}

// Handle resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});