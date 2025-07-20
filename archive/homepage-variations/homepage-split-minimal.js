document.addEventListener('DOMContentLoaded', () => {
    const scrollElements = document.querySelectorAll('.scroll-element');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Trigger animations on load
    setTimeout(() => {
        scrollElements.forEach(element => {
            element.classList.add('visible');
        });
    }, 300);
    
    // Enhanced hover interactions
    galleryItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            // Dim other items
            galleryItems.forEach((g, i) => {
                if (i !== index) {
                    g.style.opacity = '0.3';
                    g.style.filter = 'brightness(0.5)';
                }
            });
        });
        
        item.addEventListener('mouseleave', () => {
            galleryItems.forEach(g => {
                g.style.opacity = '';
                g.style.filter = '';
            });
        });
    });
    
    // Subtle parallax on images
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        
        galleryItems.forEach((item, index) => {
            const img = item.querySelector('img');
            const overlay = item.querySelector('.overlay');
            const speed = 0.5 + (index * 0.2);
            
            if (img) {
                img.style.transform = `scale(1.1) translate(${x * speed * 5}px, ${y * speed * 5}px)`;
            }
            
            if (overlay) {
                overlay.style.transform = `translateY(${-y * 10}px)`;
            }
        });
    });
    
    // Smooth transition on click
    galleryItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            item.style.flex = '5';
            
            setTimeout(() => {
                window.location.href = item.href;
            }, 800);
        });
    });
});