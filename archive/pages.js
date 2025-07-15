document.addEventListener('DOMContentLoaded', () => {
    // Smooth fade in from current background color
    const currentBg = window.getComputedStyle(document.body).backgroundColor;
    document.body.style.opacity = '0';
    
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.8s ease';
        document.body.style.opacity = '1';
    }, 10);
    
    // Handle all navigation links
    const allLinks = document.querySelectorAll('a[href*=".html"], .logo');
    
    allLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href') || link.parentElement?.getAttribute('href');
            if (!href || href.startsWith('#') || href.startsWith('http')) {
                return;
            }
            
            e.preventDefault();
            
            // Determine target color
            const isHomepage = href.includes('index.html') || href === '../' || href === '../index.html';
            const targetColor = isHomepage ? '#f5f5f5' : '#ffffff';
            
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
                <img src="../assets/images/logo.gif" style="
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