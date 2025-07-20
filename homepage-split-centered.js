document.addEventListener('DOMContentLoaded', () => {
    const scrollElements = document.querySelectorAll('.scroll-element');
    const cards = document.querySelectorAll('.split-card');
    
    // Trigger animations on load
    setTimeout(() => {
        scrollElements.forEach(element => {
            element.classList.add('visible');
        });
    }, 300);
    
    // Dynamic edge bleed on mouse position
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        cards.forEach((card, index) => {
            const inner = card.querySelector('.card-inner');
            const img = card.querySelector('img');
            
            // Adjust skew based on mouse position
            const skewAmount = -5 + (x * 10);
            
            if (inner) {
                inner.style.transform = `skewX(${skewAmount}deg)`;
            }
            
            if (img) {
                img.style.transform = `skewX(${-skewAmount}deg) scale(1.1) translate(${x * 10}px, ${y * 10}px)`;
            }
        });
    });
    
    // Enhanced hover interactions
    cards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            cards.forEach((c, i) => {
                if (i !== index) {
                    c.style.opacity = '0.7';
                }
            });
        });
        
        card.addEventListener('mouseleave', () => {
            cards.forEach(c => {
                c.style.opacity = '1';
            });
        });
    });
});