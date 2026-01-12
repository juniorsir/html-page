document.addEventListener('DOMContentLoaded', () => {
    // UI Elements
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    const navbar = document.getElementById('navbar');
    const body = document.body;

    /**
     * Mobile Navigation Logic
     */
    mobileToggle.addEventListener('click', () => {
        const isActive = navLinks.classList.toggle('mobile-active');
        mobileToggle.classList.toggle('active');
        
        // Locking scroll when menu is open
        body.style.overflow = isActive ? 'hidden' : '';
    });

    // Close mobile menu on link interaction
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navLinks.classList.remove('mobile-active');
            body.style.overflow = '';
        });
    });

    /**
     * Smooth Internal Navigation
     */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navHeight = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /**
     * Intersection Observer for Progressive Reveal
     */
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing once visible to maintain performance
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    /**
     * Navbar Dynamic Styling on Scroll
     */
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.style.background = 'rgba(10, 10, 12, 0.85)';
            navbar.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.5)';
            navbar.style.height = '70px';
        } else {
            navbar.style.background = 'rgba(10, 10, 12, 0.7)';
            navbar.style.boxShadow = 'none';
            navbar.style.height = '80px';
        }

        lastScroll = currentScroll;
    });
});