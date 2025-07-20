document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.split-card');
    const lineDecorations = document.querySelectorAll('.line-decoration');
    
    // Add progressive line animation on load
    setTimeout(() => {
        lineDecorations.forEach((line, index) => {
            setTimeout(() => {
                line.style.width = '40px';
            }, index * 200 + 1800);
        });
    }, 100);
    
    // Add smooth reveal on hover
    cards.forEach((card) => {
        const overlay = card.querySelector('.split-overlay');
        const title = card.querySelector('.split-title');
        
        card.addEventListener('mouseenter', () => {
            if (overlay) {
                overlay.style.background = 'rgba(0, 0, 0, 0.3)';
            }
            
            if (title) {
                title.style.letterSpacing = '0.05em';
                title.style.transform = 'scale(1.05)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (overlay) {
                overlay.style.background = '';
            }
            
            if (title) {
                title.style.letterSpacing = '';
                title.style.transform = '';
            }
        });
    });
    
    // Add intersection observer for scroll-triggered animations
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);
    
    cards.forEach(card => {
        observer.observe(card);
    });
});