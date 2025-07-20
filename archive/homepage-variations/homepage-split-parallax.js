document.addEventListener('DOMContentLoaded', () => {
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    const parallaxContainers = document.querySelectorAll('.parallax-container');
    const splitCards = document.querySelectorAll('.split-card');
    
    // Mouse parallax effect
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
    
    // Smooth parallax animation loop
    function updateParallax() {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;
        
        // Left panel parallax layers
        parallaxLayers.forEach(layer => {
            const speed = parseFloat(layer.dataset.speed) || 1;
            const x = currentX * 20 * speed;
            const y = currentY * 20 * speed;
            layer.style.transform = `translate(${x}px, ${y}px)`;
        });
        
        // Right panel image parallax
        parallaxContainers.forEach((container, index) => {
            const speed = 0.5 + (index * 0.2);
            const x = -currentX * 30 * speed;
            const y = -currentY * 30 * speed;
            container.style.transform = `translate(${x}px, ${y}px) scale(1.1)`;
        });
        
        requestAnimationFrame(updateParallax);
    }
    
    updateParallax();
    
    // Depth effect on card hover
    splitCards.forEach((card, index) => {
        const container = card.querySelector('.parallax-container');
        const title = card.querySelector('.split-title');
        const overlay = card.querySelector('.split-overlay');
        
        card.addEventListener('mouseenter', () => {
            // Create depth by affecting other cards
            splitCards.forEach((c, i) => {
                const cContainer = c.querySelector('.parallax-container');
                const cOverlay = c.querySelector('.split-overlay');
                
                if (i !== index) {
                    cContainer.style.transform = `translateZ(-50px) scale(1.05)`;
                    cOverlay.style.opacity = '0.8';
                } else {
                    container.style.transform = `translateZ(50px) scale(1.15)`;
                }
            });
            
            // 3D title effect
            if (title) {
                title.style.transform = 'translateZ(100px) scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            splitCards.forEach(c => {
                const cContainer = c.querySelector('.parallax-container');
                const cOverlay = c.querySelector('.split-overlay');
                cContainer.style.transform = '';
                cOverlay.style.opacity = '';
            });
            
            if (title) {
                title.style.transform = '';
            }
        });
        
        // Individual card mouse tracking
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            const tiltX = (y - 0.5) * 10;
            const tiltY = (x - 0.5) * -10;
            
            overlay.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            overlay.style.transform = '';
        });
    });
    
    // Subtle auto-parallax animation
    let time = 0;
    function autoParallax() {
        time += 0.005;
        
        const autoX = Math.sin(time) * 0.1;
        const autoY = Math.cos(time * 0.7) * 0.1;
        
        parallaxContainers.forEach((container, index) => {
            const currentTransform = container.style.transform;
            const baseTransform = currentTransform.replace(/translate\([^)]*\)/, '');
            container.style.transform = `translate(${autoX * 10 * (index + 1)}px, ${autoY * 10 * (index + 1)}px) ${baseTransform}`;
        });
    }
    
    setInterval(autoParallax, 50);
});