document.addEventListener('DOMContentLoaded', () => {
    const scrollElements = document.querySelectorAll('.scroll-element');
    const gridItems = document.querySelectorAll('.grid-item');
    
    // Trigger animations on load
    setTimeout(() => {
        scrollElements.forEach(element => {
            element.classList.add('visible');
        });
    }, 300);
    
    // Hover interactions with focus effect
    gridItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            gridItems.forEach((g, i) => {
                if (i !== index) {
                    g.style.opacity = '0.7';
                    g.style.filter = 'brightness(0.8)';
                    g.style.transform = 'scale(0.98)';
                }
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gridItems.forEach(g => {
                g.style.opacity = '';
                g.style.filter = '';
                g.style.transform = '';
            });
        });
    });
    
    // Directional parallax based on layout position
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        
        gridItems.forEach((item, index) => {
            const img = item.querySelector('img');
            const overlay = item.querySelector('.overlay h3');
            
            if (!item.matches(':hover')) {
                if (item.classList.contains('l-shape')) {
                    // Horizontal movement for L-shape
                    if (img) img.style.transform = `scale(1.05) translateX(${x * 8}px)`;
                    if (overlay) overlay.style.transform = `translateX(${-x * 10}px)`;
                } else if (item.classList.contains('square-right')) {
                    // Diagonal movement for square
                    if (img) img.style.transform = `scale(1.05) translate(${x * 10}px, ${y * 10}px)`;
                    if (overlay) overlay.style.transform = `translate(${-x * 5}px, ${-y * 5}px)`;
                } else if (item.classList.contains('bottom-wide')) {
                    // Vertical movement for bottom
                    if (img) img.style.transform = `scale(1.05) translateY(${y * 8}px)`;
                    if (overlay) overlay.style.transform = `translateY(${-y * 10}px)`;
                }
            }
        });
    });
});