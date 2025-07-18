// Smooth Scroll Header Animation
document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.logo');
    const nav = document.querySelector('.nav, .top-nav');
    
    if (!logo || !nav) return;
    
    // Create a fixed header container
    const fixedHeader = document.createElement('div');
    fixedHeader.className = 'fixed-header';
    fixedHeader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        padding: 20px 48px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 100;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
    `;
    
    // Clone logo and nav for the fixed header
    const logoClone = logo.cloneNode(true);
    const navClone = nav.cloneNode(true);
    
    // Style the cloned elements
    logoClone.style.cssText = `
        width: 60px;
        height: 90px;
        margin: 0;
        transition: all 0.3s ease;
    `;
    
    // Make nav links smaller in fixed header
    navClone.querySelectorAll('a').forEach(link => {
        link.style.fontSize = '16px';
        link.style.transition = 'all 0.3s ease';
    });
    
    fixedHeader.appendChild(logoClone);
    fixedHeader.appendChild(navClone);
    document.body.appendChild(fixedHeader);
    
    // Handle scroll
    let lastScroll = 0;
    
    function handleScroll() {
        const scrollY = window.scrollY;
        const threshold = 100;
        
        if (scrollY > threshold) {
            // Show fixed header
            fixedHeader.style.opacity = '1';
            fixedHeader.style.pointerEvents = 'auto';
            
            // Hide original elements
            logo.style.opacity = '0';
            nav.style.opacity = '0';
        } else {
            // Hide fixed header
            fixedHeader.style.opacity = '0';
            fixedHeader.style.pointerEvents = 'none';
            
            // Show original elements
            logo.style.opacity = '1';
            nav.style.opacity = '1';
        }
        
        lastScroll = scrollY;
    }
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
});