document.addEventListener('DOMContentLoaded', () => {
    // Check if user has visited before in this session
    const hasVisited = sessionStorage.getItem('hasVisitedHomepage');
    
    if (hasVisited) {
        // Skip intro animations
        document.body.classList.add('skip-intro');
        
        // Add breathing animation after content fades in
        setTimeout(() => {
            const logo = document.querySelector('.hero-content .logo');
            if (logo) {
                logo.classList.add('breathing');
            }
        }, 2200);
    } else {
        // First time visitor - play full intro
        sessionStorage.setItem('hasVisitedHomepage', 'true');
        
        setTimeout(() => {
            const logo = document.querySelector('.hero-content .logo');
            if (logo) {
                logo.classList.add('breathing');
            }
        }, 10500);
    }
    
    // Handle navigation link clicks
    const navLinks = document.querySelectorAll('.nav-item');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            
            // Get target color
            const pageName = href.split('/').pop().replace('.html', '');
            const colorMap = {
                'talent': '#FF6319',
                'interfaces': '#0039A6',
                'resources': '#00933C'
            };
            const targetColor = colorMap[pageName];
            
            // Create color transition overlay
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: ${targetColor};
                z-index: 9999;
                opacity: 0;
                transition: opacity 1s ease;
                pointer-events: none;
            `;
            
            // Create logo overlay
            const logoOverlay = document.createElement('div');
            logoOverlay.innerHTML = `
                <img src="assets/images/logo.gif" style="
                    width: 150px;
                    height: 225px;
                ">
            `;
            logoOverlay.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.6s ease;
                pointer-events: none;
            `;
            
            document.body.appendChild(overlay);
            document.body.appendChild(logoOverlay);
            
            // Start transitions
            requestAnimationFrame(() => {
                // Fade in color overlay
                overlay.style.opacity = '0.95';
                // Fade in logo
                logoOverlay.style.opacity = '1';
                
                // Fade out current content
                document.querySelector('.container').style.transition = 'opacity 0.8s ease';
                document.querySelector('.container').style.opacity = '0';
            });
            
            // Navigate after transition
            setTimeout(() => {
                window.location.href = href;
            }, 800);
        });
    });
});