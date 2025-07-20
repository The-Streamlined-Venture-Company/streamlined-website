document.addEventListener('DOMContentLoaded', () => {
    const scrollElements = document.querySelectorAll('.scroll-element');
    const rightPanel = document.querySelector('.right-panel');
    const leftPanel = document.querySelector('.left-panel');
    
    // Initial setup - trigger animations on load
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    scrollElements.forEach(element => {
        scrollObserver.observe(element);
    });
    
    // Trigger animations immediately since content is visible
    setTimeout(() => {
        scrollElements.forEach(element => {
            element.classList.add('visible');
        });
    }, 300);
    
    // Smooth scroll sync between panels
    let isScrolling = false;
    
    rightPanel.addEventListener('wheel', (e) => {
        if (!isScrolling) {
            isScrolling = true;
            e.preventDefault();
            
            const delta = e.deltaY;
            rightPanel.scrollTop += delta * 0.5;
            leftPanel.scrollTop += delta * 0.2;
            
            setTimeout(() => {
                isScrolling = false;
            }, 50);
        }
    });
    
    // Parallax effect on cards based on scroll
    rightPanel.addEventListener('scroll', () => {
        const scrolled = rightPanel.scrollTop;
        const cards = document.querySelectorAll('.split-card');
        
        cards.forEach((card, index) => {
            const img = card.querySelector('img');
            const title = card.querySelector('.split-title');
            const speed = 0.5 + (index * 0.1);
            
            if (img) {
                img.style.transform = `translateY(${scrolled * speed * 0.15}px) scale(1.1)`;
            }
            
            if (title) {
                title.style.transform = `translateY(${-scrolled * speed * 0.05}px)`;
            }
        });
    });
    
    // Elegant hover with neighboring card effects
    const cards = document.querySelectorAll('.split-card');
    
    cards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            cards.forEach((c, i) => {
                if (i === index - 1 || i === index + 1) {
                    c.style.opacity = '0.9';
                    c.style.filter = 'brightness(0.9)';
                } else if (i !== index) {
                    c.style.opacity = '0.8';
                    c.style.filter = 'brightness(0.8)';
                }
            });
        });
        
        card.addEventListener('mouseleave', () => {
            cards.forEach(c => {
                c.style.opacity = '';
                c.style.filter = '';
            });
        });
    });
});