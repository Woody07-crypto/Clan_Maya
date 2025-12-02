// js/etapas.js - Interactive features for etapas page

document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scroll behavior
    const stageCards = document.querySelectorAll('.stage-card');
    
    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);
    
    // Initialize cards with animation
    stageCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Add click effect to requirement items
    const requirementItems = document.querySelectorAll('.requirements-list > li');
    requirementItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'scale(1.02)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    // Add parallax effect to hero section on scroll
    let lastScroll = 0;
    const hero = document.querySelector('.etapas-hero');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        if (hero && currentScroll < hero.offsetHeight) {
            const parallax = currentScroll * 0.5;
            hero.style.transform = `translateY(${parallax}px)`;
        }
        lastScroll = currentScroll;
    });
});

