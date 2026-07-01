document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        initTechAnimations();
    }, 1000);
});

function initTechAnimations() {
    if(typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // Roadmap Progress Animation
    gsap.to(".roadmap-progress", {
        width: "66%",
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".roadmap-container",
            start: "top 80%",
            end: "center center",
            scrub: true
        }
    });

    // Tilt Cards
    const cards = document.querySelectorAll('.tilt-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const rotateX = ((y - rect.height / 2) / rect.height) * -10; 
            const rotateY = ((x - rect.width / 2) / rect.width) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });
}
