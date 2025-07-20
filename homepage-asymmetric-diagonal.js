document.addEventListener('DOMContentLoaded', () => {
    const scrollElements = document.querySelectorAll('.scroll-element');
    const diagonalItems = document.querySelectorAll('.diagonal-item');
    
    // Trigger animations on load
    setTimeout(() => {
        scrollElements.forEach(element => {
            element.classList.add('visible');
        });
    }, 300);
    
    // Dynamic layering on hover
    diagonalItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            // Push other items back
            diagonalItems.forEach((d, i) => {
                if (i !== index) {
                    d.style.transform = 'scale(0.95)';
                    d.style.opacity = '0.7';
                }
            });
        });
        
        item.addEventListener('mouseleave', () => {
            diagonalItems.forEach((d, i) => {
                d.style.transform = '';
                d.style.opacity = '';
                // Reset center rotation
                if (d.classList.contains('center')) {
                    d.style.transform = 'rotate(5deg)';
                }
            });
        });
    });
    
    // Parallax on mouse move
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        
        diagonalItems.forEach((item, index) => {
            if (!item.matches(':hover')) {
                const speed = 1 - (index * 0.3);
                const rotation = item.classList.contains('center') ? 5 : 0;
                item.style.transform = `
                    translateX(${x * speed * 20}px) 
                    translateY(${y * speed * 20}px)
                    rotate(${rotation + (x * 2)}deg)
                `;
            }
        });
    });
});