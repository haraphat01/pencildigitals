document.addEventListener('DOMContentLoaded', () => {

    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const navLinks = mainNav.querySelectorAll('a[href^="#"]'); // Select only internal links

    // --- Mobile Menu Toggle ---
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active'); // For animating the hamburger to X
            // Optional: Prevent body scroll when menu is open
            document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
        });
    }

    // --- Smooth Scrolling & Close Mobile Menu on Link Click ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default jump

            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calculate scroll position (consider header height)
                const headerHeight = header ? header.offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if it's open
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    menuToggle.classList.remove('active');
                    document.body.style.overflow = ''; // Restore body scroll
                }
            }
        });
    });

    // --- Optional: Add subtle scroll effects or header changes ---
    // Example: Change header background on scroll
    /*
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // Adjust scroll distance as needed
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.backgroundColor = 'var(--light-color)';
            header.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
        }
    });
    */

});