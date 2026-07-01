document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        initServicesAnimations();
    }, 1000);
});

function initServicesAnimations() {
    if(typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // Stagger reveal of service cards
    gsap.from(".service-premium-card", {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".services-masonry",
            start: "top 80%",
        }
    });

    // 3D Rotate Effect on Mouse Move
    const cards = document.querySelectorAll('.service-premium-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const rotateX = ((y - rect.height / 2) / rect.height) * -8; // subtle
            const rotateY = ((x - rect.width / 2) / rect.width) * 8;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateY(0)`;
        });
    });
}
