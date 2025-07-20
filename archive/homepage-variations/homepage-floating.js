// Floating logo follows mouse subtly
document.addEventListener('DOMContentLoaded', () => {
    const floatingLogo = document.querySelector('.floating-logo');
    let mouseX = window.innerWidth - 100;
    let mouseY = 100;
    let currentX = mouseX;
    let currentY = mouseY;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animate() {
        // Smooth follow with offset
        currentX += (mouseX - currentX) * 0.05;
        currentY += (mouseY - currentY) * 0.05;
        
        // Apply subtle movement
        const offsetX = (currentX - window.innerWidth / 2) * 0.1;
        const offsetY = (currentY - window.innerHeight / 2) * 0.1;
        
        floatingLogo.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // All other homepage.js functionality
    const heroContent = document.querySelector('.hero-content');
    const navItems = document.querySelectorAll('.nav-item');
    
    // Mouse parallax effect
    let targetX = 0;
    let targetY = 0;
    
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
        const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;
        targetX = x;
        targetY = y;
    });
    
    function updateParallax() {
        heroContent.style.transform = `translate(${targetX * 20}px, ${targetY * 20}px)`;
        requestAnimationFrame(updateParallax);
    }
    
    updateParallax();
    
    // Navigation hover effects
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
});