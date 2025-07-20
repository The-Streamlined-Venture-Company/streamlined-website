// Smooth parallax on mouse move
document.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero-content');
    const navItems = document.querySelectorAll('.nav-item');
    
    // Mouse parallax effect
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) / window.innerWidth;
        mouseY = (e.clientY - window.innerHeight / 2) / window.innerHeight;
    });
    
    function updateParallax() {
        targetX += (mouseX - targetX) * 0.1;
        targetY += (mouseY - targetY) * 0.1;
        
        heroContent.style.transform = `translate(${targetX * 20}px, ${targetY * 20}px)`;
        
        requestAnimationFrame(updateParallax);
    }
    
    updateParallax();
    
    // Stagger navigation items on hover
    navItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            navItems.forEach((otherItem, otherIndex) => {
                if (otherIndex !== index) {
                    otherItem.style.opacity = '0.3';
                    otherItem.style.transform = 'scale(0.98)';
                }
            });
        });
        
        item.addEventListener('mouseleave', () => {
            navItems.forEach(otherItem => {
                otherItem.style.opacity = '1';
                otherItem.style.transform = 'scale(1)';
            });
        });
    });
    
    // Smooth page transitions
    const links = document.querySelectorAll('a[href$=".html"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            
            document.body.style.opacity = '0';
            
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });
    });
    
    // Add loaded class for animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const navLinks = Array.from(document.querySelectorAll('.nav-item'));
        
        switch(e.key) {
            case '1':
                navLinks[0]?.click();
                break;
            case '2':
                navLinks[1]?.click();
                break;
            case '3':
                navLinks[2]?.click();
                break;
        }
    });
});