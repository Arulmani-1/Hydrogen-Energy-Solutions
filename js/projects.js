document.addEventListener("DOMContentLoaded", () => {
    initFilters();
});

function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projects.forEach(project => {
                if (filterValue === 'all' || project.getAttribute('data-category') === filterValue) {
                    project.style.display = 'block';
                    setTimeout(() => {
                        project.style.opacity = '1';
                        project.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    project.style.opacity = '0';
                    project.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        project.style.display = 'none';
                    }, 400); // match transition duration
                }
            });
        });
    });
}

function openLightbox(element) {
    const lightbox = document.getElementById('project-lightbox');
    const img = document.getElementById('lightbox-img');
    const title = document.getElementById('lightbox-title');
    const desc = document.getElementById('lightbox-desc');

    // Extract data from card
    const sourceImg = element.querySelector('img').src;
    const sourceTitle = element.querySelector('h3').innerText;
    const sourceDesc = element.querySelector('p').innerText;

    img.src = sourceImg;
    title.innerText = sourceTitle;
    desc.innerText = sourceDesc;

    lightbox.classList.add('active');
    
    // Disable scrolling (if lenis is present, we pause it)
    if(typeof lenis !== 'undefined') lenis.stop();
}

function closeLightbox() {
    const lightbox = document.getElementById('project-lightbox');
    lightbox.classList.remove('active');
    
    if(typeof lenis !== 'undefined') lenis.start();
}
