document.addEventListener('DOMContentLoaded', () => {
    const scrollElements = document.querySelectorAll('.scroll-element');
    const gridItems = document.querySelectorAll('.grid-item');
    
    // Trigger animations on load
    setTimeout(() => {
        scrollElements.forEach(element => {
            element.classList.add('visible');
        });
    }, 300);
    
    // Hover interactions with emphasis on hovered item
    gridItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            gridItems.forEach((g, i) => {
                if (i !== index) {
                    g.style.opacity = '0.6';
                    g.style.filter = 'brightness(0.7) blur(1px)';
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
    
    // Different parallax speeds for each item
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        
        gridItems.forEach((item, index) => {
            const img = item.querySelector('img');
            const overlay = item.querySelector('.overlay');
            
            if (!item.matches(':hover')) {
                if (item.classList.contains('large-left')) {
                    // Slower movement for large item
                    if (img) img.style.transform = `scale(1.05) translate(${x * 3}px, ${y * 3}px)`;
                    if (overlay) overlay.style.transform = `translateY(${-y * 5}px)`;
                } else {
                    // Faster movement for smaller items
                    const speed = index === 1 ? 1.5 : 2;
                    if (img) img.style.transform = `scale(1.05) translate(${x * speed * 5}px, ${y * speed * 5}px)`;
                    if (overlay) overlay.style.transform = `translateY(${-y * speed * 5}px)`;
                }
            }
        });
    });
});