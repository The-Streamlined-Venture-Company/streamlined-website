document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.split-card');
    const leftContent = document.querySelector('.left-content');
    
    // Add subtle floating animation to left content
    let floatY = 0;
    let targetY = 0;
    
    function floatAnimation() {
        targetY = Math.sin(Date.now() * 0.001) * 10;
        floatY += (targetY - floatY) * 0.1;
        
        if (leftContent) {
            leftContent.style.transform = `translateY(${floatY}px)`;
        }
        
        requestAnimationFrame(floatAnimation);
    }
    
    floatAnimation();
    
    // Add gentle parallax on mouse move
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        
        cards.forEach((card, index) => {
            const img = card.querySelector('img');
            const title = card.querySelector('.split-title');
            const speed = (index + 1) * 0.5;
            
            if (img) {
                img.style.transform = `scale(1.1) translate(${x * speed}px, ${y * speed}px)`;
            }
            
            if (title) {
                title.style.transform = `translate(${-x * speed * 2}px, ${-y * speed * 2}px)`;
            }
        });
    });
    
    // Add fade effect on card boundaries
    cards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            cards.forEach((c, i) => {
                if (i !== index) {
                    c.style.opacity = '0.7';
                    c.style.filter = 'brightness(0.8)';
                }
            });
        });
        
        card.addEventListener('mouseleave', () => {
            cards.forEach(c => {
                c.style.opacity = '1';
                c.style.filter = 'brightness(1)';
            });
        });
    });
});