// Background image switching on hover
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.text-link');
    const bgImages = document.querySelectorAll('.bg-image');
    
    // Set first image as active by default
    bgImages[0].classList.add('active');
    
    links.forEach((link, index) => {
        link.addEventListener('mouseenter', () => {
            // Hide all images
            bgImages.forEach(img => img.classList.remove('active'));
            
            // Show corresponding image
            if (bgImages[index]) {
                bgImages[index].classList.add('active');
            }
        });
    });
});