document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.text-link');
    const bgImages = document.querySelectorAll('.bg-image');
    
    // Set first image as active by default
    if (bgImages.length > 0) {
        bgImages[0].classList.add('active');
    }
    
    // Handle hover effects with scale animation
    links.forEach((link, index) => {
        link.addEventListener('mouseenter', () => {
            bgImages.forEach(img => img.classList.remove('active'));
            if (bgImages[index]) {
                bgImages[index].classList.add('active');
            }
        });
    });
    
    // Add magnetic effect to navigation
    links.forEach(link => {
        let bounds;
        
        link.addEventListener('mouseenter', function() {
            bounds = link.getBoundingClientRect();
        });
        
        link.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const leftX = mouseX - bounds.left;
            const topY = mouseY - bounds.top;
            const center = {
                x: leftX - bounds.width / 2,
                y: topY - bounds.height / 2
            };
            
            link.style.transform = `translate(${center.x * 0.1}px, ${center.y * 0.1}px) scale(1.05)`;
        });
        
        link.addEventListener('mouseleave', function() {
            link.style.transform = '';
        });
    });
});