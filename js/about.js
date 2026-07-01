document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        initAboutAnimations();
    }, 1000);
});

function initAboutAnimations() {
    if(typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // Image Stack Parallax
    gsap.to(".img-back", {
        y: -50,
        ease: "none",
        scrollTrigger: {
            trigger: ".image-stack",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });

    gsap.to(".img-front", {
        y: 50,
        ease: "none",
        scrollTrigger: {
            trigger: ".image-stack",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });

    // Animate Values Cards
    const cards = document.querySelectorAll('.tilt-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const rotateX = ((y - rect.height / 2) / rect.height) * -15; 
            const rotateY = ((x - rect.width / 2) / rect.width) * 15;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });

    // Animate About Intro Section
    const aboutIntroTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".about-intro-section",
            start: "top 75%"
        }
    });

    aboutIntroTl.from(".about-content", {
        x: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    })
    .from(".about-images", {
        x: 100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.8");

    // Animate Core Values Cards from Bottom
    gsap.from(".values-grid .value-card", {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".values-section",
            start: "top 80%"
        }
    });
}
