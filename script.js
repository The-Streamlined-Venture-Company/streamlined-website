// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements
document.addEventListener('DOMContentLoaded', () => {
    // Observe mission section
    const missionElements = document.querySelectorAll('.mission-content h2, .mission-image');
    missionElements.forEach(el => observer.observe(el));
    
    // Observe work items
    const workItems = document.querySelectorAll('.work-item');
    workItems.forEach(el => observer.observe(el));
    
    // Smooth header on scroll
    let lastScroll = 0;
    const header = document.querySelector('.site-header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.style.boxShadow = 'none';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Parallax effect on hero image
    const heroImage = document.querySelector('.hero-image');
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const speed = 0.5;
        heroImage.style.transform = `translateY(${scrolled * speed}px)`;
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
    
    // Smooth scroll for navigation links
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
    
    // Magnetic cursor effect for navigation
    const nav = document.querySelector('.main-nav');
    const navLinks = nav.querySelectorAll('a');
    
    navLinks.forEach(link => {
        link.addEventListener('mousemove', (e) => {
            const rect = link.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            link.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translate(0, 0)';
        });
    });
    
    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});