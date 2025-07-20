document.addEventListener('DOMContentLoaded', () => {
    const scrollElements = document.querySelectorAll('.scroll-element');
    const imagesBasic = document.querySelector('.images-basic');
    const leaningCards = document.querySelectorAll('.images-leaning > div');
    
    // Trigger animations on load
    setTimeout(() => {
        scrollElements.forEach(element => {
            element.classList.add('visible');
        });
        
        if (imagesBasic) {
            imagesBasic.classList.add('visible');
        }
        
        leaningCards.forEach(card => {
            card.classList.add('visible');
        });
    }, 300);
    
    // Card click interactions
    leaningCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            const item = card.getAttribute('data-item');
            console.log(`Clicked on ${item}`);
            // Add navigation logic here
        });
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', () => {
            leaningCards.forEach((c, i) => {
                if (i !== index) {
                    c.style.opacity = '0.7';
                    c.style.filter = 'brightness(0.8)';
                }
            });
        });
        
        card.addEventListener('mouseleave', () => {
            leaningCards.forEach(c => {
                c.style.opacity = '';
                c.style.filter = '';
            });
        });
    });
    
    // Subtle parallax effect on mouse move
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
    
    function animate() {
        currentX += (mouseX - currentX) * 0.05;
        currentY += (mouseY - currentY) * 0.05;
        
        leaningCards.forEach((card, index) => {
            const img = card.querySelector('img');
            const speed = 0.3 + (index * 0.1);
            
            if (img && !card.matches(':hover')) {
                const baseTransform = window.getComputedStyle(card).transform;
                img.style.transform = `${baseTransform} translate(${currentX * speed * 2}px, ${currentY * speed * 2}px)`;
            }
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
});