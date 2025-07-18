// Smooth Logo and Navigation Scroll Animation
document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.logo');
    const topNav = document.querySelector('.top-nav');
    
    if (!logo) return;
    
    // Get initial positions and sizes
    const logoRect = logo.getBoundingClientRect();
    const initialLogoWidth = logoRect.width;
    const initialLogoHeight = logoRect.height;
    const initialLogoTop = logoRect.top + window.scrollY;
    const initialLogoLeft = logoRect.left + window.scrollX;
    
    // Target sizes when scrolled
    const scrolledLogoWidth = 60;
    const scrolledLogoHeight = 90;
    const scrolledLogoTop = 30;
    const scrolledLogoLeft = 48; // var(--container-padding)
    
    // Create a clone for smooth transition
    const logoClone = logo.cloneNode(true);
    logoClone.style.position = 'fixed';
    logoClone.style.top = initialLogoTop - window.scrollY + 'px';
    logoClone.style.left = initialLogoLeft + 'px';
    logoClone.style.width = initialLogoWidth + 'px';
    logoClone.style.height = initialLogoHeight + 'px';
    logoClone.style.zIndex = '100';
    logoClone.style.opacity = '0';
    logoClone.style.transition = 'none';
    document.body.appendChild(logoClone);
    
    let isScrolled = false;
    
    function handleScroll() {
        const scrollY = window.scrollY;
        const scrollThreshold = 50;
        const maxScroll = 300; // Distance over which the animation completes
        
        if (scrollY > scrollThreshold) {
            if (!isScrolled) {
                isScrolled = true;
                logo.style.opacity = '0';
                logoClone.style.opacity = '1';
            }
            
            // Calculate progress (0 to 1)
            const progress = Math.min((scrollY - scrollThreshold) / maxScroll, 1);
            
            // Interpolate values
            const currentWidth = initialLogoWidth + (scrolledLogoWidth - initialLogoWidth) * progress;
            const currentHeight = initialLogoHeight + (scrolledLogoHeight - initialLogoHeight) * progress;
            const currentTop = (initialLogoTop - scrollY) + (scrolledLogoTop - (initialLogoTop - scrollY)) * progress;
            const currentLeft = initialLogoLeft + (scrolledLogoLeft - initialLogoLeft) * progress;
            
            // Apply transforms
            logoClone.style.width = currentWidth + 'px';
            logoClone.style.height = currentHeight + 'px';
            logoClone.style.top = currentTop + 'px';
            logoClone.style.left = currentLeft + 'px';
            
            // Also handle navigation if it exists
            if (topNav) {
                if (!topNav.hasAttribute('data-original-style')) {
                    topNav.setAttribute('data-original-style', 'true');
                    topNav.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                }
                
                topNav.style.position = 'fixed';
                topNav.style.top = '40px';
                topNav.style.right = '48px';
                topNav.style.zIndex = '100';
                
                // Resize nav links from 28px to 18px
                const navLinks = topNav.querySelectorAll('a');
                navLinks.forEach(link => {
                    const fontSize = 28 - (10 * progress); // From 28px to 18px
                    link.style.fontSize = fontSize + 'px';
                });
            }
            
        } else {
            if (isScrolled) {
                isScrolled = false;
                logo.style.opacity = '1';
                logoClone.style.opacity = '0';
                
                if (topNav) {
                    topNav.style.position = '';
                    topNav.style.top = '';
                    topNav.style.right = '';
                    topNav.style.zIndex = '';
                    
                    // Reset nav link sizes
                    const navLinks = topNav.querySelectorAll('a');
                    navLinks.forEach(link => {
                        link.style.fontSize = '';
                    });
                }
            }
        }
    }
    
    // Initial call and scroll listener
    handleScroll();
    window.addEventListener('scroll', handleScroll);
});