// Progressive Scroll Animation
document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.logo');
    const nav = document.querySelector('.nav, .top-nav');
    
    if (!logo || !nav) return;
    
    // Get initial positions and sizes
    const logoRect = logo.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    
    const initialLogo = {
        width: logoRect.width,
        height: logoRect.height,
        top: logoRect.top + window.scrollY,
        left: logoRect.left
    };
    
    const initialNav = {
        top: navRect.top + window.scrollY,
        right: window.innerWidth - navRect.right,
        fontSize: 28 // Original nav font size
    };
    
    // Target values when fully scrolled
    const targetLogo = {
        width: 60,
        height: 90,
        top: 10, // Very top of screen
        left: 48
    };
    
    const targetNav = {
        top: 25, // Aligned with logo at very top
        right: 48,
        fontSize: 16
    };
    
    // Animation range
    const startScroll = 0;
    const endScroll = 400; // Complete animation over 400px of scroll
    
    function lerp(start, end, progress) {
        return start + (end - start) * progress;
    }
    
    function handleScroll() {
        const scrollY = window.scrollY;
        const progress = Math.min(Math.max((scrollY - startScroll) / (endScroll - startScroll), 0), 1);
        
        if (progress > 0) {
            // Make elements fixed if not already
            if (logo.style.position !== 'fixed') {
                logo.style.position = 'fixed';
                logo.style.zIndex = '100';
                nav.style.position = 'fixed';
                nav.style.zIndex = '100';
            }
            
            // Animate logo
            logo.style.width = lerp(initialLogo.width, targetLogo.width, progress) + 'px';
            logo.style.height = lerp(initialLogo.height, targetLogo.height, progress) + 'px';
            logo.style.top = lerp(initialLogo.top - scrollY, targetLogo.top, progress) + 'px';
            logo.style.left = lerp(initialLogo.left, targetLogo.left, progress) + 'px';
            
            // Animate nav position
            nav.style.top = lerp(initialNav.top - scrollY, targetNav.top, progress) + 'px';
            nav.style.right = lerp(initialNav.right, targetNav.right, progress) + 'px';
            
            // Animate nav font size
            const navLinks = nav.querySelectorAll('a');
            navLinks.forEach(link => {
                link.style.fontSize = lerp(initialNav.fontSize, targetNav.fontSize, progress) + 'px';
            });
            
            // Add background when scrolled
            if (progress > 0.1) {
                document.body.classList.add('scrolled');
            } else {
                document.body.classList.remove('scrolled');
            }
        } else {
            // Reset to original positions
            logo.style.position = '';
            logo.style.width = '';
            logo.style.height = '';
            logo.style.top = '';
            logo.style.left = '';
            logo.style.zIndex = '';
            
            nav.style.position = '';
            nav.style.top = '';
            nav.style.right = '';
            nav.style.zIndex = '';
            
            const navLinks = nav.querySelectorAll('a');
            navLinks.forEach(link => {
                link.style.fontSize = '';
            });
            
            document.body.classList.remove('scrolled');
        }
    }
    
    // Smooth animation frame
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    handleScroll(); // Initial call
});