// Simple Scroll Detection
document.addEventListener('DOMContentLoaded', function() {
    let isScrolled = false;
    
    function handleScroll() {
        const scrollY = window.scrollY;
        const threshold = 50;
        
        if (scrollY > threshold && !isScrolled) {
            isScrolled = true;
            document.body.classList.add('scrolled');
        } else if (scrollY <= threshold && isScrolled) {
            isScrolled = false;
            document.body.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
});