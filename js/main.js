// Automatically redirect to home page on first Live Server launch
(function() {
    const currentPath = window.location.pathname;
    const isHome = currentPath.endsWith('home.html') || currentPath.endsWith('index.html') || currentPath === '/';
    
    if (!isHome && window.location.port === "5500" && document.referrer === "") {
        if (!sessionStorage.getItem('live_server_redirect')) {
            sessionStorage.setItem('live_server_redirect', 'true');
            window.location.href = "home.html";
        }
    } else {
        sessionStorage.setItem('live_server_redirect', 'true');
    }
})();

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
    initPreloader();
    initLenis();
    initMagneticButtons();
    initRevealAnimations();
    loadComponents();
});

// Load Navbar and Footer Components dynamically
function loadComponents() {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    if (navbarPlaceholder) {
        fetch('navbar.html')
            .then(response => response.text())
            .then(data => {
                navbarPlaceholder.innerHTML = data;
                initNavbar();
            });
    }

    if (footerPlaceholder) {
        fetch('footer.html')
            .then(response => response.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
                initRevealAnimations();
                initMagneticButtons();
                initNewsletterForm();
            });
    }
}

// Newsletter Form Logic
function initNewsletterForm() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = form.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                alert("Email subscription successfully!");
                form.reset();
            }
        });
    });
}

// Preloader Logic
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if(!preloader) return;

    // Force preloader to stay for exactly 3 seconds (3000ms)
    setTimeout(() => {
        gsap.to(preloader, {
            yPercent: -100,
            duration: 1,
            ease: "power4.inOut",
            onComplete: () => preloader.style.display = 'none'
        });
        
        // Trigger page enter animations here if needed
        if(typeof window.pageEnterAnimation === 'function') {
            window.pageEnterAnimation();
        }
    }, 3000);
}

// Lenis Smooth Scroll
let lenis;
function initLenis() {
    // If lenis isn't loaded via script tag yet, try to wait or skip
    if(typeof window.Lenis === 'undefined') {
        console.warn('Lenis script not loaded.');
        return;
    }

    lenis = new window.Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Integrate with GSAP ScrollTrigger if available
    if(typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time)=>{
          lenis.raf(time * 1000)
        });
        
        gsap.ticker.lagSmoothing(0);
    }
}


// Magnetic Buttons (requires GSAP)
function initMagneticButtons() {
    if(typeof gsap === 'undefined') return;

    const magnets = document.querySelectorAll('.magnetic');
    
    magnets.forEach(magnet => {
        magnet.addEventListener('mousemove', (e) => {
            const position = magnet.getBoundingClientRect();
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;
            
            gsap.to(magnet, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.5,
                ease: "power2.out"
            });
        });
        
        magnet.addEventListener('mouseleave', () => {
            gsap.to(magnet, {
                x: 0,
                y: 0,
                duration: 0.7,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });
}

// Basic Reveal Animations (Fallbacks if ScrollTrigger is complex)
function initRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal');
    if(!reveals.length) return;

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });
}

// Navbar Logic
function initNavbar() {
    const header = document.getElementById('main-header');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const desktopNav = document.querySelector('.desktop-nav');
    
    if(!header) return;

    // Sticky Navbar Glass Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Set Active Link Based on Current Page
    let currentPath = window.location.pathname.split('/').pop();
    if (currentPath === '' || currentPath === 'index.html') {
        currentPath = 'home.html';
    }

    const allLinks = document.querySelectorAll('.desktop-nav a');
    
    // First remove hardcoded active classes
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    
    allLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href !== '#' && href === currentPath) {
            if (link.classList.contains('nav-link')) {
                link.classList.add('active');
            }
            const parentDropdown = link.closest('.has-dropdown');
            if (parentDropdown) {
                const parentNavLink = parentDropdown.querySelector('.nav-link');
                if (parentNavLink) parentNavLink.classList.add('active');
            }
        }
    });

    // Mobile Toggle
    if(mobileToggle && desktopNav) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            desktopNav.classList.toggle('active');
        });
    }

    // Mega menu interactions handled via CSS mostly, 
    // but can add GSAP transitions here if needed
}
