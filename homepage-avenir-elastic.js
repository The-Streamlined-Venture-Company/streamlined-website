document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.text-link');
    const bgImages = document.querySelectorAll('.bg-image');
    
    // Set first image as active by default
    if (bgImages.length > 0) {
        bgImages[0].classList.add('active');
    }
    
    // Handle hover effects with elastic animation
    links.forEach((link, index) => {
        link.addEventListener('mouseenter', () => {
            bgImages.forEach(img => img.classList.remove('active'));
            if (bgImages[index]) {
                bgImages[index].classList.add('active');
            }
            
            // Add elastic wiggle to hovered link
            link.style.animation = 'none';
            setTimeout(() => {
                link.style.animation = 'wiggle 0.5s ease-in-out';
            }, 10);
        });
        
        link.addEventListener('animationend', () => {
            link.style.animation = '';
        });
    });
    
    // Add elastic bounce effect on click
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            link.style.transform = 'scale(0.95)';
            setTimeout(() => {
                link.style.transform = '';
                window.location.href = link.href;
            }, 200);
        });
    });
    
    // Add elastic parallax effect
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
    
    function elasticMove() {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;
        
        // Apply elastic movement to elements
        const logo = document.querySelector('.hero-logo');
        const title = document.querySelector('.hero-title');
        const tagline = document.querySelector('.hero-tagline');
        
        if (logo) {
            logo.style.transform = `translate(${currentX * 10}px, ${currentY * 10}px) rotate(${currentX * 2}deg)`;
        }
        
        if (title) {
            title.style.transform = `translate(${currentX * -5}px, ${currentY * -5}px)`;
        }
        
        if (tagline) {
            tagline.style.transform = `translate(${currentX * 8}px, ${currentY * 8}px)`;
        }
        
        requestAnimationFrame(elasticMove);
    }
    
    elasticMove();
});

// Add wiggle animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes wiggle {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-3deg); }
        75% { transform: rotate(3deg); }
    }
`;
document.head.appendChild(style);