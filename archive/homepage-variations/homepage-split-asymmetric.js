document.addEventListener('DOMContentLoaded', () => {
    const scrollElements = document.querySelectorAll('.scroll-element');
    const gridItems = document.querySelectorAll('.grid-item');
    const textLinks = document.querySelectorAll('.text-link');
    
    // Trigger animations on load
    setTimeout(() => {
        scrollElements.forEach(element => {
            element.classList.add('visible');
        });
    }, 300);
    
    // Grid item click navigation
    gridItems.forEach(item => {
        item.addEventListener('click', () => {
            const link = item.dataset.link;
            if (link) {
                window.location.href = link;
            }
        });
    });
    
    // Sync hover between text and images
    textLinks.forEach((link, index) => {
        link.addEventListener('mouseenter', () => {
            if (gridItems[index]) {
                gridItems[index].classList.add('hover');
                const img = gridItems[index].querySelector('img');
                const overlay = gridItems[index].querySelector('.overlay h3');
                
                if (img) img.style.transform = 'scale(1.1)';
                if (overlay) overlay.style.transform = 'scale(1)';
            }
        });
        
        link.addEventListener('mouseleave', () => {
            if (gridItems[index]) {
                gridItems[index].classList.remove('hover');
                const img = gridItems[index].querySelector('img');
                const overlay = gridItems[index].querySelector('.overlay h3');
                
                if (img) img.style.transform = '';
                if (overlay) overlay.style.transform = '';
            }
        });
    });
    
    // Subtle mouse tracking
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        
        gridItems.forEach((item, index) => {
            const speed = 0.5 + (index * 0.2);
            const img = item.querySelector('img');
            
            if (img && !item.matches(':hover')) {
                img.style.transform = `scale(1.05) translate(${x * speed * 2}px, ${y * speed * 2}px)`;
            }
        });
    });
});