document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.text-link');
    const bgImages = document.querySelectorAll('.bg-image');
    
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
        });
    });
    
    // Add smooth cursor following effect
    const container = document.querySelector('.minimal-container');
    let cursor = { x: 0, y: 0 };
    let smooth = { x: 0, y: 0 };
    
    container.addEventListener('mousemove', (e) => {
        cursor.x = e.clientX / window.innerWidth;
        cursor.y = e.clientY / window.innerHeight;
    });
    
    function smoothCursor() {
        smooth.x += (cursor.x - smooth.x) * 0.08;
        smooth.y += (cursor.y - smooth.y) * 0.08;
        
        const translateX = (smooth.x - 0.5) * 30;
        const translateY = (smooth.y - 0.5) * 30;
        
        document.querySelector('.content-wrapper').style.transform = 
            `translate(${-translateX * 0.3}px, ${-translateY * 0.3}px)`;
        
        requestAnimationFrame(smoothCursor);
    }
    
    smoothCursor();
});