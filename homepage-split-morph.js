document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.split-card');
    const leftContent = document.querySelector('.left-content');
    const heroTitle = document.querySelector('.hero-title');
    
    // Morph effect on mouse position
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        // Subtle morph distortion based on mouse position
        const skewX = (x - 0.5) * 5;
        const skewY = (y - 0.5) * 5;
        
        if (heroTitle) {
            heroTitle.style.transform = `skew(${skewX * 0.5}deg, ${skewY * 0.5}deg)`;
        }
    });
    
    // Card morph interactions
    cards.forEach((card, index) => {
        const overlay = card.querySelector('.split-overlay');
        const title = card.querySelector('.split-title');
        
        card.addEventListener('mouseenter', () => {
            // Morph adjacent cards
            cards.forEach((c, i) => {
                if (i !== index) {
                    c.style.transform = i < index ? 'translateY(-10px)' : 'translateY(10px)';
                    c.style.opacity = '0.8';
                }
            });
            
            // Morph current card
            card.style.transform = 'scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            cards.forEach(c => {
                c.style.transform = '';
                c.style.opacity = '';
            });
        });
        
        // Smooth morph on click
        card.addEventListener('click', (e) => {
            e.preventDefault();
            
            overlay.style.clipPath = 'circle(200% at 50% 50%)';
            card.style.clipPath = 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)';
            
            setTimeout(() => {
                window.location.href = card.href;
            }, 800);
        });
    });
    
    // Continuous subtle morph animation
    let time = 0;
    function morphAnimation() {
        time += 0.01;
        
        const logo = document.querySelector('.hero-logo');
        if (logo) {
            const morphX = Math.sin(time) * 2;
            const morphY = Math.cos(time * 0.7) * 2;
            logo.style.transform = `translate(${morphX}px, ${morphY}px)`;
        }
        
        requestAnimationFrame(morphAnimation);
    }
    
    morphAnimation();
});