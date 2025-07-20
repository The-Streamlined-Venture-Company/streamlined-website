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
    
    // Add slight parallax on mouse move
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
    });
    
    function animate() {
        targetX += (mouseX - targetX) * 0.1;
        targetY += (mouseY - targetY) * 0.1;
        
        bgImages.forEach(img => {
            img.style.transform = `translate(${targetX}px, ${targetY}px) scale(1.1)`;
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
});