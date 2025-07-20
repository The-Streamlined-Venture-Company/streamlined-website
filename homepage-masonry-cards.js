document.addEventListener('DOMContentLoaded', () => {
    const scrollElements = document.querySelectorAll('.scroll-element');
    const cards = document.querySelectorAll('.card');
    
    // Trigger animations on load
    setTimeout(() => {
        scrollElements.forEach(element => {
            element.classList.add('visible');
        });
    }, 300);
    
    // Enhanced hover interactions
    cards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            // Slightly dim other cards
            cards.forEach((c, i) => {
                if (i !== index) {
                    c.style.opacity = '0.9';
                    c.style.transform = 'scale(0.98)';
                }
            });
        });
        
        card.addEventListener('mouseleave', () => {
            cards.forEach(c => {
                c.style.opacity = '';
                c.style.transform = '';
            });
        });
    });
    
    // Subtle parallax on mouse move
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        
        cards.forEach((card, index) => {
            if (!card.matches(':hover')) {
                const speed = 0.5 + (index * 0.2);
                card.style.transform = `translate(${x * speed * 2}px, ${y * speed * 2}px)`;
            }
        });
    });
});