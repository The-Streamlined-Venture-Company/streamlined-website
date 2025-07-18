// Text Animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedText = document.querySelector('.animated-text');
    const text = animatedText.textContent;
    animatedText.textContent = '';
    
    // Split text into spans
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
        span.style.transition = `all 0.5s ease ${index * 0.05}s`;
        animatedText.appendChild(span);
    });
    
    // Trigger animation
    setTimeout(() => {
        animatedText.querySelectorAll('span').forEach(span => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
        });
    }, 500);
    
    // Add hover effect
    animatedText.addEventListener('mouseenter', () => {
        animatedText.querySelectorAll('span').forEach((span, index) => {
            span.style.transform = `translateY(${Math.sin(index * 0.5) * 5}px)`;
        });
    });
    
    animatedText.addEventListener('mouseleave', () => {
        animatedText.querySelectorAll('span').forEach(span => {
            span.style.transform = 'translateY(0)';
        });
    });
});