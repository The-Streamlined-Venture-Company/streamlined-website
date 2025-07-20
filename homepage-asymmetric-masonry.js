document.addEventListener('DOMContentLoaded', () => {
    const scrollElements = document.querySelectorAll('.scroll-element');
    const gridItems = document.querySelectorAll('.grid-item');
    
    // Trigger animations on load
    setTimeout(() => {
        scrollElements.forEach(element => {
            element.classList.add('visible');
        });
    }, 300);
    
    // Hover interactions
    gridItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            gridItems.forEach((g, i) => {
                if (i !== index) {
                    g.style.opacity = '0.6';
                    g.style.filter = 'brightness(0.7)';
                }
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gridItems.forEach(g => {
                g.style.opacity = '';
                g.style.filter = '';
            });
        });
    });
    
    // Parallax on mouse move
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        
        gridItems.forEach((item, index) => {
            const img = item.querySelector('img');
            const speed = 0.5 + (index * 0.3);
            
            if (img && !item.matches(':hover')) {
                img.style.transform = `scale(1.05) translate(${x * speed * 5}px, ${y * speed * 5}px)`;
            }
        });
    });
});