document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        initCounters();
        initChart();
        initTiltCards();
    }, 1000);
});

function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseFloat(counter.getAttribute('data-target'));
                const duration = 2000;
                const step = target / (duration / 16);
                
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if(current < target) {
                        counter.innerText = Math.ceil(current);
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

function initChart() {
    const ctx = document.getElementById('co2Chart');
    if(!ctx) return;

    // Wait until chart is in view to animate it
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                renderChart();
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    observer.observe(ctx);

    function renderChart() {
        Chart.defaults.color = 'rgba(255, 255, 255, 0.7)';
        Chart.defaults.font.family = "'Inter', sans-serif";

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['2020', '2022', '2024', '2026', '2028', '2030'],
                datasets: [{
                    label: 'CO2 Offset (Millions of Tons)',
                    data: [5, 12, 22, 35, 42, 50],
                    borderColor: '#00E5FF',
                    backgroundColor: 'rgba(0, 229, 255, 0.2)',
                    borderWidth: 3,
                    pointBackgroundColor: '#39FF14',
                    pointBorderColor: '#030A11',
                    pointRadius: 6,
                    fill: true,
                    tension: 0.4 // curve
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(6, 20, 35, 0.9)',
                        titleColor: '#00E5FF',
                        bodyColor: '#FFF',
                        borderColor: 'rgba(0, 229, 255, 0.3)',
                        borderWidth: 1,
                        padding: 10,
                        displayColors: false
                    }
                },
                scales: {
                    y: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)',
                        },
                        beginAtZero: true
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }
}

function initTiltCards() {
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
}
