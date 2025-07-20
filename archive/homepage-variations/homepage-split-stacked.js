document.addEventListener('DOMContentLoaded', () => {
    const scrollElements = document.querySelectorAll('.scroll-element');
    const stackCards = document.querySelectorAll('.stack-card');
    
    // Trigger animations on load
    setTimeout(() => {
        scrollElements.forEach(element => {
            element.classList.add('visible');
        });
    }, 300);
    
    // Dynamic card stacking on hover
    stackCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            // Bring hovered card to front
            stackCards.forEach((c, i) => {
                if (i < index) {
                    c.style.zIndex = 10 - i;
                } else if (i > index) {
                    c.style.zIndex = 1;
                } else {
                    c.style.zIndex = 20;
                }
            });
        });
        
        card.addEventListener('mouseleave', () => {
            // Reset z-index
            stackCards.forEach((c, i) => {
                c.style.zIndex = 3 - i;
            });
        });
    });
    
    // Parallax effect on mouse move
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        
        stackCards.forEach((card, index) => {
            const speed = 1 + (index * 0.5);
            if (!card.matches(':hover')) {
                card.style.transform = `
                    translateX(${x * speed * 10}px) 
                    translateY(${y * speed * 10}px)
                    rotateX(${-y * 5}deg)
                    rotateY(${x * 5}deg)
                `;
            }
        });
    });
});