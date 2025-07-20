// Stacked cards interaction
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.stacked-card');
    
    cards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            // Fan out cards on hover
            cards.forEach((c, i) => {
                if (i !== index) {
                    c.style.opacity = '0.7';
                }
            });
        });
        
        card.addEventListener('mouseleave', () => {
            cards.forEach(c => {
                c.style.opacity = '1';
            });
        });
    });
    
    // All standard homepage functionality
    const heroContent = document.querySelector('.hero-content');
    const navItems = document.querySelectorAll('.nav-item');
    
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
});