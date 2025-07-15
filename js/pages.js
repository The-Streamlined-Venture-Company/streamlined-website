document.addEventListener('DOMContentLoaded', () => {
    const pageLinks = document.querySelectorAll('.page-nav a');
    
    pageLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href').startsWith('#')) {
                return;
            }
            
            const isExternal = link.getAttribute('href').startsWith('http');
            if (!isExternal) {
                e.preventDefault();
                const href = link.getAttribute('href');
                
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.3s ease';
                
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });
    
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '1';
    }, 10);
});