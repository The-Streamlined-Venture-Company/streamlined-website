document.addEventListener('DOMContentLoaded', () => {
    const scrollElements = document.querySelectorAll('.scroll-element');
    const overlapCards = document.querySelectorAll('.overlap-card');
    
    // Trigger animations on load
    setTimeout(() => {
        scrollElements.forEach(element => {
            element.classList.add('visible');
        });
    }, 300);
    
    // Dynamic card stacking
    overlapCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            // Bring to front and push others back
            overlapCards.forEach((c, i) => {
                if (i !== index) {
                    const offset = i < index ? -30 : 30;
                    c.style.transform = `translateX(${offset}px) scale(0.9)`;
                    c.style.filter = 'brightness(0.8)';
                }
            });
        });
        
        card.addEventListener('mouseleave', () => {
            overlapCards.forEach((c, i) => {
                c.style.transform = '';
                c.style.filter = '';
                // Reset rotations
                if (c.classList.contains('secondary')) {
                    c.style.transform = 'rotate(-3deg)';
                } else if (c.classList.contains('tertiary')) {
                    c.style.transform = 'rotate(2deg)';
                }
            });
        });
    });
    
    // 3D tilt effect on mouse move
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        
        overlapCards.forEach((card, index) => {
            if (!card.matches(':hover')) {
                const rotateX = -y * 10;
                const rotateY = x * 10;
                const translateZ = 50 - (index * 20);
                
                card.style.transform = `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateZ(${translateZ}px)
                `;
            }
        });
    });
});