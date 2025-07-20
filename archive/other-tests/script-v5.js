// Interactive logo effects
const logo = document.querySelector('.interactive-logo');
const scene = document.querySelector('.scene');

// Mouse tracking for subtle parallax
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
    const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;
    
    // Move nav items slightly based on mouse position
    document.querySelectorAll('.nav-item').forEach((item, index) => {
        const speed = 20 + (index * 5);
        item.style.transform += ` translate(${x * speed}px, ${y * speed}px)`;
    });
});

// Logo click animation
logo.addEventListener('click', () => {
    logo.style.animation = 'none';
    setTimeout(() => {
        logo.style.animation = 'spin 0.6s ease-out, gentle-pulse 4s ease-in-out infinite';
    }, 10);
});

// Add spin animation
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg) scale(1); }
        to { transform: rotate(360deg) scale(1); }
    }
`;
document.head.appendChild(style);