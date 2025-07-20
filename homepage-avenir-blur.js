document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.text-link');
    const bgImages = document.querySelectorAll('.bg-image');
    const nav = document.querySelector('.minimal-nav');
    
    // Set first image as active by default
    if (bgImages.length > 0) {
        bgImages[0].classList.add('active');
    }
    
    // Handle hover effects
    links.forEach((link, index) => {
        link.addEventListener('mouseenter', () => {
            bgImages.forEach(img => img.classList.remove('active'));
            if (bgImages[index]) {
                bgImages[index].classList.add('active');
            }
            
            // Add focus class to navigation for blur effect
            nav.classList.add('hovering');
            links.forEach((l, i) => {
                if (i !== index) {
                    l.style.filter = 'blur(3px)';
                    l.style.opacity = '0.5';
                } else {
                    l.style.filter = 'blur(0)';
                    l.style.opacity = '1';
                }
            });
        });
        
        link.addEventListener('mouseleave', () => {
            nav.classList.remove('hovering');
            links.forEach(l => {
                l.style.filter = '';
                l.style.opacity = '';
            });
        });
    });
    
    // Add depth effect on mouse move
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        const depth = 20;
        const moveX = (x - 0.5) * depth;
        const moveY = (y - 0.5) * depth;
        
        bgImages.forEach((img, index) => {
            const offset = index * 0.5;
            img.style.transform = `translate(${moveX * (1 + offset)}px, ${moveY * (1 + offset)}px) scale(1.1)`;
        });
    });
});