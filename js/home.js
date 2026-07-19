document.addEventListener("DOMContentLoaded", () => {
    // Wait slightly for preloader to finish before starting heavy hero animations
    setTimeout(() => {
        initHeroAnimations();
        initParticles();
        initScrollTriggers();
        initTiltCards();
        initCounters();
    }, 1000);
});

function initHeroAnimations() {
    if(typeof gsap === 'undefined') return;

    const tl = gsap.timeline();

    tl.fromTo(".hero-title", 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
    .fromTo(".hero-subtitle", 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, 
        "-=0.7"
    )
    .fromTo(".hero-btns a", 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }, 
        "-=0.5"
    )
    .fromTo(".hero-stats", 
        { y: 40, opacity: 0, scale: 0.95 }, 
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: "back.out(1.5)" }, 
        "-=0.3"
    );

    // Mouse Parallax for Hero
    const hero = document.querySelector('.hero');
    const video = document.querySelector('.hero-video');
    const molecules = document.querySelectorAll('.molecule');

    if(hero && video) {
        hero.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;

            gsap.to(video, {
                x: -x,
                y: -y,
                duration: 1,
                ease: "power2.out"
            });

            molecules.forEach((mol, index) => {
                const depth = (index + 1) * 15;
                gsap.to(mol, {
                    x: (x / 20) * depth,
                    y: (y / 20) * depth,
                    duration: 1.5,
                    ease: "power2.out"
                });
            });
        });
    }
}

function initParticles() {
    if(typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 60,
                    "density": { "enable": true, "value_area": 800 }
                },
                "color": { "value": "#00E5FF" },
                "shape": { "type": "circle" },
                "opacity": {
                    "value": 0.4,
                    "random": true,
                    "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": { "enable": false }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#00E5FF",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1.5,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 140, "line_linked": { "opacity": 0.8 } },
                    "push": { "particles_nb": 2 }
                }
            },
            "retina_detect": true
        });
    }
}

function initScrollTriggers() {
    if(typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // Parallax Image in Intro
    gsap.to(".parallax-img", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
            trigger: ".parallax-container",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });

    // Animate Services Cards
    gsap.from(".service-card", {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".services-grid",
            start: "top 80%",
        }
    });

    // Animate Revolution Section
    const revTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".revolution-section",
            start: "top 75%"
        }
    });

    revTl.from(".revolution-title", {
        x: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    })
    .from(".revolution-text-wrapper", {
        x: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.6")
    .from(".revolution-image-wrapper", {
        x: 100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.8");

    // Animate Intro Section
    const introTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".intro",
            start: "top 75%"
        }
    });

    introTl.from(".intro-text", {
        x: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    })
    .from(".intro-image-wrapper", {
        x: 100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.8");
}

function initTiltCards() {
    const cards = document.querySelectorAll('.tilt-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth <= 768) return; // Disable tilt on mobile
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });
}

function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseFloat(counter.getAttribute('data-target'));
                const duration = 2000; // 2s
                const step = target / (duration / 16); // 60fps
                
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if(current < target) {
                        counter.innerText = Number.isInteger(target) ? Math.ceil(current) : current.toFixed(1);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}
